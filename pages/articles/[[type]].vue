<template>
  <a-col :xs="24" :sm="24" :lg="5" class="lg:h-full">
    <w-articles-tab-bar />
  </a-col>

  <a-col :xs="24" :sm="24" :lg="19" class="overflow-auto scroll-none h-full">
    <ContentList path="/articles" #="{ list }">
      <ul v-for="article in list" :key="article._path">
        <w-articles-list :target="article._path" :cover="article.img" :title="article.title" :description="article.description" />
      </ul>
    </ContentList>
  </a-col>
</template>

<script setup>
</script>

<style scoped></style>