<template>
  <a-row justify="center" align="center" class="h-full pt-[64px]">
    <a-col :xs="24" :sm="24" :lg="5" class="lg:h-[calc(100vh-64px)]">
      <w-articles-tab-bar />
    </a-col>

    <a-col :xs="24" :sm="24" :lg="19" class="overflow-auto scroll-none h-full lg:h-[calc(100vh-64px)]">
      <nuxt-page />
    </a-col>
  </a-row>
</template>

<script setup>

</script>

<style scoped>
</style>