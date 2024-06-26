<template>
  <div class="conversations-list">
    <div class="time-text">{{ periodName }}</div>
    <BaseModal />

    <div
      class="convo"
      v-for="conversation in conversations"
      :key="conversation.id"
      @click="handleClick(conversation, $event)"
    >
      {{ conversation.title }}
      <!-- {{ formatUpdateTime(conversation.update_time) }} -->
      <div class="gradient"></div>
      <div class="gradient-end"></div>
      <div class="gradient-hover"></div>
      <div class="gradient-end-hover">
        <div class="convo-icon" @click="openDropDown(conversation.id, $event)">
          <img class="dots-position" src="./../assets/dots.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
  <!-- DropdownMenu component -->
  <DropdownMenu
    v-if="isDropdownOpen"
    :id="selectedConversationId"
    :clickX="dropdownPosition.x"
    :clickY="dropdownPosition.y"
    @close="closeDropdown"
  >
    <!-- Pass dropdown content as slot, or define it here directly -->
    <button
      class="delete-btn dropdown-item"
      @click="handleDeleteConversation(selectedConversationId)"
    >
      <img class="delete-icon" src="../assets/svg/delete.svg" />
      Delete chat
    </button>
  </DropdownMenu>
</template>

<script setup>
import { defineProps, watch, ref } from 'vue'
import BaseModal from './BaseModal.vue'
import DropdownMenu from './DropdownMenu.vue'
import mittBus from '../services/mitt.js'

import { useBaseModalStore } from './../stores/baseModalStore'
import { useDeleteConversation } from './../composables/useDeleteConversation'
import { useFetchedConversationsStore } from '../stores/fetchedConversationsStore'

import { useConversationStore } from '../stores/conversationStore'
import { useModelsStore } from '../stores/modelsStore'
import { useMobileMenuStore } from '../stores/mobileMenuStore'

const modelsStore = useModelsStore()
const mobileMenu = useMobileMenuStore()
const conversationStore = useConversationStore()
const modalStore = useBaseModalStore()
const { deleteConversation } = useDeleteConversation()

// const openMenuId = ref(null)

const props = defineProps({
  periodName: String,
  conversations: Array
})
const isDropdownOpen = ref(false)
const dropdownPosition = ref({ x: 0, y: 0 })
const selectedConversationId = ref(null)
const openDropDown = (id, event) => {
  event.stopPropagation() // Prevent the click from bubbling up to parent elements
  isDropdownOpen.value = true // Open the dropdown
  selectedConversationId.value = id // Store the ID of the conversation for which the dropdown is opened

  // Get the bounding rectangle of the target element
  const targetRect = event.currentTarget.getBoundingClientRect()

  // Set the dropdown position to the bottom left corner of the target element
  dropdownPosition.value = {
    x: targetRect.left + window.scrollX + 20, // x position is the left of the element
    y: targetRect.bottom + window.scrollY + 5 // y position is the bottom of the element
  }
}

watch(
  () => mobileMenu.isMobileScreen,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      isDropdownOpen.value = false
    }
  }
)
const handleDeleteConversation = conversationId => {
  const foundConvo = props.conversations.find(
    convo => convo.id === conversationId
  )
  modalStore.setModalSettings({
    title: 'Delete chat?',
    content: `This will delete "${foundConvo.title}".`,
    leftBtnText: 'Close',
    leftBtnAction: () => modalStore.closeModal(),
    rightBtnText: 'Delete',
    rightBtnAction: () => {
      deleteConversation(conversationId) // Call the deleteConversation method from the composable
        .then(() => {
          // Handle successful deletion, e.g., refresh the list of conversations or remove the conversation from local state
          // load the fetched conversations again to update the list
          const fetchedConversationsStore = useFetchedConversationsStore()
          fetchedConversationsStore.fetchConversations(true)
          console.log('Conversation deleted successfully')
        })
        .catch(err => {
          // Handle error case
          console.error('Deletion error:', err)
        })
        .finally(() => {
          modalStore.closeModal() // Ensure the modal is closed after the operation
        })
    }
  })

  modalStore.openModal() // Open the modal for user confirmation
  closeDropdown() // Close any open dropdown, if necessary
}
function closeDropdown() {
  isDropdownOpen.value = false
}
function handleClick(conversation, event) {
  mittBus.emit('scrollDown')

  event.stopPropagation() // Prevent the click event from bubbling up
  // Access ongoingResponse from conversationStore
  const { ongoingResponse } = conversationStore

  // Check if ongoingResponse is not an empty string
  if (ongoingResponse !== '') {
    // If ongoingResponse is not empty, exit the function early
    console.log('Ongoing response in progress. Cannot load a new conversation.')
    return
  }

  // If ongoingResponse is empty, proceed with setting the active model
  modelsStore.setActiveModel(conversation.model_id)

  // Now, call the action to fetch the specific conversation
  conversationStore
    .loadSpecificConversation(conversation.id)
    .then(() => {
      // Here you can handle any post-fetch logic, like updating the UI
      mittBus.emit('scrollDown')
    })
    .catch(error => {
      console.error('Error fetching specific conversation:', error)
    })
}
</script>

