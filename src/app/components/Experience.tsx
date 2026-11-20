import { INDIGO, CORAL, EMERALD, VIOLET } from "../data/tagColors";

type Role = {
  role: string;
  org: string;
  period: string;
  color: string;
  bullets: string[];
};

// Wording is taken from the existing site copy. Add numbers (team size,
// accuracy, users) here as they become available and are cleared to share.
const roles: Role[] = [
  {
    role: "Product Development Intern",
    org: "LPL Financial",
    period: "2026 – Present",
    color: INDIGO,
    bullets: [
      "Working on LPL's internal advisor platform, helping launch a new failsafe system from scratch under a compressed timeline.",
      "Partnering cross-functionally to scope and ship a net-new feature with no existing precedent to build from.",
    ],
  },
  {
    role: "VP of Product",
    org: "CSES Open Source",
    period: "",
    color: CORAL,
    bullets: [
      "Set product vision and scope for new open-source projects alongside the VP of Technology and the executive board.",
      "Ran weekly syncs with a team of PMs to keep each project's roadmap user-centric and technically feasible.",
      "Acted as the connective layer between engineers, PMs, and non-technical stakeholders.",
    ],
  },
  {
    role: "Undergraduate Research Assistant, Economics Lab",
    org: "UC San Diego",
    period: "Jan 2026 – Present",
    color: EMERALD,
    bullets: [
      "Built AI-assisted digitization pipelines using LLMs and OCR to support large-scale empirical economics research.",
      "Designed Python workflows for document validation and automated QA, identifying LLM failure modes such as hallucination, omission, and formatting errors.",
      "Built gold-standard annotated datasets to benchmark model accuracy and improve extraction reliability.",
    ],
  },
  {
    role: "Undergraduate Researcher, Computer Science",
    org: "UC San Diego · Advised by Prof. Manmohan Chandraker",
    period: "2026 – Present",
    color: VIOLET,
    bullets: [
      "Researching multi-agent vision-language model pipelines that generate photorealistic material and shader code for 3D scenes from tutorial videos.",
    ],
  },
];

// Roles carried over from the old Skills section so they still appear on the site.
const leadership = [
  { role: "Industry Relations Coordinator", org: "Design Co @ UCSD" },
  { role: "Public Relations Director", org: "ACM @ UCSD" },
  { role: "Ambassador", org: "Claude" },
  { role: "Ambassador", org: "Autodesk" },
];

export function Experience() {
  return (
    <section
      id="experience"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="pt-4 pb-24 px-6 md:px-12 max-w-6xl mx-auto"
    >
      <div
        className="mb-10 pb-6"
        style={{ borderBottom: "1px solid var(--p-divide)" }}
      >
        <span
          className="tracking-widest uppercase block mb-3"
          style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--p-fg-45)" }}
        >
          Experience
        </span>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "var(--p-fg)",
          }}
        >
          Where I've built and led
        </h2>
      </div>

      <div>
        {roles.map((r) => (
          <div
            key={r.role + r.org}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8"
            style={{ borderBottom: "1px solid var(--p-divide)" }}
          >
            <div className="md:col-span-4">
              <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--p-fg)" }}>
                {r.org}
              </p>
              {r.period && (
                <p style={{ fontSize: "0.78rem", color: "var(--p-fg-45)", marginTop: 4 }}>
                  {r.period}
                </p>
              )}
            </div>
            <div className="md:col-span-8">
              <p
                className="mb-3"
                style={{ fontSize: "0.9rem", fontWeight: 500, color: r.color }}
              >
                {r.role}
              </p>
              <ul className="space-y-2">
                {r.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3"
                    style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--p-fg-65)" }}
                  >
                    <span
                      className="mt-2.5 w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: r.color }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8">
        <span
          className="tracking-widest uppercase block mb-5"
          style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--p-fg-45)" }}
        >
          Leadership & community
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {leadership.map((l) => (
            <p key={l.org} style={{ fontSize: "0.88rem", color: "var(--p-fg-65)" }}>
              <span style={{ color: "var(--p-fg)", fontWeight: 500 }}>{l.org}</span>
              {" · "}
              {l.role}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
