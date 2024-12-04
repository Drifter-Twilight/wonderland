<template>
  <a-layout class="relative h-full bg-transparent">
    <a-layout-header class="h-[64px] z-[1003]">
      <slot name="header"></slot>
    </a-layout-header>
    
    <a-layout-content class="absolute overflow-hidden top-0 left-0 w-full h-full">
      <slot></slot>
    </a-layout-content>
  </a-layout>
</template>=