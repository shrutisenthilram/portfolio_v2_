export type Project = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
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

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1766503206606-27de0861e8a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

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
    description: "Research exploring how people interact with complex software systems.",
    tags: ["Research", "HCI"],
    image: PLACEHOLDER_IMAGE,
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
      "Designing and building this portfolio — editorial layout, motion, and a case-study system for selected work.",
    tags: ["Product Design", "Web"],
    image: PLACEHOLDER_IMAGE,
    year: "2026",
    status: "Featured",
    role: "Designer & Developer",
    featured: true,
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
    image: "/images/kin/overview-hero.png",
    year: "2026",
    status: "Featured",
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
    title: "Voting Literacy",
    subtitle: "Civic education product",
    description:
      "Helping first-time and infrequent voters understand ballots, deadlines, and local races without overwhelm.",
    tags: ["Product Design", "Civic", "Mobile"],
    image: PLACEHOLDER_IMAGE,
    year: "2025",
    status: "Case Study",
    role: "Product Designer",
    featured: true,
    overview:
      "Voting Literacy makes local elections legible — what’s on the ballot, who’s running, and what matters before you arrive at the polls.",
    problem:
      "Official voter guides are dense. Third-party apps optimize for national races and ignore the down-ballot decisions that shape daily life.",
    solution:
      "A guided flow that translates ballot language into plain summaries, with deadlines and reminders tied to the user’s jurisdiction.",
    outcomes: [],
    tech: ["Figma", "Research", "Prototyping"],
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
    image: PLACEHOLDER_IMAGE,
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
    description: "Visualizing student government spending for clearer campus accountability.",
    tags: ["Data", "Web", "Civic"],
    image: PLACEHOLDER_IMAGE,
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
    image: PLACEHOLDER_IMAGE,
    year: "2025",
    status: "Live",
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
    description: "Redesigning the public face of Design Co — UCSD’s student-run design studio.",
    tags: ["Product Design", "Web"],
    image: PLACEHOLDER_IMAGE,
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
    description: "A compact case study on an economics research project — methods, findings, and implications.",
    tags: ["Research", "Economics"],
    image: PLACEHOLDER_IMAGE,
    year: "2025",
    status: "Small Case Study",
    role: "Researcher",
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
