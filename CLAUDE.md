# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at localhost:4321, live reload
npm run build    # static output to dist/
npm run preview  # serve dist/ locally after build
```

No test suite or linter configured.

## Architecture

Single-page Astro 5 static site. Tailwind CSS 3 for styling. Deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `master` (not `main`).

### Key config files

- **`src/data/site.ts`** — single source of truth. Change `AVAILABLE` to flip availability status across nav, hero, and anywhere it's used. `FORMSPREE_ID` is the Formspree endpoint. `CALENDLY` is currently `#contact` (placeholder).
- **`tailwind.config.mjs`** — custom color tokens: `accent` (#94A3B8 slate), `muted` (#888), `card` (#111), `border-subtle`. Font families: `display` (Space Grotesk), `sans` (Inter), `mono` (JetBrains Mono).
- **`src/styles/global.css`** — Tailwind directives + component classes (`.btn-primary`, `.btn-ghost`, `.card`, `.pill`, `.section-label`, `.section-heading`). FAQ accordion CSS lives here.

### Component structure

One `.astro` file per page section, composed in `src/pages/index.astro`. Order matches visual page order:

`Nav → Hero → Services → WhyMe → Experience → TechStack → Certifications → HowWeWork → FAQ → Contact → Footer`

All section data (job history, service cards, cert list, FAQ entries, tech stack categories) is **inline in the component frontmatter** as typed arrays — not in a CMS or content collection. Edit the array in the component to change content.

### Assets

- `public/img/` — cert badge PNGs and `headshot.jpeg` (profile photo)
- `public/resume.pdf`, `public/ITIL_Foundations.pdf` — linked directly
- `public/CNAME` — `rompf.dev` for GitHub Pages custom domain
- Original source images also in `img/` at repo root (not served, just kept as originals)

### Design constraints

Dark theme only, no light/dark toggle. Background `#050505` solid (no pattern). Accent color is muted slate `#94A3B8` — not neon. Avoid: dot grid backgrounds, floating badges over photos, scrolling marquees, neon accent colors. Prefer whitespace and typography over decorative elements.

### Deployment

Push to `master` → GitHub Actions builds → deploys `dist/` to `gh-pages` branch → served at `rompf.dev`. The `CNAME` file in `public/` is included in the build output automatically.
