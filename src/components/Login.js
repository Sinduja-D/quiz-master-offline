import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin, language }) => {
  const [username, setUsername] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [existingUser, setExistingUser] = useState(null);
  
  // Load users from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('quizAppUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);
  
  // Check if username exists and get user details
  useEffect(() => {
    if (username.trim()) {
      const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
      setExistingUser(user || null);
      
      // If user exists and has school name, pre-fill it
      if (user && user.schoolName) {
        setSchoolName(user.schoolName);
      }
    } else {
      setExistingUser(null);
      setSchoolName('');
    }
  }, [username, users]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError(language === 'English' 
        ? 'Please enter your name' 
        : 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்');
      return;
    }
    
    if (!schoolName.trim()) {
      setError(language === 'English' 
        ? 'Please enter your school name' 
        : 'தயவுசெய்து உங்கள் பள்ளியின் பெயரை உள்ளிடவும்');
      return;
    }
    
    // Check if user exists
    let user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    // If user exists, update their school name if needed
    if (user) {
      // Update school name if it's different or missing
      if (user.schoolName !== schoolName.trim()) {
        user.schoolName = schoolName.trim();
        
        // Update the user in the users array
        const updatedUsers = users.map(u => 
          u.id === user.id ? user : u
        );
        setUsers(updatedUsers);
        localStorage.setItem('quizAppUsers', JSON.stringify(updatedUsers));
      }
    } else {
      // If user doesn't exist, create a new one
      const newUser = {
        id: Date.now(),
        username: username.trim(),
        schoolName: schoolName.trim(),
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
            ? 'Please enter your details to continue' 
            : 'தொடர்வதற்கு தயவுசெய்து உங்கள் விவரங்களை உள்ளிடவும்'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              {language === 'English' ? 'Your Name' : 'உங்கள் பெயர்'} <span className="required">*</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={language === 'English' ? 'Enter your name' : 'உங்கள் பெயரை உள்ளிடவும்'}
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="schoolName">
              {language === 'English' ? 'School Name' : 'பள்ளி பெயர்'} <span className="required">*</span>
            </label>
            <input
              type="text"
              id="schoolName"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder={language === 'English' ? 'Enter your school name' : 'உங்கள் பள்ளியின் பெயரை உள்ளிடவும்'}
            />
            {existingUser && !existingUser.schoolName && (
              <div className="info-message">
                {language === 'English' 
                  ? 'Welcome back! Please enter your school name to continue.' 
                  : 'மீண்டும் வரவேற்கிறோம்! தொடர்வதற்கு உங்கள் பள்ளியின் பெயரை உள்ளிடவும்.'}
              </div>
            )}
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            {language === 'English' ? 'Start Exploring' : 'ஆரம்பிக்கவும்'}
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