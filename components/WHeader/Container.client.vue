<template>
  <a-row v-if="isOpen" justify="space-between" align="center" class="h-full">
    <a-col :span="3" class="flex-center">
      <router-link to="/">
        <h1>LOGO</h1>
      </router-link>
    </a-col>

    <w-header-nav mode="horizontal" />
  </a-row>

  <a-row v-else justify="space-between" align="center" class="h-full">
    <a-col :span="3" class="flex-center">
      <router-link to="/">
        <h1>LOGO</h1>
      </router-link>
    </a-col>

    <a-col :span="2" class="flex-center h-full">
      <div class="flex justify-center w-[24px] h-[24px]">
        <input type="checkbox" id="togglemenu-input" @change="toggleMenu" class="hidden">
        <label for="togglemenu-input" class="togglemenu-label relative">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <a-drawer 
        :visible="showMenu" 
        height="calc(100vh - 64px)" 
        :header="false" 
        :footer="false" 
        placement="top" 
        unmountOnClose
        :mask="false"
        class="translate-y-[64px]">
        <w-header-nav mode="vertical" />
      </a-drawer>
    </a-col>
  </a-row>
</template>

<script setup>
let isOpen = useMediaQuery('(min-width: 992px)')

let showMenu = ref(false)
function toggleMenu() {
  showMenu.value = !showMenu.value
}
</script>

<style scoped>
.togglemenu-label {
  width: 100%;
  height: 100%;

  span {
    position: absolute;
    content: "";
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #000;
    transition: transform 0.2s ease-out
  }

  span:nth-child(1) {
    top: 0;
  }

  span:nth-child(2) {
    top: 10px;
  }

  span:nth-child(3) {
    top: 20px;
  }
}

#togglemenu-input:checked+.togglemenu-label span:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

#togglemenu-input:checked~.togglemenu-label span:nth-child(2) {
  opacity: 0;
}

#togglemenu-input:checked~.togglemenu-label span:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}
</style>