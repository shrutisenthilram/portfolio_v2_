import { useState, useRef } from "react";
import { Link } from "react-router";
import { Github, ExternalLink } from "lucide-react";
import { allProjects } from "../data/projects";
import { getTagColor, INDIGO, CORAL } from "../data/tagColors";

const ACCENT = INDIGO;
const ALL_TAGS = ["All", "AI", "Product Design", "Data", "Web", "Mobile", "AR", "Open Source"];

const STATUS_COLORS: Record<string, string> = {
  Featured:     INDIGO,
  "Case Study": "#059669",
  Live:         "#0891b2",
  "Open Source":"#7c3aed",
  Experiment:   "#d97706",
};

function ProjectCard({ project }: { project: typeof allProjects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rotateX: (y - 0.5) * -10, rotateY: (x - 0.5) * 10, glareX: x * 100, glareY: y * 100 });
  };

  const statusColor = STATUS_COLORS[project.status] ?? "#999";
  const cornerColor = getTagColor(project.tags[0] ?? "");

  return (
    <div
      ref={cardRef}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
      }}
      style={{
        transition: "box-shadow 0.35s ease",
        boxShadow: hovered ? `0 4px 16px ${ACCENT}1A, 0 12px 40px ${CORAL}14` : "none",
        position: "relative",
      }}
    >
      {/* Accent corner brackets */}
      <div style={{ position: "absolute", top: 0, left: 0, width: hovered ? 22 : 16, height: hovered ? 22 : 16, borderTop: `2px solid ${cornerColor}`, borderLeft: `2px solid ${cornerColor}`, zIndex: 2, transition: "all 0.3s ease", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: hovered ? 22 : 16, height: hovered ? 22 : 16, borderBottom: `2px solid ${cornerColor}22`, borderRight: `2px solid ${cornerColor}22`, zIndex: 2, transition: "all 0.3s ease", pointerEvents: "none" }} />

      <Link to={`/projects/${project.slug}`} className="block">
        <div
          style={{
            transform: hovered
              ? `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.02)`
              : "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
            transition: hovered ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="relative overflow-hidden mb-4"
            style={{ aspectRatio: "16/10", backgroundColor: "var(--p-surface)" }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.3) 0%, transparent 65%)`,
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{ backgroundColor: "rgba(0,0,0,0.68)", opacity: hovered ? 1 : 0 }}
            >
              <span
                className="text-white border border-white/40 px-5 py-2.5 uppercase"
                style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.12em", backgroundColor: ACCENT + "CC" }}
              >
                View Case Study →
              </span>
            </div>
            <div
              className="absolute top-3 left-3 px-2 py-0.5"
              style={{ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.08em", color: "#fff", backgroundColor: statusColor + "E6" }}
            >
              {project.status}
            </div>
            <div
              className="absolute top-3 right-3 px-2 py-0.5"
              style={{ fontSize: "0.62rem", color: "var(--p-fg-35)", backgroundColor: "var(--p-bg)" }}
            >
              {project.year}
            </div>
          </div>
        </div>
      </Link>

      <Link to={`/projects/${project.slug}`} className="block group/title">
        <h3
          className="mb-1 transition-opacity duration-200 group-hover/title:opacity-50"
          style={{ fontSize: "0.92rem", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--p-fg)" }}
        >
          {project.title}
          <span style={{ fontWeight: 300, color: "var(--p-fg-35)", marginLeft: "0.375rem" }}>— {project.subtitle}</span>
        </h3>
      </Link>

      <p className="mb-2 line-clamp-2" style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "var(--p-fg-35)" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map((tag) => {
          const color = getTagColor(tag);
          return (
            <span
              key={tag}
              className="px-2 py-0.5"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.04em",
                border: `1px solid ${color}50`,
                color: color,
                backgroundColor: color + "10",
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <Link
          to={`/projects/${project.slug}`}
          style={{ fontSize: "0.72rem", color: ACCENT, borderBottom: `1px solid ${ACCENT}40` }}
          onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = ACCENT)}
          onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = ACCENT + "40")}
        >
          Case study →
        </Link>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 transition-colors duration-200"
          style={{ fontSize: "0.72rem", color: "var(--p-fg-35)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p-fg)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-35)")}
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={12} />
          GitHub
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors duration-200"
            style={{ fontSize: "0.72rem", color: "var(--p-fg-35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p-fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-35)")}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={12} />
            Live
          </a>
        )}
      </div>
    </div>
  );
}

export function AllProjects() {
  const [activeTag, setActiveTag] = useState("All");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const visible = allProjects.filter(
    (p) => activeTag === "All" || p.tags.includes(activeTag)
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Page header */}
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-10">
          <Link
            to="/"
            className="transition-colors duration-200"
            style={{ fontSize: "0.75rem", color: "var(--p-fg-35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-35)")}
          >
            Alex Chen
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
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "-0.03em", color: "var(--p-fg)" }}
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
                onClick={() => setLayout("grid")}
                className="p-2 transition-colors duration-150"
                style={{ backgroundColor: layout === "grid" ? ACCENT : "transparent" }}
                title="Grid view"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="0" y="0" width="6" height="6" fill={layout === "grid" ? "#fff" : "var(--p-fg-45)"} />
                  <rect x="8" y="0" width="6" height="6" fill={layout === "grid" ? "#fff" : "var(--p-fg-45)"} />
                  <rect x="0" y="8" width="6" height="6" fill={layout === "grid" ? "#fff" : "var(--p-fg-45)"} />
                  <rect x="8" y="8" width="6" height="6" fill={layout === "grid" ? "#fff" : "var(--p-fg-45)"} />
                </svg>
              </button>
              <button
                onClick={() => setLayout("list")}
                className="p-2 transition-colors duration-150"
                style={{ backgroundColor: layout === "list" ? ACCENT : "transparent" }}
                title="List view"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="0" y="0" width="14" height="2.5" fill={layout === "list" ? "#fff" : "var(--p-fg-45)"} />
                  <rect x="0" y="5.5" width="14" height="2.5" fill={layout === "list" ? "#fff" : "var(--p-fg-45)"} />
                  <rect x="0" y="11" width="14" height="2.5" fill={layout === "list" ? "#fff" : "var(--p-fg-45)"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tag filters */}
      <div
        className="px-6 md:px-12 max-w-6xl mx-auto pt-6 pb-12"
        style={{ borderTop: "1px solid var(--p-divide)" }}
      >
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
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

      {/* Projects */}
      <div className="px-6 md:px-12 max-w-6xl mx-auto pb-28">
        {layout === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div style={{ borderTop: "1px solid var(--p-divide)" }}>
            {visible.map((project) => (
              <div
                key={project.id}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 -mx-4 px-4 transition-colors duration-200"
                style={{ borderBottom: "1px solid var(--p-divide)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--p-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="md:col-span-1 flex items-center">
                  <span style={{ fontSize: "0.72rem", color: "var(--p-fg-35)" }}>{project.year}</span>
                </div>
                <div className="md:col-span-3">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="block w-full overflow-hidden"
                    style={{ aspectRatio: "16/9", backgroundColor: "var(--p-surface)" }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </Link>
                </div>
                <div className="md:col-span-4 flex flex-col justify-center gap-1">
                  <Link to={`/projects/${project.slug}`}>
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
                  <p style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "var(--p-fg-45)" }}>
                    {project.description}
                  </p>
                </div>
                <div className="md:col-span-2 flex flex-col justify-center gap-2">
                  <p style={{ fontSize: "0.72rem", color: ACCENT + "99" }}>{project.role}</p>
                  <span
                    className="inline-block px-2 py-0.5 w-fit"
                    style={{ fontSize: "0.62rem", fontWeight: 500, color: "#fff", backgroundColor: (STATUS_COLORS[project.status] ?? "#999") + "E6" }}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="md:col-span-2 flex flex-col justify-center gap-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5"
                        style={{ fontSize: "0.65rem", border: `1px solid ${ACCENT}30`, color: ACCENT, backgroundColor: ACCENT + "0A" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors duration-200"
                      style={{ fontSize: "0.7rem", color: "var(--p-fg-35)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p-fg)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-35)")}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={11} />
                      GitHub
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 transition-colors duration-200"
                        style={{ fontSize: "0.7rem", color: "var(--p-fg-35)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p-fg)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-35)")}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={11} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {visible.length === 0 && (
          <div className="py-24 text-center">
            <p style={{ fontSize: "0.9rem", color: "var(--p-fg-25)" }}>No projects match this filter.</p>
            <button
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