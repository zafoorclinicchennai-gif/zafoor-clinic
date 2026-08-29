import { about } from "../../data/content.js";
import useInView from "../../hooks/useInView.js";
import "./About.css";

/* honest, non-fabricated facts already established elsewhere in
   content.js (servicesSection.departments length, footer.hours) —
   surfaced here as a quiet stat row rather than invented numbers */
const stats = [
  { value: "3", label: "Departments, One Roof" },
  { value: "6", label: "Days A Week" },
  { value: "100%", label: "Doctor-Supervised" },
];

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className={`section reveal${inView ? " in-view" : ""}`} id="about">
      <div className="container">
        <p className="eyebrow center">{about.eyebrow}</p>
        <h2 className="about-heading center">{about.heading}</h2>

        <div className="about-grid">
          <div className="about-media">
            <div className="about-media-frame">
              <img
                src={about.image || "/images/clinic-images/storefront.png"}
                alt={about.imageAlt || "Zafoor Clinic storefront and glass entrance, Dr. Mufeeda Roohi signage, St. Xavier Street, Broadway, Sevenwells, Chennai"}
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="about-copy">
            <div className="divider"></div>
            <p className="about-text">{about.text}</p>

            <div className="about-stats">
              {stats.map((s) => (
                <div className="about-stat glass-panel" key={s.label}>
                  <span className="about-stat-value">{s.value}</span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
