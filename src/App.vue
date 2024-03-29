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
  width: calc(100% - 250px);
  height: 100vh;
  padding: 12px;
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
