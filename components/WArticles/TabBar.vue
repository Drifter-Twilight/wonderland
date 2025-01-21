<template>
  <!-- <div class="flex items-center justify-evenly lg:flex-col w-full h-full">
    <nuxt-link
      v-for="item in tabBarList" :key="item.name"
      :to="item.to"
      active-class="active-link"
      class="block w-full">
      <div 
        class="trigger-container flex-center flex-col box-border w-full  p-6 lg:h-[100px] lg:text-xl text-[#D69340]">
        <p class="relative font-bold">{{ item.name }}</p>
        <p class="mt-1 mb-0">{{ item.en }}</p>
      </div> 
    </nuxt-link>
  </div> -->

  <a-collapse 
    v-model:active-key="curKey"
    accordion expand-icon-position="right"
    :bordered="false"
    class="flex items-center justify-evenly box-border w-full h-full p-4 lg:flex-col">
    <a-collapse-item 
      v-for="(item, index) in tabBarList" :key="index" 
      class="w-full box-border text-[#D69340] font-bold">
      <template #header>
        <div 
          class="flex-center flex-col box-border w-full text-lg">
          <p class="text-[#D69340] font-bold">{{ item.name }}</p>
          <p class="mt-1 mb-0 text-[#D69340] font-bold">{{ item.en }}</p>
        </div>
      </template>

      <template #expand-icon="{ active }">
        <icon-down v-if="active" />
        <icon-left v-else />
      </template>

      <nuxt-link :to="`/list/${item.to}/articles`" active-class="active-link" class="block w-full p-3 pl-6 text-lg">文章</nuxt-link>
      <nuxt-link :to="`/list/${item.to}/notes`" active-class="active-link" class="block w-full p-3 pl-6 text-lg">笔记</nuxt-link>
    </a-collapse-item>
  </a-collapse>
</template>

<script setup lang="ts">
const tabBarList = reactive([
  {
    name: 'Web 前端',
    en: 'FE-Develop',
    to: 'fe-develop'
  },
  {
    name: '设计',
    en: 'Design',
    to: 'design'
  },
])

const route = useRoute()

let curKey = ref([0])
watchEffect(() => { 
  curKey.value = [tabBarList.findIndex(item => item.to == route.params.type[0])]
})
</script>

<style>
.arco-collapse {
  overflow: visible;
}

.arco-collapse::after {
  display: none;
}
</style>

<style scoped>
.active-link {
  background: url('/images/svg/active-tab.svg') no-repeat;
  background-size: 80%;
  background-position: left;
}

:deep(.arco-collapse-item) {
  position: relative;
  border: none;
  border-top-left-radius: .5rem;
  border-top-right-radius: .5rem;
}

:deep(.arco-collapse-item-active) {
  background-color: #141414;
}

:deep(.arco-collapse-item-active .arco-collapse-item-content) {
  background-color: #141414;
  border-bottom-left-radius: .5rem;
  border-bottom-right-radius: .5rem;
}

:deep(.arco-collapse-item-header) {
  justify-content: center;
  border: none;
  background-color: transparent;
}

:deep(.arco-collapse-item-content) {
  box-sizing: border-box;
  z-index: 10;
  position: absolute;
  width: 100%;
  height: max-content;
  background-color: transparent;
}
</style>