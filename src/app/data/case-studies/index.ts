import type { CaseStudy } from "../../components/case-study/types";
import type { Project } from "../projects";
import { forma } from "./forma";
import { kin } from "./kin";
import { pulseboard } from "./pulseboard";
import { waypoint } from "./waypoint";

export const caseStudies: Record<string, Partial<CaseStudy>> = {
  forma,
  kin,
  pulseboard,
  waypoint,
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
  };
}
