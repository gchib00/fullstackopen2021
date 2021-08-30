/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log('authorization:', authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const user = await User.findById('60fc41a50f842844ddeb8069')
  const blogs = await Blog.find({})
  blogs.map(blog => {
    if (blog.user == undefined) {
      blog.user = user
    }
  })
  response.json(blogs)
}) 

blogsRouter.delete('/:id/', async (request, response) => {
  await Blog.findByIdAndDelete({_id: request.params.id})
  response.status(204).end()
}) 


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedBlog = {
    user: body.user,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const blog = await Blog.findOneAndUpdate({title: body.title}, updatedBlog, {new: true})
  response.json(blog)
  response.status(200).end()
})

blogsRouter.post('/', async (request, response) => {
  let user
  if (process.env.NODE_ENV === 'test') { //this is necessary for cypress because otherwise it can't access user token from localstorage
    user = await User.findOne({username: 'test'})
  } else {

    const token = getTokenFrom(request)
    console.log('token=', token)
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    user = await User.findById(decodedToken.id)
  }

  const blog = new Blog ({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user
  })
  if (blog.likes == undefined) {
    blog.likes = 0 
  }
  if (blog.title === '' || blog.title.length < 1) {
    response.status(401).end('Title was empty')
  } else {
    const addBlog = async () => {
      const result = await blog.save()
      response.status(201).json(result)
    }
    addBlog()
  }
})


module.exports = blogsRouter