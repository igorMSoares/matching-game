<script setup lang="ts">
import Card from './Card.vue';
import { useCardDeckStore } from '@/stores/cardDeck';

const cardDeckStore = useCardDeckStore();

const selectCard = (cardId: number) => cardDeckStore.selectCard(cardId);

const totalCards = cardDeckStore.totalCards;
const cardSidePercent =
  totalCards > 35 && totalCards < 40
    ? '14.25%'
    : totalCards > 40
    ? '12%'
    : '30%';
</script>

<template>
  <v-row v-if="cardDeckStore.totalCards > 0" class="deck justify-center my-5">
    <v-col v-for="card in cardDeckStore.deck" :key="`card-${card.id}`">
      <Card :card="card" @select-card="selectCard" />
    </v-col>
  </v-row>
</template>

<style scoped>
.deck {
  --percentage: v-bind(cardSidePercent);
  --square-min-side: 5.75rem;
  --square-side: clamp(var(--square-min-side), var(--percentage), 13rem);
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--square-side));
  justify-items: center;
}
</style>
