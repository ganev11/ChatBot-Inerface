<!-- DropdownMenu.vue -->
<template>
  <teleport to="#app">
    <div class="overlay" @click="closeDropdown"></div>
    <div class="dropdown-menu" :style="dropdownStyle">
      <!-- Your dropdown content here -->
      <slot></slot>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: Number,
  clickX: Number,
  clickY: Number
})

const emits = defineEmits(['close'])

function closeDropdown() {
  emits('close')
}

const dropdownStyle = computed(() => ({
  position: 'absolute',
  top: `${props.clickY}px`,
  left: `${props.clickX}px`,
  zIndex: '8000' // Ensure it appears above other content
}))
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(50, 50, 50, 0);
  z-index: 7500; /* Adjust based on your layout */
}
.dropdown-menu {
  position: absolute;
  padding: 8px;
  z-index: 8000; /* Ensure it's above other items */
  right: 0;
  min-width: 180px;
  max-width: 200px;
  top: 100%; /* Position it directly below the dots */
  background-color: #333; /* Dark grey background */
  border: 1px solid rgb(103, 103, 103); /* Light grey border */
  border-radius: 4px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Optional: Adds a slight shadow for depth */
  z-index: 8000; /* Higher than overlay */
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
</style>
