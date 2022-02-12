const express = require('express')
const router = express.Router()
const logger = require('../../utils/logger')
const bcrypt = require('bcrypt')
const User = require('../../models/user')

const saltRounds = 10

/*
* Router for sign up requests
* Data comes in form:
* { "email": "", "username": "", "password": ""}
*/

router.post('/', async (req, res, next) => {

  if (req.body.password.length < 8 || req.body.password === undefined) {
    const error = { name: 'ValidationError', message: 'Password must have 8 characters' }
    return next(error)
  }

  const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    hashPassword: hashPassword
  })

  try {
    await user.save()
    res.status(201).send(req.body)
  } catch(error) {
    next(error)
  }

})

module.exports = router