# Full Site Audit — portfolioV2

Read-only. Nothing in this document has been fixed yet — organized by page, per your request, so you can decide what to act on before we touch anything.

---

## 0. Site map (what actually renders where)

Worth stating up front because it corrects an assumption from earlier work: the homepage does **not** render `Skills`, `CommunitiesSection`, or `MusicSection`. Actual render order is:

- **`/` (Home.tsx):** Hero → Projects (featured grid) → MarqueeTicker → About (short version) → Contact
- **`/about` (AboutPage.tsx):** full bio page, and this is the *only* place `CommunitiesSection` and `MusicSection` render
- **`/projects`:** AllProjects grid/list
- **`/projects/:slug`:** individual case studies
- **`/playground`:** reachable by direct URL, not linked from nav (intentional, per your instruction)
- **`/palette-demo`:** a 24-technique internal design sandbox, reachable by direct URL, not linked from nav
- **`/kin/*` (12 routes) + `KinShowcase.tsx`:** the Kin prototype pages — not audited in depth in this pass (flagging as a gap; say the word if you want it covered next)
- **No 404 route exists.** Any truly invalid URL falls through to React Router's unstyled default error boundary. The only "not found" handling that exists is inside `ProjectDetailPage.tsx` for bad `:slug` values specifically.

---

## 1. Homepage (`/`)

