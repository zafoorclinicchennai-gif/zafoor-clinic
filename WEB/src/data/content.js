// All copy, EN/TA service data, review text, FAQs and media paths for the site.
// Extracted verbatim from the original single-file index.html — no wording changed.
// Image/video paths reference /public directly (see README for the asset-repair notes).

export const siteMeta = {
  title: "Zafoor Clinic | Skin, Hair & Laser, Diabetes & Family Medicine — Broadway, Sevenwells, Chennai",
  description:
    "Zafoor Clinic, Broadway, Sevenwells, Chennai — Skin, Hair & Laser treatments (PRP, GFC, chemical peels, laser treatments), diabetes & hypertension management, and family medicine with Dr. Mufeeda Roohi. Landmark: Opposite Huda Mosque. Call 8940399403.",
};
export const nav = {
  brand: { name: "ZAFOOR", accent: "CLINIC" },
  links: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Treatments", href: "#services" },
    { label: "Results", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQs", href: "#faqs" },
    { label: "Book Online", href: "#booking" },
  ],
  // Rendered as a distinct CTA button, not a plain nav link (see Navbar.jsx)
  cta: { label: "Book Appointment", href: "#booking" },
};

export const hero = {
  eyebrow: "Broadway, Sevenwells · Chennai",
  headingLines: ["Care, crafted", "carefully."],
  lead:
    "A doctor-led skin, hair, laser, diabetes and family medicine clinic in Broadway, Sevenwells, Chennai — delivering honest, results-driven care in a calm, luxurious setting.",
  slides: [
    {
      src: "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/hero/clinic-signage-1.jpg",
      alt: "Zafoor Clinic reception wall signage",
    },
    {
      src: "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/hero/clinic-signage-2.jpg",
      alt: "Zafoor Clinic gold circular wall signage",
    },
    {
      src: "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/hero/doctor-nameplate.jpg",
      alt: "Dr. Mufeeda Roohi consultation room nameplate at Zafoor Clinic",
    },
  ],
  ctas: [
    { label: "Book Appointment", href: "#contact", variant: "solid" },
    { label: "WhatsApp Us", href: "https://wa.me/918940399403", variant: "outline", external: true },
  ],
};

export const doctorBanner = {
  background: "/images/clinic-images/storefront.png?v=2",
  logo: "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/logo/zafoor-clinic-logo.png",
  photo: "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/logo/dr-mufeeda-roohi.jpg",
  eyebrow: "Meet Your Doctor",
  name: "Dr. Mufeeda Roohi",
  credentials: "Family Physician, Diabetologist and Aesthetic Physician (Skin, Hair & Laser)",
  role: "Founder & Chief Physician",
};
export const about = {
  eyebrow: "Who We Are",
  heading: "A Clinic Built Around You",
  image: "/images/clinic-images/storefront.png",
  imageAlt: "Zafoor Clinic storefront and glass entrance, Dr. Mufeeda Roohi signage, St. Xavier Street, Broadway, Sevenwells, Chennai",
  text:
    "Located at No 69/70, St. Xavier Street, Broadway, Sevenwells, Chennai - 600001 (Landmark: Opposite Huda Mosque), Zafoor Clinic is a multi-specialty practice offering skin, hair and laser care, diabetes management and general medicine under one roof. Every treatment — from a PRP session to a routine blood pressure check — is carried out under doctor supervision, in a calm and hygienic setting, during accessible evening hours.",
};

