<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { readFromCache, writeToCache } from '../helpers/cache';
import { shuffleArray } from '../helpers/shuffle';

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
const images = await getImages(API_ROUTE + `?count=${imagesCount.value}`);
shuffleArray(images);

const showImage = (card: HTMLElement) => {
  const cardImage = card.firstChild as HTMLElement;
  cardImage.classList.toggle('hidden');
};

const hideImage = (image: HTMLElement) => {
  image.classList.toggle('hidden');
};
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
      @click.stop="(e) => showImage(e.target as HTMLElement)"
      ria-role="button"
    >
      <img
        v-if="image.media_type === 'image'"
        @click.stop="(e) => hideImage(e.target as HTMLElement)"
        class="hidden"
        :src="image.url"
        :alt="image.title"
        :title="image.title"
      />
    </div>
  </div>
</template>

<style scoped>
* {
  --square-side: clamp(6.25rem, 20vw, 12rem);
}

img {
  width: 100%;
  height: 100%;
}

.card {
  user-select: none;
  cursor: pointer;
  height: 100%;
  aspect-ratio: 1;
  background: rgb(57, 214, 154);
  background: linear-gradient(
    324deg,
    rgba(57, 214, 154, 1) 0%,
    rgba(60, 3, 48, 1) 78%
  );
}

.grid {
  gap: 0.75rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--square-side), 1fr));
  grid-auto-rows: var(--square-side);
  justify-items: center;
}

.hidden {
  display: none;
}
</style>
