import { useState } from 'react'
import { Form, redirect, useActionData } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import '../form.css'

export const action = (userDispatch) => async ({ request }) => {

  const formData = await request.formData()
  const operation = formData.get('login-register')

  if (operation === 'login') {
    const user = await axios
      .post('/api/login', {
        username: formData.get('username'),
        password: formData.get('password')
      })
      .then(reponse => reponse.data)

    userDispatch({ type: 'LOGIN', payload: user })

    return redirect('/reservation')
  }

}

const LoginRegister = () => {
  const [isLoginForm, setIsLoginForm] = useState(false)
  const { user, dispatch } = useAuthContext()

  const data = useActionData()
  console.log('data is', data)
  console.log('user is', user)

  // dispatch({ type: 'LOGIN', payload: data })

  // const response = useActionData()

  // try {
  //   if(response.statusText === 200)
  //     setUser(response.data)
  // } catch (error) {
  //   setErrorMessage(error)
  // }

  return(
    <div className="encapsulator">
      <div className="form-structor">
        <div className={`signup ${isLoginForm ? 'slide-up' : ''}`}>
          <h2 className="form-title" id="signup" onClick={() => setIsLoginForm(!isLoginForm)}><span>or</span>Sign up</h2>
          <Form method="post" action="/login" id="register-form">
            <div className="form-holder">
              <input type="text" name="name" className="input" placeholder="Name" />
              <input type="text" name="username" className="input" placeholder="Username" />
              <input type="email" name="email" className="input" placeholder="Email" />
              <input type="password" name="password" className="input" placeholder="Password" />
            </div>
            <button className="submit-btn" name="login-register" value="register">Sign up</button>
            {  }
          </Form>
        </div>
        <div className={`login ${isLoginForm ? '' : 'slide-up'}`}>
          <div className="center">
            <h2 className="form-title" id="login" onClick={() => setIsLoginForm(!isLoginForm)}><span>or</span>Log in</h2>
            <Form method="post" action="/login" id="login-form">
              <div className="form-holder">
                <input type="text" name="username" className="input" placeholder="Username" />
                <input type="password" name="password" className="input" placeholder="Password" />
              </div>
              <button className="submit-btn" name="login-register" value="login">Log in</button>
              {  }
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRegister