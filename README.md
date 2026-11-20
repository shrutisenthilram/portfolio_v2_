# Shruti Senthilram — Portfolio

Personal portfolio site: product management and software projects, experience, and background.

**Stack:** React 18, TypeScript, Vite, Tailwind CSS v4, React Router, Motion.

## Run it locally

```bash
npm ci
npm run dev
```

Build for production with `npm run build` (output goes to `dist/`, which is not committed).

## Where things live

| What | Where |
| --- | --- |
| Links, headline, availability, resume URL | `src/app/data/site.ts` |
| Project list and card text | `src/app/data/projects.ts` |
| Full case studies | `src/app/data/case-studies/` |
| PRD overview pages | `src/app/data/prds/` |
| Homepage sections | `src/app/components/` (Hero, Projects, Experience, About, Contact) |
| Kin interactive prototype | `src/app/kin/` (served at `/kin`) |
| Colors and theme tokens | `src/styles/theme.css` |

A project with `comingSoon: true` in `projects.ts` is hidden from the public site until it's ready.

## Deploying

Deployed on Vercel (Vite preset). `vercel.json` rewrites every route to `index.html` so deep links work.
