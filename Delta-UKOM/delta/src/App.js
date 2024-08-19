import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Market from './Front/Market';
import Login from './Login/Login';
import Registrasi from './Login/Registrasi';
import Cart from './Front/Cart';
import CartHist from './Front/CartHist';
import Admin from './Back/Admin';
import Ikan from './Back/Ikan';

function App() {

  // A higher-order component for protecting routes
  const ProtectedRoute = ({ element, ...rest }) => {
    const userRole = sessionStorage.getItem('level');
  
    // Check if the userRole is 1, 2, or 3
    if (userRole === '1' || userRole === '2' || userRole === '3') {
      return element;
    } else {
      return <h2 className='font-bold text-4xl font-sans text-center text-deepkoamaru h-screen w-screen flex justify-center items-center '>Your action are not authorized to access this page! GTFO</h2>;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/market' element={<Market />} />
        <Route path='/login' element={<Login />} />
        <Route path='/regist' element={<Registrasi />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cartHist' element={<CartHist />} />
        
        {/* Protecting the /admin route */}
        <Route path="/admin/*" element={<ProtectedRoute element={<Admin />} />} />
        
       
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;