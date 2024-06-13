import axios from 'axios'
import CreateBlog from '../components/CreateBlog'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLoaderData } from 'react-router-dom'

export const loader = async () => {
  const response = await axios.get('/api/blogs')

  return response.data
}

const Blog = () => {
  const { user } = useAuthContext()
  const blogs = useLoaderData()

  const handleDeletion = (blogId) => async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }

    try {
      await axios.delete(`/api/blogs/${blogId}`, config)
    } catch(exception) {
      console.log('exception raised after blog deletion attempt is:', exception.response.data.error)
    }
  }

  if (blogs) {
    return (
      <>
        { user && (user.username === 'root') && (
          <div className='create-blog'>
            <CreateBlog buttonLabel='create a new blog' />
          </div>
        )}
        <div className="blog">
          <div className="container">
            { blogs && blogs.map(blog => (
              <div key={blog.id} className="blog-column">
                <div className="blog_container">
                  <button onClick={handleDeletion(blog.id)} className='blog-remove'></button>
                  <div className="blog_bg">
                    <div className="row d_flex">
                      <div className="image_container">
                        <div className="blog_img">
                          <figure>
                            <img src={ blog.image } alt="#" />
                          </figure>
                        </div>
                      </div>
                      <div className="blog_text">
                        <div className="marriage_text">
                          <h3>{ blog.title }</h3>
                          <p>{ blog.body }</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) }
          </div>
        </div>
      </>
    )
  }
}

export default Blog