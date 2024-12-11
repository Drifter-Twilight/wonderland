<template>
  <a-row justify="center" align="center" class="h-full">
    <a-col :span="24" class="h-full">
      <w-transition-fade>
        <slot></slot>
      </w-transition-fade>
    </a-col>
  </a-row>
</template>