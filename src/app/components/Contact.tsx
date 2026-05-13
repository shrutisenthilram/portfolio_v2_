import { MagneticButton } from "./MagneticButton";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

const contactLinks = [
  { label: "Email", value: "senthilramshruti@gmail.com", href: "mailto:senthilramshruti@gmail.com" },
  { label: "GitHub", value: "github.com/shrutisenthilram", href: "#" },
  { label: "LinkedIn", value: "linkedin.com/in/shrutisenthilram/", href: "#" },
  { label: "Resume", value: "Download PDF", href: "#" },
];

export function Contact() {
  return (
    <section
      id="contact"
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
        Contact
      </span>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Left — headline */}
        <div className="md:col-span-7">
          <h2
            className="mb-6 md:mb-8 leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: "var(--p-fg)",
            }}
          >
            Let's build something{" "}
            <span className="italic" style={{ fontWeight: 300, color: CORAL }}>
              together.
            </span>
          </h2>
          <p
            className="mb-8 md:mb-10"
            style={{ fontSize: "0.9rem", lineHeight: 1.8, maxWidth: "28rem", color: "var(--p-fg-45)" }}
          >
            Open to internship and full-time opportunities, freelance projects,
            and interesting conversations.
          </p>

          <MagneticButton
            as="a"
            href="mailto:senthilramshruti@gmail.com"
            className="inline-flex items-center gap-3 px-7 py-3.5 text-white transition-colors duration-300"
            style={{
              backgroundColor: ACCENT,
              fontSize: "0.875rem",
              fontWeight: 500,
              boxShadow: `0 4px 20px ${CORAL}35`,
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = CORAL;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 28px ${ACCENT}50`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${CORAL}35`;
            }}
          >
            Say Hello →
          </MagneticButton>
        </div>

        {/* Right — links */}
        <div className="md:col-span-5 flex flex-col justify-center">
          {contactLinks.map(({ label, value, href }) => (
            <div
              key={label}
              className="group py-4 md:py-5"
              style={{ borderBottom: "1px solid var(--p-divide)" }}
            >
              <span
                className="block mb-1 uppercase"
                style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--p-fg-35)" }}
              >
                {label}
              </span>
              <a
                href={href}
                className="inline-flex items-center gap-2 transition-colors duration-200"
                style={{ fontSize: "0.9rem", fontWeight: 400, color: "var(--p-fg)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg)")}
              >
                {value}
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: ACCENT }}
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