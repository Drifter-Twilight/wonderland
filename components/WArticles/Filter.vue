<template>
  <div class="flex box-border p-4">
    <a-radio-group v-model="type" @change="changeType" type="button">
      <a-radio value="articles">文章</a-radio>
      <a-radio value="notes">笔记</a-radio>
    </a-radio-group>
  </div>
</template>

<script setup lang="ts">
let type = ref("articles")
useState('listType', () => type)

const route = useRoute()
function changeType() {
  navigateTo(`${route.path}/${type.value}`)
}
</script>