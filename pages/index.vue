<template>
  <nuxt-layout name="intro">
    <div class="relative w-full h-full">
      <p class="wonderland" data-word="WONDERLAND">WONDERLAND</p>
      <p class="source" data-before="PWOER BY " data-after="WITT">PWOER BY <span>WITT</span></p>
      <p class="skip" @click="enterHome">Skip</p>

      <img src="/public/images/svg/decoration.svg" alt="decoration" class="decoration">
      <img src="/public/images/svg/welcome.svg" alt="welcome" @animationend="enterHome" class="welcome">
    </div>
  </nuxt-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  pageTransition: {
    name: 'intro'
  }
})

let timeout: NodeJS.Timeout
function enterHome() {
  timeout = setTimeout(() => {
    navigateTo('/home')
  }, 1000)
}

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<style scoped>
@keyframes magenta-enter {
  45% {
    color: #ff00ff;
  }

  50% {
    color: transparent;
  }

  55% {
    color: #ff00ff;
  }
}

@keyframes magenta-flash {
  9% {
    transform: scale(1);
  }

  11% {
    color: rgba(255, 0, 255, 0.05);
    transform: scale(1.5);
  }

  12% {
    transform: scale(1);
  }
}

@keyframes cyan-height {
  0% {
    height: 0%;
    color: transparent;
  }

  5% {
    height: 100%;
    color: cyan;
  }

  30% {
    height: 50%;
    left: -5px;
  }

  39% {
    height: 20%;
    left: -20px;
  }

  40% {
    height: 100%;
    left: -5px;
  }

  41% {
    height: 10%;
  }

  50% {
    height: 100%;
  }

  55% {
    height: 10%;
  }

  60% {
    height: 0;
  }
}

@keyframes text-skew {
  0% {
    color: #fff;
  }

  49% {
    color: #fff;
    transform: skewX(0deg);
  }

  50% {
    color: #fff;
    transform-origin: 50% 100%;
    transform: skewX(-20deg);
  }

  51% {
    color: #fff;
    transform: skewX(0deg);
  }
}

p {
  position: absolute;
  color: #fff;
  font-weight: 500;
  margin: 0;
}

.wonderland {
  left: 0;
  top: 30%;
  font-size: calc(5rem + 5vw);
  z-index: 3;
  color: transparent;
  animation: text-skew 1.2s ease-in 1.5s infinite;

  &::before {
    position: absolute;
    content: attr(data-word);
    top: 0;
    left: 5px;
    height: 0px;
    color: #ff00ff;
    z-index: -1;
    transform-origin: left bottom;
    animation: magenta-enter 0.8s linear 3, magenta-flash 0.5s ease-in 2.4s infinite;
    filter: contrast(200%);
  }

  &::after {
    overflow: hidden;
    position: absolute;
    content: attr(data-word);
    top: 0;
    left: -5px;
    z-index: -1;
    animation: cyan-height 1.5s ease-out 2.4s infinite;
  }
}

@keyframes source-scale {
  to {
    transform: scale(1);
  }
}

@keyframes source-diffuse {
  to {
    transform: scale(1.5);
    opacity: 0;
  }
}

.source {
  right: 0;
  top: 55%;
  font-size: 120px;
  transform: scale(1000);
  color: transparent;
  -webkit-text-stroke: 3px #fff;
  animation: source-scale 0.5s ease-in 3s 1 forwards;

  &::before,
  &::after {
    position: absolute;

    color: transparent;
    -webkit-text-stroke: 3px #fff;
    animation: source-diffuse 1.5s linear 3.5s infinite;
  }

  &::before {
    left: 0;
    top: 0;
    content: attr(data-before);
  }

  &::after {
    content: attr(data-after);
    right: 0;
    top: 0;
    -webkit-text-stroke: 3px #D69340;
  }

  span {
    -webkit-text-stroke: 3px #D69340;
  }
}

.skip {
  right: 60px;
  bottom: 50px;
  font-size: 30px;
  font-weight: normal;
  cursor: pointer;
}

@keyframes decoration-fade {
  to {
    right: 0;
    top: 0;
    opacity: 1;
  }
}

@keyframes welcome-fade {
  to {
    left: 0;
    bottom: 0;
    opacity: 1;
  }
}

img {
  position: absolute;
  opacity: 0;
}

.decoration {
  right: -50px;
  top: -50px;
  width: 300px;
  animation: decoration-fade 1s ease-out 4s forwards;
}

.welcome {
  left: -50px;
  bottom: -50px;
  width: 600px;
  animation: welcome-fade 1s ease-out 4s forwards;
}
</style>