import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom"
import { useState } from "react"

import './App.css'

// pages
import Home from "./pages/Home"
import About from "./pages/About"
import Blog from "./pages/Blog"
import Contact from "./pages/Contact"
import LoginRegister from "./pages/LoginRegister"

// layouts
import RootLayout from "./layouts/RootLayout"

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
    <RouterProvider router={router} />
  )
}

export default App
