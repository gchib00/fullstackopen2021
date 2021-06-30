import axios from 'axios'

const url = '/api/persons/'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}
const addPerson = (person) => {
      return axios.post(url, person).then(getAll)
}
const removePerson = (id) => {
    return axios.delete(url+id).then(getAll)
}
const updateNumber = (changedObject) => {
    return axios
        .put(url+changedObject.id, {name: changedObject.name, number: changedObject.number})
        .then(getAll)
        .catch (error => {
            console.log('It got stuck at contacts.js!')
            console.log('IT FAILED AT AXIOS: ',error) 
            // return getAll()
        })
}

const exportedObject = { addPerson, getAll, removePerson, updateNumber }
export default exportedObject