<template>
  <div v-if="appReady">
    <!-- Menu component and ChatWindow only render after fetchUser has completed -->
    <Menu id="menu" @menu-toggle="toggleChatbotMargin" />
    <ChatWindow
      :key="rerender"
      :hideMenu="hideMenu"
      :class="{
        'chat-window-margin-on': !hideMenu,
        'chat-window-margin-off': hideMenu
      }"
      id="ChatWindow"
      @menu-toggle-mobile="toggleMobileMenu"
    />
  </div>
</template>

<script setup>
import Menu from './components/Menu.vue'
import ChatWindow from './components/ChatWindow.vue'
import { useMobileMenuStore } from './stores/mobileMenuStore'
import { useUser } from '../src/composables/user.js' // Import your useUser hook
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue'

const appReady = ref(false) // Controls rendering based on readiness
const hideMenu = ref(false)
const hideMobileMenu = ref(false)
const screenWidth = ref(window.innerWidth)
const breakpoint = 768

// Computed property to determine if the viewport is in mobile mode
const isMobile = ref(screenWidth.value < breakpoint)
const mobileMenu = useMobileMenuStore()
const rerender = ref(0)

function setMobileScreen(isMobile) {
  mobileMenu.setMobileScreen(isMobile)
}

function toggleChatbotMargin() {
  hideMenu.value = !hideMenu.value
}

function toggleMobileMenu() {
  hideMobileMenu.value = true
}

// Update screenWidth on window resize
function updateScreenWidth() {
  screenWidth.value = window.innerWidth
  isMobile.value = screenWidth.value < breakpoint
  setMobileScreen(isMobile.value)
}

const initializeApp = async () => {
  const { fetchUser } = useUser()
  await fetchUser()
  appReady.value = true // Set the app as ready after fetching user details
  rerender.value++ // Force re-render if necessary
}

onBeforeMount(() => {
  initializeApp()
})

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
  setMobileScreen(isMobile.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})
</script>

<style>
#menu {
  position: fixed;
  z-index: 6000;
}
#ChatWindow {
  margin-bottom: auto; /* Push the chat window to the bottom */
  /* width: calc(100% - 250px); */
  height: 100%;
  box-sizing: border-box;
  background-color: #212121;
  color: white;
  overflow: auto;
}
#ChatWindow::-webkit-scrollbar {
  display: none; /* This hides the scrollbar but allows scrolling */
}
.chat-window-margin-on {
  margin-left: 262px;
  transition: margin-left 0.5s;
}
.chat-window-margin-off {
  margin-left: 0;
  transition: margin-left 0.5s;
}
@media (max-width: 768px) {
  #menu {
    display: none;
  }
  #ChatWindow {
    margin-left: 0;
    width: 100%;
    transition: width 0.5s;
  }
}
</style>
