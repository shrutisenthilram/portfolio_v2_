import * as React from "react";
import { useMemo } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { CaseStudy, SectionDef } from "./types";
import { CaseSidebar, MobileSectionNav } from "./Sidebar";
import { useScrollSpy } from "./useScrollSpy";
import { MetaPair, fadeInOnView } from "./primitives";
import {
  OverviewSection,
  ProblemSection,
  ContextSection,
  ResearchSection,
  StrategySection,
  ArchitectureSection,
  IdeationSection,
  FlowsSection,
  DesignSystemSection,
  IterationSection,
  FinalSolutionSection,
  OutcomesSection,
} from "./sections";

const ACCENT = "#4338CA";

const SECTION_ORDER: {
  id: string;
  number: string;
  label: string;
  shortLabel?: string;
  key: keyof Omit<CaseStudy, "slug" | "title" | "subtitle" | "tagline" | "year" | "status" | "heroImage" | "heroVideo" | "client" | "links" | "meta">;
}[] = [
  { id: "overview", number: "01", label: "Overview", key: "overview" },
  { id: "problem", number: "02", label: "Problem", key: "problem" },
  { id: "context", number: "03", label: "Context & Constraints", shortLabel: "Context", key: "context" },
  { id: "research", number: "04", label: "Research", key: "research" },
  { id: "strategy", number: "05", label: "Product Strategy", shortLabel: "Strategy", key: "strategy" },
  { id: "architecture", number: "06", label: "System Design", shortLabel: "Architecture", key: "architecture" },
  { id: "ideation", number: "07", label: "Ideation", key: "ideation" },
  { id: "flows", number: "08", label: "Core Flows", shortLabel: "Flows", key: "flows" },
  { id: "design-system", number: "09", label: "Design System", key: "designSystem" },
  { id: "iteration", number: "10", label: "Iteration", key: "iteration" },
  { id: "final", number: "11", label: "Final Solution", shortLabel: "Final", key: "finalSolution" },
  { id: "outcomes", number: "12", label: "Outcomes", key: "outcomes" },
];

