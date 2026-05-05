import { useState, useEffect } from "react";
import { MagneticButton } from "./MagneticButton";

const ACCENT = "#4338CA";
const CORAL = "#F97316";
const ROLES = ["Designer", "Engineer", "Builder", "Problem Solver", "Artist"];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 320);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="flex flex-col justify-center pt-24 pb-16 px-6 md:px-12 max-w-6xl mx-auto"
    >
      {/* Top label row */}
      <div className="mb-8 md:mb-12 flex items-center gap-4 flex-wrap">
        <span
          className="tracking-widest uppercase"
          style={{ fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.15em", color: "var(--p-fg-35)" }}
        >
          Portfolio — 2026
        </span>
        {/* Coral availability badge */}
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
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CORAL }} />
          </span>
          <span style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.08em", color: CORAL }}>
            OPEN TO OPPORTUNITIES
          </span>
        </span>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-0 items-end">
        {/* Headline */}
        <div className="md:col-span-8">
          <h1
            className="leading-none tracking-tight mb-6 md:mb-8"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 5rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--p-fg)",
            }}
          >
            Hi, I'm Shruti <br />
            <span style={{ fontWeight: 500 }}>a </span>
            <span
              style={{
                fontWeight: 500,
                color: ACCENT,
                display: "inline-block",
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? "translateY(0px)" : "translateY(10px)",
                transition: "opacity 0.32s ease, transform 0.32s ease",
                textDecoration: "underline",
                textDecorationColor: ACCENT + "40",
                textUnderlineOffset: "6px",
              }}
            >
              {ROLES[roleIdx]}
            </span>
            .
          </h1>
          <p
            className="mb-8 md:mb-12 max-w-md"
            style={{ fontSize: "0.95rem", fontWeight: 400, lineHeight: 1.7, color: "var(--p-fg-45)" }}
          >
            I design and build thoughtful digital products focused on human-centered design.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <MagneticButton
              onClick={scrollToWork}
              className="group inline-flex items-center gap-3 px-6 py-3 text-white transition-colors duration-300 hover:opacity-100"
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
              View Work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="mailto:alex@example.com"
              className="transition-colors duration-200 pb-0.5"
              style={{
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "var(--p-fg-45)",
                borderBottom: "1px solid var(--p-fg-18)",
              }}
              strength={0.2}
            >
              senthilramshruti@gmail.com
            </MagneticButton>
          </div>
        </div>
{/* Photo collage */}
<div className="hidden sm:flex md:col-span-4 justify-center md:justify-end">
  <div className="relative w-44 h-56 sm:w-48 sm:h-64 md:w-56 md:h-72">

    {/* Accent photo — top right, peeking out */}
    <div
      className="absolute -top-8 -right-10 w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 overflow-hidden z-20"
      style={{
        backgroundColor: "var(--p-surface)",
        border: `1px solid ${ACCENT}40`,
        boxShadow: "0 8px 22px rgba(0,0,0,0.10)",
      }}
    >
      <img
        src="src/images/397CE1FB-7394-4173-B734-A8B26660FAB0_4_5005_c.jpeg"
        alt=""
        className="w-full h-full object-cover"
        style={{ filter: "none", transition: "filter 0.7s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
      />
    </div>

    {/* Main photo — keeps your double-border signature */}
    <div
      className="absolute inset-0"
      style={{ border: "1px solid var(--p-divide)" }}
    />
    <div
      className="absolute -top-3 -right-3 w-full h-full"
      style={{ border: `1px solid ${ACCENT}60` }}
    />
    <div
      className="relative w-full h-full overflow-hidden z-10"
      style={{ backgroundColor: "var(--p-surface)" }}
    >
      <img
        src="src/images/5615C8D8-5E7E-4F30-92F3-2E8959446F6E_1_102_o.jpeg"
        alt="Portrait"
        className="w-full h-full object-cover"
        style={{ filter: "none", transition: "filter 0.7s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
      />
    </div>

    {/* Accent photo — bottom left, peeking out */}
    <div
      className="absolute -bottom-10 -left-10 w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 overflow-hidden z-20"
      style={{
        backgroundColor: "var(--p-surface)",
        border: "1px solid var(--p-divide)",
        boxShadow: "0 8px 22px rgba(0,0,0,0.10)",
      }}
    >
      <img
        src="src/images/9A87034E-1CA9-4E27-886F-7C26EC8DA856_4_5005_c.jpeg"
        alt=""
        className="w-full h-full object-cover"
        style={{ filter: "none", transition: "filter 0.7s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
      />
    </div>

    {/* Caption */}
    <div
      className="absolute -bottom-16 right-0"
      style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--p-fg-25)" }}
    >
      MOMENTS — 2025
    </div>

  </div>
</div>
        {/* Portrait
        <div className="hidden sm:flex md:col-span-4 justify-center md:justify-end">
          <div className="relative w-40 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72">
            <div
              className="absolute inset-0"
              style={{ border: "1px solid var(--p-divide)" }}
            />
            <div
              className="absolute -top-3 -right-3 w-full h-full"
              style={{ border: `1px solid ${ACCENT}60` }}
            />
            <div
              className="w-full h-full overflow-hidden"
              style={{ backgroundColor: "var(--p-surface)" }}
            >
              <img
                src="src/images/5.jpg"
                alt="Portrait"
                className="w-full h-full object-cover"
                style={{ filter: "none", transition: "filter 0.7s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              />
            </div>
            <div
              className="absolute -bottom-6 left-0"
              style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--p-fg-25)" }}
            >
            yay
            </div>
          </div>
        </div> */}
      </div>


      <div className="mt-16 md:mt-24 flex items-center gap-4">
         
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--p-fg-35)" }}></span>
      </div>
    </section>
  );
}