# Shruti Senthilram — Portfolio

Personal portfolio site: product management and software projects, experience, and background.

**Stack:** React 18, TypeScript, Vite, Tailwind CSS v4, React Router, Motion.

## Run it locally

```bash
npm ci
npm run dev
```

Build for production with `npm run build` (output goes to `dist/`, which is not committed).

## Editing projects (the local admin)

Most projects are plain JSON files in `src/content/projects/`, edited through a
form instead of by hand.

1. Run `npm run dev` and open **http://localhost:5173/admin**.
2. Pick a project (or create one), edit any field, and click **Save changes**.
   You can upload card images, screenshots, and PDFs (like a research poster).
3. Use **Preview page** to see the generated card and page.
4. When it's ready, change **Status** from Draft to Published, then commit and push.

How it works:

- **Draft projects** are visible only while running locally (with a DRAFT badge). They are
  removed from the production build, so unfinished work never ships.
- **Empty fields are hidden.** A section appears on the page only when it has content.
- **The admin is local only.** It exists in the dev server, not in the production build, so
  there is nothing to log into on the live site. Every edit is a file change in git, so
  you get history and can roll anything back.
- Kin, Vote Smart, and Design Frontiers use hand-built case studies and are edited in code
  (`src/app/data/`).

## The Playground

`/playground` holds a garden you can plant flowers in, plus experiments, short notes and a
"currently into" list. Those items are JSON files in `src/content/playground/`, edited the same
way as projects: run `npm run dev` and open **http://localhost:5173/admin/playground**. Drafts
show only locally; a section with nothing published stays hidden on the live site.

## Where things live

| What | Where |
| --- | --- |
| Links, headline, availability, resume URL | `src/app/data/site.ts` |
| Projects (cards and pages), edited in `/admin` | `src/content/projects/*.json` |
| Playground items, edited in `/admin/playground` | `src/content/playground/*.json` |
| Hand-built projects (Kin, Vote Smart, Design Frontiers) | `src/app/data/projects.ts` |
| Full case studies | `src/app/data/case-studies/` |
| PRD overview pages | `src/app/data/prds/` |
| Homepage sections | `src/app/components/` (Hero, Projects, Experience, About, Contact) |
| Kin interactive prototype | `src/app/kin/` (served at `/kin`) |
| Colors and theme tokens | `src/styles/theme.css` |


## Deploying

Deployed on Vercel (Vite preset). `vercel.json` rewrites every route to `index.html` so deep links work.