export function CaseStudyShell({
  study,
  prev,
  next,
}: {
  study: CaseStudy;
  prev?: { slug: string; title: string; subtitle: string } | null;
  next?: { slug: string; title: string; subtitle: string } | null;
}) {
  // Only show sections that have actual data
  const present: SectionDef[] = useMemo(
    () =>
      SECTION_ORDER.filter((s) => Boolean(study[s.key])).map((s) => ({
        id: s.id,
        number: s.number,
        label: s.label,
        shortLabel: s.shortLabel,
      })),
    [study],
  );

  const activeId = useScrollSpy(present.map((s) => s.id));

  return (
    <article style={{ fontFamily: "'Inter', sans-serif" }}>
      <ImmersiveHero study={study} />

      <MobileSectionNav sections={present} activeId={activeId} />

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-x-14">
          <CaseSidebar
            sections={present}
            activeId={activeId}
            projectTitle={study.title}
            projectSubtitle={study.subtitle}
          />

          <main className="min-w-0 py-2 lg:py-6">
            <MetaRow study={study} />

            {study.overview && <OverviewSection data={study.overview} />}
            {study.problem && <ProblemSection data={study.problem} />}
            {study.context && <ContextSection data={study.context} />}
            {study.research && <ResearchSection data={study.research} />}
            {study.strategy && <StrategySection data={study.strategy} />}
            {study.architecture && <ArchitectureSection data={study.architecture} />}
            {study.ideation && <IdeationSection data={study.ideation} />}
            {study.flows && <FlowsSection data={study.flows} />}
            {study.designSystem && <DesignSystemSection data={study.designSystem} />}
            {study.iteration && <IterationSection data={study.iteration} />}
            {study.finalSolution && <FinalSolutionSection data={study.finalSolution} />}
            {study.outcomes && <OutcomesSection data={study.outcomes} />}
          </main>
        </div>
      </div>

      <FooterNav prev={prev} next={next} />
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Immersive hero
// ─────────────────────────────────────────────────────────────────────────────

function ImmersiveHero({ study }: { study: CaseStudy }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imgScale = useTransform(scrollY, [0, 600], [1.02, 1.12]);
  const imgY = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section
      aria-label="Project hero"
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(420px, 64vw, 720px)",
        backgroundColor: "var(--p-surface)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={
          reduce
            ? undefined
            : {
                scale: imgScale,
                y: imgY,
              }
        }
      >
        {study.heroVideo ? (
          <video
            src={study.heroVideo}
            poster={study.heroImage}
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={study.heroImage}
            alt={study.title}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 75%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 pb-10 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3 mb-4"
          >
            {study.client && (
              <span
                className="uppercase"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {study.client}
              </span>
            )}
            <span
              className="uppercase px-2 py-0.5"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {study.status}
            </span>
            <span
              className="px-2 py-0.5"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.85)",
                backgroundColor: "rgba(0,0,0,0.35)",
              }}
            >
              {study.year}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.06,
            }}
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.8rem)",
              fontWeight: 300,
              letterSpacing: "-0.034em",
              lineHeight: 1.04,
              color: "#fff",
              maxWidth: "20ch",
            }}
          >
            {study.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.14,
            }}
            className="mt-3 max-w-2xl"
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.5,
            }}
          >
            {study.tagline ?? study.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Meta row — role, timeline, team, stack, impact (under hero, before sections)
// ─────────────────────────────────────────────────────────────────────────────

function MetaRow({ study }: { study: CaseStudy }) {
  return (
    <motion.section
      {...fadeInOnView}
      className="py-10 md:py-14"
      aria-label="Project metadata"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6 md:gap-x-10">
        <MetaPair label="Role" value={study.meta.role} />
        <MetaPair label="Timeline" value={study.meta.timeline} />
        <MetaPair label="Team" value={study.meta.team} />
        {study.meta.platform && (
          <MetaPair label="Platform" value={study.meta.platform} />
        )}
        <MetaPair
          label="Stack"
          value={
            <span className="flex flex-wrap gap-1">
              {study.meta.stack.slice(0, 4).map((tech, i) => (
                <span key={tech}>
                  {tech}
                  {i < Math.min(study.meta.stack.length, 4) - 1 && (
                    <span style={{ color: "var(--p-fg-25)" }}> ·</span>
                  )}
                </span>
              ))}
              {study.meta.stack.length > 4 && (
                <span style={{ color: "var(--p-fg-35)" }}>
                  +{study.meta.stack.length - 4}
                </span>
              )}
            </span>
          }
        />
        <MetaPair
          label="Impact"
          value={
            <span style={{ color: ACCENT, letterSpacing: "-0.005em" }}>
              {study.meta.impact}
            </span>
          }
        />
      </div>

      {study.links && study.links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2.5">
          {study.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 transition-colors duration-200 hover:opacity-80"
              style={{
                fontSize: "0.78rem",
                color: "var(--p-fg-65)",
                border: "1px solid var(--p-divide)",
              }}
            >
              {l.label}
              <ExternalLink size={12} />
            </a>
          ))}
        </div>
      )}
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer prev/next
// ─────────────────────────────────────────────────────────────────────────────

function FooterNav({
  prev,
  next,
}: {
  prev?: { slug: string; title: string; subtitle: string } | null;
  next?: { slug: string; title: string; subtitle: string } | null;
}) {
  return (
    <div
      className="mt-8"
      style={{ borderTop: "1px solid var(--p-divide)" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 sm:grid-cols-2">
        <div
          className="sm:border-r"
          style={{ borderColor: "var(--p-divide)" }}
        >
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="group flex flex-col gap-1.5 py-10 sm:pr-8 transition-opacity duration-200 hover:opacity-60"
            >
              <span
                className="inline-flex items-center gap-1.5 uppercase"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  color: "var(--p-fg-35)",
                }}
              >
                <ArrowLeft size={11} /> Previous
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--p-fg)",
                }}
              >
                {prev.title}
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--p-fg-35)" }}>
                {prev.subtitle}
              </span>
            </Link>
          ) : (
            <div className="py-10">
              <span style={{ fontSize: "0.66rem", color: "var(--p-fg-18)" }}>
                First project
              </span>
            </div>
          )}
        </div>
        <div>
          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="group flex flex-col gap-1.5 sm:items-end py-10 sm:pl-8 transition-opacity duration-200 hover:opacity-60"
            >
              <span
                className="inline-flex items-center gap-1.5 uppercase"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  color: "var(--p-fg-35)",
                }}
              >
                Next <ArrowRight size={11} />
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--p-fg)",
                }}
              >
                {next.title}
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--p-fg-35)" }}>
                {next.subtitle}
              </span>
            </Link>
          ) : (
            <div className="flex justify-end py-10 sm:pl-8">
              <span style={{ fontSize: "0.66rem", color: "var(--p-fg-18)" }}>
                Last project
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