<style scoped>
.conversations-list {
  color: white;
  /* border: 1px solid #3b3b93; */
  padding-bottom: 2px;
  overflow-x: hidden;
  overflow-y: hidden;
}
.time-text {
  color: #878787;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 8px;
}
.convo {
  position: relative;
  padding: 8px 14px 8px 8px;
  display: flex;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.convo:hover {
  background-color: #2e2e2e;
}

.dots-position {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  max-width: 20px;
  z-index: 8010;
}
.dots-position:hover {
  opacity: 0.5;
}
.gradient {
  position: absolute;
  left: 150px;
  background-image: linear-gradient(to right, #17171700, #171717cd);
  height: 37px;
  width: 50px;
  z-index: 7000;
  bottom: 0px;
}
.gradient-end {
  position: absolute;
  bottom: 0px;
  height: 37px;
  left: 200px;
  width: 40px;
  z-index: 7000;
  background-image: linear-gradient(to right, #171717cd, #171717);
}

/* Gradient hover effect */
/* Initially show the gradient elements */
.convo .gradient,
.convo .gradient-end {
  display: block;
}

/* When hovering over .convo, hide the gradient elements */
.convo:hover .gradient,
.convo:hover .gradient-end {
  display: none;
}
/* Initially hide the gradient-hover elements */
.convo .gradient-hover,
.convo .gradient-end-hover {
  display: none;
}

/* When hovering over .convo, display the gradient-hover elements */
.convo:hover .gradient-hover,
.convo:hover .gradient-end-hover {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.gradient-hover {
  position: absolute;
  left: 100px;
  background-image: linear-gradient(to right, #2e2e2e3b, #2e2e2e);
  height: 37px;
  width: 50px;
  z-index: 7000;
  bottom: 0px;
}

.gradient-end-hover {
  position: absolute;
  bottom: 0px;
  height: 37px;
  left: 150px;
  width: 89px;
  z-index: 7000;
  border-radius: 4px;
  /* border: 1px solid #3b3b93; */
  background-image: linear-gradient(to right, #2e2e2e, #2e2e2e);
  flex-direction: row;
}

.dropdown-menu {
  position: absolute;
  padding: 8px;
  z-index: 8000; /* Ensure it's above other items */
  right: 0;
  min-width: 180px;
  top: 100%; /* Position it directly below the dots */
  background-color: #333; /* Dark grey background */
  border: 1px solid rgb(103, 103, 103); /* Light grey border */
  border-radius: 4px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Optional: Adds a slight shadow for depth */
}

.dropdown-menu button {
  background-color: transparent;
  color: rgb(0, 0, 0); /* Text color that contrasts with the dark background */
  border: none; /* Remove button border */
  width: 100%; /* Make the button fill the container */
  min-width: 150px;
  text-align: left; /* Align text to the left */
  padding: 8px 12px; /* Padding for spacing */
  cursor: pointer; /* Change cursor to indicate clickable */
}
.delete-btn {
  color: rgb(238, 69, 69) !important;
}
.delete-icon {
  width: 18px;
  height: 18px;
  margin-right: 7px;
}
.dropdown-menu button:hover {
  /* border-color: #646cff; */
  background-color: #474747; /* Slightly lighter grey on hover */
  border-radius: 5px !important;
  /* outline: 4px auto -webkit-focus-ring-color; */
}
.dropdown-item {
  display: flex;
  align-items: center;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0); /* Semi-transparent for demonstration */
  z-index: 7500; /* Adjust based on your layout */
}

.dropdown-menu {
  position: absolute;
  z-index: 8000; /* Higher than overlay */
  /* Additional styling */
}
</style>
