// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin, language }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  // Load users from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('quizAppUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError(language === 'English' 
        ? 'Please enter your name' 
        : 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்');
      return;
    }

    // Check if user exists
    let user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    // If user doesn't exist, create a new one
    if (!user) {
      const newUser = {
        id: Date.now(),
        username: username.trim(),
        memberSince: new Date().toLocaleDateString(),
        totalPoints: 0,
        totalQuizzes: 0,
        averageScore: 0,
        achievements: [],
        quizHistory: []
      };
      
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('quizAppUsers', JSON.stringify(updatedUsers));
      user = newUser;
    }

    // Save current user to localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{language === 'English' ? 'Welcome to Quiz Master' : 'வினா மாஸ்டரிற்கு வரவேற்கிறோம்'}</h2>
          <p>{language === 'English' 
            ? 'Please enter your name to continue' 
            : 'தொடர்வதற்கு தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              {language === 'English' ? 'Your Name' : 'உங்கள் பெயர்'}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={language === 'English' ? 'Enter your name' : 'உங்கள் பெயரை உள்ளிடவும்'}
              autoFocus
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <button type="submit" className="login-button">
            {language === 'English' ? 'Start Quiz' : 'வினாவைத் தொடங்கு'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>{language === 'English' 
            ? 'Your progress will be saved locally on this device' 
            : 'உங்கள் முன்னேற்றம் இந்த சாதனத்தில் உள்ளூராகச் சேமிக்கப்படும்'}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;