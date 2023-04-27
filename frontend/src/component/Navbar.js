/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react'
import { ReactComponent as Logo } from '../images/logo.svg'
// import '../Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from '../ContextReducer';
import Modal from '../Modal';
import Cart from '../Cart';
export default function Navbar(props) {

    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
    return (
        <div >
             
            <nav className="navbar navbar-expand-lg navbar-dark position-sticky"  style={{ position: "fixed", width: "100%" }}>
                <div className="container-fluid">
                {/* <button className="navbar-toggler" type="button" style={{ position: "left" , border: "none"}} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <Link className="navbar-brand " to="/"><Logo /></Link>
                  
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul  className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Main</Link>  {/* index.css - nav-link color white */}
                            </li>
                            {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                
                            </form> :
                            <div>

                                <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                                <button onClick={handleLogout} className="btn bg-white text-success" >Logout</button></div>}

                    </div>
                </div>
            </nav>
        </div>
    )
}
