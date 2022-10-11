<template>
  <div class="*flex-center cursor-pointer" :style="{ fontSize: `${props.size}px` }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: [String, Number],
    default: 20
  }
})
</script>
