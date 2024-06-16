import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import Navbar2 from './Navbar2';
import { Link } from "react-router-dom";
const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/auth/users')
      .then((response) => response.json())
      .then((data) => {
        console.log('User data:', data);
        setUsers(data && Array.isArray(data.userNames) ? data.userNames : []);
      })
      .catch((error) => console.error('Error retrieving user details:', error));

    fetch('http://localhost:3001/api/auth/orders')
      .then((response) => response.json())
      .then((data) => {
        console.log('Order data:', data);
        setOrders(data && Array.isArray(data.orderDetails) ? data.orderDetails : []);
      })
      .catch((error) => console.error('Error retrieving order details:', error));
  }, []);

  return (
    <div className="admin-panel">
      <h1 className="admin-panel__title">Admin Panel</h1>
      <Link className="navbar-brand fs-1 fst-italic" to="/">
        <Navbar2 className='navbar' />
        </Link>
      <div className="admin-panel__section">
        <form className="user-form">
          <h3 className="admin-panel__section-title">User Details:</h3>
          <ul className="admin-panel__list">
            {users.map((userName, index) => (
              <li className="admin-panel__list-item" key={index}>{userName}</li>
            ))}
          </ul>
        </form>

        <form className="order-form">
          <h3 className="admin-panel__section-title">Order Details:</h3>
          {orders.map((order, index) => (
            <div key={index} className="order-details">
              <h4>Email: {order.email}</h4>
              <ul className="admin-panel__list">
                {order.orders.map((orderItem, itemIndex) => (
                  <li className="admin-panel__list-item" key={itemIndex}>
                    <div>Order Date: {orderItem.Order_date}</div>
                    <div>Name: {orderItem.name}</div>

              
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
