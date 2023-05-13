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

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(6, '1 m'),
  analytics: true,
});

const api = axios.create({
  baseURL: APOD_BASE_URL,
});

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
  const { success: bellowRateLimit } = await ratelimit.limit(identifier);

  if (!bellowRateLimit) {
    console.log('Too many requests per minute.');
    return res.json('Too many requests per minute.');
  }

  try {
    const apiRes = await api.get(
      `/apod?${APOD_KEY_NAME}=${APOD_API_KEY}&count=${Math.floor(1.5 * count)}`
    );

    const images = filterByMediaType(apiRes.data, 'image', count) as APODImg[];

    res.status(200);
    return res.json(images);
  } catch (_) {
    res.status(500);
    return res.json('Could not fetch images from Nasa API');
  }
};
