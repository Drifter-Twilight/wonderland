<template>
  <ul class="relative box-border">
    <li v-for="item in related" :key="item.title" class="box-border py-2 border-b border-solid border-[#D69340]">
      <nuxt-link :to="`/detail${item._path}`">
        <p class="text-[#D69340] block text-nowrap line-clamp-1 text-ellipsis font-semibold mb-3">{{ item.title }}</p>
        <span class="text-xs font-light text-gray-600">{{ item.date }}</span>
      </nuxt-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  detailParams: string[]
}>()

const { data: related } = await useAsyncData('related', () => queryContent(props.detailParams.join('/')).limit(5).only(["_path", "title", "date"]).sort({ date: -1 }).find())
</script>

<style scoped></style>