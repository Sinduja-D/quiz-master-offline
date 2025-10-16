// src/components/AboutPage.jsx
import React from 'react';
import './AboutPage.css';

const AboutPage = ({ language }) => {
  const content = {
    english: {
      title: "About Our App",
      sections: [
        {
          heading: "Our Mission",
          content: "VigyaanXpo is dedicated to make learning fun, interactive, and accessible to everyone. We believe that education should be engaging and that quizzes are one of the most effective ways to reinforce knowledge and track progress."
        },
        {
          heading: "What We Offer",
          content: "• Interactive quizzes across multiple subjects and difficulty levels\n• Personalized learning experience with progress tracking\n• Achievement system to motivate continued learning\n• Competitive leaderboard to challenge yourself against others\n• Bilingual support (English and Tamil) for wider accessibility"
        },
        {
          heading: "Educational Value",
          content: "Our quizzes are designed by educators to align with curriculum standards. Each question includes explanations and concepts to help users understand not just the correct answer, but the concept behind it. This approach promotes deeper learning and knowledge retention."
        },
        {
          heading: "Technology",
          content: "Built with modern web technologies, This app provides a seamless experience across devices. Our responsive design ensures you can learn whether you're on a computer, smartphone."
        },
        {
          heading: "Our Team",
          content: "VigyaanXpo developed by a passionate team of educators, developers, and designers who believe in the power of technology to transform education. We're constantly working to improve and expand our platform based on user feedback."
        },
        {
          heading: "Outcomes",
          content: "Users of VigyaanXpo report significant improvements in their knowledge retention, test scores, and overall confidence in the subjects they study. Our platform will help thousands of students achieve their educational goals and develop a love for learning."
        }
      ]
    },
    tamil: {
      title: "எங்கள் செயலியைப் பற்றி",
      sections: [
        {
          heading: "எங்கள் பணி",
          content: "கற்றலை சுவாரஸ்யமாகவும், ஊடாடும் தன்மை கொண்டதுமாகவும், அனைவருக்கும் அணுகக்கூடியதாகவும் மாற்றுவதே இந்த செயலி நோக்கம். கல்வி ஈர்க்கக்கூடியதாக இருக்க வேண்டும் என்றும், வினாத்திட்டங்கள் அறிவை வலுப்படுத்தவும் முன்னேற்றத்தைக் கண்காணிக்கவும் மிகவும் பயனுள்ள வழிகளில் ஒன்று என்று நாங்கள் நம்புகிறோம்."
        },
        {
          heading: "எங்கள் சேவைகள்",
          content: "• பல பாடங்கள் மற்றும் சிரம நிலைகளில் ஊடாடும் வினாத்திட்டங்கள்\n• முன்னேற்றக் கண்காணிப்புடன் தனிப்பயனாக்கப்பட்ட கற்றல் அனுபவம்\n• தொடர்ந்த கற்றலை ஊக்குவிக்கும் சாதனை அமைப்பு\n• மற்றவர்களுடன் போட்டியிட உங்களை சவாலுக்கு உட்படுத்தும் முன்னணி பட்டியல்\n• அதிக அணுகல் தன்மைக்கு இருமொழி ஆதரவு (ஆங்கிலம் மற்றும் தமிழ்)"
        },
        {
          heading: "கல்வி மதிப்பு",
          content: "பாடத்திட்ட தரநிலைகளுடன் ஒத்திசைக்க கல்வியாளர்களால் வடிவமைக்கப்பட்டவை எங்கள் வினாத்திட்டங்கள். சரியான பதில் மட்டுமல்லாமல், அதற்கு பின்னால் உள்ள காரணத்தைப் புரிந்துகொள்ள பயனர்களுக்கு உதவ ஒவ்வொரு கேள்வியும் விளக்கங்கள் மற்றும் கருத்துக்களை உள்ளடக்கியது. இந்த அணுகுமுறை ஆழமான கற்றல் மற்றும் அறிவைத் தக்கவைத்தலை ஊக்குவிக்கிறது."
        },
        {
          heading: "தொழில்நுட்பம்",
          content: "நவீன வலை தொழில்நுட்பங்களைப் பயன்படுத்தி உருவாக்கப்பட்ட இந்த செயலி, சாதனங்கள் முழுவதிலும் இயல்பான அனுபவத்தை வழங்குகிறது. நீங்கள் கணினி, ஸ்மார்ட்போனில் இருந்தாலும் கற்க முடியும் என்பதை உங்கள் பதிலளிக்கும் வடிவமைப்பு உறுதி செய்கிறது."
        },
        {
          heading: "எங்கள் குழு",
          content: "தொழில்நுட்பம் கல்வியை மாற்றும் சக்தி கொண்டது என்று நம்பும் கல்வியாளர்கள், உருவாக்கியவர்கள் மற்றும் வடிவமைப்பாளர்களின் ஆர்வமுள்ள குழுவால் இந்த செயலி உருவாக்கப்பட்டுள்ளது. பயனர் கருத்துக்களின் அடிப்படையில் எங்கள் தளத்தை மேம்படுத்தவும் விரிவுபடுத்தவும் நாங்கள் தொடர்ந்து உழைக்கிறோம்."
        },
        {
          heading: "முடிவுகள்",
          content: "VigyaanXpo பயனர்கள் அறிவைத் தக்கவைத்தல், தேர்வு மதிப்பெண்கள் மற்றும் அவர்கள் படிக்கும் பாடங்களில் ஒட்டுமொத்த நம்பிக்கை ஆகியவற்றில் குறிப்பிடத்தக்க முன்னேற்றத்தைக் காண்கிறார்கள். எங்கள் தளம் ஆயிரக்கணக்கான மாணவர்கள் தங்கள் கல்வி இலக்குகளை அடையவும், கற்றல் மீதான விருப்பத்தை வளர்க்கவும் உதவும்."
        }
      ]
    }
  };
  const pageContent = language === "English" ? content.english : content.tamil;
  return (
    <div className="about-page">
      <h1 className="page-title">{pageContent.title}</h1>
      
      <div className="about-content">
        {pageContent.sections.map((section, index) => (
          <div key={index} className="about-section">
            <h2 className="section-title">{section.heading}</h2>
            <div className="section-content">
              {section.content.split('\n').map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="about-values">
        <h2 className="values-title">
          {language === "English" ? "Our Core Values" : "எங்கள் மைய மதிப்புகள்"}
        </h2>
        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon">🎯</div>
            <h3>{language === "English" ? "Excellence" : "சிறப்பு"}</h3>
            <p>{language === "English" 
              ? "Committed to providing high-quality educational content" 
              : "தரமான கல்வி உள்ளடக்கத்தை வழங்க உறுதி அளிக்கிறோம்"}
            </p>
          </div>
          <div className="value-item">
            <div className="value-icon">🌱</div>
            <h3>{language === "English" ? "Growth" : "வளர்ச்சி"}</h3>
            <p>{language === "English" 
              ? "Supporting continuous learning and improvement" 
              : "தொடர்ச்சியான கற்றல் மற்றும் மேம்பாட்டை ஆதரித்தல்"}
            </p>
          </div>
          <div className="value-item">
            <div className="value-icon">🤝</div>
            <h3>{language === "English" ? "Community" : "சமூகம்"}</h3>
            <p>{language === "English" 
              ? "Building a supportive learning community" 
              : "ஆதரவு கொண்ட கற்றல் சமூகத்தை உருவாக்குதல்"}
            </p>
          </div>
          <div className="value-item">
            <div className="value-icon">💡</div>
            <h3>{language === "English" ? "Innovation" : "புதுமை"}</h3>
            <p>{language === "English" 
              ? "Embracing new ideas and technologies" 
              : "புதிய யோசனைகள் மற்றும் தொழில்நுட்பங்களை ஏற்றுக்கொள்வது"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;