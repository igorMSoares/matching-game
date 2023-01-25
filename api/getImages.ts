import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const { APOD_BASE_URL, APOD_KEY_NAME, APOD_API_KEY } = process.env;

type APODImg = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

const api = axios.create({
  baseURL: APOD_BASE_URL,
});

export default async (req: VercelRequest, res: VercelResponse) => {
  const count = Number(req.query.count ?? 10);
  try {
    const apiRes = await api.get(
      `/apod?${APOD_KEY_NAME}=${APOD_API_KEY}&count=${1.5 * count}`
    );
    const images = apiRes.data
      .filter((data: APODImg) => data.media_type === 'image')
      .slice(0, count);
    res.status(200);
    return res.json(images);
  } catch (error) {
    return res.json({ error: error });
  }
};
