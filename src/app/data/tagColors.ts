export const INDIGO  = "#4338CA";
export const CORAL   = "#F97316";
export const EMERALD = "#10B981";
export const AMBER   = "#F59E0B";
export const SKY     = "#06B6D4";
export const VIOLET  = "#7C3AED";

const TAG_COLOR_MAP: Record<string, string> = {
  // Design / Tech → INDIGO
  "Product Design": INDIGO,
  "Design":         INDIGO,
  "Web":            INDIGO,
  "Mobile":         INDIGO,
  "Systems":        INDIGO,
  "Tools":          INDIGO,
  "Design Systems": INDIGO,

  // Research / Strategy → CORAL
  "Research":       CORAL,
  "UX Research":    CORAL,
  "Strategy":       CORAL,
  "Ethics":         CORAL,
  "Career":         CORAL,
  "Reflection":     CORAL,
  "Quote":          CORAL,

  // Open Source / Community → EMERALD
  "Open Source":    EMERALD,
  "Community":      EMERALD,
  "Accessibility":  EMERALD,
  "Learning":       EMERALD,
  "Observation":    EMERALD,

  // Engineering / Code → SKY
  "AI":             SKY,
  "Data":           SKY,
  "Engineering":    SKY,
  "Computer Vision":SKY,

  // Creative → VIOLET
  "AR":             VIOLET,
  "Creative":       VIOLET,
  "Art":            VIOLET,
  "3D":             VIOLET,
  "Idea":           VIOLET,

  // Featured / Awards → AMBER
  "Featured":       AMBER,
};

export function getTagColor(tag: string): string {
  return TAG_COLOR_MAP[tag] ?? INDIGO;
}
