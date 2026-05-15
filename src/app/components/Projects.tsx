import { useState } from "react";
import { Link } from "react-router";
import { featuredProjects, ALL_PROJECT_TAGS } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { INDIGO, CORAL } from "../data/tagColors";

const ACCENT = INDIGO;

export function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const isVisible = (p: (typeof featuredProjects)[0]) =>
    activeTag === "All" || p.tags.includes(activeTag);

  const slots = [
    featuredProjects[0],
    featuredProjects[1],
    featuredProjects[2],
    featuredProjects[3],
  ].filter(Boolean);

  return (
    <section
      id="work"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="pt-14 pb-28 px-6 md:px-12 max-w-6xl mx-auto"
    >
      <div
        className="flex items-end justify-between mb-10 pb-6"
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
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "var(--p-fg)",
            }}
          >
            Featured Projects
            <span
              className="ml-3"
              style={{ fontSize: "0.95rem", fontWeight: 500, color: CORAL, verticalAlign: "middle" }}
            >
              {String(slots.length).padStart(2, "0")}
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

      <div className="flex flex-wrap gap-2 mb-12">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12 md:gap-y-16">
        {slots[0] && (
          <div className="md:col-span-7">
            <ProjectCard project={slots[0]} variant="featured" visible={isVisible(slots[0])} />
          </div>
        )}
        {slots[1] && (
          <div className="md:col-span-5 md:mt-16">
            <ProjectCard project={slots[1]} variant="featured" visible={isVisible(slots[1])} />
          </div>
        )}
        {slots[2] && (
          <div className="md:col-span-5">
            <ProjectCard project={slots[2]} variant="featured" visible={isVisible(slots[2])} />
          </div>
        )}
        {slots[3] && (
          <div className="md:col-span-7 md:-mt-16">
            <ProjectCard project={slots[3]} variant="featured" visible={isVisible(slots[3])} />
          </div>
        )}
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
