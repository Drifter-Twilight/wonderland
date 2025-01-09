<template>
  <a-col :xs="20" :sm="20" :lg="18" :xxl="13" class="">
    <p class="mb-16 text-4xl text-center font-bold text-[#D69340]">What I do?</p>

    <div class="flex flex-col lg:flex-row box-border h-max lg:space-x-5 space-y-8 lg:space-y-0">
      <div class="flex flex-col lg:flex-row lg:space-x-5 space-x-0 space-y-5 lg:space-y-0">
        <p class="relative h-max font-bold text-3xl text-[#D69340]">开发<br><small class="font-light">development</small>
        </p>
        <p>
          专注于代码的创新与艺术性。致力于将设计蓝图转化为生动的网页与应用，高效构建响应式、高性能的Web界面；注重代码的可维护性和可扩展性，不断追踪前端技术动态，运用最新技术栈解决实际问题，为产品注入创新活力，让技术成为推动设计理念实现的强大引擎。
        </p>
      </div>

      <div class="hidden lg:block h-[calc(100%-0)] w-2 rounded-full bg-[#D69340]"></div>
      <div class="lg:hidden h-1 w-full rounded-full bg-[#D69340]"></div>

      <div class="flex flex-col lg:flex-row-reverse">
        <p class="relative h-max font-bold text-3xl text-[#D69340] lg:ml-5 mb-5 lg:mb-0">设计<br><small
            class="font-light">design</small></p>
        <p>
          持续追寻流行的风格趋势，在创意的画布上，不仅是色彩的编织者，更是视觉故事的讲述者。将抽象概念转化为肉眼可见的界面设计，通过色彩搭配、排版艺术与交互逻辑的巧妙融合，我致力于创造出既美观又实用的设计作品，让每一次点击都成为一次愉悦的旅程，让信息以最优雅的方式触达用户心灵。
        </p>
      </div>
    </div>
  </a-col>
</template>

<script setup lang="ts">

</script>

<style scoped></style>