<script setup lang="ts">
import { defineProps } from 'vue';
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay();

const { image } = defineProps<{ image: APODImg }>();
</script>

<template>
  <v-card
    v-if="image"
    class="image-display d-flex flex-column justify-center align-center px-6 py-6 bg-amber-lighten-3 text-brown-darken-4 rounded-lg"
    :class="smAndDown ? 'pb-13' : ''"
  >
    <v-card-title class="text-center pb-4"
      ><h2>{{ image.title }}</h2></v-card-title
    >
    <v-img
      :src="image.url"
      :alt="image.title"
      width="auto"
      class="image"
      eager
    />
    <v-card-text
      class="explanation text-justify overflow-x-auto pt-0 mt-4 w-100"
    >
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
  font-size: clamp(1rem, 4vw, 1.25rem);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.25em;
  flex-grow: 0;
  max-width: 90ch;
  min-width: 36ch;
}
</style>
