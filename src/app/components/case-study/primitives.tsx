// ─────────────────────────────────────────────────────────────────────────────
// primitives.tsx
// Small reusable UI building blocks used throughout the case study sections.
// Nothing here has page-level logic — every component just takes data and renders it.
//
// The color variables used throughout this file come from the global CSS theme:
//   var(--p-fg)      — primary text (e.g. headings, bold values)
//   var(--p-fg-65)   — secondary text (body copy, slightly faded)
//   var(--p-fg-45)   — tertiary text (captions, supporting info)
//   var(--p-fg-35)   — muted text (labels, eyebrows, numbers)
//   var(--p-fg-25)   — very muted (separators used as text)
//   var(--p-fg-18)   — barely visible (placeholders, disabled states)
//   var(--p-divide)  — border/divider lines
//   var(--p-surface) — card/image background color
//   var(--p-bg)      — page background
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Media, Highlight } from "./types";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// ─────────────────────────────────────────────────────────────────────────────
// Shared motion config
// ─────────────────────────────────────────────────────────────────────────────

// Indigo accent — same value used in CaseStudyShell.tsx.
// Change here to retheme all primitive highlights globally.
export const ACCENT = "#4338CA";

// Spread this onto any <motion.*> element to get a fade-up-on-scroll effect.
// initial: starts invisible and 16px below its final position.
// whileInView: animates to fully visible at normal position when scrolled into view.
// viewport.once: only plays once (doesn't re-animate when scrolling back up).
// viewport.margin: triggers the animation 80px before the element actually enters the viewport.
// duration + ease: 0.6s with a custom cubic-bezier for a smooth deceleration feel.
export const fadeInOnView = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px 0px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

// ─────────────────────────────────────────────────────────────────────────────
// Text primitives
// ─────────────────────────────────────────────────────────────────────────────

// Eyebrow — tiny all-caps label used above titles or sub-sections.
// Example usage: <Eyebrow>The pain we set out to solve</Eyebrow>
// To change size: adjust fontSize (currently 0.62rem).
// To change color: replace "var(--p-fg-35)" with any CSS color.
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="uppercase block"
      style={{
        fontSize: "0.62rem",
        letterSpacing: "0.18em",
        color: "var(--p-fg-35)", // muted gray — distinguishable from body but clearly secondary
      }}
    >
      {children}
    </span>
  );
}

// SectionTitle — large editorial <h2> used for major section headings.
// Note: CaseSection renders its own <h2> inline, so SectionTitle is mainly
// available if you want to add a heading inside a section's children.
// clamp(1.6rem, 3vw, 2.4rem) — min 1.6rem on mobile, scales to 3vw, caps at 2.4rem.
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="mt-3 mb-4 md:mt-4 md:mb-6"
      style={{
        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
        fontWeight: 300,
        letterSpacing: "-0.022em",
        lineHeight: 1.15,
        color: "var(--p-fg)",
      }}
    >
      {children}
    </h2>
  );
}

// Lede — slightly larger intro paragraph used right after a section title.
// Capped at max-w-2xl so long paragraphs don't stretch uncomfortably wide.
// color: var(--p-fg-65) — slightly faded compared to headings.
export function Lede({ children }: { children: ReactNode }) {
  return (
    <p
      className="max-w-2xl"
      style={{
        fontSize: "clamp(1rem, 1.4vw, 1.12rem)",
        fontWeight: 300,
        lineHeight: 1.75,
        letterSpacing: "-0.005em",
        color: "var(--p-fg-65)",
      }}
    >
      {children}
    </p>
  );
}

// BodyText — standard body paragraph for inline content inside sections.
// Slightly smaller and more muted than Lede.
export function BodyText({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.95rem",
        fontWeight: 400,
        lineHeight: 1.75,
        color: "var(--p-fg-65)",
      }}
    >
      {children}
    </p>
  );
}

// Caption — small text shown below images or figures.
// mt-3 gives a little breathing room above the caption.
export function Caption({ children }: { children: ReactNode }) {
  return (
    <p
      className="mt-3"
      style={{
        fontSize: "0.7rem",
        letterSpacing: "0.04em",
        color: "var(--p-fg-35)", // noticeably muted so it doesn't compete with the image
      }}
    >
      {children}
    </p>
  );
}

