// ─────────────────────────────────────────────────────────────────────────────
// types.ts
// The complete TypeScript schema for the case study system.
// Every key here corresponds to a section rendered on the /projects/:slug page.
//
// HOW IT FLOWS:
//   1. You fill in data in src/app/data/caseStudies.ts using these types.
//   2. getCaseStudy() merges that data with fallbacks from projects.ts.
//   3. ProjectDetailPage passes the merged CaseStudy to CaseStudyShell.
//   4. CaseStudyShell checks which keys are present and renders only those sections.
//
// IMPORTANT:
//   Every section key beyond `meta` is OPTIONAL (marked with ?).
//   If you don't provide a key, that section simply won't appear on the page.
//   You never need to explicitly "turn off" a section.
// ─────────────────────────────────────────────────────────────────────────────

// Media — a single image or video used in galleries, hero, final solution, etc.
export type Media = {
  src: string;       // URL to the image/video. Can be remote (https://...) or local (/images/...)
  caption?: string;  // Optional text shown below the image
  alt?: string;      // Screen-reader description of the image (for accessibility)
  aspect?: string;   // CSS aspect-ratio string (e.g. "16/9", "4/3", "1/1").
                     // Overrides the default aspect ratio chosen by LazyImage/MediaGallery.
};

// Highlight — a single stat or key result, displayed as a large number with a label.
// Used in: overview.highlights, strategy.metrics, outcomes.metrics
// Example: { value: "60%", label: "Reduction in synthesis time" }
export type Highlight = { value: string; label: string };

// ─────────────────────────────────────────────────────────────────────────────
// CaseStudy — the full schema for a single project's case study page.
// Fill this in via caseStudies.ts (keyed by project slug).
// ─────────────────────────────────────────────────────────────────────────────

/** Section keys that can be omitted from the scroll story via `hiddenSections`. */
export type CaseStudySectionKey =
  | "overview"
  | "problem"
  | "context"
  | "research"
  | "strategy"
  | "architecture"
  | "ideation"
  | "flows"
  | "designSystem"
  | "iteration"
  | "finalSolution"
  | "outcomes";

export type CaseStudy = {
  slug: string; // must match the project's slug in projects.ts

  /** If set, these sections are not rendered even when data is present (Kin uses this to trim the arc). */
  hiddenSections?: CaseStudySectionKey[];

  // ── Hero (required) ─────────────────────────────────────────────────────────
  // These populate the full-bleed hero image and text overlay at the top of the page.

  client?: string;     // Optional client/company name shown as a small pill in the hero.
                       // Example: "Google", "Personal", "YC Startup"
  title: string;       // Large heading in the hero. Usually the project name.
  subtitle: string;    // Shown in the sidebar and footer nav under the title.
  tagline?: string;    // If set, used as the hero subtitle instead of `subtitle`.
                       // Use for a punchier one-liner than the subtitle.
  year: string;        // Year badge shown in the hero (e.g. "2026")
  status: string;      // Status badge in the hero (e.g. "Featured", "Case Study", "Live")
  heroImage: string;   // Full-bleed background image URL. Can be remote or local (/images/...).
  heroVideo?: string;  // Optional video URL. If set, plays instead of heroImage as a looping bg video.
  links?: { label: string; href: string }[]; // Buttons shown in the meta row (e.g. Source, Live).
                       // Auto-populated from project.github and project.live if not set here.

  // ── Meta row (required) ──────────────────────────────────────────────────────
  // The strip of key–value pairs shown directly below the hero.
  // To remove a field from display, delete its <MetaPair> in CaseStudyShell.tsx MetaRow.

  meta: {
    role: string;      // Your role on the project (e.g. "Product Designer & Engineer")
    timeline: string;  // Duration and year (e.g. "12 weeks · 2026")
    team: string;      // Team description (e.g. "Solo design + eng, 2 ML advisors")
    stack: string[];   // Array of tech names. First 4 are shown, rest collapsed to "+N more".
    platform?: string; // Optional — only shown if set (e.g. "Web", "iOS", "Cross-platform")
    impact?: string;   // Optional one-liner in meta row (omit if not deployed / no metric yet)
  };

  // ── 01 Overview ─────────────────────────────────────────────────────────────
  // The project summary and key stats shown first after the meta row.

  overview?: {
    eyebrow?: string;       // Tiny uppercase line above the title. Defaults to nothing if omitted.
    title?: string;         // Large editorial heading (e.g. "Managing a family member's medication...")
    body: string;           // Main body paragraph — the project summary.
    highlights?: Highlight[]; // Stats box on the right side (e.g. [{ value: "320+", label: "Waitlist" }])
                            // Leave empty/omit to hide the stats box.
    media?: Media[];
  };

  // ── 02 Problem ───────────────────────────────────────────────────────────────
  // Frames the user pain or market gap the project addresses.

  problem?: {
    eyebrow?: string;
    title?: string;
    body: string;                               // Main problem description (shown as lede)
    painPoints?: { title: string; body: string }[]; // Callout cards for specific pain points
    quote?: { text: string; attribution?: string }; // Pull quote from a user or research
  };

  // ── 03 Context & Constraints ─────────────────────────────────────────────────
  // Documents the conditions, limits, and tradeoffs that shaped the work.

  context?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    constraints: { label: string; body: string }[]; // Required — key/value pairs of constraints
    tradeoffs?: { gave: string; got: string }[];     // Optional — "We gave up X to gain Y" cards
  };

  // ── 04 Research ──────────────────────────────────────────────────────────────
  // Research methods used and insights synthesized from them.

  research?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    methods?: { label: string; detail: string }[];   // Numbered list of research methods used
    insights?: { title: string; body: string }[];    // Callout cards for key findings
    quote?: { text: string; attribution?: string };  // Standout research quote
    media?: Media[]; // Images: affinity maps, journey maps, screenshots of research sessions
  };

  // ── 05 Product Strategy ──────────────────────────────────────────────────────
  // The "why this, not that" decisions: users, goals, MVP scope, success metrics.

  strategy?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    targetUsers?: { label: string; detail: string }[]; // Who the product is for
    goals?: string[];                                  // Product goals as a bullet list
    mvp?: { included: string[]; excluded: string[] };  // "In Scope / Explicitly Out" split panel
    metrics?: Highlight[];                             // Success metrics as big-number stats
    risks?: { label: string; body: string }[];         // Risks and assumptions
  };

  // ── 06 System Design / Technical Architecture ────────────────────────────────
  // How the system was built — layers, tech choices, data flow.

  architecture?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    layers: { label: string; items: string[]; note?: string }[]; // Required — each layer of the stack
                                                                  // label: layer name (e.g. "Frontend")
                                                                  // items: tech chips (e.g. ["React", "Tailwind"])
                                                                  // note: optional explanation
    notes?: string[];  // Short engineering notes shown as paragraphs below the diagram
    media?: Media[];   // Architecture diagram images, data flow charts, etc.
  };

  // ── 07 Ideation & Exploration ────────────────────────────────────────────────
  // Design directions explored before settling on the final approach.

  ideation?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    explorations?: {
      title: string;
      body: string;
      outcome?: "kept" | "evolved" | "cut"; // Badge shown on the card:
                                            // "kept" → "Shipped" (accent blue)
                                            // "evolved" → "Evolved" (teal)
                                            // "cut" → "Cut" (muted gray)
    }[];
    media?: Media[]; // Sketches, wireframes, early prototypes
  };

  // ── 08 Core Flows ────────────────────────────────────────────────────────────
  // The key user journeys shown as step-by-step diagrams.

  flows?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    flows: { title: string; steps: { label: string; body: string }[] }[];
    // Each flow: a named sequence of steps shown in a horizontal diagram.
    // steps: array of { label (step name), body (step description) }
    edgeCases?: string[];    // Bullet list of edge cases that were designed for
    accessibility?: string[]; // Bullet list of accessibility decisions made
    media?: Media[];
  };

  // ── 09 Design System ─────────────────────────────────────────────────────────
  // The visual language and component system that underpins the product.

  designSystem?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    principles?: { title: string; body: string }[]; // Design principles as callout cards
    tokens?: { label: string; value: string; sample?: string }[];
    // tokens: design tokens displayed in a grid.
    //   label: token name (e.g. "Primary", "Body/Sm")
    //   value: the value (e.g. "#4338CA", "14px / 1.5")
    //   sample: CSS color string — if set, a color swatch square is shown (e.g. "#4338CA")
    components?: string[];          // Component names as chips (e.g. ["Button", "Modal"])
    accessibilityNotes?: string[];  // Bullet list of accessibility decisions
    media?: Media[];
  };

  // ── 10 Iteration & Testing ───────────────────────────────────────────────────
  // What changed between design rounds and what the data showed.

  iteration?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    rounds?: { round: string; change: string; result: string }[];
    // rounds: table of design iteration rounds.
    //   round:  round name (e.g. "Round 1", "Beta launch")
    //   change: what was changed in that round
    //   result: what the outcome/measurement was
    experiments?: { hypothesis: string; result: string }[]; // Hypothesis + result pairs
    comparisons?: { before: string; after: string; label: string }[];
    // comparisons: side-by-side "Before / After" image pairs.
    //   before: image URL for the "before" state
    //   after:  image URL for the "after" state
    //   label:  caption shown below both images
    media?: Media[];
  };

  // ── 11 Final Solution ────────────────────────────────────────────────────────
  // The polished "what we shipped" section — lead with visuals, support with callouts.

  finalSolution?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    highlights?: { title: string; body: string }[]; // Feature/decision callout cards
    media?: Media[]; // Images of the final product.
                     // First image is shown large as a hero, rest go in a gallery grid.
                     // Add real screenshots/mockups here!
  };

  // ── 12 Outcomes & Reflection ─────────────────────────────────────────────────
  // The closing section — results, learnings, and what comes next.

  outcomes?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    results?: string[];             // Numbered list of outcome statements
    metrics?: Highlight[];          // Big-number stats (same format as overview.highlights)
    reflections?: { title: string; body: string }[]; // Personal learnings as callout cards
    nextSteps?: string[];           // Bullet list of "if I had more time" ideas
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// SectionDef — internal type used by the sidebar and scroll-spy system.
// You don't need to create these manually — they're derived from the CaseStudy
// data automatically inside CaseStudyShell.tsx.
// ─────────────────────────────────────────────────────────────────────────────

export type SectionDef = {
  id: string;          // DOM id used for scroll anchoring (e.g. "overview")
  number: string;      // Display number (e.g. "01")
  label: string;       // Full section name (e.g. "Context & Constraints")
  shortLabel?: string; // Shorter label for the mobile pill nav (e.g. "Context")
};
