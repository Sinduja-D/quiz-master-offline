import React from 'react';

const Navbar = ({ language, activePage, setActivePage, toggleLanguage }) => {
  const navItems = ['home', 'about', 'contact', 'help'];
  
  const getNavLabel = (page) => {
    if (language === 'English') return page.charAt(0).toUpperCase() + page.slice(1);
    switch(page) {
      case 'home': return 'முகப்பு';
      case 'about': return 'எங்களைப் பற்றி';
      case 'contact': return 'தொடர்பு';
      case 'help': return 'உதவி';
      default: return page;
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">🧠</span>
        <span className="brand-name">{language === 'English' ? 'Quiz Master' : 'வினா மாஸ்டர்'}</span>
      </div>
      <div className="nav-links">
        {navItems.map(page => (
          <button 
            key={page} 
            className={`nav-link ${activePage === page ? 'active' : ''}`} 
            onClick={() => setActivePage(page)}
          >
            {getNavLabel(page)}
          </button>
        ))}
      </div>    
      <div className="nav-actions">
        <button 
          className={`nav-link ${activePage === 'profile' ? 'active' : ''}`} 
          onClick={() => setActivePage('profile')}
        >
          <span className="profile-icon">👤</span>
          <span>{language === 'English' ? 'Profile' : 'சுயவிவரம்'}</span>
        </button>
        <button onClick={toggleLanguage} className="lang-btn">
          {language === 'English' ? 'தமிழ்' : 'English'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;