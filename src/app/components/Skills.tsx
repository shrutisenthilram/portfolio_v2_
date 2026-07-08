import { MagneticButton } from "./MagneticButton";
import { INDIGO, CORAL, EMERALD, AMBER, SKY, VIOLET } from "../data/tagColors";

const ACCENT = INDIGO;

const columns = [
  {
    title: "Technical Skills",
    items: [
      { name: "TypeScript / JavaScript", color: SKY },
      { name: "React & Next.js", color: INDIGO },
      { name: "Python / PyTorch", color: VIOLET },
      { name: "Systems (C/C++)", color: SKY },
      { name: "SQL & NoSQL", color: EMERALD },
      { name: "Computer Vision", color: CORAL },
    ],
  },
  {
    title: "Tools & Craft",
    items: [
      { name: "Figma", color: INDIGO },
      { name: "Git & GitHub", color: EMERALD },
      { name: "Vercel / AWS", color: SKY },
      { name: "Framer", color: CORAL },
      { name: "Storybook", color: AMBER },
      { name: "Notion / Linear", color: VIOLET },
    ],
  },
  {
    title: "Leadership & Orgs",
    items: [
      { name: "Design Co @ UCSD - Industry Relations Coordinator", color: INDIGO },
      { name: "CSES OpenSource - VP of Product", color: CORAL },
      { name: "ACM @ UCSD - Public Relations Director", color: SKY },
      { name: "Econ Undergraduate Research Assistant", color: EMERALD },
      { name: "Claude Ambassador", color: AMBER },
      { name: "Autodesk Ambassador", color: VIOLET },
    ],
  },
];

const experiences = [
  {
    role: "Product Intern",
    company: "LPL Financial",
    period: "2026 – Present",
    desc: "Working on LPL's internal advisor platform, helping launch a new failsafe system from scratch under a fast, compressed timeline — partnering cross-functionally to scope and ship a net-new feature with no existing precedent to build from.",
    color: INDIGO,
  },
  {
    // TODO(personalize): no timeframe was given for this role — fill in the real period.
    role: "VP of Product",
    company: "CSES Open Source",
    period: "",
    desc: "Set product vision and scope for new open-source projects alongside the VP of Technology and executive board. Ran weekly syncs with a team of PMs to keep each project's roadmap user-centric and technically feasible, acting as the connective layer between engineers, PMs, and non-technical stakeholders.",
    color: CORAL,
  },
  {
    role: "Undergraduate Research Assistant",
    company: "Economics Lab",
    period: "Jan 2026 – Present",
    desc: "Built AI-assisted digitization pipelines using LLMs and OCR to support large-scale empirical economics research. Designed Python workflows for document validation and automated QA, systematically identifying LLM failure modes (hallucination, omission, formatting errors), and built gold-standard annotated datasets to benchmark model accuracy and improve extraction reliability.",
    color: EMERALD,
  },
];

export function Skills() {
  return (
    <section
      id="resume"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="py-12 px-6 md:px-12 max-w-6xl mx-auto"
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
          href="https://drive.google.com/file/d/1lkLAkAtCbMyIuyhAY7I_820Z4pDXwhKw/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block pb-0.5 transition-all duration-200"
          style={{ fontSize: "0.82rem", fontWeight: 400, color: ACCENT, borderBottom: `1px solid ${ACCENT}` }}
          strength={0.2}
        >
          Download Resume →
        </MagneticButton>
      </div>

      {/* Experience — hidden when there's no data, to avoid an empty-looking section.
          TODO(personalize): add real entries to the `experiences` array above to bring this back. */}
      {experiences.length > 0 && (
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
      )}

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
            <ul className="space-y-3">
              {col.items.map((item) => (
                <li key={item.name} className="flex items-center gap-2.5">
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: item.color + "80" }}
                  />
                  <span style={{ fontSize: "0.82rem", color: "var(--p-fg-65)" }}>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}