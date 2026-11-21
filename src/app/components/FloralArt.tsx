import { useEffect, useState } from "react";

// Small, static floral pieces reused below the hero. All flat colour, no gradients:
// flowers have a rose outline, solid pink petals and a clear butter-yellow centre; leaves are
// lance-shaped with a midrib, solid soft sage and a darker sage outline.

const PETAL_FILL = "#B65670"; // dark pink
const OUTLINE = "#8F3A57";
const WING = "#C4B5E0"; // soft lavender: a third colour that sits with pink and green
const WING_EDGE = "#5B4A7A";
const LEAF_FILL = "#557A63"; // dark green
const LEAF_STROKE = "#3F6450";
const STEM = "#3F6450";
const MIDRIB = "#A9C4B2";

const PETAL = "M0 0 C-6 -5 -6 -14 0 -19 C6 -14 6 -5 0 0Z";
const ANGLES = [0, 72, 144, 216, 288];

// Outlined bloom with a clear centre.
export function OutlineBloom({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={OUTLINE} strokeWidth={1.15 / s} strokeLinejoin="round">
      {ANGLES.map((r) => (
        <path key={r} transform={`rotate(${r})`} d={PETAL} fill={PETAL_FILL} />
      ))}
    </g>
  );
}

// A lance-shaped leaf with a midrib. Base at (x, y), growing along `angle` degrees.
export function Leaf({ x, y, angle, len, w }: { x: number; y: number; angle: number; len: number; w: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} stroke={LEAF_STROKE} strokeWidth="0.9" strokeLinejoin="round" strokeLinecap="round">
      <path d={`M0 0 C${len * 0.25} ${-w} ${len * 0.7} ${-w * 0.8} ${len} 0 C${len * 0.7} ${w * 0.8} ${len * 0.25} ${w} 0 0Z`} fill={LEAF_FILL} />
      <path d={`M1.5 0 L${len * 0.82} 0`} stroke={MIDRIB} strokeWidth="0.7" fill="none" />
    </g>
  );
}

const svgProps = { "aria-hidden": true, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

// A small three-flower spray. Used in the Contact section and on the 404 page.
export function Bouquet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 210" className={className} {...svgProps}>
      <g stroke={STEM} strokeWidth="1.5">
        <path d="M80 208 C80 170 79 120 80 60" />
        <path d="M80 208 C78 184 42 168 42 100" />
        <path d="M80 208 C82 190 118 176 118 112" />
      </g>
      <Leaf x={79.7} y={160} angle={-140} len={34} w={9} />
      <Leaf x={79.6} y={128} angle={-40} len={34} w={9} />
      <Leaf x={59.9} y={170} angle={-170} len={30} w={8} />
      <Leaf x={103.1} y={172} angle={-10} len={30} w={8} />
      <OutlineBloom x={80} y={52} s={1.3} />
      <OutlineBloom x={42} y={92} s={0.95} />
      <OutlineBloom x={118} y={104} s={0.95} />
    </svg>
  );
}

// A little branch (two leaves and a bloom). Sits beside a photo, never on top of it.
export function Branch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 90" className={className} {...svgProps}>
      <path d="M6 86 C26 74 44 56 62 32" stroke={STEM} strokeWidth="1.5" />
      <Leaf x={23.5} y={73.6} angle={-94} len={22} w={7} />
      <Leaf x={39.2} y={59.1} angle={9} len={22} w={7} />
      <OutlineBloom x={64} y={26} s={1.1} />
    </svg>
  );
}

// A short branch used as the rule under section headings: a gently curved stem with
// leaves alternating either side and one at the tip.
export function BranchRule({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 -6 120 34" width="120" height="34" className={className} {...svgProps}>
      <path d="M2 14 C34 6 62 22 96 12" stroke={STEM} strokeWidth="1.5" />
      <Leaf x={22.6} y={11.7} angle={-50} len={18} w={6} />
      <Leaf x={48.2} y={13.8} angle={56} len={18} w={6} />
      <Leaf x={72.4} y={15.4} angle={-50} len={18} w={6} />
      <Leaf x={96} y={12} angle={-16} len={20} w={6} />
    </svg>
  );
}

// The same outline-only flower that sits before each section label: five petal outlines in the
// accent colour, no fill, no centre. Used next to the name in the nav and footer and on dividers.
export function TinyBloom({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="-24 -24 48 48"
      className={className}
      fill="none"
      stroke="var(--p-accent)"
      strokeWidth="3"
      strokeLinejoin="round"
    >
      {ANGLES.map((r) => (
        <path key={r} transform={`rotate(${r})`} d={PETAL} />
      ))}
    </svg>
  );
}

