<template>
  <a-col 
    :xs="24" :lg="{ span: 6, offset: 13 }" :xl="{ span: 5, offset: 14 }" :xxl="{ span: 3, offset: 16 }"
    class="text-lg 2xl:text-xl font-semibold">
    <ul 
      class="w-full h-full"
      :class="{'flex justify-between items-center': mode == 'horizontal', 'mb-8': mode == 'vertical'}">
      <li 
        v-for="item in headList"
        :key="item.to"
        @pointerdown="toTarget(item.to)"
        class="flex-center h-[64px]">
        {{ item.content }}<small class="inline-block origin-left scale-75">/{{ item.en }}</small>
      </li>
    </ul>
  </a-col>

  <a-col 
    :xs="24" :lg="2" :xxl="1" 
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

<script setup lang="ts">
defineModel('showMenu', { type: Boolean })
const emits = defineEmits(['update:showMenu'])

const props = defineProps({
  mode: {
    type: String,
    default: 'horizontal',
    validator(value) {
      return ['horizontal', 'vertical'].includes((value as string))
    }
  }
})

const headList = reactive([
  {
    to: '/list/fe-develop/articles',
    content: '博客',
    en: 'Blogs'
  },
  {
    to: '/about',
    content: '关于',
    en: 'about'
  }
])

function toTarget(to: string) {
  if (props.mode == 'vertical') {
    navigateTo(to)
    emits('update:showMenu', false)
  } else {
    navigateTo(to)
  }
}
</script>

<style scoped>
.active-link {
  background-image: linear-gradient(to right, #fff 0 90%, transparent 90.1%);
  background-size: 100% 5%;
  background-position: 0 90%;
  background-repeat: no-repeat;
}
</style>