# BitcoinStart Nordics

Modern, multilingual React landing page for Bitcoin onboarding services in the Nordics.

The site focuses on beginner-friendly education, practical wallet/security guidance, and direct booking through Cal.com.

## What Is In This Repo

- Vite + React + TypeScript single-page app
- Tailwind CSS v4 styling with light/dark theme support
- i18n with English, Norwegian, Swedish, and Danish
- Cal.com booking integration (popup booking from Services cards)
- SEO metadata updates per language
- Cookie consent banner with localStorage persistence
- Netlify SPA route support for legal pages
- Image-ready content sections with reusable image wrapper component

## Current Main Features

- Sticky header with language selector and theme toggle
- Hero, Problem/Solution, Services, About, FAQ, Contact, Footer
- Service booking buttons open Cal.com popup for:
  - Intro session (60 min)
  - Wallet/Security session (90 min)
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
- Motion (animations)
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
|  |- *.png / *.webp assets
|- src/
|  |- components/
|  |  |- Header.tsx
|  |  |- Hero.tsx
|  |  |- Services.tsx
|  |  |- About.tsx
|  |  |- FAQ.tsx
|  |  |- Contact.tsx
|  |  |- CookieConsent.tsx
|  |  |- SeoHead.tsx
|  |  |- ImagePlaceholder.tsx
|  |- App.tsx
|  |- i18n.ts
|  |- main.tsx
|  |- index.css
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
- `npm run translate` - auto-translate locale JSON files from English to NO/SV/DA
- `npm run clean` - remove `dist` folder (uses `rm -rf`, shell dependent)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
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

Defined in `.env.example`:

- `GEMINI_API_KEY` - used where Gemini API access is needed
- `APP_URL` - app base URL for runtime/use-case integrations

## Localization

- Translation files live under `public/locales/{lang}/{namespace}.json`
- Namespaces include: `common`, `seo`, `hero`, `services`, `about`, `faq`, `contact`, `data`
- Language detection behavior:
  - Returning users: language from localStorage
  - First-time users: country lookup via `ipapi.co` (NO/SE/DK mapping, fallback EN)

## Booking Integration

Services booking is powered by Cal.com popup embed (`cal.eu` origin):

- Intro: `bitcoinstart/60min`
- Wallet/Security: `bitcoinstart/90min`

Configured in `src/components/Services.tsx` with namespaced embeds.

## Deployment Notes

This repo includes `public/_redirects` for Netlify SPA routing:

- `/privacy-policy /index.html 200`
- `/terms-of-service /index.html 200`
- `/* /index.html 200`

## Design Notes

- Orange color theme is customized in `src/index.css`
- Content images are rendered via `ImagePlaceholder` (now supports real images with smooth hover transitions)
- Most content sections are responsive and optimized for desktop + mobile layouts
