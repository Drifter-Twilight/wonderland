<template>
  <a-layout-header class="layout-header h-[64px] z-[1003]">
    <w-header-horizontal v-if="isLg" />
    <w-header-vertical v-else />
  </a-layout-header>
</template>

<script setup lang="ts">
const isLg = useMediaQuery('(min-width: 992px)')
</script>

<style scoped>

</style>