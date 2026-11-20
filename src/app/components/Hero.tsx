import { SITE } from "../data/site";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

export function Hero() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 max-w-6xl mx-auto"
    >
      {/* Top label row */}
      <div className="mb-8 md:mb-12 flex items-center gap-4 flex-wrap">
        <span
          className="tracking-widest uppercase"
          style={{
            fontSize: "0.7rem",
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "var(--p-fg-45)",
          }}
        >
          {SITE.name}
        </span>
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
              style={{ backgroundColor: CORAL, opacity: 0.5 }}
            />
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: CORAL }}
            />
          </span>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: CORAL,
              textTransform: "uppercase",
            }}
          >
            {SITE.availability}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        {/* Headline */}
        <div className="md:col-span-8">
          <h1
            className="mb-6 md:mb-8"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.6rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
              color: "var(--p-fg)",
            }}
          >
            {SITE.headline}{" "}
            <span className="italic" style={{ fontWeight: 300, color: CORAL }}>
              {SITE.headlineAccent}
            </span>
          </h1>

          <p
            className="mb-8 md:mb-10 max-w-xl"
            style={{
              fontSize: "1rem",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "var(--p-fg-65)",
            }}
          >
            {SITE.proof}
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <button
              onClick={scrollToWork}
              className="group inline-flex items-center gap-3 px-6 py-3 text-white transition-colors duration-300"
              style={{
                backgroundColor: ACCENT,
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
            >
              See my work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <a
              href={SITE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 transition-colors duration-300"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--p-fg)",
                border: "1px solid var(--p-fg-18)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = CORAL)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--p-fg-18)")
              }
            >
              Resume ↗
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="transition-colors duration-200 pb-0.5"
              style={{
                fontSize: "0.875rem",
                color: "var(--p-fg-65)",
                borderBottom: "1px solid var(--p-fg-18)",
                overflowWrap: "anywhere",
              }}
            >
              {SITE.email}
            </a>
          </div>
        </div>

        {/* Headshot */}
        <div className="md:col-span-4 flex justify-start md:justify-end">
          <div className="relative w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-80">
            <div
              className="absolute -top-3 -right-3 w-full h-full pointer-events-none"
              style={{ border: `1px solid ${ACCENT}60` }}
            />
            <img
              src={SITE.headshot}
              alt="Portrait of Shruti Senthilram"
              className="relative w-full h-full object-cover"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
