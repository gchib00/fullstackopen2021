/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const Blog = require('../models/blog')
const logger = require('./logger')

const blogs = Blog.find({})

let baseNum = 0


const dummy = (blogs) => {
  return 1
}
dummy(blogs)  



const totalLikes = (list) => {
  list = list.map(blog => blog.likes)
  return list.reduce((sum, number) => sum + number , 0)
}

const findMostLiked = (list) => {
  list = list.map(blog => blog.likes)
  return Math.max(...list)
}



module.exports = {
  dummy,
  totalLikes,
  findMostLiked
}