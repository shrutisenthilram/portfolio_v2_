import type { ContentProject } from "../types";

// Every *.json file in this folder is a project. Add a file (or use /admin) and
// it is picked up automatically.
const modules = import.meta.glob("./*.json", {
  eager: true,
  import: "default",
}) as Record<string, ContentProject>;

export const contentProjects: ContentProject[] = Object.values(modules).sort(
  (a, b) => (a.order ?? 999) - (b.order ?? 999),
);

// Drafts are visible only while running locally (`npm run dev`). In the
// production build they are removed entirely, so unfinished work never ships.
export const SHOW_DRAFTS = import.meta.env.DEV;

export const listedContentProjects = contentProjects.filter(
  (p) => p.status === "published" || SHOW_DRAFTS,
);

export function getContentProject(slug: string | undefined): ContentProject | undefined {
  return listedContentProjects.find((p) => p.slug === slug);
}
