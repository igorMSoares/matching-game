import axios from 'axios';
import { readFromCache, writeToCache } from './cache';

const API_ROUTE = Object.freeze('/api/getApodImages');

const getImages = async (url = API_ROUTE) => {
  let images = readFromCache(url) as APODImg[] | null;
  if (images) return images;

  const apiRes = await axios.get(url);

  if ('error' in apiRes.data) {
    throw new Error(apiRes.data.error as string);
  }

  images = apiRes.data as APODImg[];
  writeToCache(url, images);
  return images;
};

export { getImages, API_ROUTE };
