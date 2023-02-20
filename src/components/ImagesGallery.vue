<script setup lang="ts">
import { ref } from 'vue';
import ImagesCarousel from './ImagesCarousel.vue';
import GalleryThumbs from './GalleryThumbs.vue';

const selectedCard = ref<Card | null>(null);

const showDetails = ref<Boolean>(true);

const showCardImage = (card: Card) => {
  selectedCard.value = card;
  if (!showDetails.value) showDetails.value = true;
};
</script>

<template>
  <ImagesCarousel
    v-show="showDetails"
    :selected-card="selectedCard"
    @close-image-details="showDetails = false"
  />

  <GalleryThumbs @selectCard="(card) => showCardImage(card)" />
</template>

<style scoped></style>
