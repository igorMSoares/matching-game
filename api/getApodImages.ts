import { VercelRequest, VercelResponse } from '@vercel/node';
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
  try {
    const apiRes = await api.get(
      `/apod?${APOD_KEY_NAME}=${APOD_API_KEY}&count=${Math.floor(1.5 * count)}`
    );

    const images = filterByMediaType(apiRes.data, 'image', count) as APODImg[];

    res.status(200);
    return res.json(images);
  } catch (error) {
    res.status(error.status);
    return res.json(error.message);
  }
};
