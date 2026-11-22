# Zentaro Technologies — Website

Corporate website for Zentaro Technologies, built with React, TypeScript, Vite, React Three Fiber and Framer Motion.

## Run locally

Requirements: Node.js 20.19+ or 22.12+, and npm.

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run typecheck
npm run build
npm run preview
```

## Implemented

- Responsive navigation with active-section state and a keyboard-operable mobile menu
- Homepage narrative covering the company, capabilities, industries, selected work, engineering approach, guiding philosophies, leadership, insights, FAQ and contact
- Seven service divisions: AI & Intelligent Systems, Software Engineering, Data & Analytics, Cybersecurity, Cloud & DevOps, Digital Growth, and Design & Consulting
- Service enquiry actions that preselect the chosen service in the contact form
- Four guiding philosophies: Kaizen, Kodawari, Kizuna and Gaman
- Three supplied founder portraits with their configured roles and supplied LinkedIn URLs
- Technical demonstrations clearly distinguished from verified client case studies
- Interconnected steel-and-brass hero artwork, with secondary static 3D studies loaded near the viewport
- Reduced motion support, responsive layouts, focus styles and accessible form feedback

## Contact integration required before launch

The contact form is implemented to POST JSON to a configurable endpoint in `src/config/site.ts`. It includes frontend validation, a sending state, success and error feedback, and does not claim success when no endpoint exists.

Set `siteConfig.contactEndpoint` to a verified HTTPS endpoint that validates and stores submissions, applies server-side spam protection and rate limiting, and returns a successful HTTP response. Until that endpoint is configured, form submission displays a clear not-connected message.

Company email, WhatsApp and social profile values remain empty and are hidden from the public interface until verified details are supplied. Do not put private keys or secrets in frontend code or `VITE_*` variables.

## Content and assets

- Founder portraits are the three photographs supplied for the leadership profiles.
- The LinkedIn URLs are profile URLs previously supplied for the founders; confirm they remain current before launch.
- Portfolio items are concept demonstrations, not client case studies. Replace them only with approved project evidence.
- Insights are future editorial themes, not fabricated published articles.
- No client counts, testimonials, project results, company address, email, response time or social profile has been invented.
- A Zentaro logo asset has not been supplied yet, so the header uses a text wordmark instead of displaying the old AXOR logo.

## Main files

- `src/App.tsx` — homepage, service interaction and enquiry workflow
- `src/components/HeroScene.tsx` — hero sculpture
- `src/components/AmbientScene.tsx` — static 3D section studies
- `src/config/site.ts` — company, contact, social and founder configuration
- `src/styles.css` — visual system and responsive styles
- `index.html` — page metadata and font loading

## Design reference credit

The visual quality pass was informed by [Unslop by Damir Sokolovsky](https://github.com/heydamir/unslop), used as a design reference under its CC BY 4.0 license.
