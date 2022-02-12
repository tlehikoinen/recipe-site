const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.join(__dirname,'../../../.env'),
})

const PORT = process.env.PORT || 5000

// const devMode = {
//   "production": process.env.MONGODB_URI,
//   "development": process.env.DEV_MONGODB_URI,
//   "test": process.env.TEST_MONGODB_URI
// }
// const MONGODB_URI = devMode[process.env.NODE_ENV]

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const SECRET = process.env.SECRET

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}