<template>
  <a-row 
    justify="center" align="center"
    @scroll="scrollHandler"
    class="about-scrollbar flex-col scroll-smooth box-border overflow-x-hidden overflow-y-auto pt-[80px] h-full">
    <a-col :span="24"
      class="box-border flex justify-evenly items-center mb-24 py-4 px-4">
      <p class="lg:text-lg text-[#D69340] font-bold">关于我</p>
      <p class="lg:text-lg text-[#D69340] font-bold">What I do?</p>
      <p class="lg:text-lg text-[#D69340] font-bold">关于本项目</p>
    </a-col>

    <w-about-me />
    <w-about-do-what :y="scrollY" />
    <w-about-project :y="scrollY" />
  </a-row>
</template>

<script setup lang="ts">
let scrollY = ref(0)
function scrollHandler(e: any) {
  scrollY.value = e.target.scrollTop
}
</script>

<style scoped>
.about-scrollbar {
  --sb-track-color: #000000;
  --sb-thumb-color: #ffffff;
  --sb-size: 5px;

  &::-webkit-scrollbar {
    width: var(--sb-size);
  }

  &::-webkit-scrollbar-track {
    background: var(--sb-track-color);
    border-radius: 1px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--sb-thumb-color);
    border-radius: 1px;
  }
}

@supports not selector(::-webkit-scrollbar) {
  body {
      scrollbar-color: var(--sb-thumb-color)
                     var(--sb-track-color);
  }
}
</style>