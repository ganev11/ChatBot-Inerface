import locStorage from '../services/local-storage'
import mittBus from '../services/mitt.js'

export function useUser() {
  console.log('sessionId :>> ')

  // Function to fetch user details
  const fetchUser = async () => {
    try {
      // ! Fetch user profile to obtain session ID
      const response = await fetch('https://auth.sstrader.com/api/me', {
        method: 'GET',
        credentials: 'include' // Include credentials (cookies) in the request
      })
      // // ! Fetch user profile using the access token
      // const response = await fetch('https://auth.sstrader.com/api/me', {
      //   method: 'GET',
      //   headers: {
      //     Authorization: 'Bearer rGJOfWVxyEI9BKV0ovEA2'
      //   }
      // })

      if (!response.ok) {
        if (response.status === 401) {
          // User is not authorized, redirect to login page
          window.location.href =
            'https://auth.sstrader.com/login?return_url=chat.sstrader.com'
        } else {
          throw new Error('Failed to fetch user details')
        }
      }

      const userData = await response.json()
      const sessionId = userData.session.id
      console.log('sessionId :>> ', sessionId)
      // Save the session ID into local storage
      locStorage.setItem('sessionId', sessionId)

      return userData
    } catch (error) {
      console.error('Error fetching user details:', error)
      mittBus.emit('showError', error.message)
      throw error // or handle it according to your error handling strategy
    }
  }

  return {
    fetchUser
  }
}
