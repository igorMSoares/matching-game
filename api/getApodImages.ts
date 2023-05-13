import { VercelRequest, VercelResponse } from '@vercel/node';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import axios from 'axios';

const { APOD_BASE_URL, APOD_KEY_NAME, APOD_API_KEY } = process.env;

type APODData = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

interface APODImg extends APODData {
  media_type: 'image';
}

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(4, '1 m'), // max of 4 req/min per user
  analytics: true,
});

const api = axios.create({
  baseURL: APOD_BASE_URL,
});

const API_MAX_RATE_LIMIT = 2000;
// API's rate limit should not go bellow
const API_MIN_RATE_LIMIT = 50;

const filterByMediaType = (
  dataList: APODData[],
  mediaType: 'image' | 'video',
  maxCount: number | null = null
) => {
  const filteredData: APODData[] = [];
  let totalImages = 0;

  for (const data of dataList as APODData[]) {
    if (data.media_type !== mediaType) continue;
    filteredData.push(data);
    totalImages++;
    if (maxCount && totalImages === maxCount) break;
  }

  return filteredData;
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const count = Number(req.query.count ?? 10);
  const identifier = (req.headers['x-real-ip'] as string) ?? '127.0.0.1';
  const { success: userAboveRateLimit } = await ratelimit.limit(identifier);
  const apodRemainingRatelimit =
    Number(await redis.get('apod-remaining-ratelimit')) ?? API_MAX_RATE_LIMIT;

  if (!userAboveRateLimit || apodRemainingRatelimit <= API_MIN_RATE_LIMIT) {
    return res.status(429).send({
      error: `Too many sequential requests. Please try again in a couple of minutes.`,
    });
  }

  try {
    const apiRes = await api.get(
      `/apod?${APOD_KEY_NAME}=${APOD_API_KEY}&count=${Math.floor(1.5 * count)}`
    );

    await redis.set(
      'apod-remaining-ratelimit',
      apiRes.headers['x-ratelimit-remaining']
    );

    const images = filterByMediaType(apiRes.data, 'image', count) as APODImg[];

    return res.status(200).send(images);
  } catch (error: unknown) {
    const statusCode = axios.isAxiosError(error) ? error.status ?? 500 : 500;

    return res.status(statusCode).send({
      error: `
        Houston, we have a problem.
        Please try again in a couple of minutes.
      `,
    });
  }
};
