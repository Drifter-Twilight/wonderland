<template>
  <a-col :xs="24" :sm="24" :lg="1" class="hidden lg:block h-full">
    <!-- 后退按钮 -->
    <w-detail-back />
  </a-col>

  <a-col :xs="24" :sm="24" :lg="13" :xxl="11" class="overflow-hidden mx-4 mb-8">
    <!-- 文章详情 -->
    <div class="box-border w-full h-max p-6 pt-[64px] lg:pt-6 mt-[-64px] lg:mt-0 lg:rounded-xl bg-white text-black">
      <w-detail-info :title="data?.title" :date="data?.date" :update="data?.update" :tags="data?.tags" />
      <a-divider class="bg-[#D69340]" />
      <ContentRenderer :value="data!" class="content-container mb-10">
        <template #empty>
          <div class="flex-center w-full aspect-square">
            <a-empty />
          </div>
        </template>
      </ContentRenderer>
      <w-detail-comment />
    </div>
  </a-col>

  <a-col :xs="24" :sm="24" :lg="5" :xxl="4" class="hidden lg:block overflow-hidden h-full">
    <a-affix :offsetTop="65">
      <div>
        <!-- 目录 -->
        <w-detail-column title="目录" class="mb-4">
          <w-detail-catalogue :links="data?.body?.toc?.links" :hash="route.hash" />
        </w-detail-column>

        <!-- 其他推荐 -->
        <w-detail-column title="其他推荐">
          <w-detail-related :detail-params="(route.params.detail as string[]).slice(0, 2)" />
        </w-detail-column>
      </div>
    </a-affix>
  </a-col>
</template>

<script setup lang="ts">
let route = useRoute()
let articlesPath = computed(() => route.path.slice(7))

let { data } = await useAsyncData('articles-detail', () => queryContent(articlesPath.value).findOne())
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