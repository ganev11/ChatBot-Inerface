// useDeleteConversation.js
export function useDeleteConversation() {
  const deleteConversation = async conversationId => {
    console.log('deleteConversation conversationId :>> ', conversationId)
    try {
      const response = await fetch(
        `http://127.0.0.1:5500/v1/chat/conversation/${conversationId}`,
        {
          method: 'PATCH', // Use DELETE method for deletion
          headers: {
            Authorization: 'Bearer 0d21d7c1-0cb0-4e4e-ac81-82d562aa3566' // Keep the Authorization header
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
