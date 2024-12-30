<template>
  <nuxt-layout>
    <template #header>
      <w-header-container />
    </template>

    <nuxt-page />
  </nuxt-layout>

  <!-- <w-background /> -->
</template>

<script setup lang="ts">
onMounted(() => {
  document.body.setAttribute('arco-theme', 'dark')
})
</script>

<style scoped>
</style>