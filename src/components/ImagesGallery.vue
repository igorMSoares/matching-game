<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import ImagesCarousel from './ImagesCarousel.vue';
import GalleryThumbs from './GalleryThumbs.vue';

const props = defineProps<{
  gameStarted: boolean;
  cardList: Card[];
}>();

const { gameStarted, cardList } = toRefs(props);
const selectedCard = ref<Card | null>(null);
const showDetails = ref<boolean>(false);
const displayMsg = ref<boolean>(false);

watch(gameStarted, (_, newGame) => {
  if (newGame) showDetails.value = false;
});

watch(cardList, (now, _) => {
  if (now.length === 0) {
    // game was restarted
    showDetails.value = false;
  }
});

const showCardImage = (card: Card, opts = { thumbnailClick: false }) => {
  selectedCard.value = card;
  if (!gameStarted.value && opts.thumbnailClick) {
    displayMsg.value = true;
    setTimeout(() => (displayMsg.value = false), 3500);
  } else if (!showDetails.value && opts.thumbnailClick)
    showDetails.value = true;
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
      v-if="!gameStarted"
      v-model="displayMsg"
      type="info"
      :text="'Start the game and find the match of this card to see its full image and description.'"
      closable
      class="w-75 mx-auto my-5 text-center font-weight-medium text-subtitle-1"
    />
  </v-slide-y-transition>

  <v-slide-y-transition>
    <GalleryThumbs
      v-show="cardList.length > 0"
      :card-list="cardList"
      :thumbnail-size="gameStarted ? '5rem' : '15rem'"
      :thumbnail-margins="gameStarted ? 1 : 3"
      @select-card="(card, opts) => showCardImage(card, opts)"
      class="my-5"
    />
  </v-slide-y-transition>
</template>

<style scoped></style>
