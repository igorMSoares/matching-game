<script setup lang="ts">
import Card from './Card.vue';

import { useCardDeckStore } from '@/stores/cardDeck';

const emit = defineEmits(['deckError']);

const { imagesCount } = defineProps<{ imagesCount: number }>();

const cardDeckStore = useCardDeckStore();

try {
  cardDeckStore.initCardDeck(imagesCount);
} catch (error) {
  const DEFAULT_ERROR_MSG = 'Error while fetching from the APOD API';
  const err = error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
  emit('deckError', err);
}

const selectCard = (cardId: number) => cardDeckStore.selectCard(cardId);
</script>

<template>
  <div v-if="cardDeckStore.totalCards > 0" class="deck">
    <Card
      v-for="card in cardDeckStore.deck"
      :card="card"
      @select-card="selectCard"
    />
  </div>
</template>

<style scoped>
.deck {
  --square-min-side: 5.75rem;
  --square-side: clamp(var(--square-min-side), 30%, 13rem);
  gap: 0.75rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--square-side));
  grid-auto-rows: minmax(var(--square-min-side), var(--square-side));
  justify-items: center;
}
</style>
