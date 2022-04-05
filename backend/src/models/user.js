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
    minLength: [8, 'Password must have 8 characters'],
    select: false
  },
  joinDate: {
    type: Date,
    default: new Date()
  },
  description: {
    type: String,
    default: 'No description'
  },
  avatar: {
    type: Object,
    default: {
      key: '',
      location: ''
    }
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Follower'
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Follower'
    }
  ],
  likedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  theme: {
    type: String,
    default: 'light',
  }

})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id,
    delete returnedObject._id,
    delete returnedObject.hashPassword,
    delete returnedObject.__v
  }
})



const User = mongoose.model('User', UserSchema)

module.exports = User