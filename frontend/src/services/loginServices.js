import axios from 'axios'

const baseUrl = '/api'

const login = async(user) => {
  const response = await axios.post(`${baseUrl}/login`, user)
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

export default { login, signUp }


