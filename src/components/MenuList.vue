<script setup lang="ts">
const { items } = defineProps<{
  items: Array<{ value: number; title: string }>;
}>();
</script>

<template>
  <v-list>
    <v-list-item
      v-for="(item, id) in items"
      :key="`menu-item__${id}`"
      :value="item.value"
    >
      <v-list-item-title class="text-button text-brown-darken-4">{{
        item.title
      }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
