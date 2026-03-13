const ACCENT = "#4338CA";
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
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <span style={{ fontSize: "0.75rem", color: "var(--p-fg-25)" }}>
            © {year} Alex Chen
          </span>
          <span style={{ fontSize: "0.75rem", color: CORAL + "70" }}>
            Designed & built in Berkeley
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {[
            { label: "GitHub", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "Dribbble", href: "#" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="transition-colors duration-200"
              style={{ fontSize: "0.75rem", color: "var(--p-fg-25)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-25)")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}