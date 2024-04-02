<template>
  <div>
    <div v-if="modelList" class="models-btn" @click="toggleDropdown">
      {{ modelList[0].id }}
    </div>
    <div v-if="isDropdownOpen" class="dropdown-menu">
      <div class="responsivity-wrapper">
        <!-- Example menu item -->
        <button class="delete-btn dropdown-item" @click="handleMenuAction">
          <img
            class="delete-icon"
            src="../assets/svg/delete.svg"
            alt="Delete"
          />
          Delete chat
        </button>
      </div>
    </div>
    <div v-if="isDropdownOpen" class="overlay" @click="closeDropdown"></div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useModels } from '../composables/models.js'

const models = ref(null)
const { fetchModels } = useModels()
const isDropdownOpen = ref(false)

const modelList = computed(() => {
  if (models && models.value && models.value.data) {
    return models.value.data
  }
})

onMounted(async () => {
  try {
    // Fetch models and store them in the ref.
    models.value = await fetchModels()
    // Console log the fetched models.
    console.log(models.value.data)
  } catch (error) {
    // Handle any errors that occur during fetching.
    console.error('Failed to fetch models:', error)
  }
})

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdown() {
  isDropdownOpen.value = false
}

function handleMenuAction() {
  // Implement the action (e.g., delete chat)
  console.log('Menu action triggered')
  closeDropdown()
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
  border: 1px solid rgb(103, 103, 103);
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 8px;
  top: 100%; /* Position below the button */
  left: 30px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: none;
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  cursor: pointer;
}

.delete-btn {
  color: rgb(238, 69, 69) !important;
}

.delete-icon {
  width: 18px;
  height: 18px;
  margin-right: 7px;
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
</style>
