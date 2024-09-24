import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  console.log('getUsers response', response)
  return response.data
}

export default { getUsers }
