import React from 'react'
import {  Route, Routes,} from 'react-router-dom'
import Konten from './Konten'

function Main() {

 

  return (
    <div>
      <Routes>
        <Route path=':konten' Component={Konten}></Route>
      </Routes>
   </div>
  )
}

export default Main