<template>
  <content-list :query>
    <template #not-found>
      <div class="flex-center flex-col w-full h-full">
        <a-empty />
      </div>
    </template>

    <template #="{ list }">
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
  </content-list>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content'

const route = useRoute()
console.log(route)
const query: QueryBuilderParams = reactive({
  path: route.path.slice(5),
  sort: [{ date: -1 }],
})
</script>

<style scoped></style>