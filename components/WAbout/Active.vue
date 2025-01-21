<template>
  <div class="flex-center h-max space-x-2">
    <img :src="curEnv === 'production' ? `/wonderland${img}` : img" :alt="title" class="box-border p-2 w-14 h-14 rounded-lg bg-white">
    <div class="h-full">
      <p class="mb-4 font-bold">{{ title }}</p>
      <p class="text-[#e1e1e1]">{{ name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEnv } from '~/composables/useEnv';

defineProps({
  img: String,
  title: String,
  name: String
})

let curEnv = useEnv()
</script>

<style scoped>

</style>