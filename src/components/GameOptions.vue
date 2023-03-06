<script setup lang="ts">
import { toRefs } from 'vue';
import OptionsBtn from './OptionsBtn.vue';

defineEmits(['newGame', 'restartGame', 'startGame', 'refetchImages']);

const props = defineProps<{ gameStarted: boolean }>();
const { gameStarted } = toRefs(props);
</script>

<template>
  <div class="icons-wrapper d-flex justify-center align-center">
    <OptionsBtn
      v-if="gameStarted"
      :iconName="'mdi-autorenew'"
      :btnText="'New Game'"
      @click="$emit('newGame')"
    />

    <OptionsBtn
      v-if="gameStarted"
      :iconName="'mdi-reload'"
      :btnText="'Restart Game'"
      @click="$emit('restartGame')"
    />

    <v-hover v-slot="{ isHovering, props }">
      <v-btn
        v-if="!gameStarted"
        title="Generate new cards"
        icon="mdi-restart"
        :class="`text-brow-darken-4 restart-icon`"
        color="amber-accent-1"
        v-bind="props"
        :elevation="isHovering ? 8 : 5"
        @click="$emit('refetchImages')"
      />
    </v-hover>

    <OptionsBtn
      v-if="!gameStarted"
      :iconName="'mdi-play-circle'"
      :btnText="'Start Game'"
      @click="$emit('startGame')"
    />
  </div>
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
