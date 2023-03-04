<script setup lang="ts">
import { toRefs } from 'vue';
defineEmits(['selectCard']);

const props = defineProps<{ card: Card }>();
const { card } = toRefs(props);
</script>

<template>
  <v-card
    v-if="!card.foundMatch"
    :elevation="4"
    :loading="true"
    :id="card.key + `_${card.id}`"
    class="card"
    :class="{
      'gradient-background': !card.foundMatch,
      pointer: !card.isSelected && !card.foundMatch,
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
  </v-card>
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
}

.gradient-background {
  background: rgb(57, 214, 154);
  background: linear-gradient(
    324deg,
    rgba(57, 214, 154, 1) 0%,
    rgba(60, 3, 48, 1) 78%
  );
}

.pointer {
  cursor: pointer;
}
</style>
