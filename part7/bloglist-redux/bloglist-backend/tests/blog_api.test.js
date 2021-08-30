const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('a valid blog can be added', async () => {
  const allBlogs = await Blog.find({})

  const newBlog = {
    title: 'Other random test blog',
    author: 'Testo Authorinho',
    url: 'www.boogle.com',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(allBlogs.length + 1)
  expect(contents).toContain(
    'Test Blog to see if the code works properly'
  )
})


test('blog without title is not added', async () => {
  const allBlogs = await Blog.find({})

  const newBlog = {
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(allBlogs.length)
})

// test('blog with undefined likes will get 0 likes automatically', async () => {
//   const allBlogs = await Blog.find({})

//   const newBlog = {
//     title: 'Generic blog about food',
//     author: 'Marc Angelo',
//     url: 'www.foodblog.com',
//     likes: '2'
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)

//   const lastBlog = allBlogs[allBlogs.length]
//   expect(lastBlog.likes).toBe(0)
// })



afterAll(() => {
  mongoose.connection.close()
})