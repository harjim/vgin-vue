<template>
  <div c:text="xl">BasicLayout</div>
  <var-button type="primary">主要按钮</var-button>
</template>

<script lang="ts" setup>
onBeforeMount(() => {
  Snackbar.success('欢迎回来')
})
</script>
