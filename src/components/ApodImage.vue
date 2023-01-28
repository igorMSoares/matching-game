<script setup lang="ts">
import CardDeck from './CardDeck.vue';

import { useCardDeckStore } from '@/stores/cardDeck';
import { ref } from 'vue';

const cardDeckStore = useCardDeckStore();

const imagesCount = ref(10);

const err = ref<string | null>(null);
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

  <CardDeck
    :images-count="imagesCount"
    @deck-error="(error: string) => (err = error)"
  />
</template>

<style scoped>
.image-display {
  height: clamp(20rem, 100%, 25rem);
  width: clamp(19rem, 80vw, 70%);
  padding: 2rem 0;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
  font-size: 1rem;
  font-weight: bolder;
}
</style>
