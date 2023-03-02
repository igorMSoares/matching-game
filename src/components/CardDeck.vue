<script setup lang="ts">
import Card from './Card.vue';

import { useCardDeckStore } from '@/stores/cardDeck';

const emit = defineEmits(['deckError']);

const { imagesCount } = defineProps<{ imagesCount: number }>();

const cardDeckStore = useCardDeckStore();

try {
  await cardDeckStore.initCardDeck(imagesCount);
} catch (error) {
  const DEFAULT_ERROR_MSG = 'Error while fetching from the APOD API';
  const err = error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
  emit('deckError', err);
}

const selectCard = (cardId: number) => cardDeckStore.selectCard(cardId);
</script>

<template>
  <v-row v-if="cardDeckStore.totalCards > 0" class="deck justify-center">
    <v-col v-for="card in cardDeckStore.deck">
      <Card :card="card" @select-card="selectCard" />
    </v-col>
  </v-row>
</template>

<style scoped>
.deck {
  --square-min-side: 5.75rem;
  --square-side: clamp(var(--square-min-side), 30%, 13rem);
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--square-side));
  justify-items: center;
}
</style>
