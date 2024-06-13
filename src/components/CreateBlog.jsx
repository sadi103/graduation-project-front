import axios from 'axios'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const CreateBlog = (props) => {
  const [visible, setVisible] = useState(false)
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const { user } = useAuthContext()

  //// Form Visibility Functionality
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  ////

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  function roughSizeOfObject(obj) {
    const objectString = JSON.stringify(obj)
    return objectString.length
  }

  const handleFileUpload = async ({ target }) => {
    const file = target.files[0]
    const base64 = await toBase64(file)

    setImage(base64)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newBlog = {
      title,
      body,
      image
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }
      await axios.post('/api/blogs', newBlog, config)
    } catch (error) {
      console.log('Error triggered after trying to upload:', error)
    }
  }

  return(
    <>
      <div style={hideWhenVisible}>
        <button className='create-button' onClick={toggleVisibility}>{ props.buttonLabel }</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={handleSubmit}>
          <div className='blog-creation-form'>
            <input type="text" name='title' placeholder='Title' className='title-input' value={title} onChange={({ target }) => setTitle(target.value)} />
            <textarea name="blog_body" placeholder='Enter you thoughts' style={{ width: '1000px', height: '200px', marginBottom: '10px' }} value={body} onChange={({ target }) => setBody(target.value)}></textarea>
          </div>
          <div className="blog-buttons-container">
            <div>
              <input
                id='file-upload'
                type='file'
                name='blog-image'
                accept='.jpg, .jpeg, .png'
                onChange={handleFileUpload}
              />
            </div>
            <div>
              <button className='create-button' type='submit' style={{ marginRight: '5px' }}>Create</button>
              <button className='create-button' type='button' onClick={toggleVisibility}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateBlog