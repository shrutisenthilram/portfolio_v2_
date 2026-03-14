const ACCENT = "#4338CA";
const CORAL = "#F97316";

import { Link } from "react-router";

const education = [
  { label: "BS Computer Science", sub: "UC San Diego · 2024–2027" },
  { label: "BS Business Economics", sub: "UC San Diego · 2024–2027" },
  { label: "Minor: Design", sub: "UC San Diego · 2024–2027" },
];

const interests = [
  "Human-Computer Interaction",
  "Generative AI & Design Tools",
  "Open Source Software",
  "Photography & Visual Arts",
];

export function About() {
  return (
    <section
      id="about"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="py-28 px-6 md:px-12 max-w-6xl mx-auto"
    >
      <span
        className="tracking-widest uppercase block mb-12 md:mb-16 pb-6"
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.15em",
          color: "var(--p-fg-35)",
          borderBottom: "1px solid var(--p-divide)",
        }}
      >
        About
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-16">

        {/* Portrait + quick facts */}
        <div className="sm:col-span-1 md:col-span-3 flex sm:block items-start gap-8">
          <div className="relative w-28 h-36 sm:w-36 sm:h-44 mb-0 sm:mb-8 shrink-0">
            <div className="absolute inset-0" style={{ border: "1px solid var(--p-fg-08)" }} />
            <div
              className="absolute -bottom-2 -right-2 w-full h-full"
              style={{ border: `1px solid ${ACCENT}30` }}
            />
            <img
              src="src/images/0ad9bd0e-dbd5-40e8-bcbc-0c1797eb3fd5.jpg"
              alt="Shruti Senthilram"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="space-y-2 mt-1 sm:mt-0">
            {[
              { k: "Based in", v: "San Francisco, CA", coral: false },
              { k: "Availability", v: "Summer 2026", coral: true },
              { k: "Focus", v: "CS × Design x Product Management", coral: false },
            ].map(({ k, v, coral }) => (
              <div key={k} className="flex items-baseline gap-2">
                <span className="w-20 shrink-0" style={{ fontSize: "0.72rem", color: "var(--p-fg-35)" }}>{k}</span>
                <span className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: coral ? CORAL : "var(--p-fg-65)", fontWeight: coral ? 500 : 400 }}>
                  {coral && (
                    <span className="relative flex items-center justify-center w-1.5 h-1.5 shrink-0" style={{ marginBottom: 1 }}>
                      <span className="absolute inline-block w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: CORAL, opacity: 0.5 }} />
                      <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: CORAL }} />
                    </span>
                  )}
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="sm:col-span-1 md:col-span-5">
          <p
            className="mb-5"
            style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.85, letterSpacing: "-0.005em", color: "var(--p-fg-65)" }}
          >
            I'm a double major in CS and Business Econ at UC San Diego, with a focus on human-centered AI and product design. I'm passionate
            about creating tools that help people think, learn, and collaborate
            more effectively.
          </p>
          <p className="mb-8" style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "var(--p-fg-45)" }}>
            Outside of academics, I 
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 pb-0.5 transition-all duration-200 group"
            style={{ fontSize: "0.82rem", color: ACCENT, borderBottom: `1px solid ${ACCENT}40` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = CORAL;
              e.currentTarget.style.borderBottomColor = CORAL;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ACCENT;
              e.currentTarget.style.borderBottomColor = ACCENT + "40";
            }}
          >
            Learn more about me
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Education + Interests */}
        <div className="sm:col-span-2 md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8 md:gap-10">
          <div>
            <h4
              className="uppercase tracking-widest mb-4"
              style={{ fontSize: "0.68rem", letterSpacing: "0.12em", fontWeight: 400, color: ACCENT + "99" }}
            >
              Education
            </h4>
            <div className="space-y-4">
              {education.map((item) => (
                <div
                  key={item.label}
                  className="pl-4 transition-all duration-200 hover:pl-5"
                  style={{ borderLeft: `2px solid ${ACCENT}20` }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = ACCENT + "20")}
                >
                  <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--p-fg)" }}>{item.label}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--p-fg-35)" }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="uppercase tracking-widest mb-4"
              style={{ fontSize: "0.68rem", letterSpacing: "0.12em", fontWeight: 400, color: ACCENT + "99" }}
            >
              Interests
            </h4>
            <ul className="space-y-2">
              {interests.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 transition-colors duration-200 cursor-default"
                  style={{ fontSize: "0.82rem", color: "var(--p-fg-45)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-45)")}
                >
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: ACCENT + "60" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}