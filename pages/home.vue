<template>
  <a-row justify="center" align="center" class="h-full">
    <a-col :span="24" class="h-full">
      <div ref="swiperRef" @wheel.passive="wheelHander" class="h-full overflow-auto scroll-smooth"
        style="scrollbar-width: none;">
        <w-home-logo :show />

        <w-home-timeline /> 

        <div class="flex-center fixed flex-col right-0 top-0 w-12 h-full space-y-5">
          <div v-for="item in 2" :key="item" @pointerdown="clickHander"
            class="w-3 h-3 rounded-full border-[1.5px] border-[#D69340] cursor-pointer"
            :class="{ 'active-bg': item == currentIndex }"></div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
const swiper = useTemplateRef('swiperRef')

function hander(condition1: boolean, condition2?: boolean) {
  if (condition1) {
    show.value = false
    currentIndex.value = 2
    swiper.value?.scrollTo(0, window.innerHeight);
  } else if (condition2) {
    show.value = true
    currentIndex.value = 1
    swiper.value?.scrollTo(0, 0);
  } else {
    show.value = true
    currentIndex.value = 1
    swiper.value?.scrollTo(0, 0);
  }
}

let show = ref(true)
let currentIndex = ref(1)
function clickHander() {
  hander(currentIndex.value == 1)
}

function wheelHander(e: WheelEvent) {
  hander(e.deltaY > 0, e.deltaY < 0)
}
</script>

<style scoped>
.active-bg {
  background-color: #D69340;
}
</style>