<template>
  <a-layout-header class="layout-header h-[64px] z-[1003] bg-black/80 lg:bg-transparent lg:bg-gradient-to-b lg:from-[#141414] lg:to-transparen">
    <w-header-horizontal v-if="isLg" />
    <w-header-vertical v-else />
  </a-layout-header>
</template>

<script setup lang="ts">
const isLg = useMediaQuery('(min-width: 992px)')
</script>

<style scoped>

</style>