import React from 'react';
import logo from '../assets/logo.png';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={logo} alt="" className="logo" />
    </div>
  );
};

export default SplashScreen;