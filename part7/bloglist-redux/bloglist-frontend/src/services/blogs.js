import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null


const setToken = newToken => {
  token = `bearer ${newToken}`
}

const updateBlog = async body => {
  const updatedBlog = {
    user: body.user,
    likes: body.likes+1,
    author: body.author,
    title: body.title,
    url: body.url
  }
  const request = await axios.put(baseUrl+`/${body.user.id}`, updatedBlog)
  return request
}

const deleteBlog = async body => {
  await axios.delete(baseUrl+`/${body._id}`)
}

const getAll = async () => {
  const request = await axios.get(baseUrl) 
  const array = request.data
  array.sort((a,b) => {
    return a.likes - b.likes
  })
  return array
}
const addBlog = async body => {
  const config = {
    headers: { Authorization: token },
  }
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, addBlog, setToken, updateBlog, deleteBlog }