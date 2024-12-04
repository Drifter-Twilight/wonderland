<template>
  <a-col 
    :xs="24" :lg="{ span: 7, offset: 12 }" :xxl="{ span: 6, offset: 13 }"
    class=" text-lg 2xl:text-xl font-semibold">
    <ul 
      v-for="item in headList"
      :key="item.to"
      class="w-full h-full"
      :class="{'flex justify-between items-center': mode == 'horizontal', 'mb-8': mode == 'vertical'}">
      <li class="flex-center h-[64px]">
        <nuxt-link :to="item.to" active-class="active-link">{{ item.content }}<small class="text-xs">/{{ item.en }}</small></nuxt-link>
      </li>
    </ul>
  </a-col>

  <a-col 
    :xs="24" :lg="2" 
    class="flex items-center -translate-y-[4px]"
    :class="{'justify-evenly': mode == 'horizontal', 'justify-center space-x-6': mode == 'vertical'}">
      <a href="javascript:;">
        <img src="/images/svg/github.svg" alt="github" />
      </a>
      
      <a href="javascript:;">
        <img src="/images/svg/gitee.svg" alt="gitee" />
      </a>
  </a-col>
</template>

<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: 'horizontal',
    validator(value) {
      return ['horizontal', 'vertical'].includes(value)
    }
  }
})

const headList = reactive([
  {
    to: '/articles',
    content: '文章',
    en: 'articles'
  },
  {
    to: '/notes',
    content: '文章',
    en: 'notes'
  },
  {
    to: '/about',
    content: '关于',
    en: 'about'
  }
])
</script>

<style scoped>
.active-link {
  background-image: linear-gradient(to right, #000 0 100%);
  background-size: 100% 10%;
  background-position: 0 100%;
  background-repeat: no-repeat;
}
</style>