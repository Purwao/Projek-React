import './App.css';
import Home from './pages/Home';
import Nav from './pages/Nav';
import Kontak from './pages/Kontak';
import Sejarah from './pages/Sejarah';
import Tentang from './pages/Tentang';
import React , {Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Siswa from './pages/Siswa';
import Menu from './pages/Menu';


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Nav />
            <Routes>
              <Route path='/' Component={Home} exact />
              <Route path='/Kontak' Component={Kontak}/>
              <Route path='/Sejarah' Component={Sejarah}/>
              <Route path='/Tentang' Component={Tentang}/> 
              <Route path='/siswa' Component={Siswa}/>
              <Route path='/menu' Component={Menu}/>
            </Routes>  
        </div>
     </BrowserRouter>
  );
}

export default App;
