<script setup lang="ts">
import CardDeck from '../components/CardDeck.vue';
import ImageDetail from '../components/ImageDetail.vue';

import { ref } from 'vue';

const imagesCount = ref(10);

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

    <ImageDetail />

    <Suspense>
      <CardDeck
        :images-count="imagesCount"
        @deck-error="(error: string) => (err = error)"
      />

      <template #fallback> Loading... </template>
    </Suspense>
  </main>
</template>

<style scoped>
.image-display {
  height: clamp(20rem, 100%, 25rem);
  width: clamp(19rem, 80vw, 70%);
  padding: 2rem 0;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
  font-size: 1rem;
  font-weight: bolder;
}
</style>
