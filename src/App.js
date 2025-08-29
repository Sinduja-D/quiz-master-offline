// src/App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageRenderer from "./components/PageRenderer";
import Login from "./components/Login.js";
import './App.css';

function App() {
  const [activePage, setActivePage] = useState("home");
  const [language, setLanguage] = useState("English");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "English" ? "Tamil" : "English");
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setActivePage("home");
  };

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} language={language} />;
  }

  return (
    <div className="app-container">
      <Navbar
        language={language}
        activePage={activePage}
        setActivePage={setActivePage}
        toggleLanguage={toggleLanguage}
        user={user}
        onLogout={handleLogout}
      />
      <main className="page-container">
        <PageRenderer 
          language={language} 
          activePage={activePage} 
          setActivePage={setActivePage}
          user={user}
          updateUser={setUser}
        />
      </main>
      <Footer language={language} />
    </div>
  );
}

export default App;