<template>
  <div class="flex-center h-full">
    <Transition 
      v-show="show"
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut">
      <img src="/public/images/svg/logo.svg" alt="logo" class="logo-shadow w-[35vw] lg:w-[20vw]">
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps({
  show: Boolean
})
</script>

<style scoped>

.logo-shadow {
  filter: drop-shadow(0 0 10vw #ffffff80) drop-shadow(0 0 7vw #ffffff) drop-shadow(0 0 5vw #ffffff80) drop-shadow(0 0 2vw #ffffff80);
}
</style>