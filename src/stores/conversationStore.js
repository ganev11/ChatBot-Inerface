// Import the defineStore method from Pinia
import { defineStore } from 'pinia'
// Import the useHistory composable
import { useSpecificConversation } from '../composables/specificConversation.js'

export const useConversationStore = defineStore('conversation', {
  state: () => ({
    // Sample conversation data
    conversation: [
      { id: 1, content: '**Hello**', type: 'prompt' },
      {
        id: 2,
        content: 'Hi there! How can I **assist** you today?',
        type: 'answer'
      }
      // Add more conversation objects as needed
    ],
    // Add initialWindow state
    initialWindow: true
  }),
  actions: {
    async loadSpecificConversation(conversationId) {
      // Use the useHistory composable
      const { fetchSpecificConversation } = useSpecificConversation()

      try {
        // Fetch the specific conversation by ID
        const conversation = await fetchSpecificConversation(conversationId)
        // Here you might want to do something with the fetched conversation,
        // for example, adding it to the conversations array or replacing existing data.
        // This example will just log the fetched conversation for demonstration.
        this.conversation = conversation.mapping // Directly setting the conversation object
        console.log('Hi :>> ', this.conversation)

        // Change the initialWindow state to false
        this.initialWindow = false
      } catch (error) {
        console.error('Failed to load specific conversation:', error)
      }
    }
  }
})
