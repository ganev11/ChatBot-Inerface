import locStorage from '../services/local-storage'
import { useConversationStore } from '../stores/conversationStore' // Adjust the path as necessary
import { useModelsStore } from '../stores/modelsStore' // Adjust the path as necessary

export function useSendPrompt() {
  const conversationStore = useConversationStore()
  const modelsStore = useModelsStore()

  const sendPrompt = async promptData => {
    try {
      // Retrieve the session ID from local storage
      const sessionId = locStorage.getItem('sessionId')

      // Store the prompt data as the current prompt in the store
      conversationStore.setConversationIsRunning(true)
      conversationStore.setCurrentPrompt(promptData)

      // Find the active model from the models store
      const activeModel =
        modelsStore.models.find(model => model.active) || modelsStore.models[0]

      // Prepare the fetch request body with the active model ID and currentConversationId
      const requestBody = {
        model: {
          id: activeModel.id // Use the active model's ID
        },
        conversation_id: conversationStore.currentConversationId || null, // Use currentConversationId or null if it's undefined
        message: promptData // User question
      }

      const response = await fetch(
        'https://chat.sstrader.com/api/v1/chat/conversation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionId}` // Use the session ID as the bearer token
          },
          body: JSON.stringify(requestBody)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to start new conversation')
      }

      const reader = response.body.getReader()
      let data = ''

      // Function to process the stream
      const readStream = async () => {
        const { done, value } = await reader.read()
        if (done) {
          console.log('Stream finished')
          conversationStore.finalizeStream()
          conversationStore.setConversationIsRunning(false)
          return
        }

        const streamedData = new TextDecoder('utf-8').decode(value)
        conversationStore.appendToOngoingResponse(streamedData)
        console.log(streamedData) // Or process data as needed

        readStream()
      }

      await readStream()
    } catch (error) {
      console.error('Error sending prompt:', error)
      throw error
    }
  }

  return { sendPrompt }
}
