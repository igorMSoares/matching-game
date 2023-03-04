<script setup lang="ts">
import { ref } from 'vue';
import CardDeck from '../components/CardDeck.vue';
import ImagesGallery from '../components/ImagesGallery.vue';
import GameOptions from '../components/GameOptions.vue';
import { useCardDeckStore } from '@/stores/cardDeck';

const err = ref<string | null>(null);
const imagesCount = ref(10);
const startGame = ref(false);

const cardDeckStore = useCardDeckStore();

try {
  await cardDeckStore.initCardDeck(imagesCount.value);
} catch (error) {
  const DEFAULT_ERROR_MSG = 'Error while fetching from the APOD API';
  err.value = error instanceof Error ? error.message : DEFAULT_ERROR_MSG;
}
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

    <GameOptions @start-game="startGame = true" v-if="!startGame" />

    <ImagesGallery
      :start-game="startGame"
      :card-list="
        startGame ? cardDeckStore.matchedCards : cardDeckStore.cardList
      "
    />

    <CardDeck v-if="startGame" :images-count="imagesCount" />
  </main>
</template>

<style scoped></style>
