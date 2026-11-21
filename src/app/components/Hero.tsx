import { useEffect, useRef, useState } from "react";
import { SITE } from "../data/site";

// Phrases the headline cycles through. Each is something a PM turns into a product.
const PROBLEMS = ["messy problems", "vague ideas", "user pain points", "tangled workflows"];

const ACCENT = "#B65670"; // dusty rose (button fill; white text passes AA)
const SAGE = "#557A63"; // sage accent

const PETAL = "M0 0 C-6 -5 -6 -14 0 -19 C6 -14 6 -5 0 0Z";
const ANGLES = [0, 72, 144, 216, 288];
const INNER_ANGLES = [36, 108, 180, 252, 324];

// Each bloom sits exactly on the end of its stem. Positions are the stem tips.
const BLOOMS = [
  { x: 150, y: 124, s: 1.5, delay: 2.1 },
  { x: 80, y: 200, s: 1.1, delay: 2.7 },
  { x: 222, y: 220, s: 1.1, delay: 3.1 },
] as const;

// Leaves are attached to a point on a stem (x, y) and grow outward at `angle`.
// Spacing was checked so no leaf touches another leaf; each only touches its own stem.
const LEAVES = [
  { x: 149.5, y: 330, angle: -138.4, len: 54, w: 11, bend: -6, delay: 1.6 },
  { x: 149.1, y: 262, angle: -42.1, len: 54, w: 11, bend: 6, delay: 1.3 },
  { x: 94.2, y: 300, angle: -157.8, len: 64, w: 13, bend: -6, delay: 1.0 },
  { x: 209.1, y: 308, angle: -21.9, len: 64, w: 13, bend: 6, delay: 1.9 },
] as const;

// Natural-looking leaf in its own coordinates (base at 0,0, growing along +x): one side
// fuller than the other, a pointed tip that droops by `bend`, and a curved midrib.
function leafPath(len: number, w: number, bend: number) {
  return `M0 0 C${len * 0.2} ${-w * 1.1} ${len * 0.62} ${-w * 1.05 + bend * 0.4} ${len} ${bend} C${len * 0.72} ${w * 0.75 + bend * 0.5} ${len * 0.3} ${w * 0.95} 0 0Z`;
}

// A point on the curved midrib (quadratic from the base to near the tip).
function ribPoint(len: number, bend: number, t: number) {
  const [x0, y0, cx, cy, x2, y2] = [2, 0, len * 0.5, bend * 0.3, len * 0.92, bend * 0.92];
  const u = 1 - t;
  return [u * u * x0 + 2 * u * t * cx + t * t * x2, u * u * y0 + 2 * u * t * cy + t * t * y2];
}

// The upper half of the leaf (between the upper edge and the midrib), used for soft shading.
function shadePath(len: number, w: number, bend: number) {
  return `M0 0 C${len * 0.2} ${-w * 1.1} ${len * 0.62} ${-w * 1.05 + bend * 0.4} ${len} ${bend} L${len * 0.92} ${bend * 0.92} Q${len * 0.5} ${bend * 0.3} 2 0Z`;
}

// Curved midrib plus two pairs of side veins that branch forward off it.
function veinPath(len: number, w: number, bend: number) {
  const side = [0.32, 0.62]
    .map((t) => {
      const [px, py] = ribPoint(len, bend, t);
      const dx = len * 0.16;
      const dy = w * 0.62 * (1 - t * 0.5);
      return `M${px} ${py} Q${px + dx * 0.5} ${py - dy * 0.2} ${px + dx} ${py - dy} M${px} ${py} Q${px + dx * 0.5} ${py + dy * 0.2} ${px + dx} ${py + dy}`;
    })
    .join(" ");
  return `M2 0 Q${len * 0.5} ${bend * 0.3} ${len * 0.92} ${bend * 0.92} ${side}`;
}

