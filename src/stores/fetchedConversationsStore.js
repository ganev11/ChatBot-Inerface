// stores/fetchedConversationsStore.js

import { defineStore } from 'pinia'
import { useHistory } from '../composables/history' // Adjust the import path as needed

export const useFetchedConversationsStore = defineStore(
  'fetchedConversations',
  {
    state: () => ({
      conversations: [],
      offset: 0,
      limit: 15
    }),
    actions: {
      async fetchConversations(initial = false) {
        console.log('fetchinainitial :>> ', initial)
        const { fetchOldConversations } = useHistory() // Use the composable
        try {
          const data = await fetchOldConversations(this.offset, this.limit)
          if (initial) {
            this.conversations = data
          } else {
            this.conversations = [...this.conversations, ...data]
          }
          this.offset += data.length
          console.log('Fetched conversations:', data)
        } catch (error) {
          console.error('Failed to fetch conversations:', error)
        }
      }
      //   addNewConversation(newConversation) {
      //     // Logic to add a new conversation at the beginning
      //     console.log('Adding a new conversation...')
      //     this.conversations.unshift(newConversation)
      //   }
    }
  }
)
