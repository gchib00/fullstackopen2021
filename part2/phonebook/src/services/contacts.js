import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}
const addPerson = (person) => {
      return axios.post(url, person).then(getAll)
}
const removePerson = (id) => {
    return axios.delete(url+"/"+id).then(getAll)
}
const updateNumber = (changedObject) => {
    return axios.put(url+'/'+changedObject.id, changedObject).then(getAll)
}

const exportedObject = { addPerson, getAll, removePerson, updateNumber }
export default exportedObject