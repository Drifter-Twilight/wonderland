<template>
  <a-layout class="relative h-full bg-transparent">
    <slot name="header"></slot>
    
    <a-layout-content class="absolute overflow-hidden top-0 left-0 w-full h-full">
      <slot></slot>
    </a-layout-content>
  </a-layout>
</template>=