<script setup lang="ts">
import Card from './Card.vue';
import { useCardDeckStore } from '@/stores/cardDeck';

const cardDeckStore = useCardDeckStore();

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
