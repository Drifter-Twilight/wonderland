<template>
  <div class="column overflow-hidden box-border w-full p-3 rounded-lg bg-white text-black">
    <p class="font-semibold text-lg border-b border-dotted text-[#D69340] border-[#D69340] mb-1">{{ title }}</p>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String
})
</script>

<style scoped></style>