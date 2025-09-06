// src/components/ContactPage.jsx
import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const submission = new FormData();
    submission.append("access_key", "c870004f-42e8-4f53-8da9-605edb58250d");
    submission.append("name", formData.name);
    submission.append("school", formData.school);
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
        setFormData({ name: '', school: '', message: '' });
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
      formFields: {
        name: "Your Name",
        school: "Your School",
        message: "Your Message",
        submit: "Send Message",
        submitting: "Sending..."
      },
      successMessage: "Thank you for your message! We'll get back to you soon.",
      faqTitle: "Frequently Asked Questions"
    },
    tamil: {
      title: "எங்களைத் தொடர்பு கொள்ள",
      subtitle: "உங்களிடமிருந்து கேட்க நாங்கள் விரும்புகிறோம்!",
      formTitle: "எங்களுக்கு ஒரு செய்தியை அனுப்பவும்",
      formFields: {
        name: "உங்கள் பெயர்",
        school: "உங்கள் பள்ளி",
        message: "உங்கள் செய்தி",
        submit: "செய்தியை அனுப்பு",
        submitting: "அனுப்புகிறது..."
      },
      successMessage: "உங்கள் செய்திக்கு நன்றி! விரைவில் உங்களைத் தொடர்பு கொள்வோம்.",
      faqTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள்"
    }
  };

  const pageContent = language === "English" ? content.english : content.tamil;

  return (
    <div className="contact-page">
      <h1 className="page-title">{pageContent.title}</h1>
      <p className="page-subtitle">{pageContent.subtitle}</p>

      <div className="contact-container">
        {/* Left: Contact Form */}
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
                <label htmlFor="school">{pageContent.formFields.school}</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
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
                {isSubmitting
                  ? pageContent.formFields.submitting
                  : pageContent.formFields.submit}
              </button>
            </form>
          )}
        </div>

        {/* Right: FAQ Section */}
        <div className="contact-faq">
          <h2 className="faq-title">{pageContent.faqTitle}</h2>
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
                  ? "We love feedback! "
                  : "நாங்கள் கருத்துக்களை விரும்புகிறோம்!"}
              </p>
            </div>
            <div className="faq-item">
    <h3 className="faq-question">
      {language === "English"
        ? "Can I change my answers after submitting?"
        : "சமர்ப்பித்த பிறகு பதில்களை மாற்ற முடியுமா?"}
    </h3>
    <p className="faq-answer">
      {language === "English"
        ? "No, once you submit an answer, it cannot be changed. Make sure to review before submitting."
        : "ஆம், ஒரு பதிலை சமர்ப்பித்தவுடன் அதை மாற்ற முடியாது. சமர்ப்பிக்கும்முன் பரிசீலிக்கவும்."}
    </p>
  </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