/** CTA band linking to an interactive prototype appendix (e.g. /kin). */
export function PrototypeCTA({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.section
      {...fadeInOnView}
      className="my-16 md:my-20 py-10 md:py-12 px-6 md:px-10"
      style={{
        border: "1px solid var(--p-divide)",
        backgroundColor: "var(--p-surface)",
      }}
      aria-label={title}
    >
      <div className="max-w-2xl">
        <p
          className="uppercase mb-3"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: "var(--p-fg-35)",
          }}
        >
          Interactive appendix
        </p>
        <h3
          style={{
            fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--p-fg)",
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            className="mt-3"
            style={{
              fontSize: "0.92rem",
              lineHeight: 1.7,
              color: "var(--p-fg-65)",
            }}
          >
            {description}
          </p>
        )}
        <Link
          to={href}
          className="inline-flex items-center gap-2 mt-6"
          style={{
            fontSize: "0.88rem",
            fontWeight: 500,
            color: ACCENT,
            textDecoration: "none",
          }}
        >
          Open prototype
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PullQuote
// A large italic quote block used to call out a key insight or user quote.
// The font switches to Georgia/serif for a typographic editorial feel.
//
// Props:
//   text        — the quote text (without quotes — they're added automatically)
//   attribution — optional name/source shown below the quote (prefixed with "—")
// ─────────────────────────────────────────────────────────────────────────────

export function PullQuote({
  text,
  attribution,
}: {
  text: string;
  attribution?: string;
}) {
  return (
    <motion.figure
      {...fadeInOnView}
      className="my-10 md:my-14 max-w-2xl"
    >
      {/* The quoted text — serif italic for a "magazine editorial" feel.
          To switch to a sans-serif, remove fontFamily or replace with "Inter, sans-serif". */}
      <span
        className="block mb-4"
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
          color: "var(--p-fg)",
        }}
      >
        "{text}"
      </span>
      {/* Attribution — only renders if provided */}
      {attribution && (
        <figcaption
          className="uppercase"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.16em",
            color: "var(--p-fg-35)",
          }}
        >
          — {attribution}
        </figcaption>
      )}
    </motion.figure>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lists
// ─────────────────────────────────────────────────────────────────────────────

// BulletList — a styled unordered list where each bullet is a short horizontal line.
// The line-dash bullet is a visual design choice — to use a standard dot bullet,
// replace the <span> inside <li> with a regular "•" or CSS list-style.
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          {/* The "bullet" — a short horizontal line instead of a dot */}
          <span
            aria-hidden
            className="shrink-0 mt-2"
            style={{
              width: 18,       // length of the dash — change to make it longer/shorter
              height: 1,       // thickness of the dash
              backgroundColor: "var(--p-fg-35)",
            }}
          />
          <span
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "var(--p-fg-65)",
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