export const servicesSection = {
  eyebrow: "What We Treat",
  heading: "Our Services",
  languages: [
    { code: "en", label: "English" },
    { code: "ta", label: "தமிழ்" },
  ],
  departments: [
    {
      "id": "skin-hair-laser",
      "tabLabel": "Skin, Hair and Laser",
      "cards": [
        {
          "brief": "A small blood sample is drawn, processed into platelet-rich plasma, and re-injected into the treatment area to stimulate collagen and hair follicle activity. Minimal downtime, visible results over 4-6 weeks.",
          "taTitle": "பிஆர்பி சிகிச்சை",
          "taDesc": "சருமப் புத்துணர்ச்சி மற்றும் முடி வளர்ச்சிக்கான ப்ளேட்லெட் செறிவு சிகிச்சை.",
          "enTitle": "PRP Therapy",
          "enDesc": "Platelet-Rich Plasma treatment for skin rejuvenation and hair regrowth.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/prp-therapy.jpg"
        },
        {
          "brief": "An advanced evolution of PRP using concentrated growth factors, applied via micro-injections to boost hair density and skin quality with fewer sessions.",
          "taTitle": "ஜிஎஃப்சி சிகிச்சை",
          "taDesc": "முடி மற்றும் சரும மேம்பாட்டிற்கான மேம்பட்ட வளர்ச்சி காரணி சிகிச்சை.",
          "enTitle": "GFC Therapy",
          "enDesc": "Growth Factor Concentrate treatment for advanced hair and skin restoration.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/gfc-therapy.webp"
        },
        {
          "brief": "A doctor-graded acid solution is applied to exfoliate the outer skin layer, improving tone, texture and pigmentation over a course of sessions.",
          "taTitle": "இரசாயன பீல் சிகிச்சை",
          "taDesc": "சருமத் தோற்றம் மற்றும் நிறமி சரிசெய்தலுக்கான சிகிச்சை.",
          "enTitle": "Chemical Peels",
          "enDesc": "Resurfacing treatment for tone, texture and pigmentation correction.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/chemical-peels.webp"
        },
        {
          "brief": "Fine hyaluronic-acid micro-injections hydrate skin from within, improving elasticity and glow without changing facial contours.",
          "taTitle": "சருமப் பொலிவூட்டி",
          "taDesc": "மென்மையான, பொலிவான சருமத்திற்கான ஈரப்பத ஊசி சிகிச்சை.",
          "enTitle": "Skin Boosters",
          "enDesc": "Hydration-based injectables for smoother, plumper skin.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/skin-boosters.jpg"
        },
        {
          "brief": "Medical-grade laser sessions for scar smoothing, tattoo fading, hair reduction or pigmentation correction — tailored intensity per skin type.",
          "taTitle": "லேசர் சிகிச்சைகள்",
          "taDesc": "சருக்கம், பச்சை குத்து, முடி வளர்ச்சி மற்றும் நிறமி நீக்கம்.",
          "enTitle": "Laser Treatments",
          "enDesc": "Scar removal, tattoo removal, hair reduction and pigmentation removal.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/laser-treatments.webp"
        },
        {
          "brief": "Hydra Facial and Fire & Ice Facial protocols deep-cleanse, exfoliate and infuse serums for an immediate, visible glow.",
          "taTitle": "முக அழகு சிகிச்சை",
          "taDesc": "ஹைட்ரா ஃபேஷியல் மற்றும் ஃபயர் & ஐஸ் ஃபேஷியல் சிகிச்சைகள்.",
          "enTitle": "Facials",
          "enDesc": "Includes Hydra Facial and Fire & Ice Facial for glow and rejuvenation.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/facials.jpg"
        },
        {
          "brief": "A combination of exfoliation and pore-tightening actives to visibly reduce the appearance of enlarged pores over a treatment course.",
          "taTitle": "முகக்குழி சிகிச்சை",
          "taDesc": "விரிந்த மூலைக் குழிகளை குறைப்பதற்கான சிகிச்சை.",
          "enTitle": "Open Pores Treatment",
          "enDesc": "Targeted therapy to minimise enlarged pores.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/open-pores-treatment.jpg"
        },
        {
          "brief": "A customised regimen combining peels, topicals and laser (where needed) to fade stubborn pigmentation and melasma patches safely.",
          "taTitle": "மெலஸ்மா / நிறமி நீக்கம்",
          "taDesc": "மெலஸ்மா மற்றும் நிறமி பிரச்சனைகளுக்கான சிகிச்சை.",
          "enTitle": "Melasma / Pigmentation",
          "enDesc": "Dedicated treatment for melasma and pigmentation concerns.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/melasma-pigmentation.jpeg"
        },
        {
          "brief": "De-tan facials and peels that lift surface tan and even out skin tone within a few sessions.",
          "taTitle": "முகக்கருமை சிகிச்சை",
          "taDesc": "இயற்கையான சருமத் தொனியை மீட்கும் சிகிச்சை.",
          "enTitle": "Tanning Treatment",
          "enDesc": "De-tan therapy to restore natural skin tone.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/tanning-treatment.jpg"
        },
        {
          "brief": "A clinical protocol addressing active breakouts, inflammation and future scarring risk with dermatologist-guided steps.",
          "taTitle": "முகப்பரு சிகிச்சை",
          "taDesc": "முகப்பருவைக் கட்டுப்படுத்தி தழும்பைக் குறைக்கும் சிகிச்சை.",
          "enTitle": "Acne / Pimples Treatment",
          "enDesc": "Clinical treatment to control breakouts and reduce scarring.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/acne-pimples-treatment.png"
        },
        {
          "brief": "Quick, minimally invasive in-clinic removal with local anaesthesia where needed — same-day procedure.",
          "taTitle": "மரு மற்றும் காய்ப்பு நீக்கம்",
          "taDesc": "பாதுகாப்பான, குறைந்த அளவு அறுவை சிகிச்சை மூலம் நீக்கம்.",
          "enTitle": "Wart & Corn Removal",
          "enDesc": "Safe, minimally invasive removal procedures.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/wart-and-corn-removal.webp"
        },
        {
          "brief": "Scalp analysis followed by a targeted therapy plan — including GFC where suitable — to control hairfall and dandruff at the root cause.",
          "taTitle": "முடி உதிர்வு மற்றும் பொடுகு சிகிச்சை",
          "taDesc": "முடி உதிர்வு மற்றும் பொடுகைக் கட்டுப்படுத்தும் தலை சிகிச்சைகள்.",
          "enTitle": "Hairfall & Dandruff Treatment",
          "enDesc": "Scalp therapies to control hair fall and dandruff.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/hairfall-and-dandruff-treatment.jpg"
        },
        {
          "brief": "A structured, doctor-supervised plan combining diet guidance and monitoring for sustainable weight loss.",
          "taTitle": "எடை குறைப்பு சிகிச்சை",
          "taDesc": "கட்டமைக்கப்பட்ட எடை குறைப்பு சிகிச்சை திட்டங்கள்.",
          "enTitle": "Weight Reduction",
          "enDesc": "Structured weight-loss treatment plans.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/weight-reduction.webp"
        }
      ]
    },
    {
      "id": "diabetology",
      "tabLabel": "Diabetology",
      "cards": [
        {
          "brief": "Routine blood pressure, pulse, weight and general vitals check included with every diabetology visit.",
          "taTitle": "உடல்நலப் பரிசோதனை",
          "taDesc": "ஒவ்வொரு சர்க்கரை நோய் வருகையிலும் வழக்கமான பரிசோதனை.",
          "enTitle": "Vitals Monitoring",
          "enDesc": "Routine vitals check as part of every diabetes visit.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/vitals-monitoring.jpg"
        },
        {
          "brief": "A systematic review covering eyes, kidneys, nerves and feet to catch diabetes-related complications early.",
          "taTitle": "சிக்கல் பரிசோதனை பட்டியல்",
          "taDesc": "சர்க்கரை நோய் தொடர்பான சிக்கல்களுக்கான முறையான பரிசோதனை.",
          "enTitle": "Complication Checklist",
          "enDesc": "Systematic screening for diabetes-related complications.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/complication-checklist.jpg"
        },
        {
          "brief": "Dedicated foot examination and wound care for patients with diabetes, reducing risk of ulcers and infections.",
          "taTitle": "சர்க்கரை நோய் கால் பராமரிப்பு",
          "taDesc": "சர்க்கரை நோயால் ஏற்படும் கால் சிக்கல்களுக்கான சிறப்பு மதிப்பீடு.",
          "enTitle": "Diabetic Foot Care",
          "enDesc": "Dedicated assessment and treatment for diabetic foot complications.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/diabetic-foot-care.jpg"
        },
        {
          "brief": "Nerve-sensation testing of the feet using monofilament and vibration checks, catching diabetic neuropathy early before numbness leads to injury.",
          "taTitle": "நரம்பியல் பரிசோதனை",
          "taDesc": "சர்க்கரை நோயால் ஏற்படும் நரம்பு பாதிப்பை முன்கூட்டியே கண்டறியும் பரிசோதனை.",
          "enTitle": "Neuropathy Screening",
          "enDesc": "Monofilament and vibration testing to catch diabetic nerve damage early.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/neuropathy-screening.webp"
        }
      ]
    },
    {
      "id": "general",
      "tabLabel": "General Medicine",
      "cards": [
        {
          "brief": "Blood-test-based diagnosis and ongoing medication management for hypo- or hyperthyroidism.",
          "taTitle": "தைராய்டு பராமரிப்பு",
          "taDesc": "தைராய்டு நோய் கண்டறிதல் மற்றும் தொடர் மேலாண்மை.",
          "enTitle": "Thyroid Care",
          "enDesc": "Diagnosis and ongoing management of thyroid conditions.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/thyroid-care.jpg"
        },
        {
          "brief": "Regular blood pressure monitoring paired with a personalised medication and lifestyle plan to keep hypertension under control.",
          "taTitle": "இரத்த அழுத்த மேலாண்மை",
          "taDesc": "இரத்த அழுத்தத்தைக் கட்டுப்படுத்துவதற்கான பரிசோதனை மற்றும் சிகிச்சை திட்டம்.",
          "enTitle": "Hypertension Management",
          "enDesc": "Ongoing blood pressure monitoring and a tailored treatment plan.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/hypertension-management.webp"
        },
        {
          "brief": "Lipid profile testing followed by a personalised diet and medication plan to bring cholesterol into a healthy range.",
          "taTitle": "கொலஸ்ட்ரால் மேலாண்மை",
          "taDesc": "கொலஸ்ட்ரால் கட்டுப்பாட்டிற்கான பரிசோதனை மற்றும் சிகிச்சை திட்டங்கள்.",
          "enTitle": "Cholesterol Management",
          "enDesc": "Screening and treatment plans for cholesterol control.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/cholesterol-management.jpg"
        },
        {
          "brief": "General health checks, vaccination guidance and treatment for common childhood illnesses.",
          "taTitle": "குழந்தை மருத்துவம்",
          "taDesc": "குழந்தைகளின் ஆரோக்கியம் மற்றும் பொது பராமரிப்பு சிகிச்சைகள்.",
          "enTitle": "Pediatrics",
          "enDesc": "Children's health and general care treatments.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/pediatrics.webp"
        },
        {
          "brief": "Confidential consultations for women's health concerns, cycle irregularities and general gynaecological care.",
          "taTitle": "மகளிர் மருத்துவம்",
          "taDesc": "பெண்கள் நல சிகிச்சைகள் மற்றும் ஆலோசனைகள்.",
          "enTitle": "Gynaecology",
          "enDesc": "Women's health care treatments and consultations.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/gynaecology.jpg"
        },
        {
          "brief": "Diagnosis and treatment for ear, nose and throat conditions across all age groups.",
          "taTitle": "காது, மூக்கு, தொண்டை மருத்துவம்",
          "taDesc": "அனைத்து வயதினருக்கும் காது மூக்கு தொண்டை சிகிச்சைகள்.",
          "enTitle": "ENT Care",
          "enDesc": "Ear, nose and throat treatments for all ages.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/ent-care.png"
        },
        {
          "brief": "General eye health consultations, vision concerns and referrals where specialist care is needed.",
          "taTitle": "கண் பராமரிப்பு",
          "taDesc": "பொது கண் பராமரிப்பு ஆலோசனை மற்றும் சிகிச்சை.",
          "enTitle": "Eye Care",
          "enDesc": "General eye care consultations and treatment.",
          "image": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/services/eye-care.webp"
        }
      ]
    }
  ],
};

