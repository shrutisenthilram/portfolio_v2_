// Content schema for the case study system. Every block beyond `meta` is
// optional — the layout, sidebar nav, and section rendering all key off
// what's actually present.

export type Media = {
  src: string;
  caption?: string;
  alt?: string;
  // Override default aspect ratio (CSS aspect-ratio string, e.g. "16/9").
  aspect?: string;
};

export type Highlight = { value: string; label: string };

export type CaseStudy = {
  slug: string;

  // — Hero
  client?: string;
  title: string;
  subtitle: string;
  tagline?: string;
  year: string;
  status: string;
  heroImage: string;
  heroVideo?: string;
  links?: { label: string; href: string }[];

  // — Meta row (always shown under hero)
  meta: {
    role: string;
    timeline: string;
    team: string;
    stack: string[];
    platform?: string;
    impact: string;
  };

  // — 01 Overview
  overview?: {
    eyebrow?: string;
    title?: string;
    body: string;
    highlights?: Highlight[];
  };

  // — 02 Problem
  problem?: {
    eyebrow?: string;
    title?: string;
    body: string;
    painPoints?: { title: string; body: string }[];
    quote?: { text: string; attribution?: string };
  };

  // — 03 Context & Constraints
  context?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    constraints: { label: string; body: string }[];
    tradeoffs?: { gave: string; got: string }[];
  };

  // — 04 Research
  research?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    methods?: { label: string; detail: string }[];
    insights?: { title: string; body: string }[];
    quote?: { text: string; attribution?: string };
    media?: Media[];
  };

  // — 05 Product Strategy
  strategy?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    targetUsers?: { label: string; detail: string }[];
    goals?: string[];
    mvp?: { included: string[]; excluded: string[] };
    metrics?: Highlight[];
    risks?: { label: string; body: string }[];
  };

  // — 06 System Design / Technical Architecture
  architecture?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    layers: { label: string; items: string[]; note?: string }[];
    notes?: string[];
    media?: Media[];
  };

  // — 07 Ideation & Exploration
  ideation?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    explorations?: {
      title: string;
      body: string;
      outcome?: "kept" | "evolved" | "cut";
    }[];
    media?: Media[];
  };

  // — 08 Core Flows
  flows?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    flows: { title: string; steps: { label: string; body: string }[] }[];
    edgeCases?: string[];
    accessibility?: string[];
  };

  // — 09 Design System
  designSystem?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    principles?: { title: string; body: string }[];
    tokens?: { label: string; value: string; sample?: string }[];
    components?: string[];
    accessibilityNotes?: string[];
  };

  // — 10 Iteration & Testing
  iteration?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    rounds?: { round: string; change: string; result: string }[];
    experiments?: { hypothesis: string; result: string }[];
    comparisons?: { before: string; after: string; label: string }[];
  };

  // — 11 Final Solution
  finalSolution?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    highlights?: { title: string; body: string }[];
    media?: Media[];
  };

  // — 12 Outcomes & Reflection
  outcomes?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    results?: string[];
    metrics?: Highlight[];
    reflections?: { title: string; body: string }[];
    nextSteps?: string[];
  };
};

export type SectionDef = {
  id: string;
  number: string;
  label: string;
  shortLabel?: string;
};
