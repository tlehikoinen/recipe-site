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
  course: {
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
    type: String,
    required: true
  },
  timeEstimate: {
    type: Object,
    default: {
      value: 0,
      timeUnit: 'min'
    },
    required: true
  },
  // Likers store array of users
  likers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  avatar: {
    type: Object,
    default: {
      key: '',
      location: ''
    }
  },
  servings: {
    type: Number,
    required: false
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

RecipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id,
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe

// {
//   "title": "hey",
//   "description": "Delicious",
//   "ingredients": [
//       {
//           "name": "Mauste",
//           "unit": "tl"
//       },
//       {
//           "name": "Mauste2",
//           "unit": "tl"
//       },
//       {
//           "name": "Mauste3",
//           "unit": "tl"
//       }

//   ],
//   "steps": [
//       {
//           "name": "Eka Steppi",
//           "length": 10
//       },
//       {
//           "name": "Toka Steppi",
//           "length": 10
//       },
//       {
//           "name": "kolmas Stepp",
//           "length": 10
//       }
//   ],
//   "difficulty": "hard"
// }
