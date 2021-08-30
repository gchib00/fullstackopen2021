const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

test('deleting a single blog', async () => {
  const allBlogs = await Blog.find({})
  const id = allBlogs[0].id

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
})



afterAll(() => {
  mongoose.connection.close()
})