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
useHead({
  title: '首页 · Wonderland',
  script: [
    {
      // @ts-ignore
      body: true,
      children: `
        document.body.setAttribute('arco-theme', 'dark')
      `
    }
  ],
})
</script>

<style scoped>
</style>