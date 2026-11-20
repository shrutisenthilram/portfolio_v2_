// ─────────────────────────────────────────────────────────────────────────────
// PrdShell
// The primary landing page at /projects/:slug for any project that has a PRD
// (see src/app/data/prds/index.ts). Reuses the same hero/meta primitives as
// the deep case study (CaseStudyShell) for visual continuity, but keeps the
// body content to a single readable column — this is meant to read like a
// clean PRD, not the rich, multi-section case study.
//
// Sections with no data are simply not rendered (visitors never see
// placeholders), and the remaining sections are numbered automatically. Fill a
// field in the PRD data file and its section appears.
//
// The "View Full Design Case Study →" button lives inside the hero itself
// (passed as the `cta` prop to ImmersiveHero) so it's guaranteed to sit right
// under the title/tagline, above the fold, on every project that has one.
// ─────────────────────────────────────────────────────────────────────────────

import type { CaseStudy } from "../case-study/types";
import { ImmersiveHero, MetaRow, FooterNav } from "../case-study/CaseStudyShell";
import type { Prd } from "./types";
import {
  ProseSection,
  ListSection,
  MilestonesSection,
  ReferenceLinksSection,
} from "./PrdSections";

type SectionDef =
  | { kind: "prose"; id: string; label: string; body?: string }
  | { kind: "list"; id: string; label: string; items?: string[] }
  | { kind: "milestones"; id: string; label: string; items?: Prd["milestones"] }
  | { kind: "links"; id: string; label: string; links?: Prd["referenceLinks"] };

function hasContent(s: SectionDef): boolean {
  switch (s.kind) {
    case "prose":
      return Boolean(s.body);
    case "list":
      return Boolean(s.items && s.items.length > 0);
    case "milestones":
      return Boolean(s.items && s.items.length > 0);
    case "links":
      return Boolean(s.links && s.links.length > 0);
  }
}

export function PrdShell({
  study,
  prd,
  caseStudyHref,
  prev,
  next,
}: {
  study: CaseStudy;
  prd: Prd;
  caseStudyHref: string;
  prev?: { slug: string; title: string; subtitle: string } | null;
  next?: { slug: string; title: string; subtitle: string } | null;
}) {
  const sections: SectionDef[] = [
    { kind: "prose", id: "why-now", label: "Why We're Doing This", body: prd.whyNow },
    { kind: "prose", id: "problem-statement", label: "Problem Statement", body: prd.problemStatement },
    { kind: "prose", id: "target-audience", label: "Target Audience", body: prd.targetAudience },
    { kind: "prose", id: "impact-value", label: "Impact & Value", body: prd.impactValue },
    { kind: "list", id: "success-metrics", label: "Success Metrics", items: prd.successMetrics },
    { kind: "list", id: "scope-features", label: "Scope & Features", items: prd.scopeFeatures },
    { kind: "list", id: "out-of-scope", label: "Out of Scope", items: prd.outOfScope },
    {
      kind: "list",
      id: "assumptions-dependencies",
      label: "Assumptions & Dependencies",
      items: prd.assumptionsDependencies,
    },
    { kind: "milestones", id: "milestones", label: "Milestones", items: prd.milestones },
    { kind: "list", id: "open-questions", label: "Open Questions", items: prd.openQuestions },
    { kind: "links", id: "reference-links", label: "Reference Links", links: prd.referenceLinks },
  ].filter(hasContent) as SectionDef[];

  return (
    <article style={{ fontFamily: "'Inter', sans-serif" }}>
      <ImmersiveHero
        study={study}
        cta={{ label: "View Full Design Case Study →", href: caseStudyHref }}
      />

      {/* Single readable column — narrower than the case study's sidebar+content
          layout on purpose, so this page reads as a clean overview document. */}
      <div className="max-w-[860px] mx-auto px-6 md:px-10 lg:px-14">
        <MetaRow study={study} />

        {sections.map((s, i) => {
          const number = String(i + 1).padStart(2, "0");
          switch (s.kind) {
            case "prose":
              return <ProseSection key={s.id} id={s.id} number={number} label={s.label} body={s.body} />;
            case "list":
              return <ListSection key={s.id} id={s.id} number={number} label={s.label} items={s.items} />;
            case "milestones":
              return <MilestonesSection key={s.id} id={s.id} number={number} label={s.label} items={s.items} />;
            case "links":
              return <ReferenceLinksSection key={s.id} id={s.id} number={number} label={s.label} links={s.links} />;
          }
        })}
      </div>

      <FooterNav prev={prev} next={next} />
    </article>
  );
}
