

import { Login } from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../src/App.css'
import { ProductsCompra } from './components/ProductsCompra'
import { Cart } from './components/Cart'
import {Users} from './components/Users'
import {Registrar} from './components/Registrar'


export const App = () => {
 

  return (

    <>
      <BrowserRouter>

        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/products-compra' element={<ProductsCompra />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/users' element={<Users />} />
          <Route path='/registrar' element={<Registrar />} />
          
        </Routes>


      </BrowserRouter>
    </>
  )
}