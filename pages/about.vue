<template>
  <a-row 
    justify="center" align="center"
    @scroll="scrollHandler"
    class="scrollbar flex-col scroll-smooth box-border overflow-x-hidden overflow-y-auto pt-[80px] h-full">
    <a-col :span="24"
      class="box-border flex justify-evenly items-center mb-24 py-4 px-4">
      <a href="#me" class="lg:text-lg text-[var(--color-primary)] font-bold">关于我</a>
      <a href="#do-what" class="lg:text-lg text-[var(--color-primary)] font-bold">What I do?</a>
      <a href="#project" class="lg:text-lg text-[var(--color-primary)] font-bold">关于本项目</a>
    </a-col>

    <w-about-me />
    <w-about-do-what :y="scrollY" />
    <w-about-project :y="scrollY" />
  </a-row>
</template>

<script setup lang="ts">
useHead({
  title: '关于 · Wonderland'
})

let scrollY = ref(0)
function scrollHandler(e: any) {
  scrollY.value = e.target.scrollTop
}
</script>

<style scoped>

</style>