<script setup lang="ts">
import { ref } from 'vue';
import ImagesCarousel from './ImagesCarousel.vue';
import GalleryThumbs from './GalleryThumbs.vue';
import { useCardDeckStore } from '@/stores/cardDeck';

const emit = defineEmits(['galleryError']);

const { startGame, imagesCount } = defineProps<{
  startGame: Boolean;
  imagesCount: number;
}>();

const selectedCard = ref<Card | null>(null);
const showDetails = ref<Boolean>(false);

const displayMsg = ref<Boolean | undefined>(false);

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

  <v-alert
    v-model="displayMsg"
    type="info"
    :text="'Start the game and find the match of this card to see its full image and description.'"
    closable
    class="w-75 mx-auto mb-5 text-center font-weight-medium text-subtitle-1"
  />

  <GalleryThumbs
    :card-list="startGame ? cardDeckStore.matchedCards : cardDeckStore.cardList"
    :thumbnail-size="startGame ? '5rem' : '15rem'"
    @selectCard="(card, opts) => showCardImage(card, opts)"
  />
</template>

<style scoped></style>
