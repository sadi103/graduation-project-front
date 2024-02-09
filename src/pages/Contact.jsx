const ContactForm = () => {
  return (
    <div className="contact">
      <div className="container">
        <div className="row d_flex">
          <div className="column">
            <form action="" id="request" className="main-form">
              <div className="row">
                <div className="form-feild">
                  <input className="contactus" placeholder="Name" type="type" name="Name" />
                </div>
                <div className="form-feild">
                  <input className="contactus" placeholder="Phone Number" type="type" name="Name" />
                </div>
                <div className="form-feild">
                  <input className="contactus" placeholder="Email" type="type" name="Name" />
                </div>
                <div className="form-feild">
                  <textarea className="textarea contactus" placeholder="Message" type="type"></textarea>
                </div>
                <div className="submition">
                  <div className="submit-button">
                    <button>Send</button>
                  </div>
                  <div className="social-media">

                  </div>
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