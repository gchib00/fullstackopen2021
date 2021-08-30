const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

test('an individual blog can be modified (increment likes by 1)', async () => {
  const blog = await Blog.find({})
  const id = blog[0].id
  const originalLikes = blog[0].likes
    
  const updatedBlog = {
    title: 'Velveeta Mac and Cheese',
    author: 'Bob',
    url: 'www.boogle.com',
    likes: originalLikes+1
  }

  console.log('original item = ', blog[0])
  await api
    .put(`/api/blogs/${id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  console.log('changed item =', response.body[0])
})


afterAll(() => {
  mongoose.connection.close()
})