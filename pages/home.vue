<template>
  <a-row justify="center" align="center" class="h-full">
    <a-col :span="24" class="h-full">
      <div 
        class="h-full overflow-auto scroll-smooth snap-y snap-mandatory"
        style="scrollbar-width: none;">
        <w-home-logo />

        <w-home-timeline />
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">

</script>

<style scoped>
.active-bg {
  background-color: var(--color-primary);
}
</style>