<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-window">
      <header class="modal-header">{{ modalSettings.title }}</header>
      <div class="modal-content">{{ modalSettings.content }}</div>
      <footer class="modal-footer">
        <button @click="leftBtnAction">{{ modalSettings.leftBtn.text }}</button>
        <button @click="rightBtnAction">
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

// Example on how to automatically open the modal for demonstration
onMounted(() => {
  modalStore.openModal()
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-window {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 10000;
  color: black;
}

.modal-header {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.modal-content {
  margin-bottom: 20px;
}

.modal-footer {
  text-align: right;
}

button {
  background-color: rgb(24, 119, 119);
  cursor: pointer;
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
}
</style>
