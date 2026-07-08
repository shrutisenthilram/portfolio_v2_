import type { Prd } from "../../components/prd/types";

// Everything below is reused, not new, content — pulled from the already-
// reviewed copy in data/case-studies/kin.ts (overview, problem, context,
// finalSolution, outcomes). Nothing here is a new claim.
//
// Left unset on purpose (renders "needs your input" in PrdShell):
//   - successMetrics: no confirmed number (SUS score, adoption rate, etc.)
//     exists anywhere in the case study yet.
//   - assumptionsDependencies: constraints exist in the deeper case study,
//     but "assumption" is a different claim than "constraint" — didn't want
//     to relabel one as the other.
//   - milestones: the case study's iteration rounds (interview/testing
//     counts) are still flagged from the last content audit as unverified —
//     not repeating them here in a new, more prominent section until
//     they're confirmed.
export const kinPrd: Prd = {
  whyNow:
    "The idea came from a personal struggle to keep up with my own medication as a full-time student with two jobs. That led to research into medication reminders, which surfaced a much bigger problem: family caregivers carry the mental load of keeping an aging parent on track with medication, often from a distance and often while splitting the work with siblings.",
  problemStatement:
    "The hard part of caregiving isn't reminding someone to take their pills — it's everything around that: tracking what was taken and when, coordinating with siblings, managing refills across pharmacies, and never being fully sure whether today's doses actually happened. Existing tools like Medisafe and CareZone are built around a single patient with a single caregiver, and fall apart the moment a family has two parents to manage or a sibling coordinating from another city.",
  targetAudience:
    "Adult children — often long-distance, often splitting the work with siblings — who are managing an aging parent's medications. The caregiver, not the patient, is the primary user; the patient has a separate, dignity-first companion view.",
  impactValue:
    "53 million Americans are unpaid caregivers, and that number is growing as the Baby Boomer generation ages past 65. The category's leading products still design around a single patient, not a caregiver managing multiple people's care — Kin's bet is that designing for the caregiver first, and making coordination visible, is the actual unlock.",
  scopeFeatures: [
    "One calm Home dashboard — today's medications across every patient, in one chronological view.",
    "Handoff notes — a neutral, no-blame pattern for moving tasks between caregivers.",
    "Patient companion view — a dignity-first, read-only-by-default surface the patient actually opens.",
    "Tiered urgency for refill alerts — amber 5 days early instead of red 24 hours late.",
  ],
  outOfScope: [
    "Full pharmacy API integration at v1 — replaced with a manual + photo-scan medication flow for the prototype.",
    "A feature-rich patient interface — replaced with a dignity-first companion view instead.",
    "Android parity at v1 — scoped to an iOS experience built to the depth the problem demands.",
  ],
  openQuestions: [
    "Live pharmacy API integration for in-app refill ordering.",
    "AI-powered drug interaction warnings, written in caregiver-readable language rather than clinical jargon.",
    "Longitudinal health trend views to support doctor appointments.",
    "An Android client and shared-device handoff for households without a phone per person.",
  ],
  referenceLinks: [{ label: "Prototype", href: "/kin" }],
};
