import locStorage from '../services/local-storage'

export function useSpecificConversation() {
  const fetchSpecificConversation = async conversationId => {
    try {
      // Retrieve the session ID from local storage
      const sessionId = locStorage.getItem('sessionId')

      const response = await fetch(
        `https://chat.sstrader.com/api/v1/chat/conversation/${conversationId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionId}` // Use the session ID as the bearer token
          }
        }
      )

      const data = await response.json()
      console.log('fetchSpecificConversation :>> ', data)
      return data
    } catch (error) {
      console.error('Error fetching specific conversation:', error)
      throw error // or handle it as needed
    }
  }

  return { fetchSpecificConversation }
}
