# ARKA homepage

## Stack and visual system
React 19, TypeScript, standard Vite multi-page static build, custom CSS, Lucide icons, independent static hosting. Headings: Outfit. Body: DM Sans. FAQ eyebrow: Caveat. Navy #0B2237, deep navy #081C2E, gold #E5A722, cream #FAF2E6, ivory #FAF9F7, white #FFFFFF, muted text #5F6B73.

## Home page sections
The layout follows `Home Page - Layout Design.pdf`:
1. Header: Home, Construction Services (Residential / Commercial / Industrial dropdown), Projects, Packages, phone text and Get a Free Quote.
2. Hero: "Best Construction Company in Chennai", short company sentence with Residential / Commercial / Industrial tags, View Our Projects and View Our Packages buttons, callback form.
3. About: Kamarajan Krishnan, proprietor and engineer, with site photograph.
4. Our Construction Projects: completed cards use a design/completed before-after slider; ongoing cards use a construction photograph. Each card shows client name, location, build-up area and plot area.
5. Our Construction Packages: Standard ₹2,499/sq ft, Premium ₹2,749/sq ft and Ultra Luxury ₹3,499/sq ft, each with expandable Design, Project Management and Structure rows.
6. Our Construction Services: Residential, Commercial and Industrial categories.
7. What We Do: six capability cards with images, icons, descriptions and Explore Services.
8. Why Choose ARKA: eight reasons in a navy band.
9. Our Approach: Understand, Plan, Execute, Deliver, followed by Vision and Mission boxes.
10. FAQs: "Client Questions" eyebrow, large uppercase heading and native accordion.
11. Footer: brand, Quick Links, Our Services, Contact Information and centered copyright.

## Content and launch review
Services, proprietor name, client references, business contacts and strengths are from the supplied ARKA company profile. The PDF is not published because it contains personal identifiers. Extracted logo in public/images is a reference; the header uses a proposed typographic mark.

Confirm the requested "Best" headline and Chennai coverage before public release. Experience years and engineering qualifications are not supplied.

The About photograph is representative stock photography. Replace it with a verified portrait or site photograph of Kamarajan Krishnan before launch.

Project photographs and square-foot values are representative and indicative, not confirmed case studies. Replace them with ARKA's own design, completed and construction photographs plus verified area details before launch.

Standard, Premium and Ultra Luxury are indicative starting rates per sq ft, not fixed-price offers. Confirm specifications, exclusions, taxes and rates. The approach is an editorial workflow inferred from the profile and needs business confirmation.

## Features
Sticky navigation, mobile menu/contact bar, completed/ongoing tabs with keyboard support, before-after project sliders, package accordions, service details, native FAQ accordions, accessible dialogs, reduced-motion support, contact and map links. Services, Projects and Packages have dedicated static pages that reuse the home sections.

Quote forms validate fields and prepare an email draft. The user must open their email app and send it. No server lead storage, automatic sending, CMS or analytics is connected. Add these separately when requirements are agreed. No user details enter source control.

## Images
Downloaded reference photographs in `public/images`, clearly distinguished from ARKA work:
- Hero: Pexels crane/construction site (photo 439416)
- About: Pexels engineers on site (photo 1216589)
- Projects and services: Unsplash and Pexels reference photography

## Commands
`npm run dev` for preview, `npm run build` for production build, `npm run typecheck` for type checking.
