<script setup lang="ts">
defineEmits(['click']);

const { iconName, btnText } = defineProps<{
  iconName: string;
  btnText: string;
}>();

const btnProps = {
  bgColor: 'amber-accent-3',
  textColor: 'browwn-darken-4',
  textSize: 'h6',
  height: '3rem',
};
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-btn
      :class="`ma-auto text-${btnProps.textSize} text-${btnProps.textColor}`"
      :color="`${btnProps.bgColor}`"
      :height="`${btnProps.height}`"
      v-bind="props"
      :elevation="isHovering ? 8 : 5"
      @click="$emit('click')"
    >
      <v-icon class="mr-1">{{ iconName }}</v-icon>
      {{ btnText }}
    </v-btn>
  </v-hover>
</template>

<style scoped></style>
