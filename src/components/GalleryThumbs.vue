<script setup lang="ts">
import { useCardDeckStore } from '@/stores/cardDeck';

const cardDeckStore = useCardDeckStore();
</script>

<template>
  <v-container
    v-if="cardDeckStore.matchedCards.length > 0"
    class="elevation-8 rounded-lg mb-6 pa-0 bg-blue-grey-lighten-5"
  >
    <v-row justify="center" class="pa-2" dense>
      <v-col
        v-for="card of cardDeckStore.matchedCards"
        :key="card.key"
        cols="auto"
      >
        <v-img
          :src="card.image.url"
          height="5rem"
          width="5rem"
          cover
          class="rounded"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
