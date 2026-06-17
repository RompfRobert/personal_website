# rompf.dev

Personal portfolio + B2B contracting site for Robert Rompf. Live at [rompf.dev](https://rompf.dev).

## Tech Stack

- **Astro 5** — static site generator
- **Tailwind CSS 3** — styling (custom color tokens in `tailwind.config.mjs`)
- **TypeScript** — type safety
- **Formspree** — contact form (no backend required)
- **GitHub Pages** — hosting (via `gh-pages` branch)

## Quick Start

```bash
npm install
npm run dev      # dev server at localhost:4321, live reload
npm run build    # static output to dist/
npm run preview  # serve dist/ locally after build
npm run check    # TypeScript + Astro type check
npm run format   # format all files with Prettier
```

## Project Structure

```
src/
  components/      One .astro file per page section (Nav, Hero, Services, etc.)
  data/site.ts     Single source of truth for site config, links, availability status
  layouts/         Layout.astro wraps all pages
  pages/           index.astro composes all sections in order
  styles/          global.css — Tailwind directives + component classes

public/            Static assets (images, resume.pdf, CNAME)
```

## Configuration

Edit `src/data/site.ts` to control:

- `AVAILABLE` — flip availability status across nav, hero, and contact section
- `FORMSPREE_ID` — contact form endpoint
- Social links: `GITHUB`, `LINKEDIN`
- `SITE_TITLE` and `SITE_DESCRIPTION` — SEO metadata

## Component Data

All section data (job history, service cards, certifications, FAQ entries, tech stack) is defined inline as typed arrays in each component's frontmatter — not in a CMS. Edit the component file directly to change content.

**Key components:**
- `src/components/Experience.astro` — job history and bullet points
- `src/components/Services.astro` — service offerings and descriptions
- `src/components/FAQ.astro` — FAQ entries and answers
- `src/components/Contact.astro` — contact form (Formspree integration)

## Deployment

Push to `master` branch → GitHub Actions workflow runs → builds static site → deploys `dist/` to `gh-pages` branch → served at rompf.dev.

Configured in `.github/workflows/deploy.yml`. No environment variables or extra secrets needed (uses GitHub's built-in `GITHUB_TOKEN`).

## Design Constraints

- Dark theme only (no light/dark toggle)
- Background: `#050505` (solid, no pattern)
- Accent color: muted slate `#94A3B8` — not neon
- Prefer whitespace and typography over decorative elements

Custom Tailwind tokens defined in `tailwind.config.mjs`:
- Colors: `accent`, `muted`, `card`, `border-subtle`
- Fonts: `font-display` (Space Grotesk), `font-sans` (Inter), `font-mono` (JetBrains Mono)

## Pre-commit Hooks

Husky runs on every commit:
1. Prettier formats staged `*.{astro,ts,js,mjs,css,json}` files
2. `astro check` validates TypeScript and Astro syntax

Hook definition: `.husky/pre-commit`

## Local Development

No test suite or linter beyond Prettier and Astro's built-in checks. Astro's type checking covers TypeScript validation.

To run type checking manually:
```bash
npm run check
```
