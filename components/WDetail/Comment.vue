<template>
  <div class="box-border border-t border-solid border-gray-300 py-4">
    <div class="flex-center mb-2">
      <div class="flex-center w-10 h-10 rounded-full text-lg"><icon-robot /></div>
      <a-textarea placeholder="Please enter something" auto-size allow-clear class="min-h-20" />
    </div>

    <div class="flex justify-end">
      <a-button status="success">登录github以进行评论</a-button>
    </div>
  </div>

  <a-comment
    author="Socrates"
    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    content="Comment body content."
    datetime="1 hour">
    <template #actions>
      <span class="action"><IconMessage />回复</span>
    </template>
  </a-comment>
</template>

<script setup lang="ts">

</script>

<style scoped>
:deep(.arco-textarea-wrapper) {
  background-color: #ddd;
  color: dimgray;
}

:deep(.arco-textarea-wrapper:focus-within, .arco-textarea-wrapper.arco-textarea-focus) {
  border-color: #D69340;
  background-color: #ccc;
  color: #333;
}
</style>