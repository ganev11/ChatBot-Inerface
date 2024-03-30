<script setup>
import { ref } from 'vue'
import fixedInput from './fixedInput.vue' // Adjusted to match the actual file name

defineProps({
  hideMenu: Boolean
})

function handleRowUpdate(newHeight) {
  textAreaHeight.value = newHeight
}

const textAreaHeight = ref(1)
</script>

<template>
  <div class="background-chat">
    <div
      :key="textAreaHeight"
      class="chat"
      :style="{ paddingBottom: textAreaHeight + 'px' }"
    >
      <button type="button" @click="count++">count is</button>
      <p>hi</p>
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
.background-chat {
  width: 100%;
  color: rgba(255, 255, 255, 0);
  background-color: #212121;
}
.chat {
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
