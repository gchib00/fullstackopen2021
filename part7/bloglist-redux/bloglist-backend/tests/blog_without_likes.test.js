const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

test('blog with undefined likes will get 0 likes automatically', async () => {
  const allBlogs = await Blog.find({})

  const newBlog = {
    title: 'Generic blog about food',
    author: 'Marc Angelo',
    url: 'www.foodblog.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const lastBlog = allBlogs[allBlogs.length-1]
  expect(lastBlog.likes).toBe(0)
})



afterAll(() => {
  mongoose.connection.close()
})