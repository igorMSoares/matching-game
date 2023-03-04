<script setup lang="ts">
import { ref } from 'vue';
import ImagesCarousel from './ImagesCarousel.vue';
import GalleryThumbs from './GalleryThumbs.vue';

const { startGame } = defineProps<{
  startGame: boolean;
  cardList: Card[];
}>();

const selectedCard = ref<Card | null>(null);
const showDetails = ref<boolean>(false);
const displayMsg = ref<boolean>(false);

const showCardImage = (card: Card, opts = { thumbnailClick: false }) => {
  selectedCard.value = card;
  if (!startGame) displayMsg.value = true;
  if (!showDetails.value && opts.thumbnailClick) showDetails.value = true;
};
</script>

<template>
  <ImagesCarousel
    v-show="showDetails"
    :selected-card="selectedCard"
    @close-image-details="showDetails = false"
  />

  <v-slide-y-transition>
    <v-alert
      v-if="!startGame"
      v-model="displayMsg"
      type="info"
      :text="'Start the game and find the match of this card to see its full image and description.'"
      closable
      class="w-75 mx-auto my-5 text-center font-weight-medium text-subtitle-1"
    />
  </v-slide-y-transition>

  <GalleryThumbs
    v-show="cardList.length > 0"
    :card-list="cardList"
    :thumbnail-size="startGame ? '5rem' : '15rem'"
    :thumbnail-margins="startGame ? 1 : 3"
    @select-card="(card, opts) => showCardImage(card, opts)"
    class="my-5"
  />
</template>

<style scoped></style>
