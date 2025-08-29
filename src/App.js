// src/App.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PageRenderer from './components/PageRenderer';
import './App.css';

function App() {
  const [language, setLanguage] = useState('English');
  const [activePage, setActivePage] = useState('home');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Create a default user
      const defaultUser = {
        id: 1,
        username: 'Guest User',
        memberSince: new Date().toLocaleDateString(),
        totalPoints: 0,
        totalQuizzes: 0,
        averageScore: 0,
        achievements: [],
        quizHistory: []
      };
      setUser(defaultUser);
      localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    }
    setIsLoading(false);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'Tamil' : 'English');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    // Create a default user again
    const defaultUser = {
      id: 1,
      username: 'Guest User',
      memberSince: new Date().toLocaleDateString(),
      totalPoints: 0,
      totalQuizzes: 0,
      averageScore: 0,
      achievements: [],
      quizHistory: []
    };
    setUser(defaultUser);
    localStorage.setItem('currentUser', JSON.stringify(defaultUser));
  };

  // Show loading screen while user is being initialized
  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar 
        language={language} 
        toggleLanguage={toggleLanguage}
        setActivePage={setActivePage}
        activePage={activePage}
        user={user}
        onLogout={handleLogout}
      />
      <div className="page-container">
        <PageRenderer 
          language={language} 
          activePage={activePage} 
          setActivePage={setActivePage}
          user={user}
          updateUser={updateUser}
          toggleLanguage={toggleLanguage}
        />
      </div>
      <footer>
        {language === 'English' ? '© 2023 Quiz Master. All rights reserved.' : '© 2023 வினா மாஸ்டர். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'}
      </footer>
    </div>
  );
}

export default App;