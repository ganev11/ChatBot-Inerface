<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import ConversationsList from './ConversationsList.vue'
import { useUser } from '../composables/user.js'
import { useFetchedConversationsStore } from '../stores/fetchedConversationsStore'
import { useConversationStore } from '../stores/conversationStore'

const conversationsContainer = ref(null)
const user = ref(null)
const { fetchUser } = useUser()
const fetchedConversationsStore = useFetchedConversationsStore() // For fetching and initial conversation management

const isUserDropdownOpen = ref(false)
const conversationStore = useConversationStore() // Use the store

// Hambuger menu start
import { useMobileMenuStore } from '../stores/mobileMenuStore'

// Initialize the store
const mobileMenu = useMobileMenuStore()

// Create computed properties to reactively access the store's state
const isMobileScreen = computed(() => mobileMenu.isMobileScreen)
const isHamOpen = computed(() => mobileMenu.isHamOpen)

// Method to close the hamburger menu
function closeMenu() {
  mobileMenu.setHamMenuOpen(false)
}

// Watcher for isMobileScreen changes
watch(isMobileScreen, (newVal, oldVal) => {
  console.log(`MOBILEMOB isMobileScreen changed from ${oldVal} to ${newVal}`)
})

// Watcher for isHamOpen changes
watch(isHamOpen, (newVal, oldVal) => {
  console.log(`MOBILEMOB isHamOpen changed from ${oldVal} to ${newVal}`)
})
// Hambuger menu end

function toggleUserDropdown() {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
}

function closeUserDropdown() {
  isUserDropdownOpen.value = false
}

function openSettings() {
  // Logic to open settings
  console.log('Opening settings...')
  closeUserDropdown()
}

function logout() {
  // Logic to logout
  console.log('Logging out...')
  closeUserDropdown()
}

const checkScroll = () => {
  if (conversationsContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } =
      conversationsContainer.value
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchedConversationsStore.fetchConversations()
    }
  }
}

function newConversation() {
  // Logic to create a new conversation
  console.log('Creating a new conversation...')
  conversationStore.startNewConversation()
}
onMounted(async () => {
  await fetchedConversationsStore.fetchConversations(true) // Initial load (true means initial load)
  try {
    user.value = await fetchUser()
  } catch (error) {
    console.error('Failed to load user details:', error)
  }
  if (conversationsContainer.value) {
    conversationsContainer.value.addEventListener('scroll', checkScroll)
  }
})
onUnmounted(() => {
  if (conversationsContainer.value) {
    conversationsContainer.value.removeEventListener('scroll', checkScroll)
  }
})
</script>

<template>
  <span v-if="isHamOpen" class="mobile-menu" @click="toggleMenu">
    <span class="tgl-wrapper" @click="closeMenu">
      <span class="tgl-span"> xxxxxxxxxx </span>
    </span>

    <div>
      <div>
        <!-- menu content -->

        <!-- new chat btn fixed -->
        <div class="new-convo" @click="newConversation">
          New Chat
          {{ mobileMenu.isMobileScreen }}
          <img class="edit-icon" src="../assets/svg/edit.svg" alt="" />
        </div>
        <!-- history -->
        <div class="conversations" ref="conversationsContainer">
          <ConversationsList
            v-if="isHamOpen"
            :conversations="fetchedConversationsStore.conversations"
          />
        </div>

        <!-- user Info fixed -->
        <div class="user" v-if="user" @click="toggleUserDropdown">
          <img class="user-icon" :src="user.picture" alt="" />

          {{ user.name }}
        </div>
        <div v-if="isUserDropdownOpen" class="dropdown-menu user-dropdown-menu">
          <div class="responsivity-wrapper">
            <div class="dropdown-item" @click="openSettings">
              <img class="setting-icon" :src="user.picture alt="" /> Settings
            </div>
            <div class="dropdown-item" @click="logout">
              <img class="logout-icon" src="../assets/svg/logout.svg" alt="" />
              Logout
            </div>
          </div>
        </div>
        <div
          v-if="isUserDropdownOpen"
          class="overlay"
          @click="closeUserDropdown"
        ></div>
      </div>
    </div>
    <!-- Toggle btn -->
  </span>
</template>

<style scoped>
.tgl-wrapper {
  position: relative;
  top: 50px !important;
  left: 400px;
  width: 1px;
  height: 1px;
}

.tgl-span {
  position: absolute;
  cursor: pointer;

  width: 20px;
  height: 20px;
  border-radius: 3px;
  background-color: #ffffff9c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tgl-span:hover {
  background-color: #ffffff;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  padding: 8px;
  cursor: pointer;
  color: white;
  background-color: rgb(195, 90, 29);
  font-size: 1.5rem;
  z-index: 10000;
}
.user-icon {
  width: 32px !important;
  height: 32px !important;
}
.edit-icon {
  margin: 0 !important;
  width: 20px;
  height: 20px;
}
.new-convo {
  width: 100%;
  max-width: 222px;
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

.user {
  width: 100%;
  max-width: 216px;
  position: relative;
  padding: 8px 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 4px;
  display: flex;
  gap: 8px;
  align-items: center;
}
.user:hover {
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
  min-width: 238px !important;
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
  left: 00px;
  width: 4px;
  height: 20px;
  border-radius: 3px;
  color: white;
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
}
.tgl-pin {
  position: relative;
  width: 4px;
  height: 20px;
  border-radius: 3px;
  background-color: #ffffff9c;
}
.tgl-pin:hover {
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
  max-height: calc(100vh - 110px);
  min-height: calc(100vh - 110px);
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

<style scoped>
.edit-icon,
.setting-icon,
.logout-icon {
  margin-right: 8px;
  width: 20px;
  height: 20px;
}

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

.dropdown-menu {
  position: absolute;
  z-index: 10000; /* Adjust z-index as necessary */
  width: auto;
  min-width: 213px;
  background-color: #333;
  color: #fff;
  border: 1px solid rgb(82, 82, 82);
  border-radius: 7px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 8px;
  bottom: 60px; /* Position below the button */
  left: 15px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: transparent;
  color: rgb(255, 255, 255);
  font-weight: bold;
  border: none;
  width: 100%;
  max-width: 190px;
  text-align: left;
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #474747;
  border-radius: 4px;
}

.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0); /* Transparent, change as needed */
  z-index: 8000; /* Below dropdown menu but above other content */
}
</style>
