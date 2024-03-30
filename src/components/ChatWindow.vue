<script setup>
import fixedInput from './fixedInput.vue' // Adjusted to match the actual file name
import { ref, onMounted, onUnmounted } from 'vue'

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
        <button type="button" @click="count++">count is</button>
      </span>
      <span>
        <button type="button" @click="count++">count is</button>
      </span>
    </div>
    <div
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
  border: 1px solid #4343e1d9;
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
  scrollbar-color: #555 #f9f9f900; /* thumb and track color */
  scrollbar-width: thin; /* 'auto', 'thin', 'none' */
}

/* Styles for the scrollbar track */
.chat::-webkit-scrollbar {
  width: 10px; /* Adjust scrollbar width */
  background-color: #f9f9f9; /* Track color */
}

/* Styles for the scrollbar thumb */
.chat::-webkit-scrollbar-thumb {
  background-color: #555; /* Thumb color */
  border-radius: 5px; /* Optional: Round corners of the thumb */
  border: 2px solid #f9f9f9; /* Optional: Add border around the thumb */
}

/* Optionally, style the scrollbar button (arrows at the ends of the scrollbar) */
.chat::-webkit-scrollbar-button {
  display: none; /* Often not styled, but can be used to hide or style the buttons */
}

/* Optionally, style the scrollbar corner (where horizontal and vertical scrollbars meet) */
.chat::-webkit-scrollbar-corner {
  background-color: black; /* Corner color */
}
</style>
