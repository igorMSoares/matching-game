import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { readFromCache, writeToCache } from '@/helpers/cache';

const API_ROUTE = Object.freeze('/api/getApodImages');

const fetchFromApi = async (url: string) => {
  try {
    const apiRes = await axios.get(url);
    if ('error' in apiRes.data) {
      throw new Error(apiRes.data.error as string);
    }

    const imgs = apiRes.data as APODImg[];
    writeToCache(url, imgs);

    return imgs;
  } catch (error) {
    throw new Error(error as string);
  }
};

const preloadImgs = (imgs: APODImg[]) => {
  let preloadLink;
  imgs.forEach((img) => {
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
    let imgs = readFromCache(url) as APODImg[] | null;

    if (imgs === null) {
      imgs = await fetchFromApi(url);
    }

    preloadImgs(imgs);

    images.value = imgs;
  }

  async function reFetchImages(totalImages: number = 10) {
    try {
      images.value = await fetchFromApi(`${API_ROUTE}?count=${totalImages}`);
    } catch (error) {
      throw new Error(error as string);
    }
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
