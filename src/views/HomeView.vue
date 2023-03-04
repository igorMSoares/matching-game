<script setup lang="ts">
import { ref, computed } from 'vue';
import CardDeck from '../components/CardDeck.vue';
import ImagesGallery from '../components/ImagesGallery.vue';
import GameOptions from '../components/GameOptions.vue';
import { useCardDeckStore } from '@/stores/cardDeck';
import { useCardImageStore } from '@/stores/cardImage';

const err = ref<string | null>(null);
const imagesCount = ref(10);
const gameStarted = ref(false);

const cardDeckStore = useCardDeckStore();

if (cardDeckStore.totalCards === 0) {
  try {
    await cardDeckStore.initCardDeck(imagesCount.value);
  } catch (error) {
    const DEFAULT_ERROR_MSG = 'Error while fetching from the APOD API';
    err.value = error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
  }
}

const startGame = () => {
  gameStarted.value = true;
};

const restartGame = () => cardDeckStore.clearMatches();

const refetchImages = async () => {
  const cardImageStore = useCardImageStore();

  await cardImageStore.reFetchImages();
  cardDeckStore.initCardDeck(10);
};

const cardList = computed(() =>
  gameStarted.value ? cardDeckStore.matchedCards : cardDeckStore.cardList
);
</script>

<template>
  <main>
    <v-slide-y-transition>
      <v-alert v-if="err" type="error" closable class="w-75 mx-auto my-5">
        <p>
          Sorry, a problem has occurred while fetching images from Nasa. Please
          try again soon.
        </p>
      </v-alert>
    </v-slide-y-transition>

    <GameOptions
      v-if="!gameStarted"
      :game-started="gameStarted"
      @start-game="startGame"
      @refetch-images="refetchImages"
    />

    <ImagesGallery :game-started="gameStarted" :card-list="cardList" />

    <CardDeck v-if="gameStarted" :images-count="imagesCount" />

    <GameOptions
      v-if="gameStarted"
      :game-started="gameStarted"
      @restart-game="restartGame"
    />
  </main>
</template>

<style scoped></style>
