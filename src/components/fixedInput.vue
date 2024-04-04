<script setup>
import { ref, onMounted } from 'vue'
import { useSendPrompt } from '../composables/usePrompt.js' // Adjust the path as necessary

const { sendPrompt } = useSendPrompt()

const inputText = ref('')
const textAreaHeight = ref('auto')

const adjustTextAreaHeight = () => {
  const baseHeight = 20 // The base height in pixels for one line of text
  const lineHeight = 20 // The line height in pixels
  const maxRows = 6 // Maximum number of rows

  // Calculate the number of rows
  const numberOfLines = inputText.value.split('\n').length

  // Calculate the new height based on the number of lines
  let newHeight = numberOfLines * lineHeight

  // Ensure the new height does not exceed the maximum for 6 rows
  newHeight = Math.min(newHeight, maxRows * lineHeight)

  // Set the textarea height
  textAreaHeight.value = `${newHeight}px`
}

const sendMessage = () => {
  if (inputText.value.trim() !== '') {
    // Implement your send message logic here
    console.log('Message sent:', inputText.value)
    sendPrompt(inputText.value) // Send the input text as a prompt
    inputText.value = '' // Clear the input field after sending the message
  }
}

// Adjust textarea height when inputText changes
onMounted(() => {
  adjustTextAreaHeight()
})
</script>

<template>
  <div
    class="input-content"
    :class="{ 'max-width': !hideMenu, 'max-width-off': hideMenu }"
  >
    <div class="input-div">
      <div class="input-stack">
        <textarea
          type="textarea"
          class="input-bar"
          placeholder="Message ChatGPT…"
          v-model="inputText"
          wrap="hard"
          :style="{ height: textAreaHeight }"
        />
        <span class="parent-container">
          <div
            class="send-button"
            :class="{ 'send-button-disabled': inputText === '' }"
            @click="sendMessage"
          >
            <b> ↑ </b>
          </div>
        </span>
      </div>
    </div>

    <div class="small-txt">
      Our AI can make mistakes. Consider checking important information.
    </div>
  </div>
</template>

<style scoped>
.max-width {
  max-width: calc(100%) !important;
  transition: max-width 0.5s;
}
.max-width-off {
  max-width: 100%;
  transition: max-width 0.5s;
}
.input-content {
  transition: max-width 0.5s;
  width: 100%;
  flex-direction: column;
  position: fixed;
  display: flex;
  align-items: center;
  border: 1px solid #3b3b9300;
  justify-content: flex-start;
  min-height: 86px;
  height: auto;
  padding: 0;
  bottom: 0;
  background-color: #212121;
}
.input-stack {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
}
@media screen and (max-width: 768px) {
  .input-content {
    max-width: calc(100% - 2px);
  }
}
@media screen and (max-width: 670px) {
  .small-txt {
    height: 37px !important;
    margin: 10px !important;
  }
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.small-txt {
  bottom: 10px;
  left: 10px;
  font-size: 0.75rem;
  color: #8e8e93;
  height: 15px;
  margin: 11px auto;
}
.input-width {
  width: 50%;
}
.input-bar {
  width: 46vw;
  min-height: 24px;
  padding: 14px 48px 10px 20px;
  border: 1px solid #5f5f61;
  border-radius: 15px;
  background-color: #212121;
  font-size: 16px;
  color: white;
  resize: none; /* Prevent manual resizing */
}

.input-bar::placeholder {
  color: #8e8e93;
}
.input-bar:focus {
  border: 1px solid #727274;
  outline: none;
}
.parent-container {
  position: relative;
}
.send-button {
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  color: #212121;
  font-size: 20px;
  cursor: pointer;
  bottom: 10px;
}
.send-button-disabled {
  background-color: #3f3f3f;
  color: #212121;
  cursor: default;
}
.clip {
  cursor: pointer;
  position: relative;
  left: 40px;
  bottom: 15px;
  rotate: 180deg;
  width: 25px;
  height: 25px;
}
</style>

<style scoped>
/* Styles for the scrollbar track */
.input-bar::-webkit-scrollbar {
  width: 6px; /* Adjust scrollbar width */
  background-color: #f9f9f900; /* Track color */
}

/* Styles for the scrollbar thumb */
.input-bar::-webkit-scrollbar-thumb {
  background-color: #555; /* Thumb color */
  border-radius: 5px; /* Optional: Round corners of the thumb */
  border: 1px solid #f9f9f900; /* Optional: Add border around the thumb */
}

/* Optionally, style the scrollbar button (arrows at the ends of the scrollbar) */
.input-bar::-webkit-scrollbar-button {
  display: none; /* Often not styled, but can be used to hide or style the buttons */
}

/* Optionally, style the scrollbar corner (where horizontal and vertical scrollbars meet) */
.input-bar::-webkit-scrollbar-corner {
  background-color: black; /* Corner color */
}
</style>