export const procedureVideosSection = {
  eyebrow: "See It In Action",
  heading: "Our Treatment Procedures",
  items: [
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/procedure-videos/procedure-1.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image9.webp",
      "label": "Procedure Walkthrough 1"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/procedure-videos/procedure-2.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image10.webp",
      "label": "Procedure Walkthrough 2"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/procedure-videos/gfc-therapy.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/hero/clinic-signage-1.jpg",
      "label": "Procedure Walkthrough 3"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/procedure-videos/procedure-4.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image11.webp",
      "label": "Procedure Walkthrough 4"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/procedure-videos/procedure-5.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image12.webp",
      "label": "Procedure Walkthrough 5"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/procedure-videos/laser-treatment.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image13.webp",
      "label": "Procedure Walkthrough 6"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/procedure-videos/laser-treatment-2.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image18.webp",
      "label": "Procedure Walkthrough 7"
    }
  ],
};

export const videoReviewsSection = {
  eyebrow: "In Their Words",
  heading: "Skincare Treatment Reviews",
  items: [
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/video-reviews/skincare-review-1.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/hero/clinic-signage-1.jpg",
      "label": "Skincare Treatment Review 1"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/video-reviews/skincare-review-2.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image19.webp",
      "label": "Skincare Treatment Review 2"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/video-reviews/skincare-review-3.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image14.webp",
      "label": "Skincare Treatment Review 3"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/video-reviews/skincare-review-4.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/hero/doctor-nameplate.jpg",
      "label": "Skincare Treatment Review 4"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/video-reviews/skincare-review-5.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image15.webp",
      "label": "Skincare Treatment Review 5"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/video-reviews/irregular-periods-1.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image16.webp",
      "label": "Skincare Treatment Review 6"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/videos/video-reviews/irregular-periods-2.mp4",
      "cover": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image17.webp",
      "label": "Skincare Treatment Review 7"
    }
  ],
};

export const gallerySection = {
  eyebrow: "Real Results",
  heading: "Results & The Clinic",
  note: "Click any image to view it full-size.",
  tabs: [
    { id: "ba", label: "Before & After" },
    { id: "clinic", label: "The Clinic" },
  ],
  beforeAfter: [
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/before-after/corn-removal.jpeg",
      "alt": "Corn removal before and after at Zafoor Clinic Chennai",
      "cap": "Corn Removal",
      "lightboxCap": "Corn Removal"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/before-after/diabetic-wound.jpeg",
      "alt": "Diabetic wound care before and after at Zafoor Clinic Chennai",
      "cap": "Diabetic Wound Care",
      "lightboxCap": "Diabetic Wound Care"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/before-after/fire-ice-facial.jpeg",
      "alt": "Fire and Ice Facial before and after at Zafoor Clinic Chennai",
      "cap": "Fire & Ice Facial",
      "lightboxCap": "Fire & Ice Facial"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/before-after/hair-treatment-result.jpeg",
      "alt": "Hair treatment result before and after at Zafoor Clinic Chennai",
      "cap": "Hair Treatment",
      "lightboxCap": "Hair Treatment Result"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/before-after/hydra-facial.jpeg",
      "alt": "Hydra Facial before and after at Zafoor Clinic Chennai",
      "cap": "Hydra Facial",
      "lightboxCap": "Hydra Facial"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/before-after/skin-infection.jpeg",
      "alt": "Skin infection treatment before and after at Zafoor Clinic Chennai",
      "cap": "Skin Infection Treatment",
      "lightboxCap": "Skin Infection Treatment"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/before-after/skin-infection-1.jpeg",
      "alt": "Skin infection treatment before and after at Zafoor Clinic Chennai",
      "cap": "Skin Infection Treatment",
      "lightboxCap": "Skin Infection Treatment"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/before-after/wart-removal.jpeg",
      "alt": "Wart removal before and after at Zafoor Clinic Chennai",
      "cap": "Wart Removal",
      "lightboxCap": "Wart Removal"
    }
  ],
  clinic: [
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image20.webp",
      "alt": "Zafoor Clinic entrance and signage, George Town Chennai",
      "cap": "Clinic Entrance",
      "lightboxCap": "Clinic Entrance"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/clinic-photo-1.jpeg",
      "alt": "Zafoor Clinic reception signage",
      "cap": "Reception",
      "lightboxCap": "Reception"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/clinic-photo-2.jpeg",
      "alt": "Dr. Mufeeda Roohi consultation room nameplate",
      "cap": "Dr. Mufeeda Roohi's Desk",
      "lightboxCap": "Consultation Desk"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image1.webp",
      "alt": "Laser and aesthetic treatment room at Zafoor Clinic",
      "cap": "Laser & Aesthetic Room",
      "lightboxCap": "Laser & Aesthetic Room"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image2.webp",
      "alt": "Skin treatment room at Zafoor Clinic",
      "cap": "Treatment Room",
      "lightboxCap": "Treatment Room"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/hero/doctor-nameplate.jpg",
      "alt": "Zafoor Clinic entrance signage, George Town Chennai",
      "cap": "Clinic Signage",
      "lightboxCap": "Clinic Signage"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image3.webp",
      "alt": "Waiting area corridor at Zafoor Clinic",
      "cap": "Waiting Area",
      "lightboxCap": "Waiting Corridor"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image4.webp",
      "alt": "Awards and recognitions display at Zafoor Clinic",
      "cap": "Awards & Recognition",
      "lightboxCap": "Awards & Recognition"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image6.webp",
      "alt": "Zafoor Clinic doctor coat",
      "cap": "Zafoor Clinic",
      "lightboxCap": "Doctor's Coat"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image7.webp",
      "alt": "Zafoor Clinic grand opening celebration",
      "cap": "Grand Opening",
      "lightboxCap": "Grand Opening"
    },
    {
      "src": "https://4pkrmvqtrlawvaa5.public.blob.vercel-storage.com/images/clinic-images/image8.webp",
      "alt": "Glowing skin growing confidence signage at Zafoor Clinic",
      "cap": "Glowing Skin, Growing Confidence",
      "lightboxCap": "Ceiling Signage"
    }
  ],
};

