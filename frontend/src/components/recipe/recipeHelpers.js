import Salty1 from './food_images/salty_1.PNG'
import Salty2 from './food_images/salty_2.PNG'
import Sweet1 from './food_images/sweet_1.PNG'
import Sweet2 from './food_images/sweet_2.PNG'
import Vege from './food_images/vege_1.PNG'

const saltys = [Salty1, Salty2]
const sweets = [Sweet1, Sweet2]
const veges = [Vege]
const allImages = { saltys, sweets, veges }

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

export default allImages
