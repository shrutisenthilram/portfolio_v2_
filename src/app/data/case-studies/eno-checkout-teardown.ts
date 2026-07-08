import type { CaseStudy } from "../../components/case-study/types";
import { projectImage, projectOverviewHero } from "../projectImages";

const enoImg = (file: string) => projectImage("eno-checkout-teardown", file);

// TODO(personalize): drop real wireframe images into /public/images/eno-checkout-teardown/
// using the filenames below once you have them. Until then these paths 404 gracefully
// (ImageWithFallback shows a placeholder instead of a broken image icon).
export const enoCheckoutTeardown: Partial<CaseStudy> = {
  client: "Self-directed · Not affiliated with Capital One",
  tagline: "A teardown of Eno's virtual card checkout — and a faster way to get it right.",
  meta: {
    role: "Independent Reviewer",
    timeline: "2026",
    team: "Solo",
    stack: ["Figma"],
    platform: "Web",
  },
  overview: {
    title: "Product Teardown: Capital One Eno — Virtual Card Checkout",
    body: "Eno's virtual card feature lets users generate a one-time card number for secure online purchases — a strong idea undermined by slow generation, inconsistent browser support, and manual copy-paste into checkout.",
    media: [
      {
        src: projectOverviewHero("eno-checkout-teardown"),
        alt: "Overview of the Eno virtual card checkout flow being reviewed",
      },
    ],
  },
  problem: {
    body: "Public reviews consistently report virtual card generation taking up to 2-3 minutes, unreliable performance outside Chrome, and no auto-fill into the merchant's checkout form — friction that defeats the feature's speed/security value and pushes users back to their real card.",
  },
  finalSolution: {
    title: "\"Quick Card\"",
    body: "A persistent, pre-generated virtual card with native browser autofill and explicit loading states, reducing friction without abandoning the security model.",
    media: [
      {
        src: enoImg("final-1.png"),
        alt: "Screen 1: merchant checkout page with a persistent Eno button",
        caption: "1. Merchant checkout — a persistent Eno button, always visible, no hunting for the feature.",
      },
      {
        src: enoImg("final-2.png"),
        alt: "Screen 2: explicit card-generation loading state with a time estimate",
        caption: "2. Generating — an explicit loading state with a time estimate, instead of a silent spinner.",
      },
      {
        src: enoImg("final-3.png"),
        alt: "Screen 3: auto-filled virtual card result with no copy-paste required",
        caption: "3. Result — the card number auto-fills into checkout, no copy-paste required.",
      },
    ],
  },
  outcomes: {
    title: "Reflection",
    reflections: [
      {
        title: "Methodology note",
        body: "Based on publicly available user reviews, not internal data or direct user interviews — validating these friction points with real Eno users would be a natural next step.",
      },
    ],
  },
};
