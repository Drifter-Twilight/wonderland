<template>
  <a-row 
    justify="center" align="center"
    class="about-scrollbar flex-col scroll-smooth box-border overflow-y-auto pt-[80px] h-full space-y-28">
    <a-col 
      :xs="24" :sm="22" :lg="14" :xxl="12"
      class="box-border flex justify-around items-center p-4">
      <p class="lg:text-lg text-[#D69340] font-bold">关于我</p>
      <p class="lg:text-lg text-[#D69340] font-bold">What I do?</p>
      <p class="lg:text-lg text-[#D69340] font-bold">关于本项目</p>
    </a-col>

    <w-about-me />
    <w-about-do-what />
    <w-about-project />
  </a-row>
</template>

<script setup lang="ts">
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