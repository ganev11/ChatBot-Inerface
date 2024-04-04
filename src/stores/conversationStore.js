// Import the defineStore method from Pinia
import { defineStore } from 'pinia'
// Import the useSpecificConversation composable
import { useSpecificConversation } from '../composables/specificConversation.js'
import { useFetchedConversationsStore } from './fetchedConversationsStore' // Adjust the path as necessary

export const useConversationStore = defineStore('conversation', {
  state: () => ({
    // Initialize the conversation data as an array to hold message objects
    conversation: {},
    // Control visibility of the initial chat window
    initialWindow: true,
    // State to hold the current prompt text
    currentPrompt: '',
    // State to hold the ongoing response text that's built from streamed data
    ongoingResponse: '',
    lastId: 0 // Counter for generating IDs
  }),
  actions: {
    generateId() {
      this.lastId += 1 // Increment the ID
      return `msg_${this.lastId}` // Return a string ID, e.g., "msg_1"
    },
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
      // Reset the conversation data to an empty array
      this.conversation = {}

      // Show the initial chat window
      this.initialWindow = true
      // Clear the current prompt and ongoing response
      this.currentPrompt = ''
      this.ongoingResponse = ''
    },
    setCurrentPrompt(prompt) {
      // Set the currentPrompt state with the new prompt
      this.currentPrompt = prompt
      this.initialWindow = false
    },
    appendToOngoingResponse(streamedData) {
      try {
        // Remove the leading "data: " and any surrounding quotes from the streamedData string
        const jsonData = streamedData
          .replace(/^data:\s*['"]?/, '')
          .replace(/['"]?$/, '')

        // Parse the remaining string as JSON
        const parsedData = JSON.parse(jsonData)

        // Check if the parsed object contains the necessary properties
        if (
          parsedData &&
          parsedData.message &&
          parsedData.message.content &&
          parsedData.message.content.parts
        ) {
          const newParts = parsedData.message.content.parts
          this.ongoingResponse += newParts.join(' ')
        }
      } catch (error) {
        console.error('Error appending to ongoing response:', error)
      }
    },
    finalizeStream() {
      // if (this.lastId === 0) {
      // load the fetched conversations again to update the list
      const fetchedConversationsStore = useFetchedConversationsStore()
      fetchedConversationsStore.fetchConversations(true)
      // }

      const promptId = this.generateId() // Use the generateId method to get a new ID
      const responseId = this.generateId()

      const promptObj = {
        [promptId]: {
          id: promptId,
          message: {
            author: { role: 'user', name: null, metadata: {} },
            content: { content_type: 'text', parts: [this.currentPrompt] },
            create_time: Math.floor(Date.now() / 1000),
            status: 'finished_successfully'
          },
          parent: null,
          children: [responseId]
        }
      }

      const responseObj = {
        [responseId]: {
          id: responseId,
          message: {
            author: { role: 'assistant', name: null, metadata: {} },
            content: { content_type: 'text', parts: [this.ongoingResponse] },
            create_time: Math.floor(Date.now() / 1000),
            status: 'finished_successfully'
          },
          parent: promptId,
          children: []
        }
      }

      this.conversation = { ...this.conversation, ...promptObj, ...responseObj }
      this.currentPrompt = ''
      this.ongoingResponse = ''
    }
  }
})
