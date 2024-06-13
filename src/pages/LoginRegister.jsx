import { useState } from 'react'
import '../form.css'
import { useLogin } from '../hooks/useLogin'
import { useSignup } from '../hooks/useSignup'
import { useNavigate } from 'react-router-dom'

const LoginRegister = () => {
  const [isLoginForm, setIsLoginForm] = useState(false)
  const navigate = useNavigate()

  // states
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // custom hooks
  const { login, loginIsLoading, loginError } = useLogin()
  const { signup, isLoading, error } = useSignup()

  // reset states
  const resetValues = () => {
    setName('')
    setUsername('')
    setEmail('')
    setPassword('')
  }

  // form handlers
  const handleRegister = async (e) => {
    e.preventDefault()

    const status = await signup({ name, username, email, password })
    resetValues()

    if (status === 201)
      navigate('/reservation')
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const status = await login({ username, password })
    resetValues()

    if (status === 200)
      navigate('/reservation')
  }

  // change forms
  const changeForms = () => {
    setIsLoginForm(!isLoginForm)
    resetValues()
  }

  return(
    <div className="encapsulator">
      <div className="form-structor">
        <div className={`signup ${isLoginForm ? 'slide-up' : ''}`}>
          <h2 className="form-title" id="signup" onClick={changeForms}><span>or</span>Sign up</h2>
          <form id="register-form" onSubmit={handleRegister}>
            <div className="form-holder">
              <input type="text" name="name" className="input" placeholder="Name" value={name} onChange={({ target }) => setName(target.value)} />
              <input type="text" name="username" className="input" placeholder="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
              <input type="email" name="email" className="input" placeholder="Email" value={email} onChange={({ target }) => setEmail(target.value)} />
              <input type="password" name="password" className="input" placeholder="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button className="submit-btn" type='submit' disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign up'}</button>
            { error && <p>{ error }</p> }
          </form>
        </div>
        <div className={`login ${isLoginForm ? '' : 'slide-up'}`}>
          <div className="center">
            <h2 className="form-title" id="login" onClick={changeForms}><span>or</span>Log in</h2>
            <form id="login-form" onSubmit={handleLogin}>
              <div className="form-holder">
                <input type="text" name="username" className="input" placeholder="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
                <input type="password" name="password" className="input" placeholder="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
              </div>
              <button className="submit-btn" type='submit' disabled={loginIsLoading}>{loginIsLoading ? 'Loading...' : 'Log in'}</button>
              { loginError && <p>{ loginError }</p> }
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRegister