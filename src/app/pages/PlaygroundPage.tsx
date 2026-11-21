// The Playground: small experiments, short notes, what I'm into right now, and a little
// garden you can plant flowers in. Items come from src/content/playground/*.json and are
// edited at /admin/playground (local only). Sections with nothing published stay hidden.

import { useRef, useState } from "react";
import { BranchRule, EdgeVine } from "../components/FloralArt";
import { listedPlaygroundItems } from "../../content/playground";
import type { PlaygroundItem } from "../../content/types";

const SAGE = "#557A63";
const STEM = "#3F6450";

// ─── Garden toy ──────────────────────────────────────────────────────────────

const PETAL = "M0 0 C-6 -5 -6 -14 0 -19 C6 -14 6 -5 0 0Z";
const ANGLES = [0, 72, 144, 216, 288];
// [petal fill, outline] pairs: pale blush to deep rose, plus a lavender for variety.
const TONES = [
  ["#F4B6C6", "#B65670"],
  ["#EE9AB2", "#A44765"],
  ["#D9668B", "#8F3A57"],
  ["#B65670", "#7A3048"],
  ["#F9D2DC", "#C96F8D"],
  ["#C4B5E0", "#5B4A7A"],
] as const;

type Planted = { id: number; x: number; y: number; tone: number; size: number; flip: boolean };

function GardenFlower({ p }: { p: Planted }) {
  const [fill, edge] = TONES[p.tone];
  const h = p.size; // height in px
  return (
    <svg
      className="garden-flower absolute"
      width={h * 0.55}
      height={h}
      viewBox="0 0 44 80"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ left: p.x - (h * 0.55) / 2, top: p.y - h, scale: p.flip ? "-1 1" : undefined }}
      aria-hidden="true"
    >
      <path d="M22 80 C22 62 24 46 22 26" stroke={STEM} strokeWidth="1.6" />
      <g transform="translate(22 56) rotate(-140)" fill="#A9C4B2" stroke={STEM} strokeWidth="1">
        <path d="M0 0 C4 -5 11 -4 16 0 C11 4 4 5 0 0Z" />
      </g>
      <g transform="translate(22.5 46) rotate(-38)" fill="#A9C4B2" stroke={STEM} strokeWidth="1">
        <path d="M0 0 C4 -5 11 -4 16 0 C11 4 4 5 0 0Z" />
      </g>
      <g transform="translate(22 20) scale(0.95)" stroke={edge} strokeWidth="1.3">
        {ANGLES.map((r) => (
          <path key={r} transform={`rotate(${r})`} d={PETAL} fill={fill} />
        ))}
      </g>
    </svg>
  );
}

function GardenToy() {
  const [flowers, setFlowers] = useState<Planted[]>([]);
  const nextId = useRef(0);
  const plotRef = useRef<HTMLDivElement>(null);

  const plant = (e: React.MouseEvent) => {
    if (!plotRef.current) return;
    const r = plotRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = Math.max(80, e.clientY - r.top); // keep the bloom inside the plot
    setFlowers((cur) => [
      ...cur.slice(-59),
      {
        id: ++nextId.current,
        x,
        y,
        tone: Math.floor(Math.random() * TONES.length),
        size: 72 + Math.round(Math.random() * 50),
        flip: Math.random() > 0.5,
      },
    ]);
  };

  return (
    <section className="mb-14">
      <SectionLabel>Garden</SectionLabel>
      <div className="flex items-end justify-between gap-4 mb-3">
        <h2 style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--p-fg)" }}>
          Plant something
        </h2>
        <button
          type="button"
          onClick={() => setFlowers([])}
          className="pb-0.5 transition-colors duration-200"
          style={{ fontSize: "0.8rem", color: "var(--p-accent)", borderBottom: "1px solid var(--p-fg-18)", opacity: flowers.length ? 1 : 0.4 }}
          disabled={!flowers.length}
        >
          Clear garden
        </button>
      </div>
      <div
        ref={plotRef}
        onClick={plant}
        role="button"
        tabIndex={0}
        aria-label="Garden. Click anywhere to plant a flower."
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && plotRef.current) {
            e.preventDefault();
            const r = plotRef.current.getBoundingClientRect();
            plant({ clientX: r.left + Math.random() * r.width, clientY: r.top + r.height * (0.5 + Math.random() * 0.5) } as React.MouseEvent);
          }
        }}
        className="relative overflow-hidden cursor-pointer"
        style={{ height: 260, border: "1px solid var(--p-divide)", backgroundColor: "var(--p-surface)" }}
      >
        {flowers.map((f) => (
          <GardenFlower key={f.id} p={f} />
        ))}
        {/* the ground */}
        <div className="absolute left-0 right-0 bottom-0 h-px" style={{ backgroundColor: SAGE, opacity: 0.5 }} />
        {!flowers.length && (
          <p
            className="absolute inset-0 flex items-center justify-center text-center px-6"
            style={{ fontSize: "0.85rem", color: "var(--p-fg-45)" }}
          >
            Click anywhere to plant a flower
          </p>
        )}
      </div>
    </section>
  );
}

// ─── Shared bits ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <span
      className="tracking-widest uppercase block mb-3"
      style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--p-fg-45)" }}
    >
      {children}
    </span>
  );
}

function DraftBadge() {
  return (
    <span
      className="inline-block px-1.5 py-0.5 mr-2 align-middle"
      style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.08em", color: "#fff", backgroundColor: "#8F5B2E" }}
    >
      DRAFT
    </span>
  );
}

function Heading({ children }: { children: string }) {
  return (
    <h2
      className="mb-5"
      style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--p-fg)" }}
    >
      {children}
    </h2>
  );
}

function ExternalLink({ item }: { item: PlaygroundItem }) {
  if (!item.link) return null;
  return (
    <a
      href={item.link}
      target={item.link.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 pb-0.5 transition-colors duration-200"
      style={{ fontSize: "0.82rem", color: "var(--p-accent)", borderBottom: "1px solid var(--p-fg-18)" }}
    >
      {item.linkLabel || "Open"} ↗
    </a>
  );
}

function Tags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {tags.map((t) => (
        <span
          key={t}
          className="px-2 py-0.5"
          style={{ fontSize: "0.68rem", color: SAGE, border: `1px solid ${SAGE}55`, backgroundColor: `${SAGE}10` }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Experiments({ items }: { items: PlaygroundItem[] }) {
  if (!items.length) return null;
  return (
    <section className="mb-14">
      <SectionLabel>Experiments</SectionLabel>
      <Heading>Small builds and demos</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((i) => (
          <article key={i.slug} className="p-5" style={{ border: "1px solid var(--p-divide)" }}>
            {i.image && <img src={i.image} alt="" className="w-full h-auto mb-4" />}
            <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--p-fg)" }} className="mb-2">
              {i.status === "draft" && <DraftBadge />}
              {i.title}
            </h3>
            <Tags tags={i.tags} />
            {i.summary && (
              <p className="mb-4" style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--p-fg-65)" }}>
                {i.summary}
              </p>
            )}
            <ExternalLink item={i} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Notes({ items }: { items: PlaygroundItem[] }) {
  if (!items.length) return null;
  return (
    <section className="mb-14">
      <SectionLabel>Notes</SectionLabel>
      <Heading>Short writing</Heading>
      <div>
        {items.map((i) => (
          <article key={i.slug} className="py-5" style={{ borderTop: "1px solid var(--p-divide)" }}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--p-fg)" }}>
                {i.status === "draft" && <DraftBadge />}
                {i.title}
              </h3>
              {i.date && <span style={{ fontSize: "0.75rem", color: "var(--p-fg-45)" }}>{i.date}</span>}
            </div>
            {i.summary && (
              <p className="mb-2" style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--p-fg-65)" }}>
                {i.summary}
              </p>
            )}
            {i.body && (
              <details className="mb-2">
                <summary className="cursor-pointer" style={{ fontSize: "0.82rem", color: "var(--p-accent)" }}>
                  Read more
                </summary>
                <div className="mt-3 space-y-3" style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--p-fg-65)" }}>
                  {i.body.split(/\n\s*\n/).map((para, k) => (
                    <p key={k}>{para}</p>
                  ))}
                </div>
              </details>
            )}
            <ExternalLink item={i} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Interests({ items }: { items: PlaygroundItem[] }) {
  if (!items.length) return null;
  return (
    <section className="mb-14">
      <SectionLabel>Currently into</SectionLabel>
      <Heading>Outside of work</Heading>
      <ul className="flex flex-wrap gap-3">
        {items.map((i) => (
          <li
            key={i.slug}
            className="px-4 py-2"
            title={i.summary || undefined}
            style={{ fontSize: "0.9rem", color: "var(--p-fg)", border: "1px solid var(--p-divide)", backgroundColor: "var(--p-surface)" }}
          >
            {i.status === "draft" && <DraftBadge />}
            {i.title}
            {i.summary && (
              <span className="block mt-0.5" style={{ fontSize: "0.75rem", color: "var(--p-fg-45)" }}>
                {i.summary}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function PlaygroundPage() {
  const experiments = listedPlaygroundItems.filter((i) => i.kind === "experiment");
  const notes = listedPlaygroundItems.filter((i) => i.kind === "note");
  const interests = listedPlaygroundItems.filter((i) => i.kind === "interest");
  const nothingYet = !experiments.length && !notes.length;

  return (
    <div className="relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      <EdgeVine side="left" top="40%" />
      <div className="pt-24 pb-6 px-6 md:px-12 max-w-6xl mx-auto">
        <SectionLabel>Playground</SectionLabel>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            color: "var(--p-fg)",
          }}
        >
          Things I tinker with
        </h1>
        <BranchRule className="mt-3 mb-10" />

        <GardenToy />
        <Experiments items={experiments} />
        <Notes items={notes} />
        <Interests items={interests} />

        {nothingYet && import.meta.env.DEV && (
          <p
            className="px-4 py-3 mb-10"
            style={{ fontSize: "0.82rem", color: "var(--p-fg-65)", border: "1px dashed var(--p-fg-18)" }}
          >
            Local note: no experiments or notes yet. Add some at{" "}
            <a href="/admin/playground" style={{ color: "var(--p-accent)" }}>
              /admin/playground
            </a>
            . This message never shows on the live site.
          </p>
        )}
      </div>
    </div>
  );
}
