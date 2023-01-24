<script setup lang="ts">
import ApodImage from '../components/ApodImage.vue';
</script>

<template>
  <main>
    <h2>Hellow</h2>
    <Suspense>
      <ApodImage />

      <template #fallback> Loading... </template>
    </Suspense>
  </main>
</template>
