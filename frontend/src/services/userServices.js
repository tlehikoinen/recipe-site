import axios from 'axios'

const baseUrl = '/api'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const deleteUserWithConfirmation = async (password) => {
  const config = { headers: { Authorization : token } }
  const response = await axios.post(`${baseUrl}/users/confirmAndDelete`, password, config)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}

const updateDescription = async (userId, description) => {
  const config = { headers: { Authorization : token } }
  const response = await axios.put(`${baseUrl}/users/${userId}`, { description }, config)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}

const login = async(user) => {
  const response = await axios.post(`${baseUrl}/login`, user)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}

const getAvatar = async(userId) => {
  const response = await axios.get(`${baseUrl}/users/avatars/${userId}`)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}

const postAvatar = async(userId, avatar) => {

  const formData = new FormData()
  formData.append('file', avatar)

  const config = { headers: { Authorization : token, 'Content-Type': 'multipart/form-data' } }
  const response = await axios.post(`${baseUrl}/users/avatars/${userId}`, formData, config)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}

const signUp = async(user) => {
  const response = await axios.post(`${baseUrl}/signup`, user)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}

export default { deleteUserWithConfirmation, getAvatar, login, postAvatar, setToken, signUp, updateDescription }


