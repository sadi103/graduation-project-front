/* eslint-disable linebreak-style */
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (data) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios
        .post('/api/users', data)

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: response.data })

      // update loading state
      setIsLoading(false)

      return response.status

    } catch (exception) {
      setIsLoading(false)
      setError(exception.response.data.error)
      console.log('exception from useSignup file', exception)

      return null
    }
  }

  return { signup, isLoading, error }
}