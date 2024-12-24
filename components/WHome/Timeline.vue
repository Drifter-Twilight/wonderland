<template>
  <div class="flex-center h-full">
    <a-timeline mode="alternate" reverse pending labelPosition="same">
      <template #dot>
        <p class="m-0 text-3xl font-bold bg-clip-text bg-gradient-to-tr from-gray-400 to-slate-200">2023</p>
      </template>

      <a-timeline-item v-for="item in timelineArr" :key="item.id"line-color="#D69340"
        dot-color="#D69340">
        <template #label>
          <div class="flex-center flex-col text-white">
            <p class="m-0">26</p>
            <p class="m-0">Spetember</p>
          </div>
        </template>

        <p class="overflow-omission w-max h-full m-0 text-left">{{ item.title }}</p>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script setup lang="ts">
const timelineArr = reactive([
  {
    id: 1,
    date: "9-26",
    title: "自定义任意范围高亮 -- CSS Custom Highlight API详解"
  },
  {
    id: 2,
    date: "9-26",
    title: "为视频增加画中画功能 -- Picture-in-Picture API详解"
  },
  {
    id: 3,
    date: "9-26",
    title: "将元素变成弹出框 -- Popover API详解"
  },
  {
    id: 4,
    date: "9-18",
    title: "CSS 22个非前缀伪元素详细解析"
  },
  {
    id: 5,
    date: "9-14",
    title: "1.6W+字揭秘69个有趣的CSS伪类"
  },
])
</script>

<style scoped>
:deep(.arco-timeline) {
  width: 90vw;
  justify-content: center;
  height: calc(100vh - 64px);
}

:deep(.arco-timeline-item-dot-line) {
  border: 1.5px solid #D69340!important;
}

:deep(.arco-timeline-alternate .arco-timeline-item-vertical-left > .arco-timeline-item-content-wrapper) {
  flex-direction: row-reverse;
}

:deep(.arco-timeline-alternate .arco-timeline-item-vertical-right > .arco-timeline-item-content-wrapper) {
  margin: 0;
}

:deep(.arco-timeline-item-content-wrapper) {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-30%);
  margin: 0;
}

:deep(.arco-timeline-item-label) {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1.5vw;
}

:deep(.arco-timeline-item-dot-custom) {
  background-color: #141414;
  margin: 10px 0;
  color: transparent;
}

:deep(.arco-timeline-item-vertical-left .arco-timeline-item-content) {
  display: flex;
  justify-content: flex-start;
}
:deep(.arco-timeline-item-vertical-right .arco-timeline-item-content) {
  display: flex;
  justify-content: flex-end;
}

:deep(.arco-timeline-item-content) {
  box-sizing: border-box;
  overflow: hidden;
  width: 45vw;
  color: #D69340;
  font-size: large;
  font-weight: bold;
}
</style>