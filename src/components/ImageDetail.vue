<script setup lang="ts">
import { useCardDeckStore } from '@/stores/cardDeck';

const cardDeckStore = useCardDeckStore();
</script>

<template>
  <v-card
    v-if="cardDeckStore.lastMatch"
    variant="elevated"
    class="image-display mb-6 w-auto bg-blue-grey-lighten-5"
    :elevation="4"
  >
    <!-- <v-card-item class="image-display"> -->
    <v-card-title class="text-center">{{
      cardDeckStore.lastMatch.image.title
    }}</v-card-title>
    <v-card-item class="d-flex justify-center">
      <v-img
        :src="cardDeckStore.lastMatch.image.url"
        :alt="cardDeckStore.lastMatch.image.title"
        width="auto"
      />
    </v-card-item>
    <v-card-text class="text-justify px-9 pt-5">{{
      cardDeckStore.lastMatch.image.explanation
    }}</v-card-text>
    <!-- </v-card-item> -->
  </v-card>
</template>

<style scoped>
.image-display {
  /* height: clamp(20rem, 100%, 25rem);
  width: clamp(19rem, 80vw, 70%); */
  padding: 2rem 0;
  margin: 0 auto;
}
</style>
