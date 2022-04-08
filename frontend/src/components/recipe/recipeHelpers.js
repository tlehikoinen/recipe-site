import Salty1 from './food_images/salty_1.PNG'
import Salty2 from './food_images/salty_2.PNG'
import Sweet1 from './food_images/sweet_1.PNG'
import Sweet2 from './food_images/sweet_2.PNG'
import Vege from './food_images/vege_1.PNG'

const saltys = [Salty1, Salty2]
const sweets = [Sweet1, Sweet2]
const veges = [Vege]
export const allImages = { saltys, sweets, veges }


export const generateFoodAvatar = (type) => {
  if (type === 'savory') {
    return saltys[Math.floor(Math.random()*saltys.length)]
  }
  else if (type === 'sweet') {
    return sweets[Math.floor(Math.random()*sweets.length)]
  }
  else {
    return veges[Math.floor(Math.random()*veges.length)]
  }
}
export const difficultyOptions = [
  { id: 1, title: 'Easy' },
  { id: 2, title: 'Medium' },
  { id: 3, title: 'Hard' }
]
export const courseOptions = [
  { id: 1, title: 'Savory' },
  { id: 2, title: 'Vegetarian' },
  { id: 3, title: 'Sweet' }
]

export const timeScaleValues = [
  '15 min', '30 min', '45 min', '1 h', '1.5 h',
  '2 h', '2.5 h', '3 h', '4 h', '5 h',
  '6 h', '8 h', '10 h', '12 h', '16 h',
  '1 d', '2 d', '3 d', '4 d', '5 d',
  '1 week', '2 week', '3 week', '1 month'
]

export const recipeValidationData = {
  title: {
    error: false,
    errorMsg: 'Name is required'
  },
  description: {
    error: false,
    errorMsg: 'Description is required'
  },
  course: {
    error: false,
    errorMsg: 'Select course',
  },
  servings: {
    error: false,
    errorMsg: 'Amount of servings is required'
  },
  difficulty: {
    error: false,
    errorMsg: 'Select difficulty',
  },
}
