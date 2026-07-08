import * as React from "react";
import { useMemo } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { CaseStudy, CaseStudySectionKey, SectionDef } from "./types";
import { CaseSidebar, MobileSectionNav } from "./Sidebar";
import { useScrollSpy } from "./useScrollSpy";
import { FullCaseStudyBoard, MetaPair, PrototypeCTA, fadeInOnView } from "./primitives";
import { ImageWithFallback } from "../figma/ImageWithFallback";
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

// Indigo accent used for links, highlights, and the Impact meta value.
// Change this hex to retheme the whole case study page's accent color.
const ACCENT = "#4338CA";

// Master list of all 12 possible sections, in display order.
// "key" must match the field name on the CaseStudy type (from types.ts).
// Sections whose key is missing/undefined in the data are automatically hidden —
// you never need to manually toggle them off.
// To reorder sections, move entries around in this array.
// To rename a sidebar label, change "label" / "shortLabel".
const SECTION_ORDER: {
  id: string;       // DOM id used for scroll-to anchoring (e.g. #overview)
  number: string;   // Decorative number shown in section header and sidebar
  label: string;    // Full label (sidebar desktop + section header)
  shortLabel?: string; // Shorter label used on mobile pill nav if provided
  key: CaseStudySectionKey;
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

// ─────────────────────────────────────────────────────────────────────────────
// CaseStudyShell
// The top-level layout for every /projects/:slug page.
// It receives the fully-merged CaseStudy object (from caseStudies.ts → getCaseStudy)
// and renders: hero → mobile nav → sidebar + main content → footer nav.
//
// Props:
//   study  — the complete case study data object
//   prev   — previous project in the list (for footer navigation), or null
//   next   — next project in the list (for footer navigation), or null
// ─────────────────────────────────────────────────────────────────────────────

export function CaseStudyShell({
  study,
  prev,
  next,
  children,
}: {
  study: CaseStudy;
  prev?: { slug: string; title: string; subtitle: string } | null;
  next?: { slug: string; title: string; subtitle: string } | null;
  children?: React.ReactNode;
}) {
  // Filter SECTION_ORDER down to only the sections that actually have data.
  // This drives both the sidebar nav links and which section components render.
  const fullBoard = study.fullCaseStudyBoard;

  const hidden = useMemo(
    () => new Set(study.hiddenSections ?? []),
    [study.hiddenSections],
  );

  const present: SectionDef[] = useMemo(() => {
    if (fullBoard) {
      return [{ id: "case-study", number: "01", label: "Case Study" }];
    }
    return SECTION_ORDER.filter(
      (s) => Boolean(study[s.key]) && !hidden.has(s.key),
    ).map((s) => ({
      id: s.id,
      number: s.number,
      label: s.label,
      shortLabel: s.shortLabel,
    }));
  }, [study, hidden, fullBoard]);

  const showSection = (key: CaseStudySectionKey) =>
    Boolean(study[key]) && !hidden.has(key);

  const prototypeHref =
    study.links?.find((l) => l.href.startsWith("/kin"))?.href ?? null;

  // Tracks which section is currently scrolled into view.
  // Used to highlight the active item in the sidebar / mobile nav.
  const activeId = useScrollSpy(present.map((s) => s.id));

  return (
    <article style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Full-bleed parallax hero image with title overlay */}
      <ImmersiveHero study={study} />

      {/* Horizontal scrollable pill nav shown only on mobile (hidden on lg+) */}
      <MobileSectionNav sections={present} activeId={activeId} />

      {/* Page-wide max-width container with responsive horizontal padding */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Two-column layout: narrow sidebar on the left, wide content on right.
            Collapses to single column on mobile. */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-x-14">
          {/* Sticky sidebar — visible on desktop only */}
          <CaseSidebar
            sections={present}
            activeId={activeId}
            projectTitle={study.title}
            projectSubtitle={study.subtitle}
          />

          {/* Main scrollable content column */}
          <main className="min-w-0 py-2 lg:py-6">
            {/* Metadata strip: Role / Timeline / Team / Stack / Impact / links */}
            <MetaRow study={study} />

            {fullBoard && (
              <FullCaseStudyBoard
                src={fullBoard.src}
                alt={fullBoard.alt}
              />
            )}

            {/* Each section renders only if its data key is present on `study`.
                To hide a section entirely, remove it from caseStudies.ts for this project. */}
            {!fullBoard && showSection("overview") && study.overview && (
              <OverviewSection data={study.overview} />
            )}
            {!fullBoard && showSection("problem") && study.problem && (
              <ProblemSection data={study.problem} />
            )}
            {!fullBoard && showSection("context") && study.context && (
              <ContextSection data={study.context} />
            )}
            {!fullBoard && showSection("research") && study.research && (
              <ResearchSection data={study.research} />
            )}
            {!fullBoard && showSection("strategy") && study.strategy && (
              <StrategySection data={study.strategy} />
            )}
            {!fullBoard && showSection("architecture") && study.architecture && (
              <ArchitectureSection data={study.architecture} />
            )}
            {!fullBoard && showSection("ideation") && study.ideation && (
              <IdeationSection data={study.ideation} />
            )}
            {!fullBoard && showSection("flows") && study.flows && (
              <FlowsSection data={study.flows} />
            )}
            {!fullBoard && showSection("designSystem") && study.designSystem && (
              <DesignSystemSection data={study.designSystem} />
            )}
            {!fullBoard && showSection("iteration") && study.iteration && (
              <IterationSection data={study.iteration} />
            )}
            {!fullBoard && showSection("finalSolution") && study.finalSolution && (
              <FinalSolutionSection data={study.finalSolution} />
            )}
            {prototypeHref && (
              <PrototypeCTA
                href={prototypeHref}
                title="Explore the Kin prototype"
                description="Walk through every screen — design system, flows, and edge cases — in the interactive appendix."
              />
            )}
            {!fullBoard && showSection("outcomes") && study.outcomes && (
              <OutcomesSection data={study.outcomes} />
            )}
          </main>
        </div>
      </div>

      {/* Optional showcase content — renders full-width between sections and footer */}
      {children}

      {/* Bottom "Previous / Next project" navigation bar */}
      <FooterNav prev={prev} next={next} />
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ImmersiveHero
// Full-bleed header image with a parallax scroll effect, dark gradient overlay,
// and animated title/tagline text at the bottom.
//
// Layout:
//   height — clamp(420px, 64vw, 720px): scales with viewport, min 420px, max 720px.
//            To make it taller/shorter, change these three values.
//   The gradient goes from black at the bottom (so text is readable) to transparent at the top.
//   To darken/lighten the overlay, change the rgba alpha values in the background gradient.
//
// Parallax:
//   As the user scrolls, imgScale goes 1.02 → 1.12 and imgY goes 0 → 60px.
//   This creates a "zoom out as you scroll" feel.
//   To disable parallax, remove the style prop from the <motion.div>.
//   To increase intensity, raise the second number in each useTransform array.
// ─────────────────────────────────────────────────────────────────────────────

export function ImmersiveHero({
  study,
  cta,
}: {
  study: CaseStudy;
  /** Optional prominent button rendered right under the tagline, above the fold.
   *  Used by PrdShell to link from a project's PRD overview into its deeper
   *  design case study. Omit for the regular case-study hero (no button). */
  cta?: { label: string; href: string };
}) {
  // If the user has "reduce motion" enabled in their OS, skip all animations.
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // scrollY [0 → 600px] maps to scale [1.02 → 1.12] — image subtly zooms as you scroll down
  const imgScale = useTransform(scrollY, [0, 600], [1.02, 1.12]);

  // scrollY [0 → 600px] maps to y [0 → 60px] — image drifts downward (parallax)
  const imgY = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section
      aria-label="Project hero"
      className="relative w-full overflow-hidden"
      style={{
        // clamp(min, preferred, max) — responsive height.
        // Change 64vw to make it more/less tall relative to viewport width.
        height: "clamp(420px, 64vw, 720px)",
        backgroundColor: "var(--p-surface)", // fallback while image loads
      }}
    >
      {/* The image wrapper — gets the parallax transform applied to it */}
      <motion.div
        className="absolute inset-0"
        style={
          reduce
            ? undefined // no transform if user prefers reduced motion
            : {
                scale: imgScale,
                y: imgY,
              }
        }
      >
        {/* If study.heroVideo is set, show a video instead of an image */}
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
          <ImageWithFallback
            src={study.heroImage}
            alt={study.title}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* Dark gradient overlay so white text at the bottom is readable.
          Adjust the rgba alpha values to make the overlay darker or lighter.
          0.55 at bottom → 0.15 at middle → 0 at top */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* Text content anchored to the bottom of the hero */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 pb-10 md:pb-14">

          {/* Row of small pill badges: client name, year.
              Note: the per-project status badge (e.g. "Concept Project",
              "Teardown") was removed here — only "Coming Soon" projects show
              a status badge now, and coming-soon projects never reach this
              page (they're not navigable), so there's no case where a status
              badge belongs on this hero at all anymore. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3 mb-4"
          >
            {/* study.client is optional — only renders if set in caseStudies.ts */}
            {study.client && (
              <span
                className="uppercase"
                style={{
                  fontSize: "0.6rem",    // tiny label size — change to make it bigger
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {study.client}
              </span>
            )}
            {/* Year badge */}
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

          {/* Project title — large editorial heading */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.06, // slight stagger after the badges
            }}
            style={{
              // clamp(min, preferred, max) — scales title with viewport width.
              // Change 6vw to make it grow faster/slower with screen size.
              fontSize: "clamp(2.2rem, 6vw, 4.8rem)",
              fontWeight: 300,       // thin weight — increase for bolder title
              letterSpacing: "-0.034em",
              lineHeight: 1.04,
              color: "#fff",
              maxWidth: "20ch",      // keeps long titles from stretching across full width
            }}
          >
            {study.title}
          </motion.h1>

          {/* Tagline / subtitle below the title.
              Uses study.tagline if set, falls back to study.subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.14, // staggered last
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

          {/* Optional CTA — e.g. "View Full Design Case Study →" on PRD pages.
              Deliberately styled as a translucent glass button over the photo,
              not a solid/loud color, so it reads as "more if you want it"
              rather than competing with the title/tagline above it. */}
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
              className="mt-6"
            >
              <Link
                to={cta.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 transition-all duration-200 hover:gap-3 hover:bg-white/20"
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "#fff",
                  backgroundColor: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
              >
                {cta.label}
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MetaRow
// The strip of key–value pairs displayed directly below the hero, before the
// first section. Shows: Role, Timeline, Team, Platform (optional), Stack, Impact.
//
// To remove a field entirely, delete its <MetaPair ... /> block.
// To add a new field, add another <MetaPair label="..." value={...} />.
// The grid is lg:grid-cols-5 (5 columns on desktop). If you remove or add a
// MetaPair, update that class to match the new column count (e.g. lg:grid-cols-4).
//
// The links row at the bottom (Source / Live buttons) comes from study.links.
// It auto-hides if study.links is empty.
// ─────────────────────────────────────────────────────────────────────────────

export function MetaRow({ study }: { study: CaseStudy }) {
  return (
    <motion.section
      {...fadeInOnView} // fades in as it scrolls into view
      // py-10 md:py-14 — vertical padding above/below the meta strip.
      // Reduce these values to tighten the gap between hero and first section.
      className="py-10 md:py-14"
      aria-label="Project metadata"
    >
      {/* Responsive grid: 2 cols on mobile → 3 on tablet → 5 on desktop.
          gap-y-8 controls vertical spacing between rows when they wrap. */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6 md:gap-x-10">
        <MetaPair label="Role" value={study.meta.role} />
        <MetaPair label="Timeline" value={study.meta.timeline} />
        <MetaPair label="Team" value={study.meta.team} />

        {/* Platform is optional — only renders if set in caseStudies.ts meta */}
        {study.meta.platform && (
          <MetaPair label="Platform" value={study.meta.platform} />
        )}

        {/* Stack — shows first 4 techs with "· " separators, then "+N more" */}
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
      </div>

      {/* External links (Source code, Live demo, etc.)
          Populated from study.links in caseStudies.ts.
          If study.links is empty or undefined, this whole block is hidden. */}
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
// FooterNav
// The "Previous project / Next project" bar at the very bottom of the page.
// Automatically receives prev/next from ProjectDetailPage based on position
// in the allProjects array. If there's no prev/next, shows a text placeholder.
//
// To hide this entirely, remove <FooterNav ... /> from CaseStudyShell above.
// ─────────────────────────────────────────────────────────────────────────────

export function FooterNav({
  prev,
  next,
}: {
  prev?: { slug: string; title: string; subtitle: string } | null;
  next?: { slug: string; title: string; subtitle: string } | null;
}) {
  return (
    <div
      className="mt-8"
      style={{ borderTop: "1px solid var(--p-divide)" }} // thin divider above footer
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 sm:grid-cols-2">
        {/* Left side — Previous project */}
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
            // No previous project — show a dim placeholder
            <div className="py-10">
              <span style={{ fontSize: "0.66rem", color: "var(--p-fg-18)" }}>
                First project
              </span>
            </div>
          )}
        </div>

        {/* Right side — Next project */}
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
            // No next project — show a dim placeholder
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
