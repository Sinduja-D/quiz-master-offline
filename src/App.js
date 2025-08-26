
// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import reportWebVitals from './reportWebVitals';
import QuizSetup from './components/QuizSetup';
import Quiz from './components/Quiz';
import QuizResults from './components/QuizResults';
import FunFacts from './components/FunFacts';



function App() {
  const [language, setLanguage] = useState('English');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [userProfile, setUserProfile] = useState({
    username: 'QuizUser123',
    memberSince: 'Jan 2025',
    totalPoints: 1250,
    totalQuizzes: 24,
    averageScore: 78,
    achievements: 5
  });

  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'Tamil' : 'English');
  };

  {/*const levels = [
    { id: 'beginner', name: { English: 'Beginner', Tamil: 'தொடக்க' }, color: '#4CAF50', icon: '🌱', grade: 'Grades 6-7' },
    { id: 'intermediate', name: { English: 'Intermediate', Tamil: 'இடைநிலை' }, color: '#2196F3', icon: '🚀', grade: 'Grades 8-10' },
    { id: 'advanced', name: { English: 'Advanced', Tamil: 'மேம்பட்ட' }, color: '#9C27B0', icon: '🏆', grade: 'Grades 11-12' }
  ];*/}
  const levels = [
  {
    id: 'beginner',
    name: { English: 'Beginner', Tamil: 'தொடக்க' },
    color: '#4CAF50',
    icon: '🌱',
    grade: { English: 'Grades 6-7', Tamil: '6-7ஆம் வகுப்பு' }
  },
  {
    id: 'intermediate',
    name: { English: 'Intermediate', Tamil: 'இடைநிலை' },
    color: '#2196F3',
    icon: '🚀',
    grade: { English: 'Grades 8-10', Tamil: '8-10ஆம் வகுப்பு' }
  },
  {
    id: 'advanced',
    name: { English: 'Advanced', Tamil: 'மேம்பட்ட' },
    color: '#9C27B0',
    icon: '🏆',
    grade: { English: 'Grades 11-12', Tamil: '11-12ஆம் வகுப்பு' }
  }
];

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setQuizSettings({
      language,
      level: level.id,
      numberOfQuestions: 10
    });
    setActivePage('quizSetup');
  };

  const handleStartQuiz = (numberOfQuestions,subject,grade) => {
    setQuizSettings({
      ...quizSettings,
      numberOfQuestions,
      subject,
      grade
    });
    setActivePage('quiz');
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setActivePage('results');
    
    // Update user profile
    const pointsEarned = results.correctAnswers * 10;
    setUserProfile(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + pointsEarned,
      totalQuizzes: prev.totalQuizzes + 1,
      averageScore: Math.round((prev.averageScore * prev.totalQuizzes + 
        (results.correctAnswers / results.totalQuestions) * 100) / (prev.totalQuizzes + 1))
    }));
  };

  const handleRestartQuiz = () => {
    setActivePage('quiz');
  };

  const handleBackToHome = () => {
    setActivePage('home');
    setSelectedLevel(null);
    setQuizResults(null);
  };

  const handleFeatureCardClick = (feature) => {
    // Handle feature card clicks
    if (feature === 'profile') {
      setActivePage('profile');
    } else if (feature === 'help') {
      setActivePage('help');
    }
  };

  useEffect(() => {
    document.title = language === 'English' ? 'Quiz Master' : 'வினா மாஸ்டர்';
  }, [language]);

  const renderPageContent = () => {
    switch(activePage) {
      case 'home':
        return (
          <>
            <div className="quiz-header">
              <h1>{language === 'English' ? 'Quiz Master' : 'வினா மாஸ்டர்'}</h1>
              <p>{language === 'English' ? 'Test your knowledge!' : 'உங்கள் அறிவை சோதிக்கவும்!'}</p>
            </div>
            
            <div className="level-selection">
              <h2>{language === 'English' ? 'Select Difficulty Level' : 'சிரம நிலையைத் தேர்ந்தெடுக்கவும்'}</h2>
              <div className="level-buttons">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    className="level-btn"
                    style={{ backgroundColor: level.color }}
                    onClick={() => handleLevelSelect(level)}
                  >
                    <span className="level-icon">{level.icon}</span>
                    <span className="level-name">{level.name[language]}</span>
                    <span className="level-grade">{level.grade[language]}</span>
                  </button>
                ))}
              </div>
            </div>
            
           {/*} <div className="features">
              <div className="feature-card" onClick={() => handleFeatureCardClick('profile')}>
                <div className="icon">🏆</div>
                <h3>{language === 'English' ? 'Earn Points' : 'புள்ளிகள் பெறுங்கள்'}</h3>
                <p>{language === 'English' ? 'Track your progress' : 'உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும்'}</p>
              </div>
              <div className="feature-card" onClick={() => handleFeatureCardClick('help')}>
                <div className="icon">🌍</div>
                <h3>{language === 'English' ? 'Bilingual Support' : 'இருமொழி ஆதரவு'}</h3>
                <p>{language === 'English' ? 'Seamless language switching' : 'சீரான மொழி மாற்றம்'}</p>
              </div>
              <div className="feature-card" onClick={() => handleFeatureCardClick('profile')}>
                <div className="icon">📊</div>
                <h3>{language === 'English' ? 'Progress Tracking' : 'முன்னேற்றக் கண்காணிப்பு'}</h3>
                <p>{language === 'English' ? 'Monitor your improvement' : 'உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும்'}</p>
              </div>
            </div>*/}

           <div className="extra-features">
  <h2>{language === 'English' ? 'More Features' : 'கூடுதல் அம்சங்கள்'}</h2>
  <div className="feature-buttons">
    <button onClick={() => setActivePage('achievements')} className="feature-btn">🏅 {language === 'English' ? 'Achievements' : 'சாதனைகள்'}</button>
    <button onClick={() => setActivePage('leaderboard')} className="feature-btn">📊 {language === 'English' ? 'Leaderboard' : 'முன்னணி பட்டியல்'}</button>
    <button onClick={() => setActivePage('funFacts')} className="feature-btn">💡 {language === 'English' ? 'Fun Facts' : 'சுவாரஸ்யங்கள்'}</button>

  </div>
