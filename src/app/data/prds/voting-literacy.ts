import type { Prd } from "../../components/prd/types";

// Vote Smart's case-study file uses a single full-page board image with no
// written sections (see data/case-studies/voting-literacy.ts), so this PRD
// reuses the already-reviewed overview/problem/solution copy that lives in
// projects.ts instead. Most other sections have no existing source material
// for this project and are left unset rather than guessed at.
export const voteSmartPrd: Prd = {
  whyNow:
    "Voters struggle to find neutral, accessible information about their ballot. Ballot language is intimidating, and most existing tools ignore the down-ballot races that matter most locally.",
  problemStatement:
    "First-time and busy voters need a way to understand their ballot, compare candidates, and follow a personalized checklist from registration to election day — without partisan noise or dense official guides.",
  targetAudience:
    "First-time voters and busy voters generally, with a particular focus on people who feel intimidated by ballot language or who skip down-ballot races because they don't have enough information to vote on them confidently.",
  scopeFeatures: [
    "A checklist-led mobile experience from registration through election day.",
    "Plain-language ballot summaries.",
    "Candidate comparison.",
    "Election calendar support.",
  ],
  // Needs your input: impactValue, successMetrics, outOfScope,
  // assumptionsDependencies, milestones, openQuestions, referenceLinks.
};
