import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

export default function RootLayout() {

  const location = useLocation()
  let header = 'home'
  let currentPage = location.pathname.split('/')

  const { user } = useAuthContext()
  const logout = useLogout()

  const handleLogout = () => {
    logout()
  }

  try {
    currentPage = currentPage[1]
    if (['about', 'blog', 'reservation', 'contact'].includes(currentPage)) {
      header = currentPage
    }
  } catch (error) {
    console.log('error: ', error)
  }

  return (
    <>
      {header === 'home'
        ? (
          <header className='home-header'>
            <div className="main">
              <ul className="home-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/reservation">Reservation</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="home-title">
              <h1>Alwad Alakhdar Venues</h1>
            </div>
          </header>
        )
        : (
          <>
            <header className="full_bg">
              <div className="header">
                <div className="container">
                  <div className="row">
                    <div className="logo_section">
                      <div className="logo">
                        <Link to='/'>2Rings</Link>
                      </div>
                    </div>
                    {/* nav buttons */}
                    <div className="navigation_container">
                      <nav className="navbar">
                        <div className="navbar_collapse">
                          <ul className="navbar_nav">
                            <li className="nav_item">
                              <Link to='/' className="nav_link">Home</Link>
                            </li>
                            <li className="nav_item">
                              <Link to='/about' className="nav_link">About</Link>
                            </li>
                            <li className="nav_item">
                              <Link to='/reservation' className="nav_link">Reservation</Link>
                            </li>
                            <li className="nav_item">
                              <Link to='/blog' className="nav_link">Blog</Link>
                            </li>
                            <li className="nav_item">
                              <Link to='/contact' className="nav_link">Contact Us</Link>
                            </li>
                            { user && (
                              <li className='nav_item'>
                                <Link to='/' className='nav_link' onClick={handleLogout}>Log Out</Link>
                              </li>
                            ) }
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className="black_re">
              <div className="title">
                <h2>{ header }</h2>
              </div>
            </div>
          </>
        )
      }

      <main>
        <Outlet />
      </main>

      <footer>
        <div className="footer">
          <div className="copyright">
            <div className="container copyright-text" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p>
                © 2023 All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