// NumberedList — an ordered list with two-digit padded numbers (01, 02, ...).
// Used for outcomes and results where order matters.
export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
          {/* Zero-padded number prefix (e.g. "01", "02") */}
          <span
            className="shrink-0 tabular-nums"
            style={{
              fontSize: "0.66rem",
              letterSpacing: "0.1em",
              color: "var(--p-fg-35)",
              marginTop: 4,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: "0.92rem",
              lineHeight: 1.75,
              color: "var(--p-fg-65)",
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MetaPair
// A single label + value pair used in the meta row under the hero.
// Example: label="Role" value="Product Designer & Engineer"
//
// The label is tiny uppercase (like a form field label).
// The value can be any ReactNode — plain text, JSX (colored span, tag list, etc.).
// ─────────────────────────────────────────────────────────────────────────────

export function MetaPair({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      {/* Tiny uppercase label above the value */}
      <p
        className="uppercase mb-1.5"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          color: "var(--p-fg-35)",
        }}
      >
        {label}
      </p>
      {/* Value — can be any ReactNode (string, span, etc.) */}
      <div
        style={{
          fontSize: "0.85rem",
          color: "var(--p-fg)",
          lineHeight: 1.5,
        }}
      >
        {value}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// KeyValueGrid
// A two-column grid of label + body pairs.
// Used for: Context constraints, Strategy risks, etc.
// Each item fades in independently via fadeInOnView.
// ─────────────────────────────────────────────────────────────────────────────

export function KeyValueGrid({
  items,
}: {
  items: { label: string; body: string }[];
}) {
  return (
    // sm:grid-cols-2 — two columns on tablet+, single column on mobile.
    // gap-y-6 md:gap-y-8 — vertical gap between rows. Increase for more spacing.
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-8">
      {items.map((it) => (
        <motion.div key={it.label} {...fadeInOnView}>
          {/* Label — tiny uppercase category name */}
          <p
            className="uppercase mb-2"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              color: "var(--p-fg-35)",
            }}
          >
            {it.label}
          </p>
          {/* Body — the explanation for this constraint or key */}
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.72,
              color: "var(--p-fg-65)",
            }}
          >
            {it.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StatGrid
// A grid of large-number stat cards — for outcomes, success metrics, highlights.
// Each stat has a big "value" (e.g. "60%") and a small label below it.
// Items stagger-animate: each one fades in 60ms after the previous.
// ─────────────────────────────────────────────────────────────────────────────

export function StatGrid({ items }: { items: Highlight[] }) {
  return (
    // 2 cols on mobile, 4 on md+. gap-y-8 controls row spacing.
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
      {items.map((s, i) => (
        <motion.div
          key={s.label + i}
          {...fadeInOnView}
          transition={{
            ...fadeInOnView.transition,
            delay: i * 0.06, // stagger: each item starts 60ms after the last
          }}
        >
          {/* The big number / stat value — e.g. "320+", "4.8/5", "60%" */}
          <p
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)", // responsive big number
              fontWeight: 300,
              letterSpacing: "-0.025em",
              color: "var(--p-fg)",
            }}
          >
            {s.value}
          </p>
          {/* The description label below the number */}
          <p
            className="uppercase mt-2"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              color: "var(--p-fg-35)",
            }}
          >
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FullCaseStudyBoard — one tall Figma export at native resolution (no aspect crop)
// ─────────────────────────────────────────────────────────────────────────────

export function FullCaseStudyBoard({ src, alt }: { src: string; alt?: string }) {
  return (
    <motion.figure {...fadeInOnView} id="case-study" className="block w-full scroll-mt-28">
      <ImageWithFallback
        src={src}
        alt={alt ?? "Case study"}
        loading="eager"
        decoding="async"
        className="block w-full h-auto max-w-full"
        style={{ border: "1px solid var(--p-divide)" }}
      />
    </motion.figure>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LazyImage
// A single image with optional caption, lazy loading, hover scale effect,
// and a bordered container that maintains a fixed aspect ratio.
//
// Props:
//   src      — image URL (remote or local, e.g. "/images/screenshot.png")
//   alt      — screen-reader description of the image
//   caption  — optional text shown below the image
//   aspect   — CSS aspect-ratio string (default "16/10"). Common values:
//               "16/9" (widescreen), "4/3" (classic), "1/1" (square), "3/2"
//   priority — if true, loads eagerly (use for the first/hero image in a section)
// ─────────────────────────────────────────────────────────────────────────────

export function LazyImage({
  src,
  alt,
  caption,
  aspect = "16/10",
  priority = false,
}: {
  src: string;
  alt?: string;
  caption?: string;
  aspect?: string;
  priority?: boolean;
}) {
  return (
    <motion.figure {...fadeInOnView} className="block">
      <div
        className="overflow-hidden"
        style={{
          aspectRatio: aspect,                   // controls the image container shape
          backgroundColor: "var(--p-surface)",   // placeholder color while image loads
          border: "1px solid var(--p-divide)",   // subtle border around image
        }}
      >
        <ImageWithFallback
          src={src}
          alt={alt ?? caption ?? ""}
          loading={priority ? "eager" : "lazy"}  // lazy = only loads when near viewport
          decoding="async"
          // hover:scale-[1.025] — subtle zoom on hover. Remove this class to disable.
          // transition-transform duration-700 — slow, smooth scale transition.
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.025]"
        />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </motion.figure>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MediaGallery
// A responsive image grid that auto-selects the number of columns based on
// how many images are provided (1 → full width, 2 → two columns, 3+ → three columns).
// You can override the column count by passing the `columns` prop.
//
// Props:
//   items   — array of Media objects ({ src, alt, caption, aspect })
//   columns — optional override: 1, 2, or 3
// ─────────────────────────────────────────────────────────────────────────────

export function MediaGallery({
  items,
  columns,
}: {
  items: Media[];
  columns?: 1 | 2 | 3;
}) {
  // Auto-pick columns: 1 image → full width, 2 → two cols, 3+ → three cols
  const cols = columns ?? (items.length === 1 ? 1 : items.length >= 3 ? 3 : 2);
  const gridClass =
    cols === 1
      ? "grid-cols-1"
      : cols === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid ${gridClass} gap-5 md:gap-6`}>
      {items.map((m, i) => (
        <LazyImage
          key={m.src + i}
          src={m.src}
          alt={m.alt}
          caption={m.caption}
          // Single image stays at 16/9 widescreen; multi-column images use 4/3
          aspect={m.aspect ?? (cols === 1 ? "16/9" : "4/3")}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FlowDiagram
// A horizontal step-by-step flow (like a user journey or process map).
// On desktop: steps are shown as 4 columns with a horizontal rule above each step.
// On mobile: steps stack vertically with a vertical rule on the left side.
//
// Props:
//   steps — array of { label, body } where label is the step name
//           and body is a short explanation of what happens at that step.
// ─────────────────────────────────────────────────────────────────────────────

export function FlowDiagram({
  steps,
}: {
  steps: { label: string; body: string }[];
}) {
  return (
    // 4 columns on desktop — if you have more than 4 steps, consider increasing or
    // wrapping to a different layout so they don't get too cramped.
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-4">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          {...fadeInOnView}
          transition={{
            ...fadeInOnView.transition,
            delay: i * 0.06, // each step fades in 60ms after the previous
          }}
          className="relative pl-5 md:pl-0 md:pt-5"
          style={{
            borderLeft: undefined,
            borderTop: undefined,
          }}
        >
          {/* Horizontal rule above the step — visible on desktop only */}
          <span
            aria-hidden
            className="hidden md:block absolute top-0 left-0 right-0"
            style={{ height: 1, backgroundColor: "var(--p-divide)" }}
          />
          {/* Vertical rule on the left — visible on mobile only */}
          <span
            aria-hidden
            className="md:hidden absolute top-0 bottom-0 left-0"
            style={{ width: 1, backgroundColor: "var(--p-divide)" }}
          />
          {/* "STEP 01" label */}
          <p
            className="tabular-nums"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              color: "var(--p-fg-35)",
            }}
          >
            STEP {String(i + 1).padStart(2, "0")}
          </p>
          {/* Step name / title */}
          <p
            className="mt-2"
            style={{
              fontSize: "0.95rem",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--p-fg)",
            }}
          >
            {step.label}
          </p>
          {/* Step description */}
          <p
            className="mt-1.5"
            style={{
              fontSize: "0.82rem",
              lineHeight: 1.7,
              color: "var(--p-fg-45)",
            }}
          >
            {step.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ArchitectureDiagram
// A stacked list of system layers (e.g. Frontend, API, Database, AI Pipeline).
// Each layer shows its name on the left and a row of chip tags on the right.
// An optional note can be added below the chips for extra context.
//
// Props:
//   layers — array of { label, items[], note? }
//            label = layer name (e.g. "Frontend")
//            items = tech/service names shown as chips (e.g. ["React", "Tailwind"])
//            note  = optional short explanation shown below the chips
// ─────────────────────────────────────────────────────────────────────────────

export function ArchitectureDiagram({
  layers,
}: {
  layers: { label: string; items: string[]; note?: string }[];
}) {
  return (
    <div className="space-y-3 md:space-y-4">
      {layers.map((layer, i) => (
        <motion.div
          key={layer.label}
          {...fadeInOnView}
          transition={{
            ...fadeInOnView.transition,
            delay: i * 0.05, // stagger layers
          }}
          // grid-cols-[160px_1fr] — fixed 160px column for the layer name, rest for chips.
          // Change 160px to give the label column more/less room.
          className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3 md:gap-6 items-start p-4 md:p-5"
          style={{ border: "1px solid var(--p-divide)" }}
        >
          {/* Left column: layer number and name */}
          <div>
            <p
              className="tabular-nums"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                color: "var(--p-fg-35)",
              }}
            >
              LAYER {String(i + 1).padStart(2, "0")}
            </p>
            <p
              className="mt-1"
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "var(--p-fg)",
              }}
            >
              {layer.label}
            </p>
          </div>
          {/* Right column: technology/service chips + optional note */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {layer.items.map((it) => (
                // Each item rendered as a small outlined chip/tag
                <span
                  key={it}
                  className="px-2.5 py-1"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.02em",
                    color: "var(--p-fg-65)",
                    border: "1px solid var(--p-divide)",
                    backgroundColor: "var(--p-surface)",
                  }}
                >
                  {it}
                </span>
              ))}
            </div>
            {/* Optional explanatory note below the chips */}
            {layer.note && (
              <p
                className="mt-3"
                style={{
                  fontSize: "0.78rem",
                  lineHeight: 1.65,
                  color: "var(--p-fg-45)",
                }}
              >
                {layer.note}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BeforeAfter
// A side-by-side image comparison labeled "Before" and "After".
// Both images are 4/3 aspect ratio.
// Used in the Iteration section for design change comparisons.
//
// Props:
//   before — image URL for the "before" state
//   after  — image URL for the "after" state
//   label  — optional caption shown below both images
// ─────────────────────────────────────────────────────────────────────────────

export function BeforeAfter({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label?: string;
}) {
  return (
    <motion.figure {...fadeInOnView} className="block">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { src: before, tag: "Before" },
          { src: after, tag: "After" },
        ].map((item) => (
          <div key={item.tag} className="relative">
            <div
              className="overflow-hidden"
              style={{
                aspectRatio: "4/3",
                backgroundColor: "var(--p-surface)",
                border: "1px solid var(--p-divide)",
              }}
            >
              <ImageWithFallback
                src={item.src}
                alt={`${label ?? "Comparison"} — ${item.tag}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            {/* "Before" / "After" badge overlaid on the image top-left */}
            <span
              className="absolute top-3 left-3 px-2 py-0.5 uppercase"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                color: "var(--p-fg)",
                backgroundColor: "var(--p-bg)",
                border: "1px solid var(--p-divide)",
              }}
            >
              {item.tag}
            </span>
          </div>
        ))}
      </div>
      {label && <Caption>{label}</Caption>}
    </motion.figure>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TagList
// A wrapping row of small outlined chip tags.
// Used for listing reusable components in the Design System section.
// For technology stacks, the MetaPair "Stack" field uses a similar inline chip style.
// ─────────────────────────────────────────────────────────────────────────────

export function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((it) => (
        <span
          key={it}
          className="px-2.5 py-1"
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.02em",
            color: "var(--p-fg-65)",
            border: "1px solid var(--p-divide)",
          }}
        >
          {it}
        </span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CalloutGrid
// A grid of bordered cards, each with a bold title and a body paragraph.
// The most versatile primitive — used for pain points, reflections, highlights,
// design principles, and any other "named insight" group.
//
// Props:
//   items   — array of { title, body }
//   columns — 1, 2, or 3. Defaults to 2.
//             Pass 3 when there are 3+ items and space allows.
// ─────────────────────────────────────────────────────────────────────────────

export function CalloutGrid({
  items,
  columns = 2,
}: {
  items: { title: string; body: string }[];
  columns?: 1 | 2 | 3;
}) {
  const gridClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-1 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";
  return (
    <div className={`grid ${gridClass} gap-5 md:gap-6`}>
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          {...fadeInOnView}
          transition={{
            ...fadeInOnView.transition,
            delay: i * 0.05, // stagger: each card fades in 50ms after the previous
          }}
          className="p-5 md:p-6"
          style={{ border: "1px solid var(--p-divide)" }}
        >
          {/* Card title — the name of the insight or highlight */}
          <p
            style={{
              fontSize: "0.95rem",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--p-fg)",
            }}
          >
            {it.title}
          </p>
          {/* Card body — the explanation or supporting detail */}
          <p
            className="mt-2"
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.72,
              color: "var(--p-fg-45)",
            }}
          >
            {it.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
