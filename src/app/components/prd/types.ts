// ─────────────────────────────────────────────────────────────────────────────
// Prd — the schema for a project's PRD overview page (the primary content at
// /projects/:slug for projects that have one; see src/app/data/prds/index.ts).
//
// Every field is optional on purpose. PrdShell always renders all 11 sections
// in a fixed order, whether or not a project has real content for a given
// section yet — if a field is missing, that section shows a "needs your
// input" placeholder instead of being skipped or (worse) filled with guessed
// content. This keeps the page structure identical across projects even
// while the underlying content is still being filled in.
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
