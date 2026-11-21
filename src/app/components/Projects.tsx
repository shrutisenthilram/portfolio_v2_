import { BranchRule, EdgeVine } from "./FloralArt";
import { Link } from "react-router";
import { featuredProjects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { LockedNotice, useLocked } from "./Locked";

const ACCENT = "#B65670";

export function Projects() {
  const locked = useLocked("projects");
  return (
    <section
      id="work"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="relative pt-4 pb-6 px-6 md:px-12 max-w-6xl mx-auto"
    >
      <EdgeVine side="left" top="58%" />
      <div className="flex items-end justify-between mb-6">
        <div>
          <span
            className="tracking-widest uppercase block mb-3"
            style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--p-fg-45)" }}
          >
            Selected Work
          </span>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "var(--p-fg)",
            }}
          >
            Featured Projects
          </h2>
          <BranchRule className="mt-3" />
        </div>
        {!locked && (
        <Link
          to="/projects"
          className="hidden sm:inline-flex items-center gap-2 pb-0.5 transition-colors duration-200"
          style={{ fontSize: "0.82rem", color: "var(--p-accent)", borderBottom: `1px solid ${ACCENT}60` }}
        >
          All projects →
        </Link>
        )}
      </div>

      {locked ? (
        <LockedNotice area="projects" />
      ) : (
      <>
      <div className={`grid grid-cols-1 ${featuredProjects.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-3"} gap-8 md:gap-6`}>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} variant="featured" />
        ))}
      </div>

      <Link
        to="/projects"
        className="sm:hidden inline-flex items-center gap-2 mt-8 pb-0.5"
        style={{ fontSize: "0.85rem", color: "var(--p-accent)", borderBottom: `1px solid ${ACCENT}60` }}
      >
        All projects →
      </Link>
      </>
      )}
    </section>
  );
}
