import { useParams, Link } from "react-router";
import { allProjects } from "../data/projects";
import { getCaseStudy } from "../data/case-studies";
import { CaseStudyShell } from "../components/case-study/CaseStudyShell";

const ACCENT = "#4338CA";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const idx = allProjects.findIndex((p) => p.slug === slug);
  const project = allProjects[idx];

  if (!project) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <p style={{ fontSize: "0.9rem", color: "var(--p-fg-25)" }}>
          Project not found.
        </p>
        <Link to="/projects" style={{ fontSize: "0.82rem", color: ACCENT }}>
          ← Back to projects
        </Link>
      </div>
    );
  }

  const study = getCaseStudy(project);
  const prev = allProjects[idx - 1] ?? null;
  const next = allProjects[idx + 1] ?? null;

  if (!study.links || study.links.length === 0) {
    const derived: { label: string; href: string }[] = [];
    if (project.github) derived.push({ label: "Source", href: project.github });
    if (project.live) derived.push({ label: "Live", href: project.live });
    if (derived.length > 0) study.links = derived;
  }

  return (
    <CaseStudyShell
      study={study}
      prev={prev ? { slug: prev.slug, title: prev.title, subtitle: prev.subtitle } : null}
      next={next ? { slug: next.slug, title: next.title, subtitle: next.subtitle } : null}
    />
  );
}
