// export function useHistory() {
//   // Adjusted method to fetch old conversations with offset and limit
//   const fetchOldConversations = async (offset = 0, limit = 10) => {
//     try {
//       const url = new URL('https://chat.sstrader.com/api/v1/chat/conversations')
//       // const url = new URL('http://127.0.0.1:5500/v1/chat/conversations')

//       // Adding search parameters to the URL
//       url.searchParams.append('offset', offset)
//       url.searchParams.append('limit', limit)

//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           Authorization: 'Bearer 0d21d7c1-0cb0-4e4e-ac81-82d562aa3566'
//         }
//       })

//       // Convert the response to JSON
//       const data = await response.json()

//       // Transform array of arrays into a single array of objects
//       const items = data.items.map(itemArray => itemArray[0])

//       // Return the transformed items
//       return items // This is now a single array of objects
//     } catch (error) {
//       console.error('Error fetching old conversations:', error)
//       // throw error // or handle it as needed
//     }
//   }

//   return {
//     fetchOldConversations // Include the updated method in the returned object
//   }
// }
import locStorage from '../services/local-storage'

export function useHistory() {
  const fetchOldConversations = async (offset = 0, limit = 10) => {
    try {
      const url = new URL('https://chat.sstrader.com/api/v1/chat/conversations')

      url.searchParams.append('offset', offset)
      url.searchParams.append('limit', limit)

      // Retrieve the session ID from local storage
      const sessionId = locStorage.getItem('sessionId')

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionId}` // Use the session ID as the bearer token
        }
      })

      const data = await response.json()

      // Return the items directly without mapping through inner arrays
      return data.items
    } catch (error) {
      console.error('Error fetching old conversations:', error)
      // Handle error as needed
    }
  }

  return {
    fetchOldConversations
  }
}
