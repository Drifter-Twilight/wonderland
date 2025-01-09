<template>
  <a-col :xs="20" :sm="20" :lg="18" :xxl="13" class="box-border p-4">
    <p class="mb-16 text-5xl text-center font-bold text-[#D69340]">关于我</p>

    <div class="flex items-center justify-evenly flex-col lg:flex-row">
      <div class="avatar relative w-32 aspect-square mb-12 lg:mb-0 rounded-full border-4 border-[#D69340] bg-white"></div>

      <div class="ml-8">
        <p class="mb-6 text-lg font-medium text-md text-wrap leading-[1.75] break-all whitespace-pre-wrap hyphens-auto">HI! I'm <br><span class="text-4xl font-bold text-[#D69340]">Witt He</span> <sup>👋</sup></p>
        <p class="mb-3 font-medium text-lg text-wrap break-all whitespace-pre-wrap hyphens-auto">Welcome to wonderland!</p>
        <p class="font-medium text-lg text-wrap leading-[1.75] break-all whitespace-pre-wrap hyphens-auto">Just a little image slicer who's all about the 'lay flat' life~</p>
      </div>
    </div>

    <p class="mb-6 pt-8 font-medium text-md text-wrap break-all whitespace-pre-wrap hyphens-auto">I'm active in: </p>
    <div class="grid grid-cols-2 grid-rows-2 justify-items-start gap-y-3 lg:flex lg:space-x-6">
      <w-about-active img="/images/svg/juejin.svg" title="稀土掘金" name="_Witt_" />
      <w-about-active img="/images/svg/gitee.svg" title="gitee" name="witt" />
      <w-about-active img="/images/svg/github.svg" title="github" name="drifter-twilight" />
    </div>
  </a-col>
</template>

<script setup lang="ts">

</script>

<style scoped>
.avatar::before {
  position: absolute;
  content: '';
  left: -12.5%;
  top: -12.5%;
  width: 125%;
  height: 125%;
  border-radius: 9999px;
  border: 2px dashed #D69340;
  animation: avatar-rotate 8s linear infinite;
}

@keyframes avatar-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>