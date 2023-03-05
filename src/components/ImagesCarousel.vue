<script setup lang="ts">
import ImageDetail from './ImageDetail.vue';
import { useCardDeckStore } from '@/stores/cardDeck';
import { useDisplay } from 'vuetify';

const cardDeckStore = useCardDeckStore();

const { mdAndUp } = useDisplay();

const { selectedCard } = defineProps<{ selectedCard: Card | null }>();
</script>

<template>
  <v-expand-transition origin="bottom center">
    <v-carousel
      v-if="cardDeckStore.matchedCards.length > 0"
      class="carousel mb-6"
      :show-arrows="'hover' && mdAndUp"
      hide-delimiter-background
      :hide-delimiters="mdAndUp"
      delimiter-icon="mdi-image"
      :model-value="selectedCard?.key"
      height="80vh"
    >
      <v-btn
        class="close-icon"
        variant="plain"
        icon="mdi-close"
        title="Close Image Description"
        @click="$emit('closeImageDetails')"
      />
      <v-carousel-item
        v-for="matchedCard in cardDeckStore.matchedCards"
        :key="matchedCard.key"
        :value="matchedCard.key"
      >
        <ImageDetail :image="matchedCard.image" />
      </v-carousel-item>
    </v-carousel>
  </v-expand-transition>
</template>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  transition-timing-function: cubic-bezier(0.47, 0.64, 0.83, 0.67);
}

.close-icon {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  z-index: 1;
}
</style>
