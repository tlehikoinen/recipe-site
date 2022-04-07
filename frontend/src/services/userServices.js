import axios from 'axios'

const baseUrl = '/api'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const addFollow = async (userId) => {
  const config = { headers: { Authorization : token } }
  const response = await axios.put(`${baseUrl}/users/follow/${userId}`, {}, config)
  return response
}

const deleteFollow = async (userId) => {
  const config = { headers: { Authorization : token } }
  const response = await axios.delete(`${baseUrl}/users/follow/${userId}`, config)
  return response
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

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/users/${id}`)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}

const getUsers = async () => {
  const response = await axios.get(`${baseUrl}/users`)
  return response.data
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

const updateTheme = async (id, theme) => {
  const config = { headers: { Authorization : token } }
  const response = await axios.put(`${baseUrl}/users/${id}/theme`, { theme }, config)
    .catch((error) => {
      const { response } = error
      return response
    })
  return response
}

const postMessage = async (userId, message) => {
  console.log(`Posting message to ${userId} with message ${message}`)
  // const config = { headers: { Authorization : token } }
  // const response = await axios.post(`${baseUrl}/users/${userId}/messages`, { message }, config)
  //   .catch((error) => {
  //     const { response } = error
  //     return response
  //   })
  // return response
}

export default { addFollow, deleteFollow, deleteUserWithConfirmation, getAvatar, getUser, getUsers, login, postAvatar, postMessage, setToken, signUp, updateDescription, updateTheme }


