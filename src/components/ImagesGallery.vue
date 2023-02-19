<script setup lang="ts">
import { computed } from 'vue';
import ImageDetail from './ImageDetail.vue';
import { useCardDeckStore } from '@/stores/cardDeck';
import { useDisplay } from 'vuetify';

const cardDeckStore = useCardDeckStore();

const lastMatch = computed(() => cardDeckStore.lastMatch?.key);

const { mdAndUp } = useDisplay();
</script>

<template>
  <v-carousel
    v-if="cardDeckStore.matchedCards.length > 0"
    class="mb-6 elevation-8"
    :show-arrows="'hover' && mdAndUp"
    hide-delimiter-background
    :hide-delimiters="mdAndUp"
    delimiter-icon="mdi-image"
    :model-value="lastMatch"
    height="80vh"
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
