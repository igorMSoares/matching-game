<script setup lang="ts">
import { computed } from 'vue';
import ImageDetail from './ImageDetail.vue';
import { useCardDeckStore } from '@/stores/cardDeck';

const cardDeckStore = useCardDeckStore();

const lastMatch = computed(() => cardDeckStore.lastMatch?.key);
</script>

<template>
  <v-carousel
    v-if="cardDeckStore.matchedCards"
    height="auto"
    hide-delimiters
    :model-value="lastMatch"
  >
    <v-carousel-item
      v-for="matchedCard in cardDeckStore.matchedCards"
      :key="matchedCard.key"
      :value="matchedCard.key"
    >
      <ImageDetail :image="matchedCard.image" />
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped></style>
