import axios from 'axios'
import { useState } from 'react'

const ContactForm = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()

    const emailString = import.meta.env.VITE_API_EMAIL_ACCESS_STRING

    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.post(`https://formsubmit.co/ajax/${emailString}`, {
      name: name,
      email: email,
      message: message
    })
      .then(response => console.log(response))
      .catch(error => console.log(error))

    setEmail('')
    setName('')
    setMessage('')
  }

  return (
    <div className="contact">
      <div className="container">
        <div className="row d_flex">
          <div className="column">
            <form onSubmit={onFormSubmit} id="request" className="main-form">
              <input type="hidden" name="_subject" value="New Query On the Wedding Venues" />
              <div className="row">
                <div className="form-feild">
                  <input className="contactus" placeholder="Name" type="text" name="name" value={name} onChange={({ target }) => setName(target.value)} required />
                </div>
                {/* <div className="form-feild">
                  <input className="contactus" placeholder="Phone Number" type="type" name="Name" />
                </div> */}
                <div className="form-feild">
                  <input className="contactus" placeholder="Email" type="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)} required />
                </div>
                <div className="form-feild">
                  <textarea className="textarea contactus" placeholder="Message" name="message" value={message} onChange={({ target }) => setMessage(target.value)} required ></textarea>
                </div>
                <div className="submition">
                  <div className="submit-button">
                    <button type="submit">Send</button>
                  </div>
                  {/* <div className="social-media">

                  </div> */}
                </div>
              </div>
            </form>
          </div>
          <div className="column">

          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm