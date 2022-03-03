const mongoose = require('mongoose')
const Schema = mongoose.Schema


const RecipeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  steps: {
    type: Array,
    required: true
  },
  difficulty: {
    type: String
  }


})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
