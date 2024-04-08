<script setup>
import { ref, computed, defineProps } from 'vue'
import { useConversationStore } from '../stores/conversationStore' // Adjust the path as necessary
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Define props
const props = defineProps({
  textAreaHeight: String // Assuming textAreaHeight is a string like '100px'
})

const markedTextMargin = '28px'

// Initialize Pinia store
const conversationStore = useConversationStore()

// Computed property to get conversations
const conversation = computed(() => conversationStore.conversation)

// Computed property for currentPrompt
const currentPrompt = computed(() => conversationStore.currentPrompt)

// Computed property for ongoingResponse
const ongoingResponse = computed(() => conversationStore.ongoingResponse)

// Computed property to process markdown in conversations and differentiate by role
const processedConversations = computed(() => {
  // Convert the conversations object into an array of its values
  const conversationArray = Object.values(conversation.value)

  // Process each conversation in the array
  return conversationArray.map(convo => ({
    id: convo.id,
    content: DOMPurify.sanitize(marked(convo.message.content.parts.join(' '))),
    author: convo.message.author.role,
    class:
      convo.message.author.role === 'user' ? 'user-message' : 'server-message'
  }))
})
</script>

<template>
  <div class="chat" :style="{ paddingBottom: textAreaHeight }">
    <!-- Existing messages -->
    <div
      v-for="convo in processedConversations"
      :key="convo.id"
      class="message"
      :class="convo.class"
    >
      <Span v-if="convo.author === 'user'" class="message-owner">
        <img src="../assets/svg/user.svg" class="icon-user" alt="" />
        You</Span
      >
      <Span v-if="convo.author === 'assistant'" class="message-owner">
        <img src="../assets/imgs/sst.jpg" class="icon-chat" alt="" />
        Server</Span
      >
      <!-- :style="`margin-left: ${markedTextMargin}`" -->
      <div v-html="convo.content" class="massage-margin"></div>
    </div>
    <!-- Display currentPrompt if it exists -->
    <div v-if="currentPrompt" class="message user-message">
      <Span class="message-owner">
        <img src="../assets/svg/user.svg" class="icon-user" alt="" />

        You</Span
      >
      <!-- :style="`margin-left: ${markedTextMargin}`" -->
      <div
        class="massage-margin"
        v-html="DOMPurify.sanitize(marked(currentPrompt))"
      ></div>
    </div>

    <!-- Display ongoingResponse if it exists -->
    <div v-if="ongoingResponse" class="message server-message">
      <Span class="message-owner">
        <img src="../assets/imgs/sst.jpg" class="icon-chat" alt="" />
        Server</Span
      >
      <!-- :style="`margin-left: ${markedTextMargin}`" -->
      <div
        class="massage-margin"
        v-html="DOMPurify.sanitize(marked(ongoingResponse))"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.massage-margin {
  margin-left: 35px;
  position: relative;
  top: -12px;
}

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
  color: rgba(255, 255, 255, 0);
  background-color: #212121;
  display: flex;
  justify-content: center;
}

.message-owner {
  display: flex;
  align-items: center;
  gap: 15px;
}
.icon-chat {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.icon-user {
  width: 23px;
  height: 23px;
  border-radius: 50%;
}
.chat {
  margin-top: 80px !important;
  height: calc(100% - 86px);
  min-height: calc(100vh - 230px) !important;
  margin-bottom: 86px;
  /* margin-right: 50px; */
  width: 65% !important;
  max-width: 692px !important;
  overflow-y: auto;
  padding: 12px;
  box-sizing: border-box;
  /* Firefox scrollbar styling */
  color: white;
  background-color: #212121;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: transparent transparent; /* For Firefox, set default state to transparent */
}
@media (max-width: 768px) {
  .chat {
    width: 85% !important;
  }
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
.user-message {
  background-color: rgba(96, 96, 96, 0);
  padding-bottom: 35px;
}
.server-message {
  background-color: rgba(50, 50, 50, 0);
  padding-bottom: 35px;
}
</style>
