import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom'
import { Suspense, lazy } from 'react'

import './App.css'
import { action as loginRegisterAction } from './pages/LoginRegister'
import { useAuthContext } from './hooks/useAuthContext'
import { useSignup } from './hooks/useSignup'
import { useLogin } from './hooks/useLogin'

// pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const LoginRegister = lazy(() => import('./pages/LoginRegister'))

// layouts
const RootLayout = lazy(() => import('./layouts/RootLayout'))

const App = () => {
  const { user, dispatch } = useAuthContext()
  const { signup, isLoading, error } = useSignup()
  const { login, loginIsLoading, loginError } = useLogin()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="reservation" element={user ? <p>you are logged in</p> : <Navigate replace to="/login" />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<LoginRegister isLoading={isLoading} error={error} loginIsLoading={loginIsLoading} loginError={loginError} />} action={loginRegisterAction(signup, login)} />
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
