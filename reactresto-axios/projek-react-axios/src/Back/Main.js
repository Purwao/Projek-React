import React from 'react'
import {  Route, Routes, useResolvedPath } from 'react-router-dom'
import Konten from './Konten'

function Main() {

  const url=useResolvedPath("").pathname

  return (
    <div>
      <Routes>
        <Route path={`${url}:konten`} Component={Konten}></Route>
      </Routes>
        
    </div>
  )

}

export default Main