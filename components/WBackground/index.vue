<template>
  <teleport to='body'>
    <canvas id="bg" class="absolute left-0 top-0"></canvas>
  </teleport>
</template>

<script setup lang="ts">
onMounted(() => {
  const bg = document.querySelector<HTMLCanvasElement>('#bg')
  const content = bg?.getContext('2d')

  if (bg && content) {
    drawHome(bg, content)
  }
})
</script>

<style scoped></style>