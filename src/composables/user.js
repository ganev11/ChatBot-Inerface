// export function useUser() {
//   // Function to fetch user details
//   const fetchUser = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5500/v1/me', {
//         method: 'GET',
//         headers: {
//           Authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE' // Replace with your actual access token
//         }
//       })

//       if (!response.ok) {
//         throw new Error('Failed to fetch user details')
//       }

//       const data = await response.json()
//       return data // Assuming the response JSON directly contains the user details
//     } catch (error) {
//       console.error('Error fetching user details:', error)
//       throw error // or handle it according to your error handling strategy
//     }
//   }

//   return {
//     fetchUser
//   }
// }

// // Use the obtained session ID as the bearer token for subsequent API calls
// const userResponse = await fetch('https://auth.sstrader.com/api/me', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${sessionId}` // Use the session ID as the bearer token
//   }
// })
import locStorage from '../services/local-storage'

export function useUser() {
  // Function to fetch user details
  const fetchUser = async () => {
    try {
      //! Fetch user profile to obtain session ID
      const response = await fetch('https://auth.sstrader.com/api/me', {
        method: 'GET',
        credentials: 'include' // Include credentials (cookies) in the request
      })
      // // ! Fetch user profile using the access token
      // const response = await fetch('https://auth.sstrader.com/api/me', {
      //   method: 'GET',
      //   headers: {
      //     Authorization: 'Bearer 5F55d2F288CECf743cB94BdbfE177D74'
      //   }
      // })

      if (!response.ok) {
        if (response.status === 401) {
          // User is not authorized, redirect to login page
          window.location.href =
            'https://auth.sstrader.con/login?return_url=chat.sstrader.com'
        } else {
          throw new Error('Failed to fetch user details')
        }
      }

      const userData = await response.json()
      const sessionId = userData.session.id

      // Save the session ID into local storage
      locStorage.setItem('sessionId', sessionId)

      return userData
    } catch (error) {
      console.error('Error fetching user details:', error)
      throw error // or handle it according to your error handling strategy
    }
  }

  return {
    fetchUser
  }
}
