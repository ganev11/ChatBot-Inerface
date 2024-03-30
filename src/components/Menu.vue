<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})
const emit = defineEmits(['menu-toggle'])
function toggleMenu() {
  hideMenu.value = !hideMenu.value
  emit('menu-toggle')
}
const hideMenu = ref(false)
const count = ref(0)
</script>

<template>
  <div class="menu">
    <div
      :class="{ 'background-menu': !hideMenu, 'background-menu-off': hideMenu }"
    >
      <div
        :class="{ 'menu-content-on': !hideMenu, 'menu-content-off': hideMenu }"
      >
        <!-- menu content -->
        <!-- new chat btn fixed -->
        <div class="menu-bn">
          <button type="button" @click="count++">New Chat</button>
        </div>
        <!-- history -->
        <!-- user Info fixed -->
      </div>
    </div>
    <!-- Toggle btn -->
    <span class="tgl">
      <button @click="toggleMenu">tgl</button>
    </span>
  </div>
</template>

<style scoped>
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
.menu-bn {
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
  display: block;
  transition: display 0.5s;
}
.menu-content-off {
  display: none;
  transition: display 0.5s;
}
</style>
