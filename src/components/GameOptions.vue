<script setup lang="ts">
import { toRefs } from 'vue';

defineEmits(['restartGame', 'startGame', 'refetchImages']);

const props = defineProps<{ gameStarted: boolean }>();
const { gameStarted } = toRefs(props);
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <div class="d-flex justify-center align-center">
      <v-btn
        v-if="gameStarted"
        class="mx-auto"
        color="indigo-lighten-1 text-h6"
        height="3rem"
        v-bind="props"
        :elevation="isHovering ? 8 : 5"
        @click="$emit('restartGame')"
      >
        <v-icon class="mr-1">mdi-reload</v-icon>
        Restart Game
      </v-btn>
      <v-btn
        v-if="!gameStarted"
        class="mx-auto"
        color="indigo-lighten-1 text-h6"
        height="3rem"
        v-bind="props"
        :elevation="isHovering ? 8 : 5"
        @click="$emit('startGame')"
      >
        <v-icon class="mr-1">mdi-play-circle</v-icon>
        Start Game
      </v-btn>
      <v-btn
        v-if="!gameStarted"
        title="Generate new cards"
        icon="mdi-restart"
        class="mx-3"
        color="indigo-lighten-3"
        v-bind="props"
        :elevation="isHovering ? 8 : 5"
        @click="$emit('refetchImages')"
      />
    </div>
  </v-hover>
</template>

<style scoped></style>
