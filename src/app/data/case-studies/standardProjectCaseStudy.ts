import type { CaseStudy } from "../../components/case-study/types";
import {
  PROJECT_IMAGE_FILES,
  projectImage,
  projectOverviewHero,
} from "../projectImages";

/**
 * Image slots for non-Kin projects. Text still comes from projects.ts (merged in index).
 * Replace files in public/images/<slug>/ — keep the same filenames.
 */
export function standardProjectCaseStudy(
  slug: string,
  title: string,
): Partial<CaseStudy> {
  const img = (file: string) => projectImage(slug, file);

  return {
    overview: {
      media: [
        {
          src: projectOverviewHero(slug),
          alt: `${title} — overview`,
        },
      ],
    },
    finalSolution: {
      media: [
        {
          src: img(PROJECT_IMAGE_FILES.final1),
          alt: `${title} — key screen 1`,
        },
        {
          src: img(PROJECT_IMAGE_FILES.final2),
          alt: `${title} — key screen 2`,
        },
        {
          src: img(PROJECT_IMAGE_FILES.final3),
          alt: `${title} — key screen 3`,
        },
      ],
    },
  };
}
