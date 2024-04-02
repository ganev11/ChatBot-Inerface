export function useUser() {
  // Function to fetch user details
  const fetchUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5500/v1/me', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE' // Replace with your actual access token
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user details')
      }

      const data = await response.json()
      return data // Assuming the response JSON directly contains the user details
    } catch (error) {
      console.error('Error fetching user details:', error)
      throw error // or handle it according to your error handling strategy
    }
  }

  return {
    fetchUser
  }
}
