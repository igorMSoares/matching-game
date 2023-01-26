<script setup lang="ts">
import ApodImage from '../components/ApodImage.vue';
</script>

<template>
  <main>
    <Suspense>
      <ApodImage />

      <template #fallback> Loading... </template>
    </Suspense>
  </main>
</template>