// True when the browser window is close to the full width of the screen. The edge vines only
// show then, so they never crowd a smaller window.
function useFullScreenWidth() {
  const [full, setFull] = useState(false);
  useEffect(() => {
    const check = () => setFull(window.innerWidth >= window.screen.availWidth - 40);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return full;
}

// A short, sparse vine that grows out of the page edge: the stem starts at the very edge,
// curves in and up, with leaves along it and a flower at the tip. Mirrored for the right edge.
// Hidden on narrow screens.
export function EdgeVine({ side, top, className = "" }: { side: "left" | "right"; top: string; className?: string }) {
  const full = useFullScreenWidth();
  if (!full) return null;
  return (
    <div
      aria-hidden="true"
      className={`edge-vine pointer-events-none absolute ${className}`}
      style={{
        top,
        // calc(50% - 50vw) puts the vine at the edge of the screen even when the section is centred
        ...(side === "left" ? { left: "calc(50% - 50vw)" } : { right: "calc(50% - 50vw)", transform: "scaleX(-1)" }),
      }}
    >
      <svg width="46" height="200" viewBox="0 0 46 200" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M0 196 C16 194 26 176 22 150 C18 124 30 108 24 82 C20 62 24 48 22 40"
          stroke={STEM}
          strokeWidth="1.5"
        />
        <Leaf x={22.5} y={167.9} angle={-28} len={18} w={5.5} />
        <Leaf x={21.8} y={128.8} angle={-138} len={18} w={5.5} />
        <Leaf x={25.7} y={96.6} angle={-35} len={18} w={5.5} />
        <Leaf x={22.2} y={56.5} angle={-143} len={16} w={5} />
        <OutlineBloom x={22} y={28} s={0.65} />
      </svg>
    </div>
  );
}

// A small sprout (stem, two leaves, one flower) that can be planted along a line.
export function Sprout({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 44 96" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 95 C22 74 24 54 22 30" stroke={STEM} strokeWidth="1.5" />
      <Leaf x={22.4} y={74} angle={-145} len={17} w={5} />
      <Leaf x={23} y={56} angle={-35} len={17} w={5} />
      <OutlineBloom x={22} y={20} s={0.75} />
    </svg>
  );
}

// Short tuft of grass for planting along the footer line.
export function Grass({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 30" className={className} fill="none" strokeLinecap="round">
      <g stroke={STEM} strokeWidth="1.6">
        <path d="M20 30 C20 20 19 12 17 4" />
        <path d="M20 30 C21 20 24 12 28 6" />
        <path d="M20 30 C17 22 12 16 6 14" />
        <path d="M20 30 C23 24 30 20 36 19" />
      </g>
    </svg>
  );
}

// A butterfly that drifts around and flaps its wings (CSS, see theme.css). Decorative.
export function Butterfly({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div aria-hidden="true" className={`butterfly-drift pointer-events-none absolute ${className}`} style={style}>
      <svg viewBox="0 0 40 32" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-full h-auto">
        <g className="butterfly-wings" stroke={WING_EDGE} strokeWidth="1.1">
          <g fill={WING}>
            <path d="M20 14 C12 1 2 2 3 12 C4 18 14 19 20 15Z" />
            <path d="M20 14 C28 1 38 2 37 12 C36 18 26 19 20 15Z" />
            <path d="M20 16 C13 17 6 20 9 27 C13 31 19 25 20 18Z" />
            <path d="M20 16 C27 17 34 20 31 27 C27 31 21 25 20 18Z" />
          </g>
          <circle cx="10" cy="10" r="2.2" fill={PETAL_FILL} stroke="none" />
          <circle cx="30" cy="10" r="2.2" fill={PETAL_FILL} stroke="none" />
        </g>
        <g stroke={WING_EDGE} strokeWidth="1">
          <ellipse cx="20" cy="16" rx="1.4" ry="7.5" fill={WING_EDGE} />
          <path d="M20 9 Q17 3 13 2" />
          <path d="M20 9 Q23 3 27 2" />
        </g>
      </svg>
    </div>
  );
}

// An iced latte (clear cup, milk and espresso layers, ice, a pink straw) that gives itself a
// little shake every few seconds, like it's being mixed. Animation lives in theme.css.
export function IcedLatte({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 44" className={`iced-latte ${className}`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2 L21 14" stroke={PETAL_FILL} strokeWidth="2.4" />
      <path d="M5 12 L8 40 C8.2 41.8 9.4 43 11 43 H21 C22.6 43 23.8 41.8 24 40 L27 12Z" fill="#FBF3E8" stroke={STEM} strokeWidth="1.4" />
      <path d="M6.3 24 L7.4 38.6 C7.5 40 8.4 41.2 10 41.2 H22 C23.6 41.2 24.5 40 24.6 38.6 L25.7 24Z" fill="#E9D8C0" />
      <path d="M5.6 15 L6.3 24 H25.7 L26.4 15Z" fill="#8B5E3C" opacity="0.85" />
      <g className="iced-latte-ice" fill="#fff" fillOpacity="0.85" stroke="#B9D1C0" strokeWidth="0.9">
        <rect x="9" y="16.5" width="6" height="6" rx="1.4" />
        <rect x="16.5" y="18" width="6" height="6" rx="1.4" />
        <rect x="12" y="27" width="6" height="6" rx="1.4" />
      </g>
      <path d="M4 12 H28" stroke={STEM} strokeWidth="1.6" />
    </svg>
  );
}
