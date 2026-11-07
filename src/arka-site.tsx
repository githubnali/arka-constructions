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
    title: "Civil & Structural Works",
    icon: Building2,
    detail:
      "Foundations, PCC, RCC, concrete, masonry and plastering. Site development includes excavation, filling, levelling, compaction, roads, pavers and compound walls.",
  },
  {
    title: "Flooring & Finishing",
    icon: Paintbrush,
    detail:
      "Tiles, granite, industrial, epoxy and concrete flooring. Interior, exterior and industrial painting, textures and protective coatings. Waterproofing for terraces, toilets, roofs and structures.",
  },
  {
    title: "Fabrication & Structural Works",
    icon: Hammer,
    detail:
      "MS fabrication, structural steel, industrial sheds, PEB systems, roofing, cladding, mezzanines, staircases, handrails, gates and grills. Aluminium doors and windows, glass doors, partitions, toughened glass and structural glazing.",
  },
  {
    title: "Infrastructure & External Works",
    icon: Route,
    detail:
      "Power block works, roads, pavements, drainage, compound walls and external site development for residential, commercial and industrial campuses.",
  },
  {
    title: "Plumbing & Utilities",
    icon: Droplets,
    detail:
      "Water and sewage lines, chambers, STP interlinks and sanitary works. Plumbing and drainage works for new and existing buildings.",
  },
  {
    title: "Industrial Construction",
    icon: Factory,
    detail:
      "Factory modifications, machine foundations, utility civil works and infrastructure modifications for industrial facilities.",
  },
];

const serviceImages = [
  "/images/service-civil.jpg",
  "/images/service-flooring.jpg",
  "/images/service-fabrication.jpg",
  "/images/service-infrastructure.jpg",
  "/images/service-plumbing.jpg",
  "/images/service-industrial-works.jpg",
];

const serviceCategories = [
  {
    title: "Residential Construction",
    icon: Home,
    image: "/images/service-residential.jpg",
    text: "Homes, villas and apartments built around the way you live.",
  },
  {
    title: "Commercial Construction",
    icon: Building2,
    image: "/images/service-commercial.jpg",
    text: "Offices, retail and commercial spaces built for business.",
  },
  {
    title: "Industrial Construction",
    icon: Factory,
    image: "/images/service-industrial.jpg",
    text: "Factories, plant buildings and industrial facilities built to perform.",
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
    price: "₹2,499",
    unit: "per sqft",
    description: "A practical, quality-first starting point for your home.",
    featured: false,
    details: [
      {
        title: "Design",
        text: "Architectural planning and structural drawings prepared around your site and requirements.",
      },
      {
        title: "Project Management",
        text: "Site supervision, material coordination and regular progress updates through construction.",
      },
      {
        title: "Structure",
        text: "RCC framework, masonry, plastering and structural work executed to the agreed specification.",
      },
    ],
  },
  {
    name: "Premium Package",
    price: "₹2,749",
    unit: "per sqft",
    description: "A balanced package with more choice in design and finishes.",
    featured: true,
    details: [
      {
        title: "Design",
        text: "Enhanced architectural planning, 3D visualisation and material selection support.",
      },
      {
        title: "Project Management",
        text: "A dedicated project coordinator, detailed scheduling and stage-wise quality checks.",
      },
      {
        title: "Structure",
        text: "RCC and structural steel work with upgraded specification options for your home.",
      },
    ],
  },
  {
    name: "Ultra Luxury",
    price: "₹3,499",
    unit: "per sqft",
    description: "A bespoke approach for a home with premium details.",
    featured: false,
    details: [
      {
        title: "Design",
        text: "Bespoke architectural design, detailed 3D visualisation and specialist finish consultation.",
      },
      {
        title: "Project Management",
        text: "End-to-end project management with dedicated supervision and premium material coordination.",
      },
      {
        title: "Structure",
        text: "Premium structural specification, enhanced finishes and detailed execution planning.",
      },
    ],
  },
];

