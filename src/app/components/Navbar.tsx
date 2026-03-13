import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

// "About" is now a dedicated page; the rest scroll to home-page sections
const SCROLL_LINKS = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPlayground = location.pathname === "/playground";
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
    } else {
      // navigate handled by Link
    }
  };

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
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          {/* Logo — scrolls to top on home, navigates to / elsewhere */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="tracking-tight transition-colors duration-200"
            style={{ fontSize: "0.95rem", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--p-fg)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg)")}
          >
            Alex Chen
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {SCROLL_LINKS.map(({ label, id }) => {
              const isActive = activeLink === label;
              return isHome ? (
                <button
                  key={label}
                  onClick={() => handleNavClick(id, label)}
                  className="relative transition-colors duration-200 pb-0.5"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    color: isActive ? ACCENT : "var(--p-fg-35)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? ACCENT : "var(--p-fg-35)"; }}
                >
                  {label}
                  <span
                    className="absolute bottom-0 left-0 h-px transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0%", backgroundColor: ACCENT }}
                  />
                </button>
              ) : (
                <a
                  key={label}
                  href={`/#${id}`}
                  className="relative transition-colors duration-200 pb-0.5"
                  style={{ fontSize: "0.85rem", fontWeight: 400, color: "var(--p-fg-35)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--p-fg-35)"; }}
                >
                  {label}
                </a>
              );
            })}

            {/* Playground link */}
            <Link
              to="/playground"
              className="playground-btn flex items-center gap-1.5 px-3 py-1.5 transition-all duration-200 border"
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                color: isPlayground ? "#fff" : ACCENT,
                borderColor: isPlayground ? ACCENT : ACCENT + "60",
                backgroundColor: isPlayground ? ACCENT : ACCENT + "10",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                if (!isPlayground) {
                  e.currentTarget.style.backgroundColor = ACCENT + "22";
                  e.currentTarget.style.borderColor = ACCENT + "99";
                }
                e.currentTarget.style.animation = "navbar-shake 0.4s ease";
              }}
              onMouseLeave={(e) => {
                if (!isPlayground) {
                  e.currentTarget.style.backgroundColor = ACCENT + "10";
                  e.currentTarget.style.borderColor = ACCENT + "60";
                }
                e.currentTarget.style.animation = "";
              }}
            >
              <Sparkles size={12} strokeWidth={1.8} />
              Playground
            </Link>

            <style>{`
              @keyframes navbar-shake {
                0%   { transform: translateX(0); }
                18%  { transform: translateX(-3px) rotate(-1deg); }
                36%  { transform: translateX(3px) rotate(1deg); }
                54%  { transform: translateX(-2px) rotate(-0.5deg); }
                72%  { transform: translateX(2px) rotate(0.5deg); }
                88%  { transform: translateX(-1px); }
                100% { transform: translateX(0); }
              }
            `}</style>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="transition-colors duration-200 p-1.5 -m-1.5"
              style={{ color: "var(--p-fg-35)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p-fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-35)")}
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
              style={{ color: "var(--p-fg-35)" }}
            >
              {isDark ? <Sun size={15} strokeWidth={1.6} /> : <Moon size={15} strokeWidth={1.6} />}
            </button>
            <button
              className="flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
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
                style={{
                  backgroundColor: "var(--p-fg)",
                  opacity: menuOpen ? 0 : 1,
                }}
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
                style={{ fontSize: "1rem", fontWeight: 400, color: "var(--p-fg-45)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--p-fg-45)")}
              >
                {label}
              </button>
            ) : (
              <a
                key={label}
                href={`/#${id}`}
                className="text-left transition-colors duration-200"
                style={{ fontSize: "1rem", fontWeight: 400, color: "var(--p-fg-45)" }}
              >
                {label}
              </a>
            )
          )}
          <Link
            to="/projects"
            className="transition-colors duration-200 mt-2"
            style={{ fontSize: "1rem", fontWeight: 400, color: ACCENT }}
          >
            All Projects →
          </Link>
          <Link
            to="/playground"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 transition-colors duration-200"
            style={{ fontSize: "1rem", fontWeight: 400, color: isPlayground ? CORAL : ACCENT }}
          >
            <Sparkles size={14} strokeWidth={1.8} />
            Playground
          </Link>
        </div>
      )}
    </header>
  );
}