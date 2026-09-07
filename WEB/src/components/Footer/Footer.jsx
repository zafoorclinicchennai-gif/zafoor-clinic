import { footer } from "../../data/content.js";
import useInView from "../../hooks/useInView.js";
import "./Footer.css";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export default function Footer() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <footer ref={ref} className={`site-footer reveal${inView ? " in-view" : ""}`}>
      <div className="container footer-top">
        <div className="footer-brand glass-panel">
          <span className="name footer-brand-name">
            {footer.brand.name} <span>{footer.brand.accent}</span>
          </span>
          <p className="footer-tag">{footer.tagline}</p>
          <p className="footer-tag footer-subtag">{footer.subTagline}</p>

          <ul className="footer-contact-list">
            <li>
              <span className="footer-contact-icon">
                <PhoneIcon />
              </span>
              <a href={footer.phone.href}>{footer.phone.display}</a>
            </li>
            <li>
              <span className="footer-contact-icon">
                <MailIcon />
              </span>
              <a href={footer.email.href}>{footer.email.display}</a>
            </li>
            <li>
              <span className="footer-contact-icon">
                <ClockIcon />
              </span>
              <span>{footer.hours}</span>
            </li>
          </ul>
        </div>

        {footer.columns.map((col) => (
          <div className="footer-col glass-panel" key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <p>{footer.copyright}</p>
          <span className="footer-separator" aria-hidden="true">&middot;</span>
          <a href="/privacy-policy/" className="footer-legal-link">
            Privacy Policy
          </a>
        </div>
        <p className="footer-credit">
          Designed and Developed by{" "}
          <a href="https://naazailabs.com" target="_blank" rel="noopener noreferrer">
            Naaz AI Labs
          </a>
        </p>
      </div>
    </footer>
  );
}
