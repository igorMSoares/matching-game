<script setup lang="ts">
import { toRefs } from 'vue';

defineEmits(['selectCard']);

const props = defineProps<{ card: Card }>();
const { card } = toRefs(props);
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-if="!card.foundMatch"
      v-bind="props"
      :elevation="isHovering ? 12 : 8"
      :id="card.key + `_${card.id}`"
      class="card"
      :class="{
        'card-background': !card.foundMatch,
        pointer: !card.isSelected && !card.foundMatch,
        'no-border': !card.foundMatch && card.isSelected,
      }"
      @click.stop="$emit('selectCard', card.id)"
      role="button"
    >
      <v-img
        v-show="!card.foundMatch && card.isSelected"
        :src="card.image.url"
        :alt="card.image.title"
        :title="card.image.title"
        :aspect-ratio="1"
        cover
        loading="lazy"
      />
      <v-img :src="'/planet-icon.png'" class="w-75 ma-auto h-100" />
    </v-card>
  </v-hover>
</template>

<style scoped>
.card > img {
  width: 100%;
  height: 100%;
}

.card {
  user-select: none;
  cursor: default;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  background: transparent;
  overflow: hidden;
  border: 0.4rem solid rgb(255, 255, 255);
}

.no-border {
  border: none;
}

.card-background {
  background-color: #073248;
}

.pointer {
  cursor: pointer;
}

.v-card {
  --v-shadow-key-umbra-opacity: rgba(0, 0, 0, 0.5);
  --v-shadow-key-penumbra-opacity: rgba(0, 0, 0, 0.3);
}
</style>
