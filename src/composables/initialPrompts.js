import locStorage from '../services/local-storage'

export function useInitialPrompts() {
  // Method to fetch initial prompts using Fetch API
  const fetchInitialPrompts = async () => {
    try {
      // Retrieve the session ID from local storage
      const sessionId = locStorage.getItem('sessionId')

      const response = await fetch(
        'https://chat.sstrader.com/api/v1/prompt_library', // URL to fetch initial prompts
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionId}` // Use the session ID as the bearer token
          }
        }
      )

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
