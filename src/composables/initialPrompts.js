export function useInitialPrompts() {
  // Method to fetch initial prompts using Fetch API
  const fetchInitialPrompts = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:5500/v1/prompt_library/', // URL to fetch initial prompts
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer 0d21d7c1-0cb0-4e4e-ac81-82d562aa3566' // Assuming the same authorization token is required
          }
        }
      )
      // Uncomment the next line to see the response in the console
      // console.log('response fetchInitialPrompts:>> ', response);
      if (!response.ok) {
        throw new Error('Failed to fetch initial prompts')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching initial prompts:', error)
      throw error // or handle it as needed
    }
  }

  return {
    fetchInitialPrompts // Return the newly created fetch function
  }
}
