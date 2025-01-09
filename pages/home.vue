<template>
  <a-row justify="center" align="center" class="h-full">
    <a-col :span="24" class="h-full">
      <div 
        ref="swiperRef"
        class="h-full overflow-auto scroll-smooth snap-y snap-mandatory"
        style="scrollbar-width: none;">
        <w-home-logo :show />

        <w-home-timeline />
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
const swiper = useTemplateRef('swiperRef')

let show = ref(true)
let currentIndex = ref(1)
let curScrollY = 0
function wheelHander(e: WheelEvent) {
  if (e.deltaY > 0) {
    show.value = false
    currentIndex.value = 2
    swiper.value?.scrollTo(0, window.innerHeight);
  } else if (e.deltaY < 0) {
    show.value = true
    currentIndex.value = 1
    swiper.value?.scrollTo(0, 0);
  }
}
</script>

<style scoped>
.active-bg {
  background-color: #D69340;
}
</style>