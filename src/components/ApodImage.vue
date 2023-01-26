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

    if ('error' in images) {
      err.message = images.error as string;
      return [];
    }

    if (images) {
      writeToCache(url, images);
      return images;
    }
  } catch (error: any) {
    err.message = error.message;
  }
  return [];
};

const generateCards = (images: APODImg[]): APODImg[] => {
  const cards: APODImg[] = Array(imagesCount.value * 2);

  let cardIndex = 0;
  for (let i = 0; i < imagesCount.value; i++) {
    cards[cardIndex] = images[i];
    cards[++cardIndex] = images[i];
    cardIndex++;
  }

  return cards;
};

const imagesCount = ref(10);
const images = await getImages(API_ROUTE + `?count=${imagesCount.value}`);

const cards = generateCards(images);
shuffleArray(cards);

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
      v-for="image in cards"
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
  --square-min-side: 5.75rem;
  --square-side: clamp(var(--square-min-side), 30%, 13rem);
}

img {
  width: 100%;
  height: 100%;
}

.card {
  user-select: none;
  cursor: pointer;
  width: 100%;
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
  grid-template-columns: repeat(auto-fill, var(--square-side));
  grid-auto-rows: minmax(var(--square-min-side), var(--square-side));
  justify-items: center;
}

.hidden {
  display: none;
}
</style>
