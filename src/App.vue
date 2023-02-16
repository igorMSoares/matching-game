<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app style="min-width: 20rem">
    <v-toolbar
      dark
      title="Matching Game"
      density="compact"
      :elevation="2"
      class="bg-blue-grey-darken-1"
    ></v-toolbar>

    <v-main>
      <v-container><RouterView /></v-container
    ></v-main>
  </v-app>
</template>

<style scoped></style>
