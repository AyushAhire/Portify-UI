import UserForm from './pages/UserForm'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Optimize from './pages/Optimize'
import App_Layout from './layout/layout'
import Index from './pages/Index'
import Login from './pages/Login'
import { useEffect } from 'react'

const router = createBrowserRouter([
  {
    element: <App_Layout />,
    children: [
      {
        path: '/',
        element: <Index />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/riskform',
        element: <UserForm />
      },
      {
        path: '/optimize',
        element: <Optimize />
      }
    ]
  }
])

function App() {
  useEffect(() => {
    // Check system preference and localStorage
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const storedTheme = localStorage.getItem('theme')
    
    if (storedTheme) {
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    } else {
      document.documentElement.classList.toggle('dark', isDark)
    }
  }, [])

  return <RouterProvider router={router} />
}

export default App