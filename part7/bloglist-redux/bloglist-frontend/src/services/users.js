import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  const array = request.data
  return array
}

export default { getAll }