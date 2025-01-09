<template>
  <div class="flex-center relative h-full snap-start">
    <Transition 
      v-show="show"
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut">
      <img src="/public/images/svg/logo.svg" alt="logo" class="logo-shadow w-[35vw] lg:w-[20vw]">
    </Transition>

    <w-transition-fade>
      <icon-double-down size="50" class="absolute bottom-8 left-1/2 -translate-x-1/2 " />
    </w-transition-fade>
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