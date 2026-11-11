"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { RecaptchaWidget } from "./components/RecaptchaWidget";
import { submitEnquiry } from "./lib/supabase";
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  Menu,
  X,
  Check,
  Plus,
  Building2,
  Factory,
  Hammer,
  Paintbrush,
  Droplets,
  HardHat,
  ShieldCheck,
  ClipboardCheck,
  Clock3,
  MessagesSquare,
  MapPin,
  Mail,
  CheckCircle2,
  ChevronDown,
  ChevronsLeftRight,
  Home,
  Route,
  Wrench,
  Users,
  BadgeCheck,
  IndianRupee,
  Timer,
  HeartHandshake,
  MapPinned,
  Target,
  Flag,
  User,
  Layers3,
} from "lucide-react";

const services = [
  {
    title: "Civil & RCC Works",
    icon: Building2,
    detail: "Foundation, PCC, RCC, concrete, masonry, plastering and repair work.",
  },
  {
    title: "Earth & Site Development",
    icon: HardHat,
    detail: "Excavation, filling, levelling, compaction and site preparation.",
  },
  {
    title: "Flooring Works",
    icon: Paintbrush,
    detail: "Tiles, granite, industrial flooring, epoxy and concrete flooring.",
  },
  {
    title: "Fabrication Works",
    icon: Hammer,
    detail: "MS fabrication, structural steel, PEB systems, industrial sheds, roofing, cladding, mezzanines, staircases, handrails, gates and grills.",
  },
  {
    title: "Glazing & Aluminium Works",
    icon: Layers3,
    detail: "Aluminium doors and windows, glass doors, partitions, toughened and structural glazing.",
  },
  {
    title: "Paver Block Works",
    icon: Route,
    detail: "Interlocking pavers, parking areas, walkways, kerb stones and external flooring.",
  },
  {
    title: "Painting Works",
    icon: Paintbrush,
    detail: "Interior and exterior painting, industrial, metal, texture and protective coatings.",
  },
  {
    title: "Plumbing & Drainage",
    icon: Droplets,
    detail: "Water lines, sewage lines, chambers, STP interlinks and sanitary work.",
  },
  {
    title: "Road & External Works",
    icon: Route,
    detail: "Internal roads, driveways, storm water drains and compound walls.",
  },
  {
    title: "Waterproofing Works",
    icon: ShieldCheck,
    detail: "Terrace, toilet, roof and structural waterproofing.",
  },
  {
    title: "Demolition Works",
    icon: Hammer,
    detail: "Civil demolition, flooring removal and dismantling.",
  },
  {
    title: "Repair & Maintenance",
    icon: Wrench,
    detail: "Civil, structural, flooring and painting repairs, and general facility maintenance.",
  },
  {
    title: "Industrial Works",
    icon: Factory,
    detail: "Factory modifications, machine foundations, utility civil works and infrastructure changes.",
  },
];

const serviceCategories = [
  {
    title: "Residential Construction",
    icon: Home,
    image: "/images/service-residential.jpg",
    text: "Houses, villas and apartments built around the way your family lives.",
  },
  {
    title: "Commercial Construction",
    icon: Building2,
    image: "/images/service-commercial.jpg",
    text: "Offices, shops and showrooms built for daily business use.",
  },
  {
    title: "Industrial Construction",
    icon: Factory,
    image: "/images/service-industrial.jpg",
    text: "Factories, plant buildings, sheds and industrial facilities built for heavy use.",
  },
];

const completedProjects = [
  {
    client: "Private Residence",
    location: "Maraimalai Nagar, Chengalpattu",
    buildUp: "3,200 sq ft",
    plot: "2,400 sq ft",
    type: "Residential",
    design: "/images/project-design-1.jpg",
    completed: "/images/project-completed-1.jpg",
  },
  {
    client: "Electromags",
    location: "Chengalpattu, Tamil Nadu",
    buildUp: "18,500 sq ft",
    plot: "1 acre",
    type: "Commercial",
    design: "/images/project-design-2.jpg",
    completed: "/images/project-completed-2.jpg",
  },
  {
    client: "Mecho Light Components",
    location: "Chengalpattu, Tamil Nadu",
    buildUp: "12,000 sq ft",
    plot: "24,000 sq ft",
    type: "Industrial",
    design: "/images/project-design-3.jpg",
    completed: "/images/project-completed-3.jpg",
  },
];

const ongoingProjects = [
  {
    client: "Pioneer NF Forgings India Pvt Ltd",
    location: "Maraimalai Nagar, Chengalpattu",
    buildUp: "8,000 sq ft",
    plot: "1.2 acres",
    type: "Industrial",
    image: "/images/project-ongoing-1.jpg",
  },
  {
    client: "Caplin One Labs",
    location: "Chengalpattu, Tamil Nadu",
    buildUp: "6,500 sq ft",
    plot: "18,000 sq ft",
    type: "Commercial",
    image: "/images/project-ongoing-2.jpg",
  },
  {
    client: "Private Residence",
    location: "Maraimalai Nagar, Chengalpattu",
    buildUp: "2,800 sq ft",
    plot: "2,000 sq ft",
    type: "Residential",
    image: "/images/project-ongoing-3.jpg",
  },
];

const packages = [
  {
    name: "Standard Package",
    price: "₹2,200",
    unit: "per sqft",
    description: "A practical construction package with specified materials and finishes.",
    featured: false,
    details: [
      {
        title: "Structure & materials",
        text: "Penna or Zuari cement; red brick; M-sand and P-sand; Pulkit and Thirumala steel.",
      },
      {
        title: "Finishes & fittings",
        text: "Asian Tractor / Ace paint; Orbit / Hi-Fi switches; Orbit wire; Ashirvad and Finolex plumbing pipes; Parryware fittings. KAG 2×2 ft floor tiles at ₹45/sq ft and other tiles at ₹35/sq ft.",
      },
      {
        title: "Doors, windows & interiors",
        text: "First-quality teak main door and frame; other frames in second-quality teak; flush bedroom doors; PVC bathroom doors; uPVC windows. Interiors not included.",
      },
    ],
  },
  {
    name: "Premium Package",
    price: "₹2,500",
    unit: "per sqft",
    description: "A material specification with upgraded steel, fittings and floor tiles.",
    featured: true,
    details: [
      {
        title: "Structure & materials",
        text: "Chettinad or Ramco cement; wire-cut red brick; M-sand and P-sand, with river sand for the roof only; ARS CRS Fe550 steel.",
      },
      {
        title: "Finishes & fittings",
        text: "Asian Premium / Apex paint; Anchor Roma switches; Finolex wire; Ashirvad and Finolex plumbing pipes; Parryware fittings. Anuj 2×2 ft floor tiles at ₹60/sq ft and other tiles at ₹40/sq ft.",
      },
      {
        title: "Doors, windows & interiors",
        text: "First-quality teak main door and frame; other frames in second-quality teak; flush bedroom doors; WPC bathroom doors; second-quality teak windows. Interiors not included.",
      },
    ],
  },
  {
    name: "Royal Package",
    price: "₹2,800",
    unit: "per sqft",
    description: "A higher-end specification with granite flooring and interiors included.",
    featured: false,
    details: [
      {
        title: "Structure & materials",
        text: "Dalmia or UltraTech cement; wire-cut red brick; M-sand and P-sand, with river sand for the roof only; Tata Tiscon steel.",
      },
      {
        title: "Finishes & fittings",
        text: "Asian Shyne / Apex paint; GM switches; Finolex wire; Ashirvad and Finolex plumbing pipes; Parryware fittings. Granite flooring and steps.",
      },
      {
        title: "Doors, windows & interiors",
        text: "First-quality teak main door and frames; other frames in first-quality teak; flush bedroom doors; WPC bathroom doors; first-quality teak windows. Interiors included; confirm scope in your quotation.",
      },
    ],
  },
];

