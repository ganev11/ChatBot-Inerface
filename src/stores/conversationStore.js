// Import the defineStore method from Pinia
import { defineStore } from 'pinia'
// Import the useSpecificConversation composable
import { useSpecificConversation } from '../composables/specificConversation.js'
import { useFetchedConversationsStore } from './fetchedConversationsStore' // Adjust the path as necessary

export const useConversationStore = defineStore('conversation', {
  state: () => ({
    conversationIsRunning: false,
    // Initialize the conversation data as an array to hold message objects
    conversation: {},
    // Control visibility of the initial chat window
    initialWindow: true,
    // State to hold the current prompt text
    currentPrompt: '',
    // State to hold the ongoing response text that's built from streamed data
    currentConversationId: '',
    ongoingResponse: '',
    lastId: 0 // Counter for generating IDs
  }),
  actions: {
    setConversationIsRunning(value) {
      this.conversationIsRunning = value
    },
    generateId() {
      this.lastId += 1 // Increment the ID
      return `msg_${this.lastId}` // Return a string ID, e.g., "msg_1"
    },
    async loadSpecificConversation(conversationId) {
      this.currentConversationId = conversationId
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
      this.currentConversationId = ''
      // Show the initial chat window
      this.initialWindow = true
      // Clear the current prompt and ongoing response
      this.currentPrompt = ''
      this.ongoingResponse = ''
    },
    setCurrentPrompt(prompt) {
      // Set the currentPrompt state with the new prompt
      this.currentPrompt = prompt
      this.ongoingResponse = ' '
      this.initialWindow = false
    },
    appendToOngoingResponse(streamedData) {
      // Append new streamed data to the buffer
      this.buffer += streamedData

      try {
        // Continuously check for complete JSON objects in the buffer
        while (this.buffer.includes('\n')) {
          // Find the first newline, which delimits the end of a JSON object
          let endIndex = this.buffer.indexOf('\n')
          let jsonData = this.buffer.substring(0, endIndex).trim()

          // Remove the processed JSON string and any trailing newline from the buffer
          this.buffer = this.buffer.substring(endIndex + 1).trim()

          // Clean up jsonData from any wrapping artifacts
          jsonData = jsonData.replace(/^data:\s*/, '')

          // Check that jsonData contains data before parsing
          if (jsonData) {
            const parsedData = JSON.parse(jsonData)
            this.currentConversationId = parsedData.conversation_id

            // Check if parsedData contains the expected properties
            if (
              parsedData &&
              parsedData.message &&
              parsedData.message.content &&
              parsedData.message.content.parts
            ) {
              const newParts = parsedData.message.content.parts

              // Process each part, adding it to the ongoing response
              newParts.forEach(part => {
                // Add the part to the ongoing response as-is
                this.ongoingResponse += part
              })
            }
          } else {
            console.error('Received empty JSON data:', jsonData) // This now should only log if jsonData is genuinely empty
          }
        }
      } catch (error) {
        console.log('this.buffer :>> ', this.buffer)
        console.error('Error appending to ongoing response:', error)
        // Optionally handle the buffer differently on error
      }
    },
    finalizeStream() {
      console.log('finalizeStream', this.conversation)
      // if (this.lastId === 0) {
      // load the fetched conversations again to update the list
      const fetchedConversationsStore = useFetchedConversationsStore()
      fetchedConversationsStore.fetchConversations(true)
      // }

      const promptId = this.generateId() // Use the generateId method to get a new ID
      const responseId = this.generateId()
      // const promptId = this.currentConversationId // Use the generateId method to get a new ID
      // const responseId = this.currentConversationId

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
      console.log('12345 :>> ', this.conversation)
      this.conversation = { ...this.conversation, ...promptObj, ...responseObj }
      console.log('54321 :>> ', this.conversation)
      this.currentPrompt = ''
      this.ongoingResponse = ''
    }
  }
})
