<template>
  <Transition name="fade">
    <slot :is-move="isMove"></slot>
  </Transition>
</template>

<script setup lang="ts">
let mouse = useMouse()
let isMove = ref(true)

let timeout: NodeJS.Timeout
watch([mouse.x, mouse.y], () => {
  isMove.value = true
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    isMove.value = false
  }, 1000)
})

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>