<script setup lang="ts">
import { ref } from 'vue';
import CardDeck from '../components/CardDeck.vue';
import ImagesGallery from '../components/ImagesGallery.vue';

const err = ref<string | null>(null);
const imagesCount = ref(10);
const startGame = ref(false);
</script>

<template>
  <main>
    <div v-if="err">
      <p>
        Sorry, a problem has occurred while fetching images from Nasa. Please
        try again soon.
      </p>
    </div>

    <Suspense>
      <ImagesGallery
        :start-game="startGame"
        :images-count="imagesCount"
        @gallery-error="(error: string) => (err = error)"
      />

      <template #fallback>
        <h3>Loading Cards...</h3>
      </template>
    </Suspense>

    <CardDeck v-if="startGame" :images-count="imagesCount" />
  </main>
</template>

<style scoped></style>
