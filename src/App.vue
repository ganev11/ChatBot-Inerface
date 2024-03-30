<template>
  <Menu id="menu" @menu-toggle="toggleChatbotMargin" />
  <ChatWindow
    :hideMenu="hideMenu"
    :class="{
      'chat-window-margin-on': !hideMenu,
      'chat-window-margin-off': hideMenu
    }"
    id="ChatWindow"
  />
</template>
<script setup>
import Menu from './components/Menu.vue'
import ChatWindow from './components/ChatWindow.vue'

import { ref } from 'vue'

const hideMenu = ref(false)

function toggleChatbotMargin() {
  console.log('object :>> ')
  hideMenu.value = !hideMenu.value
}
</script>

<style>
#menu {
  position: fixed;
  z-index: 1000;
}
#ChatWindow {
  margin-bottom: auto; /* Push the chat window to the bottom */
  /* width: calc(100% - 250px); */
  height: 100%;
  box-sizing: border-box;
  background-color: #212121;
  color: white;
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
