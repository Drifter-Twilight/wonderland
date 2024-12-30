<template>
  <nuxt-layout name="intro">
    <template v-if="showWarn">
      <w-transition-fade> 
        <div class="w-[90vw] lg:w-[800px] h-max space-y-4">
          <p class="text-2xl">⚠️ 警告：进站前详阅</p>
          <a-divider />
          <p class="text-md leading-6">
            有极少数的人在观看一些视觉特效时可能会突然癫痫发作，这些特效包括闪光、动画或图形。在游览本站的介绍页/长按动态背景等具备动画功能时，这些人可能会出现癫痫症状。甚至连不具有癫痫史的人，也可能在进入本站时，出现类似癫痫症状。如果您或您的家人有癫痫史，请在进入本站之前先与医生咨询。如果您在游览本站时出现以下症状，包括眼睛疼痛、视觉异常、偏头痛、痉挛或意识障碍（诸如昏迷）等，可以点击<b>「Skip」</b>跳过动画/切勿长按背景/立即退出本站。
          </p>

          <p class="text-md leading-6">
            除上述症状外，当您感到头痛、头晕眼花、恶心想吐或类似晕车症状时，以及当身体的某些部位感到不舒服或疼痛时，请立即退出本站。若在退出本站后，症状仍没有减退，请立即寻求医生的诊疗。</p>
        </div>
      </w-transition-fade>
    </template>

    <template v-else>
      <div class="intro-container relative w-full h-full">
        <p class="wonderland" data-word="WONDERLAND">WONDERLAND</p>
        <p class="source" data-after="WITT">PWOER BY <span>WITT</span></p>
        <p class="skip" @pointerdown="navigateTo('/home')">Skip</p>

        <img src="/public/images/svg/decoration.svg" alt="decoration" class="decoration">
        <img src="/public/images/svg/welcome.svg" alt="welcome" @animationend="enterHome" class="welcome">
      </div>
    </template>
  </nuxt-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const showWarn = ref(true)

let WarnTimeout: NodeJS.Timeout
onMounted(() => {
  WarnTimeout = setTimeout(() => {
    showWarn.value = false
  }, 5000)
})

let timeout: NodeJS.Timeout
function enterHome() {
  timeout = setTimeout(() => {
    navigateTo('/home')
  }, 500)
}

onUnmounted(() => {
  clearTimeout(WarnTimeout)
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

.intro-container p {
  position: absolute;
  font-weight: 500;
  margin: 0;
}

.wonderland {
  left: 0;
  top: 30%;
  font-size: clamp(3rem, 12vw, 14rem);
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
  font-size: clamp(3rem, 8vw, 12rem);
  transform: scale(1000);
  color: transparent;
  -webkit-text-stroke: 3px #fff;
  animation: source-scale 0.5s ease-in 3s 1 forwards;

  &::after {
    position: absolute;
    z-index: 0;
    content: attr(data-after);
    right: 0;
    top: 0;
    font-weight: 400;
    -webkit-text-stroke: 3px #D69340;
    color: transparent;
    animation: source-diffuse 1.5s linear 3.5s infinite;
  }

  span {
    -webkit-text-stroke: 3px #D69340;
  }
}

.skip {
  right: clamp(2rem, 4vw, 5rem);
  bottom: clamp(2rem, 4vw, 5rem);
  font-size: clamp(1.5rem, 5vw, 2.3rem);
  font-weight: normal;
  cursor: pointer;
}

@media screen and (max-width: 576px) {
  .wonderland {
    top: 40%;
  }

  .source {
    top: 55%;
  }
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
  right: 0;
  top: 0;
  width: clamp(10rem, 25vw, 23rem);
  animation: decoration-fade 1s ease-out 4s forwards;
}

.welcome {
  left: -50px;
  bottom: -50px;
  width: clamp(15rem, 45vw, 55rem);
  animation: welcome-fade 1s ease-out 4s forwards;
}
</style>