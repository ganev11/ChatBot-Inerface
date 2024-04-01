<script setup>
import { ref, onMounted } from 'vue'
import { useHistory } from '../composables/history.js'
import ConversationsList from './ConversationsList.vue'

// Call the composable to get access to its methods
const { fetchOldConversations } = useHistory()

// A ref to store the fetched conversations
const conversations = ref([])

// An async function to load conversations for a given ID
async function loadConversations(conversationId) {
  try {
    const data = await fetchOldConversations(conversationId)
    // console.log('conversations data :>> ', data.items)
    return data.items
  } catch (error) {
    console.error('Failed to load conversations:', error)
  }
}
onMounted(async () => {
  conversations.value = await loadConversations('your-conversation-id')
})
defineProps({
  msg: String
})
const emit = defineEmits(['menu-toggle'])
function toggleMenu() {
  hideMenu.value = !hideMenu.value
  emit('menu-toggle')
}
const hideMenu = ref(false)
const count = ref(0)
</script>

<template>
  <div class="menu">
    <div
      :class="{ 'background-menu': !hideMenu, 'background-menu-off': hideMenu }"
    >
      <div
        :class="{ 'menu-content-on': !hideMenu, 'menu-content-off': hideMenu }"
      >
        <!-- menu content -->

        <!-- new chat btn fixed -->
        <div class="new-convo">
          New Chat
          <img
            class="edit-icon"
            src="../assets/svg/edit.svg"
            @click="count++"
            alt=""
          />
        </div>
        <!-- history -->
        <div class="conversations">
          <ConversationsList :conversations="conversations" />
        </div>

        <!-- user Info fixed -->
      </div>
    </div>
    <!-- Toggle btn -->
    <span class="tgl" @click="toggleMenu"> </span>
  </div>
</template>

<style scoped>
.edit-icon {
  width: 20px;
  height: 20px;
}
.new-convo {
  width: 100%;
  max-width: 216px;
  position: relative;
  padding: 8px 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.new-convo:hover {
  background-color: #2e2e2e;
}
.menu {
  display: flex;
  height: 100vh;
  position: fixed;
}
.menu-off {
  width: 1px;
}
.background-menu {
  color: white;
  background-color: #171717;
  height: calc(100vh - 24px);
  width: 238px;
  padding: 12px;
  transition: width 0.5s;
  /* border: 4px solid #333; */
}
.background-menu-off {
  width: 1px;
  padding: 0;
  background-color: #171717;
  transition: width 0.5s;
}

.tgl {
  position: relative;
  cursor: pointer;
  top: 50%;
  left: 10px;
  width: 4px;
  height: 20px;
  border-radius: 3px;
  background-color: #ffffff9c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tgl:hover {
  background-color: #ffffff;
}
.menu-content-on {
  display: block;
  transition: display 0.5s;
}
.menu-content-off {
  display: none;
  transition: display 0.5s;
}
.conversations {
  overflow-y: auto;
  max-height: calc(100vh - 150px);
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: transparent transparent; /* For Firefox, set default state to transparent */
}

/* Default state for Webkit browsers, set scrollbar to transparent */
.conversations::-webkit-scrollbar {
  width: 10px;
  background-color: transparent; /* Make scrollbar track transparent */
}

.conversations::-webkit-scrollbar-thumb {
  background-color: transparent; /* Make scrollbar thumb transparent */
  border-radius: 5px;
  border: 2px solid transparent;
}

.conversations:hover {
  scrollbar-color: #555 transparent; /* For Firefox, visible state */
}

/* On hover, change Webkit scrollbar colors to be visible */
.conversations:hover::-webkit-scrollbar {
  background-color: #f9f9f900; /* Optional: Change track color on hover */
}

.conversations:hover::-webkit-scrollbar-thumb {
  background-color: #555; /* Change thumb color on hover */
  border: 2px solid #f9f9f900; /* Optional: Adjust border color on hover */
}

/* Optionally, adjust the ::-webkit-scrollbar-button and ::-webkit-scrollbar-corner styles as needed */
.conversations::-webkit-scrollbar-button {
  display: none;
}

.conversations::-webkit-scrollbar-corner {
  background-color: black; /* Adjust if needed */
}
</style>
