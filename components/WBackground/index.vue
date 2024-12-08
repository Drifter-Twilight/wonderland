<template>
  <teleport to='body'>
    <canvas ref="canvasRef" class="absolute left-0 top-0"></canvas>
  </teleport>
</template>

<script setup lang="ts">
import { drawHome } from '~/utils/background/pages/drawHome';

const canvas = useTemplateRef<HTMLCanvasElement>('canvasRef')

onMounted(() => {
  const context = canvas.value?.getContext('2d');

  if (canvas.value && context) {
    drawHome(canvas.value, context)
  }
})
</script>

<style scoped></style>