import { useState, useEffect, useRef } from "react";

const INDIGO  = "#4338CA";
const CORAL   = "#F97316";
const EMERALD = "#10B981";
const AMBER   = "#F59E0B";
const SKY     = "#06B6D4";
const VIOLET  = "#7C3AED";
const ROSE    = "#F43F5E";
const LIME    = "#84CC16";

const DESK_IMG =
  "https://images.unsplash.com/photo-1505304451-3b3b85a91afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlJTIwZGVzayUyMGNyZWF0aXZlfGVufDF8fHx8MTc3MzM2MTgzMHww&ixlib=rb-4.1.0&q=80&w=1080";

/* ── shared label ─────────────────────────────────────────────── */
function Label({ n, text }: { n: number; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div
        style={{
          width: 22, height: 22, borderRadius: "50%", background: INDIGO,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.6rem", color: "#fff", flexShrink: 0, fontWeight: 500,
        }}
      >
        {n}
      </div>
      <span style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--p-fg-35)" }}>
        {text}
      </span>
    </div>
  );
}

function Box({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ border: "1px solid var(--p-divide)", padding: "28px 28px", marginBottom: 56, ...style }}>
      {children}
    </div>
  );
}

/* ── 1. Gradient text ─────────────────────────────────────────── */
function GradientTextDemo() {
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 20 }}>One key word per heading — not the whole line.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 300, letterSpacing: "-0.03em", margin: 0, color: "var(--p-fg)" }}>
          I design{" "}
          <span style={{ background: `linear-gradient(90deg, ${INDIGO}, ${CORAL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            experiences
          </span>
        </p>
        <p style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 300, letterSpacing: "-0.02em", margin: 0 }}>
          <span style={{ background: `linear-gradient(135deg, ${INDIGO} 0%, ${CORAL} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            UX Designer, Creative Technologist
          </span>
        </p>
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 300, letterSpacing: "-0.02em", margin: 0, color: "var(--p-fg)" }}>
          Building the{" "}
          <span style={{ background: `linear-gradient(90deg, ${CORAL}, ${AMBER})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            future of interaction
          </span>{" "}
          one pixel at a time.
        </p>
      </div>
    </Box>
  );
}

/* ── 2. Tinted shadows ───────────────────────────────────────── */
function TintedShadowDemo() {
  const cards = [
    { label: "Gray shadow (before)", shadow: "0 8px 32px rgba(0,0,0,0.10)", accent: "#aaa" },
    { label: "Indigo shadow", shadow: `0 8px 32px ${INDIGO}25`, accent: INDIGO },
    { label: "Coral shadow", shadow: `0 8px 32px ${CORAL}28`, accent: CORAL },
    { label: "Indigo + Coral layered ✓", shadow: `0 4px 16px ${INDIGO}20, 0 12px 40px ${CORAL}14`, accent: INDIGO },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>Hover each card — shadow tint is subtle but makes the palette feel chromatic site-wide.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
        {cards.map((c) => (
          <div
            key={c.label}
            style={{ padding: "20px 18px", border: "1px solid var(--p-divide)", background: "var(--p-bg)", cursor: "default", transition: "box-shadow 0.25s, transform 0.25s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = c.shadow; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: c.accent, marginBottom: 12 }} />
            <p style={{ fontSize: "0.72rem", color: "var(--p-fg)", margin: 0 }}>{c.label}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── 3. Text selection ───────────────────────────────────────── */
function SelectionDemo() {
  return (
    <Box>
      <style>{`
        .sel-indigo::selection { background: ${INDIGO}28; color: ${INDIGO}; }
        .sel-coral::selection  { background: ${CORAL}28;  color: ${CORAL};  }
      `}</style>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 20 }}>Try drag-selecting the text below — each paragraph has a different ::selection style.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p className="sel-indigo" style={{ fontSize: "0.95rem", color: "var(--p-fg)", margin: 0, lineHeight: 1.7 }}>
          <strong style={{ fontWeight: 500 }}>Indigo selection:</strong> "I'm a designer who codes — I sit at the intersection of aesthetics and engineering, building products that feel alive."
        </p>
        <p className="sel-coral" style={{ fontSize: "0.95rem", color: "var(--p-fg)", margin: 0, lineHeight: 1.7 }}>
          <strong style={{ fontWeight: 500 }}>Coral selection:</strong> "Currently open to internships in product design, HCI research, and creative technology."
        </p>
        <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", margin: 0 }}>Recommendation: use indigo globally — it's a tiny touch that rewards curious readers.</p>
      </div>
    </Box>
  );
}

/* ── 4. Animated gradient border ────────────────────────────── */
function AnimatedBorderDemo() {
  return (
    <Box>
      <style>{`
        @keyframes spin-grad { 0% { --grad-angle: 0deg; } 100% { --grad-angle: 360deg; } }
        @property --grad-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        .grad-border-wrap { display: inline-block; padding: 2px; background: conic-gradient(from var(--grad-angle), ${INDIGO}, ${CORAL}, ${INDIGO}); animation: spin-grad 3s linear infinite; }
        .grad-border-inner { background: var(--p-bg); padding: 12px 28px; font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--p-fg); cursor: pointer; transition: background 0.2s; white-space: nowrap; }
        .grad-border-inner:hover { background: ${INDIGO}10; }
        .static-btn { display: inline-block; padding: 13px 28px; font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; color: ${INDIGO}; border: 1.5px solid ${INDIGO}; cursor: pointer; transition: background 0.2s, color 0.2s; }
        .static-btn:hover { background: ${INDIGO}; color: #fff; }
        @keyframes border-pulse { 0%, 100% { box-shadow: 0 0 0 0 ${INDIGO}40; } 50% { box-shadow: 0 0 0 6px ${INDIGO}00; } }
        .pulse-btn { display: inline-block; padding: 13px 28px; font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; color: #fff; background: ${INDIGO}; cursor: pointer; animation: border-pulse 2s ease infinite; }
      `}</style>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>Three CTA styles — static (current), animated gradient border, and pulse glow.</p>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "0.62rem", color: "var(--p-fg-25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Static (current)</p>
          <div className="static-btn">View my work</div>
        </div>
        <div>
          <p style={{ fontSize: "0.62rem", color: "var(--p-fg-25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Rotating gradient border</p>
          <div className="grad-border-wrap"><div className="grad-border-inner">View my work</div></div>
        </div>
        <div>
          <p style={{ fontSize: "0.62rem", color: "var(--p-fg-25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Indigo pulse glow</p>
          <div className="pulse-btn">View my work</div>
        </div>
      </div>
    </Box>
  );
}

/* ── 5. Grain / noise overlay ────────────────────────────────── */
function GrainDemo() {
  return (
    <Box style={{ padding: 0, overflow: "hidden" }}>
      <style>{`
        @keyframes grain-shift { 0%, 100% { transform: translate(0,0); } 10% { transform: translate(-2%,-3%); } 30% { transform: translate(3%,2%); } 50% { transform: translate(-1%,4%); } 70% { transform: translate(4%,-2%); } 90% { transform: translate(-3%,1%); } }
        .grain-layer { position: absolute; inset: -50%; width: 200%; height: 200%; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E"); animation: grain-shift 0.5s steps(1) infinite; opacity: 0.055; pointer-events: none; }
      `}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 200 }}>
        <div style={{ padding: "32px 28px", background: INDIGO, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff8", margin: "0 0 8px" }}>Without grain</p>
          <p style={{ fontSize: "1.1rem", color: "#fff", margin: 0, fontWeight: 300, letterSpacing: "-0.02em" }}>Flat & digital</p>
        </div>
        <div style={{ padding: "32px 28px", background: INDIGO, display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden" }}>
          <div className="grain-layer" />
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff8", margin: "0 0 8px", position: "relative", zIndex: 1 }}>With animated grain</p>
          <p style={{ fontSize: "1.1rem", color: "#fff", margin: 0, fontWeight: 300, letterSpacing: "-0.02em", position: "relative", zIndex: 1 }}>Warm & tactile</p>
        </div>
      </div>
      <div style={{ padding: "14px 28px", borderTop: "1px solid var(--p-divide)" }}>
        <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", margin: 0 }}>The grain layer animates subtly — great over an indigo hero background or colored section bands.</p>
      </div>
    </Box>
  );
}

/* ── 6. Section accent stripe ────────────────────────────────── */
function StripeDemo() {
  const sections = [
    { label: "Hero", color: INDIGO },
    { label: "Projects", color: CORAL },
    { label: "About", color: INDIGO },
    { label: "Skills", color: CORAL },
    { label: "Contact", color: INDIGO },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 24 }}>A 2px full-width top border alternating indigo / coral per section. Subtle rhythm without extra elements.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--p-divide)", overflow: "hidden" }}>
        {sections.map((s, i) => (
          <div key={s.label} style={{ borderTop: `3px solid ${s.color}`, padding: "16px 20px", background: i % 2 === 0 ? "var(--p-bg)" : "rgba(0,0,0,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--p-fg)" }}>{s.label}</span>
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.08em", color: s.color }}>{s.color === INDIGO ? "Indigo stripe" : "Coral stripe"}</span>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── 7. Duotone image hover ──────────────────────────────────── */
function DuotoneDemo() {
  const [hovered, setHovered] = useState<string | null>(null);
  const variants = [
    { id: "normal", label: "Normal", filter: "none" },
    { id: "indigo-duotone", label: "Indigo duotone", filter: "sepia(1) hue-rotate(200deg) saturate(3) brightness(0.85)" },
    { id: "coral-duotone", label: "Coral duotone", filter: "sepia(1) hue-rotate(330deg) saturate(2.5) brightness(0.9)" },
    { id: "hover-desat", label: "Color → B&W on hover\n(your current hero)", filter: hovered === "hover-desat" ? "grayscale(1)" : "none" },
    { id: "hover-indigo", label: "B&W → Indigo on hover", filter: hovered === "hover-indigo" ? "sepia(1) hue-rotate(200deg) saturate(3) brightness(0.85)" : "grayscale(1)" },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 24 }}>Hover the last two cards to see transition effects.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {variants.map((v) => (
          <div key={v.id}>
            <div style={{ overflow: "hidden", aspectRatio: "4/3", marginBottom: 8, cursor: "default" }} onMouseEnter={() => setHovered(v.id)} onMouseLeave={() => setHovered(null)}>
              <img src={DESK_IMG} alt="workspace" style={{ width: "100%", height: "100%", objectFit: "cover", filter: v.filter, transition: "filter 0.4s ease" }} />
            </div>
            <p style={{ fontSize: "0.65rem", color: "var(--p-fg-45)", margin: 0, whiteSpace: "pre-line", lineHeight: 1.4 }}>{v.label}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── 8. Cursor ring color shift ──────────────────────────────── */
function CursorDemo() {
  const [pos, setPos] = useState({ x: 120, y: 60 });
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number>(0);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let a = 0;
    const tick = () => { a = (a + 1.2) % 360; setAngle(a); rafRef.current = requestAnimationFrame(tick); };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const ringColor = `hsl(${angle % 360 < 180 ? 245 + (angle / 180) * 20 : 15 + ((angle - 180) / 180) * 10}, ${angle % 360 < 180 ? 70 : 90}%, ${angle % 360 < 180 ? 50 : 60}%)`;

  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 20 }}>Move your mouse in the zone below — the trailing ring slowly oscillates between indigo and coral.</p>
      <div
        ref={areaRef}
        style={{ height: 180, background: "rgba(0,0,0,0.02)", border: "1px solid var(--p-divide)", position: "relative", overflow: "hidden", cursor: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
        onMouseMove={(e) => { const rect = (areaRef.current as HTMLElement).getBoundingClientRect(); setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top }); }}
      >
        <span style={{ fontSize: "0.7rem", color: "var(--p-fg-25)", letterSpacing: "0.1em", textTransform: "uppercase", pointerEvents: "none" }}>Move cursor here</span>
        <div style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: ringColor, transform: "translate(-50%, -50%)", left: pos.x, top: pos.y, pointerEvents: "none", transition: "left 0.05s, top 0.05s" }} />
        <div style={{ position: "absolute", width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${ringColor}`, transform: "translate(-50%, -50%)", left: pos.x, top: pos.y, pointerEvents: "none", transition: "left 0.18s ease, top 0.18s ease, border-color 0.6s ease" }} />
      </div>
    </Box>
  );
}

/* ── 9. Highlight spans in body copy ─────────────────────────── */
function HighlightDemo() {
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 20 }}>Inline highlights on key phrases — editorial, not flashy.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}>
        <p style={{ fontSize: "0.95rem", color: "var(--p-fg)", lineHeight: 1.75, margin: 0 }}>
          I'm a{" "}
          <mark style={{ background: `${INDIGO}14`, color: INDIGO, padding: "1px 5px", fontStyle: "normal", borderRadius: 2 }}>UX designer and creative technologist</mark>{" "}
          based in San Francisco. I believe the best products are made at the intersection of craft, empathy, and engineering.
        </p>
        <p style={{ fontSize: "0.95rem", color: "var(--p-fg)", lineHeight: 1.75, margin: 0 }}>
          Currently{" "}
          <mark style={{ background: `${CORAL}14`, color: CORAL, padding: "1px 5px", fontStyle: "normal", borderRadius: 2 }}>open to Summer 2026 internships</mark>{" "}
          in product design and HCI research.
        </p>
        <p style={{ fontSize: "0.95rem", color: "var(--p-fg)", lineHeight: 1.75, margin: 0 }}>
          I've shipped work with{" "}
          <mark style={{ background: `${INDIGO}14`, color: INDIGO, padding: "1px 5px", borderRadius: 2 }}>three startups</mark>{" "}
          and contributed to{" "}
          <mark style={{ background: `${CORAL}14`, color: CORAL, padding: "1px 5px", borderRadius: 2 }}>open source design systems</mark>{" "}
          used by thousands of developers.
        </p>
      </div>
    </Box>
  );
}

