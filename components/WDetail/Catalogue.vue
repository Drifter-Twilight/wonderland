<template>
  <a-affix :offsetTop="65">
    <div class="catalogue overflow-hidden box-border h-max max-h-[50vh] w-full p-3 rounded-lg bg-white text-black">
      <p class="font-semibold text-lg border-b border-dotted text-[#D69340] border-[#D69340]">目录</p>

      <ul class="relative box-border py-1 scroll-none overflow-auto">
        <li 
          v-for="item in linkArr" :key="item.text"
          :style="{ 'text-indent': `${item.depth - 2}em` }"
          class="box-border transition-all p-2"
          :class="{'active-anchor-link': route.hash == `#${item.id}`}">
          <a :href="`#${item.id}`" class="line-clamp-1 text-ellipsis text-md">{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </a-affix>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content';

interface Links {
  id: string;
  text: string;
  depth: number;
}

const props = defineProps<{
  links?: TocLink[]
}>()

const route = useRoute()

function getTocTextsWithIndent(tocLinks: TocLink[] | undefined) {
  const tocTexts: Links[] = [];

  function traverseLinks(links: TocLink[] | undefined) {
    if(links) {
      for (const link of links) {
        tocTexts.push({id: link.id, text: link.text, depth: link.depth});

       if (link.children) {
          traverseLinks(link.children);
        }
      }
    }
  }

  traverseLinks(tocLinks);

  return tocTexts;
}

const linkArr = reactive(getTocTextsWithIndent(props.links))
console.log(linkArr)
</script>

<style scoped>
.catalogue::after {
  position: absolute;
  content: '';
  left: 0;
  bottom: 0;
  width: 100%;
  height: 10%;
  background-image: linear-gradient(to top, white 50%, transparent);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.active-anchor-link {
  background-color: rgba(214, 146, 64, 0.5);
}
</style>