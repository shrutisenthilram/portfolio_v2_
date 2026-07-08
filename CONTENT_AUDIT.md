# Content Honesty Audit — verbatim text, organized by request

No paraphrasing below — everything in quotes/blocks is copy-pasted exactly from
the source files. Organized in the 5 categories you asked for, plus a section
at the top for two things I found while pulling this together that aren't
"content honesty" issues but you should know about before launch.

---

## ⚠️ Found while compiling this (flagging, not fixed)

1. **`AboutPage.tsx` line 892 — broken email.** The bottom-of-page "Say Hello →"
   button still links to `mailto:alex@example.com` (the old placeholder). Every
   other contact link on the site was updated to `senthilramshruti@gmail.com` —
   this one was missed. Recommend fixing before launch regardless of the
   content review below.
2. **`MusicSection.tsx` still says "Currently Listening To"** with a fake
   `1:47 / 4:12` progress bar on a `VinylPlayer` component — same "implies live
   data that isn't real" issue you had me fix on `HeroMusicWidget.tsx` last
   time. I didn't touch it since you only asked about `HeroMusicWidget.tsx`,
   but it's the same category of issue and lives right below it on `/about`.

---

## 1. Bio / About / "who I am" text

### `Hero.tsx` (homepage hero)
> "Hi, I'm Shruti" + rotating role word: **Designer / Engineer / Builder / Problem Solver / Artist**

> "I design and build thoughtful digital products focused on human-centered design."

Badge text: `OPEN TO OPPORTUNITIES` · `Portfolio — 2026` · `MOMENTS — 2025` (photo caption)

### `About.tsx` (homepage About section — separate from the /about page)
> "I'm a double major in CS and Business Econ at UC San Diego, with a focus on human-centered AI and product design. I'm passionate about creating tools that help people think, learn, and collaborate more effectively."

> "Outside of academics, I love running, reading, playing the piano, and drinking iced coffees :)"

Quick facts: Based in **San Francisco, CA** · Availability **Summer 2026** · Focus **Product**

Education listed: BS Computer Science (UC San Diego, 2024–2027) · BS Business Economics (UC San Diego, 2024–2027) · Minor: Design (UC San Diego, 2024–2027)

Interests listed: Human-Computer Interaction · Generative AI & Design Tools · Open Source Software · Web Development

### `AboutPage.tsx` (dedicated /about page)
Hero heading: **"Designer, *engineer,* & curious human."**

> "I care deeply about making tools that help people think, learn, and work more effectively — without getting in the way."

Badge: `OPEN · SUMMER 2026`

Quick facts: Based in **San Francisco, CA** · Availability **Summer 2026** · Focus **CS × Design**

Education (with detail line per entry):
- BS Computer Science — UC San Diego, 2024–2027 — detail: "object oriented programming"
- BS Business Economics — UC San Diego, 2024–2027 — detail: "rady school of management"
- Minor in Design — UC San Diego, 2024–2027 — detail: "Studio courses in interaction design, design systems, and prototyping."

Skills & Tools lists:
- Languages: TypeScript, JavaScript, Python, C / C++, SQL
- Frameworks: React, Next.js, Node.js, PyTorch, Tailwind CSS
- Design: Figma, Framer, Storybook, Motion / GSAP, Prototyping
- Platforms: Vercel, AWS, Supabase, GitHub Actions, Docker

**Values section** (4 statements of philosophy, not factual claims — still your voice, worth reading):
1. "Craft over velocity" — "I'd rather ship one thing beautifully than five things carelessly. The details are the product."
2. "Curiosity as method" — "The best ideas come from asking obvious questions until they become non-obvious answers."
3. "Design is a conversation" — "Every interface is an argument about what matters. I try to make that argument clearly."
4. "Open by default" — "I share work early, write publicly, and contribute to OSS — ideas compound when they're in the open."

**Interests** (note: different list than the homepage About.tsx above — inconsistent, flagging): Human-Computer Interaction · Generative AI & Design Tools · Open Source Software · **Photography & Visual Arts · Urban Cycling · Speculative Fiction**

**"Currently" section** — reads as specific, verifiable personal claims:
- Building: "An AI design-review tool for Figma plugins"
- Reading: "The Design of Everyday Things — Don Norman"
- Learning: "Rust + WebAssembly for interactive graphics"
- Listening to: "Four Tet, Floating Points, Bicep"

Bottom CTA: **"Want to build something *together?*"**

---

## 2. Project descriptions, problem statements, outcomes (all 5 live projects)

The other 4 projects (CSE Research, Develop for Good, CSES TritonSpend, Design
Co Redesign) are marked "Coming Soon" with no case-study text yet — nothing to
audit there.

### Portfolio Design
- description: "Designing and building this portfolio — editorial layout, motion, and a case-study system for selected work."
- overview: "A portfolio built to read like a case study, not a template — with room for process, visuals, and honest project status."
- problem: "Most portfolios optimize for aesthetics over narrative. Recruiters need to understand how you think, not just what you shipped."
- solution: "An editorial case-study shell with modular sections, sticky navigation, and a data-driven project grid that scales as new work ships."
- outcomes: *(empty — none listed)*

### Kin
- description: "A mobile app for adult children managing an aging parent's medications — one calm dashboard built around coordination, not just reminders."
- overview: "Kin is a mobile app for adult children managing an aging parent's medications — often from a distance, often with siblings, and always while running the rest of their life."
- problem: "Caregivers aren't forgetting to care. They're forgetting who last checked. Most tools assume one patient, one caregiver, one schedule."
- solution: "A caregiver-centric home dashboard, family coordination tab, and dignity-first patient companion view — built around visibility and handoffs, not surveillance."
- outcomes (top-level project data): *(empty)*

**Kin has a much deeper, separate case-study document** (`data/case-studies/kin.ts`) with far more specific claims than the summary above. Full verbatim text:

- Tagline: "One calm view for everyone keeping someone well."
- Meta: role "Product Designer" · timeline **"12 weeks · 2026"** · team **"Solo design, with 5 caregivers in research"** · stack "Figma, FigJam, Maze, Notion, Otter" · platform "iOS"
- Overview body: "The idea came to me when I was struggling to take my own medication as a full-time student with two jobs. It made me go down a rabbit hole about medication reminders, and I realized that what felt like a personal struggle was a much bigger problem for family caregivers. They carry the mental burden of making sure their parents or relatives stay on top of medication every day, while also balancing their own lives. It was hard enough for me to remember my own vitamins."
- Problem title: "The mental burden of caregiving is a constant struggle"
- Problem body: "The problem isn't reminding someone to take their pills. That part is the easy part. The hard part is everything around it: tracking what was taken and when, coordinating with siblings, managing refills across pharmacies, and never being sure whether today's doses actually happened. The uncertainty after the reminder is what exhausts caregivers, not the reminder itself.\n\nExisting tools don't fully address this. Medisafe and CareZone are built around a single patient with a single caregiver. They work well when one person is managing their own medication, but they fall apart the moment a family has two parents to manage, a sibling who lives in another city, or a patient who refuses to log their own doses. The category serves people who already have it together. Nobody designs for the families falling apart."
- Pain points: "Multi-patient blindspot" / "Coordination debt" / "Refill chaos" (each with a one-line body — see file for full text)
- Quote: **"I'm not worried about forgetting. I'm worried about not knowing."** — attributed to **"Maya, 38, managing both parents' medications remotely"**
- Context body: "The product bet narrowed to one loop: see today, confirm what's done, hand off what isn't. **Fifty-three million Americans are unpaid caregivers.** By 2030, every Baby Boomer will be over 65. The market is enormous, the timing is loud, and the leading products still assume the patient is the user."
- Constraints: "Trust ceiling," "Push fatigue," "Patient autonomy," "Solo build" (each with a body line)
- Research title: "Six weeks listening before a single screen existed."
- Research methods (verbatim):
  - "5 semi-structured interviews" — "Adult children currently managing an aging parent's medications, 30–45 minutes each."
  - "1-week diary study" — "3 participants logged every medication-related action — including the ones that didn't happen."
  - "Competitive audit" — "Medisafe, CareZone, and Caring Village rated across 8 dimensions including multi-user support and dignity."
  - "30-person survey" — "Current tools, household composition, error frequency, and unmet needs."
- Research insights (4 titled findings — see file for full bodies), e.g. "Refills are the #1 logistical failure point." — "Surfacing refill needs 5+ days early shifted the entire emotional valence of the app."
- Quote: **"This is the first time I've seen something that actually understands what it's like to do this."** — attributed to **"Synthesis from 5 interviews"**
- Ideation: 5 explorations listed as "cut," "kept," or "evolved" (e.g. "Patient-led logging" — cut; "Caregiver dashboard + simplified patient view" — kept)
- Iteration rounds (verbatim):
  - "Round 1 · 3 caregivers" — change: "Single home view, no patient switcher." — result: "Every participant asked 'which mom is this?' within 30 seconds. Added a patient switcher at the top of Home — instant clarity."
  - "Round 2 · 3 caregivers" — change: "Refill alerts rendered in red with a bell icon." — result: "Even low-urgency alerts triggered anxiety. Replaced with a tiered amber → red model. Stress reports dropped, action rates held."
  - "Round 3 · 2 caregivers + 1 patient" — change: "Family lived inside Settings." — result: "Both caregivers missed it for 5+ minutes during testing. Promoted Family to a top-level tab and the entire coordination story clicked."
  - "Round 4 · 2 sibling pairs" — change: "Task handoff used directive language ('You need to refill Mom's Lisinopril')." — result: "Triggered the exact 'I thought you handled it' guilt the app was meant to remove. Reframed as neutral 'handoff notes'..."
- Experiments:
  - Hypothesis: "Caregivers will prefer richer patient data over a calmer view." → Result: **"Rejected. 4 of 5 chose the calmer view in head-to-head tests. Density was read as anxiety."**
  - Hypothesis: "Patients will resist any companion view, regardless of design." → Result: "Partially rejected. With explicit privacy controls and a read-only default, the patient testers willingly opened it daily."
- Final solution body: "The shipped prototype is quieter than the category. That's the point. Trust, in this domain, is built through restraint."
- Outcomes/reflections: "The patient was the harder design problem," "Inventing 'handoff notes' was the unlock," "Calm shipped this." (full bodies in file)
- Next steps: live pharmacy API integration, AI-powered drug interaction warnings, longitudinal health trend views, Android client

### Vote Smart (voting-literacy)
- description: "A mobile-first platform that helps voters understand their ballot, compare candidates, and follow a personalized checklist from registration to election day."
- overview: "Vote Smart helps first-time and busy voters find unbiased information, compare candidates, and complete a personalized voting checklist — without partisan noise or dense official guides."
- problem: "Voters struggle to find neutral, accessible information. Ballot language is intimidating, and most tools ignore the down-ballot races that matter locally."
- solution: "A checklist-led mobile experience with plain-language ballot summaries, candidate comparison, and election calendar support — designed through empathize → define → ideate → prototype → test."
- outcomes: *(empty)*

### Design Frontiers Website
- description: "Marketing and information architecture for Design Frontiers — UCSD's design community org."
- overview: "Design Frontiers needed a site that recruits members, showcases events, and reflects the org's creative energy without feeling like a generic club page."
- problem: "The old site buried key information and didn't scale as the org grew programming and partnerships."
- solution: "A modular page system with clear event hierarchy, accessible typography, and fast paths to join and learn more."
- outcomes: *(empty)*

### Econ Research
- description: "A compact case study on an economics research project — methods, findings, and implications."
- overview: "An applied economics project examining how policy and behavior interact in a real-world dataset."
- problem: "Complex findings need to be communicated clearly to non-specialist audiences without losing rigor."
- solution: "A short-form case study structure focused on question, method, result, and takeaway."
- outcomes: *(empty)*

---

## 3. Experience bullets (`Skills.tsx`)

**Product Intern — LPL Financial (2026 – Present)**
> "Working on LPL's internal advisor platform, helping launch a new failsafe system from scratch under a fast, compressed timeline — partnering cross-functionally to scope and ship a net-new feature with no existing precedent to build from."

