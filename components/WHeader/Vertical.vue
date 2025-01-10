<template>
  <a-row justify="space-between" align="center" class="h-full">
    <a-col :span="3" class="flex-center">
      <img 
        src="/images/svg/logo.svg" alt="logo" 
        @pointerdown="goHome"
        style="width: 2em;">
    </a-col>

    <a-col :xs="3" :sm="2" class="flex-center h-full">
      <div 
        class="flex justify-center w-[24px] h-[24px]">
        <input type="checkbox" v-model="showMenu" id="togglemenu-input"  class="hidden">
        <label for="togglemenu-input" class="togglemenu-label relative">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <a-drawer :visible="showMenu" height="calc(100vh - 0)" :header="false" :footer="false" placement="top"
        :mask="false">
        <a-row class="pt-[64px]">
          <w-header-nav v-model:show-menu="showMenu" mode="vertical" />
        </a-row>
      </a-drawer>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
let showMenu = ref(false)
function toggleMenu() {
  showMenu.value = !showMenu.value
}

function goHome() {
  navigateTo('/home')
  showMenu.value = false
}
</script>

<style scoped>
.togglemenu-label {
  width: 100%;
  height: 100%;
}

.togglemenu-label span {
  position: absolute;
  content: "";
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #e1e1e1;
  transition: transform 0.2s ease-out
}

.togglemenu-label span:nth-child(1) {
  top: 0;
}

.togglemenu-label span:nth-child(2) {
  top: 10px;
}

.togglemenu-label span:nth-child(3) {
  top: 20px;
}

#togglemenu-input:checked + .togglemenu-label span:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

#togglemenu-input:checked ~ .togglemenu-label span:nth-child(2) {
  opacity: 0;
}

#togglemenu-input:checked ~ .togglemenu-label span:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}
</style>
