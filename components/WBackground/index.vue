<template>
  <teleport to='body'>
    <canvas ref="bgRef" class="z-[-1] absolute left-0 top-0"></canvas>
  </teleport>
</template>

<script setup lang="ts">
const bg = useTemplateRef("bgRef")

function resizeCanvas() {
  if (bg.value) {
    bg.value.width = window.innerWidth
    bg.value.height = window.innerHeight
  }
}

onMounted(() => {
  document.addEventListener('resize', resizeCanvas)

  const content = bg.value?.getContext('2d')

  if (bg.value && content) {
    drawHome(bg.value, content)
  }
})

onUnmounted(() => {
  document.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped></style>