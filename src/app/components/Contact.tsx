import { BranchRule, EdgeVine } from "./FloralArt";
import { SITE } from "../data/site";

const ACCENT = "#B65670";
const CORAL = "#557A63";

const contactLinks: { label: string; value: string; href: string; external: boolean }[] = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, external: false },
  { label: "LinkedIn", value: SITE.linkedinLabel, href: SITE.linkedin, external: true },
  { label: "GitHub", value: SITE.githubLabel, href: SITE.github, external: true },
  { label: "Resume", value: "View resume (PDF)", href: SITE.resume, external: true },
];

export function Contact() {
  return (
    <section
      id="contact"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="relative pt-6 pb-32 md:pt-8 md:pb-32 px-6 md:px-12 max-w-6xl mx-auto"
    >
      <EdgeVine side="left" top="48%" />
      <span
        className="tracking-widest uppercase block mb-5 md:mb-6"
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.15em",
          color: "var(--p-fg-45)",
        }}
      >
        Contact
      </span>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left — headline */}
        <div className="md:col-span-7">
          <h2
            className="mb-3 leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3.6rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: "var(--p-fg)",
            }}
          >
            Let's talk about{" "}
            <span className="italic" style={{ fontWeight: 300, color: CORAL }}>
              what you're building.
            </span>
          </h2>
          <BranchRule className="mb-5" />
          <p
            className="mb-8 md:mb-10"
            style={{ fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "28rem", color: "var(--p-fg-65)" }}
          >
            I'm looking for APM and PM opportunities for 2027. If you're hiring,
            building something interesting, or just want to compare notes on
            product, I'd love to hear from you.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-3 px-7 py-3.5 text-white transition-colors duration-300"
            style={{ backgroundColor: ACCENT, fontSize: "0.875rem", fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
          >
            Say hello →
          </a>
        </div>

        {/* Right — links */}
        <div className="md:col-span-5 flex flex-col justify-center">
          {contactLinks.map(({ label, value, href, external }) => (
            <div
              key={label}
              className="group py-4 md:py-5"
              style={{ borderBottom: "1px solid var(--p-divide)" }}
            >
              <span
                className="block mb-1 uppercase"
                style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--p-fg-45)" }}
              >
                {label}
              </span>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2 transition-colors duration-200"
                style={{ fontSize: "0.92rem", fontWeight: 400, color: "var(--p-fg)", overflowWrap: "anywhere" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg)")}
              >
                {value}
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: CORAL }}
                >
                  →
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
