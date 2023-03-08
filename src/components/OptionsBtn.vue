<script setup lang="ts">
defineEmits(['click']);

const { iconName, btnText, title } = defineProps<{
  iconName: string;
  btnText?: string;
  title?: string;
}>();

const btnProps = {
  bgColor: btnText ? 'amber-accent-3' : 'amber-accent-1',
  textColor: 'browwn-darken-4',
  textSize: 'h6',
  height: '3rem',
  elevation: (isHovering: boolean) => (isHovering ? 8 : 5),
};
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-btn
      :class="{
        'ma-auto': true,
        [`text-${btnProps.textColor}`]: true,
        [`text-${btnProps.textSize}`]: btnText,
        'v-btn--icon': !btnText,
      }"
      :color="`${btnProps.bgColor}`"
      :height="`${btnProps.height}`"
      :title="title"
      v-bind="props"
      :elevation="`${btnProps.elevation(isHovering)}`"
      @click="$emit('click')"
    >
      <v-icon :class="{ 'mr-1': btnText }">
        {{ iconName }}
      </v-icon>
      {{ btnText }}
    </v-btn>
  </v-hover>
</template>

<style scoped>
.v-btn--icon .v-icon {
  text-indent: unset;
}
</style>
