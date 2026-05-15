import type { CaseStudy } from "../../components/case-study/types";
import type { Project } from "../projects";
import { cseResearch } from "./cse-research";
import { csesTritonspend } from "./cses-tritonspend";
import { designCoRedesign } from "./design-co-redesign";
import { designFrontiersWebsite } from "./design-frontiers-website";
import { developForGood } from "./develop-for-good";
import { econResearch } from "./econ-research";
import { kin } from "./kin";
import { portfolioDesign } from "./portfolio-design";
import { votingLiteracy } from "./voting-literacy";

export const caseStudies: Record<string, Partial<CaseStudy>> = {
  "cse-research": cseResearch,
  "cses-tritonspend": csesTritonspend,
  "design-co-redesign": designCoRedesign,
  "design-frontiers-website": designFrontiersWebsite,
  "develop-for-good": developForGood,
  "econ-research": econResearch,
  kin,
  "portfolio-design": portfolioDesign,
  "voting-literacy": votingLiteracy,
};

const PLACEHOLDER_HERO =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1600&q=80";

function buildFallbackCaseStudy(project: Project): CaseStudy {
  const secondary = project.secondaryImages ?? [];
  return {
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    year: project.year,
    status: project.status,
    heroImage: project.image || secondary[0] || PLACEHOLDER_HERO,
    meta: {
      role: project.role,
      timeline: project.year,
      team: "—",
      stack: project.tech,
      impact: project.outcomes[0] ?? "—",
    },
    overview: {
      title: project.title,
      body: project.overview,
    },
    problem: { body: project.problem },
    finalSolution: {
      title: "Solution",
      body: project.solution,
    },
    outcomes: {
      title: "Outcomes",
      results: project.outcomes,
    },
  };
}

function mergeSection<T extends Record<string, unknown>>(
  base: T | undefined,
  patch: Partial<T> | undefined,
): T | undefined {
  if (!patch) return base;
  if (!base) return patch as T;
  return { ...base, ...patch };
}

export function getCaseStudy(project: Project): CaseStudy {
  const fallback = buildFallbackCaseStudy(project);
  const curated = caseStudies[project.slug];
  if (!curated) return fallback;

  return {
    ...fallback,
    ...curated,
    links: curated.links ?? fallback.links,
    hiddenSections: curated.hiddenSections ?? fallback.hiddenSections,
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    year: project.year,
    status: project.status,
    heroImage:
      project.image ||
      curated.heroImage ||
      curated.overview?.media?.[0]?.src ||
      fallback.heroImage,
    meta: { ...fallback.meta, ...curated.meta },
    overview: mergeSection(fallback.overview, curated.overview),
    problem: mergeSection(fallback.problem, curated.problem),
    context: mergeSection(fallback.context, curated.context),
    research: mergeSection(fallback.research, curated.research),
    strategy: mergeSection(fallback.strategy, curated.strategy),
    architecture: mergeSection(fallback.architecture, curated.architecture),
    ideation: mergeSection(fallback.ideation, curated.ideation),
    flows: mergeSection(fallback.flows, curated.flows),
    designSystem: mergeSection(fallback.designSystem, curated.designSystem),
    iteration: mergeSection(fallback.iteration, curated.iteration),
    finalSolution: mergeSection(fallback.finalSolution, curated.finalSolution),
    outcomes: mergeSection(fallback.outcomes, curated.outcomes),
  };
}
