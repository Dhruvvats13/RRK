import React, { useState } from "react";
import './Payment.css'
import { useNavigate } from 'react-router-dom'
const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/auth/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardNumber,
        expiryDate,
        cvv,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Payment successful!");
        navigate('/myOrder')
        
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='Payment'>
      <div className="auth-form-container">
    <form onSubmit={handleSubmit}>
      <h2>Payment Information</h2>
      <label >Card Number:
      <input
        type="text"
        id="cardNumber"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      /></label>
      <br />

      <label >Expiry Date:
      <input
        type="text"
        id="expiryDate"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      /></label>
      <br />

      <label >CVV:
      <input
        type="text"
        id="cvv"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      /></label>
      <br />

      <button type="submit">Pay Now</button>
    </form>
    </div>
    </div>
  );
};

export default Payment;
