import { useState } from 'react'
import { Form, json, redirect } from 'react-router-dom'
import '../form.css'

export const action = (singup, login) => async ({ request }) => {

  const formData = await request.formData()
  const operation = formData.get('login-register')

  if (operation === 'login') {

    const userToLogin = {
      username: formData.get('username'),
      password: formData.get('password')
    }

    const responseStatus = await login({ ...userToLogin })
    if (responseStatus === 'OK')
      return redirect('/reservation')
    return undefined
  }
  else if (operation === 'register') {
    const userToRegister = {
      name: formData.get('name'),
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    const responseStatus = await singup({ ...userToRegister })
    if (responseStatus === 'OK')
      return redirect('/reservation')
    return undefined
  }

  // invalid operation
  throw json(
    { error: 'invalid operation' }
  )
}

const LoginRegister = ({ isLoading, error, loginIsLoading, loginError }) => {
  const [isLoginForm, setIsLoginForm] = useState(false)

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
            <button className="submit-btn" name="login-register" value="register" disabled={isLoading}>Sign up</button>
            { error && <p>{ error }</p> }
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
              <button className="submit-btn" name="login-register" value="login" disabled={loginIsLoading}>Log in</button>
              { loginError && <p>{ loginError }</p> }
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRegister