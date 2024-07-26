import React, { useState,useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // Check login status (example logic, adjust according to your auth logic)
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/auth/status');
        setIsLogin(response.data.isLogin);
      } catch (error) {
        console.error('Error checking login status', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-text">Job Search</div>
      <div className="navbar-buttons">
        {isLogin ? (
          <>
            <button className="navbar-button">Logout</button>
            <button className="navbar-button">Post</button>
            <button className="navbar-button">Manage</button>
          </>
        ) : (
          <>
            <button className="navbar-button">Login</button>
            <button className="navbar-button">Signup</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
