<template>
  <img 
    :src="useEnv() === 'production' ? `/wonderland${cover}` : cover" alt="cover"
    class="w-full">
</template>
 
<script setup lang="ts">
defineProps({
  cover: String
})
</script>

<style scoped>

</style>