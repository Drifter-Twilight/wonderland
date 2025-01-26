<template>
  <ul class="catalogue-scrollbar box-border max-h-[45vh] 2xl:max-h-[35vh] overflow-y-auto scroll-smooth">
    <template v-if="linkArr.length == 0">
      <div class="flex-center w-full h-[250px]">
        <a-empty />
      </div>
    </template>
    
    <template v-else>
      <li 
      v-for="item in linkArr" :key="item.text" 
      :style="{ 'text-indent': `${item.depth - 2}em` }"
      class="box-border transition-all py-2 pl-1 rounded" :class="{ 'active-anchor-link': currentHash == `#${item.id}` }">
      <a :href="`#${item.id}`" class="line-clamp-1 text-ellipsis text-md">{{ item.text }}</a>
    </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content';
import { useScrollToTarget } from '~/composables/useScrollToTarget';

const props = defineProps<{
  links?: TocLink[],
  hash: string
}>()

const linkArr = reactive(getTocTextsWithIndent(props.links))

let currentHash = ref('')
onMounted(() => {
  currentHash.value = props.hash
  location.hash = currentHash.value

  watchEffect(() => {
    currentHash.value = props.hash
    location.hash = currentHash.value
  })
})
</script>

<style scoped>
.catalogue-scrollbar {
  --catalogue-sb-track-color: transparent;
  --catalogue-sb-thumb-color: #d4d4d4;
  --catalogue-sb-size: 3px;
}

.catalogue-scrollbar::-webkit-scrollbar {
  width: var(--catalogue-sb-size)
}

.catalogue-scrollbar::-webkit-scrollbar-track {
  background: var(--catalogue-sb-track-color);
  border-radius: 50px;
}

.catalogue-scrollbar::-webkit-scrollbar-thumb {
  background: var(--catalogue-sb-thumb-color);
  border-radius: 50px;
}

@supports not selector(::-webkit-scrollbar) {
  .catalogue-scrollbar {
    scrollbar-color: var(--catalogue-sb-thumb-color)
                     var(--catalogue-sb-track-color);
  }
}

.active-anchor-link {
  background-color: rgba(214, 146, 64, 0.3);
}
</style>