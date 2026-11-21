# AXOR Technologies — Website

Premium React + TypeScript + Vite company website for AXOR Technologies. The implementation extends the existing starter architecture and preserves the supplied brand asset.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Implemented
- Responsive navigation and branded homepage
- Lazy-loaded React Three Fiber hero scene with pointer-responsive metallic geometry, lighting and particles
- Seven selectable service detail panels with capabilities and business value
- Company introduction with vision and mission statements
- Dedicated technology landscape grouped by AI/ML, application engineering, data platforms and delivery
- Original AXOR principles / quote section (not presented as testimonials)
- Founder LinkedIn links supplied by the AXOR team
- Founding leadership cards using clearly identified initials-based portrait placeholders
- Concept demonstrations explicitly distinguished from client case studies
- Contact enquiry form with required-field validation and WhatsApp handoff
- WhatsApp contact and Sri Lanka consultation availability wording
- Configurable social profile URLs and company email in `src/config/site.ts`; unconfigured links remain inactive
- Reduced-motion CSS support and responsive layouts
- SEO description and Open Graph metadata



## Architecture
- `src/App.tsx` — page composition and interactive sections
- `src/components/HeroScene.tsx` — lazy-loaded Three.js / React Three Fiber hero visual
- `src/config/site.ts` — contact, social and leadership configuration
- `src/styles.css` — responsive visual system and reduced-motion rules
- `public/images/axor-logo.jpg` — supplied AXOR logo artwork

## Contact form behaviour
The form validates required fields in the browser and opens WhatsApp with a prefilled message. It does not currently send an email or write to a database.


## Dimensional experience
The website includes live Three.js / React Three Fiber scenes in the hero, technology landscape, engineering approach and project exploration sections. The additional scenes are lazy-loaded, mounted near the viewport with IntersectionObserver, use a capped device pixel ratio, and respect reduced-motion preferences. CSS dimensional interactions are used for leadership and project cards.



## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.


## Leadership portrait mapping

The leadership cards use the approved portraits for Arudkumaran Vengadeswaran (CEO), Ravichandran Harini (CTO), and Shehani Lakshika Chandrakumar (CISO). Harini's portrait uses the latest approved white-background image; Shehani's uses the supplied office portrait.
