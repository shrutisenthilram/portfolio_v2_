import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Eyebrow, Lede } from "./primitives";

type SectionProps = {
  id: string;
  number: string;
  label: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children: ReactNode;
};

export function CaseSection({
  id,
  number,
  label,
  eyebrow,
  title,
  lede,
  children,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px 0px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-28 py-14 md:py-20 lg:py-24"
      style={{ borderTop: "1px solid var(--p-divide)" }}
    >
      <header className="flex items-center gap-4 mb-8 md:mb-10">
        <span
          className="tabular-nums"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: "var(--p-fg-35)",
          }}
        >
          {number}
        </span>
        <span
          className="uppercase"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: "var(--p-fg-65)",
          }}
        >
          {label}
        </span>
        <span
          aria-hidden
          className="flex-1"
          style={{ height: 1, backgroundColor: "var(--p-divide)" }}
        />
      </header>

      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2
          id={`${id}-title`}
          className="mt-3 mb-4 md:mt-4 md:mb-6"
          style={{
            fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
            fontWeight: 300,
            letterSpacing: "-0.024em",
            lineHeight: 1.12,
            color: "var(--p-fg)",
          }}
        >
          {title}
        </h2>
      )}
      {lede && (
        <div className="mb-10 md:mb-12">
          <Lede>{lede}</Lede>
        </div>
      )}

      <div className="space-y-8 md:space-y-10">{children}</div>
    </motion.section>
  );
}
