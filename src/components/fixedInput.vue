<template>
  <div class="input-bar-container">
    <input
      type="text"
      class="input-bar"
      placeholder="Message ChatGPT…"
      v-model="inputText"
      @keyup.enter="sendMessage"
    />
    <button class="send-button" @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: ''
    }
  },
  methods: {
    sendMessage() {
      if (this.inputText.trim() !== '') {
        // Implement your send message logic here
        console.log('Message sent:', this.inputText)
        this.inputText = '' // Clear the input field after sending the message
      }
    }
  }
}
</script>

<style scoped>
.input-bar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #2c2c2e; /* Dark background color */
}

.input-bar {
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: #3a3a3c; /* Slightly lighter than container for contrast */
  color: white;
  font-size: 16px;
}

.input-bar::placeholder {
  color: #8e8e93; /* Placeholder text color */
}

.send-button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #0a84ff; /* Blue color for the send button */
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #007aff; /* Slightly darker blue on hover */
}
</style>