export const reviewsSection = {
  eyebrow: "Testimonials",
  heading: "What Our Patients Say",
  items: [
    {
      "stars": 5,
      "quote": "I came here for diabetic treatment, Dr Roohi guided me very well and clearly explained diet control, and also provided a diet chart, I followed only 2 weeks, My sugar level came 92/112 From 193/293, thank you Dr❤️",
      "avatar": "AK",
      "name": "Abdul Khadar",
      "loc": "Google Review",
      "hidden": false
    },
    {
      "stars": 5,
      "quote": "Dr.Mufeeda Roohi diagnosing the patient well getting the medical records perfectly and starting the treatment. The treatment is periodically step by step to cure the patient according to their satisfaction. The clinic aim is to educate the patients of their disease and after the cure post control advice to refine throughout rest of their life. The clinic is very clean and hygienic. One is getting good tips of lifestyle and food habits to over come problems related to their disease. Masha Allah.",
      "avatar": "OA",
      "name": "omar ali",
      "loc": "Google Review",
      "hidden": false
    },
    {
      "stars": 5,
      "quote": "I came here for a cosmetic treatment and doctor guided me very well and explained the procedure very patiently the staff there also kind the clinic was pleasant and also treatments where affordable.",
      "avatar": "SV",
      "name": "Sneha Vuppala",
      "loc": "Google Review",
      "hidden": false
    },
    {
      "stars": 5,
      "quote": "I had a great experience with Dr. Mufeeda. She quickly identified the root cause of my hair fall and explained the issue very clearly. Her approach to treatment was precise and to the point, without unnecessary medications or procedures. I started noticing positive results much sooner than I expected. I truly appreciate her efficiency, professionalism, and the care she showed throughout the process. Highly recommended for anyone dealing with hair fall concerns",
      "avatar": "AP",
      "name": "Aaliya Parvin",
      "loc": "Google Review",
      "hidden": false
    },
    {
      "stars": 5,
      "quote": "I have done hydra facial here Very satisfying Cost efficient",
      "avatar": "MS",
      "name": "Monica subbu",
      "loc": "Google Review",
      "hidden": false
    },
    {
      "stars": 5,
      "quote": "One of the best clinic in Sevenwells, Dr.Mufeeda Roohi is kind with patient. Good to visit Dr.Mufeeda for all the problems",
      "avatar": "PN",
      "name": "Ponmozhi Narayanan",
      "loc": "Google Review",
      "hidden": true
    },
    {
      "stars": 5,
      "quote": "When I caught a nasty cold last winter, the care I received at Zafoor Clinic made all the difference. The doctor took the time to explain my treatment plan and the remedies truly helped clear my congestion and soothe my sore throat.",
      "avatar": "AA",
      "name": "Apsara Apsara",
      "loc": "Google Review",
      "hidden": true
    },
    {
      "stars": 5,
      "quote": "I would like to express my heartfelt gratitude for the outstanding care I received at your facility. From the moment I arrived, everyone I encountered was kind, professional, and attentive. Their dedication to patient well-being truly stood out. A special thanks to Dr. Mufeeda Roohi for going above and beyond to ensure my comfort and care. It's reassuring to know that such compassionate and skilled healthcare providers are part of the community. Thank you for your incredible work!",
      "avatar": "H",
      "name": "Habeeb",
      "loc": "Google Review",
      "hidden": true
    },
    {
      "stars": 5,
      "quote": "I went here for my leg pain issue Doctor gave me clear explanation and good service at really affordable cost. Overall treatment was good",
      "avatar": "JK",
      "name": "Junaith King",
      "loc": "Google Review",
      "hidden": true
    }
  ],
};

