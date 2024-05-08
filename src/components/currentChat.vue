<script setup>
import { ref, computed, defineProps, onMounted, onUnmounted, watch } from 'vue'
import { useConversationStore } from '../stores/conversationStore' // Adjust the path as necessary
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useUser } from '../composables/user.js'
const { fetchUser } = useUser()
import mittBus from '../services/mitt.js'

// Define props
const props = defineProps({
  textAreaHeight: String // Assuming textAreaHeight is a string like '100px'
})

// Ref to the chat container
const bottomLine = ref(null)
const didUserScrollManually = ref(false)
const user = ref(null)

const chatContainer = ref(null)
function scrollToBottomAfterFetchedConvo() {
  scrollToBottom()
}
function scrollToBottom() {
  const element = bottomLine.value
  const chatEl = chatContainer.value // Get the .chat element

  if (chatEl && element) {
    // Calculate the position to scroll to in the .chat container
    const elementTop = element.getBoundingClientRect().top
    const chatTop = chatEl.getBoundingClientRect().top
    const scrollPosition = elementTop - chatTop + chatEl.scrollTop

    chatEl.scrollTo({
      top: scrollPosition
    })
  }
}

const markedTextMargin = '28px'

// Initialize Pinia store
const conversationStore = useConversationStore()

// Computed property to get conversations
const conversation = computed(() => conversationStore.conversation)

// Computed property for currentPrompt
const currentPrompt = computed(() => conversationStore.currentPrompt)

// Computed property for ongoingResponse
const ongoingResponse = computed(() => conversationStore.ongoingResponse)

// Watch for changes on conversationIsRunning

watch(ongoingResponse, (newVal, oldVal) => {
  scrollToBottom()
})

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

// Function to handle user scroll interactions
const handleScroll = () => {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  // Check if the user has scrolled to the bottomLine element
  if (bottomLine.value) {
    const bottomLinePosition =
      bottomLine.value.getBoundingClientRect().top + window.scrollY
    if (windowHeight + scrollTop >= bottomLinePosition) {
      didUserScrollManually.value = false
    } else {
      didUserScrollManually.value = true
    }
  }
}
// Add and remove the scroll event listener
onMounted(async () => {
  window.addEventListener('scroll', handleScroll)

  try {
    user.value = await fetchUser()
    console.log('user.value currentChat :>> ', user.value)
  } catch (error) {
    console.error('Failed to load user details:', error)
  }
  mittBus.on('scrollDown', scrollToBottomAfterFetchedConvo)
  scrollToBottom()
})

onUnmounted(() => {
  if (bottomLine.value) {
    window.removeEventListener('scroll', handleScroll)
  }
  mittBus.off('scrollDown', scrollToBottomAfterFetchedConvo)
})
</script>

<template>
  <div
    class="chat"
    ref="chatContainer"
    :style="{ paddingBottom: textAreaHeight }"
  >
    <!-- did user scroll manually? -->
    <!-- <div class="ssss">
      {{ didUserScrollManually }}
    </div> -->
    <div
      v-for="convo in processedConversations"
      :key="convo.id"
      class="message"
      :class="convo.class"
    >
      <!-- <button @click="scrollToBottom">scrollToBottom</button> -->
      <Span v-if="convo.author === 'user'" class="message-owner">
        <img
          v-if="user && user.picture"
          class="icon-user"
          :src="user.picture"
          alt=""
        />
        <img v-else src="../assets/svg/user.svg" class="icon-user" alt="" />
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
        <img
          v-if="user && user.picture"
          class="icon-user"
          :src="user.picture"
          alt=""
        />
        <img v-else src="../assets/svg/user.svg" class="icon-user" alt="" />

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
    <div ref="bottomLine"></div>
  </div>
</template>

<style scoped>
.massage-margin {
  margin-left: 38px;
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
.ssss {
  position: fixed;
  background-color: red;
}
.background-chat {
  color: rgba(255, 255, 255, 0);
  background-color: #212121;
  display: flex;
  justify-content: center;
}

.message-owner {
  font-weight: 800;
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
  margin-top: 80px; /* Maintain your top margin */
  margin-bottom: 86px; /* Maintain your bottom margin */
  width: 100%; /* Maintain your width settings */
  padding: 12px 18%; /* Padding inside the chat box */
  box-sizing: border-box; /* Ensures padding doesn't add to width */
  color: white; /* Text color */
  background-color: #212121; /* Background color */
  overflow-y: auto; /* Allows scrolling when content exceeds container height */
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: transparent transparent; /* For Firefox, set default state to transparent */
}

@media (max-width: 768px) {
  .chat {
    padding: 12px 8%; /* Padding inside the chat box */
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
