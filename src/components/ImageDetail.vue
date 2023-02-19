<script setup lang="ts">
import { defineProps } from 'vue';

const { image } = defineProps<{ image: APODImg }>();
</script>

<template>
  <v-card
    v-if="image"
    variant="elevated"
    class="image-display d-flex flex-column justify-center align-center mb-6 px-6 py-6 bg-blue-grey-lighten-5"
    :elevation="4"
  >
    <v-card-title class="text-center">{{ image.title }}</v-card-title>
    <v-img :src="image.url" :alt="image.title" width="auto" class="image" />
    <v-card-text class="explanation text-justify overflow-x-auto pt-0 mt-4">
      <p>
        {{ image.explanation }}
      </p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.image-display {
  height: 80vh;
}

.image {
  flex-grow: 0;
  max-height: 65%;
}

.explanation {
  font-size: 1.25rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.25em;
  flex-grow: 0;
  max-width: 90ch;
  min-width: 38ch;
}
</style>
