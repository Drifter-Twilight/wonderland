<template>
  <div class="flex items-center justify-evenly lg:flex-col w-full h-full">
    <nuxt-link
      v-for="(item, index) in tabBarList" :key="item.name"
      :to="`/articles/${item.to}`"
      active-class="active-link"
      class="block w-full">
      <div 
        class="trigger-container flex-center flex-col box-border w-full  p-6 lg:h-[100px] lg:text-xl text-[#D69340]">
        <p class="relative font-bold">
          {{ item.name }}

          <w-articles-trigger v-if="index != 0" />
        </p>
        <p class="mt-1 mb-0">{{ item.en }}</p>
      </div> 
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const tabBarList = reactive([
  {
    name: '精选',
    en: 'Selected',
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