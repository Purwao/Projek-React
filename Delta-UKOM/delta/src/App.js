import {BrowserRouter,Routes , Route } from 'react-router-dom'
import React from 'react'
import Market from './Front/Market'
import Ikan from './Back/Ikan'
import Login from './Login/Login'
import Carousel from './components/Carousel'
import Playground from './components/Playground'
import Registrasi from './Login/Registrasi'


function App() {
  return (
    <>
    
        <BrowserRouter>
            <Routes>
                <Route path='/market' Component={Market}></Route>
                <Route path='/login' Component={Login}></Route>
                <Route path='/admin' Component={Ikan}></Route>                        
                <Route path='/regist' Component={Registrasi}></Route>                        
                <Route path='/tes' Component={Playground}></Route>
                <Route path='/car' Component={Carousel}></Route>
            </Routes>
        </BrowserRouter>

</>
  )
}

export default App