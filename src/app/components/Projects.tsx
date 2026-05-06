import { useState, useRef } from "react";
import { Link } from "react-router";
import { Github } from "lucide-react";
import { allProjects } from "../data/projects";
import { getTagColor, INDIGO, CORAL } from "../data/tagColors";

const ACCENT = INDIGO;
const ALL_TAGS = ["All", "AI", "Product Design", "Data", "Web", "Mobile", "AR"];
const featuredProjects = allProjects.slice(0, 4);

function TiltCard({
  project,
  visible,
}: {
  project: typeof allProjects[0];
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rotateX: (y - 0.5) * -12, rotateY: (x - 0.5) * 12, glareX: x * 100, glareY: y * 100 });
  };

  const cornerColor = getTagColor(project.tags[0] ?? "");

  return (
    <div
      ref={cardRef}
      className="group"
      style={{
        opacity: visible ? 1 : 0.08,
        transform: visible ? "scale(1)" : "scale(0.97)",
        transition: "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.35s ease",
        pointerEvents: visible ? "auto" : "none",
        boxShadow: hovered ? `0 4px 16px ${ACCENT}1A, 0 12px 40px ${CORAL}14` : "none",
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
      }}
    >
      {/* Accent corner brackets */}
      <div style={{ position: "absolute", top: 0, left: 0, width: hovered ? 22 : 16, height: hovered ? 22 : 16, borderTop: `2px solid ${cornerColor}`, borderLeft: `2px solid ${cornerColor}`, zIndex: 2, transition: "all 0.3s ease", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: hovered ? 22 : 16, height: hovered ? 22 : 16, borderBottom: `2px solid ${cornerColor}22`, borderRight: `2px solid ${cornerColor}22`, zIndex: 2, transition: "all 0.3s ease", pointerEvents: "none" }} />

      {/* Image */}
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
            className="relative overflow-hidden mb-5"
            style={{ aspectRatio: "4/3", backgroundColor: "var(--p-surface)" }}
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
              style={{ backgroundColor: "rgba(0,0,0,0.72)", opacity: hovered ? 1 : 0 }}
            >
              <span
                className="text-white border border-white/50 px-5 py-2.5 uppercase"
                style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.12em", backgroundColor: ACCENT + "CC" }}
              >
                View Case Study →
              </span>
            </div>
            <div
              className="absolute top-4 right-4 px-2 py-0.5"
              style={{ fontSize: "0.65rem", color: "var(--p-fg-35)", backgroundColor: "var(--p-bg)" }}
            >
              {project.year}
            </div>
            {/* Featured badge */}
            <div
              className="absolute top-4 left-4 px-2 py-0.5 flex items-center gap-1.5"
              style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em", color: CORAL, backgroundColor: CORAL + "15", border: `1px solid ${CORAL}30` }}
            >
              ★ FEATURED
            </div>
          </div>
        </div>
      </Link>

      {/* Info */}
      <Link to={`/projects/${project.slug}`} className="block group/title mb-1.5">
        <h3
          className="transition-opacity duration-200 group-hover/title:opacity-50"
          style={{ fontSize: "0.95rem", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--p-fg)" }}
        >
          {project.title}
        </h3>
      </Link>
      <p className="mb-3" style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "var(--p-fg-45)" }}>
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
                fontSize: "0.68rem",
                letterSpacing: "0.04em",
                border: `1px solid ${color}50`,
                color: color,
                backgroundColor: color + "12",
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
        >
          <Github size={12} />
          GitHub
        </a>
      </div>
    </div>
  );
}

export function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const isVisible = (p: typeof featuredProjects[0]) =>
    activeTag === "All" || p.tags.includes(activeTag);

  return (
    <section
      id="work"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="pt-10 pb-20 px-6 md:px-12 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div
        className="flex items-end justify-between mb-8 pb-5"
        style={{ borderBottom: "1px solid var(--p-divide)" }}
      >
        <div>
          <span
            className="tracking-widest uppercase block mb-3"
            style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--p-fg-35)" }}
          >
            Selected Work
          </span>
          <h2
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--p-fg)" }}
          >
            Featured Projects
            <span className="ml-3" style={{ fontSize: "0.95rem", fontWeight: 500, color: CORAL, verticalAlign: "middle" }}>
              04
            </span>
          </h2>
        </div>
        <Link
          to="/projects"
          className="hidden md:block pb-0.5 transition-all duration-200"
          style={{ fontSize: "0.82rem", fontWeight: 400, color: ACCENT, borderBottom: `1px solid ${ACCENT}` }}
        >
          All Projects →
        </Link>
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-9">
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
                backgroundColor: active ? ACCENT : ACCENT + "06",
                borderColor: active ? ACCENT : ACCENT + "30",
                color: active ? "#fff" : ACCENT,
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Staggered grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12 md:gap-y-16">
        <div className="md:col-span-7">
          <TiltCard project={featuredProjects[0]} visible={isVisible(featuredProjects[0])} />
        </div>
        <div className="md:col-span-5 md:mt-16">
          <TiltCard project={featuredProjects[1]} visible={isVisible(featuredProjects[1])} />
        </div>
        <div className="md:col-span-5">
          <TiltCard project={featuredProjects[2]} visible={isVisible(featuredProjects[2])} />
        </div>
        <div className="md:col-span-7 md:-mt-16">
          <TiltCard project={featuredProjects[3]} visible={isVisible(featuredProjects[3])} />
        </div>
      </div>

      <div className="mt-12 flex justify-center md:hidden">
        <Link
          to="/projects"
          className="px-6 py-3 border transition-all duration-200"
          style={{ fontSize: "0.82rem", color: ACCENT, borderColor: "var(--p-fg-12)" }}
        >
          All Projects →
        </Link>
      </div>
    </section>
  );
}