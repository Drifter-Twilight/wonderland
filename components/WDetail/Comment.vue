<template>
  <Giscus
    id="comments"
    repo="Drifter-Twilight/wonderland"
    repo-id="R_kgDONYmVjA"
    category="Comment"
    categoryid="DIC_kwDONYmVjM4Clllu"
    mapping="specific"
    :term="title || null || undefined"
    reactionsenabled="1"
    emitmetadata="0"
    inputposition="top"
    theme="light"
    lang="zh-CN"
    loading="lazy"
    async />
</template>

<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useTitle } from '@vueuse/core';
import 'giscus';

const title = useTitle()
</script>

<style scoped>
</style>