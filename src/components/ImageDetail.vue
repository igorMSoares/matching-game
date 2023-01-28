<script setup lang="ts">
import { useCardDeckStore } from '@/stores/cardDeck';

const cardDeckStore = useCardDeckStore();
</script>

<template>
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
</template>

<style scoped></style>
