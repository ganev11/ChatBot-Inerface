<template>
  <div>
    <div v-if="modelList" class="models-btn" @click="toggleDropdown">
      <span v-if="activeModel">
        {{ activeModel.id }}
      </span>
    </div>
    <div class="center-drop-down">
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <div class="responsivity-wrapper">
          <!-- Loop through modelList and display each model's ID -->
          <div
            class="dropdown-item"
            v-for="model in modelList"
            :key="model.id"
            @click="setActiveModel(model.id)"
          >
            <span class="flex-space-between">
              {{ model.id }}

              <img
                v-if="model.active"
                class="active-icon"
                src="../assets/svg/active.svg"
                alt=""
              />
              <img
                v-else
                class="inactive-icon"
                src="../assets/svg/inactive.svg"
                alt=""
              />
              <div class="new-chat">
                New chat
                <img class="edit-icon" src="../assets/svg/edit.svg" alt="" />
              </div>
            </span>

            <div class="model-description">
              Great for everyday tasks. lorem ipsum
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isDropdownOpen" class="overlay" @click="closeDropdown"></div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useModels } from '../composables/models.js'
import { useModelsStore } from '../stores/modelsStore'

const modelsStore = useModelsStore()
const { fetchModels } = useModels()
const isDropdownOpen = ref(false)
const modelList = computed(() => modelsStore.getModels)
import { useConversationStore } from '../stores/conversationStore'

const activeModel = computed(() =>
  modelsStore.getModels.find(model => model.active)
)
const conversationStore = useConversationStore() // Use the store

function setActiveModel(modelId) {
  modelsStore.setActiveModel(modelId)
  closeDropdown()
  openNewChat()
}

onMounted(async () => {
  try {
    const fetchedModels = await fetchModels()
    modelsStore.initialSetModels(fetchedModels.data) // Assume fetchModels() returns data in an appropriate format
  } catch (error) {
    console.error('Failed to fetch models:', error)
  }
})

function openNewChat() {
  // Your logic to open a new chat
  conversationStore.startNewConversation()
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdown() {
  isDropdownOpen.value = false
}
</script>

<style scoped>
.flex-space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.models-btn {
  position: relative;
  background-color: #48484800;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000000;
  display: inline-block;
  margin: 0.5rem;
  transition: background-color 0.3s;
}
.models-btn:hover {
  background-color: #373737;
}
</style>

<style scoped>
.model-description {
  font-size: 0.9rem;
  font-weight: 400;
  color: #999999;
}
.models-btn {
  background-color: #48484800;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  display: inline-block;
  margin: 0.5rem;
  transition: background-color 0.3s;
  left: -10px !important;
}
.inactive-icon {
  width: 15px;
  height: 15px;
  margin-right: 3px;
  opacity: 0.5;
}
.models-btn:hover {
  background-color: #373737;
}
.center-drop-down {
  display: flex;
  justify-content: center !important;
  align-items: center;
  position: relative;
  left: -4%;
  top: 5px;
}
@media (max-width: 768px) {
  .dropdown-menu {
    position: relative;
  }
  .center-drop-down {
    display: flex;
    justify-content: center !important;
    align-items: center;
    position: relative;
    left: -96%;
  }
}
.dropdown-menu {
  position: absolute;
  z-index: 1000; /* Adjust z-index as necessary */
  min-width: 338px;
  background-color: #333;
  color: #fff;
  border: 1px solid rgb(82, 82, 82);
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 8px;
  top: calc(100% + 5px); /* Position below the button */
  left: 5px;
}

.dropdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 14px;
  border: none;
  width: 100%;
  max-width: 306px;
  border-radius: 4px;
  text-align: left;
  padding: 16px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #474747;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0); /* Transparent, change as needed */
  z-index: 800; /* Below dropdown menu but above other content */
}
.active-icon {
  width: 20px;
  height: 18px;
}
.edit-icon {
  width: 20px;
  height: 18px;
}
/* Hide icons when a specific dropdown-item is hovered */
.dropdown-item:hover .active-icon,
.dropdown-item:hover .inactive-icon {
  display: none;
}
.dropdown-item {
  align-items: flex-start;
}
/* Initially hide the .new-chat div */
.new-chat {
  display: none;
}

/* Show the .new-chat div when its parent dropdown-item is hovered */
.dropdown-item:hover .new-chat {
  position: relative;
  display: flex;
  top: -5px;
  left: 5px;
  align-items: center;
  gap: 5px;
}
</style>
