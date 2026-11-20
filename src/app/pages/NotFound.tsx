import { Link } from "react-router";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

export function NotFound() {
  return (
    <main
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-[70vh] flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 max-w-6xl mx-auto"
    >
      <span
        className="tracking-widest uppercase block mb-6"
        style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--p-fg-45)" }}
      >
        404
      </span>
      <h1
        className="mb-6"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.6rem)",
          fontWeight: 300,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          color: "var(--p-fg)",
        }}
      >
        This page doesn't exist{" "}
        <span className="italic" style={{ color: CORAL }}>
          (yet).
        </span>
      </h1>
      <p
        className="mb-8 max-w-md"
        style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--p-fg-65)" }}
      >
        The link may be old or mistyped. Here's where you probably want to go.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-white"
          style={{ backgroundColor: ACCENT, fontSize: "0.875rem", fontWeight: 500 }}
        >
          Back to home
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3"
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--p-fg)",
            border: "1px solid var(--p-fg-18)",
          }}
        >
          See projects
        </Link>
      </div>
    </main>
  );
}
