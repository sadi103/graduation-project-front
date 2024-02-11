import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom'
import { Suspense, lazy, useState } from 'react'

import './App.css'

// pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const LoginRegister = lazy(() => import('./pages/LoginRegister'))

// layouts
const RootLayout = lazy(() => import('./layouts/RootLayout'))

const App = () => {
  const [user, setUser] = useState(null)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="reservation" element={<Navigate replace to="/login" />} />
          <Route path="blog" element={<Blog />} />
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
