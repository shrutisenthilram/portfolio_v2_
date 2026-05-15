import type { CaseStudy } from "../../components/case-study/types";

export const kin: Partial<CaseStudy> = {
  client: "Personal",
  tagline: "One calm view for everyone keeping someone well.",
  hiddenSections: ["strategy"],
  links: [{ label: "Prototype", href: "/kin" }],
  meta: {
    role: "Product Designer",
    timeline: "12 weeks · 2026",
    team: "Solo design, with 5 caregivers in research",
    stack: ["Figma", "FigJam", "Maze", "Notion", "Otter"],
    platform: "iOS",
    // impact: "Your one-line result — shows in the meta row under the hero",
  },
  overview: {
    title:
      "Caregivers don't need another app. They need a place that already knows who last checked.",
    body: "Kin is a mobile app for adult children managing an aging parent's medications — often from a distance, often with siblings, and always while running the rest of their life. It replaces the spreadsheet, the group text, and the pill organizer with one calm dashboard built around coordination, not just reminders. The core problem isn't a missing feature. Every existing tool has features. The problem is that none of them are designed around the caregiver's emotional reality: the low-grade anxiety of not knowing whether today's medications were taken, the coordination debt that builds between siblings, the guilt of living two hours away. Kin treats coordination as the product.",
    // highlights: [{ value: "12", label: "Interviews" }], // optional stats box beside overview body
    // Overview image — first item renders full-width below the text (put file in public/images/kin/)
    media: [
      {
        src: "/images/kin/overview-hero.png",
        alt: "Kin home dashboard showing today's medications across two parents",
        caption:
          "Home — today's medications across both parents, in one calm view.",
      },
    ],
  },
  problem: {
    title:
      "Caregivers aren't forgetting to care. They're forgetting who last checked.",
    body: "Medisafe, CareZone, and the rest assume one patient, one caregiver, one schedule. Real caregiving rarely looks like that. A 38-year-old managing both parents' medications from two hours away — while coordinating with a brother who only helps when asked — has nothing built for her shape of the problem. So she cobbles: a Google Sheet, a notes app, a group text, and a constant background hum of \"did anyone check on Mom this morning?\"",
    painPoints: [
      {
        title: "Multi-patient blindspot",
        body: "Most tools force one patient per account. Caregivers managing two parents juggle logins or give up entirely.",
      },
      {
        title: "Coordination debt",
        body: "Siblings don't always communicate. The result is 'I thought you handled it' — or worse, a double dose.",
      },
      {
        title: "Refill chaos",
        body: "Refills sit across multiple pharmacies on different cycles. The first sign of a gap is usually a missed dose.",
      },
      {
        title: "Dignity gap",
        body: "Patients resent being 'tracked.' Apps that surveil instead of support get uninstalled — by the patient.",
      },
    ],
    quote: {
      text: "I'm not worried about forgetting. I'm worried about not knowing.",
      attribution: "Maya, 38, managing both parents' medications remotely",
    },
  },
  context: {
    title:
      "Why now: a generation is aging into a tool that doesn't exist yet.",
    body: "The product bet narrowed to one loop: see today, confirm what's done, hand off what isn't. Fifty-three million Americans are unpaid caregivers. By 2030, every Baby Boomer will be over 65. The market is enormous, the timing is loud, and the leading products still assume the patient is the user. The constraints below shaped every downstream decision.",
    constraints: [
      {
        label: "Trust ceiling",
        body: "Medication data is high-stakes. A single visible bug — a missed log, a wrong dose — erodes adoption permanently.",
      },
      {
        label: "Push fatigue",
        body: "Over-alerting is worse than under-alerting. Every notification has to earn its place.",
      },
      {
        label: "Patient autonomy",
        body: "If the patient feels surveilled, they refuse to use the companion view, and the system collapses.",
      },
      {
        label: "Solo build",
        body: "One designer, twelve weeks. Every screen had to justify its own existence.",
      },
    ],
    tradeoffs: [
      {
        gave: "Full pharmacy API integration at v1.",
        got: "A manual + photo-scan medication flow that fits a real caregiver's evening on the couch.",
      },
      {
        gave: "A feature-rich patient interface.",
        got: "A dignity-first companion view the patient actually opens.",
      },
      {
        gave: "Android parity at v1.",
        got: "An iOS experience built to the depth the problem demands.",
      },
    ],
  },
  research: {
    title: "Six weeks listening before a single screen existed.",
    body: "I started from the assumption that I didn't understand caregiving — only its symptoms. Interviews were structured to surface emotional texture, not feature requests.",
    methods: [
      {
        label: "5 semi-structured interviews",
        detail:
          "Adult children currently managing an aging parent's medications, 30–45 minutes each.",
      },
      {
        label: "1-week diary study",
        detail:
          "3 participants logged every medication-related action — including the ones that didn't happen.",
      },
      {
        label: "Competitive audit",
        detail:
          "Medisafe, CareZone, and Caring Village rated across 8 dimensions including multi-user support and dignity.",
      },
      {
        label: "30-person survey",
        detail:
          "Current tools, household composition, error frequency, and unmet needs.",
      },
    ],
    insights: [
      {
        title: "Caregivers want to feel in control, not be in control.",
        body: "Total control is exhausting. The job of the app is to lift the cognitive load, not return it as a settings panel.",
      },
      {
        title: "The scariest moment isn't a missed dose. It's not knowing if one was missed.",
        body: "Uncertainty drives more anxiety than failure. Visibility is the product.",
      },
      {
        title: "Coordination is the third user.",
        body: "Every caregiving relationship has a quieter second person. Designing around them — gently — was the unlock.",
      },
      {
        title: "Refills are the #1 logistical failure point.",
        body: "Surfacing refill needs 5+ days early shifted the entire emotional valence of the app.",
      },
    ],
    quote: {
      text: "This is the first time I've seen something that actually understands what it's like to do this.",
      attribution: "Synthesis from 5 interviews",
    },
    media: [
      {
        src: "/images/kin/research-affinity.png",
        alt: "Affinity diagram clustering interview quotes by theme",
        caption:
          "Affinity diagram — 5 interviews clustered into 4 thematic territories.",
      },
      {
        src: "/images/kin/research-journey.png",
        alt: "Journey map of Maya's week of medication management",
        caption:
          "Maya's current week — every tool, every handoff, every silent worry.",
      },
      {
        src: "/images/kin/research-personas.png",
        alt: "Three personas: Maya the primary caregiver, Robert the patient, Derek the sibling",
        caption:
          "Three personas. Each one's needs sit in tension with the others.",
      },
    ],
  },
  architecture: {
    title: "An IA that puts coordination on the front page.",
    body: "Most medication apps lead with a patient profile. Kin leads with today — across every patient, every caregiver, and every pharmacy in one view.",
    layers: [
      {
        label: "Home",
        items: [
          "Today's medications across all patients",
          "Upcoming refills (tiered urgency)",
          "Family activity feed",
        ],
        note: "Caregiver-centric, not patient-centric — the explicit break from Medisafe's model.",
      },
      {
        label: "Patients",
        items: [
          "Patient profile",
          "Medication list",
          "Schedule & history",
          "Health notes",
        ],
        note: "Per-patient depth, accessible from Home but never the first thing a caregiver sees.",
      },
      {
        label: "Family",
        items: [
          "Caregiver roster",
          "Task assignments",
          "Handoff notes",
        ],
        note: "Promoted to a top-level tab. Coordination is the product, not a setting.",
      },
      {
        label: "Pharmacy",
        items: [
          "Linked pharmacies",
          "Refill status",
          "Cost comparison",
        ],
        note: "Separated from medication on purpose: refills are a logistical problem, schedules are a health one.",
      },
    ],
    notes: [
      "Home is a caregiver dashboard, not a patient profile. The single most consequential IA decision in the system.",
      "Family lives at the top level because coordination is the unsolved problem in the category.",
      "Pharmacy is separate from Patients because refills are operations, not health data.",
    ],
    media: [
      {
        src: "/images/kin/ia-sitemap.png",
        alt: "Information architecture diagram of Kin's four top-level tabs",
        caption:
          "Site map — four tabs, three levels of depth, no hidden coordination surface.",
      },
    ],
  },
  ideation: {
    title: "Branches I walked down — and what I cut.",
    explorations: [
      {
        title: "Patient-led logging",
        body: "Patient confirms their own doses; caregiver passively observes. Beautiful in theory, fragile in practice — fails the moment the patient is cognitively impaired or simply forgets.",
        outcome: "cut",
      },
      {
        title: "Caregiver dashboard + simplified patient view",
        body: "Two surfaces, one source of truth. Caregiver gets full visibility; patient gets a calm, autonomy-preserving view of just their day.",
        outcome: "kept",
      },
      {
        title: "Full pharmacy API integration at v1",
        body: "Live refill ordering directly in the app. Genuinely useful, genuinely out of scope for a 12-week prototype.",
        outcome: "cut",
      },
      {
        title: "Air-traffic-control multi-patient view",
        body: "Inspired by ATC dashboards — many moving parts, single screen. Evolved into the Home tab.",
        outcome: "evolved",
      },
      {
        title: "Splitwise-style handoff notes",
        body: "Shared accountability without blame. Borrowed from how Splitwise handles shared expenses — neutral language, transparent history.",
        outcome: "kept",
      },
    ],
    media: [
      {
        src: "/images/kin/ideation-sketches.png",
        alt: "Crazy 8s sketches exploring the home dashboard",
        caption:
          "Crazy 8s for the home dashboard. The sixth one became the foundation.",
      },
    ],
  },
  flows: {
    title: "Four flows everything else supports.",
    flows: [
      {
        title: "First-time caregiver setup",
        steps: [
          {
            label: "Add the first patient",
            body: "Name, relationship, and a photo if the caregiver wants one.",
          },
          {
            label: "Add the first medication",
            body: "Manual entry or photo-scan of the pill bottle label.",
          },
          {
            label: "Invite a family member",
            body: "Optional but encouraged. Sets the coordination loop in motion.",
          },
          {
            label: "Land on Home",
            body: "Today's view, populated with the first medication.",
          },
        ],
      },
      {
        title: "Daily check-in",
        steps: [
          {
            label: "Open the app",
            body: "Lands directly on Home — no extra navigation.",
          },
          {
            label: "See today's doses",
            body: "Across every patient, in chronological order.",
          },
          {
            label: "Confirm a dose",
            body: "Single tap. Microanimation confirms without a modal.",
          },
          {
            label: "See sibling's activity",
            body: "Family feed shows who confirmed what, without comment.",
          },
        ],
      },
      {
        title: "Refill alert + task handoff",
        steps: [
          {
            label: "Receive alert",
            body: "5 days before refill is needed. Muted, not urgent.",
          },
          {
            label: "Open refill detail",
            body: "Pharmacy, prescription, last fill date, suggested action.",
          },
          {
            label: "Assign to sibling",
            body: "One tap. Sibling gets a notification with full context.",
          },
          {
            label: "Sibling completes task",
            body: "Marks done. Caregiver sees the update without needing to ask.",
          },
        ],
      },
      {
        title: "Patient companion view",
        steps: [
          {
            label: "Patient opens app",
            body: "Sees only their own day — no caregiver dashboard, no history.",
          },
          {
            label: "Marks own doses",
            body: "Optional. Patient is never required to log.",
          },
          {
            label: "Family is notified",
            body: "Quietly. No 'great job!' messaging — dignity over gamification.",
          },
        ],
      },
    ],
    edgeCases: [
      "Patient doesn't confirm a dose: caregiver sees a gentle 'unconfirmed' state, not an alarm.",
      "Sibling declines a task: app suggests the next available family member; never publicly flags the decline.",
      "Refill out of stock: pharmacy detail surfaces a fallback action — call the pharmacy, or change the fill location.",
      "Drug-name scan ambiguity: app surfaces top 3 matches and asks the caregiver to confirm before saving.",
    ],
    accessibility: [
      "All touch targets meet WCAG AA at 44×44pt minimum.",
      "Color is never the only signal — every status pairs with an icon and a label.",
      "Dynamic Type supported across all type styles for elderly users who may share the device.",
      "Reduced-motion respected for confirmation animations.",
    ],
    media: [
      {
        src: "/images/kin/flows-setup.png",
        alt: "First-time setup flow diagram with happy path and two edge cases",
        caption:
          "Setup flow — happy path plus two edge cases (no family invited, scan failure).",
      },
      {
        src: "/images/kin/flows-refill.png",
        alt: "Refill alert and handoff flow diagram",
        caption:
          "Refill handoff — the flow that surfaced the new 'handoff note' pattern.",
      },
    ],
  },
  designSystem: {
    title: "Warm, restrained, and built to lower the temperature.",
    body: "Caregiving is anxious work. The system is intentionally calm — generous spacing, muted accents, and a deliberate refusal to use red for anything that isn't a true emergency.",
    principles: [
      {
        title: "Calm over complete.",
        body: "The dashboard surfaces only what's actionable today. Everything else lives one tap away.",
      },
      {
        title: "Coordination without blame.",
        body: "Handoff language is neutral. The system shows what happened, never who failed.",
      },
      {
        title: "Patient dignity first.",
        body: "The patient is never the object of a verb. They are a participant, not a subject.",
      },
      {
        title: "Proactive, not reactive.",
        body: "Refill alerts arrive 5 days early in muted tones, not 24 hours late in red.",
      },
    ],
    accessibilityNotes: [
      "WCAG AA contrast across all body text and status states.",
      "Status is communicated through color, icon, and label — never color alone.",
      "Dynamic Type support throughout the type scale.",
      "Touch targets meet 44×44pt minimum.",
    ],
    media: [
      {
        src: "/images/kin/system-tokens.png",
        alt: "Design tokens: color, typography, and spacing scale",
        caption: "Tokens — color, type, and spacing as a single source of truth.",
      },
      {
        src: "/images/kin/system-components.png",
        alt: "Component library: medication card, refill banner, activity row, and handoff note",
        caption: "Core components, each shown in all interactive states.",
      },
    ],
  },
  iteration: {
    title: "What testing made me change my mind about.",
    rounds: [
      {
        round: "Round 1 · 3 caregivers",
        change: "Single home view, no patient switcher.",
        result:
          "Every participant asked 'which mom is this?' within 30 seconds. Added a patient switcher at the top of Home — instant clarity.",
      },
      {
        round: "Round 2 · 3 caregivers",
        change: "Refill alerts rendered in red with a bell icon.",
        result:
          "Even low-urgency alerts triggered anxiety. Replaced with a tiered amber → red model. Stress reports dropped, action rates held.",
      },
      {
        round: "Round 3 · 2 caregivers + 1 patient",
        change: "Family lived inside Settings.",
        result:
          "Both caregivers missed it for 5+ minutes during testing. Promoted Family to a top-level tab and the entire coordination story clicked.",
      },
      {
        round: "Round 4 · 2 sibling pairs",
        change:
          "Task handoff used directive language ('You need to refill Mom's Lisinopril').",
        result:
          "Triggered the exact 'I thought you handled it' guilt the app was meant to remove. Reframed as neutral 'handoff notes' — the new UI pattern that became the keystone of the system.",
      },
    ],
    experiments: [
      {
        hypothesis:
          "Caregivers will prefer richer patient data over a calmer view.",
        result:
          "Rejected. 4 of 5 chose the calmer view in head-to-head tests. Density was read as anxiety.",
      },
      {
        hypothesis:
          "Patients will resist any companion view, regardless of design.",
        result:
          "Partially rejected. With explicit privacy controls and a read-only default, the patient testers willingly opened it daily.",
      },
    ],
    comparisons: [
      {
        before: "/images/kin/iteration-switcher-before.png",
        after: "/images/kin/iteration-switcher-after.png",
        label: "Patient switcher added at the top of Home",
      },
      {
        before: "/images/kin/iteration-urgency-before.png",
        after: "/images/kin/iteration-urgency-after.png",
        label: "Red alerts replaced with a tiered urgency model",
      },
      {
        before: "/images/kin/iteration-handoff-before.png",
        after: "/images/kin/iteration-handoff-after.png",
        label: "Directive handoff language replaced with neutral notes",
      },
    ],
  },
  finalSolution: {
    title: "A mobile app that lowers the temperature of caregiving.",
    body: "The shipped prototype is quieter than the category. That's the point. Trust, in this domain, is built through restraint.",
    highlights: [
      {
        title: "One calm Home",
        body: "Today's medications across every patient, in one chronological view. Less to see, less to miss.",
      },
      {
        title: "Handoff notes",
        body: "A neutral, no-blame UI pattern for moving tasks between caregivers. New to the category.",
      },
      {
        title: "Patient companion view",
        body: "A dignity-first surface the patient actually opens. Read-only by default, theirs to share.",
      },
      {
        title: "Tiered urgency",
        body: "Amber 5 days early, not red 24 hours late. Refills stop being emergencies.",
      },
    ],
    media: [
      {
        src: "/images/kin/final-home.png",
        alt: "Final home dashboard showing today's medications across two patients",
        caption: "Home — today's view across both parents.",
      },
      {
        src: "/images/kin/final-refill.png",
        alt: "Final refill alert with handoff to sibling",
        caption: "Refill alert with one-tap handoff.",
      },
      {
        src: "/images/kin/final-patient.png",
        alt: "Final patient companion view",
        caption: "Patient companion view — a calm, read-only daily summary.",
      },
      {
        src: "/images/kin/final-family.png",
        alt: "Final family activity feed",
        caption: "Family feed — visibility without surveillance.",
      },
    ],
  },
  outcomes: {
    title: "Reflection & what I'd build next",
    // metrics: [{ value: "84", label: "SUS" }], // big-number row (optional)
    // results: ["Bullet outcomes from research or launch"], // numbered list (optional)
    reflections: [
      {
        title: "The patient was the harder design problem.",
        body: "I expected the caregiver dashboard to be the hard part. The dignity-preserving companion view was where craft mattered most.",
      },
      {
        title: "Inventing 'handoff notes' was the unlock.",
        body: "No competitor had a no-blame coordination pattern. Borrowing the emotional posture from Splitwise and applying it to medication created the most-cited moment in testing.",
      },
      {
        title: "Calm shipped this.",
        body: "Cutting pharmacy APIs, drug interaction warnings, and the doctor portal felt like loss. They were also what allowed the core loop to feel mature.",
      },
    ],
    nextSteps: [
      "Live pharmacy API integration for in-app refill ordering.",
      "AI-powered drug interaction warnings (with caregiver-readable explanations, not clinical jargon).",
      "Longitudinal health trend views to support doctor appointments.",
      "Android client and shared-device handoff for households without per-person phones.",
    ],
  },
};