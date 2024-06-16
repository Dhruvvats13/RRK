import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from '../ContextReducer';
import Modal from '../Modal';
import Cart from '../Cart';
import { ReactComponent as Logo2 } from '../images/logo2.svg';

import '../Navbar.css'

export default function Navbar(props) {

  const [cartView, setCartView] = useState(false);


  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  const items = useCart();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark  position-sticky"
        style={{
          boxShadow: "0px 10px 20px black",
          filter: "blur(20)",
          position: "fixed",
          zIndex: "10",
          width: "100%",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            <Logo2 />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 mx-3 active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5 mx-3 active"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex "></form>
            ) : (
              <div className='buttons'>
                <div className='cart'>
                  <div className="btn bg-white mx-2 " onClick={loadCart}>
                    <Badge
                      color="secondary"
                      badgeContent={items.length}
                      overlap="rectangular"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                    Cart
                  </div>
                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                  ) : null}
                </div>
                <div className='logout'>
                  <button onClick={handleLogout} className="btn bg-white ">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
