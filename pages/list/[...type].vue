<template>
    <ContentList :query>
      <template #not-found>
        <div class="flex-center flex-col w-full h-full">
          <a-empty />
        </div>
      </template>

      <template #default="{ list }">
        <w-articles-list 
          v-for="article in list" :key="article._path" 
          :target="article._path" 
          :cover="article.img"
          :title="article.title" 
          :description="article.description"
          :date="article.date"
          :tags="article.tags"
          :type="route.params.type[1]" />
      </template>
    </ContentList>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content'

const route = useRoute()
const query: QueryBuilderParams = reactive({ 
  path: route.path.slice(5),
  limit: 10
})

onMounted(() => {
  const liContainer = document.querySelector<HTMLElement>('.list-container')
  const scroll = useScroll(shallowRef(liContainer), {
    offset: { bottom: 800 }
  })
  
  watchEffect(() => {
    if (scroll.arrivedState.bottom && query.limit) {
      query.limit += 10
    }
  })
})
</script>

<style scoped></style>