/* ── 10. Third color candidates ──────────────────────────────── */
function ColorCandidates() {
  const options = [
    { color: EMERALD, name: "Emerald", hex: "#10B981", use: "Availability · Live status · Open-source tags", verdict: "Most versatile — clean semantic role" },
    { color: AMBER,   name: "Amber",   hex: "#F59E0B", use: "Featured work · Awards · Highlights",          verdict: "Warm sibling to coral — use with care near each other" },
    { color: SKY,     name: "Sky / Cyan", hex: "#06B6D4", use: "Engineering / code tags · Technical writing", verdict: "Strong coral contrast — can feel techy/startup-y" },
    { color: VIOLET,  name: "Violet",  hex: "#7C3AED", use: "Creative / art moments · Playground page",     verdict: "Too close to indigo in meaning — use only on Playground" },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 24 }}>All four candidates side-by-side with their proposed semantic roles.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {options.map((o) => (
          <div key={o.name} style={{ border: `1.5px solid ${o.color}30`, padding: "20px 18px", background: `${o.color}06` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 4, background: o.color }} />
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 500, margin: 0, color: "var(--p-fg)" }}>{o.name}</p>
                <p style={{ fontSize: "0.65rem", color: "var(--p-fg-35)", margin: 0 }}>{o.hex}</p>
              </div>
            </div>
            <p style={{ fontSize: "0.7rem", color: o.color, margin: "0 0 8px", lineHeight: 1.5 }}>{o.use}</p>
            <p style={{ fontSize: "0.67rem", color: "var(--p-fg-35)", margin: 0, lineHeight: 1.5 }}>{o.verdict}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── 11. Color-pop stat numbers ──────────────────────────────── */
function StatDemo() {
  const stats = [
    { value: "12", label: "Projects shipped", color: INDIGO  },
    { value: "3",  label: "Internships",       color: CORAL   },
    { value: "40K+", label: "Users reached",   color: EMERALD },
    { value: "8",  label: "Open-source PRs",   color: AMBER   },
    { value: "4",  label: "Hackathon wins",    color: SKY     },
    { value: "∞",  label: "Coffees consumed",  color: VIOLET  },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>
        Large typographic numerals — each in a distinct accent. Works great in an About or Resume section.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 24 }}>
        {stats.map((s) => (
          <div key={s.label}>
            <p style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, letterSpacing: "-0.04em", margin: "0 0 4px", color: s.color, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: "0.68rem", color: "var(--p-fg-35)", margin: 0, lineHeight: 1.4 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── 12. Left-border accent cards ────────────────────────────── */
function BorderCardDemo() {
  const cards = [
    { color: INDIGO,  title: "Design Systems",  body: "Built a token-based system used across 12 products.",         tag: "Design" },
    { color: CORAL,   title: "Research Sprint",  body: "Ran 18 user interviews to validate the onboarding flow.",     tag: "Research" },
    { color: EMERALD, title: "Open Source",      body: "Contributed to react-aria accessibility primitives.",          tag: "Community" },
    { color: AMBER,   title: "Award",            body: "🏆 Best UX — Berkeley Design Invitational 2025.",             tag: "Featured" },
    { color: SKY,     title: "Engineering",      body: "Shipped a real-time collab layer with CRDTs.",                tag: "Code" },
    { color: VIOLET,  title: "Playground",       body: "Generative art series exploring noise & colour fields.",      tag: "Art" },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>
        Thick colored left border — editorial, zero clutter. Tag pill color matches border.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {cards.map((c) => (
          <div
            key={c.title}
            style={{ borderLeft: `3px solid ${c.color}`, paddingLeft: 16, paddingTop: 14, paddingBottom: 14, paddingRight: 14, background: `${c.color}06`, transition: "background 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `${c.color}12`)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = `${c.color}06`)}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--p-fg)", margin: 0 }}>{c.title}</p>
              <span style={{ fontSize: "0.58rem", letterSpacing: "0.08em", color: c.color, background: `${c.color}18`, padding: "2px 7px" }}>{c.tag}</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--p-fg-45)", margin: 0, lineHeight: 1.55 }}>{c.body}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── 13. Full tag ecosystem ──────────────────────────────────── */
function TagEcosystemDemo() {
  const [active, setActive] = useState<string | null>(null);
  const tags = [
    { label: "Figma",          color: INDIGO,  group: "Design" },
    { label: "React",          color: INDIGO,  group: "Design" },
    { label: "TypeScript",     color: INDIGO,  group: "Design" },
    { label: "User Research",  color: CORAL,   group: "Research" },
    { label: "Strategy",       color: CORAL,   group: "Research" },
    { label: "A/B Testing",    color: CORAL,   group: "Research" },
    { label: "Open Source",    color: EMERALD, group: "Community" },
    { label: "ColorStack",     color: EMERALD, group: "Community" },
    { label: "Mentorship",     color: EMERALD, group: "Community" },
    { label: "Award",          color: AMBER,   group: "Featured" },
    { label: "Featured",       color: AMBER,   group: "Featured" },
    { label: "Best UX",        color: AMBER,   group: "Featured" },
    { label: "Engineering",    color: SKY,     group: "Code" },
    { label: "API Design",     color: SKY,     group: "Code" },
    { label: "Systems",        color: SKY,     group: "Code" },
    { label: "Generative Art", color: VIOLET,  group: "Creative" },
    { label: "3D / WebGL",     color: VIOLET,  group: "Creative" },
    { label: "Music",          color: VIOLET,  group: "Creative" },
  ];
  const groups = [
    { name: "Design / Tech",       color: INDIGO  },
    { name: "Research / Strategy", color: CORAL   },
    { name: "Open-source",         color: EMERALD },
    { name: "Featured",            color: AMBER   },
    { name: "Engineering",         color: SKY     },
    { name: "Creative",            color: VIOLET  },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 8 }}>
        Six-color tag system — hover a tag to highlight its group. Each color has clear semantic ownership.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
        {groups.map((g) => (
          <span key={g.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.65rem", color: "var(--p-fg-45)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: g.color, display: "inline-block" }} />{g.name}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tags.map((t) => {
          const dimmed = active && active !== t.group;
          return (
            <span
              key={t.label}
              onMouseEnter={() => setActive(t.group)}
              onMouseLeave={() => setActive(null)}
              style={{ padding: "4px 11px", border: `1px solid ${t.color}${dimmed ? "18" : "50"}`, color: dimmed ? "var(--p-fg-25)" : t.color, background: dimmed ? "transparent" : `${t.color}10`, fontSize: "0.7rem", letterSpacing: "0.04em", cursor: "default", transition: "all 0.18s ease" }}
            >
              {t.label}
            </span>
          );
        })}
      </div>
    </Box>
  );
}

/* ── 14. Neon glow text on dark ──────────────────────────────── */
function NeonGlowDemo() {
  return (
    <Box style={{ background: "#0a0a0b", padding: 0, overflow: "hidden" }}>
      <style>{`
        @keyframes neon-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .neon-indigo { color: ${INDIGO}; text-shadow: 0 0 8px ${INDIGO}80, 0 0 24px ${INDIGO}40; animation: neon-pulse 3s ease infinite; }
        .neon-coral  { color: ${CORAL};  text-shadow: 0 0 8px ${CORAL}80,  0 0 24px ${CORAL}40;  animation: neon-pulse 3s ease infinite 0.5s; }
        .neon-sky    { color: ${SKY};    text-shadow: 0 0 8px ${SKY}80,    0 0 24px ${SKY}40;    animation: neon-pulse 3s ease infinite 1s; }
        .neon-emerald{ color: ${EMERALD};text-shadow: 0 0 8px ${EMERALD}80,0 0 24px ${EMERALD}40;animation: neon-pulse 3s ease infinite 1.5s; }
        .neon-violet { color: ${VIOLET}; text-shadow: 0 0 8px ${VIOLET}80, 0 0 24px ${VIOLET}40; animation: neon-pulse 3s ease infinite 2s; }
        .neon-amber  { color: ${AMBER};  text-shadow: 0 0 8px ${AMBER}80,  0 0 24px ${AMBER}40;  animation: neon-pulse 3s ease infinite 2.5s; }
      `}</style>
      <div style={{ padding: "40px 28px", borderBottom: "1px solid #ffffff10" }}>
        <p style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.3, margin: 0 }}>
          <span className="neon-indigo">Design. </span>
          <span className="neon-coral">Build. </span>
          <span className="neon-sky">Ship. </span>
          <span className="neon-emerald">Grow. </span>
          <span className="neon-violet">Create. </span>
          <span className="neon-amber">Repeat.</span>
        </p>
      </div>
      <div style={{ padding: "18px 28px", display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Figma",       cls: "neon-indigo" },
          { label: "React",       cls: "neon-sky" },
          { label: "Open Source", cls: "neon-emerald" },
          { label: "Research",    cls: "neon-coral" },
          { label: "Art",         cls: "neon-violet" },
          { label: "Award",       cls: "neon-amber" },
        ].map((t) => (
          <span key={t.label} className={t.cls} style={{ padding: "3px 11px", border: "1px solid currentColor", fontSize: "0.68rem", letterSpacing: "0.08em" }}>{t.label}</span>
        ))}
      </div>
      <div style={{ padding: "12px 28px", borderTop: "1px solid #ffffff10" }}>
        <p style={{ fontSize: "0.72rem", color: "#ffffff40", margin: 0 }}>Best for: Playground page, experimental dark sections, not main portfolio.</p>
      </div>
    </Box>
  );
}

/* ── 15. Color pair harmony grid ─────────────────────────────── */
function ColorPairGrid() {
  const colors = [
    { name: "Indigo",  val: INDIGO  },
    { name: "Coral",   val: CORAL   },
    { name: "Emerald", val: EMERALD },
    { name: "Amber",   val: AMBER   },
    { name: "Sky",     val: SKY     },
    { name: "Violet",  val: VIOLET  },
    { name: "Rose",    val: ROSE    },
    { name: "Lime",    val: LIME    },
  ];
  const pairs: [number, number][] = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
    [1,2],[1,3],[1,4],[1,5],[1,6],[1,7],
    [2,3],[2,4],[2,5],[2,6],[2,7],
    [3,4],[3,5],[3,6],[3,7],
    [4,5],[4,6],[4,7],
    [5,6],[5,7],
    [6,7],
  ];
  const ratings: Record<string, { stars: number; note: string }> = {
    "0-1": { stars: 5, note: "Core pair — already live ✓" },
    "0-2": { stars: 4, note: "Calm & trustworthy" },
    "0-3": { stars: 3, note: "Too warm together" },
    "0-4": { stars: 4, note: "Tech-forward feel" },
    "0-5": { stars: 3, note: "Too similar in vibe" },
    "0-6": { stars: 4, note: "High energy, editorial" },
    "0-7": { stars: 2, note: "Indigo kills lime" },
    "1-2": { stars: 5, note: "Warm + fresh ✨" },
    "1-3": { stars: 2, note: "Both warm — clash" },
    "1-4": { stars: 4, note: "Bold contrast pair" },
    "1-5": { stars: 3, note: "Purple dulls coral" },
    "1-6": { stars: 3, note: "Too much red-orange" },
    "1-7": { stars: 4, note: "Zesty & unexpected" },
    "2-3": { stars: 4, note: "Nature palette" },
    "2-4": { stars: 5, note: "Cool tones, clean ✨" },
    "2-5": { stars: 3, note: "Both muted/cool" },
    "2-6": { stars: 4, note: "Vivid, magazine-y" },
    "2-7": { stars: 5, note: "Fresh & natural ✨" },
    "3-4": { stars: 3, note: "Feels warning-y" },
    "3-5": { stars: 4, note: "Warm/cool balance" },
    "3-6": { stars: 2, note: "Both warm — too close" },
    "3-7": { stars: 4, note: "Sunshine palette" },
    "4-5": { stars: 3, note: "Both cool — blend" },
    "4-6": { stars: 5, note: "Vibrant & energetic ✨" },
    "4-7": { stars: 3, note: "Both bright, crowded" },
    "5-6": { stars: 4, note: "Luxury feel" },
    "5-7": { stars: 3, note: "Violet overpowers" },
    "6-7": { stars: 3, note: "Neon alarm combo" },
  };
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>
        Every 2-color combo rated for portfolio harmony — ✨ = top picks beyond the current indigo/coral pair.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
        {pairs.map(([a, b]) => {
          const key = `${a}-${b}`;
          const rating = ratings[key] ?? { stars: 3, note: "—" };
          const ca = colors[a];
          const cb = colors[b];
          return (
            <div
              key={key}
              style={{ border: "1px solid var(--p-divide)", padding: "12px 14px", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = ca.val + "60")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--p-divide)")}
            >
              <div style={{ display: "flex", gap: 0, height: 18, marginBottom: 10, overflow: "hidden" }}>
                <div style={{ flex: 1, background: ca.val }} />
                <div style={{ flex: 1, background: cb.val }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ fontSize: "0.68rem", color: "var(--p-fg)", margin: 0 }}>
                  <span style={{ color: ca.val }}>{ca.name}</span>{" + "}<span style={{ color: cb.val }}>{cb.name}</span>
                </p>
                <span style={{ fontSize: "0.6rem", color: AMBER, letterSpacing: 1, flexShrink: 0, marginLeft: 6 }}>
                  {"★".repeat(rating.stars)}{"☆".repeat(5 - rating.stars)}
                </span>
              </div>
              <p style={{ fontSize: "0.62rem", color: "var(--p-fg-35)", margin: "4px 0 0", lineHeight: 1.4 }}>{rating.note}</p>
            </div>
          );
        })}
      </div>
    </Box>
  );
}

/* ── 16. Color-coded timeline ────────────────────────────────── */
function TimelineDemo() {
  const events = [
    { year: "2026", title: "Senior Thesis — Haptic UX",        desc: "Designing tactile feedback systems for AR glasses.", color: VIOLET  },
    { year: "2025", title: "Figma — Product Design Intern",     desc: "Editor performance & plugin UX improvements.",       color: INDIGO  },
    { year: "2025", title: "Anthropic — Research Intern",       desc: "LLM safety benchmark evaluation tooling.",            color: SKY     },
    { year: "2024", title: "Stripe — SWE Intern",               desc: "Dashboard accessibility overhaul.",                  color: EMERALD },
    { year: "2024", title: "Blueprint Design Lead",             desc: "Led 14-person design team building student apps.",   color: CORAL   },
    { year: "2023", title: "First Open Source PR merged",       desc: "Contributed to react-aria.",                         color: AMBER   },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>
        Vertical timeline — each entry gets a unique accent. Node color = content type.
      </p>
      <div style={{ position: "relative", paddingLeft: 28 }}>
        <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 1, background: "var(--p-divide)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {events.map((e, i) => (
            <div key={i} style={{ position: "relative", paddingBottom: 28 }}>
              <div style={{ position: "absolute", left: -28, top: 4, width: 14, height: 14, borderRadius: "50%", background: e.color, border: `2px solid var(--p-bg)`, boxShadow: `0 0 0 1px ${e.color}` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: "0.62rem", color: e.color, letterSpacing: "0.08em" }}>{e.year}</span>
                <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--p-fg)", margin: 0 }}>{e.title}</p>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--p-fg-45)", margin: 0, lineHeight: 1.55 }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

/* ── 17. Frosted glass tinted panels ─────────────────────────── */
function FrostedGlassDemo() {
  return (
    <Box style={{ padding: 0, overflow: "hidden", background: "linear-gradient(135deg, #0f0f11 0%, #1a1020 50%, #0a1628 100%)" }}>
      <div style={{ padding: "32px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
        {[
          { color: INDIGO,  label: "Design Systems", sub: "12 components" },
          { color: CORAL,   label: "User Research",  sub: "18 interviews" },
          { color: EMERALD, label: "Open Source",    sub: "40K users" },
          { color: AMBER,   label: "Awards",         sub: "4 wins" },
          { color: SKY,     label: "Engineering",    sub: "3 products" },
          { color: VIOLET,  label: "Creative",       sub: "Playground" },
        ].map((p) => (
          <div
            key={p.label}
            style={{ background: `${p.color}14`, border: `1px solid ${p.color}30`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: "20px 18px", transition: "background 0.25s, transform 0.25s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${p.color}28`; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${p.color}14`; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <div style={{ width: 28, height: 3, background: p.color, marginBottom: 14 }} />
            <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "#fff", margin: "0 0 4px" }}>{p.label}</p>
            <p style={{ fontSize: "0.68rem", color: p.color, margin: 0 }}>{p.sub}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 28px", borderTop: "1px solid #ffffff10" }}>
        <p style={{ fontSize: "0.72rem", color: "#ffffff40", margin: 0 }}>Hover each panel. Works on dark hero sections or full-screen overlays.</p>
      </div>
    </Box>
  );
}

/* ── 18. Hero color block variants ───────────────────────────── */
function HeroVariantsDemo() {
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>Four hero layout concepts — different ways to use color more boldly.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {/* A — Indigo band */}
        <div>
          <div style={{ height: 160, border: "1px solid var(--p-divide)", overflow: "hidden" }}>
            <div style={{ background: INDIGO, padding: "12px 20px" }}>
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "#ffffff80", margin: "0 0 2px", textTransform: "uppercase" }}>Alex Chen</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 500, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>Designer & Engineer</p>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <p style={{ fontSize: "0.78rem", color: "var(--p-fg-45)", margin: "0 0 12px", lineHeight: 1.55 }}>Building thoughtful digital products.</p>
              <div style={{ display: "inline-block", padding: "6px 14px", background: INDIGO, fontSize: "0.68rem", letterSpacing: "0.08em", color: "#fff" }}>View Work →</div>
            </div>
          </div>
          <p style={{ fontSize: "0.65rem", color: "var(--p-fg-35)", margin: "8px 0 0", lineHeight: 1.4 }}><span style={{ color: "var(--p-fg-65)" }}>A — Indigo name band</span> — colored header bar, body neutral</p>
        </div>

        {/* B — Split half */}
        <div>
          <div style={{ height: 160, border: "1px solid var(--p-divide)", overflow: "hidden", background: "var(--p-bg)", display: "flex" }}>
            <div style={{ width: "42%", background: INDIGO, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 20px" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "#ffffff80", margin: "0 0 4px", textTransform: "uppercase" }}>Alex Chen</p>
              <p style={{ fontSize: "1rem", fontWeight: 500, color: "#fff", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.2 }}>Designer &<br/>Engineer</p>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 20px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--p-fg-45)", margin: "0 0 12px", lineHeight: 1.55 }}>Thoughtful digital products.</p>
              <div style={{ display: "inline-block", padding: "6px 14px", background: CORAL, fontSize: "0.68rem", letterSpacing: "0.08em", color: "#fff", width: "fit-content" }}>Work →</div>
            </div>
          </div>
          <p style={{ fontSize: "0.65rem", color: "var(--p-fg-35)", margin: "8px 0 0", lineHeight: 1.4 }}><span style={{ color: "var(--p-fg-65)" }}>B — Split half</span> — left half indigo, coral CTA on right</p>
        </div>

        {/* C — Coral band */}
        <div>
          <div style={{ height: 160, border: "1px solid var(--p-divide)", overflow: "hidden" }}>
            <div style={{ background: CORAL, padding: "12px 20px" }}>
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "#ffffff80", margin: "0 0 2px", textTransform: "uppercase" }}>Alex Chen</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 500, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>Designer & Engineer</p>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <p style={{ fontSize: "0.78rem", color: "var(--p-fg-45)", margin: "0 0 12px", lineHeight: 1.55 }}>Building thoughtful digital products.</p>
              <div style={{ display: "inline-block", padding: "6px 14px", background: CORAL, fontSize: "0.68rem", letterSpacing: "0.08em", color: "#fff" }}>View Work →</div>
            </div>
          </div>
          <p style={{ fontSize: "0.65rem", color: "var(--p-fg-35)", margin: "8px 0 0", lineHeight: 1.4 }}><span style={{ color: "var(--p-fg-65)" }}>C — Coral name band</span> — warmer, more personal tone</p>
        </div>

        {/* D — Multi-stripe */}
        <div>
          <div style={{ height: 160, border: "1px solid var(--p-divide)", overflow: "hidden", background: "var(--p-bg)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 20px", gap: 8 }}>
            {[["Designer", INDIGO], ["Builder", CORAL], ["Researcher", SKY], ["Creator", VIOLET]].map(([role, col]) => (
              <div key={role as string} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 3, height: 14, background: col as string, flexShrink: 0 }} />
                <span style={{ fontSize: "0.88rem", fontWeight: 300, letterSpacing: "-0.01em", color: "var(--p-fg)" }}>{role as string}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.65rem", color: "var(--p-fg-35)", margin: "8px 0 0", lineHeight: 1.4 }}><span style={{ color: "var(--p-fg-65)" }}>D — Multi-stripe roles</span> — thin colored stripes per role, no fill</p>
        </div>
      </div>
    </Box>
  );
}

/* ── 19. Gradient dividers ───────────────────────────────────── */
function GradientDividerDemo() {
  const dividers = [
    { label: "Indigo → Coral (core pair)",              gradient: `linear-gradient(90deg, ${INDIGO}, ${CORAL})` },
    { label: "Coral → Emerald (warm → fresh)",          gradient: `linear-gradient(90deg, ${CORAL}, ${EMERALD})` },
    { label: "Indigo → Sky (cool spectrum)",             gradient: `linear-gradient(90deg, ${INDIGO}, ${SKY})` },
    { label: "Amber → Rose (sunset)",                   gradient: `linear-gradient(90deg, ${AMBER}, ${ROSE})` },
    { label: "Full spectrum",                           gradient: `linear-gradient(90deg, ${INDIGO}, ${SKY}, ${EMERALD}, ${AMBER}, ${CORAL}, ${ROSE})` },
    { label: "Fade-in coral from transparent",          gradient: `linear-gradient(90deg, transparent, ${CORAL})` },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>Full-width gradient lines as section dividers — replace the flat gray border.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {dividers.map((d) => (
          <div key={d.label}>
            <div style={{ height: 2, background: d.gradient, marginBottom: 8 }} />
            <p style={{ fontSize: "0.68rem", color: "var(--p-fg-35)", margin: 0 }}>{d.label}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── 20. Colored callout banners ─────────────────────────────── */
function CalloutDemo() {
  const callouts = [
    { color: INDIGO,  icon: "✦", title: "Open to opportunities", body: "Looking for Summer 2026 internships in product design and HCI research.", cta: "Get in touch →" },
    { color: CORAL,   icon: "♻", title: "Currently building",    body: "A haptic feedback design system for next-gen AR wearables — shipping Q3.", cta: "See progress →" },
    { color: EMERALD, icon: "⬡", title: "Open source",           body: "Contributing to accessibility tooling. 3 merged PRs this semester.", cta: "GitHub →" },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>Full-bleed colored callout banners — same structure, different accent personality.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {callouts.map((c) => (
          <div key={c.title} style={{ padding: "24px 28px", background: `${c.color}10`, borderTop: `3px solid ${c.color}`, display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "0 20px", alignItems: "center" }}>
            <span style={{ fontSize: "1.2rem", color: c.color }}>{c.icon}</span>
            <div>
              <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--p-fg)", margin: "0 0 3px" }}>{c.title}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--p-fg-45)", margin: 0, lineHeight: 1.55 }}>{c.body}</p>
            </div>
            <span style={{ fontSize: "0.7rem", color: c.color, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{c.cta}</span>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── 21. Color-wash section bands ────────────────────────────── */
function WashBandDemo() {
  const bands = [
    { color: INDIGO, label: "About", tag: "Who I am" },
    { color: CORAL,  label: "Projects", tag: "What I've built" },
    { color: EMERALD,label: "Community", tag: "Who I serve" },
    { color: SKY,    label: "Engineering", tag: "How I build" },
  ];
  return (
    <Box style={{ padding: 0, overflow: "hidden" }}>
      {bands.map((b) => (
        <div
          key={b.label}
          style={{ padding: "24px 28px", background: `${b.color}08`, borderTop: `1px solid ${b.color}20`, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.25s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `${b.color}14`)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = `${b.color}08`)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: b.color }} />
            <span style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--p-fg)", letterSpacing: "-0.01em" }}>{b.label}</span>
          </div>
          <span style={{ fontSize: "0.65rem", color: b.color, letterSpacing: "0.06em" }}>{b.tag}</span>
        </div>
      ))}
      <div style={{ padding: "14px 28px", borderTop: "1px solid var(--p-divide)" }}>
        <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", margin: 0 }}>Hover each row — very subtle wash, but gives each section a unique warmth.</p>
      </div>
    </Box>
  );
}

/* ── 22. Color-split skill bars ──────────────────────────────── */
function SkillBarColorDemo() {
  const skills = [
    { name: "Figma / Design Systems", level: 95, color: INDIGO  },
    { name: "React & TypeScript",     level: 90, color: SKY     },
    { name: "User Research",          level: 85, color: CORAL   },
    { name: "Python / ML",            level: 80, color: VIOLET  },
    { name: "Open Source",            level: 75, color: EMERALD },
    { name: "Prototyping",            level: 70, color: AMBER   },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>
        Each skill bar gets its own color — communicates category, not just level.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {skills.map((s) => (
          <div key={s.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "0.78rem", color: "var(--p-fg-65)" }}>{s.name}</span>
              <span style={{ fontSize: "0.7rem", color: s.color }}>{s.level}%</span>
            </div>
            <div style={{ height: 3, background: "var(--p-fg-08)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${s.level}%`, background: `linear-gradient(90deg, ${s.color}60, ${s.color})`, transition: "width 0.8s ease" }} />
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── 23. Scrolling color ticker ──────────────────────────────── */
function ColorTickerDemo() {
  const items = ["Design", "Engineering", "Research", "Open Source", "AI", "Accessibility", "Motion", "Systems", "Typography", "Interaction"];
  const colors = [INDIGO, CORAL, EMERALD, AMBER, SKY, VIOLET, ROSE, INDIGO, CORAL, EMERALD];
  return (
    <Box style={{ padding: 0, overflow: "hidden" }}>
      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ticker-track { display: flex; animation: ticker 18s linear infinite; width: max-content; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div style={{ overflow: "hidden", padding: "20px 0", borderBottom: "1px solid var(--p-divide)" }}>
        <div className="ticker-track">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              style={{
                padding: "4px 18px",
                marginRight: 10,
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: colors[i % colors.length],
                border: `1px solid ${colors[i % colors.length]}40`,
                background: `${colors[i % colors.length]}08`,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding: "14px 28px" }}>
        <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", margin: 0 }}>Hover to pause. Great as a skills marquee or below the hero heading.</p>
      </div>
    </Box>
  );
}

/* ── 24. Project card accent corners ─────────────────────────── */
function AccentCornerDemo() {
  const cards = [
    { color: INDIGO, title: "Design System v2",    year: "2025", tag: "Product Design" },
    { color: CORAL,  title: "AI Onboarding",       year: "2025", tag: "UX Research" },
    { color: EMERALD,title: "Accessibility Audit", year: "2024", tag: "Open Source" },
    { color: AMBER,  title: "Motion Language",     year: "2024", tag: "Featured" },
  ];
  return (
    <Box>
      <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)", marginBottom: 28 }}>
        Corner accents — the colored bracket lives in the top-left only. Architectural, not loud.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
        {cards.map((c) => (
          <div
            key={c.title}
            style={{ border: "1px solid var(--p-divide)", padding: "20px 18px", position: "relative", overflow: "hidden", background: "var(--p-bg)", transition: "box-shadow 0.25s, transform 0.25s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${c.color}20`; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            {/* Corner bracket */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 18, height: 18, borderTop: `2px solid ${c.color}`, borderLeft: `2px solid ${c.color}` }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 18, height: 18, borderBottom: `2px solid ${c.color}20`, borderRight: `2px solid ${c.color}20` }} />
            <div style={{ marginBottom: 12, marginTop: 4 }}>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: c.color, background: `${c.color}12`, padding: "2px 6px" }}>{c.tag}</span>
            </div>
            <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--p-fg)", margin: "0 0 4px", letterSpacing: "-0.01em" }}>{c.title}</p>
            <p style={{ fontSize: "0.68rem", color: "var(--p-fg-35)", margin: 0 }}>{c.year}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
export function PaletteDemo() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", maxWidth: 960, margin: "0 auto", padding: "72px 32px 120px" }}>
      {/* Page header */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          {[INDIGO, CORAL, EMERALD, AMBER, SKY, VIOLET, ROSE, LIME].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 300, letterSpacing: "-0.03em", margin: "0 0 12px", color: "var(--p-fg)" }}>
          Colour & Effect{" "}
          <span style={{ background: `linear-gradient(90deg, ${INDIGO}, ${CORAL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Demo
          </span>
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--p-fg-45)", margin: 0, maxWidth: 520, lineHeight: 1.65 }}>
          24 techniques across gradients, shadows, layout, animation, and colour combinations. Nothing is committed to the real site — this is a sandbox.
        </p>
      </div>

      <Label n={1}  text="Gradient text — single word or full role line" />         <GradientTextDemo />
      <Label n={2}  text="Tinted shadows — hover a card to compare" />               <TintedShadowDemo />
      <Label n={3}  text="::selection highlight — drag-select the text below" />     <SelectionDemo />
      <Label n={4}  text="Animated gradient border on CTAs" />                       <AnimatedBorderDemo />
      <Label n={5}  text="Grain / noise overlay on coloured backgrounds" />          <GrainDemo />
      <Label n={6}  text="Section accent stripe — alternating top border" />         <StripeDemo />
      <Label n={7}  text="Duotone image treatment on hover" />                       <DuotoneDemo />
      <Label n={8}  text="Cursor ring — oscillates between indigo and coral" />      <CursorDemo />
      <Label n={9}  text="Inline highlight spans in body copy" />                    <HighlightDemo />
      <Label n={10} text="Third colour candidates — four options compared" />        <ColorCandidates />
      <Label n={11} text="Color-pop stat numbers — typographic numerals" />          <StatDemo />
      <Label n={12} text="Left-border accent cards — editorial style" />             <BorderCardDemo />
      <Label n={13} text="Full 6-color tag ecosystem — hover to group-highlight" />  <TagEcosystemDemo />
      <Label n={14} text="Neon glow text on dark — Playground page candidate" />     <NeonGlowDemo />
      <Label n={15} text="Color pair harmony grid — all combos rated ★★★★★" />     <ColorPairGrid />
      <Label n={16} text="Color-coded timeline — node color = content type" />       <TimelineDemo />
      <Label n={17} text="Frosted glass tinted panels on dark — hover each" />       <FrostedGlassDemo />
      <Label n={18} text="Hero color block variants — 4 layout strategies" />        <HeroVariantsDemo />
      <Label n={19} text="Gradient dividers — replace the flat gray section line" /> <GradientDividerDemo />
      <Label n={20} text="Colored callout banners — status / announcement blocks" /> <CalloutDemo />
      <Label n={21} text="Color-wash section bands — subtle hover warmth per row" /> <WashBandDemo />
      <Label n={22} text="Color-split skill bars — category color, not just level" /><SkillBarColorDemo />
      <Label n={23} text="Scrolling color ticker — skills marquee with tinted tags" /><ColorTickerDemo />
      <Label n={24} text="Accent corner brackets — architectural card framing" />    <AccentCornerDemo />
    </div>
  );
}
