# BitcoinStart Nordics

Modern multilingual React landing page for Bitcoin onboarding services in the Nordics.

The site focuses on beginner-friendly education, practical wallet and security guidance, and direct booking through Cal.com.

## Project Overview

- Vite + React + TypeScript single-page app
- Tailwind CSS v4 with light and dark theme support
- i18n with English, Norwegian, Swedish, and Danish
- Cal.com booking integration (popup booking from service cards)
- Testimonials section with live public review fetch through `/api/google-reviews`
- Netlify function for production review fetch
- SEO metadata updates per language
- Cookie consent banner with localStorage persistence
- Legal routes for privacy policy and terms of service

## Current Main Features

- Sticky header with language selector and theme toggle
- Hero section with autoplay video and sound controls
- Problem and solution section
- Services section with booking buttons (Cal.com)
- About, Testimonials, FAQ, Contact, Footer
- Localized content loaded from `public/locales/*`
- Legal routes:
  - `/privacy-policy`
  - `/terms-of-service`

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- i18next + react-i18next + i18next-http-backend
- Motion
- Lucide icons
- Cal.com Embed (`@calcom/embed-react`)

## Project Structure

```text
.
|- public/
|  |- locales/
|  |  |- en/
|  |  |- no/
|  |  |- sv/
|  |  |- da/
|  |- _redirects
|- netlify/
|  |- functions/
|     |- google-reviews.js
|- src/
|  |- components/
|  |  |- Header.tsx
|  |  |- Hero.tsx
|  |  |- Services.tsx
|  |  |- About.tsx
|  |  |- Testimonials.tsx
|  |  |- FAQ.tsx
|  |  |- Contact.tsx
|  |  |- CookieConsent.tsx
|  |  |- SeoHead.tsx
|  |  |- ImagePlaceholder.tsx
|  |- App.tsx
|  |- i18n.ts
|  |- main.tsx
|  |- index.css
|- netlify.toml
|- translate.js
|- vite.config.ts
|- package.json
```

## Scripts

From the project root:

- `npm run dev` - start local dev server on port 3000
- `npm run build` - build production bundle
- `npm run preview` - preview production build locally
- `npm run lint` - TypeScript type-check (`tsc --noEmit`)
- `npm run translate` - auto-translate locale JSON files from EN to NO/SV/DA
- `npm run clean` - remove `dist` folder (`rm -rf`, shell dependent)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in the project root with at least:

```bash
GOOGLE_PLACE_ID=YOUR_GOOGLE_PLACE_ID
GOOGLE_PLACES_API_KEY=YOUR_SERVER_API_KEY
VITE_GOOGLE_BUSINESS_PROFILE_URL=https://your-review-url
```

3. Start development:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Environment Variables

Commonly used environment variables:

- `GOOGLE_PLACE_ID` - Google Place ID used for fetching public reviews
- `GOOGLE_PLACES_API_KEY` - server-side API key for Places API (New)
- `VITE_GOOGLE_BUSINESS_PROFILE_URL` - optional "See all reviews" link in the UI
- `GOOGLE_BROWSER_API_KEY` - optional browser key (not required for current server-side flow)
- `GEMINI_API_KEY` - optional, used by other tooling/scripts in this repo
- `APP_URL` - optional app base URL

## Localization

- Translation files live under `public/locales/{lang}/{namespace}.json`
- Active namespaces: `common`, `seo`, `hero`, `services`, `about`, `testimonials`, `faq`, `contact`, `data`
- Language detection behavior:
  - Returning users: language from localStorage
  - First-time users: country lookup via `ipapi.co` (NO/SE/DK mapping, fallback EN)

## Booking Integration

Services booking is powered by Cal.com popup embed (`cal.eu` origin):

- Intro: `bitcoinstart/60min`
- Wallet and Security: `bitcoinstart/90min`

Configured in `src/components/Services.tsx`.

## Reviews Integration

- Frontend fetches: `/api/google-reviews?lang=<en|sv|no|da>`
- Dev and preview: handled by Vite middleware in `vite.config.ts`
- Production (Netlify): handled by `netlify/functions/google-reviews.js`
- Netlify route mapping is defined in `public/_redirects`

## Deployment Notes (Netlify)

This repo uses:

- `netlify.toml` for build and function directory config
- `public/_redirects` for SPA and function routing

Important routes:

- `/api/google-reviews /.netlify/functions/google-reviews 200`
- `/privacy-policy /index.html 200`
- `/terms-of-service /index.html 200`
- `/* /index.html 200`

For production, set `GOOGLE_PLACE_ID` and `GOOGLE_PLACES_API_KEY` in Netlify environment variables.

## Design Notes

- Orange color theme is customized in `src/index.css`
- Content images are rendered via `ImagePlaceholder`
- Sections are responsive and optimized for desktop and mobile
