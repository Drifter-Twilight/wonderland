<template>
  <a-col :xs="24" :sm="24" :lg="1" v-if="isLg" class="h-full">
    <!-- 后退按钮 -->
    <w-detail-back />
  </a-col>

  <a-col :xs="24" :sm="24" :lg="13" :xxl="10" class="h-full mx-4 mb-8">
    <!-- 文章详情 --> 
    <div class="box-border w-full h-max p-6 pt-[64px] lg:pt-6 mt-[-64px] lg:mt-0 lg:rounded-xl bg-white text-black">
      <w-detail-info :title="data?.title" :date="data?.date" :update="data?.update" :tags="data?.tags" />
      <a-divider class="bg-[#D69340]" />
      <ContentDoc class="content-container mb-10" />
      <w-detail-comment />
    </div>
  </a-col>

  <a-col :xs="24" :sm="24" :lg="5" v-if="isLg" class="h-full">
    <!-- 目录 -->
    <w-detail-catalogue :links="data?.body?.toc?.links" />
  </a-col>
</template>

<script setup lang="ts">
let isLg = useMediaQuery('(min-width: 992px)')

const route = useRoute()

const { data } = await useAsyncData('articles', () => queryContent(route.path).findOne())
</script>

<style>
.content-container {
  background-image: linear-gradient(transparent 0%, rgba(214, 147, 64, .5) 1%, transparent 2%),
                    linear-gradient(90deg, transparent 0%, rgba(214, 147, 64, .5) 1%, transparent 2%);
  background-repeat: round, round;
  background-size: 50px 30px, 30px 30px;
  background-position: 0% 0%, -2% -3%, -2% -3%;
}
</style>