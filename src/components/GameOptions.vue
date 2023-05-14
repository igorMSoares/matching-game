<script setup lang="ts">
import { toRefs } from 'vue';
import OptionsBtn from './OptionsBtn.vue';
import NewCardsMenu from './NewCardsMenu.vue';

defineEmits(['newGame', 'restartGame', 'startGame', 'refetchImages']);

const props = defineProps<{
  gameStarted: boolean;
  tooManyRequests?: boolean;
}>();
const { gameStarted, tooManyRequests } = toRefs(props);
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

    <div
      id="new-cards-btn"
      class="restart-icon"
      v-if="!gameStarted && !tooManyRequests"
    >
      <OptionsBtn :iconName="'mdi-restart'" />
    </div>

    <OptionsBtn
      v-if="!gameStarted"
      :iconName="'mdi-play-circle'"
      :btnText="'Start Game'"
      @click="$emit('startGame')"
    />
  </div>
  <NewCardsMenu
      v-if="!gameStarted && !tooManyRequests"
    :activatorSelector="'#new-cards-btn'"
    @generateImages="quantity => $emit('refetchImages', quantity)"
  />
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
