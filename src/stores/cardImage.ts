import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { readFromCache, writeToCache } from '@/helpers/cache';
import { isApiError } from '@/helpers/api';

const API_ROUTE = Object.freeze('/api/getApodImages');

const fetchFromApi = async (url: string) => {
  try {
    const apiRes = await axios.get(url);

    const imgs = apiRes.data as APODImg[];
    writeToCache(url, imgs);

    return imgs;
  } catch (error: unknown) {
    const apiError: ApiError = axios.isAxiosError(error)
      ? {
        code: error.response?.status.toString() ?? '500',
        message: `${error.response?.data.error} (Error: ${error.response?.status})`,
      }
      : {
        code: '500',
        message: `
          Houston we have a problem: unable to fetch images from Nasa.
          Please try again in a couple of minutes.
        `,
      };

    return apiError;
  }
};

const preloadImgs = (imgs: APODImg[]) => {
  let preloadLink;
  imgs.forEach(img => {
    preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = img.url;

    document.getElementsByTagName('head')[0].appendChild(preloadLink);
  });
};

export const useCardImageStore = defineStore('cardImageStore', () => {
  const images = ref<APODImg[]>([]);

  async function fetchImages(totalImages: number = 10) {
    const url = `${API_ROUTE}?count=${totalImages}`;
    let imgs = readFromCache(url) as APODImg[] | ApiError | null;

    if (imgs === null) {
      imgs = await fetchFromApi(url);
    }

    if (!isApiError(imgs)) {
      preloadImgs(imgs);
      images.value = imgs;
    }

    return imgs;
  }

  async function reFetchImages(totalImages: number = 10) {
    return await fetchFromApi(`${API_ROUTE}?count=${totalImages}`);
  }

  function duplicateImages() {
    const imagesCount = images.value.length;
    const duplicates: APODImg[] = [];

    let index = 0;
    for (let i = 0; i < imagesCount; i++) {
      duplicates[index] = images.value[i];
      duplicates[++index] = images.value[i];
      index++;
    }

    return duplicates;
  }

  return { images, fetchImages, reFetchImages, duplicateImages };
});
