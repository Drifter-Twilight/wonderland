<template>
  <div class="flex-center flex-col mb-12">
    <div class="avatar relative w-32 aspect-square mb-10 rounded-full border-4 border-[#D69340]">
      <img src="/images/jpg-png-webp/avatar.png" alt="avatar" class="w-full rounded-full">
    </div>

    <p>文章：10 | 笔记：10 | 标签：2</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.avatar::before {
  position: absolute;
  content: '';
  left: -12.5%;
  top: -12.5%;
  width: 125%;
  height: 125%;
  border-radius: 9999px;
  border: 2px dashed #D69340;
  animation: avatar-rotate 8s linear infinite;
}

@keyframes avatar-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>