import { useState } from "react";
import { contact } from "../../data/content.js";
import useInView from "../../hooks/useInView.js";
import "./ContactForm.css";

const initialFields = { Name: "", Phone: "", Department: "", Message: "" };

export default function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [ref, inView] = useInView();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
  };

  return (
    <section ref={ref} className={`section reveal${inView ? " in-view" : ""}`} id="contact">
      <div className="container">
        <div className="center contact-intro">
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2>{contact.heading}</h2>
          <div className="divider"></div>
        </div>
        <div className="contact-grid">
          <div>
            <div className="info-row">
              <div className="icon">📍</div>
              <div>
                <strong>Address</strong>
                <p>
                  {contact.address.lines.map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < contact.address.lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="info-row">
              <div className="icon">📞</div>
              <div>
                <strong>Phone</strong>
                <p>
                  <a href={contact.phone.href}>{contact.phone.display}</a>
                </p>
              </div>
            </div>
            <div className="info-row">
              <div className="icon">✉️</div>
              <div>
                <strong>Email</strong>
                <p>
                  <a href={contact.email.href}>{contact.email.display}</a>
                </p>
              </div>
            </div>
            <div className="info-row">
              <div className="icon">🕕</div>
              <div>
                <strong>Timings</strong>
                <p>{contact.timings}</p>
              </div>
            </div>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid contact-whatsapp-btn"
            >
              Chat on WhatsApp
            </a>
            <div className="contact-map">
              <iframe
                src={contact.mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zafoor Clinic location"
              ></iframe>
            </div>
          </div>
          <div>
            <form className="contact-form glass-panel" action={contact.form.action} method="POST">
              {Object.entries(contact.form.hiddenFields).map(([name, value]) => (
                <input key={name} type="hidden" name={name} value={value} />
              ))}

              <label>Full Name</label>
              <input
                type="text"
                name="Name"
                required
                placeholder="Your name"
                value={fields.Name}
                onChange={handleChange}
              />

              <label>Phone Number</label>
              <input
                type="tel"
                name="Phone"
                required
                placeholder="Your phone number"
                value={fields.Phone}
                onChange={handleChange}
              />

              <label>Department</label>
              <select name="Department" required value={fields.Department} onChange={handleChange}>
                <option value="">Select a department</option>
                {contact.form.departments.map((dept) => (
                  <option key={dept}>{dept}</option>
                ))}
              </select>

              <label>Message</label>
              <textarea
                name="Message"
                rows="5"
                required
                placeholder="Tell us what you need help with"
                value={fields.Message}
                onChange={handleChange}
              ></textarea>

              <button type="submit" className="btn btn-solid contact-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
