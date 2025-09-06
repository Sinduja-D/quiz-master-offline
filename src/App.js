import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageRenderer from "./components/PageRenderer";
import Login from "./components/Login.js";
import SplashScreen from "./components/SplashScreen.js";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [language, setLanguage] = useState("English");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  // Load saved user & splash
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // splash hides after 2s
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    setIsLoading(false);
    return () => clearTimeout(splashTimer);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "English" ? "Tamil" : "English"));
  };

  const handleLogin = (userData) => {
    // Login.js passes user object with username, schoolName, etc.
    setUser(userData);
    // optionally jump straight to quiz or keep home
    setActivePage("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setActivePage("home");
  };

  if (isLoading || showSplash) {
    return <SplashScreen />;
  }

  // Not logged in → go to login screen
  if (!user) {
    return <Login onLogin={handleLogin} language={language} />;
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
          candidateName={user.username}   /* ✅ pass username to pages */
        />
      </main>

      <Footer language={language} />
    </div>
  );
}

export default App;
