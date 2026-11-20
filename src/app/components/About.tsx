import { Link } from "react-router";
import { SITE } from "../data/site";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

const education = [
  { label: "BS Computer Science", sub: "UC San Diego · 2024–2027" },
  { label: "BS Business Economics", sub: "UC San Diego · 2024–2027" },
  { label: "Minor: Design", sub: "UC San Diego · 2024–2027" },
];

const facts = [
  { k: "Based in", v: "San Diego (Bay Area native)", coral: false },
  { k: "Open to", v: SITE.availability, coral: true },
  { k: "Focus", v: "Product management", coral: false },
];

export function About() {
  return (
    <section
      id="about"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="py-10 px-6 md:px-12 max-w-6xl mx-auto"
    >
      <span
        className="tracking-widest uppercase block mb-9 md:mb-12 pb-5"
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.15em",
          color: "var(--p-fg-45)",
          borderBottom: "1px solid var(--p-divide)",
        }}
      >
        About
      </span>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        {/* Photo + quick facts */}
        <div className="md:col-span-4">
          <div className="relative w-40 h-52 sm:w-44 sm:h-56 mb-8">
            <div
              className="absolute -bottom-2 -right-2 w-full h-full pointer-events-none"
              style={{ border: `1px solid ${ACCENT}50` }}
            />
            <img
              src="/images/bbb.jpeg"
              alt="Shruti standing next to a large balanced rock formation"
              className="relative w-full h-full object-cover"
              style={{ display: "block" }}
            />
          </div>
          <dl className="space-y-3">
            {facts.map(({ k, v, coral }) => (
              <div key={k}>
                <dt style={{ fontSize: "0.72rem", color: "var(--p-fg-45)" }}>{k}</dt>
                <dd
                  style={{
                    fontSize: "0.88rem",
                    color: coral ? CORAL : "var(--p-fg-65)",
                    fontWeight: coral ? 500 : 400,
                  }}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Bio */}
        <div className="md:col-span-5">
          <p
            className="mb-5"
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: 1.85,
              letterSpacing: "-0.005em",
              color: "var(--p-fg-65)",
            }}
          >
            I'm a Computer Science and Business Economics double major at UC San
            Diego with a minor in Design, and I'm working toward a career in
            product management. I like the space where engineering, business,
            and real people meet, which is why I've led product for open-source
            teams, interned on an advisor platform at LPL Financial, and
            researched AI systems.
          </p>
          <p
            className="mb-8"
            style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--p-fg-45)" }}
          >
            Outside of academics, I love going for walks and drinking iced
            lattes. I play the piano, paint, and enjoy trying new things.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 pb-0.5 transition-colors duration-200 group"
            style={{
              fontSize: "0.85rem",
              color: "var(--p-accent)",
              borderBottom: `1px solid ${ACCENT}60`,
            }}
          >
            More about me
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Education */}
        <div className="md:col-span-3">
          <h3
            className="uppercase tracking-widest mb-4"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              fontWeight: 500,
              color: "var(--p-accent)",
            }}
          >
            Education
          </h3>
          <div className="space-y-4">
            {education.map((item) => (
              <div
                key={item.label}
                className="pl-4"
                style={{ borderLeft: `2px solid ${ACCENT}40` }}
              >
                <p style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--p-fg)" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "0.76rem", color: "var(--p-fg-45)" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
