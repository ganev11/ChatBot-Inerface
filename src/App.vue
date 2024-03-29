<script setup>
import Menu from './components/Menu.vue'
import ChatWindow from './components/ChatWindow.vue'
</script>

<template>
  <Menu id="menu" />
  <ChatWindow id="ChatWindow" />
</template>

<style>
#menu {
  position: fixed;
}
#ChatWindow {
  margin-left: 262px;
  margin-bottom: auto; /* Push the chat window to the bottom */
  width: calc(100% - 250px);
  height: 100%;
  box-sizing: border-box;
  background-color: #212121;
  color: white;
}
@media (max-width: 768px) {
  #menu {
    display: none;
  }
  #ChatWindow {
    margin-left: 0;
    width: 100%;
  }
}
</style>
