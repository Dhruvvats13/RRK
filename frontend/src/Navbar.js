import React from 'react'
import { ReactComponent as Logo } from './images/logo.svg'
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
<div className='navbar'>
     <Logo />
     <nav className='nav'>
      <ul className='nav-links'>
        <li>
          <Link to="/signup" style={{ textDecoration:'none',color:'black'}}>Signup</Link>
        </li>
        <li>
          <Link to="/login" style={{ textDecoration:'none',color:'black'}}>Login</Link>
        </li>
      </ul>
    </nav>
</div>
  )
}

export default Navbar;