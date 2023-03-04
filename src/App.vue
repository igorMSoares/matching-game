<script setup lang="ts">
import { RouterView } from 'vue-router';
import Loading from './components/Loading.vue';
</script>

<template>
  <v-app class="app-min-width">
    <v-toolbar
      dark
      title="Matching Game"
      density="compact"
      :elevation="2"
      class="bg-blue-grey-darken-1"
    ></v-toolbar>

    <v-main>
      <v-container class="main-container">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <component :is="Component" />
              <template #fallback>
                <Loading />
              </template>
            </Suspense>
          </template>
        </RouterView>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.app-min-width {
  min-width: 23.5rem;
}

.main-container {
  max-width: 80rem;
}
</style>
