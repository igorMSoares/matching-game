<script setup lang="ts">
import { useCardDeckStore } from '@/stores/cardDeck';
import { onUpdated, defineEmits } from 'vue';

const cardDeckStore = useCardDeckStore();

const emit = defineEmits(['selectCard']);

onUpdated(() => emit('selectCard', cardDeckStore.lastMatch));
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
        <v-btn class="pa-0" height="5rem" width="5rem">
          <v-img
            height="5rem"
            width="5rem"
            :src="card.image.url"
            cover
            class="rounded"
            @click="$emit('selectCard', card)"
          />
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
