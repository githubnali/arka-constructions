"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { RecaptchaWidget, type RecaptchaWidgetHandle } from "./components/RecaptchaWidget";
import { submitEnquiry } from "./lib/supabase";
import { imageManifest } from "./generated/imageManifest";
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
  MessagesSquare,
  MapPin,
  Mail,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
    detail: "Civil, structural, epoxy flooring and painting repairs, plus general facility maintenance.",
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
    client: "Adhi Kesavan",
    location: "Kattangalathur",
    buildUp: "1,500 sq ft (G+1)",
    plot: "2,100 sq ft",
    type: "Residential",
    images: ["/images/projects/adhi-kesavan-1.jpg"],
  },
  {
    client: "Chandru",
    location: "Maraimalai Nagar",
    buildUp: "4,800 sq ft (G+1)",
    plot: "3,000 sq ft",
    type: "Residential",
    images: ["/images/projects/chandru-1.jpg", "/images/projects/chandru-2.jpg", "/images/projects/chandru-3.jpg"],
  },
  {
    client: "Durai",
    location: "Gudalur, Maraimalai Nagar",
    buildUp: "2,385 sq ft",
    plot: "2,400 sq ft",
    type: "Residential",
    images: ["/images/projects/durai-1.jpg", "/images/projects/durai-2.jpg", "/images/projects/durai-3.jpg"],
  },
  {
    client: "Navaneedha Krishnan",
    location: "Gudalur",
    buildUp: "1,250 sq ft (G)",
    plot: "1,800 sq ft",
    type: "Residential",
    images: ["/images/projects/navaneedha-krishnan-1.jpg", "/images/projects/navaneedha-krishnan-2.jpg"],
  },
];

const ongoingProjects = [
  {
    client: "Raja",
    location: "Maraimalai Nagar",
    buildUp: "1,450 sq ft (G+1)",
    plot: "2,400 sq ft",
    type: "Residential",
    images: ["/images/projects/raja-1.jpg", "/images/projects/raja-2.jpg", "/images/projects/raja-3.jpg"],
  },
  {
    client: "Santhana Krishnan",
    location: "Chengalpattu",
    buildUp: "5,200 sq ft (G+2)",
    plot: "2,400 sq ft",
    type: "Residential",
    images: ["/images/projects/santhana-krishnan-house-1.jpg", "/images/projects/santhana-krishnan-house-2.jpg"],
  },
  {
    client: "Thirunavukkarasu",
    location: "Mamandur",
    buildUp: "1,600 sq ft (GF)",
    plot: "2,000 sq ft",
    type: "Residential",
    images: ["/images/projects/thirunavukkarasu-1.jpg"],
  },
  {
    client: "Industrial Fabrication Project",
    location: "Project details available on request",
    buildUp: "On request",
    plot: "On request",
    type: "Industrial",
    images: ["/images/projects/industrial-fabrication-1.jpg", "/images/projects/industrial-fabrication-2.jpg"],
  },
];

const residentialProjects = [
  ...ongoingProjects
    .filter((project) => project.type === "Residential")
    .map((project) => ({ ...project, status: "Ongoing" })),
  ...completedProjects
    .filter((project) => project.type === "Residential")
    .map((project) => ({ ...project, status: "Completed" })),
];

const industrialProject = ongoingProjects.find((project) => project.type === "Industrial")!;

const residentialPackages = [
  {
    name: "Complete Home Construction Package",
    price: "₹2,499",
    unit: "per sq ft",
    description: "A complete residential construction specification covering design, engineering supervision, structure, finishes, plumbing and electrical work.",
    featured: true,
    details: [
      {
        title: "Design",
        items: ["2D scheme drawings for every floor", "3D elevation design", "Architectural working drawings for every floor"],
      },
      {
        title: "Project Management",
        items: ["Site supervision and quality monitoring by a dedicated site engineer", "Daily progress photos and project-status access", "Architect support through design completion"],
      },
      {
        title: "Structure",
        items: ["Basement height up to 3 ft above Natural Ground Level", "ARS CRS steel with Dalmia and UltraTech cement", "Wire-cut brick walls: 9 in exterior and 4.5 in interior", "M-sand for masonry and P-sand for plastering", "M20 concrete roof with Dr. Fixit waterproofing chemical", "10 ft ceiling height with reinforcement to standard design", "3 ft-high, 6 in-thick parapet wall", "Basement anti-termite treatment"],
      },
      {
        title: "Bathroom & Plumbing",
        items: ["Full-height 1×2 ft vitrified wall tiles up to ₹45/sq ft; one colour across two bathrooms", "Parryware bath and CP fittings up to ₹20,000 per bathroom", "Wall-mounted EWC and basin, pillar tap, health faucet, shower and 2-in-1 wall mixer", "Ashirvad CPVC internal and Ashirvad or Finolex PVC external plumbing", "1,000 L, 3-layer UV-protected overhead tank"],
      },
      {
        title: "Flooring",
        items: ["4×2 ft vitrified tiles up to ₹60/sq ft for living, dining, bedrooms and kitchen; KAG, Anuj or Kajaria", "2×2 ft anti-skid tiles up to ₹45/sq ft for balcony and utility", "Full-body staircase tiles up to ₹110/sq ft", "1×1 ft heavy-duty parking tiles up to ₹50/sq ft"],
      },
      {
        title: "Kitchen & Dining",
        items: ["1×2 ft vitrified kitchen wall tiles up to ₹45/sq ft", "Sink faucet up to ₹3,000 and stainless-steel sink with drain up to ₹5,000", "Wall-mounted dining wash basin", "Kitchen granite counter up to ₹140/sq ft"],
      },
      {
        title: "Doors, Windows & Railing",
        items: ["Ready-made Malaysian teak main door and frame up to ₹30,000; one unit", "Flush room doors with mahogany frames", "WPC bathroom doors and frames", "White uPVC sliding windows up to 5×5 ft; one per room with 5 mm clear glass", "SS 304 staircase and balcony railings"],
      },
      {
        title: "Painting & White Washing",
        items: ["Main door varnish and enamel paint finish for windows and bedroom doors", "One coat white washing and two coats wall putty", "One coat primer and two coats premium interior emulsion for inner walls", "Enamel paint for doors and grills", "One coat white wash and two coats Apex exterior emulsion for outer walls"],
      },
      {
        title: "Electrical",
        items: ["Orbit FRLS wires and Anchor Roma switches", "Three 8-module switch boxes per bedroom; heater and exhaust points in bathrooms", "Up to four 8-module boxes in the living room", "Dedicated points for dining, pooja, kitchen, utility, entrance and balconies", "One AC point in every bedroom and one in the living room"],
      },
      {
        title: "Optional Interior Package",
        items: ["Available at an additional ₹650/sq ft", "Designer false ceiling with customized TV and pooja units", "Custom-finished plywood wardrobes for every bedroom", "Complete modular kitchen using premium acrylic sheets"],
      },
    ],
  },
] as const;

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
    "Our complete residential construction package starts at ₹2,499 per sq ft. Commercial and industrial projects are quoted individually after reviewing the drawings, specifications, site conditions, finishes, loads and utilities.",
  ],
  [
    "What is the minimum area you build for?",
    "Share your plot size and proposed built-up area with our team. We will review the plan and confirm whether the package and project scope are suitable for your site.",
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

const houseTurnkeySteps = [
  {
    title: "Plan & Design",
    text: "We study your plot, your family's needs and your budget, then prepare the plan and structural drawings. If Vastu matters to your family, tell us at the start so we can keep it in mind.",
    icon: ClipboardCheck,
  },
  {
    title: "Approvals",
    text: "We help coordinate the drawings and papers your local authority needs, such as CMDA or DTCP, depending on where your plot is.",
    icon: BadgeCheck,
  },
  {
    title: "Construction Build",
    text: "Foundation, RCC, brickwork, plastering, flooring, plumbing and painting are handled by our team, with engineering checks at every stage.",
    icon: Building2,
  },
  {
    title: "Handover & Care",
    text: "We walk through the house with you, complete the final fixes and hand over the keys. Maintenance labour is covered for one year; materials are charged separately.",
    icon: HeartHandshake,
  },
];

const houseTypes = [
  ["Independent Houses", "Single-floor and multi-floor houses on your own plot, planned around your family size.", Home, "/images/service-pages/res-independent.jpg"],
  ["Duplex Homes", "Two-floor homes with the staircase, rooms and open spaces planned so the house feels comfortable, not crowded.", ChevronsLeftRight, "/images/service-pages/res-duplex.jpg"],
  ["Villas", "Larger homes with more design detail, better finishes and more outdoor space.", Building2, "/images/service-pages/res-villa.jpg"],
  ["Renovation & Remodelling", "Adding a floor, changing the layout, fixing leaks or giving an old house a fresh look.", Wrench, "/images/service-pages/res-renovation.jpg"],
] as const;

const houseWhyReasons = [
  ["Engineer-Led Work", "The founder is an engineer, and your house is supervised by engineers, not just by a mason.", HardHat],
  ["Clear Written Quote", "You get the cost in writing before we start. If you request a change, we explain the cost before doing the work.", ClipboardCheck],
  ["Regular Updates", "We share progress from the site so you always know what is complete and what comes next.", MessagesSquare],
  ["Quality Checks at Each Stage", "We inspect materials and workmanship as construction progresses, not only at the end.", ShieldCheck],
  ["One Team for Everything", "Civil, steel, flooring, glazing, plumbing and painting are handled by the same company.", Users],
  ["1 Year Free Maintenance Labour", "After handover, we cover maintenance labour for one year. Materials are charged separately.", Wrench],
  ["Local Knowledge", "We know the soil, weather, local rules and suppliers across Chennai and Chengalpattu.", MapPinned],
] as const;

const houseFaqs = [
  ["What is the house construction cost per sq ft in Chennai?", "With ARKA Constructions, the complete home construction package starts from ₹2,499 per sq ft. The final consolidated quotation is prepared after the architectural plan, structural details, elevation and BOQ are finalized."],
  ["What is the minimum size of house you build?", "We build homes starting from 1,200 sq ft. If your plan is smaller or larger, call us and we will check what is possible."],
  ["What does turnkey house construction mean?", "It means one company handles the whole job: plan, approvals, construction, finishing and handover. You do not need to hire separate contractors for each work. You get the finished house and the keys."],
  ["Do you help with plan approval?", "Yes. We help coordinate the drawings and papers your local authority needs, such as CMDA or DTCP, depending on your plot. Approval charges are paid to the authority separately."],
  ["How long will it take to build my house?", "It depends on the size of the house, the number of floors and the site. We give you a schedule in the written quotation before work starts and update you as construction moves ahead."],
  ["Can the price go up after I sign?", "You get a written quotation before we start. The cost changes only if you request changes, such as a different floor tile or an extra room, and we tell you the extra cost before doing the work."],
  ["Do you build in Chengalpattu and nearby towns?", "Yes. Chengalpattu and Chennai are our main areas. We also build in Maraimalai Nagar, Kanchipuram, Thiruvallur, Thiruvannamalai, Oragadam, Sriperumbudur, Mahindra World City and Singaperumal Koil."],
  ["Can I see your work before I decide?", "Yes. Project photos, drawings and client references are available on request. You are welcome to talk to our team and visit a site."],
  ["Do you give free maintenance after handover?", "Yes. We cover the labour cost of maintenance work for one year after handover. Material cost is charged separately."],
  ["Do you also renovate old houses?", "Yes. We take up house renovation, repair and maintenance, including adding a floor, changing the layout, waterproofing and repainting."],
  ["Is ARKA the best construction company in Chennai for an individual house?", "We cannot answer that for you, and we would not trust anyone who says it about themselves. What we can promise is an engineer-led team, a clear written quote and regular updates. Talk to us, see our work and compare with others before you decide."],
] as const;

const sectorPages = {
  commercial: {
    crumb: "Commercial Construction",
    heroImage: "/images/service-commercial.jpg",
    heroEyebrow: "Commercial Construction in Chennai",
    titleLead: "Commercial Construction Company in",
    titleAccent: "Chennai & Chengalpattu",
    heroText: "Your shop or office should be ready when you planned to open. ARKA Constructions builds commercial buildings with one team, a written schedule and clear costs, so you can spend your time on your business and not on chasing contractors.",
    tags: [[Building2, "Offices"], [Home, "Shops & Retail"], [Layers3, "Showrooms"]] as const,
    formHeading: "Tell Us About Your Building",
    formIntro: "Share your site and building details. Our engineer will call you back.",
    introEyebrow: "Commercial Construction",
    introLead: "A Commercial Construction Company That Respects",
    introAccent: "Your Opening Date",
    introParagraphs: [
      "Every month of delay in a commercial building is a month of rent, EMI and lost sales. So we plan the work from the date you want to open and work backwards from there.",
      "We are a commercial construction company based in Chengalpattu, and we work across Chennai and nearby towns. Our team of engineers, supervisors and skilled workers handles the structure, the finishing and the outside work, so you speak to one company from the first meeting to handover.",
    ],
    proofTitle: "Built around your business",
    proofText: "Opening date, customer access, parking, utilities and daily movement are considered from the start.",
    turnkeyTitle: "Turnkey Commercial Construction in Chennai:",
    turnkeyAccent: "Plan, Build, Hand Over",
    turnkeyIntro: "One point of contact for the whole building. No juggling between civil, steel, glass and flooring contractors.",
    steps: [
      ["Understand Your Business", "We ask how the space will be used: customer entry, parking, counters, storage, power and water needs. The building is planned around these answers.", MessagesSquare],
      ["Plan and Cost", "You get a written scope, a cost and a schedule. We explain each item in simple words, so you know what you are paying for.", ClipboardCheck],
      ["Build", "Foundation, RCC, brickwork, steel work, flooring, glass and aluminium, plumbing and painting are handled by our team and checked at each stage.", Building2],
      ["Handover and Upkeep", "We inspect the building with you, hand it over and stay available for repair and maintenance work later.", HeartHandshake],
    ] as const,
    typesTitle: "Commercial Buildings We Build in",
    typesAccent: "Chennai and Chengalpattu",
    typesIntro: "Purpose-built spaces for daily business use, customer movement, staff comfort and long-term upkeep.",
    types: [
      ["Offices", "Office buildings and floors planned for desks, meeting rooms, parking and easy movement.", Building2, "/images/service-pages/commercial-office.jpg"],
      ["Shops and Retail Spaces", "Ground-floor shops and retail buildings with strong frontage, glass shopfronts and good customer access.", Home, "/images/service-pages/commercial-retail.jpg"],
      ["Showrooms", "Open, well-lit spaces with large glass areas and strong floors for displays.", Layers3, "/images/service-pages/commercial-showroom.jpg"],
      ["Other Commercial Buildings", "Other buildings made for business use. Tell us what you need and we will tell you honestly if we can build it.", Building2, "/images/service-pages/commercial-building.jpg"],
      ["Renovation and Extensions", "Adding a floor, changing a layout, new flooring, glazing or repainting an existing commercial building.", Wrench, "/images/service-pages/commercial-renovation.jpg"],
    ] as const,
    scopeTitle: "Everything Your Commercial Building Needs,",
    scopeAccent: "from One Team",
    scopeGroups: [
      { title: "Structure", items: [["Civil and RCC Works", "Foundation, PCC, RCC, concrete, masonry and plastering.", "/images/service-civil-india.jpg"], ["Steel and Fabrication", "MS structural work, roofing, cladding, mezzanines, staircases, handrails, gates and grills.", "/images/service-fabrication.jpg"]] },
      { title: "Finishing", items: [["Flooring", "Tiles, granite and concrete flooring.", "/images/service-flooring-india.jpg"], ["Glass and Aluminium", "Aluminium doors and windows, glass doors, partitions and glazing for shopfronts.", "/images/service-glazing-v2.jpg"], ["Painting and Waterproofing", "Interior and exterior painting, plus waterproofing for terraces, toilets and roofs.", "/images/service-painting-v2.jpg"]] },
      { title: "Outside Work and Utilities", items: [["Paver Blocks and External Flooring", "Parking areas, walkways, kerb stones and interlocking pavers.", "/images/service-pavers-v2.jpg"], ["Roads, Drains and Compound Wall", "Internal roads, driveways, storm water drains and boundary walls.", "/images/service-roadworks-v2.jpg"], ["Plumbing and Drainage", "Water lines, sewage lines, chambers and sanitary work.", "/images/service-plumbing-india.jpg"]] },
    ],
    whyTitle: "Why Businesses Choose ARKA for",
    whyAccent: "Commercial Construction",
    whyIntro: "A coordinated team, practical scheduling and clear costs for buildings that need to start earning.",
    why: [
      ["Engineer-Led Team", "Your building is run by engineers and supervisors experienced in commercial and industrial work.", HardHat],
      ["One Company, Many Trades", "Civil, steel, glass, flooring, plumbing and painting are coordinated by the same team.", Users],
      ["Clear Pricing", "A written quotation with no hidden costs, plus a budget update if anything changes.", IndianRupee],
      ["Realistic Schedule", "We plan and monitor the work step by step so the opening date does not keep moving.", Timer],
      ["Safe Sites", "Safety gear, site induction and supervision for everyone working on your building.", ShieldCheck],
      ["Local Knowledge", "We know Chengalpattu and the areas around Chennai: local rules, suppliers and site conditions.", MapPinned],
    ] as const,
    areasTitle: "Commercial Construction in",
    areasAccent: "Chennai, Chengalpattu and Nearby Areas",
    areasText: "Chennai and Chengalpattu are our main areas. We also take up commercial work in the towns around them. If your site is not on the list, call us.",
    faqTitle: "Frequently Asked Questions About Commercial Construction",
    faqs: [
      ["What kind of commercial buildings do you build?", "We build offices, shops, retail spaces, showrooms and other buildings used for business. We also take up renovation and extension of existing commercial buildings."],
      ["How much does commercial construction cost?", "The cost depends on the building size, structure, finishes and site. Commercial work is quoted for each project, so share your plan or requirement and we will provide a written quotation."],
      ["Do you build from scratch or only renovate?", "Both. We build new commercial buildings and take up modification, repair and maintenance work on existing ones."],
      ["Can you also do glass shopfronts and aluminium work?", "Yes. Aluminium doors and windows, glass doors, partitions and glazing are part of our work, along with flooring, painting and waterproofing."],
      ["Do you build parking areas and compound walls?", "Yes. We do paver block parking, walkways, internal roads, storm water drains and compound walls as part of the same project."],
      ["How long will my commercial building take?", "It depends on the size, structure and site. We share a written schedule with the quotation and update you as work progresses."],
      ["Which areas do you work in?", "Chennai and Chengalpattu are our main areas. We also work in Maraimalai Nagar, Kanchipuram, Thiruvallur, Thiruvannamalai, Oragadam, Sriperumbudur, Mahindra World City and Singaperumal Koil."],
      ["How do I get a quotation?", "Call us or fill in the form with your name, phone number, site location and type of building. Our team will understand your requirement and share a clear written quotation."],
    ] as const,
  },
  industrial: {
    crumb: "Industrial Construction",
    heroImage: "/images/service-industrial.jpg",
    heroEyebrow: "Industrial Construction in Chennai",
    titleLead: "Industrial Construction Company in",
    titleAccent: "Chennai & Chengalpattu",
    heroText: "A factory needs strong foundations, strong floors and a site that stays safe while the work goes on. ARKA Constructions builds factory buildings, sheds and industrial civil works for companies in Chennai, Chengalpattu, Oragadam and Sriperumbudur.",
    tags: [[Factory, "Factory Buildings"], [Hammer, "Sheds & PEB"], [HardHat, "Industrial Civil Works"]] as const,
    formHeading: "Tell Us About Your Industrial Project",
    formIntro: "Share your site and project details. Our engineer will call you back.",
    introEyebrow: "Industrial Construction",
    introLead: "An Industrial Construction Company That Knows",
    introAccent: "Factory Work",
    introParagraphs: [
      "Building a factory is not like building a house. The floor must carry machines. The roof must be right for the shed. Drains, utilities and roads must work from day one. A small mistake in the foundation can stop a production line later.",
      "ARKA Constructions is based in Chengalpattu. Our founder, Kamarajan Krishnan, is an engineer with experience across residential, commercial and industrial projects. Project details, site photographs and references are available on request.",
    ],
    proofTitle: "Factory-ready thinking",
    proofText: "Loads, machine locations, product flow, roads, drainage and utilities are coordinated before construction starts.",
    turnkeyTitle: "Turnkey Industrial Construction in Chennai:",
    turnkeyAccent: "Civil, Steel and Utilities Together",
    turnkeyIntro: "Civil work, steel structure, flooring and utilities are planned together by one team, reducing delays and clashes on site.",
    steps: [
      ["Study the Site and Need", "We look at your site, machines, product flow and timeline before we plan anything.", Target],
      ["Plan Scope and Cost", "You get a written scope, cost and schedule, with each item explained in plain words.", ClipboardCheck],
      ["Build", "Foundations, RCC, steel structure, roofing, cladding, flooring, drains and utilities are built with stage-wise checks.", Factory],
      ["Handover and Support", "We inspect everything with you and hand over. We also handle later repair, maintenance and modification work.", Wrench],
    ] as const,
    typesTitle: "Industrial Construction Work We Do in",
    typesAccent: "Chennai and Chengalpattu",
    typesIntro: "Civil, structural, flooring and infrastructure work designed around industrial loads and operations.",
    types: [
      ["Factory and Plant Buildings", "New factory buildings, plant buildings and industrial facilities built to carry heavy loads.", Factory, "/images/service-pages/industrial-factory.jpg"],
      ["PEB and Steel Structures", "MS structural work, PEB systems, industrial sheds, roofing, cladding and mezzanines.", Hammer, "/images/service-pages/industrial-steel.jpg"],
      ["Machine Foundations and Utility Civil Work", "Machine foundations, utility civil works and infrastructure changes for industrial facilities.", Target, "/images/service-pages/industrial-foundation.jpg"],
      ["Factory Modification and Expansion", "New bays, extensions, floor changes and layout changes in an existing factory.", Wrench, "/images/service-pages/industrial-expansion.jpg"],
      ["Industrial Flooring", "Epoxy, concrete and heavy-duty floors for production and storage areas.", Layers3, "/images/service-pages/industrial-flooring.jpg"],
      ["Roads, Drains and Compound Walls", "Internal roads, storm water drains, paver areas and boundary walls for the campus.", Route, "/images/service-pages/industrial-roads.jpg"],
      ["Waterproofing, Painting and Repair", "Roof and structural waterproofing, industrial painting, protective coatings and maintenance.", ShieldCheck, "/images/service-pages/industrial-repair.jpg"],
    ] as const,
    scopeTitle: "Industrial Work Planned for",
    scopeAccent: "Production, Loads and Long-Term Use",
    scopeGroups: [
      { title: "Civil Foundations", items: [["Heavy-Duty Civil Work", "Machine foundations, PCC, RCC, masonry and structural concrete.", "/images/service-civil-india.jpg"], ["Industrial Flooring", "Concrete and epoxy floors planned for production and storage areas.", "/images/service-flooring-india.jpg"]] },
      { title: "Steel and Building Envelope", items: [["PEB and Structural Steel", "Industrial sheds, steel frames, mezzanines and fabrication.", "/images/service-fabrication.jpg"], ["Roofing and Cladding", "Coordinated roofing, wall cladding and weather protection.", "/images/service-industrial-works.jpg"]] },
      { title: "Campus Infrastructure", items: [["Utilities and Drainage", "Utility civil work, water lines, drains and chambers.", "/images/service-plumbing-india.jpg"], ["Roads and External Works", "Internal roads, pavers, storm water drains and compound walls.", "/images/service-roadworks-v2.jpg"], ["Repairs and Modifications", "Factory extensions, layout changes, waterproofing and maintenance.", "/images/service-repairs-v2.jpg"]] },
    ],
    whyTitle: "Why Companies Choose ARKA for",
    whyAccent: "Industrial Construction",
    whyIntro: "One accountable team for civil, steel and infrastructure work close to Chennai's industrial belt.",
    why: [
      ["Civil and Steel Under One Team", "Foundations, RCC, steel structures, roofing and flooring are handled by the same company.", Users],
      ["Industrial Experience", "Our engineer-led team has experience across industrial buildings and civil work.", Factory],
      ["Safety on Site", "Safety gear, induction and continuous supervision are part of how we work.", ShieldCheck],
      ["Clear Scope and Pricing", "A written quotation, clear scope and cost update if anything changes.", ClipboardCheck],
      ["Modification and Maintenance", "We take up changes and repairs in existing factories, not only new buildings.", Wrench],
      ["Close to the Industrial Belt", "Based in Maraimalai Nagar, near Oragadam, Mahindra World City and Singaperumal Koil.", MapPinned],
    ] as const,
    areasTitle: "Industrial Construction in",
    areasAccent: "Chennai, Chengalpattu, Oragadam and Sriperumbudur",
    areasText: "Chennai and Chengalpattu are our main areas. We also work throughout the industrial areas around them. If your site is not on the list, call us.",
    faqTitle: "Frequently Asked Questions About Industrial Construction",
    faqs: [
      ["What industrial construction work do you do?", "We build factory and plant buildings, PEB and steel structures, industrial sheds, roofing and cladding, mezzanines, machine foundations, industrial flooring, roads, drains and compound walls. We also take up factory modification and maintenance work."],
      ["Do you build PEB sheds and steel structures?", "Yes. MS fabrication, structural steel, PEB systems, industrial sheds, roofing and cladding are part of our work."],
      ["Can you build machine foundations?", "Yes. We do machine foundations and utility civil works for industrial facilities."],
      ["Can you modify or extend an existing factory?", "Yes. We take up factory modification, extension and infrastructure changes. Share the details and we will explain how we would approach it."],
      ["How much does industrial construction cost?", "Industrial work is quoted for each project because the size, structure, floor load and utilities differ. Share your requirement and we will provide a written quotation."],
      ["Which areas do you work in?", "Chennai and Chengalpattu are our main areas. We also work in Maraimalai Nagar, Oragadam, Sriperumbudur, Mahindra World City, Singaperumal Koil, Kanchipuram, Thiruvallur and Thiruvannamalai."],
      ["Do you follow safety rules on industrial sites?", "Yes. Safety gear, site induction and supervision are part of our site practice for every worker."],
      ["How do I get a quotation?", "Call us or fill in the form with your name, phone number, site location and type of work. Our team will understand your requirement and share a clear written quotation."],
    ] as const,
  },
} as const;

const serviceImages = [
  "service-civil-india.jpg", "service-infrastructure-india.jpg", "service-flooring-india.jpg",
  "service-fabrication.jpg", "service-glazing-v2.jpg", "service-pavers-v2.jpg",
  "service-painting-v2.jpg", "service-plumbing-india.jpg", "service-roadworks-v2.jpg",
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

function validateEnquiryForm(data: FormData) {
  const errors: EnquiryErrors = {};
  const value = (name: EnquiryField) => String(data.get(name) || "").trim();

  if (value("name").length < 2) errors.name = "Enter your full name using at least 2 characters.";
  if (!phonePattern.test(value("phone"))) errors.phone = "Enter a valid 10 to 15 digit phone number without spaces.";
  if (value("email") && !emailPattern.test(value("email"))) errors.email = "Enter a valid email address, for example name@example.com.";
  if (value("location").length < 2) errors.location = "Enter the project site location.";
  if (value("message").length > 2000) errors.message = "Keep the project details within 2,000 characters.";

  return errors;
}

function ResponsiveImage({
  src,
  sizes = "100vw",
  ...props
}: Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string }) {
  const asset = imageManifest[src as keyof typeof imageManifest];
  if (!asset) return <img {...props} src={src} sizes={sizes} />;
  const fallback = asset.variants.at(-1)!;

  return (
    <img
      {...props}
      src={fallback.src}
      srcSet={asset.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ")}
      sizes={sizes}
      width={props.width ?? asset.width}
      height={props.height ?? asset.height}
    />
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="/"
      aria-label="ARKA Constructions home"
    >
      <span className="brand-symbol" aria-hidden="true">
        <ResponsiveImage src="/images/arka-logo.png" alt="" sizes="64px" />
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

function HeroQuoteForm({
  heading = "Let’s Discuss Your Project",
  intro = "Share your plot details. Our team will call you back.",
}: {
  heading?: string;
  intro?: string;
} = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<EnquiryErrors>({});
  const [recaptchaResetKey, setRecaptchaResetKey] = useState(0);
  const [formStartedAt] = useState(() => Date.now());
  const recaptcha = useRef<RecaptchaWidgetHandle>(null);

  function clearFieldError(field: EnquiryField) {
    setFieldErrors((current) => current[field] ? { ...current, [field]: undefined } : current);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const validationErrors = validateEnquiryForm(data);
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
      const recaptchaToken = await recaptcha.current?.execute();
      if (!recaptchaToken) throw new Error("The security check could not start. Please try again.");
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
      setRecaptchaResetKey((key) => key + 1);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not save your enquiry. Please try again.");
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
      <h2>{heading}</h2>
      <p>{intro}</p>
      <div className="form-field-group">
        <label className={`hp-field ${fieldErrors.name ? "has-error" : ""}`}><User size={16} /><input name="name" required minLength={2} autoComplete="name" maxLength={100} placeholder="Name *" aria-label="Name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "hero-name-error" : undefined} onInput={() => clearFieldError("name")} /></label>
        {fieldErrors.name && <span className="field-error" id="hero-name-error">{fieldErrors.name}</span>}
      </div>
      <div className="form-field-group">
        <label className={`hp-field ${fieldErrors.phone ? "has-error" : ""}`}><Phone size={16} /><input name="phone" type="tel" required autoComplete="tel" inputMode="tel" maxLength={16} placeholder="Phone Number *" aria-label="Phone number" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? "hero-phone-error" : undefined} onInput={() => clearFieldError("phone")} /></label>
        {fieldErrors.phone && <span className="field-error" id="hero-phone-error">{fieldErrors.phone}</span>}
      </div>
      <div className="form-field-group">
        <label className={`hp-field ${fieldErrors.email ? "has-error" : ""}`}><Mail size={16} /><input name="email" type="email" autoComplete="email" maxLength={150} placeholder="Email (optional)" aria-label="Email (optional)" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "hero-email-error" : undefined} onInput={() => clearFieldError("email")} /></label>
        {fieldErrors.email && <span className="field-error" id="hero-email-error">{fieldErrors.email}</span>}
      </div>
      <div className="form-field-group">
        <label className={`hp-field ${fieldErrors.location ? "has-error" : ""}`}><MapPin size={16} /><input name="location" required minLength={2} autoComplete="address-level2" maxLength={150} placeholder="Site Location *" aria-label="Site location" aria-invalid={Boolean(fieldErrors.location)} aria-describedby={fieldErrors.location ? "hero-location-error" : undefined} onInput={() => clearFieldError("location")} /></label>
        {fieldErrors.location && <span className="field-error" id="hero-location-error">{fieldErrors.location}</span>}
      </div>
      <div className="form-field-group">
        <label className={`hp-field ${fieldErrors.plotArea ? "has-error" : ""}`}><Layers3 size={16} /><select name="plotArea" defaultValue="" aria-label="Plot area (optional)" aria-invalid={Boolean(fieldErrors.plotArea)} aria-describedby={fieldErrors.plotArea ? "hero-area-error" : undefined} onChange={() => clearFieldError("plotArea")}><option value="">Plot Area (sq ft) (optional)</option><option>1200 - 2000 sq ft</option><option>2000 - 3000 sq ft</option><option>3000 - 4000 sq ft</option><option>4000+ sq ft</option></select><ChevronDown size={15} /></label>
        {fieldErrors.plotArea && <span className="field-error" id="hero-area-error">{fieldErrors.plotArea}</span>}
      </div>
      <input className="hp-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <RecaptchaWidget ref={recaptcha} resetKey={recaptchaResetKey} />
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="hp-btn hp-btn-gold" type="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Request Free Estimate"} {!submitting && <ArrowUpRight size={16} />}
      </button>
      <p className="hp-form-note">By submitting, you agree that ARKA may contact you about your project. This site is protected by reCAPTCHA.</p>
    </form>
  );
}

function ProjectCarousel({
  images,
  label,
  className = "",
  sizes = "(max-width: 720px) 100vw, 430px",
}: {
  images: readonly string[];
  label: string;
  className?: string;
  sizes?: string;
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActive((current) => (current + 1) % images.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  const show = (index: number, nextDirection: number) => {
    setDirection(nextDirection);
    setActive((index + images.length) % images.length);
  };

  return (
    <div
      className={`hp-project-carousel ${className}`.trim()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <m.div
          className="hp-project-slide"
          key={images[active]}
          custom={direction}
          variants={{
            enter: (travel: number) => ({ x: travel > 0 ? "100%" : "-100%", opacity: 0.55, scale: 1.015 }),
            center: { x: "0%", opacity: 1, scale: 1 },
            exit: (travel: number) => ({ x: travel > 0 ? "-100%" : "100%", opacity: 0.55, scale: 1.015 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <ResponsiveImage src={images[active]} alt={`${label} — project photograph ${active + 1}`} loading="lazy" sizes={sizes} />
        </m.div>
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button className="hp-carousel-arrow is-previous" type="button" onClick={() => show(active - 1, -1)} aria-label={`Previous photograph of ${label}`}><ChevronLeft size={18} /></button>
          <button className="hp-carousel-arrow is-next" type="button" onClick={() => show(active + 1, 1)} aria-label={`Next photograph of ${label}`}><ChevronRight size={18} /></button>
          <div className="hp-carousel-dots" aria-label={`${label} photograph selection`}>
            {images.map((image, index) => <button key={image} type="button" className={index === active ? "is-active" : ""} onClick={() => show(index, index >= active ? 1 : -1)} aria-label={`Show photograph ${index + 1} of ${label}`} aria-current={index === active ? "true" : undefined} />)}
          </div>
        </>
      )}
    </div>
  );
}

export default function ArkaSite({
  view = "home",
}: {
  view?: "home" | "services" | "projects" | "packages" | "residential" | "commercial" | "industrial";
}) {
  const sector = view === "commercial" || view === "industrial" ? sectorPages[view] : null;
  const [menu, setMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [tab, setTab] = useState<"completed" | "ongoing">("completed");
  const [openFaq, setOpenFaq] = useState(0);
  const [modal, setModal] = useState<Modal>(null);
  const modalPackage = modal?.type === "package" ? residentialPackages[modal.index] : null;
  const [prepared, setPrepared] = useState(false);
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");
  const [modalFieldErrors, setModalFieldErrors] = useState<EnquiryErrors>({});
  const [modalRecaptchaResetKey, setModalRecaptchaResetKey] = useState(0);
  const [modalFormStartedAt] = useState(() => Date.now());
  const dialog = useRef<HTMLDialogElement>(null);
  const modalRecaptcha = useRef<RecaptchaWidgetHandle>(null);
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
    const offsetAttribute = "data-arka-mobile-chat-offset";
    const excludedPattern = /recaptcha|grecaptcha|netlify|nl-badge/i;

    function externalHost(element: HTMLElement) {
      let host = element;
      while (host.parentElement && host.parentElement !== document.body) {
        host = host.parentElement;
      }
      return host;
    }

    function moveChatWidget() {
      const candidates = new Set<HTMLElement>();
      const selectors = [
        "iframe",
        '[id*="chat" i]',
        '[class*="chat" i]',
        '[id*="bot" i]',
        '[class*="bot" i]',
        '[title*="chat" i]',
        '[aria-label*="chat" i]',
        '[data-testid*="chat" i]',
      ].join(",");

      document.querySelectorAll<HTMLElement>(selectors).forEach((element) => {
        if (!element.closest("#root")) candidates.add(element);
      });

      for (const child of Array.from(document.body.children)) {
        if (!(child instanceof HTMLElement) || child.id === "root") continue;
        const style = window.getComputedStyle(child);
        const rect = child.getBoundingClientRect();
        const zIndex = Number.parseInt(style.zIndex, 10);
        const touchesLowerRight = rect.right >= window.innerWidth - 32 && rect.bottom >= window.innerHeight - 32;
        if (style.position === "fixed" && touchesLowerRight && (Number.isNaN(zIndex) || zIndex >= 50)) {
          candidates.add(child);
        }
      }

      candidates.forEach((candidate) => {
        const host = externalHost(candidate);
        const descriptor = [
          host.id,
          host.className,
          host.getAttribute("title"),
          host.getAttribute("aria-label"),
          host instanceof HTMLIFrameElement ? host.src : "",
        ].join(" ");
        if (excludedPattern.test(descriptor) || host.closest(".grecaptcha-badge")) return;
        host.setAttribute(offsetAttribute, "true");
      });
    }

    moveChatWidget();
    const observer = new MutationObserver(moveChatWidget);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", moveChatWidget, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", moveChatWidget);
      document.querySelectorAll<HTMLElement>(`[${offsetAttribute}]`).forEach((element) => {
        element.removeAttribute(offsetAttribute);
      });
    };
  }, []);

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

  async function submitModalQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (modalSubmitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const validationErrors = validateEnquiryForm(data);
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
      const recaptchaToken = await modalRecaptcha.current?.execute();
      if (!recaptchaToken) throw new Error("The security check could not start. Please try again.");
      await submitEnquiry({
        name: String(data.get("name") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        site_location: String(data.get("location") || "").trim(),
        service: String(data.get("service") || "").trim(),
        message: String(data.get("message") || "").trim() || undefined,
        source: "quote_modal",
      }, recaptchaToken, String(data.get("website") || ""), modalFormStartedAt);
      form.reset();
      setPrepared(true);
      setModalRecaptchaResetKey((key) => key + 1);
    } catch (submissionError) {
      setModalError(submissionError instanceof Error ? submissionError.message : "We could not save your enquiry. Please try again.");
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
              <a href="/services/" onClick={() => setMenu(false)}>
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
                <a href="/house-construction-company-chennai/" onClick={() => setMenu(false)}>Residential Construction</a>
                <a href="/commercial-construction-company-chennai/" onClick={() => setMenu(false)}>Commercial Construction</a>
                <a href="/industrial-construction-company-chennai/" onClick={() => setMenu(false)}>Industrial Construction</a>
              </div>
            </div>
            <a href="/projects/" onClick={() => setMenu(false)}>
              Projects
            </a>
            <a href="/packages/" onClick={() => setMenu(false)}>
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
        {view !== "home" && view !== "residential" && !sector && (
          <div className="container page-breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span>{view}</span>
          </div>
        )}

        {view === "home" && (
          <m.section {...sectionMotion} className="hp-hero" aria-labelledby="hero-title">
            <div className="hp-hero-media" aria-hidden="true">
              <ResponsiveImage
                key={heroSlides[heroSlide]}
                src={heroSlides[heroSlide]}
                alt=""
                className="is-active"
                loading={heroSlide === 0 ? "eager" : "lazy"}
                fetchPriority={heroSlide === 0 ? "high" : undefined}
                sizes="100vw"
              />
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
                  <a href="/projects/" className="hp-btn hp-btn-gold">
                    View Our Projects <ArrowUpRight size={17} />
                  </a>
                  <a href="/packages/" className="hp-btn hp-btn-outline-light">
                    View Our Packages <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
              <HeroQuoteForm />
            </div>
          </m.section>
        )}

        {sector && (
          <>
            <m.section {...sectionMotion} className={`hp-hero res-hero sector-hero sector-${view}`} aria-labelledby={`${view}-title`}>
              <div className="hp-hero-media" aria-hidden="true">
                <ResponsiveImage src={sector.heroImage} alt="" className="is-active" loading="eager" fetchPriority="high" sizes="100vw" />
              </div>
              <nav className="container page-breadcrumb res-hero-breadcrumb" aria-label="Breadcrumb">
                <a href="/">Home</a><span>/</span><a href="/services/">Construction Services</a><span>/</span><span aria-current="page">{sector.crumb}</span>
              </nav>
              <div className="container hp-hero-inner">
                <div className="hp-hero-copy">
                  <Eyebrow light>{sector.heroEyebrow}</Eyebrow>
                  <h1 id={`${view}-title`}>{sector.titleLead} <span>{sector.titleAccent}</span></h1>
                  <p>{sector.heroText}</p>
                  <div className="hp-hero-tags res-hero-tags" aria-label={`${sector.crumb} highlights`}>
                    {sector.tags.map(([Icon, label]) => <span className="hp-hero-tag" key={label}><Icon size={15} /> {label}</span>)}
                  </div>
                  <div className="hp-hero-actions">
                    <button className="hp-btn hp-btn-gold" onClick={() => openModal({ type: "quote", interest: sector.crumb })}>Get a Free Quote <ArrowUpRight size={17} /></button>
                    <a href="tel:+919952525185" className="hp-btn hp-btn-outline-light"><Phone size={16} /> Call 99525 25185</a>
                  </div>
                </div>
                <HeroQuoteForm heading={sector.formHeading} intro={sector.formIntro} />
              </div>
            </m.section>

            <m.section {...sectionMotion} className="hp-section hp-section-white res-intro sector-intro">
              <div className="container res-intro-grid">
                <div className="res-intro-copy">
                  <Eyebrow>{sector.introEyebrow}</Eyebrow>
                  <h2>{sector.introLead} <span>{sector.introAccent}</span></h2>
                  {sector.introParagraphs.map((paragraph, index) => <p className={index === 0 ? "res-lead" : undefined} key={paragraph}>{paragraph}</p>)}
                  <div className="res-intro-proof"><ShieldCheck size={24} /><span><strong>{sector.proofTitle}.</strong> {sector.proofText}</span></div>
                </div>
                <div className="res-intro-visual">
                  <ResponsiveImage src={sector.heroImage} alt={`${sector.crumb} project by ARKA Constructions`} loading="lazy" sizes="(max-width: 980px) 100vw, 50vw" />
                  <div className="res-intro-stat"><strong>One team</strong><span>Plan to handover</span></div>
                </div>
              </div>
            </m.section>

            <m.section {...sectionMotion} className="hp-section hp-section-ivory res-turnkey sector-turnkey">
              <div className="container">
                <div className="hp-section-head res-section-head">
                  <div><Eyebrow>Turnkey Solution</Eyebrow><h2>{sector.turnkeyTitle} <span>{sector.turnkeyAccent}</span></h2></div>
                  <p>{sector.turnkeyIntro}</p>
                </div>
                <ol className="res-turnkey-grid" aria-label={`${sector.crumb} stages`}>
                  {sector.steps.map(([title, text, Icon], index) => (
                    <m.li {...cardMotion} key={title}><span className="res-step-number">0{index + 1}</span><span className="res-step-icon"><Icon size={24} /></span><h3>{title}</h3><p>{text}</p></m.li>
                  ))}
                </ol>
              </div>
            </m.section>

            <m.section {...sectionMotion} className="hp-section hp-section-white sector-types">
              <div className="container">
                <div className="hp-section-head res-section-head">
                  <div><Eyebrow>What We Build</Eyebrow><h2>{sector.typesTitle} <span>{sector.typesAccent}</span></h2></div>
                  <p>{sector.typesIntro}</p>
                </div>
                <div className="sector-types-grid">
                  {sector.types.map(([title, text, Icon, image], index) => (
                    <m.article {...cardMotion} key={title}>
                      <ResponsiveImage className="type-card-image" src={image} alt="" aria-hidden="true" loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                      <div className="sector-type-top"><span>0{index + 1}</span><Icon size={26} /></div><h3>{title}</h3><p>{text}</p>
                    </m.article>
                  ))}
                </div>
              </div>
            </m.section>

            <m.section {...sectionMotion} className={`hp-section sector-service-pricing sector-service-pricing-${view}`} id="pricing">
              <div className="container">
                <div className="sector-service-pricing-panel">
                  <div className="sector-service-pricing-copy">
                    <span className="sector-service-pricing-icon">{view === "commercial" ? <Building2 size={27} /> : <Factory size={27} />}</span>
                    <Eyebrow light>Custom Project Pricing</Eyebrow>
                    <h2>Contact Us for <span>{view === "commercial" ? "Commercial" : "Industrial"} Construction Pricing</span></h2>
                    <p>{view === "commercial" ? "Offices, shops, showrooms and mixed-use buildings need different structures, finishes, access, parking and utilities. Share your requirement and we will prepare a clear project-specific quotation." : "Factory buildings, PEB structures, machine foundations and industrial civil works depend on loads, operations, utilities and site conditions. Our engineers review the scope before preparing your quotation."}</p>
                    <div className="sector-service-pricing-actions">
                      <button className="hp-btn hp-btn-gold" onClick={() => openModal({ type: "quote", interest: `${sector.crumb} pricing` })}>Request Custom Pricing <ArrowUpRight size={16} /></button>
                      <a className="hp-btn hp-btn-outline-light" href="tel:+919952525185"><Phone size={16} /> Call 99525 25185</a>
                    </div>
                  </div>
                  <div className="sector-service-pricing-brief">
                    <span>To prepare your quote</span>
                    <h3>Tell us these project basics</h3>
                    <ul>
                      {(view === "commercial" ? ["Site location and approximate built-up area", "Building use, floors and target opening date", "Required finishes, parking and utility needs"] : ["Site location, building area and operating status", "Structural loads, machines and production needs", "PEB, flooring, roads, drainage and utility scope"]).map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}
                    </ul>
                    <p><strong>No generic per-sq-ft promise.</strong> You receive pricing based on the actual work your project needs.</p>
                  </div>
                </div>
              </div>
            </m.section>

            <m.section {...sectionMotion} className="hp-section sector-scope">
              <div className="container">
                <div className="hp-section-head sector-scope-head">
                  <div><Eyebrow light>Complete Scope</Eyebrow><h2>{sector.scopeTitle} <span>{sector.scopeAccent}</span></h2></div>
                  <p>One coordinated team across the structure, finishes, utilities and external works.</p>
                </div>
                <div className="sector-scope-grid">
                  {sector.scopeGroups.map((group, index) => (
                    <m.article {...cardMotion} key={group.title}>
                      <span className="sector-scope-number">0{index + 1}</span>
                      <h3>{group.title}</h3>
                      {group.items.map(([title, text, image]) => (
                        <div className="sector-scope-item" key={title}>
                          <ResponsiveImage className="sector-scope-item-image" src={image} alt="" aria-hidden="true" loading="lazy" sizes="112px" />
                          <div className="sector-scope-item-copy"><h4><CheckCircle2 size={17} />{title}</h4><p>{text}</p></div>
                        </div>
                      ))}
                    </m.article>
                  ))}
                </div>
              </div>
            </m.section>

            {view === "industrial" && (
              <m.section {...sectionMotion} className="hp-section hp-section-ivory sector-project">
                <div className="container">
                  <div className="hp-section-head"><div><Eyebrow>Our Industrial Project</Eyebrow><h2>Industrial Construction Project <span>in Progress</span></h2></div><p>Current industrial work, with detailed photographs, scope and references available when you speak with our team.</p></div>
                  <article className="sector-project-card">
                    <ProjectCarousel images={industrialProject.images} label="Industrial fabrication project" className="sector-project-gallery" sizes="(max-width: 980px) 100vw, 60vw" />
                    <div><span>Industrial · In progress</span><h3>{industrialProject.client}</h3><p><MapPin size={16} /> {industrialProject.location}</p><dl><div><dt>Build up</dt><dd>{industrialProject.buildUp}</dd></div><div><dt>Plot</dt><dd>{industrialProject.plot}</dd></div></dl><button className="hp-btn hp-btn-dark" onClick={() => openModal({ type: "quote", interest: "Industrial construction" })}>Discuss an Industrial Project <ArrowUpRight size={16} /></button></div>
                  </article>
                </div>
              </m.section>
            )}

            <m.section {...sectionMotion} className="hp-why sector-why">
              <div className="container hp-why-grid">
                <div className="hp-why-copy"><Eyebrow light>Why ARKA</Eyebrow><h2>{sector.whyTitle} <span>{sector.whyAccent}</span></h2><p>{sector.whyIntro}</p><button className="hp-btn hp-btn-gold" onClick={() => openModal({ type: "quote", interest: sector.crumb })}>Talk to Our Team <ArrowUpRight size={16} /></button></div>
                <div className="hp-why-list res-why-list">{sector.why.map(([title, text, Icon]) => <m.article {...cardMotion} className="hp-why-item" key={title}><Icon size={22} strokeWidth={1.5} /><div><h3>{title}</h3><p>{text}</p></div></m.article>)}</div>
              </div>
            </m.section>

            <m.section {...sectionMotion} className="hp-section hp-areas sector-areas">
              <div className="container hp-areas-grid">
                <div className="hp-areas-copy"><Eyebrow light>Areas We Cover</Eyebrow><h2>{sector.areasTitle} <span>{sector.areasAccent}</span></h2><p>{sector.areasText}</p><div className="hp-areas-actions"><a className="hp-btn hp-btn-gold" href="tel:+919952525185">Call 99525 25185</a><button className="hp-btn hp-btn-outline" onClick={() => openModal({ type: "quote", interest: sector.crumb })}>Get a Free Quote</button></div></div>
                <div className="hp-areas-panel"><div className="hp-area-panel-group"><strong className="hp-area-label">Main areas</strong><div className="hp-main-areas">{mainServiceAreas.map((area) => <article className="hp-main-area" key={area}><span className="hp-area-pin"><MapPin size={21} /></span><h3>{area}</h3><p>{area === "Chennai" ? `${sector.crumb} projects` : "Our base, in Maraimalai Nagar"}</p></article>)}</div></div><div className="hp-area-panel-group hp-area-nearby"><strong className="hp-area-label">Also serving</strong><div className="hp-area-chips">{nearbyServiceAreas.map((area) => <span key={area}><MapPin size={13} />{area}</span>)}</div></div><p className="hp-area-note">Site not on the list? <button onClick={() => openModal({ type: "quote", interest: sector.crumb })}>Call us</button> and we will check.</p></div>
              </div>
            </m.section>

            <m.section {...sectionMotion} className="hp-faq res-faq sector-faq">
              <div className="container"><div className="hp-faq-head"><span className="hp-faq-eyebrow">{sector.crumb} Questions</span><h2>{sector.faqTitle}</h2></div><div className="hp-faq-list">{sector.faqs.map(([question, answer], index) => <div className={`hp-faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><h3><button type="button" className="hp-faq-trigger" aria-expanded={openFaq === index} aria-controls={`${view}-faq-answer-${index}`} id={`${view}-faq-question-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown size={20} /></button></h3><AnimatePresence initial={false}>{openFaq === index && <m.div id={`${view}-faq-answer-${index}`} role="region" aria-labelledby={`${view}-faq-question-${index}`} className="hp-faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.22 } }}><p>{answer}</p></m.div>}</AnimatePresence></div>)}</div></div>
            </m.section>
          </>
        )}

        {view === "residential" && (
          <>
            <m.section {...sectionMotion} className="hp-hero res-hero" aria-labelledby="residential-title">
              <div className="hp-hero-media" aria-hidden="true">
                <ResponsiveImage src="/images/hero-house.jpg" alt="" className="is-active" loading="eager" fetchPriority="high" sizes="100vw" />
              </div>
              <nav className="container page-breadcrumb res-hero-breadcrumb" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span>/</span>
                <a href="/services/">Construction Services</a>
                <span>/</span>
                <span aria-current="page">House Construction</span>
              </nav>
              <div className="container hp-hero-inner">
                <div className="hp-hero-copy">
                  <Eyebrow light>House Construction in Chennai</Eyebrow>
                  <h1 id="residential-title">House Construction Company in <span>Chennai &amp; Chengalpattu</span></h1>
                  <p>Planning to build your own house? ARKA Constructions looks after the whole job: plan, approvals, construction, finishing and handover. You deal with one team, and you know the cost before work starts. Our complete home construction package starts at ₹2,499 per sq ft.</p>
                  <div className="hp-hero-tags res-hero-tags" aria-label="House construction highlights">
                    <span className="hp-hero-tag"><Home size={15} /> From 1,200 sq ft</span>
                    <span className="hp-hero-tag"><IndianRupee size={15} /> From ₹2,499 per sq ft</span>
                    <span className="hp-hero-tag"><Wrench size={15} /> 1 year free maintenance labour</span>
                  </div>
                  <div className="hp-hero-actions">
                    <a href="#house-projects" className="hp-btn hp-btn-gold">View Our Projects <ArrowUpRight size={17} /></a>
                    <a href="#packages" className="hp-btn hp-btn-outline-light">View Our Packages <ArrowUpRight size={17} /></a>
                  </div>
                </div>
                <HeroQuoteForm heading="Tell Us About Your Plot" intro="Share a few details and our engineer will call you back." />
              </div>
            </m.section>

            <m.section {...sectionMotion} className="hp-section hp-section-white res-intro">
              <div className="container res-intro-grid">
                <div className="res-intro-copy">
                  <Eyebrow>Residential Construction</Eyebrow>
                  <h2>Looking for the Best Construction Company in Chennai for an <span>Individual House?</span></h2>
                  <p className="res-lead">Everyone says they are the best. We would rather you check for yourself. Ask for the quotation in writing. Visit one of our sites. Meet the engineer who will look after your house. If you like what you see, we would be glad to build your home.</p>
                  <p>An individual house is not a small job. For most families in Chennai and Chengalpattu, it is the biggest amount they will ever spend. That is why we keep things simple: one team, one written quote and regular updates from the site, so nothing comes as a surprise.</p>
                  <p>We are based in Maraimalai Nagar, Chengalpattu. Our founder, Kamarajan Krishnan, is an engineer with experience across homes, commercial buildings and factories, and he leads the team that will work on your house.</p>
                  <div className="res-intro-proof">
                    <ShieldCheck size={24} />
                    <span><strong>Visit our work before you decide.</strong> Project photos, drawings, references and site visits are available on request.</span>
                  </div>
                </div>
                <div className="res-intro-visual">
                  <ResponsiveImage src="/images/service-residential.jpg" alt="Modern independent house construction in Chennai" loading="lazy" sizes="(max-width: 980px) 100vw, 50vw" />
                  <div className="res-intro-stat"><strong>One team</strong><span>Plan to handover</span></div>
                </div>
              </div>
            </m.section>

            <m.section {...sectionMotion} className="hp-section hp-section-ivory res-turnkey" id="turnkey">
              <div className="container">
                <div className="hp-section-head res-section-head">
                  <div><Eyebrow>Turnkey Solution</Eyebrow><h2>Turnkey House Construction in Chennai: <span>One Team from Plan to Handover</span></h2></div>
                  <p>“Turnkey” simply means you do not have to run around finding separate contractors. We coordinate the work and hand over the finished home and its keys.</p>
                </div>
                <ol className="res-turnkey-grid" aria-label="Turnkey house construction stages">
                  {houseTurnkeySteps.map((step, index) => (
                    <m.li {...cardMotion} key={step.title}>
                      <span className="res-step-number">0{index + 1}</span>
                      <span className="res-step-icon"><step.icon size={24} /></span>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </m.li>
                  ))}
                </ol>
              </div>
            </m.section>

            <m.section {...sectionMotion} className="hp-section hp-section-white res-types">
              <div className="container">
                <div className="hp-section-head res-section-head">
                  <div><Eyebrow>Homes We Build</Eyebrow><h2>Independent Houses, Duplex Homes and <span>Villas We Build in Chennai</span></h2></div>
                  <p>Every plot and family is different. We plan the structure, spaces and finishes around the way you intend to live.</p>
                </div>
                <div className="res-types-grid">
                  {houseTypes.map(([title, text, Icon, image], index) => (
                    <m.article {...cardMotion} key={title}>
                      <ResponsiveImage className="type-card-image" src={image} alt="" aria-hidden="true" loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                      <div className="res-type-top"><span>0{index + 1}</span><Icon size={27} /></div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </m.article>
                  ))}
                </div>
              </div>
            </m.section>
          </>
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
                  <ResponsiveImage
                    src="/images/about-engineer-india.png"
                    alt="Indian engineers reviewing construction drawings on site"
                    loading="lazy"
                    sizes="(max-width: 720px) 100vw, 50vw"
                  />
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
                  Browse photographs from each project. The galleries advance
                  automatically, or you can use the arrows to move at your own pace.
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
                      <ProjectCarousel images={project.images} label={project.client} />
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
                      <ProjectCarousel images={project.images} label={`${project.client} construction in progress`} />
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

        {(view === "home" || view === "packages" || view === "residential") && (
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
                    <h1>Construction Packages and Pricing for <span>Homes, Commercial Buildings and Factories</span></h1>
                  ) : view === "residential" ? (
                    <h2>Complete House Construction Package: <span>Starting from ₹2,499 per sq ft</span></h2>
                  ) : (
                    <h2>Residential Construction Company in Chennai &amp; Chengalpattu: <span>Complete Home Package from ₹2,499/sq ft</span></h2>
                  )}
                </div>
                <p>{view === "home" ? "Review our complete residential package and ask our team for a project-specific quotation based on your plan and site." : view === "packages" ? "Review our complete residential package. Commercial and industrial work is priced separately after we understand the building, site, finishes, loads and utilities." : "Review the residential specification below. Your final consolidated quotation is prepared after the plan, structural details, elevation and BOQ are finalized."}</p>
              </div>
              <div className="hp-package-highlights" aria-label="Package highlights">
                {view === "home" ? (
                  <>
                    <div><Home size={19} /><span><strong>One complete package</strong> for your home</span></div>
                    <div><IndianRupee size={19} /><span><strong>₹2,499 per sq ft</strong> starting price</span></div>
                    <div><Wrench size={19} /><span><strong>Design to handover</strong> with one team</span></div>
                  </>
                ) : (
                  <>
                    <div><Home size={19} /><span><strong>Residential</strong> from ₹2,499 per sq ft</span></div>
                    <div><Building2 size={19} /><span><strong>Commercial</strong> priced to your project</span></div>
                    <div><Factory size={19} /><span><strong>Industrial</strong> priced to scope and loads</span></div>
                  </>
                )}
              </div>
              <div className={view === "packages" ? "hp-pricing-layout hp-pricing-layout-catalog" : "hp-pricing-layout is-residential-only"}>
                <div className="hp-package-grid hp-package-grid-single">
                  {residentialPackages.map((pkg, index) => (
                    <m.article
                      {...cardMotion}
                      className={`hp-package ${pkg.featured ? "is-featured" : ""}`}
                      key={pkg.name}
                    >
                      <div className="hp-package-head">
                        <span>Residential Construction</span>
                        <div className="hp-package-price">
                          {pkg.price} <small>{pkg.unit}</small>
                        </div>
                      </div>
                      <div className="hp-package-body">
                        <h3>{pkg.name}</h3>
                        <p className="hp-package-desc">{pkg.description}</p>
                        {pkg.details.map((detail) => (
                          <details key={detail.title}>
                            <summary>
                              {detail.title} <Plus size={16} />
                            </summary>
                            <ul className="hp-package-detail-list">
                              {detail.items.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                          </details>
                        ))}
                        <button className="hp-btn hp-btn-gold" onClick={() => openModal({ type: "package", index })}>
                          Get a Residential Quote <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </m.article>
                  ))}
                </div>
                {view === "packages" && (
                  <aside className="hp-custom-pricing" aria-label="Project-specific construction pricing">
                    <m.article {...cardMotion} className="hp-custom-price-card hp-custom-price-commercial">
                      <span className="hp-custom-price-icon"><Building2 size={24} /></span>
                      <span className="hp-custom-price-kicker">Commercial Construction</span>
                      <h2>Contact us for pricing</h2>
                      <p>Offices, shops, showrooms and mixed-use buildings are quoted around your opening date, finishes, access, parking and utility needs.</p>
                      <ul><li>Written project scope</li><li>Material and finish allowances</li><li>Schedule and milestone plan</li></ul>
                      <button className="hp-btn hp-btn-gold" onClick={() => openModal({ type: "quote", interest: "Commercial construction pricing" })}>Request Commercial Pricing <ArrowUpRight size={16} /></button>
                    </m.article>
                    <m.article {...cardMotion} className="hp-custom-price-card hp-custom-price-industrial">
                      <span className="hp-custom-price-icon"><Factory size={24} /></span>
                      <span className="hp-custom-price-kicker">Industrial Construction</span>
                      <h2>Contact us for pricing</h2>
                      <p>Factories, PEB structures, machine foundations and industrial civil works are priced after reviewing loads, operations, utilities and site conditions.</p>
                      <ul><li>Civil and structural scope</li><li>Loads, flooring and utility needs</li><li>Phasing for operating sites</li></ul>
                      <button className="hp-btn hp-btn-outline-light" onClick={() => openModal({ type: "quote", interest: "Industrial construction pricing" })}>Request Industrial Pricing <ArrowUpRight size={16} /></button>
                    </m.article>
                  </aside>
                )}
              </div>
              <p className="hp-package-note">The residential rate and inclusions follow the supplied package specification. The final consolidated quotation is issued after the plan, structural details, elevation and BOQ are finalized.</p>
              <div className="hp-package-terms">
                <div><h3>Measured extra works</h3><p>Septic tank ₹20/litre · RCC sump ₹32/litre · tie beam ₹450/running ft · compound wall ₹2,300/running ft · external paving ₹130/sq ft · cooling tiles ₹140/sq ft.</p></div>
                <div><h3>Quoted to design</h3><p>Lift construction, safety grills, main gate, elevation, borewell and motor, approvals and EB charges, soak pit drainage and other site-specific works.</p></div>
                <div><h3>Optional interiors</h3><p>Add ₹650/sq ft for the interior package covering designer false ceiling, TV and pooja units, bedroom wardrobes and an acrylic modular kitchen.</p></div>
              </div>
            </div>
          </m.section>
        )}

        {view === "residential" && (
          <m.section {...sectionMotion} className="hp-section res-house-projects" id="house-projects">
            <div className="container">
              <div className="hp-section-head res-section-head">
                <div><Eyebrow>Our House Construction Projects</Eyebrow><h2>House Construction Projects in <span>Chennai &amp; Chengalpattu</span></h2></div>
                <p>Follow our residential projects through construction and finishing. More photographs, drawings and client references are available when you meet our team.</p>
              </div>
              <div className="hp-projects-toolbar">
                <p>Choose completed or ongoing house construction projects.</p>
                <div className="hp-tabs" role="tablist" aria-label="Filter house projects by status">
                  {(["completed", "ongoing"] as const).map((name) => (
                    <button
                      key={name}
                      id={`res-project-tab-${name}`}
                      className={`hp-tab ${tab === name ? "is-active" : ""}`}
                      role="tab"
                      aria-selected={tab === name}
                      aria-controls={`res-project-panel-${name}`}
                      tabIndex={tab === name ? 0 : -1}
                      onClick={() => setTab(name)}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                          event.preventDefault();
                          const next = name === "completed" ? "ongoing" : "completed";
                          setTab(next);
                          document.getElementById(`res-project-tab-${next}`)?.focus();
                        }
                      }}
                    >
                      {tab === name && <m.span className="hp-tab-indicator" layoutId="residential-project-status-indicator" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                      <span className="hp-tab-label">{name === "completed" ? "Completed" : "Ongoing"}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div id={`res-project-panel-${tab}`} role="tabpanel" aria-labelledby={`res-project-tab-${tab}`} className="hp-project-grid">
                {residentialProjects.filter((project) => project.status.toLowerCase() === tab).map((project) => (
                  <m.article {...cardMotion} className="hp-project-card" key={`${project.client}-${project.location}`}>
                    <ProjectCarousel images={project.images} label={`${project.client} residence in ${project.location}`} />
                    <div className="hp-project-body">
                      <div className="hp-project-top">
                        <span className="hp-project-type">Residential · {project.status}</span>
                        <button className="hp-project-arrow" aria-label={`Enquire about ${project.client}`} onClick={() => openModal({ type: "quote", interest: `Residential project — ${project.client}` })}>
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                      <h3>{project.client}</h3>
                      <p className="hp-project-location"><MapPin size={13} /> {project.location}</p>
                      <dl className="hp-project-meta">
                        <div><dt>Build up</dt><dd>{project.buildUp}</dd></div>
                        <div><dt>Plot</dt><dd>{project.plot}</dd></div>
                      </dl>
                    </div>
                  </m.article>
                ))}
              </div>
            </div>
          </m.section>
        )}

        {view === "residential" && (
          <m.section {...sectionMotion} className="hp-why res-why" id="why-arka-house">
            <div className="container hp-why-grid">
              <div className="hp-why-copy">
                <Eyebrow light>Why ARKA</Eyebrow>
                <h2>Why Build Your House <span>with ARKA</span></h2>
                <p>A house is too important for vague promises. Our process is built around engineering supervision, written costs and visible progress.</p>
                <button className="hp-btn hp-btn-gold" onClick={() => openModal({ type: "quote", interest: "Residential house construction" })}>Talk to an Engineer <ArrowUpRight size={16} /></button>
              </div>
              <div className="hp-why-list res-why-list">
                {houseWhyReasons.map(([title, text, Icon]) => (
                  <m.article {...cardMotion} className="hp-why-item" key={title}>
                    <Icon size={22} strokeWidth={1.5} />
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </m.article>
                ))}
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
                    <ResponsiveImage
                      src={category.image}
                      alt={category.title}
                      loading="lazy"
                      sizes="(max-width: 720px) 100vw, 33vw"
                    />
                    <div className="hp-service-category-body">
                      <span className="hp-service-category-icon">
                        <category.icon size={22} />
                      </span>
                      <h3>{category.title}</h3>
                      <p>{category.text}</p>
                      <a href={category.title === "Residential Construction" ? "/house-construction-company-chennai/" : category.title === "Commercial Construction" ? "/commercial-construction-company-chennai/" : "/industrial-construction-company-chennai/"}>
                        Explore Services <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </m.article>
                ))}
              </div>
            </div>
          </m.section>
        )}

        {view === "home" && (
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
                    <ResponsiveImage className="hp-what-image" src={`/images/${serviceImages[index]}`} alt="" loading="lazy" sizes="(max-width: 720px) 100vw, 33vw" />
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

        {(view === "home" || view === "residential") && (
          <m.section {...sectionMotion} className="hp-section hp-areas" id="areas-we-cover">
            <div className="container hp-areas-grid">
              <div className="hp-areas-copy">
                <Eyebrow light>Areas We Cover</Eyebrow>
                {view === "residential" ? (
                  <h2>House Construction in <span>Chennai, Chengalpattu</span> and Nearby Areas</h2>
                ) : (
                  <h2>Construction Services in <span>Chennai, Chengalpattu,</span>{" "}Kanchipuram, Oragadam &amp; Nearby Areas</h2>
                )}
                <p>{view === "residential" ? "Chennai and Chengalpattu are our main areas. We also build in the towns around them. If your plot is nearby and not on the list, call us and we will tell you honestly if we can take it up." : "Chennai and Chengalpattu are our main areas. We also take up work in the towns and industrial belts around them. If your site is nearby and not listed, call us and we will tell you honestly if we can take it up."}</p>
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

        {view === "residential" && (
          <m.section {...sectionMotion} className="hp-faq res-faq" id="house-faqs">
            <div className="container">
              <div className="hp-faq-head">
                <span className="hp-faq-eyebrow">House Construction Questions</span>
                <h2>Frequently Asked Questions About House Construction in Chennai</h2>
              </div>
              <div className="hp-faq-list">
                {houseFaqs.map(([question, answer], index) => (
                  <div className={`hp-faq-item ${openFaq === index ? "is-open" : ""}`} key={question}>
                    <h3>
                      <button
                        type="button"
                        className="hp-faq-trigger"
                        aria-expanded={openFaq === index}
                        aria-controls={`house-faq-answer-${index}`}
                        id={`house-faq-question-${index}`}
                        onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                      >
                        <span>{question}</span><ChevronDown size={20} />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {openFaq === index && (
                        <m.div
                          id={`house-faq-answer-${index}`}
                          role="region"
                          aria-labelledby={`house-faq-question-${index}`}
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
              <a href="/packages/">Construction Packages</a>
              <a href="/projects/">Construction Projects</a>
              <button onClick={() => openModal({ type: "quote" })}>
                Contact Us
              </button>
            </div>
            <div>
              <h3>Construction Services</h3>
              {serviceCategories.map((service) => (
                <a key={service.title} href={service.title === "Residential Construction" ? "/house-construction-company-chennai/" : service.title === "Commercial Construction" ? "/commercial-construction-company-chennai/" : "/industrial-construction-company-chennai/"}>
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
                  <span className="label-text">What can we help with? <span>(optional)</span></span>
                  <select
                    name="service"
                    defaultValue={modal.interest || ""}
                    aria-invalid={Boolean(modalFieldErrors.service)}
                    aria-describedby={modalFieldErrors.service ? "modal-service-error" : undefined}
                    onChange={() => setModalFieldErrors((current) => ({ ...current, service: undefined }))}
                  >
                    <option value="">Select a service (optional)</option>
                    {[
                      ...new Set(
                        [
                          modal.interest,
                          "Residential construction",
                          "Commercial or industrial work",
                          ...services.map((service) => service.title),
                          ...residentialPackages.map((pkg) => pkg.name),
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
                  By submitting, you agree that ARKA may contact you about your project. This site is protected by reCAPTCHA.
                </p>
                <input className="hp-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <RecaptchaWidget ref={modalRecaptcha} resetKey={modalRecaptchaResetKey} />
                {modalError && <p className="form-error" role="alert">{modalError}</p>}
                <button className="hp-btn hp-btn-gold" type="submit" disabled={modalSubmitting}>
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
          {modal?.type === "package" && modalPackage && (
            <>
              <Eyebrow>A starting point for your home</Eyebrow>
              <h2 id="modal-title">
                The {modalPackage.name}
                <br />
                <span>conversation.</span>
              </h2>
              <p>{modalPackage.description}</p>
              <div className="modal-callout">
                <strong>
                  {modalPackage.price}{" "}
                  {modalPackage.unit}
                </strong>
                <br />
                This is a proposed planning option, not a fixed-price offer.
                Ask our team for a written scope covering materials, allowances,
                area basis, taxes, exclusions and the project schedule.
              </div>
              <ul className="modal-list">
                {modalPackage.details.map((detail) => (
                  <li key={detail.title}>
                    <Check size={17} />
                    <span>
                      <strong>{detail.title}</strong>
                      <span className="modal-package-items">{detail.items.join(" · ")}</span>
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
                    interest: `${modalPackage.name}`,
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
