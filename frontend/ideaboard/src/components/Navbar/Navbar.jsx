import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = ()=> {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");
    }
  return (
    <nav className='navbar'>
        <div className="navbar-logo">
            Ideaboard
        </div>

        <div className="navbar-links">
            <a href='/dashboard'>Dashboard</a>
            <a href='/ideas'>Ideas</a>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </nav>
      
    
  );
}

export default Navbar;
