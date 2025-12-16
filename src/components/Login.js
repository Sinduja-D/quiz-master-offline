// Login.js
import React, { useState, useEffect } from 'react';
import './Login.css';
import tamilNaduLogo from '../assets/tamil-nadu-logo.png'; 
import rmkLogo from '../assets/rmk.gif';
import appLogo from '../assets/app-logo.png';

const Login = ({ onLogin, language, toggleLanguage }) => {
  const [username, setUsername] = useState('');
  const [schoolName, setSchoolName] = useState('');
    const [memberPlace, setmemberPlace] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const savedUsers = localStorage.getItem('quizAppUsers');
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
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
    if (!memberPlace.trim()) {
      setError(language === 'English'
        ? 'Please enter your place'
        : 'தயவுசெய்து உங்கள் இடத்தை உள்ளிடவும்');
      return;
    }
    
    const usernameExists = users.some(u =>
      u.username.toLowerCase() === username.toLowerCase()
    );
    
    if (usernameExists) {
      setError(language === 'English'
        ? 'This username is already taken. You cannot use it again.'
        : 'இந்த பெயர் ஏற்கனவே பயன்படுத்தப்பட்டுள்ளது. மீண்டும் பயன்படுத்த முடியாது.');
      return;
    }
    
    const newUser = {
      id: Date.now(),
      username: username.trim(),
      schoolName: schoolName.trim(),
      memberPlace: memberPlace.trim(),
      memberSince: new Date().toLocaleDateString(),
      totalPoints: 0,
      totalQuizzes: 0,
      averageScore: 0,
      achievements: [],
      achievementDates: {},
      quizHistory: [],
      lastDailyQuestionDate: null,
      lastDailyQuestionId: null,
      lastSpinWheelDate: null,
      spinWheelSecondChance: false,
      escapeRoomsCompleted: [],
      escapeRoomProgress: {}
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('quizAppUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    onLogin(newUser);
  };

  return (
    <div className="login-container">
      <div className="bg-decoration">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
      
      {/* Left Side - Hero Section */}
      <div className="hero-section">
        <div className="hero-box glass-effect">
          <div className="hero-header">
            <img src={tamilNaduLogo} alt="Tamil Nadu Logo" className="tamilnadu-logo" />
            <h1 className="hero-title">
              {language === "English"
                ? "SCIENCE PARK - TIRUVALLUR DISTRICT"
                : "அறிவியல் பூங்கா - திருவள்ளூர் மாவட்டம்"}
            </h1>
            <img src={rmkLogo} alt="R.M.K. Engineering College Logo" className="rmk-logo" />
          </div>
          
          <div className="college-info">
            <h3 className="designed-by">
              <h2>{language === 'English' ? 'Science Quiz for Young Achievers' : (<>இளைய சிந்தனையாளர்களுக்கான <br />அறிவியல் வினாடி வினா</>)}</h2>
              <br />
              {language === "English"
                ? "Designed and Compiled by"
                : "வடிவமைத்து உருவாக்கியவர்கள்"}
            </h3>
            <h2 className="college-name">
              {language === "English"
                ? "R.M.K. Engineering College"
                : "ஆர்.எம்.கே. பொறியியல் கல்லூரி"}
            </h2>
            <h4 className="institution-type">
              {language === "English"
              ? "(An Autonomous Institution)"
              : "(ஒரு தன்னாட்சி நிறுவனம்)"}
            </h4>
            <p className="hero-address">
              {language === "English"
                ? "R.S.M. Nagar, Kavaraipettai, Gummudipoondi Taluk, Tiruvallur District-601206"
                : "ஆர்.எஸ்.எம். நகர், கவரைப்பேட்டை, கும்மிடிப்பூண்டி வட்டம், திருவள்ளூர் மாவட்டம்-601206"}
            </p>
            
            <div className="developer-info">
              <p className="student-names">
                {language === "English"
                  ? "Developers: Sinduja D, Reethu P, Vijayalakshmi S R"
                  : "உருவாக்கியவர்கள்: சிந்துஜா டி, ரீத்து பெ, விஜயலட்சுமி சி.ரா"}
              </p>
              <h4 className="department-info">
                {language === "English"
                  ? "Department of Information Technology Batch [2023-2027]"
                  : "தகவல் தொழில்நுட்பத் துறை தொகுப்பு [2023-2027]"}
              </h4>
              <p className="mentor-name">
                {language === "English"
                  ? "Mentor: Ms. M. Rekha, M.E(Ph.D), Assistant Professor"
                  : "வழிகாட்டி: திருமதி.ம.ரேகா, M.E(Ph.D), உதவிப் பேராசிரியர்"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Login Section */}
      <div className="login-section">
        <div className="login-card glass-effect">
          <div className="login-header">
            <div className="app-title-row">
              <img src={appLogo} alt="App Logo" className="app-logo" />
              <h2 className="app-title">{language === 'English' ? 'VigyaanXpo' : 'VigyaanXpo'}</h2>
            </div>
            <p>
              {language === 'English'
                ? 'Please enter your details to continue'
                : 'தொடர்வதற்கு தயவுசெய்து உங்கள் விவரங்களை உள்ளிடவும்'}
            </p>
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
            </div>
            
            <div className="form-group">
              <label htmlFor="memberPlace">
                {language === 'English' ? 'Place' : 'இடம்'} <span className="required">*</span>
              </label>
              <input
                type="text"
                id="place"
                value={memberPlace}
                onChange={(e) => setmemberPlace(e.target.value)}
                placeholder={language === 'English' ? 'Enter your Place' : 'உங்கள் இடத்தை உள்ளிடவும்'}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-button">
              {language === 'English' ? 'Start Exploring' : 'ஆரம்பிக்கவும்'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>{language === 'English'
              ? 'Your progress will be saved locally on this device'
              : 'உங்கள் முன்னேற்றம் இந்த சாதனத்தில் உள்ளூர் முறையில் சேமிக்கப்படும்'}</p>
            <div className="language-toggle">
              <button 
                onClick={toggleLanguage} 
                className="language-button"
                type="button"
              >
                {language === 'English' ? 'தமிழ்' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
