import locStorage from '../services/local-storage'

export function useDeleteConversation() {
  const deleteConversation = async conversationId => {
    console.log('deleteConversation conversationId :>> ', conversationId)
    try {
      // Retrieve the session ID from local storage
      const sessionId = locStorage.getItem('sessionId')

      const response = await fetch(
        `https://chat.sstrader.com/api/v1/chat/conversation/${conversationId}`,
        {
          method: 'PATCH', // Use DELETE method for deletion
          headers: {
            Authorization: `Bearer ${sessionId}` // Use the session ID as the bearer token
          }
          // No body needed for DELETE request
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete conversation')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error deleting conversation:', error)
      throw error // Or handle it as needed
    }
  }

  return { deleteConversation }
}
