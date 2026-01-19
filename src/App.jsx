import { RouterProvider } from 'react-router-dom'
import './App.css'
import StoreRoutes from './routes/StoreRoutes'

function App() {

  return (
    <>
      <RouterProvider router={StoreRoutes}/>


    </>
  )
}

export default App