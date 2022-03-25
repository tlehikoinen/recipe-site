const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FollowerSchema = new Schema( {
  uniqueIds: {
    type: String,
    unique: true,
    required: true,
    select: false
  },
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  followerSince: {
    type: Date,
    required: true
  },
  updates: {
    type: Boolean,
    default: true
  }
})

FollowerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id,
    delete returnedObject._id,
    delete returnedObject.__v
  }
})

const Follower = mongoose.model('Follower', FollowerSchema)

module.exports = Follower