export const faqSection = {
  eyebrow: "Good To Know",
  heading: "Frequently Asked Questions",
  items: [
    {
      "q": "Do I need an appointment or can I walk in?",
      "a": "Walk-ins are welcome during clinic hours, but booking ahead on WhatsApp or by phone helps us reduce your wait time, especially for procedures like PRP, GFC or laser sessions."
    },
    {
      "q": "How many sessions will I need for PRP or GFC?",
      "a": "Most patients see visible improvement in hair or skin quality after 3-4 sessions spaced 3-4 weeks apart. The exact plan depends on your specific concern and will be discussed at your first consultation."
    },
    {
      "q": "Is laser hair reduction painful?",
      "a": "Most patients describe it as a mild snapping sensation, well within tolerance. We use calibrated settings for your skin type to keep it comfortable."
    },
    {
      "q": "Can I get my diabetes and skin treatment done in the same visit?",
      "a": "Yes — Zafoor Clinic is built for exactly this. Dr. Mufeeda Roohi can review your diabetes management plan and address a Skin, Hair and Laser concern in the same evening visit."
    },
    {
      "q": "What are your clinic timings?",
      "a": "We're open Monday – Saturday: 6:00 PM – 10:00 PM (Sunday: Holiday), at No 69/70, St. Xavier Street, Broadway, Sevenwells, Chennai - 600001 (Landmark: Opposite Huda Mosque)."
    },
    {
      "q": "Do you offer follow-up consultations at no extra cost?",
      "a": "Short follow-ups for an ongoing treatment plan are generally included. Ask our team on WhatsApp for specifics related to your treatment."
    }
  ],
};

