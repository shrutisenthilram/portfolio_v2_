// The shape of one project file in src/content/projects/<slug>.json.
// Every field except the basics is optional: a section only appears on the
// page when it has content, so a half-finished project never shows blanks.
//
// You normally never edit these files by hand. Run `npm run dev`, open
// http://localhost:5173/admin, and edit everything there.

export type ProjectKind =
  | "product" // a product you designed and/or built
  | "teardown" // an independent critique of someone else's product
  | "research" // research or ML work
  | "engineering" // a software project where the build is the point
  | "leadership"; // a role where leading people or a roadmap is the point

export type ProjectStatus = "draft" | "published";

export type ProjectLink = { label: string; href: string };
export type ProjectMetric = { value: string; label: string };
export type ProjectDecision = { title: string; body: string; outcome?: string };
export type ProjectMedia = { src: string; caption?: string; alt?: string };

export type ContentProject = {
  // ── Basics (shown on the card) ──────────────────────────────────────────
  slug: string; // the URL: /projects/<slug>. Do not change after publishing.
  status: ProjectStatus; // draft = hidden on the live site, visible locally
  featured?: boolean; // show on the homepage
  order?: number; // lower numbers appear first
  kind: ProjectKind;
  title: string;
  subtitle: string;
  summary: string; // the short text on the project card
  tags: string[];
  year: string;
  role: string;
  image?: string; // card image, e.g. /uploads/<slug>/card.png

  // ── "At a glance" strip at the top of the page ──────────────────────────
  timeline?: string;
  team?: string;
  stack?: string[];
  headlineResult?: string; // the single best result, with a real number

  // ── Buttons at the top of the page (GitHub, live demo, poster...) ───────
  links?: ProjectLink[];

  // ── Page sections, in the order they appear ─────────────────────────────
  problem?: string;
  users?: string;
  goals?: string[];
  metrics?: ProjectMetric[];
  decisions?: ProjectDecision[]; // options considered and trade-offs
  solution?: string;
  build?: string; // how it was built (architecture, the hard problem)
  media?: ProjectMedia[]; // screenshots, diagrams, poster image
  results?: string[];
  reflection?: string;
  nextSteps?: string[];
};

export const PROJECT_KINDS: { value: ProjectKind; label: string }[] = [
  { value: "product", label: "Product" },
  { value: "teardown", label: "Teardown" },
  { value: "research", label: "Research / ML" },
  { value: "engineering", label: "Engineering" },
  { value: "leadership", label: "Leadership" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Playground items: src/content/playground/<slug>.json, edited at /admin/playground.
// ─────────────────────────────────────────────────────────────────────────────

export type PlaygroundKind =
  | "experiment" // a small build, demo or side experiment
  | "note" // a short written post
  | "interest"; // something you are currently into

export const PLAYGROUND_KINDS: { value: PlaygroundKind; label: string }[] = [
  { value: "experiment", label: "Experiment / demo" },
  { value: "note", label: "Note / blog post" },
  { value: "interest", label: "Currently into" },
];

export type PlaygroundItem = {
  slug: string;
  status: ProjectStatus; // draft = visible only locally
  kind: PlaygroundKind;
  order?: number; // lower numbers appear first (notes: newest should have the lowest number)
  title: string;
  summary: string; // one or two sentences
  body?: string; // notes: the full text (blank lines make paragraphs)
  date?: string; // e.g. "Nov 2026"
  link?: string; // external link: a demo, repo or post
  linkLabel?: string; // text for that link, e.g. "Try it"
  tags?: string[];
  image?: string; // optional picture
};
