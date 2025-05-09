//import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToAuth = () => {
    navigate('/auth');
  };

  return (
    <div className="home-container">
      <div className="content">
        <div className="buttons">
          <h1></h1>
          <button className="btn" onClick={goToAuth}>Get Started</button>
          <button className="btn btn-outline" onClick={goToAuth}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