### Images
- Hero: 3 real personal photos (`397CE1FB...jpeg`, `5615C8D8...jpeg`, `9A87034E...jpeg`), all resolve correctly. Two have empty `alt=""` (decorative-photo pattern, arguably should describe the photo since it's a real portrait, not decoration). Filenames are raw camera-roll UUIDs — not a functional bug, just unpolished.
- About (short version): 1 real photo (`/images/5.jpg`), resolves correctly, has a proper `alt="Shruti Senthilram"`.
- No stock/mismatched images on this page.

### Text/content
- Hero sub-line ("I design and build thoughtful digital products focused on human-centered design") and the cycling role "Problem Solver" read as generic/templated phrasing — not wrong, just the most boilerplate-sounding copy on the page.
- **Availability is stated three different ways across the site**: Hero's pulsing "OPEN TO OPPORTUNITIES" badge, About's "Availability: Summer 2026," and Contact's "Open to internship and full-time opportunities, freelance projects, and interesting conversations." Not contradictory, just inconsistent in specificity — a recruiter reading top to bottom might wonder which one is current.
- Homepage About bio line duplicates a phrase used almost verbatim on the About page (see below) — "tools that help people think, learn, and [collaborate/work] more effectively."

### Layout
- Hero's photo collage uses layered absolute-positioned corner photos with negative offsets near a 12-col grid boundary — can't confirm actual overlap without rendering, but it's the one spot in the homepage code with real overlap risk. Worth a visual check on a narrow desktop width.
- Everything else on the homepage (Contact, Footer) uses safe responsive patterns — no other overlap risk found.

### Navigation — one real bug here
- **The Navbar's "Resume" link is dead on the homepage.** It scrolls to `id="resume"`, which only exists in `Skills.tsx` — and `Skills` is commented out of `Home.tsx`. Clicking "Resume" from the homepage nav does nothing.
- "Work" (`id="work"`) is fine — that id does exist, in `Projects.tsx`.
- Footer/Contact GitHub and LinkedIn links don't open in a new tab (no `target="_blank"`), while the About page's Instagram link does — minor inconsistency, not broken.

---

## 2. About page (`/about`)

### Images
- Hero photo (`/images/bbb.jpeg`) resolves correctly but has **empty `alt=""`** despite being a real, meaningful portrait — not decorative, should have descriptive alt text.
- Communities photos (4 real images) all resolve correctly.
- **Music section: every album cover is a generic Unsplash stock photo, not the real album art**, for real named albums (The Weeknd, Malcolm Todd, Beach House). This is the single clearest "this doesn't represent what it's next to" finding in the whole audit — anyone who recognizes the real covers will immediately clock these as fake.

### Text/content
- Education section is inconsistent: the Design minor entry reads as a full, proper sentence ("Studio courses in interaction design, design systems, and prototyping."), while the CS and Business Econ entries are lowercase sentence fragments ("object oriented programming," "rady school of management") — reads like unfinished notes next to a polished one. "Rady" (a proper noun, the business school's name) isn't even capitalized.
- **ACM's community description is just the word "ACM."** It's not empty (so it doesn't get hidden by the empty-state guard), it just renders as a real-looking sentence slot with almost no content — reads as unfinished, more noticeably than an actually-blank field would.
- Bio sentence ("I care deeply about making tools that help people think, learn, and work more effectively — without getting in the way") nearly duplicates the homepage About bio ("tools that help people think, learn, and collaborate more effectively") — same phrase, two different endings, worth reconciling into one line reused consistently or two clearly distinct sentences.
- "Currently listening to: Olivia Rodrigo's new album" — fine today, but "new album" is a phrase that ages; worth dating it or revisiting periodically so it doesn't read stale later.
- Skills list (20 items across 4 categories, including PyTorch, Docker, AWS, Supabase) has no supporting evidence elsewhere on the site (no live experience section, no project tied to ML/infra work) — not necessarily false, but reads as a generic comprehensive checklist rather than demonstrated skills. Worth a gut-check on whether all 20 are ones you'd want to defend in an interview.
- A stale internal TODO comment (top of `AboutPage.tsx`) still references bugs that are already fixed (a dead `href="#"` link, `mailto:alex@example.com`) — harmless since it's just a comment, but worth deleting so it doesn't mislead whoever edits this file next. Related: the repo's existing `CONTENT_AUDIT.md` file also still describes that same already-fixed bug as open — it's stale and should be updated or retired.

### Layout
- Nothing broken found. The fixed-width (220px) album sidebar in MusicSection could feel tight at exactly tablet width but isn't unresponsive.

### Navigation — one real bug here
- **The "Download Resume" button (`/resume.pdf`) 404s.** Confirmed: no `resume.pdf` file exists anywhere in `/public`. This is the same broken link found in `Contact.tsx` and `Skills.tsx` — three places on the site point to a file that was never added.

---

## 3. Projects (`/projects` and `/projects/:slug`)

### Images
- All 5 "Coming Soon" projects and the 3 fully-built live projects (Kin, Vote Smart, Design Frontiers) have real, correctly-cased images on disk — no broken paths.
- Eno has zero real images yet (expected — you said you'd send the wireframe separately). It degrades gracefully to a placeholder rather than a broken-image icon.
- **Vote Smart has 6 orphaned image files** sitting in `public/images/voting-literacy/` (research-affinity, ia-flow, wireframes, style-guide, personas, plus duplicate hero/final images) that are never actually referenced by the code — that project renders as a single full-page Figma export instead, so all that other prepped imagery is unused.
- There's a stray, oddly-named directory in `public/images/` literally titled with all 9 project slugs mashed together with spaces (`cse-research portfolio-design kin voting-literacy...`), containing duplicate thumbnails — looks like a shell command gone wrong at some point. Not referenced by any code, just dead weight in the repo.

### Text/content
- No typos found in any of the 4 live case studies.
- **Kin still carries the specific research claims flagged in the last round** (5 interviews, a 30-person survey, 4 rounds of testing, a quote attributed to "Maya, 38..."). New wrinkle worth flagging: "Maya" is also the name used for a synthesized *persona* elsewhere in the same file — it's not clear from the text whether the quote is from a real interviewee or from the persona construct. Worth clarifying either way.
- Vote Smart's case-study page actually shows **none** of the overview/problem/solution prose you wrote — that page uses the single-Figma-board format, which skips all written sections entirely. The prose only shows up on the project card, not the case study itself. If you want that writing to actually appear on the page, it needs a different case-study format.
- Design Frontiers' case study has no unique writing at all — it inherits the generic fallback template shared with unfinished placeholder projects, so structurally it reads as thin as a "coming soon" page even though it's a real, shipped project.
- Eno's "2-3 minutes" and "unreliable outside Chrome" claims are attributed to unspecified "public reviews" with no source cited — the file does self-disclose this is secondhand evidence (good), but the specific numbers themselves aren't sourced.

### Structure consistency — the big one
You asked for consistent formatting across the 4 live case studies. **That's not currently true.** The four use three different underlying formats:
- Kin: rich, ~9-section modular case study (research, architecture, ideation, flows, iteration, etc.)
- Vote Smart: one single full-page image, no modular sections at all
- Design Frontiers: generic 2-section template (overview + final solution), same template used by empty placeholder projects
- Eno: partial — overview, problem, final solution, one reflection note; no research/process section

Depth ranges from "Vote Smart's real content is invisible on the page" to "Kin has 9 fully custom sections" — this is the most visible structural gap on the site and the one most likely to make a recruiter feel like the case studies aren't a consistent product.

### Status labels — this part checks out clean
All 6 status strings (Coming Soon, Featured, Concept Project, Team Project, Shipped Project, Teardown) are registered in both `STATUS_COLORS` maps with no gaps, all tags have color mappings, and Coming Soon projects are clearly differentiated (grayscale, disabled cursor, different overlay copy, no CTA row) — no fixes needed here.

---

## 4. Playground (`/playground`) and Palette Demo (`/palette-demo`)

- **Playground** is still entirely placeholder: 5 fake blog posts with dead `#` links and fabricated future dates, 6 stock-photo "artwork" pieces with made-up titles. This matches what was flagged before — still true, unchanged. Its nav link stays commented out per your instruction, so a visitor won't stumble into it from navigation, but it's still live at the direct URL.
- **Palette Demo** is a genuine internal design-technique sandbox (24 demos), explicitly self-labeled in its own header as "nothing is committed to the real site — this is a sandbox." It's not linked from nav either, but it is reachable at `/palette-demo` with no gating, and uses a placeholder name ("Alex Chen") in two of its mockups. Worth deciding if this should ship publicly at all, even unlinked.

---

## 5. Global / cross-cutting issues

- **Resume PDF is missing.** Three separate buttons across the site (`Contact.tsx`, `Skills.tsx`, `AboutPage.tsx`) all link to `/resume.pdf`, and the file doesn't exist anywhere in `/public`. This is the single most concrete "this will break for a visitor" finding in the whole audit.
- **`package.json` still says `"name": "@figma/my-make-file"`** — a leftover from the tool this was originally generated in. Purely internal (never visible to a site visitor), but worth renaming for hygiene.
- **`README.md` is essentially empty and generic** — just the literal folder name as the title, install instructions, and a stray orphaned word "git" on its own line that looks like an unfinished edit.
- **No favicon, no `og:image`, no Twitter card tags.** Both favicon and `og:image` are already flagged with TODO comments in `index.html` — still open. Without a favicon, the browser tab shows a generic icon; without `og:image`, any link you share (LinkedIn, Slack, iMessage) will preview with no image.
- **No 404 page.** An invalid URL currently falls through to React Router's default unstyled error screen rather than anything branded.
- Two pre-existing audit docs already live in the repo (`PERSONALIZE.md`, `CONTENT_AUDIT.md`) — both are useful but have drifted slightly stale relative to the current code (e.g., `CONTENT_AUDIT.md` still describes the `alex@example.com` bug as unfixed; it's actually already fixed). Worth retiring or updating one of them once we act on this audit, so there's a single source of truth.

---

## 6. Would a recruiter pause?

Three things stand out as the kind of thing that shifts a portfolio from "polished" to "I think this might be unfinished":

1. **The fake album covers.** This is the one place where something visibly *isn't what it claims to be* — stock photos standing in for real, named albums. If a recruiter has any music familiarity, this is the single most likely thing to be noticed and read as sloppy or dishonest, even though the underlying "here's music I like" concept is harmless.
2. **The broken Resume button.** A recruiter's very next click after landing on a portfolio is often "let me grab the resume." A 404 there is disproportionately damaging relative to how small a fix it is.
3. **The uneven case-study depth.** Kin reads like a fully realized product case study; Vote Smart and Design Frontiers read comparatively thin (in Vote Smart's case, invisible) next to it. Landing on Kin first, then Design Frontiers second, would read as "the portfolio has one great case study and a few placeholder-feeling ones," even though Design Frontiers is real, shipped work.

Everything else — stale TODO comments, generic `package.json` name, orphaned image files, missing favicon — is real but lower-stakes: cleanup and polish rather than things that would make someone doubt the content is genuine.

---

*Nothing above has been changed. Tell me which of these you want tackled, in what order, and I'll work through them.*
