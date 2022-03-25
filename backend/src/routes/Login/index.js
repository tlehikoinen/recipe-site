const express = require('express')
const router = express.Router()
const logger = require('../../utils/logger')
const config = require('../../utils/config')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//const Todo = require('../../models/todo')

router.post('/', async (req, res, next) => {

  const userInDb = await User.findOne( { email: req.body.email }).select('+hashPassword').populate('recipes')

  const correctPassword = userInDb === null
    ? false
    : await bcrypt.compare(req.body.password, userInDb.hashPassword)

  if (!(userInDb && correctPassword)) {
    const error = { name: 'FalseLogin', message: 'Wrong username or password' }
    return next(error)
  }

  const userForToken = {
    username: userInDb.username,
    id: userInDb.id
  }

  const token = jwt.sign(userForToken, config.SECRET)

  logger.info('Login successful')

  res.status(200).send({ token, user: userInDb })
})

module.exports = router
