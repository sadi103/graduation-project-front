import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom'
import { Suspense, lazy } from 'react'

import './App.css'
import { useAuthContext } from './hooks/useAuthContext'
import { loader as blogsLoader } from './pages/Blog'

// pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const LoginRegister = lazy(() => import('./pages/LoginRegister'))

// layouts
const RootLayout = lazy(() => import('./layouts/RootLayout'))

const App = () => {
  const { user } = useAuthContext()

  console.log('App component is rendered, and user is', user)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} loader={blogsLoader} />
          <Route path="about" element={<About />} />
          <Route path="reservation" element={user ? <p>you are logged in</p> : <Navigate replace to="/login" />} />
          <Route path="blog" element={<Blog />} loader={blogsLoader} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<LoginRegister />} />
      </Route>
    )
  )

  return (
    <Suspense fallback={''}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
