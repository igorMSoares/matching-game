<script setup lang="ts">
import { defineProps } from 'vue';

const { image } = defineProps<{ image: APODImg }>();
</script>

<template>
  <v-card
    v-if="image"
    variant="elevated"
    class="image-display mb-6 w-auto bg-blue-grey-lighten-5"
    :elevation="4"
  >
    <v-card-title class="text-center">{{ image.title }}</v-card-title>
    <v-card-item class="image d-flex justify-center">
      <v-img :src="image.url" :alt="image.title" width="auto" />
    </v-card-item>
    <v-card-text class="text-justify px-9 pt-5">{{
      image.explanation
    }}</v-card-text>
  </v-card>
</template>

<style scoped>
.image-display {
  padding: 2rem 0;
  margin: 0 auto;
}
</style>
