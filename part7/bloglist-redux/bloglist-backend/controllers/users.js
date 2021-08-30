const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const allUsers = await User.find({})
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  let passToDB = true //determines whether the user should be added to DB or not
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const checkIfUserExists = async () => {
    const name = user.username
    await allUsers.map(user => {
      if (user.username === name){
        passToDB=false
        response.status(400).end('User already exists!')
      }
    })
  }
  checkIfUserExists()
  if (body.password == undefined || body.password.length < 3){
    response.status(400).end('Password is either empty or too short')
    passToDB = false
  }
  if (user.username == undefined || user.username.length < 3){
    response.status(400).end('Username is either empty or too short')
    passToDB = false
  }

  const addUser = async () => {
    const savedUser = await user.save()
    response.json(savedUser)
  }
  if (passToDB) {
    addUser()     
  }
})
usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({})
  response.json(allUsers)
})

module.exports = usersRouter