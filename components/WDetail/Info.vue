<template>
  <h1 class="font-bold text-[#D69340]">{{ title }}</h1>

  <div class="flex justify-between items-center mb-3">
    <div class="flex-center space-x-2 text-gray-500">
      <div class="text-sm"><icon-calendar class="text-lg" /> {{ date }}</div>
      <div class="text-sm"><icon-clock-circle class="text-lg" /> 字数1w+ 耗时约10分钟</div>
    </div>

    <div>{{ update && update.length > 0 ? update?.length : 0 }}次更新 <icon-refresh /></div>
  </div>

  <div class="flex space-x-4 mb-3">
    <a-tag v-for="item in tags" :key="item" color="#D69340"># {{ item }}</a-tag>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  date?: string
  update?: string[]
  tags?: string[]
}>()
</script>

<style scoped>

</style>