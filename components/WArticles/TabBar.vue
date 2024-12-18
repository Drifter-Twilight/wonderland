<template>
  <div class="flex items-center justify-evenly lg:flex-col w-full h-full">
    <nuxt-link
      v-for="(item, index) in tabBarList" :key="item.name"
      :to="showLatest && index == 0 ? '/articles/latest' : `/articles/${item.to}`"
      active-class="active-link"
      class="block w-full">
      <div 
        class="trigger-container flex-center flex-col box-border w-full  p-6 lg:h-[100px] lg:text-xl text-[#D69340]">
        <p class="relative font-bold">
          {{ showLatest && index == 0 ? '最新' : item.name }} 
          <icon-swap 
            v-if="index == 0"
            @click="showLatest = !showLatest"
            class="absolute top-1/2 -right-6 -translate-y-1/2" />

          <w-articles-trigger v-else />
        </p>
        <p class="mt-1 mb-0">{{ showLatest && index == 0 ? 'Latest' : item.en }}</p>
      </div> 
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
let showLatest = ref(false)
const tabBarList = reactive([
  {
    name: '推荐',
    en: 'Recommended',
    to: ''
  },
  {
    name: '前端',
    en: 'FE-Develop',
    to: 'fe-develop'
  },
  {
    name: '设计',
    en: 'Design',
    to: 'design'
  },
])
</script>

<style scoped>
.active-link {
  background: url('/public/images/svg/active-tab.svg');
  background-size: 100% 100%;
}
</style>