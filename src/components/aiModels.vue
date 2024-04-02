<template>
  <div>
    <div v-if="modelList" class="models-btn" @click="toggleDropdown">
      <span v-if="activeModel">
        {{ activeModel.id }}
      </span>
    </div>
    <div v-if="isDropdownOpen" class="dropdown-menu">
      <div class="responsivity-wrapper">
        <!-- Loop through modelList and display each model's ID -->
        <div
          class="model-item dropdown-item"
          v-for="model in modelList"
          :key="model.id"
          @click="setActiveModel(model.id)"
        >
          {{ model.id }}
          <img
            v-if="model.active"
            class="active-icon"
            src="../assets/svg/active.svg"
            alt=""
          />
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
const activeModel = computed(() =>
  modelsStore.getModels.find(model => model.active)
)

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
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdown() {
  isDropdownOpen.value = false
}
</script>

<style scoped>
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
.models-btn {
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

@media (max-width: 768px) {
  .dropdown-menu {
    left: 50%; /* Start by positioning at the middle horizontally */
    transform: translate(
      23vw,
      0
    ); /* Adjust horizontally to truly center, doesn't affect vertical alignment directly */
  }
}
.dropdown-menu {
  position: absolute;
  z-index: 1000; /* Adjust z-index as necessary */
  width: auto;
  min-width: 180px;
  background-color: #333;
  color: #fff;
  border: 1px solid rgb(82, 82, 82);
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 8px;
  top: calc(100% + 5px); /* Position below the button */
  left: 15px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  color: rgb(0, 0, 0);
  font-weight: bold;
  border: none;
  width: 100%;
  max-width: 157px;
  border-radius: 4px;
  text-align: left;
  padding: 8px 12px;
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
</style>
