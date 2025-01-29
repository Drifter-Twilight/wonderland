<template>
  <div class="timeline-container relative overflow-y-auto scrollbar box-border pt-[64px] h-full snap-start">
    <a-timeline 
      mode="alternate" label-position="relative"
      class="w-[85vw] lg:w-[50vw] mx-auto">
      <a-timeline-item 
        v-for="item in timelineArr" :key="item.title"
        dotColor="#D69340" line-color="#D69340">
        <template #label>{{ item.date }}</template>

        <nuxt-link :to="`/detail${item._path}`" class="text-pre-wrap mb-2 text-xl text-left font-bold text-[var(--color-primary)] line-clamp-2">{{ item.title }}</nuxt-link>
        <a-tag size="small">{{ item._path?.includes('articles') ? '文章' : '笔记' }}</a-tag>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script setup lang="ts">
let limit = 10
const { data: content } = await useAsyncData('content', () => queryContent('/').only(['_path', 'title', 'date']).sort({ date: -1 }).limit(limit).find())
let timelineArr = content

onMounted(() => {
    const timelineContainer = document.querySelector<HTMLElement>('.timeline-container')
    const scroll = useScroll(shallowRef(timelineContainer), {
      offset: { bottom: 300 }
    })

    watchEffect(async () => {
      if (scroll.arrivedState.bottom) {
        limit += 10
        const list = await queryContent('/').only(['_path', 'title', 'date']).sort({ 
          date: -1 
        }).limit(limit).find()
        timelineArr.value = list
      }
    })
  })
</script>

<style scoped>
:deep(.arco-timeline-item) {
  min-height: 110px;
}

:deep(.arco-timeline-item-label) {
  color: #fff;
}

:deep(.arco-timeline-alternate .arco-timeline-item-vertical-right > .arco-timeline-item-content-wrapper) {
  display: flex;
  justify-content: flex-end;
  margin-left: 0;
  padding-right: 20px;
}
</style>