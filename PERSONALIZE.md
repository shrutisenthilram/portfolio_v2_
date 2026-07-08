# Pre-launch checklist — portfolioV2

Updated after tonight's full audit. Format: technical fixes are done; content
items need you.

## ✅ Fixed tonight — images

All broken-image reports checked out. Root cause was the `Hero.tsx` blank-page
bug from earlier (broken `@/images/...` imports) — once fixed, every other
image path was verified correct. Ran a byte-for-byte, case-sensitive check of
every image reference in Hero, Projects, About, and Communities against the
actual files in `/public/images` (this matters because Mac's filesystem is
case-insensitive, so a mismatch could work locally and 404 on Vercel). Result:
zero mismatches, zero missing files, zero `/src/` vs `/public/` mix-ups. Nothing
left to fix here.

## ✅ Fixed tonight — technical issues

- `Contact.tsx` / `Footer.tsx`: GitHub and LinkedIn buttons displayed your real
  URLs as text but linked to `#` — wired the hrefs to match
  (`github.com/shrutisenthilram`, `linkedin.com/in/shrutisenthilram`)
- `Footer.tsx`: removed a third social link with no label and no destination
  (dead, invisible link)
- `Hero.tsx`: removed a ~30-line commented-out dead code block (old portrait
  layout with leftover "yay" placeholder text) and an empty scroll-indicator
  element that rendered nothing
- `Skills.tsx`: the "Experience" section header + timeline was rendering with
  zero entries (empty array), which looked like a broken half-loaded section —
  now hidden automatically until you add entries
