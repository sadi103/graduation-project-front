import { useEffect, useState } from "react"
import { Form } from "react-router-dom"
import '../form.css'

const LoginRegister = () => {
  const [isLoginForm, setIsLoginForm] = useState(false)
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [name, setName] = useState('')


  return(
    <div className="encapsulator">
      <div className="form-structor">
        <div className={`signup ${isLoginForm ? "slide-up" : ""}`}>
          <h2 className="form-title" id="signup" onClick={() => setIsLoginForm(!isLoginForm)}><span>or</span>Sign up</h2>
          {/* <Form> */}
            <div className="form-holder">
              <input type="text" className="input" placeholder="Name" />
              <input type="email" className="input" placeholder="Email" />
              <input type="password" className="input" placeholder="Password" />
            </div>
            <button className="submit-btn">Sign up</button>
          {/* </Form> */}
        </div>
        <div className={`login ${isLoginForm ? "" : "slide-up"}`}>
          <div className="center">
            <h2 className="form-title" id="login" onClick={() => setIsLoginForm(!isLoginForm)}><span>or</span>Log in</h2>
              {/* <Form> */}
                <div className="form-holder">
                  <input type="email" className="input" placeholder="Email" />
                  <input type="password" className="input" placeholder="Password" />
                </div>
                <button className="submit-btn">Log in</button>
              {/* </Form> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRegister