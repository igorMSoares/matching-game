<script setup lang="ts">
import { useCardDeckStore } from '@/stores/cardDeck';
import { onUpdated } from 'vue';

const emit = defineEmits(['selectCard']);

const { cardList, thumbnailSize, thumbnailMargins } = defineProps<{
  cardList: Card[];
  thumbnailSize: string;
  thumbnailMargins: number;
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
      <v-col
        v-for="card of cardList"
        :key="card.key"
        cols="auto"
        :class="`ma-${thumbnailMargins}`"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card v-bind="props" :elevation="isHovering ? 10 : 5">
            <v-btn
              class="pa-0"
              variant="text"
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
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  --v-shadow-key-umbra-opacity: rgba(0, 0, 0, 0.5);
  --v-shadow-key-penumbra-opacity: rgba(0, 0, 0, 0.3);
}
</style>
