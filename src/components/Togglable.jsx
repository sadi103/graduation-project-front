import { useState } from "react"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <>
      <div style={hideWhenVisible}>
        <button className='create-button' onClick={toggleVisibility}>{ props.buttonLabel }</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div className="blog-buttons-container">
          <div>
            <input type='file' name='file' />
          </div>
          <div>
            <button className='create-button' style={{ marginRight: '5px' }}>Create</button>
            <button className='create-button' onClick={toggleVisibility}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Togglable