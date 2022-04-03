import axios from 'axios'
const baseUrl = '/api'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getRecipes = async () => {
  const response = await axios.get(`${baseUrl}/recipes`)
  return response.data
}

const addLike = async (id) => {
  const config = { headers: { Authorization : token } }
  const response = await axios.put(`${baseUrl}/recipes/${id}/likes`, {}, config)  // {} as empty body
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}
const addRecipe = async (recipe) => {
  const config = { headers: { Authorization : token } }
  const response = await axios.post(`${baseUrl}/recipes`, recipe, config)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}

const getRecipe = async (id) => {
  const response = await axios.get(`${baseUrl}/recipes/${id}`)
    .catch((error) => {
      const { response } = error
      return response
    })

  return response
}

const postAvatar = async (recipeId, avatar) => {
  const formData = new FormData()
  formData.append('file', avatar)

  const config = { headers: { Authorization : token, 'Content-Type': 'multipart/form-data' } }
  const response = await axios.post(`${baseUrl}/recipes/avatars/${recipeId}`, formData, config)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}

const removeLike = async (id) => {
  const config = { headers: { Authorization : token } }
  const response = await axios.delete(`${baseUrl}/recipes/${id}/likes`, config)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}


export default { addLike, addRecipe, getRecipe, getRecipes, postAvatar, removeLike, setToken }
