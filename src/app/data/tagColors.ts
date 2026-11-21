export const INDIGO  = "#B65670";
export const CORAL   = "#557A63";
export const EMERALD = "#6B7F45";
export const AMBER   = "#A87432";
export const SKY     = "#4F7C82";
export const VIOLET  = "#7F5C8F";

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
  "HCI":             SKY,
  "Economics":       SKY,
  "Civic":           SKY,
  "Healthcare":      SKY,
  "iOS":             SKY,
  "Nonprofit":       EMERALD,
  "Figma":           INDIGO,
  "Prototyping":     INDIGO,

  // Creative → VIOLET
  "AR":             VIOLET,
  "Creative":       VIOLET,
  "Art":            VIOLET,
  "3D":             VIOLET,
  "Idea":           VIOLET,

  // Featured / Awards → AMBER
  "Featured":       AMBER,

  // Fintech / Investing → SKY
  "Fintech":        SKY,
  "Investing":      SKY,

  // ML / AI → VIOLET
  "ML":             VIOLET,
  "AI":             VIOLET,

  // Engineering / Product / Open source → INDIGO
  "SWE":            INDIGO,
  "Engineering":    INDIGO,
  "Product":        INDIGO,
  "Open Source":    INDIGO,

  // Leadership → EMERALD
  "Leadership":     EMERALD,

  // Critique / Teardown → CORAL (research family)
  "Teardown":       CORAL,
};

export function getTagColor(tag: string): string {
  return TAG_COLOR_MAP[tag] ?? INDIGO;
}
