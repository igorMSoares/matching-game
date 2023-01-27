import { readFromCache, writeToCache } from '@/helpers/cache';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const API_ROUTE = Object.freeze('/api/getApodImages');

const fetchFromApi = async (url: string) => {
  const apiRes = await axios.get(url);

  if ('error' in apiRes.data) {
    throw new Error(apiRes.data.error as string);
  }

  const imgs = apiRes.data as APODImg[];
  writeToCache(url, imgs);

  return imgs;
};

export const useCardImagesStore = defineStore('cardImagesStore', () => {
  const images = ref<APODImg[]>([]);

  async function fetchImages(totalImages: number = 10) {
    const url = `${API_ROUTE}?count=${totalImages}`;
    let imgs = readFromCache(url) as APODImg[] | null;

    if (imgs === null) {
      imgs = await fetchFromApi(url);
    }

    images.value = imgs;
  }

  async function reFetchImages(totalImages: number = 10) {
    images.value = await fetchFromApi(`${API_ROUTE}?count=${totalImages}`);
  }

  return { images, fetchImages, reFetchImages };
});
