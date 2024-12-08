<template>
  <div 
    class="w-cursor absolute w-[15px] h-[15px] rounded-full bg-white -translate-x-1/2 -translate-y-1/2 z-[1005] outline outline-1 outline-white outline-offset-4 pointer-events-none"
    :style="{ left: `${x}px`, top: `${y}px`}"></div>
</template>

<script setup lang="ts">
let {x, y} = useMouse()
</script>

<style>
@keyframes cursor-hover {
  0% {
    outline-color: rgba(255, 255, 255, 1);
    outline-offset: 0px;
  }

  100% {
    outline-color: rgba(255, 255, 255, 0);
    outline-offset: 15px;
  }
}

@keyframes cursor-active {
  to {
    background-position-x: 100%;
  }
}

:has(a:hover, button:hover, input[type="button"]:hover) ~ .w-cursor {
  animation: cursor-hover .7s linear infinite;
  opacity: 1;
}

:has(a:active, button:active, input[type="button"]:active) ~ .w-cursor {
  background-image: linear-gradient(-45deg, #f9d423 0%,  #f83600 50%, #f9d423 100%);
  background-size: 300% 300%;
  background-repeat: no-repeat;
  animation: cursor-active 1s linear infinite, cursor-hover .7s linear infinite reverse;
  opacity: 1;
}
</style>