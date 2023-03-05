<script setup lang="ts">
import { toRefs } from 'vue';

defineEmits(['newGame', 'restartGame', 'startGame', 'refetchImages']);

const props = defineProps<{ gameStarted: boolean }>();
const { gameStarted } = toRefs(props);
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <div
      class="icons-wrapper d-flex justify-center align-center"
      :class="!gameStarted ? 'flex-column' : ''"
    >
      <v-btn
        v-if="gameStarted"
        class="ma-auto text-h6 text-brown-darken-4 w-xs-100"
        color="amber-accent-3"
        height="3rem"
        v-bind="props"
        :elevation="isHovering ? 8 : 5"
        @click="$emit('newGame')"
      >
        <v-icon class="mr-1">mdi-autorenew</v-icon>
        New Game
      </v-btn>

      <v-btn
        v-if="gameStarted"
        class="ma-auto text-h6 text-brown-darken-4"
        color="amber-accent-3"
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
        title="Generate new cards"
        icon="mdi-restart"
        class="text-brown-darken-4 restart-icon"
        color="amber-accent-1"
        v-bind="props"
        :elevation="isHovering ? 8 : 5"
        @click="$emit('refetchImages')"
      />

      <v-btn
        v-if="!gameStarted"
        class="ma-3 text-h6 text-brown-darken-4"
        color="amber-accent-3"
        height="3rem"
        v-bind="props"
        :elevation="isHovering ? 8 : 5"
        @click="$emit('startGame')"
      >
        <v-icon class="mr-1">mdi-play-circle</v-icon>
        Start Game
      </v-btn>
    </div>
  </v-hover>
</template>

<style scoped>
.icons-wrapper {
  position: relative;
  gap: 1rem;
}
.restart-icon {
  position: absolute;
  right: 3%;
}
</style>
