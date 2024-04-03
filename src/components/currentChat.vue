<script setup>
import { ref, computed } from 'vue'
import { useConversationStore } from '../stores/conversationStore' // Adjust the path as necessary
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Initialize Pinia store
const conversationStore = useConversationStore()

// Computed property to get conversations
const conversations = computed(() => conversationStore.conversations)

// Computed property to process markdown in conversations
const processedConversations = computed(() =>
  conversations.value.map(convo => ({
    ...convo,
    content: DOMPurify.sanitize(marked(convo.content))
  }))
)
</script>

<template>
  <div
    :key="textAreaHeight"
    class="chat"
    :style="{ paddingBottom: textAreaHeight + 'px' }"
  >
    <div
      v-for="convo in processedConversations"
      :key="convo.id"
      class="message"
      :class="convo.type"
    >
      <div v-html="convo.content"></div>
    </div>
  </div>
</template>

<style scoped>
.max-width {
  max-width: calc(100% - 264px);
  transition: max-width 0.5s;
}
.max-width-off {
  max-width: 100%;
  transition: max-width 0.5s;
}
.nav-bar {
  position: fixed;
  width: 100%;
  min-height: 40px;
  background-color: #212121;
  color: white;
  padding: 8px;
  /* border: 1px solid #4343e1d9; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  z-index: 5000;
}
.background-chat {
  width: 100% !important;
  color: rgba(255, 255, 255, 0);
  background-color: #212121;
  display: flex;
  justify-content: center;
}
.chat {
  margin-top: 60px;
  height: calc(100% - 86px);
  min-height: calc(100vh - 230px) !important;
  margin-bottom: 86px;
  margin-right: 50px;
  width: 75% !important;
  max-width: 1000px !important;
  overflow-y: auto;
  padding: 12px;
  box-sizing: border-box;
  /* Firefox scrollbar styling */
  color: white;
  background-color: #212121;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: transparent transparent; /* For Firefox, set default state to transparent */
}

/* Default state for Webkit browsers, set scrollbar to transparent */
.chat::-webkit-scrollbar {
  width: 10px;
  background-color: transparent; /* Make scrollbar track transparent */
}

.chat::-webkit-scrollbar-thumb {
  background-color: transparent; /* Make scrollbar thumb transparent */
  border-radius: 5px;
  border: 2px solid transparent;
}

.chat:hover {
  scrollbar-color: #555 transparent; /* For Firefox, visible state */
}

/* On hover, change Webkit scrollbar colors to be visible */
.chat:hover::-webkit-scrollbar {
  background-color: #f9f9f900; /* Optional: Change track color on hover */
}

.chat:hover::-webkit-scrollbar-thumb {
  background-color: #555; /* Change thumb color on hover */
  border: 2px solid #f9f9f900; /* Optional: Adjust border color on hover */
}

/* Optionally, adjust the ::-webkit-scrollbar-button and ::-webkit-scrollbar-corner styles as needed */
.chat::-webkit-scrollbar-button {
  display: none;
}

.chat::-webkit-scrollbar-corner {
  background-color: black; /* Adjust if needed */
}
</style>
<style scoped>
.prompt {
  text-align: left;
  color: blue;
}

.answer {
  text-align: right;
  color: green;
}

.message {
  margin: 10px;
  padding: 5px;
}
</style>
