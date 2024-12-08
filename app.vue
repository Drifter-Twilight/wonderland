<template>
  <nuxt-layout>
    <!-- header -->
    <template #header>
      <w-header-container />
    </template>

    <!-- content -->
    <a-row justify="center" align="center" class="h-full">
      <a-col :span="24" class="h-full">
        <nuxt-page />
      </a-col>
    </a-row>
  </nuxt-layout>

  <w-mouse />
  <!-- <w-background /> -->
</template>

<script setup lang="ts">
onMounted(() => {
  document.body.setAttribute('arco-theme', 'dark')
})
</script>

<style scoped>
</style>