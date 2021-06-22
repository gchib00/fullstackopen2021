import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}
const addPerson = (person) => {
      return axios.post(url, person)  
}

const exportedObject = { addPerson, getAll }
export default exportedObject