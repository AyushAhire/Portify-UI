import UserForm from './pages/UserForm'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Optimize from './pages/Optimize'
import App_Layout from './layout/layout'
import Index from './pages/Index'
import Login from './pages/Login'

  
const router = createBrowserRouter([
  {
    element:<App_Layout/>,
  children: [
  {
    path: '/',
    element: <Index/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/riskform',
    element: <UserForm/>
  },
  {
    path: '/optimize',
    element: <Optimize/>
  }
]
}]
)



function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
