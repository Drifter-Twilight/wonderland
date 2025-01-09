<template>
  <a-col :span="24" class="relative box-border h-max">
    <p class="mb-16 text-4xl text-center font-bold text-[#D69340]">关于本项目</p>

    <p class="z-[-1] absolute left-0 top-[38%] lg:top-1/2 text-6xl lg:text-9xl font-bold">Wonderland</p>

    <div class="flex-center flex-col lg:flex-row lg:mb-40">
      <div class="lg:translate-y-[15%] w-[85vw] lg:max-w-[400px] mb-6 lg:mb-0 p-8 bg-black/80">
        <p class="mb-6"><span class="font-bold">Wonderland </span>是仿 <a href="https://www.jfjproductions.com/#"
            class="font-bold underline decoration-white underline-offset-4">JFJ Production</a> 的个人博客项目，取自林俊杰的歌曲<span
            class="font-bold">《Wonderland》</span>，一首充满科技感和未来幻想的作品，同时翻译成中文意思为“仙境 /
          乐园”，那里充满了梦想、希望和创造力，能够容纳我的一切。而在这，我与你分享我的思考、创意和生活点滴，一起探索这个奇妙的世界，发现那些隐藏在日常中的奇迹。</p>

        <p>自由、奇迹、世界、个人、梦想与现实，探索过去、现在和未来。在这个快速变化的世界中，我们如何保持自己的个性和创造力，如何在现实与理想之间找到平衡。即使在数字化的时代，人与人之间的联系和真挚的情感依然不可替代。</p>
      </div>

      <div
        class="dowhat-intro relative lg:-translate-x-5 w-[85vw] lg:max-w-[400px] p-8 bg-white text-black mb-80 lg:mb-0">
        <p class="mb-6">曾经 人类无力与实地的距离 却因为心系而扎实爱着</p>
        <p class="mb-6">如今 科技弥补了距离的空缺 却麻醉了心灵的安全感</p>
        <p class="mb-6 leading-[2]">
          建立在指尖上的沟通<br>
          既是便利 亦是纷扰<br>
          分不清楚是非对错真伪<br>
          我们在苍凉中奋力探索<br>
          微弱的信号中寻求光芒</p>
        <p>虽然常常对环境感到无力 但人们总可以因为一个瞬间、一个眼神、一个微笑、一双暖手，而触及内心深处。</p>
      </div>
    </div>
  </a-col>
</template>

<script setup lang="ts">

</script>

<style scoped>
.dowhat-intro::after {
  position: absolute;
  content: '';
  left: 0;
  bottom: 0;
  transform: translateY(100%);
  width: 100%;
  height: 250px;
  background: url('/images/jpg-png-webp/sunset.webp');
  background-size: 100% 100%;
}

@media screen and (min-width: 992px) {
  .dowhat-intro::after {
    width: 250px;
    height: 150px;
    left: -5%;
    bottom: 0;
    transform: translateY(85%);
  }
}
</style>