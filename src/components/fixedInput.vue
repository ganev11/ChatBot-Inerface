<template>
  <!-- <div class="input-content"> -->
  <!-- <div class="input-bar-container"> -->
  <!-- <clip /> -->
  <div class="input-content">
    <div class="input-div">
      <div class="input-stack">
        <img class="clip" src="../assets/svg/paperclip.svg" alt="" />
        <textarea
          type="textarea"
          class="input-bar"
          placeholder="Message ChatGPT…"
          v-model="inputText"
          wrap="hard"
          :style="{ height: textAreaHeight }"
        />
        <div
          class="send-button"
          :class="{ 'send-button-disabled': inputText === '' }"
          @click="sendMessage"
        >
          <b> ↑ </b>
        </div>
      </div>
      <!--   <span class="input-width">
        <input
          type="text"
          class="input-bar"
          placeholder="Message ChatGPT…"
          v-model="inputText"
          @keyup.enter="sendMessage"
        />
      </span>

      <div
        class="send-button"
        :class="{ 'send-button-disabled': inputText === '' }"
        @click="sendMessage"
      >
        <b> ↑ </b>
      </div> -->
    </div>

    <div class="small-txt">
      Our AI can make mistakes. Consider checking important information.
    </div>
  </div>

  <!-- </div> -->
</template>

<script>
import clip from '../assets/svg/clip.vue'

export default {
  data() {
    return {
      inputText: '',
      textAreaHeight: 'auto' // Set a default height, can be a specific value like '50px'
    }
  },
  components: {
    clip
  },
  methods: {
    sendMessage() {
      if (this.inputText.trim() !== '') {
        // Implement your send message logic here
        console.log('Message sent:', this.inputText)
        this.inputText = '' // Clear the input field after sending the message
      }
    },
    adjustTextAreaHeight() {
      const baseHeight = 20 // The base height in pixels for one line of text
      const lineHeight = 20 // The line height in pixels
      const maxRows = 6 // Maximum number of rows

      // Calculate the number of rows
      const numberOfLines = this.inputText.split('\n').length

      // Calculate the new height based on the number of lines
      let newHeight = numberOfLines * lineHeight

      // Ensure the new height does not exceed the maximum for 6 rows
      newHeight = Math.min(newHeight, maxRows * lineHeight)

      // Set the textarea height
      this.textAreaHeight = `${newHeight}px`
    }
  },
  watch: {
    inputText() {
      this.adjustTextAreaHeight()
    }
  },
  mounted() {
    // Adjust the textarea height when the component is first mounted
    this.$nextTick(() => {
      this.adjustTextAreaHeight()
    })
  }
}
</script>

<style scoped>
.input-content {
  display: flex;
  flex-direction: column;
}

.input-content {
  max-width: calc(100% - 264px);
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
  background-color: #2c2c2e;
}
.input-stack {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
}
@media screen and (max-width: 768px) {
  /* .input-bar {
    max-width: 60% !important;
  } */
  .input-content {
    max-width: calc(100% - 2px);
  }
}
@media screen and (max-width: 540px) {
  /* .input-bar {
    max-width: 40% !important;
  } */
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
  margin: 3px;
}
.input-width {
  width: 50%;
}
.input-bar {
  width: 46vw;
  min-height: 24px;
  padding: 14px 48px 10px 55px;
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

.send-button {
  position: relative;
  right: 45px;
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
  bottom: 12px;
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
