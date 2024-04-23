export function useModels() {
  // Adjusted method to fetch models using Fetch API
  const fetchModels = async () => {
    try {
      const response = await fetch(
        'https://chat.sstrader.com/api/v1/models', // Updated URL to fetch models
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer 0d21d7c1-0cb0-4e4e-ac81-82d562aa3566'
          }
        }
      )
      // console.log('response fetchModels:>> ', response)
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
