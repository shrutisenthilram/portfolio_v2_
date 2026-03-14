import { MagneticButton } from "./MagneticButton";
import { INDIGO, CORAL, EMERALD, AMBER, SKY, VIOLET } from "../data/tagColors";

const ACCENT = INDIGO;

const columns = [
  {
    title: "Technical Skills",
    items: [
      { name: "TypeScript / JavaScript", level: 95, color: SKY },
      { name: "React & Next.js", level: 90, color: INDIGO },
      { name: "Python / PyTorch", level: 80, color: VIOLET },
      { name: "Systems (C/C++)", level: 70, color: SKY },
      { name: "SQL & NoSQL", level: 75, color: EMERALD },
      { name: "Computer Vision", level: 65, color: CORAL },
    ],
  },
  {
    title: "Tools & Craft",
    items: [
      { name: "Figma", level: 95, color: INDIGO },
      { name: "Git & GitHub", level: 90, color: EMERALD },
      { name: "Vercel / AWS", level: 75, color: SKY },
      { name: "Framer", level: 80, color: CORAL },
      { name: "Storybook", level: 70, color: AMBER },
      { name: "Notion / Linear", level: 85, color: VIOLET },
    ],
  },
  {
    title: "Leadership & Orgs",
    items: [
      { name: "Design Lead — Blueprint", level: 0, color: INDIGO },
      { name: "President — HCI Society", level: 0, color: CORAL },
      { name: "TA — CS 160: UI Design", level: 0, color: SKY },
      { name: "Mentor — ColorStack", level: 0, color: EMERALD },
      { name: "Hackathon Organizer", level: 0, color: AMBER },
      { name: "Open Source Contributor", level: 0, color: VIOLET },
    ],
  },
];

const experiences = [
  // {
  //   role: "Product Design Intern",
  //   company: "Figma",
  //   period: "Summer 2025",
  //   desc: "Worked on editor performance and plugin UX improvements.",
  //   color: INDIGO,
  // },
  // {
  //   role: "Research Engineering Intern",
  //   company: "Anthropic",
  //   period: "Winter 2025",
  //   desc: "Built evaluation tooling for LLM safety benchmarks.",
  //   color: SKY,
  // },
  // {
  //   role: "Software Engineer Intern",
  //   company: "Stripe",
  //   period: "Summer 2024",
  //   desc: "Improved Dashboard accessibility across the billing surface.",
  //   color: EMERALD,
  // },
];

export function Skills() {
  return (
    <section
      id="resume"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="py-28 px-6 md:px-12 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div
        className="flex items-end justify-between mb-12 md:mb-16 pb-6"
        style={{ borderBottom: "1px solid var(--p-divide)" }}
      >
        <div>
          <span
            className="tracking-widest uppercase block mb-3"
            style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--p-fg-35)" }}
          >
            Experience & Skills
          </span>
          <h2
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--p-fg)" }}
          >
            What I Bring
          </h2>
        </div>
        <MagneticButton
          as="a"
          href="#"
          className="hidden md:block pb-0.5 transition-all duration-200"
          style={{ fontSize: "0.82rem", fontWeight: 400, color: ACCENT, borderBottom: `1px solid ${ACCENT}` }}
          strength={0.2}
        >
          Download CV →
        </MagneticButton>
      </div>

      {/* Experience */}
      <div className="mb-16 md:mb-20">
        <h3
          className="uppercase tracking-widest mb-6 md:mb-8"
          style={{ fontSize: "0.68rem", letterSpacing: "0.12em", fontWeight: 600, color: ACCENT }}
        >
          Experience
        </h3>
        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 28 }}>
          {/* vertical line */}
          <div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 1, background: "var(--p-divide)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {experiences.map((exp) => (
              <div
                key={exp.role}
                className="group"
                style={{ position: "relative", paddingBottom: 28, paddingTop: 2 }}
              >
                {/* colored node */}
                <div
                  style={{
                    position: "absolute",
                    left: -28,
                    top: 6,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: exp.color,
                    border: "2px solid var(--p-bg)",
                    boxShadow: `0 0 0 1px ${exp.color}`,
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.3)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
                />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 -mx-4 px-4 py-3 rounded transition-all duration-200"
                  style={{ borderBottom: "1px solid var(--p-divide)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = `${exp.color}08`)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                >
                  <div className="md:col-span-3">
                    <span style={{ fontSize: "0.75rem", color: "var(--p-fg-35)" }}>{exp.period}</span>
                  </div>
                  <div className="md:col-span-3">
                    <p style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--p-fg)" }}>{exp.role}</p>
                    <p style={{ fontSize: "0.78rem", color: exp.color, fontWeight: 600 }}>{exp.company}</p>
                  </div>
                  <div className="md:col-span-6 mt-1 md:mt-0">
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--p-fg-45)" }}>{exp.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
        {columns.map((col) => (
          <div key={col.title}>
            <h4
              className="uppercase tracking-widest mb-5 md:mb-6"
              style={{ fontSize: "0.68rem", letterSpacing: "0.12em", fontWeight: 600, color: ACCENT }}
            >
              {col.title}
            </h4>
            <ul className="space-y-4">
              {col.items.map((item) => (
                <li key={item.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontSize: "0.82rem", color: "var(--p-fg-65)" }}>{item.name}</span>
                    {item.level > 0 && (
                      <span style={{ fontSize: "0.68rem", color: item.color }}>{item.level}%</span>
                    )}
                  </div>
                  <div className="h-0.5 w-full" style={{ backgroundColor: "var(--p-fg-08)" }}>
                    {item.level > 0 && (
                      <div
                        className="h-0.5 transition-all duration-700"
                        style={{
                          width: `${item.level}%`,
                          background: `linear-gradient(90deg, ${item.color}60, ${item.color})`,
                        }}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}