import axios from 'axios'

const baseUrl = '/api'

const getRecipes = async () => {
  const response = await axios.get(`${baseUrl}/recipes`)
  return response.data
}


export default { getRecipes }
