<template>
  <a-row justify="center" align="start" class="scroll-none scroll-smooth box-border h-full pt-[64px]">
    <a-col :xs="24" :sm="24" :lg="6" :xl="5" class="lg:h-full">
      <w-articles-tab-bar />
    </a-col>

    <a-col :xs="24" :sm="24" :lg="18" :xl="19" class="h-full">
      <ul class="list-container scrollbar box-border overflow-y-auto overflow-x-hidden h-full">
        <nuxt-page />
      </ul>
    </a-col>
  </a-row>
</template>

<script setup>
</script>

<style scoped></style>