**VP of Product — CSES Open Source (period left blank — you didn't give me one)**
> "Set product vision and scope for new open-source projects alongside the VP of Technology and executive board. Ran weekly syncs with a team of PMs to keep each project's roadmap user-centric and technically feasible, acting as the connective layer between engineers, PMs, and non-technical stakeholders."

**Undergraduate Research Assistant — Economics Lab (Jan 2026 – Present)**
> "Built AI-assisted digitization pipelines using LLMs and OCR to support large-scale empirical economics research. Designed Python workflows for document validation and automated QA, systematically identifying LLM failure modes (hallucination, omission, formatting errors), and built gold-standard annotated datasets to benchmark model accuracy and improve extraction reliability."

*(This is the text I merged from the bullet points you gave me last time — since `Skills.tsx`'s data structure only supports one paragraph per role, not a bullet list. If any of the phrasing drifted from what you meant, flag it — I stuck close to your original wording.)*

Also in `Skills.tsx` — "Leadership & Orgs" list (no description text, just titles):
Design Co @ UCSD - Industry Relations Coordinator · CSES OpenSource - VP of Product · ACM @ UCSD - Public Relations Director · Econ Undergraduate Research Assistant · Claude Ambassador · Autodesk Ambassador

---

## 4. Headlines / taglines / one-liners (everywhere)

- Hero H1: **"Hi, I'm Shruti [a/an] [Designer/Engineer/Builder/Problem Solver/Artist]."**
- Hero subhead: "I design and build thoughtful digital products focused on human-centered design."
- AboutPage H1: **"Designer, engineer, & curious human."**
- AboutPage CTA: "Want to build something together?"
- Contact.tsx H2: **"Let's build something together."**
- Contact.tsx subhead: "Open to internship and full-time opportunities, freelance projects, and interesting conversations."
- Footer tagline: "made with iced coffees and a pinch of code"
- Footer copyright: "© 2026 Shruti Senthilram"
- Kin case study tagline: "One calm view for everyone keeping someone well."
- HeroMusicWidget label (just changed): "On Repeat"
- MusicSection heading (not yet changed, see flag above): "Currently Listening To"
- `index.html` meta description (still placeholder, not real copy): "Portfolio — replace with your own description before launch."
- `index.html` title (just changed): "Shruti Senthilram — Portfolio"

---

## 5. 🚩 Every specific number / outcome / achievement claim (highest risk — read this section first)

Pulled from everywhere above, in one place:

| Claim | Where |
|---|---|
| "5 caregivers in research" | Kin meta |
| "12 weeks · 2026" (timeline) | Kin meta |
| "5 semi-structured interviews, 30–45 minutes each" | Kin research methods |
| "1-week diary study... 3 participants" | Kin research methods |
| "Competitive audit... rated across 8 dimensions" | Kin research methods |
| "30-person survey" | Kin research methods |
| "Fifty-three million Americans are unpaid caregivers" | Kin context (this is a commonly-cited stat — verify your source before keeping it stated as fact) |
| "Surfacing refill needs 5+ days early..." | Kin research insight |
| Quote from "Maya, 38, managing both parents' medications remotely" | Kin problem section |
| Quote attributed to "Synthesis from 5 interviews" | Kin research section |
| "Round 1 · 3 caregivers" ... "every participant asked... within 30 seconds" | Kin iteration |
| "Round 2 · 3 caregivers" | Kin iteration |
| "Round 3 · 2 caregivers + 1 patient... missed it for 5+ minutes" | Kin iteration |
| "Round 4 · 2 sibling pairs" | Kin iteration |
| "4 of 5 chose the calmer view in head-to-head tests" | Kin experiments |
| "By 2030, every Baby Boomer will be over 65" | Kin context |
| "Refill alerts arrive 5 days early" | Kin design system |
| Skill levels: TypeScript/JS 95%, React/Next 90%, Python/PyTorch 80%, Systems 70%, SQL/NoSQL 75%, Computer Vision 65%, Figma 95%, Git/GitHub 90%, Vercel/AWS 75%, Framer 80%, Storybook 70%, Notion/Linear 85% | `AboutPage.tsx`/`Skills.tsx` skill bars — these are self-rated percentages, not measured, but presented as precise numbers |

None of your 5 live project summaries (Portfolio Design, Kin's top-level `outcomes`, Vote Smart, Design Frontiers, Econ Research) claim any launch metrics, user counts, or % improvements — those are already clean. **All the numeric risk is concentrated in the detailed Kin case study file** (`data/case-studies/kin.ts`). Since this reads like a real, detailed design-research project (interview counts, testing rounds, a named quote source), my guess is most or all of it is real work you actually did — but every number/quote in that table above is something you should be able to defend verbatim if asked about it in an interview, so it's worth a deliberate pass rather than an assumption.
