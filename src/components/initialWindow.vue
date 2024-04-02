<script setup>
import { ref, onMounted } from 'vue'
import { useInitialPrompts } from '../composables/initialPrompts.js' // Make sure the path is correct
import { useSendPrompt } from '../composables/usePrompt.js' // Make sure the path is correct

// Create a ref to store the prompts
const prompts = ref([])
const { sendPrompt } = useSendPrompt()

// Destructure fetchInitialPrompts from the composable
const { fetchInitialPrompts } = useInitialPrompts()

onMounted(async () => {
  try {
    prompts.value = await fetchInitialPrompts() // Fetch and store the prompts
    console.log('prompts :>> ', prompts.value)
  } catch (error) {
    console.error('Failed to load initial prompts:', error)
  }
})

const choosePrompt = async prompt => {
  // Implement your logic to handle the chosen prompt

  try {
    console.log('payload:', prompt.prompt)
    const response = await sendPrompt(prompt.prompt)
    console.log('Conversation started:', response)
    // Handle response as needed
  } catch (error) {
    console.error('Failed to submit prompt:', error)
  }
}
</script>

<template>
  <div
    :key="textAreaHeight"
    class="chat"
    :style="{ paddingBottom: textAreaHeight + 'px' }"
  >
    <div class="initial-propts">
      <div class="cards-container">
        <!-- Loop through prompts and display them as cards -->
        <div
          class="card"
          v-if="prompts && prompts.items && prompts.items[0]"
          @click="choosePrompt(prompts.items[0])"
        >
          <h3>{{ prompts.items[0].title }}</h3>
          <p>{{ prompts.items[0].description }}</p>
        </div>
        <div
          class="card"
          v-if="prompts && prompts.items && prompts.items[1]"
          @click="choosePrompt(prompts.items[1])"
        >
          <h3>{{ prompts.items[1].title }}</h3>
          <p>{{ prompts.items[1].description }}</p>
        </div>
        <div
          class="card"
          v-if="prompts && prompts.items && prompts.items[2]"
          @click="choosePrompt(prompts.items[2])"
        >
          <h3>{{ prompts.items[2].title }}</h3>
          <p>{{ prompts.items[2].description }}</p>
        </div>
        <div
          class="card"
          v-if="prompts && prompts.items && prompts.items[3]"
          @click="choosePrompt(prompts.items[3])"
        >
          <h3>{{ prompts.items[3].title }}</h3>
          <p>{{ prompts.items[3].description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  width: 100% !important;
  color: rgba(255, 255, 255, 0);
  background-color: #212121;
  display: flex;
  justify-content: center;
}
.chat {
  position: fixed;
  height: calc(100% - 86px);
  margin: 0 !important;
  width: 100% !important;
  overflow-y: auto;
  padding: 12px;
  box-sizing: border-box;
  /* Firefox scrollbar styling */
  color: white;
  background-color: #212121;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: transparent transparent; /* For Firefox, set default state to transparent */
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
.cards-container {
  display: flex;
  flex-wrap: wrap;
  width: calc(75vw - 10vw) !important;

  max-width: 1000px;
  justify-content: center;
}

.card {
  flex: 1 1 300px; /* Flex grow, flex shrink, flex basis */
  border: 1px solid #464646;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
  width: calc(50vw - 30vw) !important;
  max-width: 450px;
}
.card:hover {
  cursor: pointer;
  background-color: #292929;
  color: #ededed;
}
.card h3 {
  margin: 0 7px 5px 7px;
  color: #ededed;
  font-weight: 400;
  font-size: 1rem;
}
.card p {
  margin: 0 7px;
  color: #9a9a9a;
  font-size: 0.8rem;
}

.card h3,
.card p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.initial-propts {
  display: flex;
  width: 100% !important;
  justify-content: center;
  align-items: end;
  margin-top: 220px;
  height: calc(100vh - 325px);
}
/* Responsive adjustments */
@media (max-width: 900px) {
  .card {
    max-width: calc(50vw);
    max-height: 9vh;
    padding: 7px;
  }
  .card h3 {
    margin: 0 7px 5px 7px;
  }
  .card p {
    margin: 0 7px;
  }
  .initial-propts {
    margin-top: 140px;
    height: calc(100vh - 250px);
  }
}
@media (max-width: 670px) {
  .initial-propts {
    margin-top: 90px;
    height: calc(100vh - 220px);
  }
}
</style>
