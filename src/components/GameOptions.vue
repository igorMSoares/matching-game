<script setup lang="ts">
defineEmits(['startGame', 'refetchImages']);
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <div class="d-flex justify-center align-center">
      <v-btn
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
