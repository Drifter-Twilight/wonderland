<template>
  <div class="flex-center h-max space-x-2">
    <img :src="curEnv === 'production' ? `/wonderland${img}` : img" :alt="title" class="box-border p-2 w-12 h-12 rounded-lg bg-white">
    <div class="h-full">
      <p class="mb-4 font-bold">{{ title }}</p>
      <p class="text-[#e1e1e1]">{{ name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  img: String,
  title: String,
  name: String
})

let curEnv = ref(process.env.NODE_ENV)
</script>

<style scoped>

</style>