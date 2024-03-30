export function useHistory() {
  // New method to fetch old conversations using Fetch API
  const fetchSpecificConversation = async conversationId => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5500/v1/chat/conversation/${conversationId}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer 0d21d7c1-0cb0-4e4e-ac81-82d562aa3566'
          }
        }
      )
      // console.log('response fetchSpecificConversation:>> ', response)

      if (!response.ok) {
        throw new Error('Failed to fetch conversations')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching old conversations:', error)
      throw error // or handle it as needed
    }
  }

  return {
    fetchSpecificConversation // Include the new method in the returned object
  }
}
