import type { Prd } from "../../components/prd/types";

// Design Frontiers' case-study file only supplies final-solution imagery, no
// written sections (see data/case-studies/design-frontiers-website.ts), so
// this PRD reuses the already-reviewed overview/problem/solution copy from
// projects.ts instead. Most other sections have no existing source material
// for this project and are left unset rather than guessed at.
export const designFrontiersPrd: Prd = {
  whyNow:
    "Design Frontiers needed a site that recruits members, showcases events, and reflects the org's creative energy — without feeling like a generic club page.",
  problemStatement:
    "The old site buried key information and didn't scale as the org grew its programming and partnerships.",
  targetAudience:
    "Prospective and current Design Frontiers members, plus visitors evaluating the org for events or partnerships.",
  scopeFeatures: [
    "A modular page system with clear event hierarchy.",
    "Accessible typography.",
    "Fast, direct paths to join or learn more.",
  ],
  // Needs your input: impactValue, successMetrics, outOfScope,
  // assumptionsDependencies, milestones, openQuestions, referenceLinks.
};
