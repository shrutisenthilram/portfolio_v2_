// ─────────────────────────────────────────────────────────────────────────────
// PrdSections.tsx
// Section renderers for the PRD overview page. Each one wraps CaseSection
// (the same numbered-header primitive the deep case study uses, for visual
// consistency) and falls back to a clearly-marked "needs your input" note
// when the underlying data field is missing — never silently blank, never
// guessed content.
// ─────────────────────────────────────────────────────────────────────────────

import { CaseSection } from "../case-study/Section";
import { BodyText, BulletList } from "../case-study/primitives";
import type { PrdLink, PrdMilestone } from "./types";

function NeedsInput({ label }: { label: string }) {
  return (
    <p
      className="px-5 py-4"
      style={{
        border: "1px dashed var(--p-fg-18)",
        color: "var(--p-fg-35)",
        fontSize: "0.85rem",
        lineHeight: 1.65,
        fontStyle: "italic",
      }}
    >
      Needs your input — add the real {label.toLowerCase()} here when you have it.
    </p>
  );
}

export function ProseSection({
  id,
  number,
  label,
  body,
}: {
  id: string;
  number: string;
  label: string;
  body?: string;
}) {
  return (
    <CaseSection id={id} number={number} label={label}>
      {body ? <BodyText>{body}</BodyText> : <NeedsInput label={label} />}
    </CaseSection>
  );
}

export function ListSection({
  id,
  number,
  label,
  items,
}: {
  id: string;
  number: string;
  label: string;
  items?: string[];
}) {
  return (
    <CaseSection id={id} number={number} label={label}>
      {items && items.length > 0 ? (
        <BulletList items={items} />
      ) : (
        <NeedsInput label={label} />
      )}
    </CaseSection>
  );
}

export function MilestonesSection({
  id,
  number,
  label,
  items,
}: {
  id: string;
  number: string;
  label: string;
  items?: PrdMilestone[];
}) {
  return (
    <CaseSection id={id} number={number} label={label}>
      {items && items.length > 0 ? (
        <div className="space-y-6">
          {items.map((m) => (
            <div key={m.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--p-fg)",
                  minWidth: "9rem",
                  flexShrink: 0,
                }}
              >
                {m.label}
              </span>
              <span style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--p-fg-65)" }}>
                {m.detail}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <NeedsInput label={label} />
      )}
    </CaseSection>
  );
}

export function ReferenceLinksSection({
  id,
  number,
  label,
  links,
}: {
  id: string;
  number: string;
  label: string;
  links?: PrdLink[];
}) {
  return (
    <CaseSection id={id} number={number} label={label}>
      {links && links.length > 0 ? (
        <div className="flex flex-wrap gap-2.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 transition-colors duration-200 hover:opacity-80"
              style={{ fontSize: "0.78rem", color: "var(--p-fg-65)", border: "1px solid var(--p-divide)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : (
        <NeedsInput label={label} />
      )}
    </CaseSection>
  );
}
