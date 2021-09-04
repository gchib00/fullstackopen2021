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
    url: body.url,
    comments: [...body.comments]
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
const addComment = async (body, comment) => {
  const updatedBlog = {
    user: body.user,
    likes: body.likes,
    author: body.author,
    title: body.title,
    url: body.url,
    comments: [...body.comments, comment]
  }
  const request = await axios.put(baseUrl+`/${body.title.replace(/\s/g, '')}`, updatedBlog)
  return request
}

export default { getAll, addBlog, setToken, updateBlog, deleteBlog, addComment }