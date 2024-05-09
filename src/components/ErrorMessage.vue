<template>
  <transition-group name="slide-fade" tag="div" class="error-container">
    <div v-for="(msg, index) in messages" :key="msg.timeoutId" class="error">
      <img class="icon" src="../assets/svg/info.svg" alt="" />
      <span>{{ msg.text }}</span>
    </div>
  </transition-group>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mittBus from '../services/mitt.js'

const messages = ref([])

function addMessage(msg) {
  // Delay message appearance based on the number of messages already showing
  const additionalDelay = messages.value.length * 500 // 500ms delay per message

  setTimeout(() => {
    const timeoutId = setTimeout(() => {
      const index = messages.value.findIndex(m => m.timeoutId === timeoutId)
      if (index !== -1) messages.value.splice(index, 1)
    }, 5000)

    messages.value.unshift({ text: msg, timeoutId })
  }, additionalDelay)
}

onMounted(() => {
  mittBus.on('showError', addMessage)
})
</script>

<style scoped>
.error-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: auto;
}

.error {
  display: flex;
  align-items: center;
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
  background: #ee4444;
  min-width: 300px;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
