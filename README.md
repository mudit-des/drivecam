# ACKO DriveCam

Marketing + support site for ACKO DriveCam, built with Next.js 14 (App Router) and Tailwind CSS.

## Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS with a custom ACKO-inspired token set
- **Icons**: lucide-react
- **Fonts**: Inter (loaded via Google Fonts)

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  globals.css        # Tailwind layers + base resets
  layout.tsx         # Root layout, metadata, fonts
  page.tsx           # Home page composition
components/
  Logo.tsx           # ACKO · DriveCam wordmark
  Navbar.tsx         # Floating, sticky, responsive nav
  Hero.tsx           # Two-column hero with mock preview
tailwind.config.ts   # Custom palette, shadows, radii
```

## Roadmap

This is **part 1** — only the navbar and hero are built. Upcoming sections will include features, installation guide, FAQs, and footer.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint with `next lint`
