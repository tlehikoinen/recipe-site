const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validators = require('../utils/validators')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'The email text field is required'],
    validate: {
      validator: validators.validateEmail
    }
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'The username text field is required'],
    validate: {
      validator: validators.validateUsername
    }
  },
  hashPassword: {
    type: String,
    required: [true, 'The hashPassword text field is required'],
    minLength: [8, 'Password must have 8 characters']
  },

})

const User = mongoose.model('user', UserSchema)

module.exports = User