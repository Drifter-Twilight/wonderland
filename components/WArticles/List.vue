<template>
  <li
    @pointerdown="toDetail"
    class="articles-li box-border relative flex-center flex-col transition-[background-color] duration-300 lg:space-x-5 p-8 lg:flex-row lg:p-4 2xl:space-x-8 lg:hover:bg-white"
    :class="{ 
      'h-[85vw] lg:h-[19vw] 2xl:h-[16vw]': isArticles,
      'h-[45vw] lg:h-[12vw] 2xl:h-[10vw]': !isArticles,
    }">
    <!-- 封面 -->
    <div 
      v-if="cover"
      class="cover overflow-hidden relative h-full aspect-[1.3/1]">
      <img :src="curEnv === 'production' ? `/wonderland${cover}` : cover" alt="cover"
      class="w-full h-full">
    </div>
    
    <div 
      class=" flex justify-between flex-col flex-1 box-border h-full lg:pt-3 lg:px-0 lg:pb-0 lg:pl-0 2xl:pt-6"
      :class="{
        'absolute left-0 top-0 px-14 pt-24 pb-16 lg:relative': isArticles,
        'pb-3 border-b-2 border-dotted border-[var(--color-primary)] lg:pb-5': !isArticles
      }">
      <p 
        class="articles-title text-pre-wrap transition-all duration-300 box-border line-clamp-2 text-3xl font-bold text-[var(--color-primary)] lg:w-[75%] 2xl:w-[65%]   lg:line-clamp-1 lg:text-4xl 2xl:text-5xl"
        :class="{ 
          'lg:-translate-x-[25%] lg:translate-y-[6vw] 2xl:translate-y-[4.5vw]': isArticles
        }">
        {{ title }}
      </p>

      <div class="text-xs font-light lg:w-[75%] 2xl:w-[65%]">
        <p
          v-if="description"
          class="articles-desc line-clamp-2 mb-3 leading-175 transition-opacity duration-300 lg:opacity-0 lg:text-black 2xl:line-clamp-3">
          {{ description }}
        </p>

        <div 
          class="space-x-2" 
          :class="{
            'articles-besc-articles lg:text-[#141414] lg:opacity-0': isArticles,
            'articles-besc-notes lg:text-[#e1e1e1] lg:opacity-1': !isArticles
          }">
          {{ date }}
          <a-tag 
            v-for="item in tags" :key="item" 
            color="var(--color-primary)"># {{ item }}</a-tag>
        </div>
      </div>

      <div
        class="arow hidden absolute transition-opacity opacity-0 duration-300 right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#141414] text-[var(--color-primary)] sm:w-14 sm:h-14 sm:right-10 sm:text-lg lg:flex lg:justify-center lg:items-center">
        <icon-arrow-right />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useEnv } from '~/composables/useEnv';

const props = defineProps<{
  target: string | undefined;
  cover: string | undefined;
  title: string | undefined;
  description: string | undefined;
  date: string | undefined;
  tags: string[] | undefined;
  type: string;
}>()

let isArticles = computed(() => props.type == "articles")

let curEnv = useEnv()

function toDetail() {
  navigateTo(`/detail${props.target}`)
}
</script>

<style scoped>
.cover::before {
  position: absolute;
  left: 0;
  top: 0;
  content: '';
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all .3s linear forwards;
}

@media screen and (max-width: 576px) {
  .articles-li :deep(.arco-tag) {
    display: none;
  }
}

@media screen and (min-width: 992px) {
  .articles-li:hover .articles-title {
    transform: translate(0, 0);
  }

  .articles-li:hover .cover::before {
    background-color: transparent;
  }

  .articles-li:hover .arow,
  .articles-li:hover .articles-desc,
  .articles-li:hover .articles-besc-articles {
    opacity: 1;
  }

  .articles-li:hover .articles-besc-notes {
    color: #141414
  }

  .articles-li .articles-title {
    text-shadow: 0 0 2.5px var(--color-primary);
  }
}
</style>