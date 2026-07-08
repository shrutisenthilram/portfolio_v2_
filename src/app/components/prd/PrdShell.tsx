// ─────────────────────────────────────────────────────────────────────────────
// PrdShell
// The primary landing page at /projects/:slug for any project that has a PRD
// (see src/app/data/prds/index.ts). Reuses the same hero/meta primitives as
// the deep case study (CaseStudyShell) for visual continuity, but keeps the
// body content to a single readable column — this is meant to read like a
// clean PRD, not the rich, multi-section case study.
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

        <ProseSection id="why-now" number="01" label="Why We're Doing This" body={prd.whyNow} />
        <ProseSection id="problem-statement" number="02" label="Problem Statement" body={prd.problemStatement} />
        <ProseSection id="target-audience" number="03" label="Target Audience" body={prd.targetAudience} />
        <ProseSection id="impact-value" number="04" label="Impact & Value" body={prd.impactValue} />
        <ListSection id="success-metrics" number="05" label="Success Metrics" items={prd.successMetrics} />
        <ListSection id="scope-features" number="06" label="Scope & Features" items={prd.scopeFeatures} />
        <ListSection id="out-of-scope" number="07" label="Out of Scope" items={prd.outOfScope} />
        <ListSection
          id="assumptions-dependencies"
          number="08"
          label="Assumptions & Dependencies"
          items={prd.assumptionsDependencies}
        />
        <MilestonesSection id="milestones" number="09" label="Milestones" items={prd.milestones} />
        <ListSection id="open-questions" number="10" label="Open Questions" items={prd.openQuestions} />
        <ReferenceLinksSection id="reference-links" number="11" label="Reference Links" links={prd.referenceLinks} />
      </div>

      <FooterNav prev={prev} next={next} />
    </article>
  );
}