- `CommunitiesSection.tsx`: the empty "Design Co @ UCSD" description no longer
  renders a blank paragraph; the Instagram icon now links to the real handle
  when one exists (ACM's now points to `instagram.com/acm_ucsd`) and hides
  itself when the handle is just a placeholder `"@"`
- `AboutPage.tsx`: the "Website" quick-fact row was showing a label with no
  value — hidden until you add a URL
- Deleted `src/app/pages/CaseStudy.tsx` — confirmed dead code, not used by any
  route (superseded by `ProjectDetailPage.tsx` + `CaseStudyShell.tsx`)

## ✅ Fixed in this round

- **Resume PDF** — `Contact.tsx`, `Skills.tsx`, `AboutPage.tsx` all now link to
  `/resume.pdf`. Make sure the file actually exists at `public/resume.pdf`
  before you deploy, or all three will 404.
- **`AboutPage.tsx` empty paragraph** — deleted.
- **`HeroMusicWidget.tsx`** — simplified to a static display. Removed the
  play/pause button, the `<audio>` element, and all "Now Playing"/"Currently
  Spinning" language. It now always shows "On Repeat" with the hardcoded
  title/artist, and the vinyl just spins at a constant ambient rate (no longer
  tied to a fake play state).
- **`index.html` title** → "Shruti Senthilram — Portfolio" (og:title updated to match).
- **`Skills.tsx` Experience section** — added your 3 entries (LPL Financial,
  CSES Open Source, Economics Lab) and un-hid the section automatically since
  it's no longer empty.
- Bonus fix: the "See all →" link under the music widget pointed to `#music`,
  but no element on the page had `id="music"` — added that id to
  `MusicSection.tsx` so the link actually scrolls there now.

## ✅ Fixed — projects section finalized

- **New project added:** "Product Teardown: Capital One Eno — Virtual Card
  Checkout" (`eno-checkout-teardown`) — your exact title/description/overview
  /problem/solution copy, plus a "Methodology note" reflection in the outcomes
  section with your honesty note verbatim. Status badge: "Teardown."
- **Status labels rewritten** for all 4 live case studies so a recruiter can
  tell what they're looking at at a glance: Kin → "Concept Project," Vote
  Smart → "Team Project" (matches its `meta.team: "3 designers"`), Design
  Frontiers Website → "Shipped Project," Eno → "Teardown." Updated the
  `STATUS_COLORS` maps in both `ProjectCard.tsx` and `AllProjects.tsx` to
  match (they'd drifted out of sync with each other before this).
- **Econ Research → Coming Soon.** Set `comingSoon: true` and status to
  "Coming Soon," joining CSE Research, Develop for Good, CSES TritonSpend, and
  Design Co Redesign — 5 total. I left its existing overview/problem/solution
  text in the data file rather than deleting it (it's inert while
  `comingSoon` is true and costs nothing to keep in case you flip it back
  later) — say the word if you'd rather I strip it for a clean slate.
- **Broken-image resilience:** swapped every project/case-study `<img>` (grid
  cards, list view, case study hero, and all in-page media) over to the
  existing `ImageWithFallback` component. Previously a missing file rendered
  a broken-image icon; now it renders a neutral placeholder. This matters
  immediately for Eno, which has no image assets yet.

### Still needs your input

1. **Kin's research numbers — please re-confirm.** You asked me to
   specifically re-check `kin.ts` for fabricated claims. I re-read the whole
   file: it still states 5 semi-structured interviews, a 1-week diary study
   with 3 participants, a 30-person survey, 4 rounds of usability testing, and
   a named quote from "Maya, 38, managing both parents' medications remotely."
   I have no way to independently verify whether this level of research
   actually happened for a solo/personal project — I haven't touched any of
   it, but flagging it as the single highest-risk unconfirmed item before you
   publish this site. If it's real, you're done. If it's illustrative/aspirational,
   it needs a rewrite or an explicit "hypothetical research plan" framing.
2. **Eno wireframe images.** You mentioned providing the 3-screen wireframe
   separately. `eno-checkout-teardown.ts` is wired to look for
   `/images/eno-checkout-teardown/{overview-hero,final-1,final-2,final-3}.png`
   — drop files with those exact names in that folder and they'll appear with
   no code changes. Until then, `ImageWithFallback` shows a clean placeholder
   instead of a broken image.
3. **Eno isn't in the homepage's 4 featured slots.** The homepage only shows
   4 featured projects, and that slot was already full (Portfolio Design,
   Kin, Vote Smart, Design Frontiers). I added Eno as fully live and browsable
   from `/projects` and via direct link, but left `featured` unset rather than
   silently bumping one of your current 4 off the homepage. Tell me if you
   want Eno swapped in (and which project it should replace) or if `/projects`-only
   is fine.
4. **CSES Open Source — missing timeframe.** You gave a role and bullets but no
   dates for "VP of Product — CSES Open Source." I added the entry with
   `period: ""` (marked with a TODO comment in `Skills.tsx`) so it doesn't show
   a made-up date — send me the real period and I'll fill it in.
5. **Music widget cover image.** Title/artist are hardcoded ("Hurry Up
   Tomorrow" — The Weeknd, matching what's already in `MusicSection.tsx`), but
   there's still no cover image. Send me the image (or a path if you've already
   added it to `/public`) and I'll wire it into `HeroMusicWidget.tsx`.
6. **`HeroMusicWidget.tsx` isn't rendered anywhere.** I searched the whole
   codebase — this component isn't imported by any page or by `Hero.tsx`
   despite the name. It's fully built now but invisible to visitors. Want it
   added to the Hero section, somewhere else, or left unused for now?
7. **GitHub/LinkedIn — double-check the usernames**
   (`github.com/shrutisenthilram`, `linkedin.com/in/shrutisenthilram`) are correct/live.
8. **`AboutPage.tsx` "Website" quick-fact** — still hidden (blank value). Send
   a URL if you want it back.
9. **`CommunitiesSection.tsx` — "Design Co @ UCSD"** — still has no description
   and its Instagram handle is just `"@"` (icon hidden). Send real text/handle to restore.
10. **`PlaygroundPage.tsx` is entirely placeholder** — 5 fake blog posts with
    dead links, 6 stock Unsplash "artwork" pieces with made-up titles. Its nav
    link stays commented out per your instruction, so it's not reachable by
    visitors — but if you ever link it, it needs real content first.
11. **`Navbar.tsx` Playground link + `navbar-shake` keyframe** — left as-is per
    your instruction.
12. **`projects.ts` — 5 projects marked `comingSoon: true`** (CSE Research,
    Develop for Good, CSES TritonSpend, Design Co Redesign, Econ Research) —
    flip `comingSoon: false` on each when ready.
13. **6 projects have empty `outcomes`/`secondaryImages`/`github` fields**
    (Portfolio Design, Kin, Vote Smart, Design Frontiers Website, Econ
    Research, Eno) — renders fine empty, just flag in case you meant to add more.
14. **`KinShowcase.tsx`** exists but isn't linked from any route — confirm
    intentional or wire it up.
15. **`index.html`** still has no favicon and no `og:image` — cosmetic but
    worth adding before sharing the link publicly.

## Deployment (Vercel)

- [x] `vercel.json` in place for SPA routing (all routes, including `/kin/*`)
- [x] `dist` and `.env` in `.gitignore`
- [ ] Push to GitHub, import into Vercel (framework preset: Vite)
- [ ] After deploying, hit every route directly by URL to confirm no 404s:
      `/`, `/about`, `/projects`, `/projects/:slug`, `/playground`,
      `/palette-demo`, and all of `/kin/*`
