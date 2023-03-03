<script setup lang="ts">
import { ref } from 'vue';
import ImagesCarousel from './ImagesCarousel.vue';
import GalleryThumbs from './GalleryThumbs.vue';
import { useCardDeckStore } from '@/stores/cardDeck';

const emit = defineEmits(['galleryError']);

const { startGame, imagesCount } = defineProps<{
  startGame: boolean;
  imagesCount: number;
}>();

const selectedCard = ref<Card | null>(null);
const showDetails = ref<boolean>(false);

const displayMsg = ref<boolean>(false);

const cardDeckStore = useCardDeckStore();

try {
  await cardDeckStore.initCardDeck(imagesCount);
} catch (error) {
  const DEFAULT_ERROR_MSG = 'Error while fetching from the APOD API';
  const errorMsg = error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
  emit('galleryError', errorMsg);
}

const showCardImage = (card: Card, opts = { thumbnailClick: true }) => {
  selectedCard.value = card;
  if (!startGame) displayMsg.value = true;
  else if (!showDetails.value && opts.thumbnailClick) showDetails.value = true;
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
      v-model="displayMsg"
      type="info"
      :text="'Start the game and find the match of this card to see its full image and description.'"
      closable
      class="w-75 mx-auto my-5 text-center font-weight-medium text-subtitle-1"
    />
  </v-slide-y-transition>

  <GalleryThumbs
    :card-list="startGame ? cardDeckStore.matchedCards : cardDeckStore.cardList"
    :thumbnail-size="startGame ? '5rem' : '15rem'"
    :thumbnail-margins="startGame ? 1 : 3"
    @selectCard="(card, opts) => showCardImage(card, opts)"
    class="my-5"
  />
</template>

<style scoped></style>
