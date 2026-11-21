import { TinyBloom } from "./FloralArt";

// Thin line with a single outline flower in the middle (same flower as the section labels).
export function FloralDivider() {
  return (
    <div aria-hidden="true" className="flex items-center gap-4 px-6 md:px-12 max-w-6xl mx-auto py-1">
      <span className="flex-1 h-px" style={{ backgroundColor: "var(--p-divide)" }} />
      <TinyBloom size={22} />
      <span className="flex-1 h-px" style={{ backgroundColor: "var(--p-divide)" }} />
    </div>
  );
}
