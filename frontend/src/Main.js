import React from 'react';
import Navbar from './Navbar';
import './Main.css';
import { ReactComponent as Logo } from './images/plate.svg';
import {  useNavigate } from "react-router-dom";

const Main = () => {
  let navigate = useNavigate();
  const About = () => {
      
  
      navigate("/about");
    };
  return (

      <div className='Main-div'>
        <Navbar className='navbar' />
        <div className='content'>
          <div className='content-left'>
            <h1>ROM ROM KITCHEN</h1>
            <p>made with love ♡</p>
            <button className='button' onClick={About}>know more ➜</button>
          </div>
          <Logo className='food' />
        </div>
       
      </div>


  );
};

export default Main;
