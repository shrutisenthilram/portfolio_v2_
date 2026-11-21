import { useParams, Link } from "react-router";
import { allProjects, isProjectNavigable } from "../data/projects";
import { getCaseStudy } from "../data/case-studies";
import { getPrd } from "../data/prds";
import { CaseStudyShell } from "../components/case-study/CaseStudyShell";
import { PrdShell } from "../components/prd/PrdShell";
import { ProjectPage } from "../components/project/ProjectPage";
import { getContentProject } from "../../content/projects";

const ACCENT = "#B65670";

// The primary /projects/:slug page. For a project with a PRD (see
// src/app/data/prds/index.ts — currently Kin, Vote Smart, Design Frontiers),
// this renders the PRD overview with a CTA into the deeper design case study
// at /projects/:slug/case-study (ProjectCaseStudyPage.tsx). Every other
// project (Eno, Portfolio Design, and all "Coming Soon" projects) keeps the
// original single-page case study experience, unchanged.
export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const idx = allProjects.findIndex((p) => p.slug === slug);
  const project = allProjects[idx];

  if (!project || !isProjectNavigable(project)) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <p style={{ fontSize: "0.9rem", color: "var(--p-fg-25)" }}>
          {project?.comingSoon ? "This project is coming soon." : "Project not found."}
        </p>
        <Link to="/projects" style={{ fontSize: "0.82rem", color: ACCENT }}>
          ← Back to projects
        </Link>
      </div>
    );
  }

  const navigable = allProjects.filter(isProjectNavigable);
  const navIdx = navigable.findIndex((p) => p.slug === slug);
  const prev = navigable[navIdx - 1] ?? null;
  const next = navigable[navIdx + 1] ?? null;
  const prevProp = prev ? { slug: prev.slug, title: prev.title, subtitle: prev.subtitle } : null;
  const nextProp = next ? { slug: next.slug, title: next.title, subtitle: next.subtitle } : null;

  // Projects defined in src/content/projects/*.json use the standard template.
  const contentProject = getContentProject(project.slug);
  if (contentProject) {
    return <ProjectPage project={contentProject} prev={prevProp} next={nextProp} />;
  }

  const study = getCaseStudy(project);
  const prd = getPrd(project.slug);

  if (prd) {
    return (
      <PrdShell
        study={study}
        prd={prd}
        caseStudyHref={`/projects/${project.slug}/case-study`}
        prev={prevProp}
        next={nextProp}
      />
    );
  }

  if (!study.links || study.links.length === 0) {
    const derived: { label: string; href: string }[] = [];
    if (project.github) derived.push({ label: "Source", href: project.github });
    if (project.live) derived.push({ label: "Live", href: project.live });
    if (derived.length > 0) study.links = derived;
  }

  return <CaseStudyShell study={study} prev={prevProp} next={nextProp} />;
}
