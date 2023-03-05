<script setup lang="ts">
export interface Props {
  text?: string;
}
const { text } = withDefaults(defineProps<Props>(), {
  text: 'Loading images from outter space...',
});
</script>

<template>
  <v-alert
    color="brown-darken-4"
    :text="text"
    icon="mdi-alien-outline"
    variant="text"
    class="w-50 my-5 mx-auto"
    prominent
  >
    <v-progress-linear indeterminate :height="6" color="brown-darken-4" />
  </v-alert>
</template>

<style scoped></style>
