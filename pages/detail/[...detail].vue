<template>
  <a-col 
    v-if="data?.img"
    :span="24"
    class="detail-cover flex-center z-10 overflow-hidden lg:max-h-[70vh] 2xl:max-h-[60vh]">
    <w-detail-cover :cover="data?.img" />
  </a-col>

  <a-col 
    :xs="24" :sm="24" :lg="18" :xxl="16" 
    class="z-0 flex space-x-8">

    <div class="box-border overflow-hidden h-max px-8 pb-8 pt-[64px] bg-white lg:mt-0 text-black">
      <w-detail-info :title="data?.title" :date="data?.date" :update="data?.update" :tags="data?.tags" />
      <a-divider class="bg-[var(--color-primary)]" />
      <ContentRenderer :value="data!" class="content-container mb-10">
        <template #empty>w-
          <div class="flex-center w-full aspect-square">
            <a-empty />
          </div>
        </template>
      </ContentRenderer>
      <w-detail-comment />
    </div>
      <!-- <w-detail-info :title="data?.title" :date="data?.date" :update="data?.update" :tags="data?.tags" />
      <a-divider class="bg-[#D69340]" />
      <ContentRenderer :value="data!" class="content-container mb-10">
        <template #empty>w-
          <div class="flex-center w-full aspect-square">
            <a-empty />
          </div>
        </template>
      </ContentRenderer>
      <w-detail-comment /> -->
  </a-col>
</template>

<script setup lang="ts">
let route = useRoute()
let articlesPath = computed(() => route.path.slice(7))

let { data } = await useAsyncData('articles-detail', () => queryContent(articlesPath.value).findOne())
</script>

<style>
.detail-cover {
  mask: linear-gradient(to right, transparent 5%, black, transparent 95%);
  mask-size: 100% 100%;
  mask-position: center;
}

.content-container {
  background-image: linear-gradient(transparent 0%, rgba(214, 147, 64, .5) 1%, transparent 2%),
    linear-gradient(90deg, transparent 0%, rgba(214, 147, 64, .5) 1%, transparent 2%);
  background-repeat: round, round;
  background-size: 50px 30px, 30px 30px;
  background-position: 0% 0%, -2% -3%, -2% -3%;
}
</style>