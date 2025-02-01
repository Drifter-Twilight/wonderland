<template>
  <template v-if="list?.length == 0">
    <div class="flex-center w-full h-full">
      <a-empty />
    </div>
  </template>

  <template v-else>
    <w-articles-list-li 
      v-for="item in list" :key="item._path"
      :target="item._path" :cover="item.img"
      :title="item.title" :description="item.description"
      :date="item.date" :tags="item.tags"
      :type="route.query.t as string" />
  </template>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData('home', () => queryContent('/' + route.query.c + '/' + route.query.t).only(['_path', 'title', 'img', 'description', 'date', 'tags']).sort({ date: -1 }).find())

let list = data
watch([() => route.query.c, () => route.query.t], async (newCT) => {
  const data = await queryContent('/' + newCT[0] + '/' + newCT[1]).only(['_path', 'title', 'img', 'description', 'date', 'tags']).sort({ date: -1 }).find()
  list.value = data
})
</script>

<style scoped>

</style>