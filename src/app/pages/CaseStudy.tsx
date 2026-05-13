import { useParams, Link, useNavigate } from "react-router";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { allProjects } from "../data/projects";

const ACCENT = "#4338CA";

const STATUS_COLORS: Record<string, string> = {
  Featured: ACCENT,
  "Case Study": "#059669",
  Live: "#0891b2",
  "Open Source": "#7c3aed",
  Experiment: "#d97706",
};

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const projectIndex = allProjects.findIndex(
    (p) => p.slug === slug,
  );
  const project = allProjects[projectIndex];

  if (!project) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--p-fg-25)",
          }}
        >
          Project not found.
        </p>
        <Link
          to="/projects"
          style={{ fontSize: "0.82rem", color: ACCENT }}
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  const prevProject = allProjects[projectIndex - 1] ?? null;
  const nextProject = allProjects[projectIndex + 1] ?? null;
  const statusColor = STATUS_COLORS[project.status] ?? "#999";

  return (
    <article style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero image */}
      <div
        className="w-full overflow-hidden"
        style={{
          height: "clamp(300px, 52vw, 580px)",
          backgroundColor: "var(--p-surface)",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-14 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10">
          {[
            { label: "Alex Chen", to: "/" },
            { label: "Projects", to: "/projects" },
          ].map(({ label, to }) => (
            <span key={to} className="flex items-center gap-2">
              <Link
                to={to}
                className="transition-colors duration-200"
                style={{
                  fontSize: "0.72rem",
                  color: "var(--p-fg-35)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = ACCENT)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "var(--p-fg-35)")
                }
              >
                {label}
              </Link>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "var(--p-fg-18)",
                }}
              >
                /
              </span>
            </span>
          ))}
          <span
            style={{
              fontSize: "0.72rem",
              color: "var(--p-fg-45)",
            }}
          >
            {project.title}
          </span>
        </div>

        {/* Status + year */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="px-2 py-0.5"
            style={{
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "#fff",
              backgroundColor: statusColor + "E6",
            }}
          >
            {project.status}
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              color: "var(--p-fg-35)",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h1
          className="mb-2"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--p-fg)",
          }}
        >
          {project.title}
        </h1>
        <p
          className="mb-8"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            fontWeight: 300,
            letterSpacing: "-0.01em",
            color: "var(--p-fg-35)",
          }}
        >
          {project.subtitle}
        </p>

        {/* Meta row */}
        <div
          className="flex flex-wrap gap-x-10 gap-y-4 mb-8 pb-8"
          style={{ borderBottom: "1px solid var(--p-divide)" }}
        >
          <div>
            <p
              className="uppercase mb-1"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                color: "var(--p-fg-35)",
              }}
            >
              Role
            </p>
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--p-fg-65)",
              }}
            >
              {project.role}
            </p>
          </div>
          <div>
            <p
              className="uppercase mb-1"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                color: "var(--p-fg-35)",
              }}
            >
              Year
            </p>
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--p-fg-65)",
              }}
            >
              {project.year}
            </p>
          </div>
          <div>
            <p
              className="uppercase mb-1"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                color: "var(--p-fg-35)",
              }}
            >
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
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
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 transition-all duration-200"
            style={{
              fontSize: "0.78rem",
              color: "var(--p-fg-45)",
              border: "1px solid var(--p-fg-12)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--p-fg)";
              e.currentTarget.style.color = "var(--p-fg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "var(--p-fg-12)";
              e.currentTarget.style.color = "var(--p-fg-45)";
            }}
          >
            <Github size={14} />
            View on GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-white transition-opacity duration-200 hover:opacity-80"
              style={{
                fontSize: "0.78rem",
                backgroundColor: ACCENT,
              }}
            >
              <ExternalLink size={14} />
              View Live
            </a>
          )}
        </div>
      </div>

      {/* Overview */}
      <div
        className="max-w-3xl mx-auto px-6 md:px-12 py-12"
        style={{ borderTop: "1px solid var(--p-divide)" }}
      >
        <p
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            fontWeight: 300,
            lineHeight: 1.85,
            letterSpacing: "-0.005em",
            color: "var(--p-fg)",
          }}
        >
          {project.overview}
        </p>
      </div>

      {/* Secondary image 1 */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-4">
        <div
          className="w-full overflow-hidden"
          style={{
            aspectRatio: "16/9",
            backgroundColor: "var(--p-surface)",
          }}
        >
          <img
            src={project.secondaryImages[0]}
            alt={`${project.title} process`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Problem + Solution */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-14">
          <span
            className="uppercase block mb-4"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              color: "var(--p-fg-35)",
            }}
          >
            The Problem
          </span>
          <p
            style={{
              fontSize: "0.95rem",
              fontWeight: 400,
              lineHeight: 1.85,
              color: "var(--p-fg-65)",
            }}
          >
            {project.problem}
          </p>
        </div>

        <div
          className="pt-14"
          style={{ borderTop: "1px solid var(--p-divide)" }}
        >
          <span
            className="uppercase block mb-4"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              color: "var(--p-fg-35)",
            }}
          >
            The Solution
          </span>
          <p
            style={{
              fontSize: "0.95rem",
              fontWeight: 400,
              lineHeight: 1.85,
              color: "var(--p-fg-65)",
            }}
          >
            {project.solution}
          </p>
        </div>
      </div>

      {/* Secondary image 2 */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-4">
        <div
          className="w-full overflow-hidden"
          style={{
            aspectRatio: "16/9",
            backgroundColor: "var(--p-surface)",
          }}
        >
          <img
            src={project.secondaryImages[1]}
            alt={`${project.title} detail`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Outcomes */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        <span
          className="uppercase block mb-8"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            color: "var(--p-fg-35)",
          }}
        >
          Outcomes
        </span>
        <ul className="space-y-4">
          {project.outcomes.map((outcome, i) => (
            <li key={i} className="flex items-start gap-4">
              <span
                className="mt-1 shrink-0 w-5 h-5 flex items-center justify-center"
                style={{
                  backgroundColor: ACCENT + "12",
                  color: ACCENT,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  color: "var(--p-fg-65)",
                }}
              >
                {outcome}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech stack */}
      <div
        className="max-w-3xl mx-auto px-6 md:px-12 py-12"
        style={{ borderTop: "1px solid var(--p-divide)" }}
      >
        <span
          className="uppercase block mb-6"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            color: "var(--p-fg-35)",
          }}
        >
          Tech Stack
        </span>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5"
              style={{
                fontSize: "0.72rem",
                border: "1px solid var(--p-fg-12)",
                color: "var(--p-fg-45)",
                backgroundColor: "var(--p-hover)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* GitHub CTA */}
      <div
        className="max-w-3xl mx-auto px-6 md:px-12 py-12"
        style={{ borderTop: "1px solid var(--p-divide)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p
              className="mb-1"
              style={{
                fontSize: "0.92rem",
                fontWeight: 500,
                color: "var(--p-fg)",
              }}
            >
              See how it's built
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--p-fg-35)",
              }}
            >
              Full source code, commit history, and
              documentation on GitHub.
            </p>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 transition-all duration-200 shrink-0"
            style={{
              fontSize: "0.8rem",
              color: "var(--p-fg-45)",
              border: "1px solid var(--p-fg-12)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ACCENT;
              e.currentTarget.style.color = ACCENT;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "var(--p-fg-12)";
              e.currentTarget.style.color = "var(--p-fg-45)";
            }}
          >
            <Github size={15} />
            github.com/alexchen/{project.slug}
          </a>
        </div>
      </div>

      {/* Prev / Next */}
      <div
        style={{ borderTop: "1px solid var(--p-divide)" }}
        className="mt-8"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-2">
          <div
            style={{ borderRight: "1px solid var(--p-divide)" }}
          >
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group flex flex-col gap-1.5 py-10 pr-8 transition-opacity duration-200 hover:opacity-60"
              >
                <span
                  className="inline-flex items-center gap-1.5"
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    color: "var(--p-fg-35)",
                  }}
                >
                  <ArrowLeft size={11} /> Previous
                </span>
                <span
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    color: "var(--p-fg)",
                  }}
                >
                  {prevProject.title}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--p-fg-35)",
                  }}
                >
                  {prevProject.subtitle}
                </span>
              </Link>
            ) : (
              <div className="py-10 pr-8">
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--p-fg-18)",
                  }}
                >
                  First project
                </span>
              </div>
            )}
          </div>
          <div>
            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group flex flex-col gap-1.5 items-end py-10 pl-8 transition-opacity duration-200 hover:opacity-60"
              >
                <span
                  className="inline-flex items-center gap-1.5"
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    color: "var(--p-fg-35)",
                  }}
                >
                  Next <ArrowRight size={11} />
                </span>
                <span
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    color: "var(--p-fg)",
                  }}
                >
                  {nextProject.title}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--p-fg-35)",
                  }}
                >
                  {nextProject.subtitle}
                </span>
              </Link>
            ) : (
              <div className="flex justify-end py-10 pl-8">
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--p-fg-18)",
                  }}
                >
                  Last project
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <button
          onClick={() => navigate("/projects")}
          className="inline-flex items-center gap-2 transition-colors duration-200"
          style={{
            fontSize: "0.78rem",
            color: "var(--p-fg-35)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = ACCENT)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--p-fg-35)")
          }
        >
          <ArrowLeft size={13} />
          All Projects
        </button>
      </div>
    </article>
  );
}