const whyReasons = [
  {
    icon: Users,
    title: "Experienced Team",
    text: "Engineers, supervisors and skilled workers who have worked on houses, offices and factories.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    text: "Quality Checks at Every Stage. We check materials and workmanship at each stage, not just at the end.",
  },
  {
    icon: IndianRupee,
    title: "Clear Pricing",
    text: "A written quotation with no hidden costs. If anything changes, you hear it from us first.",
  },
  {
    icon: Timer,
    title: "Timely Execution",
    text: "On-Time Work. Realistic schedules and regular site monitoring so your project does not drift.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    text: "Safety on Site. Safety gear, site induction and supervision for every worker.",
  },
  {
    icon: Layers3,
    title: "End-to-End Solutions",
    text: "One Team, Start to Handover. Design coordination, approvals, construction and handover with the same company.",
  },
  {
    icon: HeartHandshake,
    title: "Client Satisfaction",
    text: "Happy Clients, Not Just Finished Buildings. We measure our work by repeat clients and referrals.",
  },
  {
    icon: MapPinned,
    title: "Regional Expertise",
    text: "Local Knowledge. We know Chengalpattu and the areas around Chennai: local rules, weather, soil and suppliers.",
  },
  {
    icon: Wrench,
    title: "1 Year Free Maintenance Labour",
    text: "After handover, we cover labour cost for maintenance work for one year. Materials are charged extra.",
  },
];

const approachSteps = [
  ["Understand", "We listen to your needs, budget and plot details."],
  ["Plan", "We fix the scope, cost, materials and timeline in writing."],
  ["Build", "We start work with regular site visits and quality checks."],
  ["Handover", "We finish, inspect with you and hand over the keys."],
];

const faqs = [
  [
    "What is the house construction cost per sq ft in Chennai with ARKA Constructions?",
    "Our Standard, Premium and Royal construction packages are listed at ₹2,200, ₹2,500 and ₹2,800 per sq ft respectively. A separate budget offer starts at ₹2,300 per sq ft for a minimum plot size of 1,250 sq ft. Please confirm current pricing and scope with our team.",
  ],
  [
    "What is the minimum area you build for?",
    "The budget offer specifies a minimum plot size of 1,250 sq ft. Contact us to discuss your site and the requirements for other packages.",
  ],
  [
    "Do you offer free maintenance after handover?",
    "Yes. We cover the labour cost of maintenance work for one year after handover. Material cost is charged separately.",
  ],
  [
    "Do you build in Chennai and Chengalpattu?",
    "Yes. Chennai and Chengalpattu are our main areas. We also build in Maraimalai Nagar, Kanchipuram, Thiruvallur, Thiruvannamalai, Oragadam, Sriperumbudur, Mahindra World City and Singaperumal Koil.",
  ],
  [
    "Do you build only houses, or commercial and industrial buildings too?",
    "We build houses, villas, offices, shops, factories and plant buildings. We also do civil, RCC, steel fabrication, flooring, waterproofing, plumbing and repair work.",
  ],
  [
    "How do I get a construction quotation?",
    "Fill in the quote form with your name, phone number, site location and plot area, or call us. Our team will speak to you, understand your plan and share a clear written quotation.",
  ],
  [
    "Do you handle renovation and industrial modification work?",
    "Yes. We do house renovation, repair and maintenance, and also factory modifications, machine foundations and utility civil works for industrial units.",
  ],
  [
    "Who runs ARKA Constructions?",
    "ARKA Constructions is led by Kamarajan Krishnan, an engineer with experience in residential, commercial and industrial projects. The company is based in Maraimalai Nagar, Chengalpattu.",
  ],
];

const serviceImages = [
  "service-civil.jpg", "service-infrastructure.jpg", "service-flooring.jpg",
  "service-fabrication.jpg", "service-glazing-v2.jpg", "service-pavers-v2.jpg",
  "service-painting-v2.jpg", "service-plumbing.jpg", "service-roadworks-v2.jpg",
  "service-waterproofing-v2.jpg", "service-demolition-v2.jpg", "service-repairs-v2.jpg",
  "service-industrial-works.jpg",
];

const whatsappUrl = "https://wa.me/919952525185";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.94 9.94 0 0 0-8.62 14.9L2 22l5.25-1.38A9.96 9.96 0 1 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 1 1 6.97 3.85Zm4.5-6.13c-.25-.12-1.45-.71-1.67-.79-.23-.09-.39-.13-.55.12-.16.24-.63.79-.78.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.2-1.44-1.35-1.68-.14-.24-.01-.38.11-.5.11-.11.24-.29.36-.43.13-.14.17-.24.25-.41.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.75-1.82-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.42.06-.64.3-.22.25-.84.82-.84 2s.86 2.31.98 2.47c.13.16 1.7 2.59 4.11 3.63.57.25 1.01.4 1.36.51.57.18 1.1.15 1.51.09.46-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>;
}

const mainServiceAreas = ["Chennai", "Chengalpattu"];
const nearbyServiceAreas = [
  "Maraimalai Nagar",
  "Kanchipuram",
  "Thiruvallur",
  "Thiruvannamalai",
  "Oragadam",
  "Sriperumbudur",
  "Mahindra World City",
  "Singaperumal Koil",
];

const heroSlides = [
  "/images/hero-construction.jpg",
  "/images/hero-house.jpg",
  "/images/service-commercial.jpg",
];

const sectionMotion = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.12 },
  variants: {
    hidden: { opacity: 0, y: 34 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" as const },
    },
  },
};

const cardMotion = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

type Modal =
  | { type: "quote"; interest?: string }
  | { type: "package"; index: number }
  | { type: "privacy" }
  | null;

type EnquiryField = "name" | "phone" | "email" | "location" | "plotArea" | "service" | "message";
type EnquiryErrors = Partial<Record<EnquiryField, string>>;

