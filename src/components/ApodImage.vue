<script setup lang="ts">
import { ref } from 'vue';
import { useCardImageStore } from '@/stores/cardImage';
import { useCardDeckStore } from '@/stores/cardDeck';
import { shuffleArray } from '@/helpers/shuffle';

const imagesCount = ref(10);

const cardImagesStore = useCardImageStore();
const cardDeckStore = useCardDeckStore();

let err: string | null = null;

const duplicateImages = (images: APODImg[]) => {
  const imagesCount = images.length;
  const duplicates: APODImg[] = [];

  let index = 0;
  for (let i = 0; i < imagesCount; i++) {
    duplicates[index] = images[i];
    duplicates[++index] = images[i];
    index++;
  }

  return duplicates;
};

const initCardDeck = (images: APODImg[]) => {
  const allImages: APODImg[] = shuffleArray(duplicateImages(images));

  allImages.forEach((img) => cardDeckStore.addCard(img));
};

try {
  await cardImagesStore.fetchImages(imagesCount.value);
  initCardDeck(cardImagesStore.images);
} catch (error) {
  const DEFAULT_ERROR_MSG = 'Error while fetching from the APOD API';
  err = error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
}
</script>

<template>
  <div v-if="err">
    <p>
      Sorry, a problem has occurred while fetching images from Nasa. Please try
      again soon.
    </p>
  </div>
  <div v-if="cardDeckStore.lastMatch">
    <div class="image-display">
      <h2>{{ cardDeckStore.lastMatch.image.title }}</h2>
      <img
        :src="cardDeckStore.lastMatch.image.url"
        :alt="cardDeckStore.lastMatch.image.title"
      />
      <p>{{ cardDeckStore.lastMatch.image.explanation }}</p>
    </div>
  </div>
  <div v-if="cardDeckStore.totalCards > 0" class="grid">
    <div
      v-for="card in cardDeckStore.deck"
      :id="card.key + `_${card.id}`"
      class="card"
      :class="{
        'gradient-background': !card.foundMatch,
        pointer: !card.isSelected && !card.foundMatch,
      }"
      @click.stop="cardDeckStore.selectCard(card.id)"
      aria-role="button"
    >
      <img
        v-show="!card.foundMatch && card.isSelected"
        :src="card.image.url"
        :alt="card.image.title"
        :title="card.image.title"
        loading="lazy"
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
  cursor: default;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  background: transparent;
  overflow: hidden;
}

.gradient-background {
  background: rgb(57, 214, 154);
  background: linear-gradient(
    324deg,
    rgba(57, 214, 154, 1) 0%,
    rgba(60, 3, 48, 1) 78%
  );
}

.pointer {
  cursor: pointer;
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

.image-display {
  height: clamp(20rem, 100%, 25rem);
  width: clamp(19rem, 80vw, 70%);
  padding: 2rem 0;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
  font-size: 1rem;
  font-weight: bolder;
}

.hidden {
  display: none;
}
</style>
