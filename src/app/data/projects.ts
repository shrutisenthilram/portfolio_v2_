export type Project = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  // Optional: "Coming Soon" projects without real artwork yet omit this
  // entirely rather than pointing at a placeholder path — ProjectCard.tsx
  // and AllProjects.tsx render a graceful placeholder box when it's unset.
  image?: string;
  year: string;
  status: string;
  role: string;
  github: string;
  live?: string;
  comingSoon?: boolean;
  // Set for projects loaded from src/content/projects with status "draft".
  // Drafts are only listed when running locally (see content/projects/index.ts).
  draft?: boolean;
  featured?: boolean;
  overview: string;
  problem: string;
  solution: string;
  outcomes: string[];
  tech: string[];
  secondaryImages: string[];
};

import { projectThumbnail } from "./projectImages";
import { listedContentProjects } from "../../content/projects";
import type { ContentProject } from "../../content/types";

const emptyCaseStudyFields = {
  overview: "",
  problem: "",
  solution: "",
  outcomes: [] as string[],
  tech: [] as string[],
  secondaryImages: [] as string[],
  github: "",
};

// Projects that are still defined in code (their case studies are hand-built).
// New projects live in src/content/projects/*.json and are edited in /admin.
const legacyProjects: Project[] = [
  {
    id: 3,
    slug: "kin",
    title: "Kin",
    subtitle: "Medication management for family caregivers",
    description:
      "A mobile app for adult children managing an aging parent's medications — one calm dashboard built around coordination, not just reminders.",
    tags: ["Product Design", "iOS", "Healthcare"],
    image: projectThumbnail("kin"),
    year: "2026",
    status: "Concept Project",
    role: "Product Designer",
    featured: true,
    overview:
      "Kin is a mobile app for adult children managing an aging parent's medications — often from a distance, often with siblings, and always while running the rest of their life.",
    problem:
      "Caregivers aren't forgetting to care. They're forgetting who last checked. Most tools assume one patient, one caregiver, one schedule.",
    solution:
      "A caregiver-centric home dashboard, family coordination tab, and dignity-first patient companion view — built around visibility and handoffs, not surveillance.",
    outcomes: [],
    tech: ["Figma", "FigJam", "Notion", "React"],
    secondaryImages: [],
    github: "",
  },
  {
    id: 4,
    slug: "voting-literacy",
    title: "Vote Smart",
    subtitle: "Civic education for first-time voters",
    description:
      "A mobile-first platform that helps voters understand their ballot, compare candidates, and follow a personalized checklist from registration to election day.",
    tags: ["Product Design", "Civic", "Mobile"],
    image: projectThumbnail("voting-literacy"),
    year: "2025",
    status: "Team Project",
    role: "UX/UI Designer",
    featured: true,
    overview:
      "Vote Smart helps first-time and busy voters find unbiased information, compare candidates, and complete a personalized voting checklist — without partisan noise or dense official guides.",
    problem:
      "Voters struggle to find neutral, accessible information. Ballot language is intimidating, and most tools ignore the down-ballot races that matter locally.",
    solution:
      "A checklist-led mobile experience with plain-language ballot summaries, candidate comparison, and election calendar support — designed through empathize → define → ideate → prototype → test.",
    outcomes: [],
    tech: ["Figma", "Miro", "Notion"],
    secondaryImages: [],
    github: "",
  },
  {
    id: 7,
    slug: "design-frontiers-website",
    title: "Design Frontiers Website",
    subtitle: "Student org web presence",
    description:
      "Marketing and information architecture for Design Frontiers — UCSD’s design community org.",
    tags: ["Product Design", "Web"],
    image: projectThumbnail("design-frontiers-website"),
    year: "2025",
    status: "Shipped Project",
    role: "Web Lead",
    comingSoon: true, // hidden: not part of the PM-focused lineup
    featured: false,
    overview:
      "Design Frontiers needed a site that recruits members, showcases events, and reflects the org’s creative energy without feeling like a generic club page.",
    problem:
      "The old site buried key information and didn’t scale as the org grew programming and partnerships.",
    solution:
      "A modular page system with clear event hierarchy, accessible typography, and fast paths to join and learn more.",
    outcomes: [],
    tech: ["Figma", "React", "Tailwind"],
    secondaryImages: [],
    github: "",
  },
];

// ── Projects defined as JSON files in src/content/projects ───────────────────
function linkHref(c: ContentProject, pattern: RegExp): string {
  return c.links?.find((l) => l.href && pattern.test(l.label))?.href ?? "";
}

function contentToProject(c: ContentProject, i: number): Project {
  return {
    id: 100 + i,
    slug: c.slug,
    title: c.title,
    subtitle: c.subtitle,
    description: c.summary,
    tags: c.tags,
    image: c.image || undefined,
    year: c.year,
    status: c.status === "draft" ? "Draft" : "Published",
    role: c.role,
    github: linkHref(c, /github|source|code/i),
    live: linkHref(c, /live|demo|site/i) || undefined,
    featured: c.featured,
    draft: c.status === "draft",
    overview: "",
    problem: "",
    solution: "",
    outcomes: [],
    tech: c.stack ?? [],
    secondaryImages: [],
  };
}

export const allProjects: Project[] = [
  ...legacyProjects,
  ...listedContentProjects.map(contentToProject),
];

export const featuredProjects = allProjects.filter((p) => p.featured);

// Only finished projects appear in the public grid. Anything marked
// comingSoon stays in this file but is hidden from the site until it's ready;
// set comingSoon to false (and add real images) to publish it.
export const publicProjects = allProjects.filter((p) => !p.comingSoon);

const tagSet = new Set<string>();
for (const p of publicProjects) {
  for (const t of p.tags) tagSet.add(t);
}

export const PROJECT_TAGS = Array.from(tagSet).sort();

export const ALL_PROJECT_TAGS = ["All", ...PROJECT_TAGS];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function isProjectNavigable(project: Project): boolean {
  return !project.comingSoon;
}

export function getProjectHref(project: Project): string | null {
  return project.comingSoon ? null : `/projects/${project.slug}`;
}
