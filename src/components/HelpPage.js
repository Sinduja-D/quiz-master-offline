
import React from 'react';
import './HelpPage.css';

const HelpPage = ({ language }) => {
  const helpContent = {
    english: {
      title: " Help & Guide",
      sections: [
        {
          heading: "Welcome to our app!",
          content: "This app is an interactive educational platform designed to test your knowledge across various subjects. With multiple difficulty levels, detailed performance tracking, and a competitive leaderboard, it offers a comprehensive learning experience."
        },
        {
          heading: "Getting Started",
          content: "1. Login with your username to access the app.\n2. Select a difficulty level (Beginner, Intermediate, or Advanced).\n3. Choose your subject and grade level.\n4. Set the number of questions and start the quiz."
        },
        {
          heading: "Taking Quizzes",
          content: "• Read each question carefully and select the best answer.\n• Use hints if you're stuck (available for all questions).\n• Review concepts after answering to enhance learning.\n• Track your streak of correct answers for bonus achievements."
        },
        {
          heading: "Performance Tracking",
          content: "Your profile displays:\n• Total points earned\n• Number of quizzes taken\n• Average score percentage\n• Detailed quiz history with scores"
        },
        {
          heading: "Achievements System",
          content: "Unlock achievements by:\n• Completing your first quiz\n• Scoring 100% on any quiz\n• Getting 3 correct answers in a row\n• Earning 100 and 500 points\n• Becoming a Quiz Master (10 quizzes with 80%+ average)"
        },
        {
          heading: "Leaderboard",
          content: "Compete with other users on the leaderboard:\n• Ranked by total points earned\n• Top 3 players receive special recognition\n• Your position is highlighted for easy tracking\n• Updated in real-time as you earn points"
        },
        {
          heading: "Tips for Success",
          content: "• Start with easier difficulties to build confidence\n• Review concepts after incorrect answers\n• Focus on weak areas to improve your overall score\n• Challenge yourself with higher difficulties as you progress"
        }
      ]
    },
    tamil: {
      title: "உதவி & வழிகாட்டி",
      sections: [
        {
          heading: "இந்த செயலிக்கு வரவேற்கிறோம்!",
          content: "இந்த செயலி என்பது பல்வேறு பாடங்களில் உங்கள் அறிவைச் சோதிக்க வடிவமைக்கப்பட்ட ஒரு ஊடாடும் கல்வி தளம். பல சிரம நிலைகள், விரிவான செயல்திறன் கண்காணிப்பு மற்றும் போட்டி முன்னணி பட்டியல் ஆகியவற்றுடன், இது ஒரு விரிவான கற்றல் அனுபவத்தை வழங்குகிறது."
        },
        {
          heading: "தொடங்குதல்",
          content: "1. பயன்பாட்டை அணுக உங்கள் பயனர்பெயருடன் உள்நுழைக.\n2. ஒரு சிரம நிலையைத் தேர்ந்தெடுக்கவும் (தொடக்க, இடைநிலை, அல்லது மேம்பட்ட).\n3. உங்கள் பாடத்தையும் தர நிலையையும் தேர்ந்தெடுக்கவும்.\n4. கேள்விகளின் எண்ணிக்கையை அமைத்து வினாவைத் தொடங்கவும்."
        },
        {
          heading: "வினாக்கள் எடுப்பது",
          content: "• ஒவ்வொரு கேள்வியையும் கவனமாகப் படித்து சிறந்த பதிலைத் தேர்ந்தெடுக்கவும்.\n• சிக்கலாக இருந்தால் குறிப்புகளைப் பயன்படுத்தவும் (சில கேள்விகளுக்கு கிடைக்கும்).\n• கற்றலை மேம்படுத்த பதிலளித்த பிறகு கருத்துக்களைக் காணவும்.\n• போனஸ் சாதனைகளுக்கு சரியான பதில்களின் தொடர்ச்சியைக் கண்காணிக்கவும்."
        },
        {
          heading: "செயல்திறன் கண்காணிப்பு",
          content: "உங்கள் சுயவிவரம் காட்டும்:\n• மொத்தப் புள்ளிகள்\n• எடுத்துக்கொண்ட வினாக்களின் எண்ணிக்கை\n• சராசரி மதிப்பெண் சதவீதம்\n• வலுவான மற்றும் பலவீனமான பாடப் பகுதிகள்\n• மதிப்பெண்களுடன் விரிவான வினா வரலாறு"
        },
        {
          heading: "சாதனைகள் அமைப்பு",
          content: "சாதனைகளைத் திறக்க:\n• உங்கள் முதல் வினாவை முடித்ததும்\n• எந்தவொரு வினாவிலும் 100% மதிப்பெண் பெறுவதும்\n• தொடர்ச்சியாக 3 சரியான பதில்களைப் பெறுவதும்\n• 100 மற்றும் 500 புள்ளிகளைச் சம்பாதிப்பதும்\n• ஒரு வினா மாஸ்டராக மாறுவது (80%+ சராசரியுடன் 10 வினாக்கள்)"
        },
        {
          heading: "முன்னணி பட்டியல்",
          content: "முன்னணி பட்டியலில் மற்ற பயனர்களுடன் போட்டியிடுங்கள்:\n• சம்பாதித்த மொத்தப் புள்ளிகளின் அடிப்படையில் தரவரிசைப்படுத்தப்பட்டது\n* முதல் 3 வீரர்கள் சிறப்பு அங்கீகாரம் பெறுகிறார்கள்\n• உங்கள் நிலை எளிதாகக் கண்காணிக்க முன்னிலைப்படுத்தப்படுகிறது\n• நீங்கள் புள்ளிகளைச் சம்பாதிக்கும்போது நிகழ்நேரத்தில் புதுப்பிக்கப்படுகிறது"
        },
        {
          heading: "வெற்றிக்கான உதவிக்குறிப்புகள்",
          content: "• நம்பிக்கையை உருவாக்க எளிதான சிரம நிலைகளில் தொடங்கவும்\n• தவறான பதில்களுக்குப் பிறகு கருத்துக்களைக் காணவும்\n• உங்கள் தொடர்ச்சியைப் பராமரிக்க வழக்கமாக வினாக்களை எடுத்துக்கொள்ளுங்கள்\n• உங்கள் ஒட்டுமொத்த மதிப்பெண்ணை மேம்படுத்த பலவீனமான பகுதிகளில் கவனம் செலுத்தவும்\n• நீங்கள் முன்னேறும்போது அதிக சிரம நிலைகளுடன் உங்களைச் சவாலுக்கு உட்படுத்தவும்"
        }
      ]
    }
  };

  const content = language === "English" ? helpContent.english : helpContent.tamil;

  return (
    <div className="help-page">
      <h1 className="help-title">{content.title}</h1>
      
      <div className="help-content">
        {content.sections.map((section, index) => (
          <div key={index} className="help-section">
            <h2 className="section-heading">{section.heading}</h2>
            <div className="section-content">
              {section.content.split('\n').map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/*<div className="help-footer">
        <p>{language === "English" 
          ? "For additional support, contact our team through the Contact page." 
          : "கூடுதல் ஆதரவுக்கு, தொடர்பு பக்கம் வழியாக எங்கள் குழுவைத் தொடர்பு கொள்ளவும்."}
        </p>
      </div>*/}
    </div>
  );
};

export default HelpPage;