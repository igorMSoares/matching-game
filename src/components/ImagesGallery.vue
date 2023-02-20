<script setup lang="ts">
import { ref } from 'vue';
import ImagesCarousel from './ImagesCarousel.vue';
import GalleryThumbs from './GalleryThumbs.vue';

const selectedCard = ref<Card | null>(null);

const showDetails = ref<Boolean>(false);

const showCardImage = (card: Card, opts = { thumbnailClick: true }) => {
  selectedCard.value = card;
  if (!showDetails.value && opts.thumbnailClick) showDetails.value = true;
};
</script>

<template>
  <ImagesCarousel
    v-show="showDetails"
    :selected-card="selectedCard"
    @close-image-details="showDetails = false"
  />

  <GalleryThumbs @selectCard="(card, opts) => showCardImage(card, opts)" />
</template>

<style scoped></style>
