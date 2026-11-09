"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
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
    name: "Essential Package",
    price: "₹2,449",
    unit: "per sqft",
    description: "A simple, well-built home for families who want good quality at a fair price.",
    featured: false,
    details: [
      {
        title: "Design",
        text: "Planning and structural drawings made for your plot and family needs.",
      },
      {
        title: "Project Management",
        text: "An engineer supervises the site, checks materials and sends you regular updates.",
      },
      {
        title: "Structure",
        text: "RCC frame, brickwork and plastering done to the agreed specification.",
      },
    ],
  },
  {
    name: "Signature Package",
    price: "₹2,699",
    unit: "per sqft",
    description: "More choices in design and finishes, with extra attention at every stage.",
    featured: true,
    details: [
      {
        title: "Design",
        text: "Better planning, 3D elevation and help in choosing materials.",
      },
      {
        title: "Project Management",
        text: "A dedicated coordinator, a clear schedule and quality checks at each stage.",
      },
      {
        title: "Structure",
        text: "RCC and steel work with upgraded material options.",
      },
    ],
  },
  {
    name: "Elite Luxury Package",
    price: "₹3,449",
    unit: "per sqft",
    description: "For homes where design and finishing matter most.",
    featured: false,
    details: [
      {
        title: "Design",
        text: "Custom design, detailed 3D views and advice on special finishes.",
      },
      {
        title: "Project Management",
        text: "Full-time supervision and careful coordination of premium materials.",
      },
      {
        title: "Structure",
        text: "Higher structural specification, better finishes and detailed work planning.",
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
    "Our home construction packages start from ₹2,449 per sq ft. The Essential package is ₹2,449, the Signature package is ₹2,699 and the Elite Luxury package is ₹3,449 per sq ft. The final quote depends on your plot, floors, materials and local approvals.",
  ],
  [
    "What is the minimum area you build for?",
    "We take up homes starting from 1,200 sq ft. If your plan is smaller or larger, call us and we will check what is possible.",
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

const footerServices = [
  "Civil & RCC Works",
  "Flooring Works",
  "Fabrication Works",
  "Glazing & Aluminium",
  "Paver Blocks",
  "Waterproofing",
  "Industrial Works",
  "Repair & Maintenance",
];

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

function HeroQuoteForm() {
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
          placeholder="Name"
          aria-label="Name"
        />
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
          placeholder="Phone Number"
          aria-label="Phone number"
        />
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
          placeholder="Site Location"
          aria-label="Site location"
        />
      </label>
      <label className="hp-field">
        <Layers3 size={16} />
        <select name="plotArea" required defaultValue="" aria-label="Plot area">
          <option value="" disabled>
            Plot Area (sq ft)
          </option>
          <option>1200 - 2000 sq ft</option>
          <option>2000 - 3000 sq ft</option>
          <option>3000 - 4000 sq ft</option>
          <option>4000+ sq ft</option>
        </select>
        <ChevronDown size={15} />
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
  const [emailLink, setEmailLink] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  function openModal(next: Modal) {
    returnFocus.current = document.activeElement as HTMLElement;
    setPrepared(false);
    setMenu(false);
    setModal(next);
  }

  function closeModal() {
    dialog.current?.close();
    setModal(null);
    returnFocus.current?.focus();
  }

  useEffect(() => {
    if (modal) {
      dialog.current?.showModal();
    }
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
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <motion.header
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
              className="phone-link"
              href="tel:+919952525185"
              aria-label="Call ARKA on 9952525185"
            >
              <Phone size={16} />
              <span>+91 99525 25185</span>
            </a>
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
      </motion.header>
      <AnimatePresence>
        {menu && (
          <motion.button
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
          <motion.section {...sectionMotion} className="hp-hero" aria-labelledby="hero-title">
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
                  areas. Packages start from ₹2,449 per sq ft, for homes from
                  1,200 sq ft.
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
          </motion.section>
        )}

        {view === "home" && (
          <motion.section {...sectionMotion} className="hp-section hp-section-white hp-about" id="about">
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
          </motion.section>
        )}

        {(view === "home" || view === "projects") && (
          <motion.section
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
                        <motion.span
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
                    <motion.article
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
                    </motion.article>
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
                    <motion.article
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
                    </motion.article>
                  ))}
                </div>
              )}
              <p className="hp-project-note">
                Representative project photographs and indicative area details.
                Confirmed case studies, client references and drawings are
                shared on request.
              </p>
            </div>
          </motion.section>
        )}

        {(view === "home" || view === "packages") && (
          <motion.section
            {...sectionMotion}
            className="hp-section hp-section-white hp-packages"
            id="packages"
          >
            <div className="container">
              <div className="hp-section-head">
                <div>
                  <Eyebrow>Our Construction Packages</Eyebrow>
                  {view === "packages" ? (
                    <h1>Residential Construction Company in Chennai &amp; Chengalpattu: <span>Home Packages from ₹2,449/sq ft</span></h1>
                  ) : (
                    <h2>Residential Construction Company in Chennai &amp; Chengalpattu: <span>Home Packages from ₹2,449/sq ft</span></h2>
                  )}
                </div>
                <p>
                  Pick the package that fits your budget. We build homes from
                  1,200 sq ft, and every package can be adjusted for your site
                  and choice of materials.
                </p>
              </div>
              <div className="hp-package-highlights" aria-label="Package highlights">
                <div><Home size={19} /><span>Starting from <strong>1,200 sq ft</strong></span></div>
                <div><IndianRupee size={19} /><span><strong>Competitive rates</strong> for clear specifications</span></div>
                <div><Wrench size={19} /><span><strong>1 year free maintenance labour</strong> after handover</span></div>
              </div>
              <div className="hp-package-grid">
                {packages.map((pkg, index) => (
                  <motion.article
                    {...cardMotion}
                    className={`hp-package ${pkg.featured ? "is-featured" : ""}`}
                    key={pkg.name}
                  >
                    {pkg.featured && (
                      <span className="hp-package-ribbon">Most Popular</span>
                    )}
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
                  </motion.article>
                ))}
              </div>
              <p className="hp-package-note">
                Rates are starting rates per sq ft. Your final quote depends on
                area, floors, materials, site conditions and approvals.
              </p>
            </div>
          </motion.section>
        )}

        {(view === "home" || view === "services") && (
          <motion.section
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
                  <motion.article
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
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {(view === "home" || view === "services") && (
          <motion.section {...sectionMotion} className="hp-section hp-section-white hp-what" id="what-we-do">
            <div className="container">
              <div className="hp-section-head">
                <div>
                  <Eyebrow>Our Services</Eyebrow>
                  <h2>What We Do</h2>
                </div>
                <p>
                  Complete construction work in Chennai &amp; Chengalpattu, from
                  foundation to finishing.
                </p>
              </div>
              <p className="hp-what-intro">
                When you build with ARKA, you do not need to hire a different
                contractor for each job. Civil work, steel, flooring, glazing,
                plumbing and painting are all handled by our own team, whether
                you are building a home, a commercial building or a factory.
              </p>
              <div className="hp-what-grid">
                {services.map((service) => (
                  <motion.article {...cardMotion} className="hp-what-card" key={service.title}>
                    <div className="hp-what-body">
                      <span className="hp-what-icon">
                        <service.icon size={24} />
                      </span>
                      <h3>{service.title}</h3>
                      <p>{service.detail}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {view === "home" && (
          <motion.section {...sectionMotion} className="hp-why" id="why-arka">
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
                  <motion.article {...cardMotion} className="hp-why-item" key={reason.title}>
                    <reason.icon size={22} strokeWidth={1.5} />
                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.text}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {view === "home" && (
          <motion.section {...sectionMotion} className="hp-section hp-areas" id="areas-we-cover">
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
          </motion.section>
        )}

        {view === "home" && (
          <motion.section
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
                    <motion.li
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
                    </motion.li>
                  ))}
                </ol>
              </div>
              <div className="hp-vm">
                <motion.article {...cardMotion} className="hp-vm-card">
                  <Target size={26} />
                  <div>
                    <h3>Our Vision</h3>
                    <p>
                      To be the construction partner people in Tamil Nadu trust
                      for quality and honest work.
                    </p>
                  </div>
                </motion.article>
                <motion.article {...cardMotion} className="hp-vm-card">
                  <Flag size={26} />
                  <div>
                    <h3>Our Mission</h3>
                    <p>
                      To deliver good-quality construction on time and within
                      budget, through skilled people, modern methods and clear
                      communication.
                    </p>
                  </div>
                </motion.article>
              </div>
            </div>
          </motion.section>
        )}

        {view === "home" && (
          <motion.section {...sectionMotion} className="hp-faq" id="faqs">
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
                        <motion.div
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </main>

      <footer className="hp-footer">
        <div className="container">
          <div className="hp-footer-grid">
            <div className="hp-footer-brand">
              <Brand light />
              <p>
                Building Tomorrow&rsquo;s
                <br />
                Foundations Today
              </p>
              <span>Residential · Commercial · Industrial</span>
            </div>
            <div>
              <h3>Quick Links</h3>
              <a href="/">Home</a>
              <a href="/#about">About Us</a>
              <a href="/services">Services</a>
              <a href="/projects">Projects</a>
              <button onClick={() => openModal({ type: "quote" })}>
                Contact Us
              </button>
            </div>
            <div>
              <h3>Our Services</h3>
              {footerServices.map((service) => (
                <a key={service} href="/services">
                  {service}
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
        <a href="tel:+919952525185">
          <Phone size={17} /> Call ARKA
        </a>
        <button onClick={() => openModal({ type: "quote" })}>
          Get a Free Quote <ArrowUpRight size={17} />
        </button>
      </div>

      <dialog
        ref={dialog}
        className="modal"
        aria-labelledby="modal-title"
        onCancel={(event) => {
          event.preventDefault();
          closeModal();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) closeModal();
        }}
      >
        <motion.div
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
                Tell us a little about your project. We&rsquo;ll prepare an
                email for you to review and send to ARKA.
              </p>
              <form
                onSubmit={prepareQuote}
                className="quote-form"
                hidden={prepared}
              >
                <div className="form-row">
                  <label>
                    Your name
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      maxLength={100}
                      placeholder="Full name"
                    />
                  </label>
                  <label>
                    Mobile number
                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      pattern="[+]?[0-9]{10,15}"
                      title="Enter 10 to 15 digits, optionally starting with +. Do not include spaces."
                      maxLength={20}
                      placeholder="Your phone number"
                    />
                  </label>
                </div>
                <label>
                  Site location
                  <input
                    name="location"
                    required
                    autoComplete="address-level2"
                    maxLength={150}
                    placeholder="Area / town / city"
                  />
                </label>
                <label>
                  What can we help with?
                  <select
                    name="service"
                    defaultValue={modal.interest || "Residential construction"}
                  >
                    {[
                      ...new Set(
                        [
                          modal.interest,
                          "Residential construction",
                          "Commercial or industrial work",
                          ...services.map((service) => service.title),
                          "Standard package",
                          "Premium package",
                          "Ultra Luxury package",
                          "Request project portfolio",
                          "Not sure — let’s discuss",
                        ].filter(Boolean),
                      ),
                    ].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
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
                  Your details stay in this page until you choose to send them
                  through your email app. ARKA will use your enquiry to discuss
                  your project.
                </p>
                <button className="hp-btn hp-btn-gold" type="submit">
                  Prepare My Enquiry <ArrowRight size={18} />
                </button>
              </form>
              {prepared && (
                <div className="enquiry-ready" role="status">
                  <CheckCircle2 size={42} />
                  <h3>Your enquiry is ready to review.</h3>
                  <p>
                    Nothing has been sent yet. Open your email app, review the
                    prepared message and send it to ARKA.
                  </p>
                  <a className="hp-btn hp-btn-gold" href={emailLink}>
                    Open Email App <ArrowUpRight size={18} />
                  </a>
                  <p>
                    <a href="mailto:arkaconstructions96@gmail.com">
                      arkaconstructions96@gmail.com
                    </a>
                  </p>
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
                The enquiry form prepares a message locally in your browser.
                This website does not store your form details in a lead database
                or automatically send them.
              </p>
              <p>
                If you choose to send the message using your email app, it is
                shared with ARKA Constructions at
                arkaconstructions96@gmail.com for discussing your enquiry. Your
                email provider&rsquo;s terms also apply.
              </p>
              <p>
                For questions about information you have shared, contact ARKA
                using the email or phone numbers listed on this page. Map links
                open an external service.
              </p>
            </>
          )}
        </motion.div>
      </dialog>
    </MotionConfig>
  );
}
