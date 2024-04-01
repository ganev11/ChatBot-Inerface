// Imports required for the composable function
import { ref } from 'vue'

export function useConversationDeletion() {
  const isDeleting = ref(false) // A state to track if the deletion process is ongoing
  const error = ref(null) // A state to hold any error that might occur during the deletion

  const deleteConversationCOMP = async conversationId => {
    isDeleting.value = true
    error.value = null

    try {
      const response = await fetch(
        `http://127.0.0.1:5500/v1/chat/conversation/${conversationId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer your-token-here' // Use actual authorization token
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete conversation')
      }

      // Optionally, you might want to do something with the response data here
      // const data = await response.json();
      // return data; // Depending on whether you need the response data
    } catch (err) {
      error.value =
        err.message || 'An error occurred while deleting the conversation.'
      console.error('Error deleting conversation:', error.value)
      throw err // Or handle it as needed
    } finally {
      isDeleting.value = false
    }
  }

  return {
    isDeleting,
    error,
    deleteConversationCOMP
  }
}