const whyReasons = [
  {
    icon: Users,
    title: "Experienced Team",
    text: "A team of skilled engineers, architects and project managers.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    text: "A strong focus on quality throughout project execution.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    text: "Clear and transparent communication around project requirements.",
  },
  {
    icon: Timer,
    title: "Timely Execution",
    text: "A commitment to planned and timely project delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    text: "Safety-conscious working practices across project activities.",
  },
  {
    icon: Layers3,
    title: "End-to-End Solutions",
    text: "A broad range of construction and maintenance capabilities.",
  },
  {
    icon: HeartHandshake,
    title: "Client Satisfaction",
    text: "A focus on understanding client expectations and delivering dependable results.",
  },
  {
    icon: MapPinned,
    title: "Regional Expertise",
    text: "Based in Chengalpattu, with an understanding of the regional construction environment.",
  },
];

const approachSteps = [
  ["Understand", "Understand project requirements and expectations."],
  ["Plan", "Define scope, resources and execution approach."],
  ["Execute", "Carry out work with attention to quality and safety."],
  ["Deliver", "Focus on dependable completion and client satisfaction."],
];

const faqs = [
  [
    "What services do you provide?",
    "We provide a complete range of construction services for residential, commercial and industrial projects. Our services include building construction, renovation, remodeling, architectural planning, structural works, finishing and maintenance.",
  ],
  [
    "Is your construction team experienced?",
    "Yes. Our team includes engineers, supervisors and skilled craftspeople with experience across residential, commercial and industrial projects. Every project is led with a focus on quality, safety and clear communication.",
  ],
  [
    "Do you complete projects on time?",
    "We plan realistic schedules, coordinate resources and monitor progress to deliver projects on time. Timelines are confirmed in the written scope before work begins.",
  ],
  [
    "Where is ARKA Constructions based?",
    "We are based in Peramanur, Maraimalai Nagar, Chengalpattu, Tamil Nadu. Share your site location with us so we can confirm availability for your area, including enquiries from Chennai.",
  ],
  [
    "How do I get a construction quotation?",
    "Choose Get a Free Quote, add your contact details and a brief description, then send the prepared enquiry through your email app. You can also call 9952525185 or 9994735262.",
  ],
  [
    "Do you handle renovations and industrial modifications?",
    "Yes. We undertake new works as well as modification and maintenance contracts, including factory modifications, machine foundations, utility civil works, repairs and dismantling.",
  ],
];

