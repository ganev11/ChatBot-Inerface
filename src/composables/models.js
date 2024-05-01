import locStorage from '../services/local-storage'

export function useModels() {
  // Adjusted method to fetch models using Fetch API
  const fetchModels = async () => {
    try {
      // Retrieve the session ID from local storage
      const sessionId = locStorage.getItem('sessionId')

      const response = await fetch(
        'https://chat.sstrader.com/api/v1/models', // Updated URL to fetch models
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionId}` // Use the session ID as the bearer token
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch models')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching models:', error)
      throw error // or handle it as needed
    }
  }

  return {
    fetchModels // Updated to return the newly named function
  }
}
