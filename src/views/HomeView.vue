<script setup lang="ts">
import { ref, computed } from 'vue';
import CardDeck from '../components/CardDeck.vue';
import ImagesGallery from '../components/ImagesGallery.vue';
import GameOptions from '../components/GameOptions.vue';
import Loading from '../components/Loading.vue';
import { useCardDeckStore } from '@/stores/cardDeck';
import { useCardImageStore } from '@/stores/cardImage';
import { AxiosError } from 'axios';

const err = ref<string | null>(null);
const imagesCount = ref(10);
const gameStarted = ref(false);
const loadingImages = ref(false);

const cardDeckStore = useCardDeckStore();

const apiRequest = async (asyncReqHandler: Function) => {
  try {
    loadingImages.value = true;
    await asyncReqHandler();
    loadingImages.value = false;
  } catch (error: unknown) {
    const DEFAULT_ERROR_MSG = `
      Houston, we have a problem: unable to fetch images from Nasa. 
      Please try again in a couple of minutes.
    `;
    err.value =
      error instanceof Error || error instanceof AxiosError
        ? error.message
        : DEFAULT_ERROR_MSG;
  }
};

if (cardDeckStore.totalCards === 0) {
  await apiRequest(async () => {
    await cardDeckStore.initCardDeck(imagesCount.value);
  });
}

const startGame = () => {
  gameStarted.value = true;
};

const restartGame = () => cardDeckStore.clearMatches();

const newGame = () => {
  cardDeckStore.clearMatches();
  gameStarted.value = false;
};

const refetchImages = async (quantity: number) => {
  await apiRequest(async () => {
    const cardImageStore = useCardImageStore();

    await cardImageStore.reFetchImages(quantity);
    cardDeckStore.initCardDeck(quantity);
  });
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
          {{ err }}
        </p>
      </v-alert>
    </v-slide-y-transition>

    <v-alert v-if="!gameStarted && !loadingImages" color="brown-darken-4" variant="text"
      text="Start the game and find the matching cards to see the entire image along with its description"
      class="mx-auto w-75 text-center text-h6" prominent>
      <br />
      <span class="text-subtitle-1">
        Click <v-icon icon="mdi-restart" /> to generate new images
      </span>
    </v-alert>

    <v-container>
      <GameOptions v-if="!gameStarted && !loadingImages" :game-started="gameStarted" @start-game="startGame"
        @refetch-images="quantity => refetchImages(quantity)" />

      <ImagesGallery v-if="!loadingImages" :game-started="gameStarted" :card-list="cardList" />
      <Loading v-else-if="!err" />
    </v-container>

    <CardDeck v-if="gameStarted" :images-count="imagesCount" />

    <GameOptions v-if="gameStarted" :game-started="gameStarted" @restart-game="restartGame" @new-game="newGame" />
  </main>
</template>

<style scoped></style>
