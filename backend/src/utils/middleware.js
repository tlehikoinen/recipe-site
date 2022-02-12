const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

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
    return res.status(404).json({ error: error.message })
  }
  else next(error)
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}