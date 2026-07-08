import type { Prd } from "../../components/prd/types";
import { kinPrd } from "./kin";
import { voteSmartPrd } from "./voting-literacy";
import { designFrontiersPrd } from "./design-frontiers-website";
import { enoPrd } from "./eno-checkout-teardown";

// Projects with a PRD get a PRD overview as the primary content at
// /projects/:slug, with a CTA into the deeper design case study at
// /projects/:slug/case-study. Projects without an entry here keep the
// existing single-page case study experience (Portfolio Design and every
// "Coming Soon" project) — see ProjectDetailPage.tsx.
export const prds: Record<string, Prd> = {
  kin: kinPrd,
  "voting-literacy": voteSmartPrd,
  "design-frontiers-website": designFrontiersPrd,
  "eno-checkout-teardown": enoPrd,
};

export function getPrd(slug: string): Prd | undefined {
  return prds[slug];
}

export function hasPrd(slug: string): boolean {
  return Boolean(prds[slug]);
}
