// Import the defineStore method from Pinia
import { defineStore } from 'pinia'
// Import the useSpecificConversation composable
import { useSpecificConversation } from '../composables/specificConversation.js'

export const useConversationStore = defineStore('conversation', {
  state: () => ({
    // Initialize the conversation data as an empty object
    conversation: {},
    // Control visibility of the initial chat window
    initialWindow: true
  }),
  actions: {
    async loadSpecificConversation(conversationId) {
      const { fetchSpecificConversation } = useSpecificConversation()

      try {
        const conversation = await fetchSpecificConversation(conversationId)
        // Assuming the fetched conversation data is structured correctly
        this.conversation = conversation.mapping
        // Hide the initial chat window
        this.initialWindow = false
      } catch (error) {
        console.error('Failed to load specific conversation:', error)
      }
    },
    startNewConversation() {
      // Reset the conversation data
      this.conversation = {}
      // Show the initial chat window
      this.initialWindow = true
    }
  }
})
