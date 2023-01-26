import axios from 'axios';
import { readFromCache, writeToCache } from './cache';

const API_ROUTE = Object.freeze('/api/getApodImages');

const getImages = async (url = API_ROUTE): Promise<APODImg[] | Error> => {
  let images = readFromCache(url) as APODImg[] | null;
  if (images) return images;

  try {
    const apiRes = await axios.get(url);
    images = apiRes.data as APODImg[];

    if ('error' in images) {
      return new Error(images.error as string);
    }

    writeToCache(url, images);
    return images;
  } catch (error: any) {
    return new Error(error.message);
  }
};

export { getImages, API_ROUTE };
