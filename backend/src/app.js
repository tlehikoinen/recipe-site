require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const todoRouter = require('./routes/Todos/todos')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

app.use(express.static('build'))
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())
//app.use(middleware.requestLogger)
app.use('/api/todos', todoRouter)

// Express will serve up the front-end index.html file if it doesn't recognize the route
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../build/index.html'))
})

//app.use(middleware.unknownEndpoint)

// Connect to the database
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => logger.info('Database connected successfully'))
  .catch((err) => logger.error(err))

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise



// app.listen(port, () => {
//   logger.info(`Server running on port ${port}`)
// })

module.exports = app
