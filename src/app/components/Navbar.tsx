import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { SITE } from "../data/site";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

// These scroll to sections on the home page (or jump to them from other pages).
const SCROLL_LINKS = [
  { label: "Work", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (id: string, label: string) => {
    setActiveLink(label);
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resumeButton = (
    <a
      href={SITE.resume}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-1.5 transition-colors duration-200"
      style={{
        fontSize: "0.8rem",
        fontWeight: 500,
        color: "var(--p-fg)",
        border: "1px solid var(--p-fg-18)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = CORAL)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--p-fg-18)")}
    >
      Resume ↗
    </a>
  );

  return (
    <header
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Backdrop bar */}
      <div
        style={{
          backgroundColor: scrolled ? "var(--p-navbar)" : "transparent",
          borderBottom: scrolled ? `1px solid var(--p-divide)` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 pt-3 sm:pt-4">
          {/* Logo — scrolls to top on home, navigates to / elsewhere */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="tracking-tight transition-colors duration-200 whitespace-nowrap"
            style={{ fontSize: "clamp(0.82rem, 2.6vw, 0.95rem)", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--p-fg)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg)")}
          >
            {SITE.name}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {SCROLL_LINKS.map(({ label, id }) => {
              const isActive = activeLink === label;
              const common = {
                className: "relative transition-colors duration-200 pb-0.5",
                style: {
                  fontSize: "0.85rem",
                  fontWeight: 400,
                  color: isActive ? ACCENT : "var(--p-fg-65)",
                },
                onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.color = CORAL;
                },
                onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.color = isActive ? ACCENT : "var(--p-fg-65)";
                },
              };
              return isHome ? (
                <button key={label} onClick={() => handleNavClick(id, label)} {...common}>
                  {label}
                </button>
              ) : (
                <a key={label} href={`/#${id}`} {...common}>
                  {label}
                </a>
              );
            })}

            {resumeButton}

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="transition-colors duration-200 p-1.5 -m-1.5"
              style={{ color: "var(--p-fg-65)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p-fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-65)")}
            >
              {isDark ? <Sun size={15} strokeWidth={1.6} /> : <Moon size={15} strokeWidth={1.6} />}
            </button>
          </nav>

          {/* Mobile: theme + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-1.5 transition-colors duration-200"
              style={{ color: "var(--p-fg-65)" }}
            >
              {isDark ? <Sun size={15} strokeWidth={1.6} /> : <Moon size={15} strokeWidth={1.6} />}
            </button>
            <button
              className="flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className="block w-5 h-px transition-all duration-200"
                style={{
                  backgroundColor: "var(--p-fg)",
                  transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none",
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-200"
                style={{ backgroundColor: "var(--p-fg)", opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px transition-all duration-200"
                style={{
                  backgroundColor: "var(--p-fg)",
                  transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-5"
          style={{
            backgroundColor: "var(--p-bg)",
            borderBottom: `1px solid var(--p-divide)`,
          }}
        >
          {SCROLL_LINKS.map(({ label, id }) =>
            isHome ? (
              <button
                key={label}
                onClick={() => handleNavClick(id, label)}
                className="text-left transition-colors duration-200"
                style={{ fontSize: "1rem", fontWeight: 400, color: "var(--p-fg-65)" }}
              >
                {label}
              </button>
            ) : (
              <a
                key={label}
                href={`/#${id}`}
                className="text-left transition-colors duration-200"
                style={{ fontSize: "1rem", fontWeight: 400, color: "var(--p-fg-65)" }}
              >
                {label}
              </a>
            )
          )}
          <Link
            to="/projects"
            className="transition-colors duration-200"
            style={{ fontSize: "1rem", fontWeight: 400, color: ACCENT }}
          >
            All projects →
          </Link>
          <a
            href={SITE.resume}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "1rem", fontWeight: 500, color: CORAL }}
          >
            Resume ↗
          </a>
        </div>
      )}
    </header>
  );
}
