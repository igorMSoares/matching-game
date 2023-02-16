<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <v-toolbar
      dark
      title="Matching Game"
      density="compact"
      :elevation="4"
      class="bg-teal-darken-1"
    ></v-toolbar>

    <v-main>
      <v-container><RouterView /></v-container
    ></v-main>
  </v-app>
</template>

<style scoped></style>
