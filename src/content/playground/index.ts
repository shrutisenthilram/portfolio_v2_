import type { PlaygroundItem } from "../types";

// Every *.json file in this folder is a playground item. Add one with /admin/playground.
const modules = import.meta.glob("./*.json", {
  eager: true,
  import: "default",
}) as Record<string, PlaygroundItem>;

export const playgroundItems: PlaygroundItem[] = Object.values(modules).sort(
  (a, b) => (a.order ?? 999) - (b.order ?? 999),
);

// Drafts are visible only while running locally; the production build strips them.
export const SHOW_PLAYGROUND_DRAFTS = import.meta.env.DEV;

export const listedPlaygroundItems = playgroundItems.filter(
  (i) => i.status === "published" || SHOW_PLAYGROUND_DRAFTS,
);
