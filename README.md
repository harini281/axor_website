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
- Eleven-section brand story: Home, About, Philosophy, Capabilities, Industries, Our Work, Technology Landscape, Our Approach, Founding Leadership, Insights and Contact
- Seven service divisions: AI & Intelligent Systems, Software Engineering, Data & Analytics, Cybersecurity, Cloud & DevOps, Digital Growth, and Design & Consulting
- Service enquiry actions that preselect the chosen service in the contact form
- Four guiding philosophies: Kaizen, Kodawari, Kizuna and Gaman
- Three supplied founder portraits with their configured roles and supplied LinkedIn URLs
- Concept demonstrations clearly distinguished from client case studies and measured results
- One automatically rotating Z-inspired 3D hero structure in electric blue, cyan and ice blue, with pointer response and reduced-motion support
- Reduced motion support, responsive layouts, focus styles and accessible form feedback

## Contact integration required before launch

The contact form is prepared to POST JSON to a configurable endpoint in `src/config/site.ts`. It includes browser-side validation, a sending state, success and error feedback. Submissions remain disabled until a real secure endpoint is configured.

Set `siteConfig.contactEndpoint` to a verified HTTPS endpoint that validates and stores submissions, applies server-side spam protection and rate limiting, and returns a successful HTTP response. Until that endpoint is configured, form submission displays a clear not-connected message.

The public company email is configured as `arudkumaranv@gmail.com`. WhatsApp and social profile values remain empty and are hidden until verified details are supplied. Do not put private keys or secrets in frontend code or `VITE_*` variables.

## Content and assets

- Founder portraits are the three photographs supplied for the leadership profiles.
- The LinkedIn URLs are profile URLs previously supplied for the founders; confirm they remain current before launch.
- Portfolio items are concept demonstrations, not client case studies. Replace them only with approved project evidence.
- Insights are topic directions, not fabricated published articles.
- No client counts, testimonials, project results, company address, email, response time or social profile has been invented.
- The supplied official ZENTARO logo mark is used from `public/images/zentaro-mark.webp` in the navigation, footer and browser icon. The original aspect ratio is preserved.

## Main files

- `src/App.tsx` — homepage, service interaction and enquiry workflow
- `src/components/HeroScene.tsx` — hero sculpture
- `src/components/AmbientScene.tsx` — static 3D section studies
- `src/config/site.ts` — company, contact, social and founder configuration
- `src/styles.css` — visual system and responsive styles
- `index.html` — page metadata and font loading

## Design reference credit

The visual refinement follows the product-led direction of [Unslop by Damir Sokolovsky](https://github.com/heydamir/unslop): clear hierarchy, restrained visual effects, readable copy and purposeful motion. The official ZENTARO mark determines the midnight navy, electric blue, cyan and ice blue palette.
