const logger = require('./logger')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

const errorHandler = (error, req, res, next) => {
  logger.error(`Error message: ${error.message}`)
  logger.error(`Error code: ${error.code}`)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  else if (error.code === 11000) { // Duplicate key
    return res.status(422).json( { error: error.message })
  }
  else if (error.name === 'FalseLogin') {
    return res.status(401).json({ error: error.message })
  }
  else if (error.name === 'ImgUploadError') {
    return res.status(400).json({ error: error.message })
  }
  else next(error)
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const userExtractor = (request, response, next) => {
  try {
    request.user = jwt.verify(request.token, config.SECRET)
    next()
  } catch(err) {
    response.status(401).send('Invalid token')
  }
}

module.exports = {
  errorHandler,
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  userExtractor,
}