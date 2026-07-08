import type { Prd } from "../../components/prd/types";

// Reused, not new, content — pulled from the already-reviewed copy in
// data/case-studies/eno-checkout-teardown.ts and projects.ts (overview,
// problem, finalSolution, and the methodology/reflection note). The one
// addition here is splitting that reflection note into its two natural
// parts: the evidence-basis caveat (Assumptions & Dependencies) and the
// forward-looking next step (Open Questions) — same words, reorganized,
// nothing new stated.
//
// Left unset on purpose (renders "needs your input" in PrdShell):
//   - successMetrics, outOfScope, milestones, referenceLinks — no source
//     material exists for these yet.
export const enoPrd: Prd = {
  whyNow:
    "Eno's virtual card feature lets users generate a one-time card number for secure online purchases — a strong idea undermined by slow generation, inconsistent browser support, and manual copy-paste into checkout.",
  problemStatement:
    "Public reviews consistently report virtual card generation taking up to 2-3 minutes, unreliable performance outside Chrome, and no auto-fill into the merchant's checkout form — friction that defeats the feature's speed/security value and pushes users back to their real card.",
  targetAudience:
    "Existing Capital One Eno users attempting to use the virtual card feature during online checkout.",
  impactValue:
    "\"Quick Card\" aims to reduce that friction without abandoning the security model Eno already offers — keeping the safety benefit of a virtual card while removing the reasons people currently give up and use their real card instead.",
  scopeFeatures: [
    "A persistent Eno button on the merchant checkout page — no hunting for the feature.",
    "An explicit card-generation loading state with a time estimate, instead of a silent spinner.",
    "Native browser autofill for the generated card into checkout — no copy-paste required.",
  ],
  assumptionsDependencies: [
    "This teardown is based on publicly available user reviews, not internal data or direct interviews with Eno users.",
  ],
  openQuestions: [
    "Validate these friction points with real Eno users through direct interviews or usability testing.",
  ],
};