// A simple five-petal bloom, in full bloom from the start (outer petals plus an inner ring).
// On load it draws itself, fills, and then the inner petals open out. Hover fills and grows it.
// Clicking spins it and sets off a shower of falling flowers.
function Bloom({
  b,
  spinning,
  onActivate,
  onSpinEnd,
}: {
  b: (typeof BLOOMS)[number];
  spinning: boolean;
  onActivate: () => void;
  onSpinEnd: () => void;
}) {
  return (
    <g
      transform={`translate(${b.x} ${b.y})`}
      className={`bloom${spinning ? " is-spinning" : ""}`}
      tabIndex={0}
      role="button"
      aria-label="Flower. Press to make it spin and release falling flowers."
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      onAnimationEnd={(e) => {
        if (e.animationName === "bloom-spin") onSpinEnd();
      }}
    >
      <g className="bloom-sway">
        <circle r={24 * b.s} fill="transparent" stroke="none" />
        <g className="bloom-spin">
          <g className="bloom-hover">
            <g className="bloom-pop" style={{ animationDelay: `${b.delay}s` }}>
            <g transform={`scale(${b.s})`}>
              <g className="bloom-fill-base" style={{ animationDelay: `${b.delay + 1.0}s` }} fill="var(--p-accent)" stroke="none">
                {ANGLES.map((r) => (
                  <path key={r} transform={`rotate(${r})`} d={PETAL} />
                ))}
              </g>
              <g className="bloom-fill-hover" fill="var(--p-accent)" stroke="none">
                {ANGLES.map((r) => (
                  <path key={r} transform={`rotate(${r})`} d={PETAL} />
                ))}
              </g>
              {/* inner ring of petals: opens out after the outline is drawn */}
              <g className="bloom-open-layer" style={{ animationDelay: `${b.delay + 1.5}s` }} strokeWidth={1.4 / b.s}>
                {INNER_ANGLES.map((r) => (
                  <path key={r} transform={`rotate(${r}) scale(0.85)`} d={PETAL} fill="var(--p-accent)" fillOpacity="0.55" />
                ))}
              </g>
              <g strokeWidth={1.7 / b.s}>
                {ANGLES.map((r, i) => (
                  <path
                    key={r}
                    pathLength={1}
                    transform={`rotate(${r})`}
                    style={{ animationDelay: `${b.delay + i * 0.12}s` }}
                    d={PETAL}
                  />
                ))}
                <circle pathLength={1} r="2.2" style={{ animationDelay: `${b.delay + 0.7}s` }} />
              </g>
            </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

// A symmetrical spray: three stems that run into the centre of each bloom, with
// leaves attached to the stems. On load: stems draw up, leaves unfurl from the stem and
// fill in, blooms grow and open. Afterwards the whole spray sways very slowly.
function Botanical({
  spinning,
  onActivate,
  onSpinEnd,
}: {
  spinning: boolean[];
  onActivate: (i: number) => void;
  onSpinEnd: (i: number) => void;
}) {
  return (
    <svg
      role="group"
      aria-label="Decorative flowers"
      viewBox="0 0 300 430"
      className="botanical w-full h-auto max-h-[78vh] overflow-visible"
      fill="none"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        {/* base of the leaf is deeper, the tip fades lighter */}
        <linearGradient id="leaf-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" style={{ stopColor: "var(--p-sage)", stopOpacity: 0.85 }} />
          <stop offset="55%" style={{ stopColor: "var(--p-sage)", stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: "var(--p-sage)", stopOpacity: 0.12 }} />
        </linearGradient>
      </defs>
      <g className="botanical-sway">
        <g stroke="var(--p-sage)">
          {/* stems, each ending exactly at its bloom's centre */}
          <path pathLength={1} d="M150 428 C150 350 148 250 150 124" />
          <path pathLength={1} style={{ animationDelay: "0.4s" }} d="M150 428 C146 372 80 340 80 200" />
          <path pathLength={1} style={{ animationDelay: "0.8s" }} d="M150 428 C154 382 222 350 222 220" />
          {/* leaves, each starting on its stem */}
          {LEAVES.map((l, i) => (
            <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.angle})`}>
              <g className="leaf-grow" style={{ animationDelay: `${l.delay}s` }}>
                <g className="leaf-fill" style={{ animationDelay: `${l.delay + 0.9}s` }} stroke="none">
                  <path d={leafPath(l.len, l.w, l.bend)} fill="url(#leaf-grad)" />
                  <path d={shadePath(l.len, l.w, l.bend)} fill="var(--p-sage)" fillOpacity="0.18" />
                </g>
                <path pathLength={1} style={{ animationDelay: `${l.delay + 0.1}s` }} d={leafPath(l.len, l.w, l.bend)} />
                <path
                  pathLength={1}
                  strokeWidth="1"
                  style={{ animationDelay: `${l.delay + 0.7}s` }}
                  d={veinPath(l.len, l.w, l.bend)}
                />
              </g>
            </g>
          ))}
        </g>
        <g stroke="var(--p-accent)">
          {BLOOMS.map((b, i) => (
            <Bloom
              key={i}
              b={b}
              spinning={spinning[i]}
              onActivate={() => onActivate(i)}
              onSpinEnd={() => onSpinEnd(i)}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

// A small flower that drifts down, swaying and turning as it falls.
// Fill / outline pairs: a range of pinks from pale blush to deep rose.
const PINKS = [
  ["#F9D2DC", "#D98BA3"],
  ["#F4B6C6", "#C96F8D"],
  ["#EE9AB2", "#B65670"],
  ["#E57F9F", "#A44765"],
  ["#D9668B", "#8F3A57"],
  ["#F6C4D0", "#CF7C96"],
] as const; // [pale edge, deep centre]

type Drop = { id: number; x: number; size: number; fall: number; dur: number; sway: number; delay: number; tone: number };

function FallingFlower({ d }: { d: Drop }) {
  return (
    <span
      className="flower-fall absolute"
      style={
        {
          left: `${d.x}%`,
          top: 0,
          animationDuration: `${d.dur}s`,
          animationDelay: `${d.delay}s`,
          "--fall": `${d.fall}px`,
          "--sway": `${d.sway}px`,
        } as React.CSSProperties
      }
    >
      <svg
        className="flower-sway"
        width={d.size}
        height={d.size}
        viewBox="-24 -24 48 48"
        style={{ animationDuration: `${d.dur / 2.2}s` }}
      >
        {ANGLES.map((r) => (
          <path key={r} transform={`rotate(${r}) scale(1.15)`} d={PETAL} fill={`url(#drop-grad-${d.tone})`} />
        ))}
      </svg>
    </span>
  );
}

// Shared gradients for the falling flowers: deep in the centre, paler at the edges.
function DropGradients() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        {PINKS.map(([edge, centre], i) => (
          <radialGradient key={i} id={`drop-grad-${i}`} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="20">
            <stop offset="0%" stopColor={centre} />
            <stop offset="100%" stopColor={edge} />
          </radialGradient>
        ))}
      </defs>
    </svg>
  );
}

