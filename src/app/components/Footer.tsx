import { Bouquet, Butterfly, Grass, IcedLatte, Sprout, TinyBloom } from "./FloralArt";
import { SITE } from "../data/site";

const CORAL = "#557A63";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="px-6 md:px-12 max-w-6xl mx-auto pb-10"
    >
      <div
        className="relative pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderTop: "1px solid var(--p-divide)" }}
      >
        {/* flowers planted on the footer line */}
        <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0" style={{ bottom: "calc(100% - 1px)", height: 0 }}>
          <Sprout className="absolute bottom-0 left-[2%] w-7 sm:w-8" />
          <Sprout className="absolute bottom-0 left-[8%] w-6 sm:w-7 hidden sm:block" />
          <Sprout className="absolute bottom-0 right-[24%] w-7 hidden md:block" />
          <Bouquet className="absolute bottom-0 right-[3%] w-24" />
          {/* grass tufts to make it a garden */}
          <Grass className="absolute bottom-0 left-[5%] w-6" />
          <Grass className="absolute bottom-0 left-[14%] w-7 hidden sm:block" />
          <Grass className="absolute bottom-0 left-[33%] w-6 hidden md:block" />
          <Grass className="absolute bottom-0 right-[19%] w-7 hidden md:block" />
          <Grass className="absolute bottom-0 right-[31%] w-6 hidden lg:block" />
          {/* butterflies */}
          <Butterfly className="w-11" style={{ right: "13%", bottom: "92px", animationDuration: "17s" }} />
          <Butterfly className="w-8 hidden sm:block" style={{ left: "10%", bottom: "70px", animationDuration: "21s", animationDelay: "-6s" }} />
        </div>
        <div className="flex flex-col gap-2" style={{ fontSize: "0.78rem", color: "var(--p-fg-45)" }}>
          <span className="inline-flex items-center gap-2">
            <TinyBloom size={14} />
            © {year} {SITE.name}
          </span>
          <span className="inline-flex items-center gap-2">
            <IcedLatte className="w-4 h-auto" />
            Made with iced lattes
          </span>
        </div>

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
