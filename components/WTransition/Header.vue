<template>
  <Transition 
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut">
    <slot :is-move></slot>
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
    }, 2000)
})

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<style scoped>
</style>