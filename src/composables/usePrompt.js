import { useConversationStore } from '../stores/conversationStore' // Adjust the path as necessary

export function useSendPrompt() {
  const conversationStore = useConversationStore()

  const sendPrompt = async promptData => {
    try {
      // Store the prompt data as the current prompt in the store
      conversationStore.setCurrentPrompt(promptData)
      conversationStore.setCurrentPrompt(promptData)

      const response = await fetch(
        'http://127.0.0.1:5500/v1/chat/conversation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 0d21d7c1-0cb0-4e4e-ac81-82d562aa3566'
          },
          body: JSON.stringify({ yourData: promptData }) // Ensure promptData is structured correctly
        }
      )

      if (!response.ok) {
        throw new Error('Failed to start new conversation')
      }

      const reader = response.body.getReader()
      // Initialize an empty string to accumulate the streamed data
      let data = ''

      // Function to process the stream
      const readStream = async () => {
        const { done, value } = await reader.read()
        if (done) {
          console.log('Stream finished')
          // Call finalizeStream when the stream is finished to process the prompt and response
          conversationStore.finalizeStream()
          return
        }

        // Convert the streamed data from Uint8Array to string and append to ongoingResponse
        const streamedData = new TextDecoder('utf-8').decode(value)
        conversationStore.appendToOngoingResponse(streamedData)
        console.log(streamedData) // Or process data as needed

        // Recursively read the next chunk
        readStream()
      }

      await readStream()
      // The data variable isn't used in this updated approach, but you can still return or handle data if needed
    } catch (error) {
      console.error('Error sending prompt:', error)
      throw error
    }
  }

  return { sendPrompt }
}
