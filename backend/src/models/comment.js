const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema( {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Saving username to avoid need for populating user when trying to find comment poster name
  // Deeply nested populations are costly operations
  username: {
    type: String,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  },
  comment: {
    type: String,
  },
  posted: {
    type: Date,
    default: new Date
  }

})

CommentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id,
    delete returnedObject._id,
    delete returnedObject.__v
  }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment