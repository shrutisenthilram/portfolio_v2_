import { useRef, useState } from "react";
import { Link } from "react-router";
import { MagneticButton } from "../components/MagneticButton";
import { CommunitiesSection } from "../components/CommunitiesSection";
import { MusicSection } from "../components/MusicSection";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

const education = [
  {
    degree: "BS Computer Science",
    school: "UC Berkeley",
    period: "2023 – 2027",
    detail:
      "Concentration in Human-Computer Interaction. GPA 3.9.",
  },
  {
    degree: "Minor in Product Design",
    school: "Jacobs Design Institute",
    period: "2024 – present",
    detail:
      "Studio courses in interaction design, design systems, and prototyping.",
  },
  {
    degree: "Exchange Program",
    school: "ETH Zürich",
    period: "Spring 2026",
    detail:
      "Studied computational design and AI-assisted fabrication methods.",
  },
];

const experiences = [
  {
    role: "Product Design Intern",
    company: "Figma",
    period: "Summer 2025",
    location: "San Francisco, CA",
    bullets: [
      "Redesigned the plugin discovery surface, increasing installs by 18%.",
      "Prototyped AI-assisted layout suggestions for the editor canvas.",
      "Led 6 user research sessions and synthesised findings for the team.",
    ],
  },
  {
    role: "Research Engineering Intern",
    company: "Anthropic",
    period: "Winter 2025",
    location: "Remote",
    bullets: [
      "Built an evaluation harness for LLM safety benchmarks (Python / TypeScript).",
      "Contributed to internal tooling for red-teaming Claude 3.",
      "Co-authored an internal memo on constitutional AI edge cases.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Stripe",
    period: "Summer 2024",
    location: "Remote",
    bullets: [
      "Improved WCAG AA compliance across the Dashboard billing surface.",
      "Shipped a new keyboard-navigation system for the payments table.",
      "Reduced p95 load time by 22% through code-splitting improvements.",
    ],
  },
];

const skills = [
  {
    category: "Languages",
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "C / C++",
      "SQL",
    ],
  },
  {
    category: "Frameworks",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "PyTorch",
      "Tailwind CSS",
    ],
  },
  {
    category: "Design",
    items: [
      "Figma",
      "Framer",
      "Storybook",
      "Motion / GSAP",
      "Prototyping",
    ],
  },
  {
    category: "Platforms",
    items: [
      "Vercel",
      "AWS",
      "Supabase",
      "GitHub Actions",
      "Docker",
    ],
  },
];

const interests = [
  { label: "Human-Computer Interaction", icon: "⌨" },
  { label: "Generative AI & Design Tools", icon: "✦" },
  { label: "Open Source Software", icon: "⊕" },
  { label: "Photography & Visual Arts", icon: "◎" },
  { label: "Urban Cycling", icon: "⬡" },
  { label: "Speculative Fiction", icon: "◈" },
];

const values = [
  {
    title: "Craft over velocity",
    body: "I'd rather ship one thing beautifully than five things carelessly. The details are the product.",
  },
  {
    title: "Curiosity as method",
    body: "The best ideas come from asking obvious questions until they become non-obvious answers.",
  },
  {
    title: "Design is a conversation",
    body: "Every interface is an argument about what matters. I try to make that argument clearly.",
  },
  {
    title: "Open by default",
    body: "I share work early, write publicly, and contribute to OSS — ideas compound when they're in the open.",
  },
];

const stats = [
  { value: "12+", label: "Projects shipped" },
  { value: "3", label: "Internships" },
  { value: "4k+", label: "GitHub commits" },
  { value: "2", label: "Papers published" },
];

const currently = [
  {
    label: "Building",
    value: "An AI design-review tool for Figma plugins",
  },
  {
    label: "Reading",
    value: "The Design of Everyday Things — Don Norman",
  },
  {
    label: "Learning",
    value: "Rust + WebAssembly for interactive graphics",
  },
  {
    label: "Listening to",
    value: "Four Tet, Floating Points, Bicep",
  },
];

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="tracking-widest uppercase block mb-12 pb-6"
      style={{
        fontSize: "0.68rem",
        letterSpacing: "0.15em",
        color: "var(--p-fg-35)",
        borderBottom: "1px solid var(--p-divide)",
      }}
    >
      {children}
    </span>
  );
}

function ExperienceRow({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="py-6 -mx-4 px-4 cursor-pointer"
      style={{ borderBottom: "1px solid var(--p-divide)" }}
      onClick={() => setOpen((o) => !o)}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor =
          "var(--p-hover)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4">
        <div className="md:col-span-2">
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--p-fg-35)",
            }}
          >
            {exp.period}
          </span>
        </div>
        <div className="md:col-span-3">
          <p
            style={{
              fontSize: "0.88rem",
              fontWeight: 500,
              color: "var(--p-fg)",
            }}
          >
            {exp.role}
          </p>
          <p
            style={{
              fontSize: "0.78rem",
              color: CORAL,
              fontWeight: 500,
            }}
          >
            {exp.company}
          </p>
          <p
            style={{
              fontSize: "0.72rem",
              color: "var(--p-fg-35)",
              marginTop: 2,
            }}
          >
            {exp.location}
          </p>
        </div>
        <div className="md:col-span-6 mt-2 md:mt-0">
          {open && (
            <ul className="space-y-2">
              {exp.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2"
                  style={{
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                    color: "var(--p-fg-45)",
                  }}
                >
                  <span
                    style={{
                      color: ACCENT,
                      marginTop: 3,
                      flexShrink: 0,
                    }}
                  >
                    —
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          )}
          {!open && (
            <p
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.7,
                color: "var(--p-fg-35)",
              }}
            >
              {exp.bullets[0].slice(0, 72)}…
            </p>
          )}
        </div>
        <div className="md:col-span-1 flex items-start md:justify-end pt-0.5">
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--p-fg-25)",
              transition: "transform 0.2s",
              display: "inline-block",
              transform: open
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          >
            ↓
          </span>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const photoRef = useRef<HTMLDivElement>(null);
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Page header ── */}
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10">
          <Link
            to="/"
            className="transition-colors duration-200"
            style={{
              fontSize: "0.75rem",
              color: "var(--p-fg-35)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = ACCENT)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--p-fg-35)")
            }
          >
            Alex Chen
          </Link>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--p-fg-18)",
            }}
          >
            /
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--p-fg-45)",
            }}
          >
            About
          </span>
        </div>

        {/* Hero grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left — text */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span
                className="uppercase tracking-widest"
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.15em",
                  color: "var(--p-fg-35)",
                }}
              >
                About
              </span>
              {/* Coral availability pill */}
              <span
                className="flex items-center gap-2 px-2.5 py-1"
                style={{
                  border: `1px solid ${CORAL}35`,
                  backgroundColor: CORAL + "0D",
                }}
              >
                <span className="relative flex items-center justify-center w-2 h-2">
                  <span
                    className="absolute inline-block w-2 h-2 rounded-full animate-ping"
                    style={{
                      backgroundColor: CORAL,
                      opacity: 0.5,
                    }}
                  />
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: CORAL }}
                  />
                </span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: CORAL,
                  }}
                >
                  OPEN · SUMMER 2026
                </span>
              </span>
            </div>

            <h1
              className="mb-8"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.8rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: "var(--p-fg)",
              }}
            >
              Designer,{" "}
              <span style={{ fontStyle: "italic" }}>
                engineer,
              </span>
              <br />& curious human.
            </h1>

            <p
              className="mb-5 max-w-lg"
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.85,
                color: "var(--p-fg-65)",
              }}
            >
              I'm a third-year at UC Berkeley studying Computer
              Science with a focus on human-centered AI and
              product design. I care deeply about making tools
              that help people think, learn, and work more
              effectively — without getting in the way.
            </p>
            <p
              className="max-w-lg"
              style={{
                fontSize: "0.88rem",
                lineHeight: 1.8,
                color: "var(--p-fg-45)",
              }}
            >
              Previously at Figma (Product Design), Anthropic
              (Research Engineering), and Stripe (Software
              Engineering). Currently working on AI-powered
              design tooling and open to full-time roles
              starting summer 2026.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <MagneticButton
                as="a"
                href="mailto:alex@example.com"
                className="inline-flex items-center gap-3 px-6 py-3 text-white transition-colors duration-300"
                style={{
                  backgroundColor: ACCENT,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  ((
                    e.currentTarget as HTMLElement
                  ).style.backgroundColor = CORAL)
                }
                onMouseLeave={(e) =>
                  ((
                    e.currentTarget as HTMLElement
                  ).style.backgroundColor = ACCENT)
                }
              >
                Get in touch →
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#"
                className="inline-flex items-center gap-2 pb-0.5 transition-colors duration-200"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  color: "var(--p-fg-45)",
                  borderBottom: "1px solid var(--p-fg-18)",
                }}
                strength={0.2}
              >
                Download CV
              </MagneticButton>
            </div>
          </div>

          {/* Right — photo + quick facts */}
          <div className="md:col-span-5">
            <div
              ref={photoRef}
              className="relative mb-8"
              style={{ width: "100%", maxWidth: 320 }}
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            >
              <div
                className="absolute inset-0"
                style={{ border: "1px solid var(--p-fg-08)" }}
              />
              <div
                className="absolute -bottom-3 -right-3 w-full h-full transition-all duration-500"
                style={{
                  border: `1px solid ${imgHovered ? CORAL : ACCENT}30`,
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1717068341511-204207d72705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90JTIwcG9ydHJhaXQlMjBzdHVkaW98ZW58MXx8fHwxNzczMzg3NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Alex Chen"
                className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                style={{ aspectRatio: "4/5", display: "block" }}
              />
            </div>

            {/* Quick facts */}
            <div className="space-y-2.5">
              {[
                {
                  k: "Based in",
                  v: "Berkeley, CA",
                  coral: false,
                },
                {
                  k: "Availability",
                  v: "Summer 2026",
                  coral: true,
                },
                { k: "Focus", v: "CS × Design", coral: false },
                {
                  k: "Website",
                  v: "alexchen.dev",
                  coral: false,
                },
              ].map(({ k, v, coral }) => (
                <div
                  key={k}
                  className="flex items-baseline gap-3"
                >
                  <span
                    className="shrink-0"
                    style={{
                      width: 88,
                      fontSize: "0.72rem",
                      color: "var(--p-fg-35)",
                    }}
                  >
                    {k}
                  </span>
                  <span
                    className="flex items-center gap-1.5"
                    style={{
                      fontSize: "0.8rem",
                      color: coral ? CORAL : "var(--p-fg-65)",
                      fontWeight: coral ? 500 : 400,
                    }}
                  >
                    {coral && (
                      <span className="relative flex items-center justify-center w-1.5 h-1.5 shrink-0">
                        <span
                          className="absolute inline-block w-1.5 h-1.5 rounded-full animate-ping"
                          style={{
                            backgroundColor: CORAL,
                            opacity: 0.5,
                          }}
                        />
                        <span
                          className="inline-block w-1 h-1 rounded-full"
                          style={{ backgroundColor: CORAL }}
                        />
                      </span>
                    )}
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div
        className="px-6 md:px-12 max-w-6xl mx-auto py-12"
        style={{
          borderTop: "1px solid var(--p-divide)",
          borderBottom: "1px solid var(--p-divide)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.label}>
              <p
                className="mb-1"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  color: i % 2 === 1 ? CORAL : "var(--p-fg)",
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--p-fg-35)",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Experience ── */}
      <div className="px-6 md:px-12 max-w-6xl mx-auto py-14">
        <SectionLabel>Experience</SectionLabel>
        <div style={{ borderTop: "1px solid var(--p-divide)" }}>
          {experiences.map((exp, i) => (
            <ExperienceRow
              key={exp.company}
              exp={exp}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* ── Education ── */}
      <div className="px-6 md:px-12 max-w-6xl mx-auto pb-14">
        <SectionLabel>Education</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.map((ed) => (
            <div
              key={ed.degree}
              className="pl-5 py-1 transition-all duration-200 hover:pl-6 cursor-default"
              style={{ borderLeft: `2px solid ${ACCENT}20` }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderLeftColor = ACCENT)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderLeftColor =
                  ACCENT + "20")
              }
            >
              <p
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  color: "var(--p-fg)",
                }}
              >
                {ed.degree}
              </p>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: ACCENT + "AA",
                  marginTop: 2,
                }}
              >
                {ed.school}
              </p>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--p-fg-35)",
                  marginTop: 1,
                }}
              >
                {ed.period}
              </p>
              <p
                style={{
                  fontSize: "0.78rem",
                  lineHeight: 1.7,
                  color: "var(--p-fg-35)",
                  marginTop: 8,
                }}
              >
                {ed.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills ── */}
      <div
        className="px-6 md:px-12 max-w-6xl mx-auto pb-14"
        style={{
          borderTop: "1px solid var(--p-divide)",
          paddingTop: "3.5rem",
        }}
      >
        <SectionLabel>Skills & Tools</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {skills.map((col, ci) => (
            <div key={col.category}>
              <h4
                className="uppercase tracking-widest mb-4"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  fontWeight: 400,
                  color: ACCENT + "99",
                }}
              >
                {col.category}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 cursor-default transition-colors duration-150"
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--p-fg-55)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        ci === 1 ? CORAL : ACCENT)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--p-fg-55)")
                    }
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          ci === 1
                            ? CORAL + "60"
                            : ACCENT + "60",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Values ── */}
      <div
        className="px-6 md:px-12 max-w-6xl mx-auto pb-14"
        style={{
          borderTop: "1px solid var(--p-divide)",
          paddingTop: "3.5rem",
        }}
      >
        <SectionLabel>Values</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {values.map((v, i) => (
            <div key={v.title}>
              <p
                className="mb-2 flex items-baseline gap-3"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "var(--p-fg)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: i % 2 === 1 ? CORAL : ACCENT,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {v.title}
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  color: "var(--p-fg-45)",
                }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Interests + Currently ── */}
      <div
        className="px-6 md:px-12 max-w-6xl mx-auto pb-14"
        style={{
          borderTop: "1px solid var(--p-divide)",
          paddingTop: "3.5rem",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Interests */}
          <div>
            <SectionLabel>Interests</SectionLabel>
            <ul className="space-y-3">
              {interests.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 cursor-default transition-colors duration-200"
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--p-fg-45)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color =
                      "var(--p-fg)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "var(--p-fg-45)")
                  }
                >
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: ACCENT + "80",
                      width: 18,
                      textAlign: "center",
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Currently */}
          <div>
            <SectionLabel>Currently</SectionLabel>
            <div className="space-y-5">
              {currently.map((c) => (
                <div key={c.label}>
                  <span
                    className="block mb-0.5 uppercase"
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: "var(--p-fg-25)",
                    }}
                  >
                    {c.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--p-fg-65)",
                    }}
                  >
                    {c.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Communities ── */}
      <CommunitiesSection />

      {/* ── Music ── */}
      <MusicSection />

      {/* ── CTA strip ── */}
      <div
        className="px-6 md:px-12 max-w-6xl mx-auto py-16 mb-12 text-center"
        style={{
          borderTop: "1px solid var(--p-divide)",
          borderBottom: "1px solid var(--p-divide)",
        }}
      >
        <p
          className="mb-6"
          style={{
            fontSize: "clamp(1.2rem, 3vw, 2rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "var(--p-fg)",
          }}
        >
          Want to build something{" "}
          <span className="italic" style={{ color: CORAL }}>
            together?
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <MagneticButton
            as="a"
            href="mailto:alex@example.com"
            className="inline-flex items-center gap-3 px-6 py-3 text-white transition-colors duration-300"
            style={{
              backgroundColor: ACCENT,
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
            onMouseEnter={(e) =>
              ((
                e.currentTarget as HTMLElement
              ).style.backgroundColor = CORAL)
            }
            onMouseLeave={(e) =>
              ((
                e.currentTarget as HTMLElement
              ).style.backgroundColor = ACCENT)
            }
          >
            Say Hello →
          </MagneticButton>
          <Link
            to="/projects"
            className="pb-0.5 transition-colors duration-200"
            style={{
              fontSize: "0.875rem",
              color: ACCENT,
              borderBottom: `1px solid ${ACCENT}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = CORAL;
              e.currentTarget.style.borderBottomColor = CORAL;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ACCENT;
              e.currentTarget.style.borderBottomColor = ACCENT;
            }}
          >
            View Projects →
          </Link>
        </div>
      </div>
    </div>
  );
}