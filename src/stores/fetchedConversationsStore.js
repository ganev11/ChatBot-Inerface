// stores/fetchedConversationsStore.js

import { defineStore } from 'pinia'
import { useHistory } from '../composables/history' // Adjust the import path as needed

export const useFetchedConversationsStore = defineStore(
  'fetchedConversations',
  {
    state: () => ({
      conversations: [],
      offset: 0,
      limit: 25
    }),
    actions: {
      async fetchConversations(initial = false) {
        if (initial) {
          this.offset = 0
        }
        console.log('fetching initial:', initial)
        const { fetchOldConversations } = useHistory()
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
    }
  }
)
