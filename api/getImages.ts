import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const { APOD_BASE_URL, APOD_KEY_NAME, APOD_API_KEY } = process.env;

const api = axios.create({
  baseURL: APOD_BASE_URL,
});

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const images = await api.get(
      `/apod?${APOD_KEY_NAME}=${APOD_API_KEY}&count=${req.query.count ?? 10}`
    );
    res.status(200);
    return res.json(images.data);
  } catch (error) {
    return res.json({ error: error });
  }
};
