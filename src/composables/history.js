import locStorage from '../services/local-storage'
import mittBus from '../services/mitt.js'

export function useHistory() {
  const fetchOldConversations = async (offset = 0, limit = 25) => {
    try {
      const url = new URL('https://chat.sstrader.com/api/v1/chat/conversations')

      url.searchParams.append('offset', offset)
      url.searchParams.append('limit', limit)

      // Retrieve the session ID from local storage
      const sessionId = locStorage.getItem('sessionId')

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionId}` // Use the session ID as the bearer token
        }
      })

      const data = await response.json()

      // Return the items directly without mapping through inner arrays
      return data.items
    } catch (error) {
      console.error('Error fetching models:', error)
      mittBus.emit('showError', error.message)
      throw error
    }
  }

  return {
    fetchOldConversations
  }
}
