import { INDIGO, CORAL, EMERALD, AMBER, SKY, VIOLET } from "../data/tagColors";

const ITEMS: { label: string; color: string }[] = [
  { label: "TypeScript",           color: SKY     },
  { label: "React",                color: INDIGO  },
  { label: "Figma",                color: INDIGO  },
  { label: "Next.js",              color: INDIGO  },
  { label: "Human-Centered Design",color: CORAL   },
  { label: "Python",               color: VIOLET  },
  { label: "AI / ML",              color: SKY     },
  { label: "Open Source",          color: EMERALD },
  { label: "Product Thinking",     color: CORAL   },
  { label: "UC Berkeley",          color: AMBER   },
  { label: "Node.js",              color: SKY     },
  { label: "Framer",               color: CORAL   },
  { label: "Systems Design",       color: INDIGO  },
  { label: "Accessibility",        color: EMERALD },
  { label: "Computer Vision",      color: SKY     },
  { label: "Design Engineering",   color: INDIGO  },
];

export function MarqueeTicker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        borderTop: `2px solid ${INDIGO}50`,
        borderBottom: "1px solid var(--p-divide)",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        userSelect: "none",
        backgroundColor: INDIGO + "06",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          animation: "marquee-scroll 32s linear infinite",
          willChange: "transform",
          paddingTop: "0.65rem",
          paddingBottom: "0.65rem",
          gap: "0.6rem",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "0.63rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: item.color,
                backgroundColor: item.color + "12",
                border: `1px solid ${item.color}35`,
                padding: "3px 10px",
              }}
            >
              {item.label}
            </span>
            <span style={{ color: CORAL, fontSize: "0.55rem", opacity: 0.5 }} aria-hidden>✦</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}