/**
 * Drop images in public/images/<slug>/ using these filenames.
 *
 * thumbnail.png       — project cards (home + /projects)
 * overview-hero.png   — case study page hero + overview section
 * final-1.png …       — final solution section (large hero + gallery)
 */

export const PROJECT_IMAGE_FILES = {
  thumbnail: "thumbnail.png",
  overviewHero: "overview-hero.png",
  final1: "final-1.png",
  final2: "final-2.png",
  final3: "final-3.png",
} as const;

export function projectImage(slug: string, filename: string): string {
  return `/images/${slug}/${filename}`;
}

export function projectThumbnail(slug: string): string {
  return projectImage(slug, PROJECT_IMAGE_FILES.thumbnail);
}

export function projectOverviewHero(slug: string): string {
  return projectImage(slug, PROJECT_IMAGE_FILES.overviewHero);
}
