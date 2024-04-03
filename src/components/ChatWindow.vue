<script setup>
import fixedInput from './fixedInput.vue' // Adjusted to match the actual file name
import { ref, onMounted, onUnmounted } from 'vue'
import aiModels from './aiModels.vue'
import initialWindow from './initialWindow.vue' // Adjusted to match the actual file name
import currentChat from './currentChat.vue' // Adjusted to match the actual file name

defineProps({
  hideMenu: Boolean
})

const textAreaHeight = ref(1)
const mobileScreen = ref(false)

function handleRowUpdate(newHeight) {
  textAreaHeight.value = newHeight
}
function checkMobileScreen() {
  // This is a common breakpoint for mobile devices
  const query = window.matchMedia('(max-width: 768px)')
  mobileScreen.value = query.matches
}

const emit = defineEmits(['menu-toggle-mobile'])

function tohhleMenuMobile() {
  emit('menu-toggle-mobile')
}

onMounted(() => {
  checkMobileScreen() // Check immediately on mount
  window.addEventListener('resize', checkMobileScreen) // Add resize listener
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobileScreen) // Clean up listener
})
</script>

<template>
  <div class="background-chat">
    <div
      class="nav-bar"
      :class="{
        'max-width': !hideMenu,
        'max-width-off': hideMenu || mobileScreen
      }"
    >
      <span v-if="mobileScreen" @click="tohhleMenuMobile">HAM</span>
      <span>
        <aiModels />
      </span>
      <span>
        <button v-if="false" type="button" @click="count++">count is</button>
      </span>
    </div>
    <currentChat />

    <!-- <div
      v-if="chatting"
      :key="textAreaHeight"
      class="chat"
      :style="{ paddingBottom: textAreaHeight + 'px' }"
    >
      <p>prvni</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      {{ textAreaHeight + 'px' }}
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>

      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>posledni</p>
    </div>
    <initialWindow v-else /> -->
    <fixedInput :hideMenu="hideMenu" @new-height="handleRowUpdate" />
  </div>
</template>

<style scoped>
.max-width {
  max-width: calc(100% - 264px);
  transition: max-width 0.5s;
}
.max-width-off {
  max-width: 100%;
  transition: max-width 0.5s;
}
.nav-bar {
  position: fixed;
  width: 100%;
  min-height: 40px;
  background-color: #212121;
  color: white;
  padding: 8px;
  /* border: 1px solid #4343e1d9; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  z-index: 5000;
}
.background-chat {
  width: 100%;
  color: rgba(255, 255, 255, 0);
  background-color: #212121;
  display: flex;
  justify-content: center;
}
.chat {
  margin-top: 60px;
  height: calc(100% - 86px);
  margin-bottom: 86px;
  width: max-content;

  overflow-y: auto;
  padding: 12px;
  box-sizing: border-box;
  /* Firefox scrollbar styling */
  color: white;
  background-color: #212121;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: transparent transparent; /* For Firefox, set default state to transparent */
}

/* Default state for Webkit browsers, set scrollbar to transparent */
.chat::-webkit-scrollbar {
  width: 10px;
  background-color: transparent; /* Make scrollbar track transparent */
}

.chat::-webkit-scrollbar-thumb {
  background-color: transparent; /* Make scrollbar thumb transparent */
  border-radius: 5px;
  border: 2px solid transparent;
}

.chat:hover {
  scrollbar-color: #555 transparent; /* For Firefox, visible state */
}

/* On hover, change Webkit scrollbar colors to be visible */
.chat:hover::-webkit-scrollbar {
  background-color: #f9f9f900; /* Optional: Change track color on hover */
}

.chat:hover::-webkit-scrollbar-thumb {
  background-color: #555; /* Change thumb color on hover */
  border: 2px solid #f9f9f900; /* Optional: Adjust border color on hover */
}

/* Optionally, adjust the ::-webkit-scrollbar-button and ::-webkit-scrollbar-corner styles as needed */
.chat::-webkit-scrollbar-button {
  display: none;
}

.chat::-webkit-scrollbar-corner {
  background-color: black; /* Adjust if needed */
}
</style>
