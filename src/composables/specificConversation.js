export function useSpecificConversation() {
  const fetchSpecificConversation = async conversationId => {
    try {
      const response = await fetch(
        // `http://127.0.0.1:5500/v1/chat/conversation/${conversationId}`,
        `https://chat.sstrader.com/api/v1/chat/conversation/${conversationId}`,

        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer 0d21d7c1-0cb0-4e4e-ac81-82d562aa3566'
          }
        }
      )

      const data = await response.json()
      console.log('fetchSpecificConversation :>> ', data)
      return data
    } catch (error) {
      console.error('Error fetching old conversations:', error)
      throw error // or handle it as needed
    }
  }

  return { fetchSpecificConversation }
}