const footerServices = [
  "Civil & RCC Works",
  "Flooring Works",
  "Fabrication Works",
  "Industrial Works",
  "Waterproofing",
  "Repair & Maintenance",
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
  | { type: "service"; index: number }
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
    const body = `Hello ARKA Constructions,\n\nI would like to discuss a project.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nService required: ${data.get("service")}\nProject location: ${data.get("location")}\n\nPlease contact me to discuss the next steps.\n`;
    setEmailLink(
      `mailto:arkaconstructions96@gmail.com?subject=${encodeURIComponent(
        "Website enquiry — " + data.get("service"),
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
      <p>Tell us what you are planning. Our team will get in touch.</p>
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
          placeholder="Mobile Number"
          aria-label="Mobile number"
        />
      </label>
      <label className="hp-field">
        <Mail size={16} />
        <input
          name="email"
          type="email"
          autoComplete="email"
          maxLength={150}
          placeholder="Email Address"
          aria-label="Email address"
        />
      </label>
      <label className="hp-field">
        <Wrench size={16} />
        <select name="service" defaultValue="" aria-label="Service required">
          <option value="" disabled>
            Service Required
          </option>
          <option>Residential Construction</option>
          <option>Commercial Construction</option>
          <option>Industrial Construction</option>
          <option>Renovation / Remodeling</option>
          <option>Not sure yet</option>
        </select>
        <ChevronDown size={15} />
      </label>
      <label className="hp-field">
        <MapPin size={16} />
        <input
          name="location"
          required
          autoComplete="address-level2"
          maxLength={150}
          placeholder="Project Location"
          aria-label="Project location"
        />
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
                  Best Construction Company in <span>Chennai</span>
                </h1>
                <p>
                  Reliable residential, commercial and industrial construction
                  delivered with a commitment to quality, safety and timely
                  execution.
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
                  Construction Solutions <span>You Can Rely On</span>
                </h2>
                <p>
                  ARKA Constructions is a quality-driven construction company
                  based in Chengalpattu, Tamil Nadu, delivering solutions across
                  residential, commercial, industrial and infrastructure
                  segments.
                </p>
                <p>
                  Led by Kamarajan Krishnan, an engineer with years of
                  experience across residential, commercial and industrial
                  projects, our team of skilled engineers, architects, project
                  managers and craftsmen focuses on creating durable, functional
                  and dependable structures. We combine traditional
                  craftsmanship with modern construction techniques and project
                  management practices.
                </p>
                <a className="hp-btn hp-btn-outline" href="/#approach">
                  Discover Our Company <ArrowUpRight size={17} />
                </a>
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
                    <h1>See the <span>transformation.</span></h1>
                  ) : (
                    <h2>See the <span>transformation.</span></h2>
                  )}
                </div>
                <p>
                  Drag the slider to compare the design intent with the
                  completed work. Every project begins with a vision; here is
                  how it finishes.
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
                    <h1>Our Home <span>Construction Packages</span></h1>
                  ) : (
                    <h2>Our Home <span>Construction Packages</span></h2>
                  )}
                </div>
                <p>
                  Choose a starting point for your home. Every package is refined
                  around your site, scope and specification.
                </p>
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
                Indicative starting rates per sq ft. Final quotation depends on
                area, scope, materials, site conditions and approvals.
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
                    <h1>Built for <span>every kind of project.</span></h1>
                  ) : (
                    <h2>Built for <span>every kind of project.</span></h2>
                  )}
                </div>
                <p>
                  Residential, commercial and industrial construction delivered
                  by one accountable team.
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
                  From foundational civil works to specialised industrial
                  solutions, we offer a comprehensive range of construction
                  services.
                </p>
              </div>
              <div className="hp-what-grid">
                {services.map((service, index) => (
                  <motion.article {...cardMotion} className="hp-what-card" key={service.title}>
                    <img
                      src={serviceImages[index]}
                      alt={service.title}
                      loading="lazy"
                    />
                    <div className="hp-what-body">
                      <span className="hp-what-icon">
                        <service.icon size={24} />
                      </span>
                      <h3>{service.title}</h3>
                      <p>{service.detail.split(".")[0]}.</p>
                      <button
                        className="hp-what-link"
                        onClick={() => openModal({ type: "service", index })}
                      >
                        Explore Services <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
              <div className="hp-view-all">
                <a className="hp-btn hp-btn-outline" href="/services">
                  View All Services <ArrowUpRight size={16} />
                </a>
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
                  A Construction Partner <span>You Can Rely On</span>
                </h2>
                <p>
                  Every project deserves a dependable team, a clear process and
                  a commitment to quality.
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
                    From Planning <span>to Completion</span>
                  </h2>
                  <p>
                    A clear, considered process that keeps you informed from the
                    first conversation to handover.
                  </p>
                  <button
                    className="hp-btn hp-btn-dark"
                    onClick={() => openModal({ type: "quote" })}
                  >
                    Let&rsquo;s Talk About Your Project{" "}
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
                      To be a trusted construction partner recognised for
                      quality, innovation and excellence in every project.
                    </p>
                  </div>
                </motion.article>
                <motion.article {...cardMotion} className="hp-vm-card">
                  <Flag size={26} />
                  <div>
                    <h3>Our Mission</h3>
                    <p>
                      To deliver reliable and high-quality construction
                      solutions through skilled professionals, modern techniques
                      and a strong commitment to client satisfaction.
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
          {modal?.type === "service" && (
            <>
              <Eyebrow>Our capabilities</Eyebrow>
              <h2 id="modal-title">{services[modal.index].title}</h2>
              <p>{services[modal.index].detail}</p>
              <div className="modal-callout">
                New works, modifications and maintenance requirements can be
                discussed with our team. Share your location and scope for a
                tailored quotation.
              </div>
              <button
                className="hp-btn hp-btn-gold"
                onClick={() => {
                  setPrepared(false);
                  setModal({
                    type: "quote",
                    interest: services[modal.index].title,
                  });
                }}
              >
                Enquire About This Service <ArrowUpRight size={18} />
              </button>
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
