import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

const AuthContextProvider = ({ children }) => {

  const potentialUser = JSON.parse(localStorage.getItem('user'))

  const [state, dispatch] = useReducer(authReducer, {
    user: potentialUser ? potentialUser : null
  })

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider