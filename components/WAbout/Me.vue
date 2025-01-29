<template>
  <a-col 
    :xs="20" :sm="20" :lg="18" :xxl="13" 
    id="me"
    class="me-decoration relative box-border p-4 mb-28">
    <p class="mb-16 text-5xl text-center font-bold text-[var(--color-primary)]">关于我</p>

    <div class="flex items-center justify-evenly flex-col">
      <div class="avatar relative w-32 aspect-square mb-10 rounded-full border-4 border-[#D69340]">
        <img src="/images/webp/avatar.webp" alt="avatar" class="w-full rounded-full">
      </div>

      <div class="w-full">
        <p class="mb-6 text-lg font-medium text-md text-wrap leading-[1.75] break-all whitespace-pre-wrap hyphens-auto">HI! I'm <br><span class="text-4xl font-bold text-[var(--color-primary)]">Witt He</span> <sup>👋</sup></p>
        <p class="mb-3 font-medium text-lg text-wrap break-all whitespace-pre-wrap hyphens-auto">Welcome to wonderland!</p>
        <p class="font-medium text-lg text-wrap leading-[1.75] break-all whitespace-pre-wrap hyphens-auto">Just a little image slicer who's all about the 'lay flat' life~</p>
      </div>
    </div>

    <p class="mb-6 pt-8 font-medium text-md text-wrap break-all whitespace-pre-wrap hyphens-auto">I'm active in: </p>
    <div class="grid grid-cols-2 grid-rows-2 justify-items-start gap-y-3 lg:flex lg:space-x-6">
      <w-about-active 
        href="https://github.com/Drifter-Twilight" img="/images/svg/github.svg" 
        title="github" name="drifter-twilight" />
      <w-about-active 
        href="https://gitee.com/witts" img="/images/svg/gitee.svg" 
        title="gitee" name="witt" />
      <w-about-active 
        href="https://juejin.cn/user/202758078083981" img="/images/svg/juejin.svg" 
        title="稀土掘金" name="_Witt_" />
    </div>
  </a-col>
</template>

<script setup lang="ts">

</script>

<style scoped>
.me-decoration::before {
  position: absolute;
  content: '';
  left: -1.5rem;
  top: 0; 
  background: url('/images/webp/witt-he.webp');
  background-size: 100% 100%;
  height: 50vw;
  max-height: 25rem;
  aspect-ratio: 1 / 3;
}

@media screen and (min-width: 992px) {
  .me-decoration::before {
    left: -7.3125rem;
  }
}

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