export const contact = {
  eyebrow: "Visit Us",
  heading: "Book Your Appointment",
  address: {
    lines: [
      "No 69/70, St. Xavier Street,",
      "Broadway, Sevenwells, Chennai - 600001.",
      "Landmark: Opposite Huda Mosque",
    ],
  },
  phone: { display: "89403 99403", href: "tel:8940399403" },
  email: { display: "ZafoorClinic@gmail.com", href: "mailto:ZafoorClinic@gmail.com" },
  timings: "Monday – Saturday: 6:00 PM – 10:00 PM | Sunday: Holiday",
  whatsappHref: "https://wa.me/918940399403",
  mapSrc:
    "https://www.google.com/maps?q=No+69/70+St+Xavier+Street+Broadway+Sevenwells+Chennai+600001&output=embed",
  form: {
    action: "https://formsubmit.co/ZafoorClinic@gmail.com",
    hiddenFields: {
      _subject: "New enquiry from Zafoor Clinic website",
      _captcha: "false",
    },
    departments: ["Skin, Hair and Laser", "Diabetology", "General Medicine"],
    disclaimer:
      "On first submission, FormSubmit will email a one-time confirmation link to ZafoorClinic@gmail.com — click it once to activate the form permanently. After that, every message a visitor submits arrives directly in that inbox.",
  },
};

