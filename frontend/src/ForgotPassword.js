import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async () => {
    try {
      await axios.post('http://localhost:3001/api/aut/forgot-password', { email });
      setIsEmailSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = () => {
    return (
      <div>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={handleResetPassword}>Send Reset Link</button>
      </div>
    );
  };

  const renderEmailSent = () => {
    return (
      <div>
        <h2>Reset Link Sent</h2>
        <p>An email with a reset link has been sent to {email}.</p>
      </div>
    );
  };

  return (
    <div>
      {isEmailSent ? renderEmailSent() : renderForm()}
    </div>
  );
};

export default ForgotPassword;