const phonePattern = /^\+?[0-9]{10,15}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEnquiryForm(data: FormData, form: "hero" | "quote_modal") {
  const errors: EnquiryErrors = {};
  const value = (name: EnquiryField) => String(data.get(name) || "").trim();

  if (value("name").length < 2) errors.name = "Enter your full name using at least 2 characters.";
  if (!phonePattern.test(value("phone"))) errors.phone = "Enter a valid 10 to 15 digit phone number without spaces.";
  if (value("email") && !emailPattern.test(value("email"))) errors.email = "Enter a valid email address, for example name@example.com.";
  if (value("location").length < 2) errors.location = "Enter the project site location.";
  if (form === "hero" && !value("plotArea")) errors.plotArea = "Select the approximate plot area.";
  if (form === "quote_modal" && !value("service")) errors.service = "Select the service you are interested in.";
  if (value("message").length > 2000) errors.message = "Keep the project details within 2,000 characters.";

  return errors;
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="/"
      aria-label="ARKA Constructions home"
    >
      <span className="brand-symbol" aria-hidden="true">
        <img src="/images/arka-logo.png" alt="" width={256} height={256} />
      </span>
      <span className="brand-type">
        ARKA<small>CONSTRUCTIONS</small>
      </span>
    </a>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "hp-eyebrow-light" : ""}`}>
      <span />
      {children}
    </p>
  );
}

function EmailHeroQuoteForm() {
  const [prepared, setPrepared] = useState(false);
  const [emailLink, setEmailLink] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hello ARKA Constructions,\n\nI would like to discuss a construction project.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email") || "Not provided"}\nSite location: ${data.get("location")}\nPlot area: ${data.get("plotArea")}\n\nPlease contact me to discuss the next steps.\n`;
    setEmailLink(
      `mailto:arkaconstructions96@gmail.com?subject=${encodeURIComponent(
        "Website construction enquiry — " + data.get("location"),
      )}&body=${encodeURIComponent(body)}`,
    );
    setPrepared(true);
  }

  if (prepared) {
    return (
      <div className="hp-hero-form hp-form-success" role="status">
        <CheckCircle2 size={40} />
        <h3>Your enquiry is ready.</h3>
        <p>
          Nothing has been sent yet. Open your email app to review and send the
          prepared message to ARKA.
        </p>
        <a className="hp-btn hp-btn-gold" href={emailLink}>
          Open Email App <ArrowUpRight size={16} />
        </a>
        <button
          type="button"
          className="hp-text-btn"
          onClick={() => setPrepared(false)}
        >
          Edit details
        </button>
      </div>
    );
  }

  return (
    <form className="hp-hero-form" onSubmit={submit}>
      <h2>Let&rsquo;s Discuss Your Project</h2>
      <p>Share your plot details. Our team will call you back.</p>
      <label className="hp-field">
        <User size={16} />
        <input
          name="name"
          required
          autoComplete="name"
          maxLength={100}
          placeholder="Name *"
          aria-label="Name"
        />
        <span className="hp-required-mark" aria-hidden="true">*</span>
      </label>
      <label className="hp-field">
        <Phone size={16} />
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          pattern="[+]?[0-9]{10,15}"
          title="Enter 10 to 15 digits, optionally starting with +. Do not include spaces."
          maxLength={20}
          placeholder="Phone Number *"
          aria-label="Phone number"
        />
        <span className="hp-required-mark" aria-hidden="true">*</span>
      </label>
      <label className="hp-field">
        <Mail size={16} />
        <input
          name="email"
          type="email"
          autoComplete="email"
          maxLength={150}
          placeholder="Email (optional)"
          aria-label="Email (optional)"
        />
      </label>
      <label className="hp-field">
        <MapPin size={16} />
        <input
          name="location"
          required
          autoComplete="address-level2"
          maxLength={150}
          placeholder="Site Location *"
          aria-label="Site location"
        />
        <span className="hp-required-mark" aria-hidden="true">*</span>
      </label>
      <label className="hp-field">
        <Layers3 size={16} />
        <select name="plotArea" required defaultValue="" aria-label="Plot area">
            <option value="" disabled>
            Plot Area (sq ft) *
          </option>
          <option>1200 - 2000 sq ft</option>
          <option>2000 - 3000 sq ft</option>
          <option>3000 - 4000 sq ft</option>
          <option>4000+ sq ft</option>
        </select>
        <ChevronDown size={15} />
        <span className="hp-required-mark" aria-hidden="true">*</span>
      </label>
      <button className="hp-btn hp-btn-gold" type="submit">
        Request a Callback <ArrowUpRight size={16} />
      </button>
      <p className="hp-form-note">
        Your details stay in this page until you choose to send them through
        your email app.
      </p>
    </form>
  );
}

function HeroQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<EnquiryErrors>({});
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaResetKey, setRecaptchaResetKey] = useState(0);
  const [formStartedAt] = useState(() => Date.now());

  function clearFieldError(field: EnquiryField) {
    setFieldErrors((current) => current[field] ? { ...current, [field]: undefined } : current);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const validationErrors = validateEnquiryForm(data, "hero");
    if (Object.keys(validationErrors).length) {
      setFieldErrors(validationErrors);
      const firstInvalidField = Object.keys(validationErrors)[0];
      (form.elements.namedItem(firstInvalidField) as HTMLElement | null)?.focus();
      return;
    }
    setSubmitting(true);
    setError("");
    setFieldErrors({});

    try {
      await submitEnquiry({
        name: String(data.get("name") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        email: String(data.get("email") || "").trim() || undefined,
        site_location: String(data.get("location") || "").trim(),
        plot_area: String(data.get("plotArea") || "").trim(),
        source: "hero",
      }, recaptchaToken, String(data.get("website") || ""), formStartedAt);
      form.reset();
      setSubmitted(true);
      setRecaptchaToken("");
      setRecaptchaResetKey((key) => key + 1);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not save your enquiry. Please try again.");
      setRecaptchaToken("");
      setRecaptchaResetKey((key) => key + 1);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="hp-hero-form hp-form-success" role="status">
        <CheckCircle2 size={40} />
        <h3>Thank you. Your enquiry has been received.</h3>
        <p>Our team will review your project details and call you back.</p>
        <button type="button" className="hp-text-btn" onClick={() => setSubmitted(false)}>
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="hp-hero-form" onSubmit={submit} aria-busy={submitting} noValidate>
      <h2>Let&rsquo;s Discuss Your Project</h2>
      <p>Share your plot details. Our team will call you back.</p>
      <div className="form-field-group">
        <label className={`hp-field ${fieldErrors.name ? "has-error" : ""}`}><User size={16} /><input name="name" required minLength={2} autoComplete="name" maxLength={100} placeholder="Name" aria-label="Name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "hero-name-error" : undefined} onInput={() => clearFieldError("name")} /></label>
        {fieldErrors.name && <span className="field-error" id="hero-name-error">{fieldErrors.name}</span>}
      </div>
      <div className="form-field-group">
        <label className={`hp-field ${fieldErrors.phone ? "has-error" : ""}`}><Phone size={16} /><input name="phone" type="tel" required autoComplete="tel" inputMode="tel" maxLength={16} placeholder="Phone Number" aria-label="Phone number" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? "hero-phone-error" : undefined} onInput={() => clearFieldError("phone")} /></label>
        {fieldErrors.phone && <span className="field-error" id="hero-phone-error">{fieldErrors.phone}</span>}
      </div>
      <div className="form-field-group">
        <label className={`hp-field ${fieldErrors.email ? "has-error" : ""}`}><Mail size={16} /><input name="email" type="email" autoComplete="email" maxLength={150} placeholder="Email (optional)" aria-label="Email (optional)" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "hero-email-error" : undefined} onInput={() => clearFieldError("email")} /></label>
        {fieldErrors.email && <span className="field-error" id="hero-email-error">{fieldErrors.email}</span>}
      </div>
      <div className="form-field-group">
        <label className={`hp-field ${fieldErrors.location ? "has-error" : ""}`}><MapPin size={16} /><input name="location" required minLength={2} autoComplete="address-level2" maxLength={150} placeholder="Site Location" aria-label="Site location" aria-invalid={Boolean(fieldErrors.location)} aria-describedby={fieldErrors.location ? "hero-location-error" : undefined} onInput={() => clearFieldError("location")} /></label>
        {fieldErrors.location && <span className="field-error" id="hero-location-error">{fieldErrors.location}</span>}
      </div>
      <div className="form-field-group">
        <label className={`hp-field ${fieldErrors.plotArea ? "has-error" : ""}`}><Layers3 size={16} /><select name="plotArea" required defaultValue="" aria-label="Plot area" aria-invalid={Boolean(fieldErrors.plotArea)} aria-describedby={fieldErrors.plotArea ? "hero-area-error" : undefined} onChange={() => clearFieldError("plotArea")}><option value="" disabled>Plot Area (sq ft)</option><option>1200 - 2000 sq ft</option><option>2000 - 3000 sq ft</option><option>3000 - 4000 sq ft</option><option>4000+ sq ft</option></select><ChevronDown size={15} /></label>
        {fieldErrors.plotArea && <span className="field-error" id="hero-area-error">{fieldErrors.plotArea}</span>}
      </div>
      <input className="hp-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <RecaptchaWidget onToken={setRecaptchaToken} resetKey={recaptchaResetKey} />
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="hp-btn hp-btn-gold" type="submit" disabled={submitting || !recaptchaToken}>
        {submitting ? "Submitting…" : "Request a Callback"} {!submitting && <ArrowUpRight size={16} />}
      </button>
      <p className="hp-form-note">By submitting, you agree that ARKA may contact you about your project.</p>
    </form>
  );
}

