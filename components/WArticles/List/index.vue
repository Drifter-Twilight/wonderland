<template>
  <ul class="list-container scrollbar box-border overflow-y-auto overflow-x-hidden h-full">
    <Suspense>
      <template #fallback>
        <div class="flex-center w-full h-full">
          <a-spin :size="52" />
        </div>
      </template>

      <w-articles-list-item />
    </Suspense>
  </ul>
</template>

<script setup lang="ts">

</script>

<style scoped></style>