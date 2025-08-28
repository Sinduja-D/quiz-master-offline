import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageRenderer from "./components/PageRenderer";
import './App.css';

function App() {
  const [activePage, setActivePage] = useState("home");
  const [language, setLanguage] = useState("English");
  const toggleLanguage = () => {
    setLanguage(language === "English" ? "Tamil" : "English");
  };
  return (
    <div className="app-container">
      <Navbar
        language={language}
        activePage={activePage}
        setActivePage={setActivePage}
        toggleLanguage={toggleLanguage}
      />
      <main className="page-container">
        <PageRenderer 
          language={language} 
          activePage={activePage} 
          setActivePage={setActivePage} 
        />
      </main>
      <Footer language={language} />
    </div>
  );
}
export default App;