export function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const dropId = useRef(0);
  const [spinning, setSpinning] = useState([false, false, false]);
  const [drops, setDrops] = useState<Drop[]>([]);
  const showering = useRef(false);

  // Click (or Enter) on a flower: it spins, and flowers fall from the very top of the page
  // down to the start of the projects section (the bottom edge of this section).
  const activate = (i: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSpinning((cur) => cur.map((v, j) => (j === i ? true : v)));
    if (showering.current || !heroRef.current) return;
    showering.current = true;
    const fall = heroRef.current.offsetHeight;
    setDrops(
      Array.from({ length: 28 }, (_, k) => ({
        id: ++dropId.current,
        x: 3 + Math.random() * 94,
        size: 16 + Math.round(Math.random() * 14),
        fall,
        dur: 5.5 + Math.random() * 3,
        sway: 14 + Math.round(Math.random() * 22),
        delay: (k / 28) * 3.5 + Math.random() * 0.6,
        tone: Math.floor(Math.random() * PINKS.length),
      }))
    );
    window.setTimeout(() => {
      setDrops([]);
      showering.current = false;
    }, 13000);
  };
  const endSpin = (i: number) => setSpinning((cur) => cur.map((v, j) => (j === i ? false : v)));

  // Rotate the headline phrase. Skipped entirely when the visitor prefers reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setPhraseIdx((i) => (i + 1) % PROBLEMS.length), 5500);
    return () => clearInterval(id);
  }, []);

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="relative grid md:grid-cols-12 items-center gap-6 pt-20 pb-2 px-6 md:px-12 max-w-6xl mx-auto"
    >
      <div className="md:col-span-7">
        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <span
            className="uppercase"
            style={{ fontSize: "0.72rem", letterSpacing: "0.16em", color: "var(--p-fg-65)" }}
          >
            {SITE.name}
          </span>
          <span
            className="flex items-center gap-2 px-2.5 py-1"
            style={{ border: `1px solid ${SAGE}55`, backgroundColor: `${SAGE}12` }}
          >
            <span className="relative flex items-center justify-center w-2 h-2">
              <span
                className="absolute inline-block w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: SAGE, opacity: 0.5 }}
              />
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: SAGE }} />
            </span>
            <span
              className="uppercase"
              style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.08em", color: SAGE }}
            >
              {SITE.availability}
            </span>
          </span>
        </div>

        <h1
          className="mb-8"
          style={{
            fontSize: "clamp(2.2rem, 5.2vw, 4.4rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            color: "var(--p-fg)",
          }}
        >
          I turn{" "}
          <em
            key={phraseIdx}
            className="hero-phrase"
            style={{ color: "var(--p-accent)", fontWeight: 300 }}
          >
            {PROBLEMS[phraseIdx]}
          </em>{" "}
          into{" "}
          <em style={{ color: "var(--p-sage)", fontWeight: 300 }}>shipped products.</em>
        </h1>

        <p
          className="mb-10 uppercase"
          style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", color: "var(--p-fg-65)" }}
        >
          {SITE.proof}
        </p>

        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <button
            onClick={scrollToWork}
            className="hero-btn-primary group inline-flex items-center gap-3 px-6 py-3"
            style={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            See my work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <a
            href={SITE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-outline inline-flex items-center gap-2 px-6 py-3"
            style={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            Resume ↗
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="pb-0.5"
            style={{
              fontSize: "0.875rem",
              color: "var(--p-fg-65)",
              borderBottom: "1px solid var(--p-fg-18)",
              overflowWrap: "anywhere",
            }}
          >
            {SITE.email}
          </a>
        </div>
      </div>

      <div className="md:col-span-5 flex flex-col items-center">
        <div className="w-full max-w-[240px] md:max-w-[400px]">
          <Botanical spinning={spinning} onActivate={activate} onSpinEnd={endSpin} />
        </div>
      </div>

      {/* Falling flowers. Clipped to this section so they stop at the start of Projects. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <DropGradients />
        {drops.map((d) => (
          <FallingFlower key={d.id} d={d} />
        ))}
      </div>
    </section>
  );
}
