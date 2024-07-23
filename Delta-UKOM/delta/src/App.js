import {BrowserRouter,Routes , Route } from 'react-router-dom'
import React from 'react'
import Market from './Front/Market'
import Login from './Login/Login'
import Registrasi from './Login/Registrasi'
import Cart from './Front/Cart'
import CartHist from './Front/CartHist'
import Admin from './Back/Admin'
import Ikan from './Back/Ikan'



function App() {
  return (
    <>
    
        <BrowserRouter>
            <Routes>
                <Route path='/market' Component={Market}></Route>
                <Route path='/login' Component={Login}></Route>
                <Route path='/admin/*' Component={Admin}></Route>                        
                <Route path='/regist' Component={Registrasi}></Route>                        
                <Route path='/cart' Component={Cart}></Route>
                <Route path='/cartHist' Component={CartHist}></Route>
            </Routes>
        </BrowserRouter>

</>
  )
}

export default App