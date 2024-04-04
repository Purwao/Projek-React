import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

    
export default function Nav() {
  const navigate = useNavigate()

    function hapus(){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('level')
        navigate('/login')
    }
  
  return (
    <div>
         
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <Link to={"/admin"} className="navbar-brand" >Admin Dashboard</Link>
                    <li className='nav-item'>logged in as the mighty : {sessionStorage.getItem('email')}</li>
                    <li className='nav-item'>Title: {sessionStorage.getItem('level')}</li>
                    <button onClick={hapus} className="btn btn-outline-danger" type="submit">Logout</button>
                </div>
            </nav>
      

    </div>
  );
}
