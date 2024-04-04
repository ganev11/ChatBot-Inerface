<template>
  <div class="conversations-list">
    <div class="time-text">{{ periodName }}</div>
    <BaseModal />

    <div
      class="convo"
      v-for="conversation in conversations"
      :key="conversation.id"
      @click="handleClick(conversation)"
    >
      {{ conversation.title }}
      <!-- {{ formatUpdateTime(conversation.update_time) }} -->
      <div class="gradient"></div>
      <div class="gradient-end"></div>
      <div class="gradient-hover"></div>
      <div class="gradient-end-hover">
        <div
          class="convo-icon"
          @click="toggleDropdown(conversation.id, $event)"
        >
          <img class="dots-position" src="./../assets/dots.svg" alt="" />
        </div>
      </div>
      <Teleport to=".conversations">
        <div
          class="dropdown-menu"
          :style="dropdownStyle"
          v-if="openMenuId === conversation.id"
        >
          <button
            class="delete-btn dropdown-item"
            @click="deleteConversation(conversation)"
          >
            <img class="delete-icon" src="../assets/svg/delete.svg" />
            Delete chat
          </button>
        </div>
        <div
          v-if="openMenuId === conversation.id"
          class="overlay"
          @click="closeDropdown()"
        ></div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { useBaseModalStore } from './../stores/baseModalStore'
import { useConversationDeletion } from './../composables/useConversationDeletion'
import { useConversationStore } from '../stores/conversationStore'
import { useModelsStore } from '../stores/modelsStore'

const modelsStore = useModelsStore()
const conversationStore = useConversationStore()
const modalStore = useBaseModalStore()
const { deleteConversationCOMP, isDeleting, error } = useConversationDeletion()

const openMenuId = ref(null)

const props = defineProps({
  periodName: String,
  conversations: Array
})

const deleteConversation = conversation => {
  modalStore.setModalSettings({
    title: 'Delete chat?',
    content: `This will delete ${conversation.title} `,
    leftBtnText: 'Close',
    leftBtnAction: () => modalStore.closeModal(),
    rightBtnText: 'Delete',
    rightBtnAction: () => {
      deleteConversationCOMP(conversation.id)
        .then(() => {
          // Handle successful deletion, e.g., refresh the list of conversations
        })
        .catch(err => {
          // Handle error case
          console.error('Deletion error:', err)
        })
        .finally(() => {
          modalStore.closeModal()
        })
    }
  })

  modalStore.openModal()
  closeDropdown()
}
function handleClick(conversation) {
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
      console.log('Fetched specific conversation with ID:', conversation.id)
    })
    .catch(error => {
      console.error('Error fetching specific conversation:', error)
    })
}

const closeDropdown = () => {
  openMenuId.value = null
}

const dropdownStyle = ref({}) // For dynamic positioning

// Adjusted toggleDropdown to accept event
const toggleDropdown = (id, event) => {
  console.log('event :>> ', event)
  const clickX = event.clientX
  const clickY = event.clientY
  if (openMenuId.value === id) {
    openMenuId.value = null
  } else {
    openMenuId.value = id
    // Calculate position
    const bounds = event.target.getBoundingClientRect()
    dropdownStyle.value = {
      position: 'absolute',
      top: `${20 + clickY}px`,
      left: `${-10 + clickX}px`
    }
  }
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
  text-wrap: nowrap;
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
  width: 77px;
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
  z-index: 10; /* Adjust based on your layout */
}

.dropdown-menu {
  position: absolute;
  z-index: 8000; /* Higher than overlay */
  /* Additional styling */
}
</style>
