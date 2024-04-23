// stores/fetchedConversationsStore.js

import { defineStore } from 'pinia'
import { useHistory } from '../composables/history' // Adjust the import path as needed

export const useFetchedConversationsStore = defineStore(
  'fetchedConversations',
  {
    state: () => ({
      conversations: [
        {
          conversation_template_id: null,
          create_time: new Date().toISOString(),
          current_node: null,
          gizmo_id: null,
          id: 'default12345678',
          is_archived: false,
          mapping: null,
          title: 'New Conversation',
          update_time: new Date().toISOString(),
          workspace_id: null
        }
      ],
      offset: 0,
      limit: 15
    }),
    actions: {
      async fetchConversations(initial = false) {
        if (initial) {
          this.offset = 0
        }
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
    }
  }
)
