import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { Media, Highlight } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Tokens & shared motion variants
// ─────────────────────────────────────────────────────────────────────────────

export const ACCENT = "#4338CA";

export const fadeInOnView = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px 0px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

// ─────────────────────────────────────────────────────────────────────────────
// Editorial text primitives
// ─────────────────────────────────────────────────────────────────────────────

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="uppercase block"
      style={{
        fontSize: "0.62rem",
        letterSpacing: "0.18em",
        color: "var(--p-fg-35)",
      }}
    >
      {children}
    </span>
  );
}

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

export function Caption({ children }: { children: ReactNode }) {
  return (
    <p
      className="mt-3"
      style={{
        fontSize: "0.7rem",
        letterSpacing: "0.04em",
        color: "var(--p-fg-35)",
      }}
    >
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pull quote
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
        “{text}”
      </span>
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

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            aria-hidden
            className="shrink-0 mt-2"
            style={{
              width: 18,
              height: 1,
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

export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
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
// Meta row — under hero (Role / Timeline / Team / Stack / Impact)
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
// Key/value grid (for Context & Constraints)
// ─────────────────────────────────────────────────────────────────────────────

export function KeyValueGrid({
  items,
}: {
  items: { label: string; body: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-8">
      {items.map((it) => (
        <motion.div key={it.label} {...fadeInOnView}>
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
// Stat grid (for Outcomes / Impact)
// ─────────────────────────────────────────────────────────────────────────────

export function StatGrid({ items }: { items: Highlight[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
      {items.map((s, i) => (
        <motion.div
          key={s.label + i}
          {...fadeInOnView}
          transition={{
            ...fadeInOnView.transition,
            delay: i * 0.06,
          }}
        >
          <p
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              color: "var(--p-fg)",
            }}
          >
            {s.value}
          </p>
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
// Lazy image with subtle hover scale
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
          aspectRatio: aspect,
          backgroundColor: "var(--p-surface)",
          border: "1px solid var(--p-divide)",
        }}
      >
        <img
          src={src}
          alt={alt ?? caption ?? ""}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.025]"
        />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </motion.figure>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Media gallery — auto chooses columns based on count
// ─────────────────────────────────────────────────────────────────────────────

export function MediaGallery({
  items,
  columns,
}: {
  items: Media[];
  columns?: 1 | 2 | 3;
}) {
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
          aspect={m.aspect ?? (cols === 1 ? "16/9" : "4/3")}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Flow diagram — horizontal connected steps (Core Flows / Process)
// ─────────────────────────────────────────────────────────────────────────────

export function FlowDiagram({
  steps,
}: {
  steps: { label: string; body: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-4">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          {...fadeInOnView}
          transition={{
            ...fadeInOnView.transition,
            delay: i * 0.06,
          }}
          className="relative pl-5 md:pl-0 md:pt-5"
          style={{
            borderLeft: undefined,
            borderTop: undefined,
          }}
        >
          <span
            aria-hidden
            className="hidden md:block absolute top-0 left-0 right-0"
            style={{ height: 1, backgroundColor: "var(--p-divide)" }}
          />
          <span
            aria-hidden
            className="md:hidden absolute top-0 bottom-0 left-0"
            style={{ width: 1, backgroundColor: "var(--p-divide)" }}
          />
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
// Architecture diagram — layered system view
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
            delay: i * 0.05,
          }}
          className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3 md:gap-6 items-start p-4 md:p-5"
          style={{ border: "1px solid var(--p-divide)" }}
        >
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
          <div>
            <div className="flex flex-wrap gap-1.5">
              {layer.items.map((it) => (
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
// Before / After comparison
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
              <img
                src={item.src}
                alt={`${label ?? "Comparison"} — ${item.tag}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
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
// Tag list
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
// Two-column callout (used by Pain Points, Reflections, Highlights, etc.)
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
            delay: i * 0.05,
          }}
          className="p-5 md:p-6"
          style={{ border: "1px solid var(--p-divide)" }}
        >
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
