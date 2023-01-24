<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
const apiRes = await axios.get('/api/getImages');
const images = apiRes.data;

onMounted(() => {
  console.log(images);
});
</script>

<template>
  <img v-for="image in images" :src="image.url" :key="image.title" />
</template>
