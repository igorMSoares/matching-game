<script setup lang="ts">
import axios from 'axios';
import { ref, computed } from 'vue';
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

const imagesCount = ref(18);
const gridRowsNumber = ref(3);
const gridColumnsNumber = computed(() =>
  Math.floor(imagesCount.value / gridRowsNumber.value)
);
const images = await getImages(API_ROUTE + `?count=${imagesCount.value}`);
</script>

<template>
  <div v-if="err.message !== ''">
    <p>
      Sorry, a problem has occurred while fetching images from Nasa. Please try
      again soon.
    </p>
  </div>
  <div class="grid">
    <div
      v-if="err.message === ''"
      v-for="image in images"
      :key="image.title.replace(/\s/g, '-').substring(0, 25)"
      class="card"
    >
      <img
        v-if="image.media_type === 'image'"
        :src="image.url"
        :alt="image.title"
        :title="image.title"
      />
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
.card {
  /* aspect-ratio: 1; */
}
.grid {
  gap: 0.5em;
  display: grid;
  grid-template-columns: repeat(v-bind(gridColumnsNumber), 1fr);
  grid-template-rows: repeat(v-bind(gridRowsNumber), 1fr);
  justify-content: center;
}
</style>
