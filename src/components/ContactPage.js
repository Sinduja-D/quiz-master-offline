// src/components/ContactPage.jsx
import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teamMembers = [
    {
      name: { english: "Vijayalakshmi S.R", tamil: "விஜயலட்சுமி எஸ் ஆர்" },
      role: { english: "Database Developer", tamil: "தரவுத்தள உருவாக்குநர்" },
      phone: "+91 9444129301",
      email: "srvijayalakshmi14@gmail.com"
    },
    {
      name: { english: "Reethu P", tamil: "ரீத்து பெ" },
      role: { english: "UI/UX Designer", tamil: "UI/UX வடிவமைப்பாளர்" },
      phone: "+91 7824829706",
      email: "preethu.0306@gmail.com"
    },
    {
      name: { english: "Sinduja D", tamil: "சிந்துஜா டி" },
      role: { english: "Backend Developer", tamil: "பின்தள உருவாக்குநர்" },
      phone: "+91 7010966979",
      email: "sindujadilibabu@gmail.com"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare formData with access_key
    const submission = new FormData();
    submission.append("access_key", "c870004f-42e8-4f53-8da9-605edb58250d"); // Using your access key
    submission.append("name", formData.name);
    submission.append("email", formData.email);
    submission.append("subject", formData.subject);
    submission.append("message", formData.message);
    
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submission,
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsSubmitted(true);
        setIsSubmitting(false);
        
        // Reset form after success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      alert(
        language === "English"
          ? "Failed to send message. Please try again later."
          : "செய்தியை அனுப்ப முடியவில்லை. தயவுசெய்து பின்னர் முயற்சிக்கவும்."
      );
      setIsSubmitting(false);
    }
  };

  const content = {
    english: {
      title: "Contact Us",
      subtitle: "We'd love to hear from you!",
      formTitle: "Send us a message",
      teamTitle: "Our Development Team",
      formFields: {
        name: "Your Name",
        email: "Email Address",
        subject: "Subject",
        message: "Your Message",
        submit: "Send Message",
        submitting: "Sending..."
      },
      successMessage: "Thank you for your message! We'll get back to you soon.",
      
    },
    tamil: {
      title: "எங்களைத் தொடர்பு கொள்ள",
      subtitle: "உங்களிடமிருந்து கேட்க நாங்கள் விரும்புகிறோம்!",
      formTitle: "எங்களுக்கு ஒரு செய்தியை அனுப்பவும்",
      teamTitle: "எங்களின் மென்பொருள் உருவாக்கும் குழு",
      formFields: {
        name: "உங்கள் பெயர்",
        email: "மின்னஞ்சல் முகவரி",
        subject: "பொருள்",
        message: "உங்கள் செய்தி",
        submit: "செய்தியை அனுப்பு",
        submitting: "அனுப்புகிறது..."
      },
      successMessage: "உங்கள் செய்திக்கு நன்றி! விரைவில் உங்களைத் தொடர்பு கொள்வோம்.",
       
    }
  };

  const pageContent = language === "English" ? content.english : content.tamil;

  return (
    <div className="contact-page">
      <h1 className="page-title">{pageContent.title}</h1>
      <p className="page-subtitle">{pageContent.subtitle}</p>
      
      <div className="contact-container">
        <div className="contact-form-container">
          <h2 className="form-title">{pageContent.formTitle}</h2>
          
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <p>{pageContent.successMessage}</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{pageContent.formFields.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{pageContent.formFields.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">{pageContent.formFields.subject}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">{pageContent.formFields.message}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? pageContent.formFields.submitting : pageContent.formFields.submit}
              </button>
            </form>
          )}
        </div>
        
      <div className="contact-info-container">
          <h2 className="info-title">{pageContent.teamTitle}</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-avatar">
                  {member.name.english.charAt(0)}
                </div>
                <div className="member-info">
                  <h3 className="member-name">
                    {language === "English" ? member.name.english : member.name.tamil}
                  </h3>
                  <p className="member-role">
                    {language === "English" ? member.role.english : member.role.tamil}
                  </p>
                  <div className="member-contact">
                    <div className="contact-item">
                      <span className="contact-icon">📱</span>
                      <span>{member.phone}</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">✉</span>
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="contact-faq">
        <h2 className="faq-title">
          {language === "English" ? "Frequently Asked Questions" : "அடிக்கடி கேட்கப்படும் கேள்விகள்"}
        </h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3 className="faq-question">
              {language === "English" 
                ? "How do I create an account?" 
                : "நான் எப்படி ஒரு கணக்கை உருவாக்குவது?"}
            </h3>
            <p className="faq-answer">
              {language === "English" 
                ? "Simply enter your username on the login page. No password required!" 
                : "உள்நுழைவு பக்கத்தில் உங்கள் பயனர்பெயரை மட்டும் உள்ளிடவும். கடவுச்சொல் தேவையில்லை!"}
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">
              {language === "English" 
                ? "Is Quiz Master free to use?" 
                : "வினா மாஸ்டர் இலவசமாகப் பயன்படுத்தலாமா?"}
            </h3>
            <p className="faq-answer">
              {language === "English" 
                ? "Yes! Quiz Master is completely free with no hidden fees or premium features." 
                : "ஆம்! வினா மாஸ்டர் முற்றிலும் இலவசம், மறைக்கப்பட்ட கட்டணங்கள் அல்லது பிரீமியம் அம்சங்கள் இல்லை."}
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">
              {language === "English" 
                ? "How can I suggest new features?" 
                : "புதிய அம்சங்களை பரிந்துரைக்க நான் எப்படி செய்வது?"}
            </h3>
            <p className="faq-answer">
              {language === "English" 
                ? "We love feedback! Use the contact form above or email us at sindujadillibabu@gmail.com." 
                : "நாங்கள் கருத்துக்களை விரும்புகிறோம்! மேலே உள்ள தொடர்பு படிவத்தைப் பயன்படுத்தவும் அல்லது எங்களுக்கு sindujadillibabu@gmail.com இல் மின்னஞ்சல் செய்யவும்."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;