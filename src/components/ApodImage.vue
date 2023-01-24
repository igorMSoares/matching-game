<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
import { readFromCache, writeToCache } from '../helpers/cache';

const API_ROUTE = Object.freeze('/api/getImages');
const err: { message: string } = { message: '' };

const getImages = async (url = API_ROUTE): Promise<APODImg[]> => {
  let images = readFromCache(url) as APODImg[];
  if (images) return images;

  try {
    const apiRes = await axios.get(url);
    images = apiRes.data;
    if (images) {
      writeToCache(url, images);
      return images;
    }
  } catch (error: any) {
    err.message = error.message;
  }
  return [];
};

const imagesCount = 3;
const images = await getImages(API_ROUTE + `?count=${imagesCount}`);

onMounted(() => {
  console.log(images);
});
</script>

<template>
  <div v-if="err.message !== ''">
    <p>
      Sorry, a problem has occurred while fetching images from Nasa. Please try
      again soon.
    </p>
  </div>
  <div
    v-else
    v-for="image in images"
    :key="image.title.replace(/\s/g, '-').substring(0, 25)"
  >
    <img
      v-if="image.media_type === 'image'"
      :src="image.url"
      :alt="image.title"
      :title="image.title"
    />
  </div>
</template>
