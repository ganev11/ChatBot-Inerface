<script setup>
import { ref } from 'vue'
import fixedInput from './fixedInput.vue' // Adjusted to match the actual file name

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div class="background-chat">
    <div class="chat">
      <button type="button" @click="count++">count is {{ count }}</button>
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
      <fixedInput />
    </div>
  </div>
</template>

<style scoped>
.chat {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  padding: 12px;
  box-sizing: border-box;
}

.background-chat {
  color: rgba(255, 255, 255, 0);
  background-color: #212121;
}
.chat {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  padding: 12px;
  box-sizing: border-box;
  /* Firefox scrollbar styling */
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

.background-chat {
  color: white;
  background-color: #212121;
}
</style>
