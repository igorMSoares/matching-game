<script setup lang="ts">
import { useCardDeckStore } from '@/stores/cardDeck';
import { onUpdated, defineEmits } from 'vue';

const emit = defineEmits(['selectCard']);

const { cardList, thumbnailSize } = defineProps<{
  cardList: Card[];
  thumbnailSize: string;
}>();
const THUMB_SIZE_FALLBACK = '5rem';

const cardDeckStore = useCardDeckStore();

onUpdated(() =>
  emit('selectCard', cardDeckStore.lastMatch, { thumbnailClick: false })
);
</script>

<template>
  <v-container class="elevation-8 rounded-lg mb-6 pa-0 bg-blue-grey-lighten-5">
    <v-row justify="center" class="pa-2" dense>
      <v-col v-for="card of cardList" :key="card.key" cols="auto">
        <v-btn
          class="pa-0"
          :height="thumbnailSize ?? THUMB_SIZE_FALLBACK"
          :width="thumbnailSize ?? THUMB_SIZE_FALLBACK"
        >
          <v-img
            :height="thumbnailSize ?? THUMB_SIZE_FALLBACK"
            :width="thumbnailSize ?? THUMB_SIZE_FALLBACK"
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
