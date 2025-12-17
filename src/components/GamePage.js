// src/components/GamesPage.jsx
import React from 'react';
import './GamePage.css';

// Sample data for your games. You can easily add more games here.
// Provide direct links to the app's built-in activities
const gamesData = [
  {
    key: 'riddles',
    title: { English: 'Riddle Quiz', Tamil: 'மறுமொழி வினாடி' },
    description: { English: 'Solve fun riddles.', Tamil: 'வேடிக்கையான மறுமொழிகளை தீர்க்கவும்.' },
    imageUrl: 'https://i.ibb.co/8gQwV6y/riddle.png',
  },
  {
    key: 'funFacts',
    title: { English: 'Fun Facts', Tamil: 'சுவாரசியமான தகவல்கள்' },
    description: { English: 'Explore short science facts.', Tamil: 'சிறிய அறிவியல் தகவல்களை ஆராயுங்கள்.' },
    imageUrl: 'https://i.ibb.co/9y6k2QG/funfacts.png',
  },
  {
    key: 'spin',
    title: { English: 'Spin Wheel', Tamil: 'சுழற்சி சைக்கரம்' },
    description: { English: 'Try your luck and win rewards.', Tamil: 'உங்கள் அதிர்ஷ்டத்தைச் சோதிக்கவும் மற்றும் பரிசுகள் பெறுங்கள்.' },
    imageUrl: 'https://i.ibb.co/0sK0G2s/spinwheel.png',
  },
  {
    key: 'storyMenu',
    title: { English: 'Escape Room', Tamil: 'வரிசை அறை' },
    description: { English: 'Play escape room stories.', Tamil: 'வரிசை அறை கதைகளை விளையாடுங்கள்.' },
    imageUrl: 'https://i.ibb.co/7rKXkqT/escaperoom.png',
  }
];

const GamesPage = ({ language, setActivePage }) => {
  return (
    <div className="games-page-container">
      <header className="games-header">
        <h1>{language === "English" ? "All Games" : "அனைத்து விளையாட்டுகளும்"}</h1>
        <p>{language === "English" ? "Explore our full collection of science games and challenges!" : "அறிவியல் விளையாட்டுகள் மற்றும் சவால்களின் எங்களின் முழு தொகுப்பையும் ஆராயுங்கள்!"}</p>
      </header>

      <main className="games-grid">
        {gamesData.map((game) => (
          <div key={game.key} className="game-card">
            <img src={game.imageUrl} alt={`${game.title[language]} Game`} className="game-card-image" />
            <div className="game-card-content">
              <h3 className="game-card-title">{game.title[language]}</h3>
              <p className="game-card-description">{game.description[language]}</p>
              <button
                className="play-game-btn"
                onClick={() => setActivePage(game.key)}
              >
                {language === "English" ? "Play Now" : "இப்போது விளையாடுங்கள்"}
              </button>
            </div>
          </div>
        ))}
      </main>

      <button className="back-btn" onClick={() => setActivePage("home")}>
        {language === "English" ? "← Back to Home" : "← முகப்புப்பக்கத்திற்குத் திரும்பு"}
      </button>
    </div>
  );
};

export default GamesPage;