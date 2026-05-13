import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Eyebrow, Lede } from "./primitives";

// ─────────────────────────────────────────────────────────────────────────────
// CaseSection
// The shared wrapper used by every one of the 12 case study sections.
// It handles:
//   • scroll-to anchor (the "id" becomes the URL hash target, e.g. #overview)
//   • fade-in animation when the section enters the viewport
//   • the thin top border that visually separates sections
//   • the numbered header row (e.g.  01  OVERVIEW  ————)
//   • optional eyebrow label, large title, and lede paragraph above the content
//
// Props:
//   id       — DOM id used for scroll anchoring. Must match the id in SECTION_ORDER
//              in CaseStudyShell.tsx (e.g. "overview", "problem").
//   number   — decorative prefix shown in the header row (e.g. "01").
//   label    — section name shown in the header row (e.g. "OVERVIEW").
//   eyebrow  — optional tiny uppercase line above the title (passed from each section component).
//   title    — optional large editorial heading for the section.
//   lede     — optional slightly-larger intro paragraph shown below the title.
//   children — the actual section content (grids, lists, galleries, etc.).
// ─────────────────────────────────────────────────────────────────────────────

type SectionProps = {
  id: string;
  number: string;
  label: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children: ReactNode;
};

export function CaseSection({
  id,
  number,
  label,
  eyebrow,
  title,
  lede,
  children,
}: SectionProps) {
  return (
    <motion.section
      id={id}                          // anchor target — clicking a sidebar link scrolls here
      aria-labelledby={`${id}-title`}
      initial={{ opacity: 0, y: 24 }}  // starts invisible and slightly below final position
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px 0px" }} // triggers 120px before entering viewport
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      // scroll-mt-28 — offset so sticky navbar doesn't overlap when jumping to this section.
      //   Increase this value if the section title hides under the navbar on scroll-to.
      // py-14 md:py-20 lg:py-24 — vertical padding inside each section.
      //   To reduce space BETWEEN sections, decrease these values (e.g. py-8 md:py-12 lg:py-16).
      className="scroll-mt-28 py-14 md:py-20 lg:py-24"
      // The thin line drawn above every section to visually separate them.
      // To remove these divider lines, delete this style prop entirely.
      style={{ borderTop: "1px solid var(--p-divide)" }}
    >
      {/* Section header row: number · LABEL · ———————— (horizontal rule fill) */}
      <header className="flex items-center gap-4 mb-8 md:mb-10">
        {/* Decorative section number (e.g. "01") */}
        <span
          className="tabular-nums"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: "var(--p-fg-35)", // muted — to make it more prominent, use "var(--p-fg)"
          }}
        >
          {number}
        </span>

        {/* Section label (e.g. "OVERVIEW") */}
        <span
          className="uppercase"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: "var(--p-fg-65)", // slightly more visible than the number
          }}
        >
          {label}
        </span>

        {/* Decorative horizontal rule that fills the remaining space in the header row.
            This is the "dash" you see after the section label.
            To remove it, delete this entire <span> block. */}
        <span
          aria-hidden
          className="flex-1"
          style={{ height: 1, backgroundColor: "var(--p-divide)" }}
        />
      </header>

      {/* Optional eyebrow — tiny uppercase label above the title (e.g. "The pain we set out to solve").
          Set via the eyebrow prop when calling CaseSection, or via data.eyebrow in sections.tsx. */}
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

      {/* Optional large editorial title — rendered as <h2> for semantic hierarchy.
          id attribute links it to the section's aria-labelledby for accessibility. */}
      {title && (
        <h2
          id={`${id}-title`}
          className="mt-3 mb-4 md:mt-4 md:mb-6"
          style={{
            // clamp(min, preferred, max) — scales the title size with viewport width.
            // Change 3.2vw to make it grow faster/slower, or change the px values for hard limits.
            fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
            fontWeight: 300,       // light weight — increase for a heavier look
            letterSpacing: "-0.024em",
            lineHeight: 1.12,
            color: "var(--p-fg)",
          }}
        >
          {title}
        </h2>
      )}

      {/* Optional lede — slightly larger intro paragraph, shown below the title.
          Used for the main body text in sections like Problem, Context, etc. */}
      {lede && (
        <div className="mb-10 md:mb-12">
          <Lede>{lede}</Lede>
        </div>
      )}

      {/* Section body content — grids, galleries, lists, etc.
          space-y-8 md:space-y-10 controls the vertical gap between child blocks
          within a section. Reduce to tighten, increase to add more breathing room. */}
      <div className="space-y-8 md:space-y-10">{children}</div>
    </motion.section>
  );
}
