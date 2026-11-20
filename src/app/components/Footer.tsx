import { SITE } from "../data/site";

const CORAL = "#F97316";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="px-6 md:px-12 max-w-6xl mx-auto pb-10"
    >
      <div
        className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderTop: "1px solid var(--p-divide)" }}
      >
        <span style={{ fontSize: "0.78rem", color: "var(--p-fg-45)" }}>
          © {year} {SITE.name}
        </span>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {[
            { label: "LinkedIn", href: SITE.linkedin },
            { label: "GitHub", href: SITE.github },
            { label: "Resume", href: SITE.resume },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ fontSize: "0.78rem", color: "var(--p-fg-45)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-45)")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
