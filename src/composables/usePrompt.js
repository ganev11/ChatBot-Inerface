export function useSendPrompt() {
  const sendPrompt = async promptData => {
    try {
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
      let data = ''

      // Function to process the stream
      const readStream = async () => {
        const { done, value } = await reader.read()
        if (done) {
          console.log('Stream finished')
          return
        }

        // Convert the stream chunk to a string
        let chunk = new TextDecoder('utf-8').decode(value)

        // Check if the chunk starts with 'data:' and remove this prefix
        if (chunk.startsWith('data:')) {
          chunk = chunk.substring(5) // Remove 'data:' prefix
        }

        try {
          // Parse the JSON string
          const jsonData = JSON.parse(chunk)

          // Access the "parts" of each message and process or log them
          const parts = jsonData.message.content.parts
          console.log(parts) // This will log the "parts" array of each message

          // You can then do something with the parts, like concatenating them into a complete message
        } catch (error) {
          console.error('Error parsing JSON from stream:', error)
        }

        // Read the next chunk
        readStream()
      }
      await readStream()
      // Optionally, return data or handle it as per your application's needs
    } catch (error) {
      console.error('Error sending prompt:', error)
      throw error
    }
  }

  return { sendPrompt }
}