export const booking = {
  eyebrow: "Book Online",
  heading: "Reserve Your Consultation",
  intro:
    "Choose your treatment, pick a time that suits you and we'll confirm your slot instantly. Consultations run Monday – Saturday: 6:00 PM – 10:00 PM IST (Sunday: Holiday).",
  steps: [
    { key: "service", label: "Treatment" },
    { key: "date", label: "Date" },
    { key: "slot", label: "Time" },
    { key: "details", label: "Your Details" },
  ],
  serviceStep: {
    title: "What would you like to book?",
    doctorLabel: "Consulting doctor",
    loading: "Loading treatments…",
    empty: "Online booking isn't open for any treatment right now. Please call us on 89403 99403.",
  },
  dateStep: {
    title: "Pick a date",
    label: "Appointment date",
    hint: "Clinic hours are Monday – Saturday: 6:00 PM – 10:00 PM IST (Sunday: Holiday).",
  },
  slotStep: {
    title: "Choose a time",
    loading: "Checking available times…",
    empty: "No times are free on this date. Please try another day.",
    onLeavePrefix: "The doctor is unavailable on this date.",
    timezoneNote: "All times shown in India Standard Time (IST).",
  },
  detailsStep: {
    title: "Your details",
    fields: {
      firstName: "First name",
      lastName: "Last name",
      phone: "Mobile number",
      email: "Email",
      gender: "Gender",
      reason: "Reason for visit",
    },
    optional: "optional",
    phoneHint: "10-digit Indian mobile number, with or without +91.",
    genders: ["Female", "Male", "Other"],
    submit: "Confirm Booking",
    submitting: "Booking…",
    disclaimer:
      "By confirming, you agree to be contacted about this appointment. Your information is handled according to our Privacy Policy.",
  },
  confirmation: {
    title: "Your appointment is confirmed",
    codeLabel: "Appointment code",
    uhidLabel: "Patient ID (UHID)",
    note: "Please keep your appointment code handy and arrive five minutes early. Need to change it? Call 89403 99403.",
    again: "Book another appointment",
  },
  errors: {
    conflict:
      "Sorry — that slot was just booked by someone else. We've refreshed the available times, please pick another.",
    generic: "Something went wrong while booking. Please try again.",
    validation: "Please correct the highlighted fields and try again.",
  },
  back: "Back",
  retry: "Try again",
};

export const footer = {
  brand: { name: "ZAFOOR", accent: "CLINIC" },
  tagline: "Care, crafted carefully.",
  subTagline: "A doctor-led skin, hair, diabetes & family medicine clinic in George Town, Chennai.",
  phone: { display: "+91 89403 99403", href: "tel:8940399403" },
  email: { display: "ZafoorClinic@gmail.com", href: "mailto:ZafoorClinic@gmail.com" },
  hours: "Monday – Saturday: 6:00 PM – 10:00 PM · Sunday: Holiday",
  columns: [
    { heading: "Locations", links: [{ label: "George Town, Chennai", href: "/#contact" }] },
    {
      heading: "Treatments",
      links: [
        { label: "Skin, Hair and Laser", href: "/#services" },
        { label: "Diabetology", href: "/#services" },
        { label: "General Medicine", href: "/#services" },
      ],
    },
    {
      heading: "Clinic",
      links: [
        { label: "About Zafoor Clinic", href: "/#about" },
        { label: "Dr. Mufeeda Roohi", href: "/#about" },
        { label: "Results", href: "/#gallery" },
        { label: "Gallery", href: "/#gallery" },
        { label: "Privacy Policy", href: "/privacy-policy/" },
      ],
    },
    {
      heading: "Connect",
      links: [
        { label: "WhatsApp", href: "https://wa.me/918940399403", external: true },
        {
          label: "Instagram",
          href: "https://www.instagram.com/dr.mufeeda_roohi/",
          external: true,
        },
        { label: "Contact", href: "/#contact" },
        { label: "FAQs", href: "/#faqs" },
      ],
    },
  ],
  copyright: "© 2026 Zafoor Clinic, George Town, Chennai. All rights reserved.",
};

export const whatsapp = {
  phone: "918940399403",
  greeting: "Hello! 👋 Choose an option below and we will continue on WhatsApp.",
  headerTitle: "Zafoor Clinic Assistant",
  options: [
    { label: "Skin, Hair and Laser", message: "I would like to know more about Skin, Hair and Laser treatments (PRP, GFC, laser, facials, hair & skin)." },
    { label: "Diabetology Check-up", message: "I would like to book a Diabetology check-up (vitals monitoring, neuropathy screening, diabetic foot care)." },
    { label: "General Medicine", message: "I would like a General Medicine consultation (Thyroid, Cholesterol, Pediatrics, Gynaecology, ENT, Eye Care)." },
    { label: "Book an Appointment", message: "I would like to book an appointment. Please share available slots." },
    { label: "Address & Timings", message: "Can you share the clinic address and timings?" },
  ],
};
