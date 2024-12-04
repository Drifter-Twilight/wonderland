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
</template>

<script setup>
</script>

<style scoped>
</style>