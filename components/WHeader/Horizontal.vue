<template>
    <w-transition-header #="{ isMove }">
      <a-row v-if="isMove" justify="space-between" align="center" class="h-full">
        <a-col :span="3" class="flex-center">
          <router-link to="/home">
            <img src="/images/svg/logo.svg" alt="logo" style="width: 2em;">
          </router-link>
        </a-col>

        <w-header-nav mode="horizontal" />
      </a-row>
    </w-transition-header>
</template>

<script setup lang="ts">
</script>

<style scoped></style>