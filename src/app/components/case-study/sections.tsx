// ─────────────────────────────────────────────────────────────────────────────
// sections.tsx
// One exported component per case study section (01–12).
// Each component receives its slice of CaseStudy data and renders it
// using CaseSection (the shared wrapper) + primitives from primitives.tsx.
//
// HOW TO EDIT A SECTION:
//   1. Find the export function for the section you want (e.g. ProblemSection).
//   2. The data prop maps directly to the matching key in caseStudies.ts
//      (e.g. ProblemSection receives study.problem).
//   3. Add/remove primitives (BulletList, CalloutGrid, etc.) to change layout.
//   4. All text content comes from caseStudies.ts — not hardcoded here.
//
// HOW TO HIDE A SECTION:
//   Simply don't include that key in caseStudies.ts for the project.
//   CaseStudyShell.tsx will skip rendering it automatically.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "motion/react";
import type { CaseStudy } from "./types";
import { CaseSection } from "./Section";
import {
  ArchitectureDiagram,
  BeforeAfter,
  BodyText,
  BulletList,
  CalloutGrid,
  Caption,
  Eyebrow,
  FlowDiagram,
  KeyValueGrid,
  LazyImage,
  MediaGallery,
  NumberedList,
  PullQuote,
  StatGrid,
  TagList,
  fadeInOnView,
} from "./primitives";

// Shared accent color — used for "To Gain" labels in tradeoffs, MVP scope border, etc.
const ACCENT = "#4338CA";

// ─────────────────────────────────────────────────────────────────────────────
// 01 · Overview
// First section visible after the meta row. Gives the reader the project summary
// and key stats at a glance.
//
// Layout: two-column grid on md+
//   Left (7/12): the main body paragraph (data.body)
//   Right (5/12): a 2×N stats box (data.highlights) — e.g. "60% · Reduction in time"
//
// To remove the stats box: delete the data.highlights block in caseStudies.ts.
// To change the stat box border color: find `border: "1px solid var(--p-divide)"` below.
// ─────────────────────────────────────────────────────────────────────────────

export function OverviewSection({ data }: { data: NonNullable<CaseStudy["overview"]> }) {
  return (
    <CaseSection
      id="overview"
      number="01"
      label="Overview"
      eyebrow={data.eyebrow}    // optional tiny uppercase line above the title
      title={data.title}        // large editorial heading — set in caseStudies.ts overview.title
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left: main body paragraph */}
        <div className="md:col-span-7">
          <p
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.12rem)",
              fontWeight: 300,
              lineHeight: 1.78,
              letterSpacing: "-0.005em",
              color: "var(--p-fg)",
            }}
          >
            {data.body}
          </p>
        </div>

        {/* Right: stats box — only renders if highlights array has items */}
        {data.highlights && data.highlights.length > 0 && (
          <div className="md:col-span-5">
            {/* 2-column grid of stat cards inside a bordered box */}
            <div
              className="grid grid-cols-2 gap-y-6 gap-x-4 p-5 md:p-6"
              style={{ border: "1px solid var(--p-divide)" }}
            >
              {data.highlights.map((h) => (
                <div key={h.label}>
                  {/* The big number / value — e.g. "320+", "4.8/5" */}
                  <p
                    style={{
                      fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      color: "var(--p-fg)",
                    }}
                  >
                    {h.value}
                  </p>
                  {/* The label below the number */}
                  <p
                    className="uppercase mt-1"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      color: "var(--p-fg-35)",
                    }}
                  >
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 02 · Problem
// Frames the core user pain or market gap the project addresses.
//
// Layout:
//   - data.body is passed as `lede` (large intro paragraph inside CaseSection)
//   - data.painPoints renders as a CalloutGrid of bordered insight cards
//   - data.quote renders as a large italic PullQuote
//
// To add a user quote: set problem.quote in caseStudies.ts.
// To add pain point cards: add objects to problem.painPoints array.
// ─────────────────────────────────────────────────────────────────────────────

export function ProblemSection({ data }: { data: NonNullable<CaseStudy["problem"]> }) {
  return (
    <CaseSection
      id="problem"
      number="02"
      label="Problem"
      eyebrow={data.eyebrow ?? "The pain we set out to solve"} // fallback eyebrow if not set
      title={data.title}
      lede={data.body} // body is the lede paragraph (larger text above the cards)
    >
      {/* Pain point cards — only renders if painPoints array has items */}
      {data.painPoints && data.painPoints.length > 0 && (
        // columns: 3 if 3+ items, else 2
        <CalloutGrid items={data.painPoints} columns={data.painPoints.length >= 3 ? 3 : 2} />
      )}
      {/* Pull quote — only renders if quote is set */}
      {data.quote && <PullQuote text={data.quote.text} attribution={data.quote.attribution} />}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 03 · Context & Constraints
// Documents the conditions, tradeoffs, and constraints that shaped decisions.
//
// Layout:
//   - data.constraints → KeyValueGrid (label + explanation pairs)
//   - data.tradeoffs → side-by-side "We gave up / To gain" cards
// ─────────────────────────────────────────────────────────────────────────────

export function ContextSection({ data }: { data: NonNullable<CaseStudy["context"]> }) {
  return (
    <CaseSection
      id="context"
      number="03"
      label="Context & Constraints"
      eyebrow={data.eyebrow ?? "The conditions shaping the work"}
      title={data.title}
      lede={data.body}
    >
      {/* Constraints grid — e.g. "Timeline: 12 weeks", "Team: Solo" */}
      <KeyValueGrid items={data.constraints} />

      {/* Tradeoff cards — only renders if tradeoffs array is set */}
      {data.tradeoffs && data.tradeoffs.length > 0 && (
        <div>
          <Eyebrow>Tradeoffs Considered</Eyebrow>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.tradeoffs.map((t, i) => (
              <motion.div
                key={i}
                {...fadeInOnView}
                transition={{ ...fadeInOnView.transition, delay: i * 0.05 }}
                className="p-5"
                style={{ border: "1px solid var(--p-divide)" }}
              >
                {/* "We gave up" row — what was sacrificed */}
                <p
                  className="uppercase"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    color: "var(--p-fg-35)",
                  }}
                >
                  We gave up
                </p>
                <p
                  className="mt-1"
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--p-fg-65)",
                    lineHeight: 1.6,
                  }}
                >
                  {t.gave}
                </p>
                {/* "To gain" row — what was gained in exchange (shown in accent color) */}
                <p
                  className="uppercase mt-4"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    color: ACCENT, // accent color highlights the positive outcome
                  }}
                >
                  To gain
                </p>
                <p
                  className="mt-1"
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--p-fg)",
                    lineHeight: 1.6,
                  }}
                >
                  {t.got}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 04 · Research
// Shows the research methods used and insights synthesized from them.
//
// Layout:
//   - data.methods → numbered two-column list (e.g. "01 · User Interviews · 12 sessions")
//   - data.insights → CalloutGrid of synthesized findings
//   - data.quote → PullQuote (a standout user/research quote)
//   - data.media → MediaGallery (affinity maps, journey maps, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export function ResearchSection({ data }: { data: NonNullable<CaseStudy["research"]> }) {
  return (
    <CaseSection
      id="research"
      number="04"
      label="Research"
      eyebrow={data.eyebrow ?? "Listening before designing"}
      title={data.title}
      lede={data.body}
    >
      {/* Research methods list — numbered grid showing method + detail */}
      {data.methods && data.methods.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {data.methods.map((m, i) => (
            <motion.div
              key={i}
              {...fadeInOnView}
              transition={{ ...fadeInOnView.transition, delay: i * 0.04 }}
              className="flex items-baseline gap-4"
            >
              {/* Zero-padded number — "01", "02", etc. */}
              <span
                className="tabular-nums shrink-0"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  color: "var(--p-fg-35)",
                  width: 22,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                {/* Method name — e.g. "User Interviews" */}
                <p
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    color: "var(--p-fg)",
                  }}
                >
                  {m.label}
                </p>
                {/* Method detail — e.g. "12 sessions, 30 min each" */}
                <p
                  className="mt-1"
                  style={{
                    fontSize: "0.84rem",
                    lineHeight: 1.7,
                    color: "var(--p-fg-45)",
                  }}
                >
                  {m.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Synthesized insights — key findings as callout cards */}
      {data.insights && data.insights.length > 0 && (
        <div>
          <Eyebrow>Synthesized Insights</Eyebrow>
          <div className="mt-5">
            <CalloutGrid items={data.insights} columns={data.insights.length >= 3 ? 3 : 2} />
          </div>
        </div>
      )}

      {/* Optional standout quote from user research */}
      {data.quote && <PullQuote text={data.quote.text} attribution={data.quote.attribution} />}

      {/* Research imagery — affinity maps, journey maps, etc.
          Add image URLs to research.media in caseStudies.ts to show them here. */}
      {data.media && data.media.length > 0 && <MediaGallery items={data.media} />}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 05 · Product Strategy
// Captures the "why this, not that" decisions: users, goals, MVP scope, metrics.
//
// Layout:
//   - data.targetUsers + data.goals → two-column grid
//   - data.mvp → "In Scope / Explicitly Out" two-column comparison box
//   - data.metrics → StatGrid of big-number success metrics
//   - data.risks → KeyValueGrid of risks and assumptions
// ─────────────────────────────────────────────────────────────────────────────

export function StrategySection({ data }: { data: NonNullable<CaseStudy["strategy"]> }) {
  return (
    <CaseSection
      id="strategy"
      number="05"
      label="Product Strategy"
      eyebrow={data.eyebrow ?? "Scoping for the right impact"}
      title={data.title}
      lede={data.body}
    >
      {/* Target users + goals — side by side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        {data.targetUsers && data.targetUsers.length > 0 && (
          <div>
            <Eyebrow>Target users</Eyebrow>
            <ul className="mt-4 space-y-4">
              {data.targetUsers.map((u, i) => (
                <li key={i}>
                  <p style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--p-fg)" }}>
                    {u.label}
                  </p>
                  <p className="mt-1" style={{ fontSize: "0.84rem", lineHeight: 1.7, color: "var(--p-fg-45)" }}>
                    {u.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.goals && data.goals.length > 0 && (
          <div>
            <Eyebrow>Product goals</Eyebrow>
            <div className="mt-4">
              <BulletList items={data.goals} />
            </div>
          </div>
        )}
      </div>

      {/* MVP scope — two-panel "In / Out" comparison.
          Left panel uses accent color and background; right uses muted style. */}
      {data.mvp && (
        <div>
          <Eyebrow>MVP Scope</Eyebrow>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* In scope — accent-tinted panel */}
            <div
              className="p-5"
              style={{
                border: `1px solid ${ACCENT}33`,      // accent with 20% opacity border
                backgroundColor: ACCENT + "0A",        // accent with ~4% opacity background
              }}
            >
              <p className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: ACCENT }}>
                In Scope
              </p>
              <ul className="mt-3 space-y-2">
                {data.mvp.included.map((item) => (
                  <li key={item} style={{ fontSize: "0.86rem", color: "var(--p-fg)", lineHeight: 1.6 }}>
                    + {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Out of scope — neutral muted panel */}
            <div className="p-5" style={{ border: "1px solid var(--p-divide)" }}>
              <p className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--p-fg-35)" }}>
                Explicitly Out
              </p>
              <ul className="mt-3 space-y-2">
                {data.mvp.excluded.map((item) => (
                  <li key={item} style={{ fontSize: "0.86rem", color: "var(--p-fg-45)", lineHeight: 1.6 }}>
                    – {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Success metrics — big number stats */}
      {data.metrics && data.metrics.length > 0 && (
        <div>
          <Eyebrow>Success metrics</Eyebrow>
          <div className="mt-6">
            <StatGrid items={data.metrics} />
          </div>
        </div>
      )}

      {/* Risks and assumptions */}
      {data.risks && data.risks.length > 0 && (
        <div>
          <Eyebrow>Risks & assumptions</Eyebrow>
          <div className="mt-5">
            <KeyValueGrid items={data.risks} />
          </div>
        </div>
      )}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 06 · System Design / Architecture
// Shows how the system was built — layers, tech, and optional diagrams.
//
// Layout:
//   - data.layers → ArchitectureDiagram (stacked layer rows with tech chips)
//   - data.notes → two-column paragraph notes
//   - data.media → MediaGallery (architecture diagrams, data flow charts)
// ─────────────────────────────────────────────────────────────────────────────

export function ArchitectureSection({ data }: { data: NonNullable<CaseStudy["architecture"]> }) {
  return (
    <CaseSection
      id="architecture"
      number="06"
      label="System Design"
      eyebrow={data.eyebrow ?? "Building for performance, scale & clarity"}
      title={data.title}
      lede={data.body}
    >
      {/* Layered architecture diagram — frontend / api / db / AI pipeline etc. */}
      <ArchitectureDiagram layers={data.layers} />

      {/* Engineering notes — explanatory paragraphs about decisions */}
      {data.notes && data.notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          {data.notes.map((n, i) => (
            <motion.p
              key={i}
              {...fadeInOnView}
              transition={{ ...fadeInOnView.transition, delay: i * 0.04 }}
              style={{ fontSize: "0.86rem", lineHeight: 1.72, color: "var(--p-fg-45)" }}
            >
              {n}
            </motion.p>
          ))}
        </div>
      )}

      {/* Architecture diagrams, data flow images, etc.
          Add image URLs to architecture.media in caseStudies.ts to show them here. */}
      {data.media && data.media.length > 0 && <MediaGallery items={data.media} />}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 07 · Ideation & Exploration
// Shows the design directions explored before settling on the final approach.
//
// Layout:
//   - data.explorations → cards with a "Shipped / Evolved / Cut" status badge
//   - data.media → MediaGallery (sketches, wireframes, explorations)
//
// Each exploration card has an outcome badge:
//   "kept"    → "Shipped" in accent blue
//   "evolved" → "Evolved" in teal
//   "cut"     → "Cut" in muted gray
// ─────────────────────────────────────────────────────────────────────────────

export function IdeationSection({ data }: { data: NonNullable<CaseStudy["ideation"]> }) {
  // Map outcome values to display labels and colors
  const outcomeStyles: Record<
    NonNullable<NonNullable<CaseStudy["ideation"]>["explorations"]>[number]["outcome"] & string,
    { label: string; color: string }
  > = {
    kept: { label: "Shipped", color: ACCENT },          // this idea made it to production
    evolved: { label: "Evolved", color: "#0891b2" },    // this idea changed shape along the way
    cut: { label: "Cut", color: "var(--p-fg-35)" },     // this idea was intentionally dropped
  };
  return (
    <CaseSection
      id="ideation"
      number="07"
      label="Ideation & Exploration"
      eyebrow={data.eyebrow ?? "Branches we walked down"}
      title={data.title}
      lede={data.body}
    >
      {/* Exploration cards — 3-column on desktop, 2 on tablet, 1 on mobile */}
      {data.explorations && data.explorations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.explorations.map((ex, i) => {
            const style = ex.outcome ? outcomeStyles[ex.outcome] : null;
            return (
              <motion.div
                key={ex.title}
                {...fadeInOnView}
                transition={{ ...fadeInOnView.transition, delay: i * 0.04 }}
                className="p-5 flex flex-col gap-3"
                style={{ border: "1px solid var(--p-divide)" }}
              >
                {/* Status badge — "Shipped", "Evolved", or "Cut" */}
                {style && (
                  <span
                    className="uppercase w-fit px-2 py-0.5"
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.16em",
                      color: style.color,
                      border: `1px solid ${style.color}`,
                    }}
                  >
                    {style.label}
                  </span>
                )}
                {/* Idea title */}
                <p style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--p-fg)", letterSpacing: "-0.01em" }}>
                  {ex.title}
                </p>
                {/* Idea description — what it was and why it was kept/cut */}
                <p style={{ fontSize: "0.84rem", lineHeight: 1.7, color: "var(--p-fg-45)" }}>
                  {ex.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Sketches, wireframes, or other exploration imagery */}
      {data.media && data.media.length > 0 && <MediaGallery items={data.media} />}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 08 · Core Flows
// Shows the key user journeys as step-by-step flow diagrams.
//
// Layout:
//   - data.flows → one FlowDiagram per flow (numbered steps in a row)
//   - data.edgeCases → BulletList of edge cases that were handled
//   - data.accessibility → BulletList of accessibility decisions
// ─────────────────────────────────────────────────────────────────────────────

export function FlowsSection({ data }: { data: NonNullable<CaseStudy["flows"]> }) {
  return (
    <CaseSection
      id="flows"
      number="08"
      label="Core Flows"
      eyebrow={data.eyebrow ?? "How people move through the product"}
      title={data.title}
      lede={data.body}
    >
      {/* Each flow is a named sequence of steps */}
      <div className="space-y-10">
        {data.flows.map((flow, fi) => (
          <div key={flow.title} className="space-y-5">
            {/* Flow name with a zero-padded number prefix */}
            <p style={{ fontSize: "0.95rem", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--p-fg)" }}>
              <span className="tabular-nums mr-3" style={{ color: "var(--p-fg-35)", fontWeight: 400 }}>
                {String(fi + 1).padStart(2, "0")}
              </span>
              {flow.title}
            </p>
            {/* The actual step-by-step horizontal flow diagram */}
            <FlowDiagram steps={flow.steps} />
          </div>
        ))}
      </div>

      {/* Edge cases and accessibility — side by side if both exist */}
      {(data.edgeCases?.length || data.accessibility?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {data.edgeCases && data.edgeCases.length > 0 && (
            <div>
              <Eyebrow>Edge cases handled</Eyebrow>
              <div className="mt-4">
                <BulletList items={data.edgeCases} />
              </div>
            </div>
          )}
          {data.accessibility && data.accessibility.length > 0 && (
            <div>
              <Eyebrow>Accessibility reasoning</Eyebrow>
              <div className="mt-4">
                <BulletList items={data.accessibility} />
              </div>
            </div>
          )}
        </div>
      )}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 09 · Design System
// Documents the visual language and component system that underpins the product.
//
// Layout:
//   - data.principles → CalloutGrid of design principles
//   - data.tokens → a grid of color/spacing/type tokens with optional swatch
//   - data.components → TagList of reusable component names
//   - data.accessibilityNotes → BulletList of a11y decisions
// ─────────────────────────────────────────────────────────────────────────────

export function DesignSystemSection({
  data,
}: {
  data: NonNullable<CaseStudy["designSystem"]>;
}) {
  return (
    <CaseSection
      id="design-system"
      number="09"
      label="Design System"
      eyebrow={data.eyebrow ?? "The foundation underneath the surface"}
      title={data.title}
      lede={data.body}
    >
      {/* Design principles — e.g. "Clarity over cleverness" */}
      {data.principles && data.principles.length > 0 && (
        <CalloutGrid items={data.principles} columns={data.principles.length >= 3 ? 3 : 2} />
      )}

      {/* Token grid — color swatches and type/spacing values */}
      {data.tokens && data.tokens.length > 0 && (
        <div>
          <Eyebrow>Token sample</Eyebrow>
          <div
            className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0"
            style={{ border: "1px solid var(--p-divide)" }}
          >
            {data.tokens.map((tk) => (
              <div
                key={tk.label}
                className="p-4 flex items-center gap-3"
                style={{ borderBottom: "1px solid var(--p-divide)" }}
              >
                {/* Optional color swatch — a small square showing the token's color.
                    Set token.sample to a CSS color value (e.g. "#4338CA") to show it. */}
                {tk.sample && (
                  <span
                    aria-hidden
                    className="shrink-0"
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: tk.sample,
                      border: "1px solid var(--p-divide)",
                    }}
                  />
                )}
                <div>
                  {/* Token name — e.g. "Primary", "Body/Sm" */}
                  <p className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--p-fg-35)" }}>
                    {tk.label}
                  </p>
                  {/* Token value — e.g. "#4338CA", "14px / 1.5" */}
                  <p className="tabular-nums" style={{ fontSize: "0.82rem", color: "var(--p-fg)" }}>
                    {tk.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Component names as chips — e.g. "Button", "Modal", "Toast" */}
      {data.components && data.components.length > 0 && (
        <div>
          <Eyebrow>Reusable components</Eyebrow>
          <div className="mt-4">
            <TagList items={data.components} />
          </div>
        </div>
      )}

      {/* Accessibility decisions as a bullet list */}
      {data.accessibilityNotes && data.accessibilityNotes.length > 0 && (
        <div>
          <Eyebrow>Accessibility decisions</Eyebrow>
          <div className="mt-4">
            <BulletList items={data.accessibilityNotes} />
          </div>
        </div>
      )}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10 · Iteration & Testing
// Shows what changed between design rounds and why.
//
// Layout:
//   - data.rounds → a 3-column table-style grid: Round | Change | Result
//   - data.experiments → hypothesis/result pairs
//   - data.comparisons → BeforeAfter side-by-side image pairs
// ─────────────────────────────────────────────────────────────────────────────

export function IterationSection({ data }: { data: NonNullable<CaseStudy["iteration"]> }) {
  return (
    <CaseSection
      id="iteration"
      number="10"
      label="Iteration & Testing"
      eyebrow={data.eyebrow ?? "What the data told us to change"}
      title={data.title}
      lede={data.body}
    >
      {/* Iteration rounds table: Round → Change → Result
          grid-cols-[140px_1fr_1fr] — first column is 140px fixed, other two share remaining space */}
      {data.rounds && data.rounds.length > 0 && (
        <div
          className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr]"
          style={{ borderTop: "1px solid var(--p-divide)" }}
        >
          {data.rounds.map((r) => (
            <div key={r.round} className="contents">
              {/* Round name — e.g. "Round 1", "Beta" */}
              <div className="p-4 md:p-5 md:border-r" style={{ borderBottom: "1px solid var(--p-divide)", borderColor: "var(--p-divide)" }}>
                <p className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--p-fg-35)" }}>Round</p>
                <p className="mt-1" style={{ fontSize: "0.88rem", color: "var(--p-fg)", fontWeight: 500 }}>{r.round}</p>
              </div>
              {/* What changed in this round */}
              <div className="p-4 md:p-5 md:border-r" style={{ borderBottom: "1px solid var(--p-divide)", borderColor: "var(--p-divide)" }}>
                <p className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--p-fg-35)" }}>Change</p>
                <p className="mt-1" style={{ fontSize: "0.86rem", lineHeight: 1.6, color: "var(--p-fg-65)" }}>{r.change}</p>
              </div>
              {/* What the result/outcome was — shown in accent color */}
              <div className="p-4 md:p-5" style={{ borderBottom: "1px solid var(--p-divide)" }}>
                <p className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: ACCENT }}>Result</p>
                <p className="mt-1" style={{ fontSize: "0.86rem", lineHeight: 1.6, color: "var(--p-fg)" }}>{r.result}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experiments — hypothesis + result pairs */}
      {data.experiments && data.experiments.length > 0 && (
        <div>
          <Eyebrow>Experiments</Eyebrow>
          <div className="mt-5 space-y-4">
            {data.experiments.map((ex, i) => (
              <motion.div
                key={i}
                {...fadeInOnView}
                transition={{ ...fadeInOnView.transition, delay: i * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 p-4 md:p-5"
                style={{ border: "1px solid var(--p-divide)" }}
              >
                <div>
                  <p className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--p-fg-35)" }}>Hypothesis</p>
                  <p className="mt-1" style={{ fontSize: "0.86rem", lineHeight: 1.6, color: "var(--p-fg-65)" }}>{ex.hypothesis}</p>
                </div>
                <div>
                  <p className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: ACCENT }}>Result</p>
                  <p className="mt-1" style={{ fontSize: "0.86rem", lineHeight: 1.6, color: "var(--p-fg)" }}>{ex.result}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Before/After image comparisons */}
      {data.comparisons && data.comparisons.length > 0 && (
        <div className="space-y-8">
          {data.comparisons.map((c) => (
            <BeforeAfter
              key={c.label}
              before={c.before}
              after={c.after}
              label={c.label}
            />
          ))}
        </div>
      )}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11 · Final Solution
// The polished "what we shipped" section — lead with visuals, support with callouts.
//
// Layout:
//   - data.media[0] → full-width hero image (priority loaded, larger aspect ratio)
//   - data.media[1+] → remaining images in a MediaGallery
//   - data.highlights → CalloutGrid of key features or decisions
// ─────────────────────────────────────────────────────────────────────────────

export function FinalSolutionSection({
  data,
}: {
  data: NonNullable<CaseStudy["finalSolution"]>;
}) {
  return (
    <CaseSection
      id="final"
      number="11"
      label="Final Solution"
      eyebrow={data.eyebrow ?? "What we shipped"}
      title={data.title}
      lede={data.body}
    >
      {data.media && data.media.length > 0 && (
        <div className="space-y-6">
          {/* First image is treated as a hero — loaded eagerly and shown at 16/9 */}
          <LazyImage
            src={data.media[0].src}
            alt={data.media[0].alt}
            caption={data.media[0].caption}
            aspect={data.media[0].aspect ?? "16/9"}
            priority // loads eagerly since it's the main visual
          />
          {/* Any additional images go into a standard MediaGallery grid */}
          {data.media.length > 1 && (
            <MediaGallery items={data.media.slice(1)} />
          )}
        </div>
      )}

      {/* Feature/decision callout cards below the images */}
      {data.highlights && data.highlights.length > 0 && (
        <CalloutGrid items={data.highlights} columns={data.highlights.length >= 3 ? 3 : 2} />
      )}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12 · Outcomes & Reflection
// The closing section — results, learnings, and what comes next.
//
// Layout:
//   - data.metrics → StatGrid of big-number results
//   - data.results → NumberedList of outcome statements
//   - data.reflections → CalloutGrid of personal learnings
//   - data.nextSteps → BulletList of "if I had another quarter" ideas
// ─────────────────────────────────────────────────────────────────────────────

export function OutcomesSection({ data }: { data: NonNullable<CaseStudy["outcomes"]> }) {
  return (
    <CaseSection
      id="outcomes"
      number="12"
      label="Outcomes & Reflection"
      eyebrow={data.eyebrow ?? "What it changed, and what I'd do next"}
      title={data.title}
      lede={data.body}
    >
      {/* Big number metrics — the headline results */}
      {data.metrics && data.metrics.length > 0 && <StatGrid items={data.metrics} />}

      {/* Numbered list of outcome statements */}
      {data.results && data.results.length > 0 && (
        <div>
          <Eyebrow>Results</Eyebrow>
          <div className="mt-5">
            <NumberedList items={data.results} />
          </div>
        </div>
      )}

      {/* Reflection cards — personal learnings and insights */}
      {data.reflections && data.reflections.length > 0 && (
        <div>
          <Eyebrow>Reflections</Eyebrow>
          <div className="mt-5">
            <CalloutGrid items={data.reflections} columns={data.reflections.length >= 3 ? 3 : 2} />
          </div>
        </div>
      )}

      {/* Next steps — what you'd pursue with more time */}
      {data.nextSteps && data.nextSteps.length > 0 && (
        <div>
          <Eyebrow>If I had another quarter</Eyebrow>
          <div className="mt-5">
            <BulletList items={data.nextSteps} />
          </div>
        </div>
      )}
    </CaseSection>
  );
}
