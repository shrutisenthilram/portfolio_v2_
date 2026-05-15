import { useState, useRef, type MouseEvent } from "react";
import { Link } from "react-router";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "../data/projects";
import { getProjectHref, isProjectNavigable } from "../data/projects";
import { getTagColor, INDIGO, CORAL } from "../data/tagColors";
import { useMotionProfile } from "./motion/useMotionProfile";

const ACCENT = INDIGO;

const STATUS_COLORS: Record<string, string> = {
  Featured: INDIGO,
  "Case Study": "#059669",
  Live: "#0891b2",
  "Open Source": "#7c3aed",
  Experiment: "#d97706",
  "Coming Soon": "#6b7280",
  "Small Case Study": "#0d9488",
};

type ProjectCardProps = {
  project: Project;
  variant?: "featured" | "grid";
  visible?: boolean;
};

export function ProjectCard({ project, variant = "grid", visible = true }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [hovered, setHovered] = useState(false);
  const { prefersReducedMotion, intensityScale, isFinePointer } = useMotionProfile();

  const navigable = isProjectNavigable(project);
  const href = getProjectHref(project);
  const cornerColor = getTagColor(project.tags[0] ?? "");
  const statusColor = STATUS_COLORS[project.status] ?? "#999";
  const tiltMax = (variant === "featured" ? 12 : 10) * intensityScale;

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!isFinePointer || prefersReducedMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (y - 0.5) * -tiltMax,
      rotateY: (x - 0.5) * tiltMax,
      glareX: x * 100,
      glareY: y * 100,
    });
  };

  const resetInteraction = () => {
    setHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const imageTransform =
    hovered && isFinePointer && !prefersReducedMotion
      ? `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${navigable ? 1.02 : 1.01})`
      : "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

  const transformTransition = prefersReducedMotion
    ? "none"
    : hovered
      ? "transform 0.08s ease-out"
      : "transform 0.5s ease-out";

  const overlayLabel = project.comingSoon ? "Coming Soon" : "View Case Study →";

  const imageBlock = (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: variant === "featured" ? "4/3" : "16/10",
        backgroundColor: "var(--p-surface)",
        marginBottom: variant === "featured" ? "1.25rem" : "1rem",
      }}
    >
      <img
        src={project.image}
        alt=""
        className={`w-full h-full object-cover transition-all duration-700 ${
          project.comingSoon
            ? "grayscale opacity-80"
            : "grayscale group-hover:scale-105 group-hover:grayscale-0"
        }`}
      />
      {!prefersReducedMotion && navigable && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.3) 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
      )}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          backgroundColor: project.comingSoon ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.68)",
          opacity: hovered ? 1 : 0,
          transition: prefersReducedMotion ? "opacity 0.15s" : "opacity 0.3s",
          backdropFilter: project.comingSoon ? "blur(2px)" : undefined,
          WebkitBackdropFilter: project.comingSoon ? "blur(2px)" : undefined,
        }}
        aria-hidden
      >
        <span
          className="text-white border border-white/50 px-5 py-2.5 uppercase"
          style={{
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            backgroundColor: project.comingSoon ? "rgba(0,0,0,0.35)" : ACCENT + "CC",
          }}
        >
          {overlayLabel}
        </span>
      </div>
      <div
        className="absolute top-3 right-3 md:top-4 md:right-4 px-2 py-0.5"
        style={{ fontSize: "0.62rem", color: "var(--p-fg-35)", backgroundColor: "var(--p-bg)" }}
      >
        {project.year}
      </div>
      {variant === "featured" && project.featured && !project.comingSoon ? (
        <div
          className="absolute top-3 left-3 md:top-4 md:left-4 px-2 py-0.5 flex items-center gap-1.5"
          style={{
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: CORAL,
            backgroundColor: CORAL + "15",
            border: `1px solid ${CORAL}30`,
          }}
        >
          ★ FEATURED
        </div>
      ) : (
        <div
          className="absolute top-3 left-3 md:top-4 md:left-4 px-2 py-0.5"
          style={{
            fontSize: "0.62rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "#fff",
            backgroundColor: statusColor + "E6",
          }}
        >
          {project.status}
        </div>
      )}
    </div>
  );

  const imageWrapper = (
    <div
      style={{
        transform: imageTransform,
        transition: transformTransition,
        transformStyle: "preserve-3d",
      }}
    >
      {imageBlock}
    </div>
  );

  return (
    <article
      ref={cardRef}
      className="group relative"
      aria-label={project.comingSoon ? `${project.title}, coming soon` : `${project.title}, view project`}
      aria-disabled={project.comingSoon || undefined}
      style={{
        opacity: visible ? 1 : 0.08,
        transform: visible ? "scale(1)" : "scale(0.97)",
        transition: prefersReducedMotion
          ? "opacity 0.2s ease"
          : "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.35s ease",
        pointerEvents: visible ? "auto" : "none",
        boxShadow: hovered && navigable ? `0 4px 16px ${ACCENT}1A, 0 12px 40px ${CORAL}14` : "none",
        cursor: project.comingSoon ? "not-allowed" : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetInteraction}
      onFocus={() => setHovered(true)}
      onBlur={resetInteraction}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: hovered ? 22 : 16,
          height: hovered ? 22 : 16,
          borderTop: `2px solid ${cornerColor}`,
          borderLeft: `2px solid ${cornerColor}`,
          zIndex: 2,
          transition: prefersReducedMotion ? "none" : "all 0.3s ease",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: hovered ? 22 : 16,
          height: hovered ? 22 : 16,
          borderBottom: `2px solid ${cornerColor}22`,
          borderRight: `2px solid ${cornerColor}22`,
          zIndex: 2,
          transition: prefersReducedMotion ? "none" : "all 0.3s ease",
          pointerEvents: "none",
        }}
      />

      {navigable && href ? (
        <Link to={href} className="block" tabIndex={-1} aria-hidden>
          {imageWrapper}
        </Link>
      ) : (
        imageWrapper
      )}

      {navigable && href ? (
        <Link to={href} className="block group/title mb-1">
          <h3
            className="transition-opacity duration-200 group-hover/title:opacity-50"
            style={{
              fontSize: variant === "featured" ? "0.95rem" : "0.92rem",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--p-fg)",
            }}
          >
            {project.title}
            {variant === "grid" && (
              <span style={{ fontWeight: 300, color: "var(--p-fg-35)", marginLeft: "0.375rem" }}>
                — {project.subtitle}
              </span>
            )}
          </h3>
        </Link>
      ) : (
        <h3
          className="mb-1"
          style={{
            fontSize: variant === "featured" ? "0.95rem" : "0.92rem",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--p-fg)",
          }}
        >
          {project.title}
          {variant === "grid" && (
            <span style={{ fontWeight: 300, color: "var(--p-fg-35)", marginLeft: "0.375rem" }}>
              — {project.subtitle}
            </span>
          )}
        </h3>
      )}

      <p
        className="mb-3"
        style={{
          fontSize: variant === "featured" ? "0.82rem" : "0.78rem",
          lineHeight: 1.6,
          color: "var(--p-fg-45)",
        }}
      >
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
                color,
                backgroundColor: color + "12",
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {project.comingSoon ? (
        <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", fontStyle: "italic" }}>
          Case study in progress
        </p>
      ) : (
        <div className="flex items-center gap-4 flex-wrap">
          {href && (
            <Link
              to={href}
              style={{ fontSize: "0.72rem", color: ACCENT, borderBottom: `1px solid ${ACCENT}40` }}
              onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = ACCENT + "40")}
            >
              Case study →
            </Link>
          )}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors duration-200"
              style={{ fontSize: "0.72rem", color: "var(--p-fg-35)" }}
            >
              <Github size={12} />
              GitHub
            </a>
          ) : null}
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors duration-200"
              style={{ fontSize: "0.72rem", color: "var(--p-fg-35)" }}
            >
              <ExternalLink size={12} />
              Live
            </a>
          ) : null}
        </div>
      )}
    </article>
  );
}
