<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-window">
      <header class="modal-header">{{ modalSettings.title }}</header>
      <div class="line"></div>
      <div class="modal-content">{{ modalSettings.content }}</div>
      <footer class="modal-footer">
        <button class="close" @click="leftBtnAction">
          {{ modalSettings.leftBtn.text }}
        </button>
        <button class="confirm" @click="rightBtnAction">
          {{ modalSettings.rightBtn.text }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useBaseModalStore } from './../stores/baseModalStore' // Adjust path as needed

const modalStore = useBaseModalStore()

const isModalOpen = computed(() => modalStore.isModalOpen)
const modalSettings = computed(() => modalStore.getModalSettings)

const closeModal = () => {
  modalStore.closeModal()
}

const leftBtnAction = () => {
  modalStore.leftBtnAction()
}

const rightBtnAction = () => {
  modalStore.rightBtnAction()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.109);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #4d4d4d;
  margin: 20px 0;
}
.modal-window {
  background-color: #343434;
  padding: 20px 0;
  border-radius: 15px;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 10000;
  color: black;
}

.modal-header {
  color: white;
  font-weight: bold;
  font-size: 1.1em;
  margin-bottom: 20px;
  padding: 0 20px;
}

.modal-content {
  margin-bottom: 20px;
  font-weight: 500;
  padding: 0 20px;
  color: white;
}

.modal-footer {
  text-align: right;
  padding: 0 20px;
}

button.close {
  background-color: #343434;
  cursor: pointer;
  border: 1px solid rgb(97, 97, 97);
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 9px;
}
button.confirm {
  background-color: rgb(165, 20, 20);
  cursor: pointer;
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  border-radius: 9px;
}

button.close:hover {
  background-color: #4d4d4d;
}
button.close:focus,
button.close:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

button.confirm:hover {
  background-color: rgb(143, 18, 18);
}
button.confirm:focus,
button.confirm:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
