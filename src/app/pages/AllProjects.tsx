import { useState } from "react";
import { Link } from "react-router";
import { Github, ExternalLink } from "lucide-react";
import {
  allProjects,
  ALL_PROJECT_TAGS,
  getProjectHref,
  isProjectNavigable,
  type Project,
} from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { ImageWithFallback, ImagePlaceholder } from "../components/figma/ImageWithFallback";
import { INDIGO } from "../data/tagColors";

const ACCENT = INDIGO;

// Only "Coming Soon" gets a badge here — it signals a real functional state
// (not yet clickable). Per-project status labels (Concept/Team/Shipped/
// Teardown) were removed; a general recruiter audience doesn't need them.
const COMING_SOON_COLOR = "#6b7280";

function ProjectListRow({ project }: { project: Project }) {
  const navigable = isProjectNavigable(project);
  const href = getProjectHref(project);

  const thumb = (
    <div
      className="relative w-full overflow-hidden group/thumb"
      style={{ aspectRatio: "16/9", backgroundColor: "var(--p-surface)" }}
    >
      {project.image ? (
        <ImageWithFallback
          src={project.image}
          alt=""
          className={`w-full h-full object-cover transition-all duration-500 ${
            project.comingSoon ? "grayscale opacity-80" : "grayscale group-hover/thumb:grayscale-0"
          }`}
        />
      ) : (
        <ImagePlaceholder className="w-full h-full" />
      )}
      {project.comingSoon && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
          aria-hidden
        >
          <span
            className="text-white uppercase px-3 py-1.5 border border-white/40"
            style={{ fontSize: "0.65rem", letterSpacing: "0.12em" }}
          >
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 -mx-4 px-4 transition-colors duration-200"
      style={{
        borderBottom: "1px solid var(--p-divide)",
        cursor: project.comingSoon ? "not-allowed" : undefined,
      }}
      aria-label={project.comingSoon ? `${project.title}, coming soon` : project.title}
      aria-disabled={project.comingSoon || undefined}
      onMouseEnter={(e) => {
        if (!project.comingSoon) e.currentTarget.style.backgroundColor = "var(--p-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <div className="md:col-span-1 flex items-center">
        <span style={{ fontSize: "0.72rem", color: "var(--p-fg-35)" }}>{project.year}</span>
      </div>
      <div className="md:col-span-3">
        {navigable && href ? (
          <Link to={href} className="block w-full" tabIndex={-1} aria-hidden>
            {thumb}
          </Link>
        ) : (
          thumb
        )}
      </div>
      <div className="md:col-span-4 flex flex-col justify-center gap-1">
        {navigable && href ? (
          <Link to={href}>
            <h3
              style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--p-fg)" }}
              className="group-hover:opacity-50 transition-opacity"
            >
              {project.title}
              <span style={{ fontWeight: 300, color: "var(--p-fg-35)", marginLeft: "0.375rem" }}>
                — {project.subtitle}
              </span>
            </h3>
          </Link>
        ) : (
          <h3 style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--p-fg)" }}>
            {project.title}
            <span style={{ fontWeight: 300, color: "var(--p-fg-35)", marginLeft: "0.375rem" }}>
              — {project.subtitle}
            </span>
          </h3>
        )}
        <p style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "var(--p-fg-45)" }}>
          {project.description}
        </p>
      </div>
      <div className="md:col-span-2 flex flex-col justify-center gap-2">
        <p style={{ fontSize: "0.72rem", color: ACCENT + "99" }}>{project.role}</p>
        {project.comingSoon && (
          <span
            className="inline-block px-2 py-0.5 w-fit"
            style={{
              fontSize: "0.62rem",
              fontWeight: 500,
              color: "#fff",
              backgroundColor: COMING_SOON_COLOR + "E6",
            }}
          >
            {project.status}
          </span>
        )}
      </div>
      <div className="md:col-span-2 flex flex-col justify-center gap-3">
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5"
              style={{
                fontSize: "0.65rem",
                border: `1px solid ${ACCENT}30`,
                color: ACCENT,
                backgroundColor: ACCENT + "0A",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {!project.comingSoon && (
          <div className="flex items-center gap-3">
            {href && (
              <Link to={href} style={{ fontSize: "0.7rem", color: ACCENT }}>
                Case study →
              </Link>
            )}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1"
                style={{ fontSize: "0.7rem", color: "var(--p-fg-35)" }}
              >
                <Github size={11} />
                GitHub
              </a>
            ) : null}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1"
                style={{ fontSize: "0.7rem", color: "var(--p-fg-35)" }}
              >
                <ExternalLink size={11} />
                Live
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export function AllProjects() {
  const [activeTag, setActiveTag] = useState("All");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const visible = allProjects.filter(
    (p) => activeTag === "All" || p.tags.includes(activeTag),
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-10">
          <Link
            to="/"
            className="transition-colors duration-200"
            style={{ fontSize: "0.75rem", color: "var(--p-fg-35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-35)")}
          >
            Home
          </Link>
          <span style={{ fontSize: "0.75rem", color: "var(--p-fg-18)" }}>/</span>
          <span style={{ fontSize: "0.75rem", color: "var(--p-fg-45)" }}>All Projects</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span
              className="uppercase tracking-widest block mb-3"
              style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--p-fg-35)" }}
            >
              Work
            </span>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                color: "var(--p-fg)",
              }}
            >
              All Projects
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span style={{ fontSize: "0.75rem", color: "var(--p-fg-35)" }}>
              {visible.length} project{visible.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center ml-1" style={{ border: "1px solid var(--p-fg-12)" }}>
              <button
                type="button"
                onClick={() => setLayout("grid")}
                className="p-2 transition-colors duration-150"
                style={{ backgroundColor: layout === "grid" ? ACCENT : "transparent" }}
                title="Grid view"
                aria-pressed={layout === "grid"}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <rect x="0" y="0" width="6" height="6" fill={layout === "grid" ? "#fff" : "var(--p-fg-45)"} />
                  <rect x="8" y="0" width="6" height="6" fill={layout === "grid" ? "#fff" : "var(--p-fg-45)"} />
                  <rect x="0" y="8" width="6" height="6" fill={layout === "grid" ? "#fff" : "var(--p-fg-45)"} />
                  <rect x="8" y="8" width="6" height="6" fill={layout === "grid" ? "#fff" : "var(--p-fg-45)"} />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setLayout("list")}
                className="p-2 transition-colors duration-150"
                style={{ backgroundColor: layout === "list" ? ACCENT : "transparent" }}
                title="List view"
                aria-pressed={layout === "list"}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <rect x="0" y="0" width="14" height="2.5" fill={layout === "list" ? "#fff" : "var(--p-fg-45)"} />
                  <rect x="0" y="5.5" width="14" height="2.5" fill={layout === "list" ? "#fff" : "var(--p-fg-45)"} />
                  <rect x="0" y="11" width="14" height="2.5" fill={layout === "list" ? "#fff" : "var(--p-fg-45)"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="px-6 md:px-12 max-w-6xl mx-auto pt-6 pb-12"
        style={{ borderTop: "1px solid var(--p-divide)" }}
      >
        <div className="flex flex-wrap gap-2">
          {ALL_PROJECT_TAGS.map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className="px-3 py-1.5 border transition-all duration-200"
                style={{
                  fontSize: "0.72rem",
                  fontWeight: active ? 500 : 400,
                  backgroundColor: active ? ACCENT : "transparent",
                  borderColor: active ? ACCENT : "var(--p-fg-12)",
                  color: active ? "#fff" : "var(--p-fg-45)",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-6xl mx-auto pb-28">
        {layout === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} variant="grid" />
            ))}
          </div>
        ) : (
          <div style={{ borderTop: "1px solid var(--p-divide)" }}>
            {visible.map((project) => (
              <ProjectListRow key={project.id} project={project} />
            ))}
          </div>
        )}

        {visible.length === 0 && (
          <div className="py-24 text-center">
            <p style={{ fontSize: "0.9rem", color: "var(--p-fg-25)" }}>No projects match this filter.</p>
            <button
              type="button"
              onClick={() => setActiveTag("All")}
              className="mt-4 transition-colors duration-200"
              style={{ fontSize: "0.82rem", color: ACCENT, borderBottom: `1px solid ${ACCENT}` }}
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
