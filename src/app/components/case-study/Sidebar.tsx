import { motion, AnimatePresence } from "motion/react";
import type { SectionDef } from "./types";

const ACCENT = "#4338CA";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop sticky left sidebar (≥ lg)
// ─────────────────────────────────────────────────────────────────────────────

export function CaseSidebar({
  sections,
  activeId,
  projectTitle,
  projectSubtitle,
}: {
  sections: SectionDef[];
  activeId: string | null;
  projectTitle: string;
  projectSubtitle: string;
}) {
  return (
    <aside
      aria-label="Case study sections"
      className="hidden lg:flex flex-col"
      style={{
        position: "sticky",
        top: 64,
        alignSelf: "start",
        maxHeight: "calc(100vh - 64px)",
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
        paddingRight: "2rem",
        overflowY: "auto",
      }}
    >
      <div className="mb-10">
        <p
          className="uppercase"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            color: "var(--p-fg-35)",
          }}
        >
          Case Study
        </p>
        <p
          className="mt-2"
          style={{
            fontSize: "0.92rem",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--p-fg)",
          }}
        >
          {projectTitle}
        </p>
        <p
          className="mt-0.5"
          style={{
            fontSize: "0.74rem",
            color: "var(--p-fg-35)",
          }}
        >
          {projectSubtitle}
        </p>
      </div>

      <nav>
        <ol className="space-y-1">
          {sections.map((s) => {
            const isActive = s.id === activeId;
            return (
              <li key={s.id}>
                <button
                  onClick={() => scrollToSection(s.id)}
                  className="group w-full text-left transition-colors duration-200"
                  style={{
                    padding: "0.5rem 0",
                    color: isActive ? "var(--p-fg)" : "var(--p-fg-35)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "var(--p-fg-65)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "var(--p-fg-35)";
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="relative inline-block"
                      style={{ width: 24, height: 1 }}
                      aria-hidden
                    >
                      <span
                        className="absolute inset-0"
                        style={{
                          backgroundColor: "var(--p-fg-12)",
                        }}
                      />
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            layoutId="case-sidebar-active"
                            className="absolute inset-0"
                            style={{ backgroundColor: ACCENT }}
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className="tabular-nums"
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                      }}
                    >
                      {s.number}
                    </span>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: isActive ? 500 : 400,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {s.shortLabel ?? s.label}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile section nav — horizontally scrollable pill bar, sticky under navbar
// ─────────────────────────────────────────────────────────────────────────────

export function MobileSectionNav({
  sections,
  activeId,
}: {
  sections: SectionDef[];
  activeId: string | null;
}) {
  return (
    <div
      className="lg:hidden sticky z-30"
      style={{
        top: 64,
        backgroundColor: "var(--p-navbar)",
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--p-divide)",
      }}
    >
      <div
        className="flex gap-1 overflow-x-auto px-6 py-2.5 no-scrollbar"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="shrink-0 px-3 py-1.5 transition-colors duration-200"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "-0.005em",
                color: isActive ? "var(--p-fg)" : "var(--p-fg-35)",
                borderBottom: isActive
                  ? `1px solid ${ACCENT}`
                  : "1px solid transparent",
              }}
            >
              <span
                className="tabular-nums mr-1.5"
                style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}
              >
                {s.number}
              </span>
              {s.shortLabel ?? s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
