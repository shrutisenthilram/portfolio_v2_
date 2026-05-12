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

const ACCENT = "#4338CA";

// ─────────────────────────────────────────────────────────────────────────────
// 01 · Overview
// ─────────────────────────────────────────────────────────────────────────────

export function OverviewSection({ data }: { data: NonNullable<CaseStudy["overview"]> }) {
  return (
    <CaseSection
      id="overview"
      number="01"
      label="Overview"
      eyebrow={data.eyebrow}
      title={data.title}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
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
        {data.highlights && data.highlights.length > 0 && (
          <div className="md:col-span-5">
            <div
              className="grid grid-cols-2 gap-y-6 gap-x-4 p-5 md:p-6"
              style={{ border: "1px solid var(--p-divide)" }}
            >
              {data.highlights.map((h) => (
                <div key={h.label}>
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
// ─────────────────────────────────────────────────────────────────────────────

export function ProblemSection({ data }: { data: NonNullable<CaseStudy["problem"]> }) {
  return (
    <CaseSection
      id="problem"
      number="02"
      label="Problem"
      eyebrow={data.eyebrow ?? "The pain we set out to solve"}
      title={data.title}
      lede={data.body}
    >
      {data.painPoints && data.painPoints.length > 0 && (
        <CalloutGrid items={data.painPoints} columns={data.painPoints.length >= 3 ? 3 : 2} />
      )}
      {data.quote && <PullQuote text={data.quote.text} attribution={data.quote.attribution} />}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 03 · Context & Constraints
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
      <KeyValueGrid items={data.constraints} />

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
                <p
                  className="uppercase mt-4"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    color: ACCENT,
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
      {data.methods && data.methods.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {data.methods.map((m, i) => (
            <motion.div
              key={i}
              {...fadeInOnView}
              transition={{ ...fadeInOnView.transition, delay: i * 0.04 }}
              className="flex items-baseline gap-4"
            >
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
                <p
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    color: "var(--p-fg)",
                  }}
                >
                  {m.label}
                </p>
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

      {data.insights && data.insights.length > 0 && (
        <div>
          <Eyebrow>Synthesized Insights</Eyebrow>
          <div className="mt-5">
            <CalloutGrid items={data.insights} columns={data.insights.length >= 3 ? 3 : 2} />
          </div>
        </div>
      )}

      {data.quote && <PullQuote text={data.quote.text} attribution={data.quote.attribution} />}

      {data.media && data.media.length > 0 && <MediaGallery items={data.media} />}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 05 · Product Strategy
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        {data.targetUsers && data.targetUsers.length > 0 && (
          <div>
            <Eyebrow>Target users</Eyebrow>
            <ul className="mt-4 space-y-4">
              {data.targetUsers.map((u, i) => (
                <li key={i}>
                  <p
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 500,
                      color: "var(--p-fg)",
                    }}
                  >
                    {u.label}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "0.84rem",
                      lineHeight: 1.7,
                      color: "var(--p-fg-45)",
                    }}
                  >
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

      {data.mvp && (
        <div>
          <Eyebrow>MVP Scope</Eyebrow>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="p-5"
              style={{
                border: `1px solid ${ACCENT}33`,
                backgroundColor: ACCENT + "0A",
              }}
            >
              <p
                className="uppercase"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  color: ACCENT,
                }}
              >
                In Scope
              </p>
              <ul className="mt-3 space-y-2">
                {data.mvp.included.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: "0.86rem",
                      color: "var(--p-fg)",
                      lineHeight: 1.6,
                    }}
                  >
                    + {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5" style={{ border: "1px solid var(--p-divide)" }}>
              <p
                className="uppercase"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  color: "var(--p-fg-35)",
                }}
              >
                Explicitly Out
              </p>
              <ul className="mt-3 space-y-2">
                {data.mvp.excluded.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: "0.86rem",
                      color: "var(--p-fg-45)",
                      lineHeight: 1.6,
                    }}
                  >
                    – {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {data.metrics && data.metrics.length > 0 && (
        <div>
          <Eyebrow>Success metrics</Eyebrow>
          <div className="mt-6">
            <StatGrid items={data.metrics} />
          </div>
        </div>
      )}

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
      <ArchitectureDiagram layers={data.layers} />

      {data.notes && data.notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          {data.notes.map((n, i) => (
            <motion.p
              key={i}
              {...fadeInOnView}
              transition={{ ...fadeInOnView.transition, delay: i * 0.04 }}
              style={{
                fontSize: "0.86rem",
                lineHeight: 1.72,
                color: "var(--p-fg-45)",
              }}
            >
              {n}
            </motion.p>
          ))}
        </div>
      )}

      {data.media && data.media.length > 0 && <MediaGallery items={data.media} />}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 07 · Ideation & Exploration
// ─────────────────────────────────────────────────────────────────────────────

export function IdeationSection({ data }: { data: NonNullable<CaseStudy["ideation"]> }) {
  const outcomeStyles: Record<
    NonNullable<NonNullable<CaseStudy["ideation"]>["explorations"]>[number]["outcome"] & string,
    { label: string; color: string }
  > = {
    kept: { label: "Shipped", color: ACCENT },
    evolved: { label: "Evolved", color: "#0891b2" },
    cut: { label: "Cut", color: "var(--p-fg-35)" },
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
                <p
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    color: "var(--p-fg)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {ex.title}
                </p>
                <p
                  style={{
                    fontSize: "0.84rem",
                    lineHeight: 1.7,
                    color: "var(--p-fg-45)",
                  }}
                >
                  {ex.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      {data.media && data.media.length > 0 && <MediaGallery items={data.media} />}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 08 · Core Flows
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
      <div className="space-y-10">
        {data.flows.map((flow, fi) => (
          <div key={flow.title} className="space-y-5">
            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "var(--p-fg)",
              }}
            >
              <span
                className="tabular-nums mr-3"
                style={{ color: "var(--p-fg-35)", fontWeight: 400 }}
              >
                {String(fi + 1).padStart(2, "0")}
              </span>
              {flow.title}
            </p>
            <FlowDiagram steps={flow.steps} />
          </div>
        ))}
      </div>

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
      {data.principles && data.principles.length > 0 && (
        <CalloutGrid items={data.principles} columns={data.principles.length >= 3 ? 3 : 2} />
      )}

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
                  <p
                    className="uppercase"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.16em",
                      color: "var(--p-fg-35)",
                    }}
                  >
                    {tk.label}
                  </p>
                  <p
                    className="tabular-nums"
                    style={{ fontSize: "0.82rem", color: "var(--p-fg)" }}
                  >
                    {tk.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.components && data.components.length > 0 && (
        <div>
          <Eyebrow>Reusable components</Eyebrow>
          <div className="mt-4">
            <TagList items={data.components} />
          </div>
        </div>
      )}

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
      {data.rounds && data.rounds.length > 0 && (
        <div
          className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr]"
          style={{ borderTop: "1px solid var(--p-divide)" }}
        >
          {data.rounds.map((r) => (
            <div
              key={r.round}
              className="contents"
            >
              <div
                className="p-4 md:p-5 md:border-r"
                style={{
                  borderBottom: "1px solid var(--p-divide)",
                  borderColor: "var(--p-divide)",
                }}
              >
                <p
                  className="uppercase"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    color: "var(--p-fg-35)",
                  }}
                >
                  Round
                </p>
                <p
                  className="mt-1"
                  style={{ fontSize: "0.88rem", color: "var(--p-fg)", fontWeight: 500 }}
                >
                  {r.round}
                </p>
              </div>
              <div
                className="p-4 md:p-5 md:border-r"
                style={{
                  borderBottom: "1px solid var(--p-divide)",
                  borderColor: "var(--p-divide)",
                }}
              >
                <p
                  className="uppercase"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    color: "var(--p-fg-35)",
                  }}
                >
                  Change
                </p>
                <p
                  className="mt-1"
                  style={{ fontSize: "0.86rem", lineHeight: 1.6, color: "var(--p-fg-65)" }}
                >
                  {r.change}
                </p>
              </div>
              <div
                className="p-4 md:p-5"
                style={{ borderBottom: "1px solid var(--p-divide)" }}
              >
                <p
                  className="uppercase"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    color: ACCENT,
                  }}
                >
                  Result
                </p>
                <p
                  className="mt-1"
                  style={{ fontSize: "0.86rem", lineHeight: 1.6, color: "var(--p-fg)" }}
                >
                  {r.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

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
                  <p
                    className="uppercase"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.16em",
                      color: "var(--p-fg-35)",
                    }}
                  >
                    Hypothesis
                  </p>
                  <p
                    className="mt-1"
                    style={{ fontSize: "0.86rem", lineHeight: 1.6, color: "var(--p-fg-65)" }}
                  >
                    {ex.hypothesis}
                  </p>
                </div>
                <div>
                  <p
                    className="uppercase"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.16em",
                      color: ACCENT,
                    }}
                  >
                    Result
                  </p>
                  <p
                    className="mt-1"
                    style={{ fontSize: "0.86rem", lineHeight: 1.6, color: "var(--p-fg)" }}
                  >
                    {ex.result}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

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
          <LazyImage
            src={data.media[0].src}
            alt={data.media[0].alt}
            caption={data.media[0].caption}
            aspect={data.media[0].aspect ?? "16/9"}
            priority
          />
          {data.media.length > 1 && (
            <MediaGallery items={data.media.slice(1)} />
          )}
        </div>
      )}

      {data.highlights && data.highlights.length > 0 && (
        <CalloutGrid items={data.highlights} columns={data.highlights.length >= 3 ? 3 : 2} />
      )}
    </CaseSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12 · Outcomes & Reflection
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
      {data.metrics && data.metrics.length > 0 && <StatGrid items={data.metrics} />}

      {data.results && data.results.length > 0 && (
        <div>
          <Eyebrow>Results</Eyebrow>
          <div className="mt-5">
            <NumberedList items={data.results} />
          </div>
        </div>
      )}

      {data.reflections && data.reflections.length > 0 && (
        <div>
          <Eyebrow>Reflections</Eyebrow>
          <div className="mt-5">
            <CalloutGrid items={data.reflections} columns={data.reflections.length >= 3 ? 3 : 2} />
          </div>
        </div>
      )}

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
