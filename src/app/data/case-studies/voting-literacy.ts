import type { CaseStudy } from "../../components/case-study/types";
import { projectImage, projectOverviewHero } from "../projectImages";

const img = (file: string) => projectImage("voting-literacy", file);

export const votingLiteracy: Partial<CaseStudy> = {
  client: "Academic · Civic Tech",
  tagline: "The most accessible way to learn about candidates and cast your vote.",
  hiddenSections: ["strategy", "flows", "context"],
  meta: {
    role: "UX/UI Designer",
    timeline: "8 weeks · 2025",
    team: "3 designers",
    stack: ["Figma", "Miro", "Notion"],
    platform: "Mobile · Web",
  },
  overview: {
    title: "Vote Smart — civic education for first-time and busy voters",
    body: "Vote Smart is a mobile-first platform that helps voters understand what's on their ballot, compare candidates without partisan noise, and feel prepared before election day. The project followed a full design-process arc — from empathy research through high-fidelity prototype — with a team of three designers over eight weeks.",
    highlights: [
      { value: "8", label: "Weeks" },
      { value: "3", label: "Designers" },
      { value: "2", label: "Personas" },
      { value: "5", label: "Process phases" },
    ],
    media: [
      {
        src: projectOverviewHero("voting-literacy"),
        alt: "Vote Smart mobile screens — checklist, ballot, and candidate comparison",
        caption: "High-fidelity flows for onboarding, ballot prep, and candidate comparison.",
      },
      {
        src: img("case-study-full.png"),
        alt: "Full Vote Smart case study board from Figma",
        caption: "End-to-end case study — research through final UI.",
        aspect: "9/16",
      },
    ],
  },
  problem: {
    title: "Voters want clarity, not another opinionated feed",
    body: "First-time and infrequent voters struggle to find unbiased information. Official guides are dense; many apps emphasize national headlines and ignore the down-ballot races that shape local life. The result is anxiety, procrastination, and ballots left incomplete.",
    painPoints: [
      {
        title: "Information overload",
        body: "Ballot language and candidate lists are hard to parse under time pressure.",
      },
      {
        title: "Trust gap",
        body: "Users aren't sure which sources are neutral or up to date for their jurisdiction.",
      },
      {
        title: "No single checklist",
        body: "Registration, research, method selection, and submission live in disconnected places.",
      },
    ],
  },
  research: {
    title: "Empathize and define before drawing a single screen",
    body: "We ran interviews and surveys with young and first-time voters, then synthesized findings in Miro. The process followed empathize → define → ideate → prototype → test, with each phase tied to a concrete artifact.",
    methods: [
      { label: "User interviews", detail: "Conversations with first-time and busy professional voters." },
      { label: "Surveys", detail: "Quantitative scan of habits, pain points, and trusted sources." },
      { label: "Affinity mapping", detail: "Thematic clustering of quotes and observations in Miro." },
      { label: "Competitive review", detail: "Audit of civic apps and official voter guides." },
    ],
    insights: [
      {
        title: "Checklists reduce anxiety",
        body: "Voters wanted a step-by-step path from registration through ballot submission — not a news feed.",
      },
      {
        title: "Comparison beats articles",
        body: "Side-by-side candidate views were preferred over long-form explainers.",
      },
      {
        title: "Local races matter",
        body: "Participants cared most about propositions and down-ballot items they didn't understand.",
      },
    ],
    media: [
      {
        src: img("research-affinity.png"),
        alt: "Affinity map and research synthesis board",
        caption: "Research synthesis — affinity map and key themes.",
      },
      {
        src: img("personas.png"),
        alt: "User personas for first-time voter and busy professional",
        caption: "Two primary personas grounded the feature priorities.",
      },
    ],
  },
  architecture: {
    eyebrow: "Information architecture",
    title: "A shallow IA that keeps voters oriented",
    body: "Navigation centers on a personalized checklist, ballot exploration, and candidate comparison — with calendar and news as supporting context, not the main loop.",
    layers: [
      {
        label: "Home",
        items: ["My Voting Checklist", "Progress", "Reminders"],
        note: "Personalized hub for today's next action.",
      },
      {
        label: "Ballot",
        items: ["Propositions", "Candidates", "Compare"],
        note: "Plain-language summaries by race and measure.",
      },
      {
        label: "Support",
        items: ["Calendar", "News", "Profile"],
        note: "Deadlines and context without hijacking the core flow.",
      },
    ],
    media: [
      {
        src: img("ia-flow.png"),
        alt: "Information architecture flow diagram",
        caption: "Site map and primary navigation paths.",
      },
    ],
  },
  ideation: {
    title: "From wireframes to a warm, civic visual language",
    body: "We explored layout and density in low-fidelity wireframes, then applied a purple-and-orange palette with soft gradients to feel approachable — not institutional.",
    explorations: [
      {
        title: "Checklist-first home",
        body: "Led with actionable steps instead of a content feed.",
        outcome: "kept",
      },
      {
        title: "Dense ballot table",
        body: "Tried fitting every race on one screen; tested poorly on mobile.",
        outcome: "cut",
      },
      {
        title: "Candidate compare cards",
        body: "Side-by-side profiles with party and position summaries.",
        outcome: "kept",
      },
    ],
    media: [
      {
        src: img("wireframes.png"),
        alt: "Low-fidelity wireframe grid",
        caption: "Early wireframes — structure before visual polish.",
      },
    ],
  },
  designSystem: {
    title: "Visual design system",
    body: "Typography, color, and component patterns were documented for consistency across onboarding, ballot, and comparison flows.",
    principles: [
      { title: "Approachable civic", body: "Warm gradients and rounded forms — not government-gray." },
      { title: "Scannable hierarchy", body: "Large titles and short blocks for mobile reading." },
      { title: "Neutral tone", body: "Copy and UI avoid partisan cues; focus on facts and dates." },
    ],
    tokens: [
      { label: "Primary purple", value: "#7B61FF", sample: "#7B61FF" },
      { label: "Accent orange", value: "#FFB347", sample: "#FFB347" },
      { label: "Surface", value: "#FAF9F6", sample: "#FAF9F6" },
      { label: "Body type", value: "Sans-serif / 400–600" },
    ],
    components: ["Checklist row", "Ballot card", "Compare module", "Tab bar", "Primary CTA"],
    media: [
      {
        src: img("style-guide.png"),
        alt: "Color palette and typography style guide",
        caption: "Color, type, and component foundations.",
      },
    ],
  },
  iteration: {
    title: "Usability testing and refinement",
    body: "Testing surfaced navigation and labeling issues — especially around ballot sections and compare entry points. We iterated on hierarchy and iconography before locking high-fidelity screens.",
    rounds: [
      {
        round: "Round 1",
        change: "Ballot categories buried in tabs",
        result: "Users missed down-ballot races; promoted category chips.",
      },
      {
        round: "Round 2",
        change: "Compare icon unclear",
        result: "Added text labels and a dedicated compare entry from candidate list.",
      },
    ],
    media: [
      {
        src: img("case-study-full.png"),
        alt: "Usability testing and iteration notes from the case study",
        caption: "Iteration highlights from testing sessions.",
        aspect: "9/16",
      },
    ],
  },
  finalSolution: {
    title: "High-fidelity prototype",
    body: "The final prototype covers onboarding, a personalized voting checklist, ballot exploration, candidate comparison, and election calendar — designed for mobile-first use before election day.",
    highlights: [
      { title: "My Voting Checklist", body: "Step-by-step progress from register to submit." },
      { title: "Ballot explorer", body: "Propositions and candidates in plain language." },
      { title: "Compare candidates", body: "Side-by-side profiles for faster decisions." },
    ],
    media: [
      {
        src: img("final-1.png"),
        alt: "Vote Smart checklist and home screens",
        caption: "Checklist and home — personalized voting path.",
      },
      {
        src: img("final-2.png"),
        alt: "Ballot and candidate comparison screens",
        caption: "Ballot overview and candidate comparison.",
      },
      {
        src: img("final-3.png"),
        alt: "Election calendar and supporting screens",
        caption: "Calendar and supporting flows.",
      },
    ],
  },
  outcomes: {
    title: "Reflections and next steps",
    body: "Vote Smart validated that structure and neutrality matter as much as visuals for civic products. The checklist pattern was the most resonant concept in testing; compare and calendar supported it without competing for attention.",
    reflections: [
      {
        title: "Process discipline paid off",
        body: "Affinity mapping and IA work prevented feature sprawl before hi-fi polish.",
      },
      {
        title: "Neutrality is a design choice",
        body: "Visual warmth plus factual copy helped the product feel trustworthy without feeling partisan.",
      },
    ],
    nextSteps: [
      "Jurisdiction-specific ballot data integration",
      "Accessibility audit for WCAG AA on all flows",
      "Pilot with a campus or local nonprofit partner",
    ],
  },
};
