<script setup lang="ts">
import { ref } from 'vue';
import { getImages, API_ROUTE } from '../helpers/getCardImages';
import {
  generateCards,
  generateCardKey,
  cardSelectionHandler,
} from '../helpers/cards';

const err: { message: string } = { message: '' };

const imagesCount = ref(10);
const images = await getImages(`${API_ROUTE}?count=${imagesCount.value}`);

let cards: APODImg[];

if (images instanceof Error) err.message = images.message;
else {
  cards = generateCards(images, imagesCount.value);
}
</script>

<template>
  <div v-if="err.message !== ''">
    <p>
      Sorry, a problem has occurred while fetching images from Nasa. Please try
      again soon.
    </p>
  </div>
  <div v-if="cards !== undefined" class="grid">
    <div
      v-for="(image, i) in cards"
      :id="generateCardKey(image) + `_${i}`"
      class="card gradient-background"
      @click.stop="(e) => cardSelectionHandler(e.target as HTMLElement)"
      aria-role="button"
    >
      <img
        v-if="image.media_type === 'image'"
        class="hidden"
        :src="image.url"
        :alt="image.title"
        :title="image.title"
      />
    </div>
  </div>
</template>

<style scoped>
.card > img {
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
  overflow: hidden;
}

.card[matched] {
  cursor: default;
  background: transparent;
}

.card[selected-card] {
  cursor: default;
}

.grid {
  --square-min-side: 5.75rem;
  --square-side: clamp(var(--square-min-side), 30%, 13rem);
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
