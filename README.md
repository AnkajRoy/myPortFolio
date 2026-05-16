# Ankaj Kumar — Portfolio

A fast, accessible, fully responsive portfolio for **Ankaj Kumar**, Frontend Engineer at InCred Financial Services.
Built with Angular 16 standalone components + PrimeNG and a hand-rolled design system.

## Highlights

- **Real content** — sourced from my CV. No placeholder companies, fake certifications, or invented stats.
- **Fully responsive** — fluid typography with `clamp()`, mobile hamburger nav, ≥44px touch targets, prefers-reduced-motion.
- **Interactive** — typewriter hero, scroll-revealed sections (IntersectionObserver), animated count-up stats, project filter, copy-to-clipboard contact info, dark mode.
- **Accessible** — skip-link, ARIA labels, focus-visible outlines, semantic landmarks, JSON-LD for SEO.
- **Reusable layer** — shared `ResumeService`, `ThemeService`, `RevealOnScrollDirective`, `AnimateProgressDirective`, `CountUpDirective`.

## Tech stack

| Layer        | Tools                                              |
|--------------|----------------------------------------------------|
| Framework    | Angular 16.2 (standalone components, lazy routes)  |
| UI Library   | PrimeNG 16 (`lara-light-blue` theme)               |
| Styling      | SCSS with CSS variables, `clamp()` typography      |
| Routing      | `@angular/router` with in-memory scrolling         |
| State        | Angular signals (`signal`, `effect`)               |
| Forms        | Reactive forms with full validation                |

## Project structure

```
src/
├── app/
│   ├── components/
│   │   ├── back-to-top/   – fixed scroll-to-top button
│   │   ├── header/        – sticky nav, mobile drawer, theme toggle
│   │   ├── footer/        – real social links + contact
│   │   ├── home/          – hero, stats, core stack, featured work, CTA
│   │   ├── about/         – intro, education, skills, "beyond code"
│   │   ├── experience/    – InCred role with sections + timeline
│   │   ├── projects/      – 4 production projects with filter + dialog
│   │   └── contact/       – form + direct contact cards + FAQ
│   ├── shared/
│   │   ├── resume.data.ts                – single source of truth (CV content)
│   │   ├── resume.service.ts             – opens hosted resume
│   │   ├── theme.service.ts              – dark/light mode (persisted)
│   │   ├── reveal-on-scroll.directive.ts – IntersectionObserver animations
│   │   ├── animate-progress.directive.ts – width animation when in view
│   │   └── count-up.directive.ts         – number counter when in view
│   ├── app.component.ts
│   └── app.routes.ts
├── styles.scss            – design tokens, fluid typography, dark mode
└── index.html             – SEO meta + JSON-LD + skip link
```

## Run locally

```bash
npm install
npm start          # http://localhost:4200
npm run build:prod # production bundle in dist/
```

## Editing content

All resume content lives in **one file**: `src/app/shared/resume.data.ts`. Update profile info, experience, projects,
skills, education, and achievements there — every component pulls from it.

## Deploy

The Angular build outputs to `dist/portfolio-website/`. `baseHref` is set to `/myPortFolio/` in `angular.json`
for GitHub Pages — change it if you host elsewhere.

```bash
npm run build:prod
# upload dist/portfolio-website/ to your host
```

## License

Personal portfolio — no permissive license. Feel free to take inspiration, but please don't reuse the personal content.
