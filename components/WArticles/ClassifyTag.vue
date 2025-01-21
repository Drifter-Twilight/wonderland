<template>
  <a-tag 
    checkabl color="purple" 
    @pointerdown="goTag"
    class="m-2"># {{ content }}</a-tag>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string
}>()

function goTag() {
  navigateTo({
  query: {
    tag: props.content
  }
})
}
</script>