function BeforeAfter({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div
      className="hp-compare"
      style={{ "--pos": `${pos}%` } as React.CSSProperties}
    >
      <img src={after} alt={`${label} — completed work`} loading="lazy" />
      <div className="hp-compare-before">
        <img src={before} alt={`${label} — design reference`} loading="lazy" />
      </div>
      <span className="hp-compare-tag hp-compare-tag-before">Design</span>
      <span className="hp-compare-tag hp-compare-tag-after">Completed</span>
      <div className="hp-compare-divider">
        <span className="hp-compare-handle">
          <ChevronsLeftRight size={18} />
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(event) => setPos(Number(event.target.value))}
        aria-label={`Compare design and completed images for ${label}`}
      />
    </div>
  );
}

export default function ArkaSite({
  view = "home",
}: {
  view?: "home" | "services" | "projects" | "packages";
}) {
  const [menu, setMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [tab, setTab] = useState<"completed" | "ongoing">("completed");
  const [openFaq, setOpenFaq] = useState(0);
  const [modal, setModal] = useState<Modal>(null);
  const [prepared, setPrepared] = useState(false);
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");
  const [modalFieldErrors, setModalFieldErrors] = useState<EnquiryErrors>({});
  const [modalRecaptchaToken, setModalRecaptchaToken] = useState("");
  const [modalRecaptchaResetKey, setModalRecaptchaResetKey] = useState(0);
  const [modalFormStartedAt] = useState(() => Date.now());
  const [emailLink, setEmailLink] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  function openModal(next: Modal) {
    returnFocus.current = document.activeElement as HTMLElement;
    setPrepared(false);
    setModalError("");
    setModalFieldErrors({});
    setMenu(false);
    setModal(next);
  }

  function closeModal() {
    dialog.current?.close();
    setModal(null);
  }

  useEffect(() => {
    const element = dialog.current;
    if (!modal || !element) return;
    const trigger = returnFocus.current;
    const background: { element: HTMLElement; inert: boolean }[] = [];
    if (modal.type === "quote") {
      // Google's challenge is attached to body. A native modal would make it
      // inert and place it behind the top layer, regardless of its z-index.
      for (const sibling of Array.from(element.parentElement?.children || [])) {
        if (!(sibling instanceof HTMLElement) || sibling === element || sibling.classList.contains("quote-backdrop")) continue;
        background.push({ element: sibling, inert: sibling.inert });
        sibling.inert = true;
      }
      element.show();
      element.querySelector<HTMLButtonElement>(".modal-close")?.focus();
    } else {
      element.showModal();
    }
    return () => {
      element.close();
      for (const item of background) item.element.inert = item.inert;
      trigger?.focus();
    };
  }, [modal]);

  useEffect(() => {
    document.body.style.overflow = modal || menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu, modal]);

  useEffect(() => {
    if (view !== "home") return;
    const timer = window.setInterval(
      () => setHeroSlide((current) => (current + 1) % heroSlides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [view]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenu(false);
        setServicesOpen(false);
        if (modal?.type === "quote" && !event.defaultPrevented) {
          dialog.current?.close();
          setModal(null);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  function prepareQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hello ARKA Constructions,\n\nI would like to discuss a project.\n\nName: ${data.get(
      "name",
    )}\nPhone: ${data.get("phone")}\nSite location: ${data.get(
      "location",
    )}\nInterested in: ${data.get("service")}\n\nRequirements:\n${
      data.get("message") || "Please contact me to discuss."
    }\n`;
    setEmailLink(
      `mailto:arkaconstructions96@gmail.com?subject=${encodeURIComponent(
        "Website enquiry — " + data.get("service"),
      )}&body=${encodeURIComponent(body)}`,
    );
    setPrepared(true);
  }

  async function submitModalQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (modalSubmitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const validationErrors = validateEnquiryForm(data, "quote_modal");
    if (Object.keys(validationErrors).length) {
      setModalFieldErrors(validationErrors);
      const firstInvalidField = Object.keys(validationErrors)[0];
      (form.elements.namedItem(firstInvalidField) as HTMLElement | null)?.focus();
      return;
    }
    setModalSubmitting(true);
    setModalError("");
    setModalFieldErrors({});

    try {
      await submitEnquiry({
        name: String(data.get("name") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        site_location: String(data.get("location") || "").trim(),
        service: String(data.get("service") || "").trim(),
        message: String(data.get("message") || "").trim() || undefined,
        source: "quote_modal",
      }, modalRecaptchaToken, String(data.get("website") || ""), modalFormStartedAt);
      form.reset();
      setPrepared(true);
      setModalRecaptchaToken("");
      setModalRecaptchaResetKey((key) => key + 1);
    } catch (submissionError) {
      setModalError(submissionError instanceof Error ? submissionError.message : "We could not save your enquiry. Please try again.");
      setModalRecaptchaToken("");
      setModalRecaptchaResetKey((key) => key + 1);
    } finally {
      setModalSubmitting(false);
    }
  }

  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <m.header
        className="header"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container header-inner">
          <Brand />
          <nav
            className={`navigation ${menu ? "is-open" : ""}`}
            id="main-navigation"
            aria-label="Main navigation"
          >
            <a href="/" onClick={() => setMenu(false)}>
              Home
            </a>
            <div className={`nav-item ${servicesOpen ? "is-expanded" : ""}`}>
              <a href="/services" onClick={() => setMenu(false)}>
                Construction Services
              </a>
              <button
                type="button"
                className="nav-submenu-toggle"
                aria-expanded={servicesOpen}
                aria-controls="services-submenu"
                aria-label="Toggle construction services submenu"
                onClick={() => setServicesOpen((current) => !current)}
              >
                <ChevronDown size={16} />
              </button>
              <div className="nav-dropdown" id="services-submenu">
                <a href="/services#residential" onClick={() => setMenu(false)}>Residential Construction</a>
                <a href="/services#commercial" onClick={() => setMenu(false)}>Commercial Construction</a>
                <a href="/services#industrial" onClick={() => setMenu(false)}>Industrial Construction</a>
              </div>
            </div>
            <a href="/projects" onClick={() => setMenu(false)}>
              Projects
            </a>
            <a href="/packages" onClick={() => setMenu(false)}>
              Packages
            </a>
          </nav>
          <div className="header-actions">
            <a
              className="phone-link header-whatsapp"
              href={whatsappUrl}
              target="_blank" rel="noopener noreferrer"
              aria-label="Message ARKA on WhatsApp"
            >
              <WhatsAppIcon size={19} />
              <span>+91 99525 25185</span>
            </a>
            <a className="phone-link header-mobile-phone" href="tel:+919952525185" aria-label="Call ARKA on 99525 25185"><Phone size={18} /></a>
            <button
              className="button button-gold header-quote"
              onClick={() => openModal({ type: "quote" })}
            >
              Get a Free Quote <ArrowUpRight size={16} />
            </button>
            <button
              className="menu-toggle"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              aria-controls="main-navigation"
              onClick={() => {
                setMenu((current) => !current);
                if (menu) setServicesOpen(false);
              }}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </m.header>
      <AnimatePresence>
        {menu && (
          <m.button
            type="button"
            className="nav-backdrop"
            aria-label="Close navigation"
            onClick={() => { setMenu(false); setServicesOpen(false); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <main
        id="main"
        className={view === "home" ? "home-page" : "dedicated-page"}
      >
        {view !== "home" && (
          <div className="container page-breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span>{view}</span>
          </div>
        )}

        {view === "home" && (
          <m.section {...sectionMotion} className="hp-hero" aria-labelledby="hero-title">
            <div className="hp-hero-media" aria-hidden="true">
              {heroSlides.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={index === heroSlide ? "is-active" : ""}
                  fetchPriority={index === 0 ? "high" : undefined}
                  width="1400"
                  height="933"
                />
              ))}
            </div>
            <div className="container hp-hero-inner">
              <div className="hp-hero-copy">
                <Eyebrow light>ARKA Constructions</Eyebrow>
                <h1 id="hero-title">
                  Best Construction Company in <span>Chennai &amp; Chengalpattu</span>
                </h1>
                <p>
                  Planning to build a house, shop or factory? ARKA Constructions
                  builds homes, commercial buildings and industrial works in
                  Chennai, Chengalpattu, Maraimalai Nagar, Oragadam and nearby
                  areas. Explore our construction packages and request a
                  project-specific quotation.
                </p>
                <div className="hp-hero-tags">
                  <span className="hp-hero-tag">
                    <Home size={15} /> Residential
                  </span>
                  <span className="hp-hero-tag">
                    <Building2 size={15} /> Commercial
                  </span>
                  <span className="hp-hero-tag">
                    <Factory size={15} /> Industrial
                  </span>
                </div>
                <div className="hp-hero-actions">
                  <a href="/projects" className="hp-btn hp-btn-gold">
                    View Our Projects <ArrowUpRight size={17} />
                  </a>
                  <a href="/packages" className="hp-btn hp-btn-outline-light">
                    View Our Packages <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
              <HeroQuoteForm />
            </div>
          </m.section>
        )}

        {view === "home" && (
          <m.section {...sectionMotion} className="hp-section hp-section-white hp-about" id="about">
            <div className="container hp-about-grid">
              <div className="hp-about-copy">
                <Eyebrow>About ARKA</Eyebrow>
                <h2>
                  A Building Construction Company in <span>Chennai and Chengalpattu</span>
                </h2>
                <p>
                  ARKA Constructions is a construction company based in
                  Maraimalai Nagar, Chengalpattu, serving Chennai and the towns
                  around it. We build houses, commercial buildings, factories
                  and the civil works around them. Whether it is a family home
                  or a plant building, we keep the same rules: honest quotes,
                  good materials and work finished when we said it would be.
                </p>
                <p>
                  Our founder, Kamarajan Krishnan, is an engineer who has worked
                  on residential, commercial and industrial projects. He leads a
                  team of engineers, supervisors and skilled workers who handle
                  everything from foundation to finishing.
                </p>
                <p>
                  We are a registered MSME business with a GST registration.
                </p>
              </div>
              <div className="hp-about-visual">
                <div className="hp-about-image">
                  <img
                    src="/images/about-engineer.jpg"
                    alt="Engineers reviewing construction drawings on site (representative image)"
                    loading="lazy"
                    width="1400"
                    height="933"
                  />
                </div>
                <div className="hp-about-card">
                  <div className="hp-about-monogram">KK</div>
                  <div>
                    <strong>Kamarajan Krishnan</strong>
                    <span>Proprietor &amp; Engineer</span>
                  </div>
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </m.section>
        )}

        {(view === "home" || view === "projects") && (
          <m.section
            {...sectionMotion}
            className="hp-section hp-section-ivory hp-projects"
            id="projects"
          >
            <div className="container">
              <div className="hp-section-head">
                <div>
                  <Eyebrow>Our Construction Projects</Eyebrow>
                  {view === "projects" ? (
                    <h1>See the <span>Transformation</span></h1>
                  ) : (
                    <h2>See the <span>Transformation</span></h2>
                  )}
                </div>
                <p>
                  Slide the handle to compare the design with the finished
                  building. Every project starts as a drawing and ends as a
                  place people use every day.
                </p>
              </div>
              <div className="hp-projects-toolbar">
                <p>
                  Completed and ongoing works across residential, commercial and
                  industrial projects.
                </p>
                <div className="hp-tabs" role="tablist" aria-label="Project status">
                  {(["completed", "ongoing"] as const).map((name) => (
                    <button
                      key={name}
                      id={`hp-tab-${name}`}
                      className={`hp-tab ${tab === name ? "is-active" : ""}`}
                      role="tab"
                      aria-selected={tab === name}
                      aria-controls={`hp-panel-${name}`}
                      tabIndex={tab === name ? 0 : -1}
                      onClick={() => setTab(name)}
                      onKeyDown={(event) => {
                        if (
                          event.key === "ArrowLeft" ||
                          event.key === "ArrowRight"
                        ) {
                          event.preventDefault();
                          const next =
                            name === "completed" ? "ongoing" : "completed";
                          setTab(next);
                          document.getElementById(`hp-tab-${next}`)?.focus();
                        }
                      }}
                    >
                      {tab === name && (
                        <m.span
                          className="hp-tab-indicator"
                          layoutId="project-status-indicator"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="hp-tab-label">
                        {name === "completed" ? "Completed" : "Ongoing"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {tab === "completed" ? (
                <div
                  id="hp-panel-completed"
                  role="tabpanel"
                  aria-labelledby="hp-tab-completed"
                  className="hp-project-grid"
                >
                  {completedProjects.map((project) => (
                    <m.article
                      {...cardMotion}
                      className="hp-project-card"
                      key={`${project.client}-${project.location}`}
                    >
                      <BeforeAfter
                        before={project.design}
                        after={project.completed}
                        label={project.client}
                      />
                      <div className="hp-project-body">
                        <div className="hp-project-top">
                          <span className="hp-project-type">
                            {project.type} · Completed
                          </span>
                          <button
                            className="hp-project-arrow"
                            aria-label={`Enquire about ${project.client}`}
                            onClick={() =>
                              openModal({
                                type: "quote",
                                interest: `${project.type} project — ${project.client}`,
                              })
                            }
                          >
                            <ArrowUpRight size={16} />
                          </button>
                        </div>
                        <h3>{project.client}</h3>
                        <p className="hp-project-location">
                          <MapPin size={13} /> {project.location}
                        </p>
                        <dl className="hp-project-meta">
                          <div>
                            <dt>Build up</dt>
                            <dd>{project.buildUp}</dd>
                          </div>
                          <div>
                            <dt>Plot</dt>
                            <dd>{project.plot}</dd>
                          </div>
                        </dl>
                      </div>
                    </m.article>
                  ))}
                </div>
              ) : (
                <div
                  id="hp-panel-ongoing"
                  role="tabpanel"
                  aria-labelledby="hp-tab-ongoing"
                  className="hp-project-grid"
                >
                  {ongoingProjects.map((project) => (
                    <m.article
                      {...cardMotion}
                      className="hp-project-card"
                      key={`${project.client}-${project.location}`}
                    >
                      <div className="hp-compare">
                        <img
                          src={project.image}
                          alt={`${project.client} construction in progress`}
                          loading="lazy"
                        />
                        <span className="hp-compare-tag hp-compare-tag-after">
                          In progress
                        </span>
                      </div>
                      <div className="hp-project-body">
                        <div className="hp-project-top">
                          <span className="hp-project-type">
                            {project.type} · Ongoing
                          </span>
                          <button
                            className="hp-project-arrow"
                            aria-label={`Enquire about ${project.client}`}
                            onClick={() =>
                              openModal({
                                type: "quote",
                                interest: `${project.type} project — ${project.client}`,
                              })
                            }
                          >
                            <ArrowUpRight size={16} />
                          </button>
                        </div>
                        <h3>{project.client}</h3>
                        <p className="hp-project-location">
                          <MapPin size={13} /> {project.location}
                        </p>
                        <dl className="hp-project-meta">
                          <div>
                            <dt>Build up</dt>
                            <dd>{project.buildUp}</dd>
                          </div>
                          <div>
                            <dt>Plot</dt>
                            <dd>{project.plot}</dd>
                          </div>
                        </dl>
                      </div>
                    </m.article>
                  ))}
                </div>
              )}
              <p className="hp-project-note">
                Representative project photographs and indicative area details.
                Confirmed case studies, client references and drawings are
                shared on request.
              </p>
            </div>
          </m.section>
        )}

        {(view === "home" || view === "packages") && (
          <m.section
            {...sectionMotion}
            className="hp-section hp-section-white hp-packages"
            id="packages"
          >
            <div className="container">
              <div className="hp-section-head">
                <div>
                  <Eyebrow>Our Construction Packages</Eyebrow>
                  {view === "packages" ? (
                    <h1>Residential Construction Company in Chennai &amp; Chengalpattu: <span>Home Packages from ₹2,200/sq ft</span></h1>
                  ) : (
                    <h2>Residential Construction Company in Chennai &amp; Chengalpattu: <span>Home Packages from ₹2,200/sq ft</span></h2>
                  )}
                </div>
                <p>
                  Compare the material specifications for our Standard, Premium
                  and Royal packages, and ask our team for a project-specific quotation.
                </p>
              </div>
              <div className="hp-package-highlights" aria-label="Package highlights">
                <div><Home size={19} /><span><strong>Three packages</strong> to compare</span></div>
                <div><IndianRupee size={19} /><span><strong>Material specifications</strong> for each package</span></div>
                <div><Wrench size={19} /><span><strong>Extra work</strong> quoted separately</span></div>
              </div>
              <div className="hp-package-grid">
                {packages.map((pkg, index) => (
                  <m.article
                    {...cardMotion}
                    className={`hp-package ${pkg.featured ? "is-featured" : ""}`}
                    key={pkg.name}
                  >
                    <div className="hp-package-head">
                      <span>{pkg.name}</span>
                      <div className="hp-package-price">
                        {pkg.price} <small>{pkg.unit}</small>
                      </div>
                    </div>
                    <div className="hp-package-body">
                      <p className="hp-package-desc">{pkg.description}</p>
                      {pkg.details.map((detail) => (
                        <details key={detail.title}>
                          <summary>
                            {detail.title} <Plus size={16} />
                          </summary>
                          <p>{detail.text}</p>
                        </details>
                      ))}
                      <button
                        className={`hp-btn ${
                          pkg.featured ? "hp-btn-gold" : "hp-btn-outline"
                        }`}
                        onClick={() =>
                          openModal({ type: "package", index })
                        }
                      >
                        Get a Quote <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </m.article>
                ))}
              </div>
              <p className="hp-package-note">
                Rates are per sq ft as listed in the package document. Confirm current rates,
                area basis, taxes, material availability and inclusions with our team.
              </p>
              <div className="hp-package-terms">
                <div><h3>Additional work</h3><p>Compound wall: ₹2,300 per running ft · Cooling tiles: ₹140 per sq ft · Sump: ₹28 per litre · Septic tank: ₹18 per litre · Head room: ₹2,100 per sq ft.</p></div>
                <div><h3>Client scope</h3><p>Building plan approval, borewell and motor fittings, electricity connection and main board (labour and materials), and water for construction.</p></div>
                <div><h3>Separate budget offer</h3><p>The document also lists a budget package from ₹2,300 per sq ft for a minimum plot size of 1,250 sq ft. Ask our team to confirm its current availability and detailed scope.</p></div>
              </div>
            </div>
          </m.section>
        )}

        {(view === "home" || view === "services") && (
          <m.section
            {...sectionMotion}
            className="hp-section hp-section-ivory hp-services"
            id="services"
          >
            <div className="container">
              <div className="hp-section-head">
                <div>
                  <Eyebrow>Our Construction Services</Eyebrow>
                  {view === "services" ? (
                    <h1>Civil Construction Company in Chennai &amp; Chengalpattu for <span>Homes, Offices and Factories</span></h1>
                  ) : (
                    <h2>Civil Construction Company in Chennai &amp; Chengalpattu for <span>Homes, Offices and Factories</span></h2>
                  )}
                </div>
                <p>
                  One team for your house, your shop or your plant. You deal
                  with one company from start to handover.
                </p>
              </div>
              <div className="hp-service-categories">
                {serviceCategories.map((category) => (
                  <m.article
                    {...cardMotion}
                    className="hp-service-category"
                    key={category.title}
                    id={category.title.split(" ")[0].toLowerCase()}
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      loading="lazy"
                    />
                    <div className="hp-service-category-body">
                      <span className="hp-service-category-icon">
                        <category.icon size={22} />
                      </span>
                      <h3>{category.title}</h3>
                      <p>{category.text}</p>
                      <a href="/services">
                        Explore Services <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </m.article>
                ))}
              </div>
            </div>
          </m.section>
        )}

        {(view === "home" || view === "services") && (
          <m.section {...sectionMotion} className="hp-section hp-section-white hp-what" id="what-we-do">
            <div className="container">
              <div className="hp-what-heading">
                <div><Eyebrow>Our Services</Eyebrow><h2>What We Do</h2></div>
                <div className="hp-what-heading-copy">
                  <p className="hp-what-lead">From foundation to finishing, one team for every stage.</p>
                  <p>ARKA brings together civil work, fabrication, flooring, glazing, plumbing and painting for homes, businesses and industrial projects across Chennai and Chengalpattu.</p>
                </div>
              </div>
              <div className="hp-what-grid">
                {services.map((service, index) => (
                  <m.article {...cardMotion} className="hp-what-card" key={service.title}>
                    <img className="hp-what-image" src={`/images/${serviceImages[index]}`} alt="" loading="lazy" />
                    <div className="hp-what-body">
                      <h3>{service.title}</h3>
                      <p>{service.detail}</p>
                    </div>
                  </m.article>
                ))}
              </div>
            </div>
          </m.section>
        )}

        {view === "home" && (
          <m.section {...sectionMotion} className="hp-why" id="why-arka">
            <div className="container hp-why-grid">
              <div className="hp-why-copy">
                <Eyebrow light>Why Choose ARKA</Eyebrow>
                <h2>
                  Why Families and Businesses in Chennai &amp; Chengalpattu <span>Choose ARKA</span>
                </h2>
                <p>
                  A good builder is one who answers your calls, tells you the
                  cost up front and finishes on time. This is how we work.
                </p>
              </div>
              <div className="hp-why-list">
                {whyReasons.map((reason) => (
                  <m.article {...cardMotion} className="hp-why-item" key={reason.title}>
                    <reason.icon size={22} strokeWidth={1.5} />
                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.text}</p>
                    </div>
                  </m.article>
                ))}
              </div>
            </div>
          </m.section>
        )}

        {view === "home" && (
          <m.section {...sectionMotion} className="hp-section hp-areas" id="areas-we-cover">
            <div className="container hp-areas-grid">
              <div className="hp-areas-copy">
                <Eyebrow light>Areas We Cover</Eyebrow>
                <h2>
                  Construction Services in <span>Chennai, Chengalpattu,</span>{" "}
                  Kanchipuram, Oragadam &amp; Nearby Areas
                </h2>
                <p>
                  Chennai and Chengalpattu are our main areas. We also take up
                  work in the towns and industrial belts around them. If your
                  site is nearby and not listed, call us and we will tell you
                  honestly if we can take it up.
                </p>
                <div className="hp-areas-actions">
                  <a className="hp-btn hp-btn-gold" href="tel:+919952525185">
                    Call 99525 25185
                  </a>
                  <button className="hp-btn hp-btn-outline" onClick={() => openModal({ type: "quote" })}>
                    Get a Free Quote
                  </button>
                </div>
              </div>
              <div className="hp-areas-panel">
                <div className="hp-area-panel-group">
                  <strong className="hp-area-label">Main areas</strong>
                  <div className="hp-main-areas">
                    {mainServiceAreas.map((area) => (
                      <article className="hp-main-area" key={area}>
                        <span className="hp-area-pin"><MapPin size={21} /></span>
                        <h3>{area}</h3>
                        <p>{area === "Chennai" ? "Homes, offices and industrial works" : "Our base, in Maraimalai Nagar"}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="hp-area-panel-group hp-area-nearby">
                  <strong className="hp-area-label">Also serving</strong>
                  <div className="hp-area-chips">
                    {nearbyServiceAreas.map((area) => (
                      <span key={area}><MapPin size={13} />{area}</span>
                    ))}
                  </div>
                </div>
                <p className="hp-area-note">
                  Site not on the list? <button onClick={() => openModal({ type: "quote" })}>Call us</button> and we will check.
                </p>
              </div>
            </div>
          </m.section>
        )}

        {view === "home" && (
          <m.section
            {...sectionMotion}
            className="hp-section hp-section-ivory hp-approach"
            id="approach"
          >
            <div className="container">
              <div className="hp-approach-grid">
                <div className="hp-approach-intro">
                  <Eyebrow>Our Approach</Eyebrow>
                  <h2>
                    From Plan to Handover: <span>How We Build</span>
                  </h2>
                  <p>
                    No guesswork. You know what is happening at every step.
                  </p>
                  <button
                    className="hp-btn hp-btn-dark"
                    onClick={() => openModal({ type: "quote" })}
                  >
                    Talk to Our Team{" "}
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <ol className="hp-steps" aria-label="Our four-step project process">
                  {approachSteps.map(([title, text], index) => (
                    <m.li
                      className="hp-step"
                      key={title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      whileHover={{ y: -7 }}
                    >
                      <span className="hp-step-watermark" aria-hidden="true">
                        0{index + 1}
                      </span>
                      <div className="hp-step-top">
                        <span className="hp-step-num">0{index + 1}</span>
                        <span className="hp-step-label">Step {index + 1} of 4</span>
                      </div>
                      <div className="hp-step-copy">
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                    </m.li>
                  ))}
                </ol>
              </div>
              <div className="hp-vm">
                <m.article {...cardMotion} className="hp-vm-card">
                  <Target size={26} />
                  <div>
                    <h3>Our Vision</h3>
                    <p>
                      To be the construction partner people in Tamil Nadu trust
                      for quality and honest work.
                    </p>
                  </div>
                </m.article>
                <m.article {...cardMotion} className="hp-vm-card">
                  <Flag size={26} />
                  <div>
                    <h3>Our Mission</h3>
                    <p>
                      To deliver good-quality construction on time and within
                      budget, through skilled people, modern methods and clear
                      communication.
                    </p>
                  </div>
                </m.article>
              </div>
            </div>
          </m.section>
        )}

        {view === "home" && (
          <m.section {...sectionMotion} className="hp-faq" id="faqs">
            <div className="container">
              <div className="hp-faq-head">
                <span className="hp-faq-eyebrow">Client Questions</span>
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="hp-faq-list">
                {faqs.map(([question, answer], index) => (
                  <div
                    className={`hp-faq-item ${openFaq === index ? "is-open" : ""}`}
                    key={question}
                  >
                    <h3>
                      <button
                        type="button"
                        className="hp-faq-trigger"
                        aria-expanded={openFaq === index}
                        aria-controls={`faq-answer-${index}`}
                        id={`faq-question-${index}`}
                        onClick={() => setOpenFaq(index)}
                      >
                        <span>{question}</span>
                        <ChevronDown size={20} />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {openFaq === index && (
                        <m.div
                          id={`faq-answer-${index}`}
                          role="region"
                          aria-labelledby={`faq-question-${index}`}
                          className="hp-faq-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.22 } }}
                        >
                          <p>{answer}</p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </m.section>
        )}
      </main>

      <footer className="hp-footer">
        <div className="container">
          <div className="hp-footer-grid">
            <div className="hp-footer-brand">
              <Brand light />
              <p>
                Quality Is Our Commitment,
                <br />
                Trust Is Our Identity
              </p>
              <span>Residential · Commercial · Industrial</span>
              <p className="hp-footer-description">From first plans to final handover, we build spaces for families, businesses and industry across Chennai and Chengalpattu.</p>
            </div>
            <div>
              <h3>Quick Links</h3>
              <a href="/">Home</a>
              <a href="/#about">About Us</a>
              <a href="/packages">Construction Packages</a>
              <a href="/projects">Construction Projects</a>
              <button onClick={() => openModal({ type: "quote" })}>
                Contact Us
              </button>
            </div>
            <div>
              <h3>Construction Services</h3>
              {serviceCategories.map((service) => (
                <a key={service.title} href={`/services#${service.title.split(" ")[0].toLowerCase()}`}>
                  {service.title}
                </a>
              ))}
            </div>
            <div>
              <h3>Contact Information</h3>
              <a href="tel:+919952525185">
                <Phone size={14} /> 99525 25185
              </a>
              <a href="tel:+919994735262">
                <Phone size={14} /> 99947 35262
              </a>
              <a href="mailto:arkaconstructions96@gmail.com">
                <Mail size={14} /> arkaconstructions96@gmail.com
              </a>
              <p>
                <MapPin size={14} /> 23/3b3, Union Salai Street, Peramanur,
                Maraimalai Nagar, Chengalpattu – 603209, Tamil Nadu, India.
              </p>
              <p className="hp-footer-gst">
                <BadgeCheck size={14} /> GST: 33EJWPK0310L3Z1
              </p>
            </div>
          </div>
          <div className="hp-footer-bottom">
            <span>
              © {new Date().getFullYear()} ARKA Constructions. All Rights
              Reserved.
            </span>
            <span aria-hidden="true">·</span>
            <button onClick={() => openModal({ type: "privacy" })}>
              Privacy &amp; enquiries
            </button>
          </div>
        </div>
      </footer>

      <div className="mobile-contact">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={19} /> WhatsApp
        </a>
        <button onClick={() => openModal({ type: "quote" })}>
          Get a Free Quote <ArrowUpRight size={17} />
        </button>
      </div>

      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Message ARKA on WhatsApp"><WhatsAppIcon size={28} /></a>

      {modal?.type === "quote" && <div className="quote-backdrop" aria-hidden="true" onClick={closeModal} />}
      <dialog
        ref={dialog}
        className={`modal${modal?.type === "quote" ? " modal-quote" : ""}`}
        aria-labelledby="modal-title"
        onCancel={(event) => {
          event.preventDefault();
          closeModal();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) closeModal();
        }}
      >
        <m.div
          className="modal-inner"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <button
            className="modal-close"
            onClick={closeModal}
            aria-label="Close dialog"
          >
            <X size={22} />
          </button>
          {modal?.type === "quote" && (
            <>
              <Eyebrow>Your next project starts here</Eyebrow>
              <h2 id="modal-title">
                Let&rsquo;s make
                <br />
                <span>something lasting.</span>
              </h2>
              <p>
                Tell us a little about your project. Our team will review your
                enquiry and contact you.
              </p>
              <form
                onSubmit={submitModalQuote}
                className="quote-form"
                hidden={prepared}
                aria-busy={modalSubmitting}
                noValidate
              >
                <div className="form-row">
                  <label>
                    <span className="label-text">Your name <span className="required-mark" aria-hidden="true">*</span></span>
                    <input
                      name="name"
                      required
                      minLength={2}
                      autoComplete="name"
                      maxLength={100}
                      placeholder="Full name"
                      aria-invalid={Boolean(modalFieldErrors.name)}
                      aria-describedby={modalFieldErrors.name ? "modal-name-error" : undefined}
                      onInput={() => setModalFieldErrors((current) => ({ ...current, name: undefined }))}
                    />
                    {modalFieldErrors.name && <span className="field-error" id="modal-name-error">{modalFieldErrors.name}</span>}
                  </label>
                  <label>
                    <span className="label-text">Mobile number <span className="required-mark" aria-hidden="true">*</span></span>
                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={16}
                      placeholder="Your phone number"
                      aria-invalid={Boolean(modalFieldErrors.phone)}
                      aria-describedby={modalFieldErrors.phone ? "modal-phone-error" : undefined}
                      onInput={() => setModalFieldErrors((current) => ({ ...current, phone: undefined }))}
                    />
                    {modalFieldErrors.phone && <span className="field-error" id="modal-phone-error">{modalFieldErrors.phone}</span>}
                  </label>
                </div>
                <label>
                  <span className="label-text">Site location <span className="required-mark" aria-hidden="true">*</span></span>
                  <input
                    name="location"
                    required
                    minLength={2}
                    autoComplete="address-level2"
                    maxLength={150}
                    placeholder="Area / town / city"
                    aria-invalid={Boolean(modalFieldErrors.location)}
                    aria-describedby={modalFieldErrors.location ? "modal-location-error" : undefined}
                    onInput={() => setModalFieldErrors((current) => ({ ...current, location: undefined }))}
                  />
                  {modalFieldErrors.location && <span className="field-error" id="modal-location-error">{modalFieldErrors.location}</span>}
                </label>
                <label>
                  <span className="label-text">What can we help with? <span className="required-mark" aria-hidden="true">*</span></span>
                  <select
                    name="service"
                    defaultValue={modal.interest || "Residential construction"}
                    aria-invalid={Boolean(modalFieldErrors.service)}
                    aria-describedby={modalFieldErrors.service ? "modal-service-error" : undefined}
                    onChange={() => setModalFieldErrors((current) => ({ ...current, service: undefined }))}
                  >
                    {[
                      ...new Set(
                        [
                          modal.interest,
                          "Residential construction",
                          "Commercial or industrial work",
                          ...services.map((service) => service.title),
                          ...packages.map((pkg) => pkg.name),
                          "Request project portfolio",
                          "Not sure — let’s discuss",
                        ].filter(Boolean),
                      ),
                    ].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  {modalFieldErrors.service && <span className="field-error" id="modal-service-error">{modalFieldErrors.service}</span>}
                </label>
                <label>
                  A little about your project <span>(optional)</span>
                  <textarea
                    name="message"
                    maxLength={2000}
                    rows={3}
                    placeholder="Your requirements, approximate area, or planned start date…"
                  />
                </label>
                <p className="form-note">
                  By submitting, you agree that ARKA may contact you about your project.
                </p>
                <input className="hp-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <RecaptchaWidget onToken={setModalRecaptchaToken} resetKey={modalRecaptchaResetKey} />
                {modalError && <p className="form-error" role="alert">{modalError}</p>}
                <button className="hp-btn hp-btn-gold" type="submit" disabled={modalSubmitting || !modalRecaptchaToken}>
                  {modalSubmitting ? "Submitting…" : "Send My Enquiry"} {!modalSubmitting && <ArrowRight size={18} />}
                </button>
              </form>
              {prepared && (
                <div className="enquiry-ready" role="status">
                  <CheckCircle2 size={42} />
                  <h3>Thank you. Your enquiry has been received.</h3>
                  <p>Our team will review the details and contact you shortly.</p>
                  <button className="hp-btn hp-btn-gold" type="button" onClick={closeModal}>Done</button>
                </div>
              )}
            </>
          )}
          {modal?.type === "package" && (
            <>
              <Eyebrow>A starting point for your home</Eyebrow>
              <h2 id="modal-title">
                The {packages[modal.index].name}
                <br />
                <span>conversation.</span>
              </h2>
              <p>{packages[modal.index].description}</p>
              <div className="modal-callout">
                <strong>
                  {packages[modal.index].price}{" "}
                  {packages[modal.index].unit}
                </strong>
                <br />
                This is a proposed planning option, not a fixed-price offer.
                Ask our team for a written scope covering materials, allowances,
                area basis, taxes, exclusions and the project schedule.
              </div>
              <ul className="modal-list">
                {packages[modal.index].details.map((detail) => (
                  <li key={detail.title}>
                    <Check size={17} />
                    <span>
                      <strong>{detail.title}:</strong> {detail.text}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className="hp-btn hp-btn-gold"
                onClick={() => {
                  setPrepared(false);
                  setModal({
                    type: "quote",
                    interest: `${packages[modal.index].name}`,
                  });
                }}
              >
                Discuss This Package <ArrowUpRight size={18} />
              </button>
            </>
          )}
          {modal?.type === "privacy" && (
            <>
              <Eyebrow>Your information</Eyebrow>
              <h2 id="modal-title">Privacy &amp; enquiries</h2>
              <p>
                When you submit an enquiry, the details you provide are stored
                securely so ARKA Constructions can review your request and
                contact you about the project.
              </p>
              <p>
                We use the information only to respond to your enquiry and
                manage the project discussion. We do not ask for payment or
                sensitive identity information through these forms.
              </p>
              <p>
                For questions about information you have shared, contact ARKA
                using the email or phone numbers listed on this page. Map links
                open an external service.
              </p>
            </>
          )}
        </m.div>
      </dialog>
    </MotionConfig>
    </LazyMotion>
  );
}
