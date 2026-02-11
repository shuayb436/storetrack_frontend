import { RouterProvider } from 'react-router-dom'
import './App.css'
import StoreRoutes from './routes/StoreRoutes'


function App() {

  return (
    <>
      <RouterProvider router={StoreRoutes}/>
            
              {/* <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/products" element={<Product />}/>
                <Route path="/sales" element={<DailySales />}/>
                <Route path="/history" element={<StockHistory />}/>
              </Routes> */}
       

    </>
  )
}

export default App