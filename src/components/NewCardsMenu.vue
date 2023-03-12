<script setup lang="ts">
import MenuList from './MenuList.vue';

type MenuItem = { value: number; title: string };

defineEmits(['generateImages']);

const { activatorSelector } = defineProps<{ activatorSelector: string }>();

const values = [5, 10, 12, 15, 18, 20, 22, 25];
const items: MenuItem[] = values.map((value) => {
  return { value, title: `${value} Images` };
});
</script>

<template>
  <v-menu
    :activator="activatorSelector"
    location="end"
    transition="scale-transition"
    :attach="activatorSelector"
    open-on-hover
  >
    <MenuList
      :items="items"
      @generate-images="
        (numberOfImages) => $emit('generateImages', numberOfImages)
      "
    />
  </v-menu>
</template>

<style scoped>
.v-list {
  width: max-content;
  background-color: #ffecb3 !important;
}
</style>
