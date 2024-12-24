<template>
  <li class="item-container flex-center box-border h-[35vw] transition-[background-color] duration-300 sm:h-[25vw] lg:h-[19vw] p-3 2xl:p-5 hover:bg-white">
    <nuxt-link :to="target" class="block w-full h-full">
      <img :src="cover" alt="cover" class="max-w-[40vw] lg:max-w-[35vw] h-full rounded-lg">

      <div class="relative box-border py-3 flex-1 h-full">
        <p class="articles-title transition-all duration-300 box-border absolute -left-[20%] top-1/2 -translate-y-1/2 w-[95%] pb-[0.3rem] text-wrap break-all whitespace-pre-wrap line-clamp-2 hyphens-auto 2xl:leading-[60px] text-xl font-bold text-[#D69340] sm:-left-[15%] sm:w-5/6 sm:text-3xl 2xl:text-5xl">{{ title }}</p>

        <p class="articles-desc absolute left-3 bottom-3 w-[75%] line-clamp-2 2xl:line-clamp-3 leading-5 text-xs font-light text-black transition-opacity duration-300 opacity-0 sm:leading-6 sm:left-5 sm:bottom-8 sm:w-[75%] 2xl:bottom-12 2xl:text-md">{{ description }}</p>
      
        <div class="arow absolute transition-opacity opacity-0 duration-300 flex-center right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#141414] text-[#D69340] sm:w-14 sm:h-14 sm:right-10 sm:text-lg"><icon-arrow-right /></div>
    </div>
    </nuxt-link>
  </li>
</template>

<script setup lang="ts">
defineProps({
  target: String,
  cover: String,
  title: String,
  description: String
})
</script>

<style scoped>
.item-container:hover .arow {
  opacity: 1;
}

.articles-title {
  text-shadow: 0 0 2.5px #D69340;
}

.item-container:hover .articles-desc {
  opacity: 1;
}

@media screen and (min-width: 576px) {
  .item-container:hover .articles-title {
    top: 33%;
    left: 0%;
    transform: translateY(-50%) scale(0.95);
  }
}
</style>