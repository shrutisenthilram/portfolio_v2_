// ─────────────────────────────────────────────────────────────────────────────
// Prd — the schema for a project's PRD overview page (the primary content at
// /projects/:slug for projects that have one; see src/app/data/prds/index.ts).
//
// Every field is optional on purpose. PrdShell renders only the sections that
// have content and numbers them automatically — a missing field means that
// section is simply not shown (visitors never see placeholders, and nothing is
// ever filled in with guessed content). Add a field and its section appears.
// ─────────────────────────────────────────────────────────────────────────────

export type PrdMilestone = { label: string; detail: string };
export type PrdLink = { label: string; href: string };

export type Prd = {
  whyNow?: string; // "Why We're Doing This"
  problemStatement?: string;
  targetAudience?: string;
  impactValue?: string; // "Impact & Value"
  successMetrics?: string[];
  scopeFeatures?: string[]; // "Scope & Features"
  outOfScope?: string[];
  assumptionsDependencies?: string[];
  milestones?: PrdMilestone[];
  openQuestions?: string[];
  referenceLinks?: PrdLink[];
};
