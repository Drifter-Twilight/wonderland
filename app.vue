<template>
  <div ref='divRef' class="w-[300px] h-[300px] bg-blue-300">
    <a-button>点击</a-button>
  </div>
</template>

<script setup>
const div = useTemplateRef('divRef')

onMounted(() => {
  console.log(div)
})
</script>
