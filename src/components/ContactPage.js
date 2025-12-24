import React, { useState } from "react";
import "./ContactPage.css";
import ContactIllustration from "../assets/images/contact-illustration.png";

const ContactPage = ({ language }) => {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission = new FormData();
    submission.append("access_key", "c870004f-42e8-4f53-8da9-605edb58250d");
    submission.append("from_name", "Quiz Master Admin");
    submission.append("subject", "New Contact Message");
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
        setFormData({ name: "", school: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 4000);
      }
    } catch (err) {
      alert("Message failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const text =
    language === "Tamil"
      ? {
          title: "எங்களை தொடர்பு கொள்ளவும்",
          subtitle: "உங்களிடமிருந்து கேட்க விரும்புகிறோம்",
          submit: "செய்தி அனுப்பு",
          sending: "அனுப்புகிறது...",
          success: "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!",
        }
      : {
          title: "Contact Us",
          subtitle: "We’d love to hear from you",
          submit: "Send Message",
          sending: "Sending...",
          success: "Message sent successfully!",
        };

  return (
    <div className="contact-page">
      <div className="contact-wrapper">
        <div className="contact-image">
          <img src={ContactIllustration} alt="Contact" />
        </div>

        <div className="contact-card">
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>

          {isSubmitted ? (
            <div className="success-box">{text.success}</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="school"
                placeholder="School / College"
                value={formData.school}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? text.sending : text.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;