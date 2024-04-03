// stores/conversationStore.js
import { defineStore } from 'pinia'

export const useConversationStore = defineStore('conversation', {
  state: () => ({
    // Sample conversation data
    conversations: [
      { id: 1, content: '**Hello**', type: 'prompt' },
      {
        id: 2,
        content: 'Hi there! How can I **assist** you today?',
        type: 'answer'
      }
      // Add more conversation objects as needed
    ]
  })
})
