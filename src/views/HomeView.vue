<script setup lang="ts">
import CardDeck from '../components/CardDeck.vue';
import ImagesGallery from '../components/ImagesGallery.vue';

import { ref } from 'vue';

const imagesCount = ref(10);
const startGame = ref(false);

const err = ref<string | null>(null);
</script>

<template>
  <main>
    <div v-if="err">
      <p>
        Sorry, a problem has occurred while fetching images from Nasa. Please
        try again soon.
      </p>
    </div>

    <ImagesGallery />

    <Suspense>
      <CardDeck
        :images-count="imagesCount"
        @deck-error="(error: string) => (err = error)"
      />

      <template #fallback>
        <h3>Loading...</h3>
      </template>
    </Suspense>
  </main>
</template>

<style scoped></style>
