import axios from 'axios'
const loginUrl = '/api/login'

export const loginRegisterAction = async (request) => {
  console.log(request)

  const formData = await request.formData()
  const operation = formData.get('login-register')
  console.log('operation is', operation)

  if (operation === 'login') {
    const submission = {
      username: formData.get('username'),
      password: formData.get('password'),
    }

    try {
      const response = await axios.post(loginUrl, submission)
      return response
    } catch (error) {
      return error
    }

  } else if (operation === 'register') {
    const submission = {
      name: formData.get('name'),
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    }
  }
}
