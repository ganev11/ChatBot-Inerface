<script setup>
import fixedInput from './fixedInput.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import aiModels from './aiModels.vue'
import initialWindow from './initialWindow.vue'
import currentChat from './currentChat.vue'
import { useConversationStore } from '../stores/conversationStore'
const conversationStore = useConversationStore()

defineProps({
  hideMenu: Boolean
})

// Hambuger menu start
import { useMobileMenuStore } from '../stores/mobileMenuStore'
const mobileMenu = useMobileMenuStore()
function tohhleMenuMobile() {
  mobileMenu.setHamMenuOpen(true)
}
// Hambuger menu end

const textAreaHeight = ref(1)
const mobileScreen = ref(false)
const initialWindowComputed = computed(() => conversationStore.initialWindow)

function handleRowUpdate(newHeight) {
  textAreaHeight.value = `${newHeight}px`
}
function checkMobileScreen() {
  const query = window.matchMedia('(max-width: 768px)')
  mobileScreen.value = query.matches
}

function newChat() {
  conversationStore.startNewConversation()
}
onMounted(() => {
  checkMobileScreen()
  window.addEventListener('resize', checkMobileScreen)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobileScreen)
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
      <span v-if="mobileScreen" @click="tohhleMenuMobile">
        <img class="ham-icon" src="../assets/svg/ham.svg" alt="" />
      </span>
      <span>
        <aiModels />
      </span>
      <span v-if="mobileScreen" @click="newChat">
        <img class="new-icon" src="../assets/svg/edit.svg" alt="" />
      </span>
    </div>
    <initialWindow
      :textAreaHeight="textAreaHeight"
      v-if="initialWindowComputed"
    />
    <currentChat :textAreaHeight="textAreaHeight" v-else />
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
  /* background-color: aqua !important; */
  max-height: 77px;
  position: fixed;
  width: 100%;
  min-height: 40px;
  background-color: #212121;
  color: white;
  padding: 8px 10px;
  /* border: 1px solid #4343e1d9; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  z-index: 5000;
  align-items: center;
}
.background-chat {
  width: 100%;
  color: rgba(255, 255, 255, 0);
  background-color: #212121;
  display: flex;
  justify-content: center;
}

.new-icon {
  width: 27px;
  height: 27px;
  cursor: pointer;
  color: white;
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
.ham-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: white;
}
</style>
