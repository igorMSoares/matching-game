<script setup lang="ts">
import { ref, computed } from 'vue';
import CardDeck from '../components/CardDeck.vue';
import ImagesGallery from '../components/ImagesGallery.vue';
import GameOptions from '../components/GameOptions.vue';
import Loading from '../components/Loading.vue';
import { useCardDeckStore } from '@/stores/cardDeck';
import { useCardImageStore } from '@/stores/cardImage';

const err = ref<string | null>(null);
const imagesCount = ref(10);
const gameStarted = ref(false);
const loadingImages = ref(false);

const cardDeckStore = useCardDeckStore();

if (cardDeckStore.totalCards === 0) {
  try {
    loadingImages.value = true;
    await cardDeckStore.initCardDeck(imagesCount.value);
    loadingImages.value = false;
  } catch (error) {
    const DEFAULT_ERROR_MSG = 'Error while fetching from the APOD API';
    err.value = error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
    console.error(err.value);
  }
}

const startGame = () => {
  gameStarted.value = true;
};

const restartGame = () => cardDeckStore.clearMatches();

const newGame = () => {
  cardDeckStore.clearMatches();
  gameStarted.value = false;
};

const refetchImages = async () => {
  try {
    const cardImageStore = useCardImageStore();

    loadingImages.value = true;
    await cardImageStore.reFetchImages();
    loadingImages.value = false;
    cardDeckStore.initCardDeck(10);
  } catch (error) {
    const DEFAULT_ERROR_MSG = 'Error while fetching from the APOD API';
    err.value = error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
    console.error(err.value);
  }
};

const cardList = computed(() =>
  gameStarted.value ? cardDeckStore.matchedCards : cardDeckStore.cardList
);
</script>

<template>
  <main>
    <v-slide-y-transition>
      <v-alert v-if="err" type="error" class="w-75 mx-auto my-5">
        <p>
          Sorry, a problem has occurred while fetching images from Nasa. Please
          try again soon.
        </p>
      </v-alert>
    </v-slide-y-transition>

    <GameOptions
      v-if="!gameStarted && !loadingImages"
      :game-started="gameStarted"
      @start-game="startGame"
      @refetch-images="refetchImages"
    />

    <ImagesGallery
      v-if="!loadingImages"
      :game-started="gameStarted"
      :card-list="cardList"
    />
    <Loading v-else-if="!err" />

    <CardDeck v-if="gameStarted" :images-count="imagesCount" />

    <GameOptions
      v-if="gameStarted"
      :game-started="gameStarted"
      @restart-game="restartGame"
      @new-game="newGame"
    />
  </main>
</template>

<style scoped></style>
