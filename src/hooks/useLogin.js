/* eslint-disable linebreak-style */
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogin = () => {
  const [loginError, setLoginError] = useState(null)
  const [loginIsLoading, setLoginIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (data) => {
    setLoginIsLoading(true)
    setLoginError(null)

    try {
      const response = await axios
        .post('/api/login', data)

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: response.data })

      // update loading state
      setLoginIsLoading(false)

      return response.status

    } catch (exception) {
      setLoginIsLoading(false)
      setLoginError(exception.response.data.error)

      return null
    }
  }

  return { login, loginIsLoading, loginError }
}