</div>

          </>
        );
      case 'about':
        return (
          <div className="page-content">
            <h2>{language === 'English' ? 'About Us' : 'எங்களைப் பற்றி'}</h2>
            <p>
              {language === 'English' 
                ? '🚀 Quiz Master makes learning fun! We bring science alive through interactive quizzes in Tamil & English, helping every student learn with joy and confidence.'
                : '🚀வினா மாஸ்டர் கற்றலை சுவாரஸ்யமாக்குகிறது! அறிவியலை தமிழ் & ஆங்கிலம் வழியாக விளையாட்டுப் பாணியில் கற்றுத்தருகிறது, ஒவ்வொரு மாணவரும் மகிழ்ச்சியுடன் நம்பிக்கையுடன் கற்க உதவுகிறது.'}
            </p>
          </div>
        );
      case 'contact':
        return (
          <div className="page-content">
            <h2>{language === 'English' ? 'Contact Us' : 'எங்களை தொடர்பு கொள்ள'}</h2>
            <p>
              {language === 'English' 
                ? 'Email: science@quizmaster.com'
                : 'மின்னஞ்சல்: science@quizmaster.com'}
            </p>
            <p>
              {language === 'English' 
                ? 'Phone: 91+ 7823047037'
                : 'தொலைபேசி:  91+ 7823047037'}
            </p>
            <p>
              {language === 'English' 
                ? 'Address:R.M.K. ENGINEERING COLLEGE'
                : 'முகவரி: ஆர்.எம்.கே. பொறியியல் கல்லூரி'}
            </p>
          </div>
        );
      case 'help':
        return (
          <div className="page-content">
            <h2>{language === 'English' ? 'Help & Support' : 'உதவி மற்றும் ஆதரவு'}</h2>
            <p>
              {language === 'English' 
                ? '1. Select your preferred difficulty level to start a quiz.'
                : '1. வினாத்திட்டத்தைத் தொடங்க உங்களுக்கு விருப்பமான சிரம நிலையைத் தேர்ந்தெடுக்கவும்.'}
            </p>
            <p>
              {language === 'English' 
                ? '2. Answer questions to earn points and track your progress.'
                : '2. புள்ளிகள் பெறவும் உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும் கேள்விகளுக்கு பதிலளிக்கவும்.'}
            </p>
            <p>
              {language === 'English' 
                ? '3. Switch between languages using the toggle in the navigation bar.'
                : '3. வழிசெலுத்தல் பட்டியில் உள்ள டோகிளைப் பயன்படுத்தி மொழிகளுக்கு இடையே மாறவும்.'}
            </p>
          </div>
        );
      case 'profile':
        return (
          <div className="page-content">
            <h2>{language === 'English' ? 'User Profile' : 'பயனர் சுயவிவரம்'}</h2>
            <div className="profile-info">
              <div className="profile-avatar">👤</div>
              <div className="profile-details">
                <p><strong>{language === 'English' ? 'Username:' : 'பயனர்பெயர்:'}</strong> {userProfile.username}</p>
                <p><strong>{language === 'English' ? 'Member Since:' : 'உறுப்பினர் முதல்:'}</strong> {userProfile.memberSince}</p>
                <p><strong>{language === 'English' ? 'Total Points:' : 'மொத்த புள்ளிகள்:'}</strong> {userProfile.totalPoints}</p>
              </div>
            </div>
            <div className="profile-stats">
              <h3>{language === 'English' ? 'Quiz Statistics' : 'வினா புள்ளிவிவரங்கள்'}</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{userProfile.totalQuizzes}</div>
                  <div className="stat-label">{language === 'English' ? 'Quizzes Taken' : 'எடுத்த வினாக்கள்'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{userProfile.averageScore}%</div>
                  <div className="stat-label">{language === 'English' ? 'Average Score' : 'சராசரி மதிப்பெண்'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{userProfile.achievements}</div>
                  <div className="stat-label">{language === 'English' ? 'Achievements' : 'சாதனைகள்'}</div>
                </div>
              </div>
            </div>
          </div>
        );
              case 'profile':
        return (
          <div className="page-content">
            ...
          </div>
        );

      // ⬇️ Paste here
      case 'achievements':
        return (
          <div className="page-content">
            <h2>{language === 'English' ? 'Achievements' : 'சாதனைகள்'}</h2>
            <ul>
              <li>🏆 {language === 'English' ? 'First Quiz Completed' : 'முதல் வினா முடிக்கப்பட்டது'}</li>
              <li>🔥 {language === 'English' ? '3 Correct Answers in a Row' : 'மூன்று தொடர்ச்சியான சரியான பதில்கள்'}</li>
              <li>💯 {language === 'English' ? '100 Points Earned' : '100 புள்ளிகள் பெற்றது'}</li>
            </ul>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="page-content">
            <h2>{language === 'English' ? 'Leaderboard' : 'முன்னணி பட்டியல்'}</h2>
            <ol>
              <li>👑 User1 – 2500 pts</li>
              <li>🥈 User2 – 2000 pts</li>
              <li>🥉 User3 – 1800 pts</li>
            </ol>
          </div>
        );

     /*case 'funFacts':
  return (
    <div className="page-content">
      <h2>{language === 'English' ? 'Fun Science Facts' : 'அறிவியல் சுவாரஸ்யங்கள்'}</h2>
      <ul>
        <li>🌍 {language === 'English' ? 'Bananas are berries, but strawberries are not!' : 'வாழைப்பழம் பேரிக்காய், ஆனால் ஸ்ட்ராபெரி அல்ல!'}</li>
        <li>⚡ {language === 'English' ? 'Lightning is five times hotter than the Sun’s surface.' : 'மின்னல் சூரியன் மேற்பரப்பை விட ஐந்து மடங்கு சூடானது.'}</li>
        <li>🧬 {language === 'English' ? 'Your DNA could stretch from the Earth to the Sun and back 600 times!' : 'உங்கள் டி.என்.ஏ. பூமியிலிருந்து சூரியன் வரை சென்று 600 முறை திரும்ப முடியும்!'}</li>
      </ul>
    </div>
  );*/
case 'funFacts':
  return <FunFacts language={language} />;


      case 'quizSetup':
        return (
          <QuizSetup 
            language={language}
            level={selectedLevel.id}
            onStartQuiz={handleStartQuiz}
            onBack={handleBackToHome}
          />
        );
      case 'quiz':
        return (
          <Quiz 
            language={quizSettings.language}
            level={quizSettings.level}
            subject={quizSettings.subject}
            grade={quizSettings.grade}
            numberOfQuestions={quizSettings.numberOfQuestions}
            onQuizComplete={handleQuizComplete}
            onBack={handleBackToHome}
          />
        );
      case 'results':
        return (
          <QuizResults 
            results={quizResults}
            language={language}
            onRestart={handleRestartQuiz}
            onHome={handleBackToHome}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-icon">🧠</span>
          <span className="brand-name">  {language === 'English' ? 'Quiz Master' : 'வினா மாஸ்டர்'}</span>
        </div>

        <div className="nav-links">
          <button 
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => setActivePage('home')}
          >
            {language === 'English' ? 'Home' : 'முகப்பு'}
          </button>
          <button 
            className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => setActivePage('about')}
          >
            {language === 'English' ? 'About Us' : 'எங்களைப் பற்றி'}
          </button>
          <button 
            className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
            onClick={() => setActivePage('contact')}
          >
            {language === 'English' ? 'Contact' : 'தொடர்பு'}
          </button>
          <button 
            className={`nav-link ${activePage === 'help' ? 'active' : ''}`}
            onClick={() => setActivePage('help')}
          >
            {language === 'English' ? 'Help' : 'உதவி'}
          </button>
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
      
      <main className="main-content">
        {renderPageContent()}
      </main>
      
      <footer>
        <p>{language === 'English' ? '© 2025 Quiz Master App' : '© 2025 வினா மாஸ்டர் பயன்பாடு'}</p>
      </footer>
    </div>
  );
}

reportWebVitals();
export default App;
