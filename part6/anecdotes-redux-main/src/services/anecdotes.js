import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const addAnecdote = async (newObj) => {
  const response = await axios.post(baseUrl, newObj)
  return response.data
}
const addVote = async (id) => {
  const allObjects = await getAll()
  const votedAnecdote = allObjects.find(anecdote => anecdote.id === id)
  console.log(votedAnecdote)
  votedAnecdote.votes += 1
  console.log("updated: ",votedAnecdote)
  const response = await axios.put(baseUrl+'/'+id, votedAnecdote)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addAnecdote, addVote }