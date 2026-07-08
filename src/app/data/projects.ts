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
  featured?: boolean;
  overview: string;
  problem: string;
  solution: string;
  outcomes: string[];
  tech: string[];
  secondaryImages: string[];
};

import { projectThumbnail } from "./projectImages";

const emptyCaseStudyFields = {
  overview: "",
  problem: "",
  solution: "",
  outcomes: [] as string[],
  tech: [] as string[],
  secondaryImages: [] as string[],
  github: "",
};

export const allProjects: Project[] = [
  {
    id: 1,
    slug: "cse-research",
    title: "CSE Research",
    subtitle: "Human–computer interaction",
    description:
      "Researching multi-agent vision-language model pipelines that generate photorealistic material/shader code for 3D scenes from tutorial videos — outperforming one-shot generation baselines. Advised by Prof. Manmohan Chandraker, UCSD Jacobs School of Engineering.",
    tags: ["Research", "HCI"],
    year: "2026",
    status: "Coming Soon",
    role: "Researcher",
    comingSoon: true,
    ...emptyCaseStudyFields,
  },
  {
    id: 2,
    slug: "portfolio-design",
    title: "Portfolio Design",
    subtitle: "Personal site & brand",
    description:
      "An evolving personal portfolio — reflecting the design choices I made to express my own product and design sensibility, from layout to case-study structure.",
    tags: ["Product Design", "Web"],
    image: projectThumbnail("portfolio-design"),
    year: "2026",
    status: "Coming Soon",
    role: "Designer & Developer",
    comingSoon: true,
    overview:
      "A portfolio built to read like a case study, not a template — with room for process, visuals, and honest project status.",
    problem:
      "Most portfolios optimize for aesthetics over narrative. Recruiters need to understand how you think, not just what you shipped.",
    solution:
      "An editorial case-study shell with modular sections, sticky navigation, and a data-driven project grid that scales as new work ships.",
    outcomes: [],
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Motion"],
    secondaryImages: [],
    github: "",
  },
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
    tech: ["Figma", "FigJam", "Maze", "Notion"],
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
    id: 5,
    slug: "develop-for-good",
    title: "Develop for Good",
    subtitle: "Nonprofit product partnership",
    description: "Product design work with a nonprofit partner through Develop for Good.",
    tags: ["Product Design", "Nonprofit"],
    year: "2025",
    status: "Coming Soon",
    role: "Product Designer",
    comingSoon: true,
    ...emptyCaseStudyFields,
  },
  {
    id: 6,
    slug: "cses-tritonspend",
    title: "CSES TritonSpend",
    subtitle: "Campus budget transparency",
    description:
      "A budgeting app helping UCSD students track irregular campus expenses — dining dollars, meal plans, and other fluctuating costs — in one place.",
    tags: ["Data", "Web", "Civic"],
    year: "2025",
    status: "Coming Soon",
    role: "Designer & Engineer",
    comingSoon: true,
    ...emptyCaseStudyFields,
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
    featured: true,
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
  {
    id: 8,
    slug: "design-co-redesign",
    title: "Design Co Website Redesign",
    subtitle: "Studio refresh",
    description:
      "A full redesign of Design Co's main organizational website — adding backend admin tools, improved user interaction, and infrastructure to support the club's growth.",
    tags: ["Product Design", "Web"],
    year: "2025",
    status: "Coming Soon",
    role: "Product Designer",
    comingSoon: true,
    ...emptyCaseStudyFields,
  },
  {
    id: 9,
    slug: "econ-research",
    title: "Econ Research",
    subtitle: "Applied economics study",
    description:
      "Building an AI-assisted data extraction pipeline using Python, OCR, and LLMs to convert historical economic documents into structured, benchmarked datasets.",
    tags: ["Research", "Economics"],
    year: "2025",
    status: "Coming Soon",
    role: "Researcher",
    comingSoon: true,
    overview:
      "An applied economics project examining how policy and behavior interact in a real-world dataset.",
    problem:
      "Complex findings need to be communicated clearly to non-specialist audiences without losing rigor.",
    solution:
      "A short-form case study structure focused on question, method, result, and takeaway.",
    outcomes: [],
    tech: ["Stata", "R", "LaTeX"],
    secondaryImages: [],
    github: "",
  },
  {
    id: 10,
    slug: "eno-checkout-teardown",
    title: "Product Teardown: Capital One Eno — Virtual Card Checkout",
    subtitle: "Self-directed product critique",
    description:
      "A product teardown of Capital One's Eno virtual card feature — identifying real reliability friction from public user reviews and proposing a redesigned checkout flow.",
    tags: ["Product Design", "Teardown"],
    year: "2026",
    status: "Coming Soon",
    role: "Independent Reviewer · Not affiliated with Capital One",
    comingSoon: true,
    overview:
      "Eno's virtual card feature lets users generate a one-time card number for secure online purchases — a strong idea undermined by slow generation, inconsistent browser support, and manual copy-paste into checkout.",
    problem:
      "Public reviews consistently report virtual card generation taking up to 2-3 minutes, unreliable performance outside Chrome, and no auto-fill into the merchant's checkout form — friction that defeats the feature's speed/security value and pushes users back to their real card.",
    solution:
      "\"Quick Card\" — a persistent, pre-generated virtual card with native browser autofill and explicit loading states, reducing friction without abandoning the security model.",
    outcomes: [],
    tech: ["Figma"],
    secondaryImages: [],
    github: "",
  },
  {
    id: 11,
    slug: "lpl-financial-internship",
    title: "Product Development Intern — LPL Financial",
    subtitle: "Advisor platform, failsafe system",
    description:
      "Contributing to LPL's internal advisor platform, designing and launching a new failsafe system for financial advisors.",
    tags: ["Product Design"],
    year: "2026",
    status: "Coming Soon",
    role: "Product Development Intern",
    comingSoon: true,
    ...emptyCaseStudyFields,
  },
];

export const featuredProjects = allProjects.filter((p) => p.featured);

const tagSet = new Set<string>();
for (const p of allProjects) {
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
