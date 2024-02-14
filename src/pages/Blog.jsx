import Togglable from '../components/Togglable'
import { useAuthContext } from '../hooks/useAuthContext'

const Blog = () => {
  const { user } = useAuthContext()

  return (
    <>
      { user && (user.username === 'root') && (
        <div className='create-blog'>
          <Togglable buttonLabel='create a new blog'>
            <form>
              <div className='blog-creation-form'>
                <input type="text" name='title' placeholder='Title' className='title-input' />
                <textarea name="blog_body" placeholder='Enter you thoughts' style={{ width: '1000px', height: '200px', marginBottom: '10px' }}></textarea>
              </div>
            </form>
          </Togglable>
        </div>
      )}
      <div className="blog">
        <div className="container">
          <div className="blog-column">
            <div className="blog_container">
              <div className="blog_bg">
                <div className="row d_flex">
                  <div className="image_container">
                    <div className="blog_img">
                      <figure>
                        <img src="/images/blog_img1.jpg" alt="#" />
                      </figure>
                    </div>
                  </div>
                  <div className="blog_text">
                    <div className="marriage_text">
                      <h3>Tempor incididunt ut labore et dolore</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                      <h4>
                        <strong>Like</strong>
                        <strong className="comment_padding">Comment</strong>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog