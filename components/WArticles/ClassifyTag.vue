<template>
  <a-tag 
    checkabl color="purple" 
    @click="goTag"
    class="m-2"># {{ content }}</a-tag>
</template>

<script setup lang="ts">
const props = defineProps({
  content: String
})

function goTag() {
  navigateTo({
  query: {
    tag: props.content
  }
})
}
</script>