import type { CaseStudy } from "../../components/case-study/types";
export const kin: Partial<CaseStudy> = {
  client: "Personal",
  tagline: "One calm view for everyone keeping someone well.",
  links: [{ label: "Prototype", href: "/kin" }],
  meta: {
    role: "Product Designer",
    timeline: "12 weeks · 2026",
    team: "Solo",
    stack: ["Figma", "FigJam", "Notion", "React"],
    platform: "iOS",
    // impact: "Your one-line result — shows in the meta row under the hero",
  },
  overview: {
    title:
      "Kin: a mobile app for adult children managing an aging parent's medications",
    body: "The idea came to me when I was struggling to take my own medication as a full-time student with two jobs. It made me go down a rabbit hole about medication reminders, and I realized that what felt like a personal struggle was a much bigger problem for family caregivers. They carry the mental burden of making sure their parents or relatives stay on top of medication every day, while also balancing their own lives. It was hard enough for me to remember my own vitamins.",
    // highlights: [{ value: "12", label: "Interviews" }], // optional stats box beside overview body
    media: [
      {
        src: "/images/kin/overview-hero.png",
        alt: "Kin home dashboard and medication detail screens",
        caption: "Home and medication detail, from the Kin prototype.",
      },
    ],
  },
  problem: {
    title:
      "The mental burden of caregiving is a constant struggle",
    body: "The problem isn't reminding someone to take their pills. That part is the easy part. The hard part is everything around it: tracking what was taken and when, coordinating with siblings, managing refills across pharmacies, and never being sure whether today's doses actually happened. The uncertainty after the reminder is what exhausts caregivers, not the reminder itself.\n\nExisting tools don't fully address this. Medisafe and CareZone are built around a single patient with a single caregiver. They work well when one person is managing their own medication, but they fall apart the moment a family has two parents to manage, a sibling who lives in another city, or a patient who refuses to log their own doses. The category serves people who already have it together. Nobody designs for the families falling apart.",
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

    ],
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
    title: "Where the problem came from, and what I still need to learn.",
    body: "Kin began as a personal frustration and a review of existing tools. I haven't yet run primary research with caregivers, so the points below are working hypotheses drawn from my own experience, a review of existing apps, and published caregiver statistics. Testing them with real caregivers is the next step.",
    methods: [
      {
        label: "Personal experience",
        detail:
          "Struggling to stay on top of my own medication as a full-time student with two jobs.",
      },
      {
        label: "Competitive review",
        detail:
          "Medisafe, CareZone, and Caring Village, reviewed for multi-user support and how each treats the patient.",
      },
      {
        label: "Published statistics",
        detail:
          "Caregiver and aging-population figures, cited in the context above.",
      },
      {
        label: "Planned: caregiver interviews",
        detail: "Not yet run. These will test the hypotheses below.",
      },
      {
        label: "Planned: usability testing",
        detail:
          "Not yet run. The prototype's four core flows will be tested with caregivers.",
      },
    ],
    insightsLabel: "Working Hypotheses",
    insights: [
      {
        title: "Hypothesis: caregivers want to feel in control, not be in control.",
        body: "Total control is exhausting. The job of the app is to lift the cognitive load, not return it as a settings panel.",
      },
      {
        title: "Hypothesis: the scariest moment is not knowing if a dose was missed.",
        body: "Uncertainty may drive more anxiety than failure itself. If so, visibility is the product.",
      },
      {
        title: "Hypothesis: coordination is the third user.",
        body: "Every caregiving relationship has a quieter second person. Designing around them, gently, may be the unlock.",
      },
      {
        title: "Hypothesis: refills are the biggest logistical failure point.",
        body: "Surfacing refill needs 5+ days early could change the emotional tone of the whole app.",
      },
    ],
  },
  strategy: {
    title: "Who it's for, and what v1 includes.",
    body: "Kin's bet is to design for the caregiver first and make coordination visible. These are the scope decisions that follow from it.",
    targetUsers: [
      {
        label: "Primary: the caregiver",
        detail:
          "Adult children, often long-distance and splitting the work with siblings, managing an aging parent's medications.",
      },
      {
        label: "Secondary: the patient",
        detail:
          "Gets a dignity-first companion view: read-only by default and never required to log doses.",
      },
      {
        label: "Tertiary: siblings and co-caregivers",
        detail: "Need shared visibility and a no-blame way to hand off tasks.",
      },
    ],
    goals: [
      "Lift the cognitive load of caregiving instead of returning it as settings.",
      "Make it obvious what was done today, and by whom.",
      "Move tasks between caregivers without blame.",
      "Surface refills early, in calm tones.",
    ],
    mvp: {
      included: [
        "Home dashboard across every patient",
        "Handoff notes between caregivers",
        "Patient companion view",
        "Tiered urgency for refill alerts",
        "Manual and photo-scan medication entry",
      ],
      excluded: [
        "Full pharmacy API integration",
        "A feature-rich patient interface",
        "Android parity",
      ],
    },
    // metrics: intentionally omitted until target success metrics are defined.
    risks: [
      {
        label: "Not yet validated with users",
        body: "The problem and the hypotheses are untested with real caregivers. Interviews and usability testing come next.",
      },
      {
        label: "Trust",
        body: "Medication data is high-stakes. A single visible bug could erode adoption permanently.",
      },
      {
        label: "Patient pushback",
        body: "If the patient feels surveilled, they may refuse the companion view and the coordination loop weakens.",
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
  },
  // Iteration & testing is intentionally omitted until real usability tests are run.
  finalSolution: {
    title: "A mobile app that lowers the temperature of caregiving.",
    body: "The prototype is quieter than the category. That's the point. Trust, in this domain, is built through restraint.",
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
        alt: "Kin home dashboard with today's progress, family on duty, and the day's schedule",
        caption: "Home: today's progress, who's on duty, and the day's schedule.",
      },
      {
        src: "/images/kin/final-refill.png",
        alt: "Kin refill board with color-coded supply bars and the refill request flow",
        caption: "Refills: calm, tiered urgency and a two-step request flow.",
      },
      {
        src: "/images/kin/final-patient.png",
        alt: "Kin patient companion view and medication reminder screen",
        caption: "Patient companion view: a calm daily list and a gentle reminder.",
      },
      {
        src: "/images/kin/final-family.png",
        alt: "Kin family activity feed and member detail with permissions",
        caption: "Family feed: visibility without surveillance.",
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
        body: "None of the apps I reviewed has a no-blame coordination pattern. I borrowed the emotional posture from Splitwise and applied it to medication. Testing it with real caregivers is the next step.",
      },
      {
        title: "Restraint shaped this.",
        body: "Cutting pharmacy APIs, drug interaction warnings, and the doctor portal felt like loss. They were also what allowed the core loop to feel mature.",
      },
    ],
    nextSteps: [
      "Interview caregivers to validate the hypotheses above.",
      "Usability-test the prototype's four core flows with caregivers.",
      "Live pharmacy API integration for in-app refill ordering.",
      "AI-powered drug interaction warnings (with caregiver-readable explanations, not clinical jargon).",
      "Longitudinal health trend views to support doctor appointments.",
      "Android client and shared-device handoff for households without per-person phones.",
    ],
  },
};