// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="container">
          <h1 className="brand">Expense Tracker</h1>
          <div className="nav-links">
            <Link to="/signup" className="nav-button">Sign Up</Link>
            <Link to="/login" className="nav-button">Login</Link>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <h1 className="main-heading">Track Your Expenses Effortlessly</h1>
        <p className="sub-heading">Easily manage your budget and keep track of your spending with our intuitive app.</p>
      </main>
    </div>
  );
};

export default LandingPage;
