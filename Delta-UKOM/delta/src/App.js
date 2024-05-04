import {BrowserRouter,Routes , Route } from 'react-router-dom'
import React from 'react'
import Market from './Front/Market'
import Ikan from './Back/Ikan'
import Login from './Login/Login'
import Carousel from './components/Carousel'
import Playground from './components/Playground'


function App() {
  return (
    <>
    
        <BrowserRouter>
            <Routes>
                <Route path='/market' Component={Market}></Route>
                <Route path='/login' Component={Login}></Route>
                <Route path='/admin' Component={Ikan}></Route>                        
                <Route path='/car' Component={Carousel}></Route>                        
                <Route path='/tes' Component={Playground}></Route>
            </Routes>
        </BrowserRouter>

</>
  )
}

export default App