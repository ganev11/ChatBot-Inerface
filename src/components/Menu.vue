<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  closeMenuMobile: Boolean
})
const mobileScreen = ref(false)
const emit = defineEmits(['menu-toggle'])

watch(mobileScreen, newValue => {
  if (newValue === true) {
    console.log('Mobile screen detected:', newValue)
    hideMenu.value = false // Close menu if mobile screen is detected
  } else {
    props.closeMenuMobile = false
  }
  console.log('Mobile screen:', newValue, 'Hide menu:', hideMenu.value)
})
function toggleMenu() {
  hideMenu.value = !hideMenu.value
  emit('menu-toggle')
}
function checkMobileScreen() {
  // This is a common breakpoint for mobile devices
  const query = window.matchMedia('(max-width: 768px)')
  mobileScreen.value = query.matches
}

const hideMenu = ref(false)
const count = ref(0)
onMounted(() => {
  console.log(props.closeMenuMobile)
})
onMounted(() => {
  checkMobileScreen() // Check immediately on mount
  window.addEventListener('resize', checkMobileScreen) // Add resize listener
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobileScreen) // Clean up listener
})
</script>

<template>
  <div class="menu">
    <div
      v-if="!hideMenu"
      :class="{
        'background-menu': !hideMenu && !props.closeMenuMobile,
        'background-menu-off': hideMenu && props.closeMenuMobile
      }"
    >
      <div
        :class="{
          'menu-content': !hideMenu,
          'menu-content-on': !hideMenu && !props.closeMenuMobile,
          'menu-content-off': hideMenu && props.closeMenuMobile
        }"
      >
        <!-- menu content -->
        <!-- new chat btn fixed -->
        <div class="menu-btn">
          <button type="button" @click="count++">New Chat</button>
        </div>
        <!-- history -->
        <!-- user Info fixed -->
      </div>
    </div>
    <!-- Toggle btn -->
    <span class="tgl" v-if="!mobileScreen">
      <button @click="toggleMenu">tgl</button>
    </span>
  </div>
</template>

<style scoped>
.menu-content {
  width: 262px;
}
.menu {
  display: flex;
  height: 100vh;
  position: fixed;
}
.menu-off {
  width: 1px;
}
.background-menu {
  color: white;
  background-color: #171717;
  height: calc(100vh - 24px);
  width: 238px;
  padding: 12px;
  transition: width 0.5s;
  /* border: 4px solid #333; */
}
.background-menu-off {
  width: 1px;
  padding: 0;
  background-color: #171717;
  transition: width 0.5s;
}
.menu-btn {
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.tgl {
  position: relative;
  top: 50%;
  left: 20px;
  width: 10px;
  height: 24px;
  background-color: #171717;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-content-on {
  /* display: block; */
  transition: display 0.5s;
  width: 100%;
  transition: width 0.5s;
}
.menu-content-off {
  /* display: none; */
  transition: display 0.5s;
  width: 0;
  transition: width 0.5s;
}
</style>
