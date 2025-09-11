import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageRenderer from "./components/PageRenderer";
import Login from "./components/Login.js";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [language, setLanguage] = useState("English");
  const [user, setUser] = useState(null);
  const [isQuizInProgress, setIsQuizInProgress] = useState(false);

  // Load saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "English" ? "Tamil" : "English"));
  };

  useEffect(() => {
    document.documentElement.lang = language === "Tamil" ? "ta" : "en";
  }, [language]);

  const handleLogin = (userData) => {
    setUser(userData);
    setActivePage("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setActivePage("home");
  };

  // Not logged in → go to login screen
  if (!user) {
    return <Login onLogin={handleLogin} language={language} toggleLanguage={toggleLanguage} />;
  }

  // Logged in → render normal layout
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
          toggleLanguage={toggleLanguage}
          candidateName={user.username}
          setIsQuizInProgress={setIsQuizInProgress}
        />
      </main>
      <Footer language={language} />
    </div>
  );
}

export default App;