<script setup lang="ts">
import { useCardDeckStore } from '@/stores/cardDeck';
import { onBeforeUpdate } from 'vue';

const emit = defineEmits(['selectCard']);

const { cardList, thumbnailSize, thumbnailMargins, className } = defineProps<{
  cardList: Card[];
  thumbnailSize: string;
  thumbnailMargins: number;
  className: string;
}>();
const THUMB_SIZE_FALLBACK = '5rem';

const cardDeckStore = useCardDeckStore();

let lastMatch: Card | null = null;
onBeforeUpdate(() => {
  if (lastMatch && cardDeckStore.lastMatch !== lastMatch) {
    emit('selectCard', cardDeckStore.lastMatch, { thumbnailClick: false });
  }
  lastMatch = cardDeckStore.lastMatch;
});
</script>

<template>
  <v-container
    class="elevation-8 rounded-lg mb-6 pa-0 bg-amber-lighten-2"
    :class="className"
  >
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
                @click="$emit('selectCard', card, { thumbnailClick: true })"
              >
                <template v-slot:placeholder>
                  <div
                    class="bg-amber-lighten-4 d-flex align-center justify-center fill-height"
                  >
                    <v-progress-circular
                      color="brown-darken-4"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>
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

.bg-blue {
  background-color: #073248 !important;
}

.bg-blue .v-card {
  border: 0.125rem solid #fff;
}
</style>
