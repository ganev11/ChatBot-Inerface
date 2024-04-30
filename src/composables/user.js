export function useUser() {
  // Function to fetch user details
  const fetchUser = async () => {
    try {
      // Fetch user profile to obtain session ID
      const response = await fetch('https://auth.sstrader.com/api/me', {
        method: 'GET',
        credentials: 'include' // Include credentials (cookies) in the request
      })

      if (response.ok) {
        const userData = await response.json()
        const sessionId = userData.session.id // Assuming session ID is available in the 'session' object

        // Use the obtained session ID as the bearer token for subsequent API calls
        const userResponse = await fetch('https://chat.sstrader.com/v1/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionId}` // Use the session ID as the bearer token
          }
        })

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details from chat server')
        }

        const userDataFromChat = await userResponse.json()
        return userDataFromChat // Assuming the response JSON directly contains the user details
      } else if (response.status === 401) {
        // User is not authorized, redirect to login page
        window.location.href =
          'https://auth.sstrader.con/login?return_url=chat.sstrader.com'
      } else {
        throw new Error('Failed to fetch user details')
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
      throw error // or handle it according to your error handling strategy
    }
  }

  return {
    fetchUser
  }
}
