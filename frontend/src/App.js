import React from 'react'
import {Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'
import Home from './Home'
import Main from './Main'
import { CartProvider } from './ContextReducer';
import MyOrder from './MyOrder';
import './App.css'
import Payment from './Payment'
import ForgotPassword from './ForgotPassword'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AdminLogin from './AdminLogin'
import Footer from './Footer'
import About from './About'
import AdminPanel from './AdminPanel'

const stripePromise = loadStripe('your_stripe_public_key');
const App = ()=> {
  const user=localStorage.getItem('myInfo')
  
  return (
    <CartProvider>
    <div className="App">

 <Routes>
 <Route path='/signup' element={<SignUp/>} />
<Route path='/' element={<Main/>} />
<Route path='/home' element={<Home/>} />
<Route path="/forgot-password" element={<ForgotPassword />} />
{/* <Route path="/password-reset" element={<PasswordReset />} /> */}
<Route path='/login' element={<Login/>} />
<Route path='/about' element={<About/>} />
<Route path='/footer' element={<Footer/>} />
<Route path='/admin' element={<AdminLogin/>} />
<Route path='/panel' element={<AdminPanel/>} />
<Route path='/myorder' element={<MyOrder/>} />
<Route path='/payment' element={ <Elements stripe={stripePromise}>
<Payment/> </Elements>}/>
</Routes> 
    </div>
    </CartProvider>
    );
  };
export default App;