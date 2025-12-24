// src/components/AboutPage.jsx
import React from "react";
import "./AboutPage.css";

const AboutPage = ({ language }) => {
  const content = {
    english: {
      title: "About Our App",
      sections: [
        {
          heading: "Our Mission",
          content:
            "VigyaanXpo is dedicated to make learning fun, interactive, and accessible to everyone. We believe that education should be engaging and that quizzes are one of the most effective ways to reinforce knowledge and track progress.",
        },
        {
          heading: "What We Offer",
          content:
            "• Interactive quizzes across multiple subjects and difficulty levels\n• Personalized learning experience with progress tracking\n• Achievement system to motivate continued learning\n• Competitive leaderboard to challenge yourself against others\n• Bilingual support (English and Tamil) for wider accessibility",
        },
        {
          heading: "Educational Value",
          content:
            "Our quizzes are designed by educators to align with curriculum standards. Each question includes explanations and concepts to help users understand not just the correct answer, but the concept behind it.",
        },
        {
          heading: "Technology",
          content:
            "Built with modern web technologies, this app provides a seamless experience across devices.",
        },
        {
          heading: "Our Team",
          content:
            "VigyaanXpo is developed by a passionate team of educators, developers, and designers.",
        },
        {
          heading: "Outcomes",
          content:
            "Users report improvements in knowledge retention, test scores, and confidence.",
        },
      ],
    },
    tamil: {
      title: "எங்கள் செயலியைப் பற்றி",
      sections: [
        {
          heading: "எங்கள் பணி",
          content:
            "கற்றலை சுவாரஸ்யமாகவும், ஊடாடும் தன்மை கொண்டதுமாகவும் மாற்றுவதே எங்கள் நோக்கம்.",
        },
        {
          heading: "எங்கள் சேவைகள்",
          content:
            "• பல பாடங்களில் வினாத்திட்டங்கள்\n• முன்னேற்ற கண்காணிப்பு\n• சாதனை அமைப்பு\n• முன்னணி பட்டியல்\n• இருமொழி ஆதரவு",
        },
        {
          heading: "கல்வி மதிப்பு",
          content:
            "ஒவ்வொரு கேள்வியும் விளக்கங்களுடன் வழங்கப்படுகிறது.",
        },
        {
          heading: "தொழில்நுட்பம்",
          content:
            "நவீன வலை தொழில்நுட்பங்களால் உருவாக்கப்பட்டது.",
        },
        {
          heading: "எங்கள் குழு",
          content:
            "ஆர்வமுள்ள கல்வியாளர்கள் மற்றும் உருவாக்குநர்களால் உருவாக்கப்பட்டது.",
        },
        {
          heading: "முடிவுகள்",
          content:
            "மாணவர்கள் அறிவு மற்றும் நம்பிக்கையில் முன்னேற்றம் காண்கிறார்கள்.",
        },
      ],
    },
  };

  const pageContent =
    language === "English" ? content.english : content.tamil;

  return (
    /* ✅ Wrapper for fixed navbar & footer */
    <div className="about-page-wrapper">
      {/* ✅ Scrollable content only */}
      <div className="about-scroll-content">
        <div className="about-page">
          <h1 className="page-title">{pageContent.title}</h1>

          <div className="about-content">
            {pageContent.sections.map((section, index) => (
              <div key={index} className="about-section">
                <h2 className="section-title">{section.heading}</h2>
                <div className="section-content">
                  {section.content.split("\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="about-values">
            <h2 className="values-title">
              {language === "English"
                ? "Our Core Values"
                : "எங்கள் மைய மதிப்புகள்"}
            </h2>

            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">🎯</div>
                <h3>{language === "English" ? "Excellence" : "சிறப்பு"}</h3>
                <p>
                  {language === "English"
                    ? "High quality education"
                    : "தரமான கல்வி"}
                </p>
              </div>

              <div className="value-item">
                <div className="value-icon">🌱</div>
                <h3>{language === "English" ? "Growth" : "வளர்ச்சி"}</h3>
                <p>
                  {language === "English"
                    ? "Continuous learning"
                    : "தொடர்ச்சியான கற்றல்"}
                </p>
              </div>

              <div className="value-item">
                <div className="value-icon">🤝</div>
                <h3>{language === "English" ? "Community" : "சமூகம்"}</h3>
                <p>
                  {language === "English"
                    ? "Supportive learning"
                    : "ஆதரவு கற்றல்"}
                </p>
              </div>

              <div className="value-item">
                <div className="value-icon">💡</div>
                <h3>{language === "English" ? "Innovation" : "புதுமை"}</h3>
                <p>
                  {language === "English"
                    ? "New ideas & tech"
                    : "புதிய யோசனைகள்"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
