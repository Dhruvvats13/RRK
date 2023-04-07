import React from 'react'
import {Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'
import Home from './Home'
import Main from './Main'
import ForgotPassword from './ForgotPassword'
import './App.css'
const App = ()=> {
  const user=localStorage.getItem('myInfo')
  
  return (
    <div className="App">

 <Routes>
<Route path='/signup' element={<SignUp/>} />
<Route path='/' element={<Main/>} />
<Route path='/forgot-password' element={<ForgotPassword/>}/>
<Route path='/home' element={<Home/>} />
<Route path='/login' element={<Login/>} />
</Routes> 
    </div>
    );
  };
export default App;
