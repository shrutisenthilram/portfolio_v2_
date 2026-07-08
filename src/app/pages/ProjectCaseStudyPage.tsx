// The deeper design case study, at /projects/:slug/case-study. This is the
// same rich, multi-section CaseStudyShell experience every project used to
// show directly at /projects/:slug — now reachable via the "View Full Design
// Case Study →" button on a project's PRD overview page (ProjectDetailPage),
// or directly by URL for any project (harmless either way, since it's the
// same content that renders at /projects/:slug for projects without a PRD).
import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { allProjects, isProjectNavigable } from "../data/projects";
import { getCaseStudy } from "../data/case-studies";
import { CaseStudyShell } from "../components/case-study/CaseStudyShell";

const ACCENT = "#4338CA";

export function ProjectCaseStudyPage() {
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

  const study = getCaseStudy(project);
  const prev = navigable[navIdx - 1] ?? null;
  const next = navigable[navIdx + 1] ?? null;

  if (!study.links || study.links.length === 0) {
    const derived: { label: string; href: string }[] = [];
    if (project.github) derived.push({ label: "Source", href: project.github });
    if (project.live) derived.push({ label: "Live", href: project.live });
    if (derived.length > 0) study.links = derived;
  }

  return (
    <>
      {/* Breadcrumb back to this project's overview/PRD page */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 pt-6">
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-60"
          style={{ fontSize: "0.75rem", color: "var(--p-fg-35)" }}
        >
          <ArrowLeft size={12} /> Back to project overview
        </Link>
      </div>
      <CaseStudyShell
        study={study}
        prev={prev ? { slug: prev.slug, title: prev.title, subtitle: prev.subtitle } : null}
        next={next ? { slug: next.slug, title: next.title, subtitle: next.subtitle } : null}
      />
    </>
  );
}
