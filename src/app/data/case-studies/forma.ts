import type { CaseStudy } from "../../components/case-study/types";

export const forma: Partial<CaseStudy> = {
  client: "Multi-team product organization",
  tagline: "One token system, three teams, no inconsistency tax.",
  meta: {
    role: "Design Systems Lead",
    timeline: "14 weeks · 2025",
    team: "Cross-functional · 6 collaborators",
    stack: ["React", "TypeScript", "Storybook", "Style Dictionary", "Figma Tokens", "Jest", "Radix UI"],
    platform: "Web",
    impact: "−45% UI build time across teams",
  },
  overview: {
    title: "A token-led system that makes consistency the easy path.",
    body: "Forma is a small, well-defined contract between design and engineering — semantic tokens that flow from Figma to production, components shaped around accessibility, and adoption guardrails that let three teams move at different speeds without forking the system.",
    highlights: [
      { value: "40+", label: "Components" },
      { value: "3", label: "Adopting teams" },
      { value: "0", label: "WCAG violations" },
      { value: "45%", label: "Faster UI builds" },
    ],
  },
  problem: {
    title: "Three teams. Three buttons. Three meanings.",
    body: "Each team had built their own button, modal, and form primitives — slightly different in spacing, focus behavior, and color logic. By the time a designer joined the third team, the inconsistency itself had become a product feature people had opinions about.",
    painPoints: [
      {
        title: "Visual debt at the seams",
        body: "Cross-team flows had three slightly different button hover behaviors. Users felt the seams.",
      },
      {
        title: "Accessibility regressions",
        body: "Every duplicate component re-introduced focus-ring bugs and contrast misses.",
      },
      {
        title: "Slow new-hire ramp",
        body: "Onboarding designers had to learn three vocabularies. Code reviews were arguments about spacing constants.",
      },
    ],
  },
  designSystem: {
    title: "Semantic tokens are the product, components are the surface.",
    body: "Forma's bet is that durable consistency comes from naming — not from rules. Every primitive is named for the decision it represents, not the value it carries.",
    principles: [
      {
        title: "Tokens encode intent.",
        body: "`color.surface.elevated` means something. `gray-50` means nothing.",
      },
      {
        title: "Accessibility is a default, not an audit.",
        body: "Every primitive ships with a verified focus, error, and reduced-motion state.",
      },
      {
        title: "Adoption is a curve, not a deadline.",
        body: "Teams can adopt one primitive at a time. Migration is incremental by design.",
      },
    ],
    tokens: [
      { label: "Surface · default", value: "#FFFFFF", sample: "#FFFFFF" },
      { label: "Surface · elevated", value: "#F7F7F8", sample: "#F7F7F8" },
      { label: "Foreground", value: "#0F0F11", sample: "#0F0F11" },
      { label: "Accent · primary", value: "#4338CA", sample: "#4338CA" },
      { label: "Radius · md", value: "0.5rem" },
      { label: "Type · body", value: "Inter 400 / 1.55" },
    ],
    components: [
      "Button",
      "Input",
      "Select",
      "Combobox",
      "Modal",
      "Drawer",
      "Tooltip",
      "Popover",
      "DataTable",
      "Tabs",
      "EmptyState",
      "Toast",
    ],
    accessibilityNotes: [
      "All components verified against WCAG 2.1 AA with both automated and manual audits.",
      "Focus rings inherit accent intent across themes; never disabled.",
      "Motion respects prefers-reduced-motion at primitive level.",
    ],
  },
  architecture: {
    title: "A clean pipeline from design decision to production.",
    layers: [
      {
        label: "Source of truth",
        items: ["Figma Tokens Studio", "Token JSON"],
        note: "Designers edit named tokens directly in Figma; export auto-syncs to repo.",
      },
      {
        label: "Build",
        items: ["Style Dictionary", "Build script", "Theme variants"],
        note: "Tokens compile to TS/CSS/Tailwind/iOS outputs from a single source.",
      },
      {
        label: "Components",
        items: ["React + Radix UI primitives", "Storybook docs", "Jest a11y tests"],
        note: "Components are unstyled at the primitive layer and styled exclusively via tokens.",
      },
      {
        label: "Distribution",
        items: ["NPM package", "Storybook deployment", "Versioned changelog"],
        note: "Semantic versioning with migration scripts for breaking token renames.",
      },
    ],
  },
  outcomes: {
    title: "What it changed.",
    metrics: [
      { value: "−45%", label: "UI build time" },
      { value: "40+", label: "Components" },
      { value: "0", label: "A11y violations" },
      { value: "2", label: "External partners" },
    ],
    results: [
      "Reduced new feature UI build time by 45% across three product teams.",
      "Adopted by 2 external partner teams within 3 months of open-sourcing.",
      "Zero accessibility violations on shipped components.",
      "Cross-team design reviews shifted from style debates to product debates.",
    ],
    reflections: [
      {
        title: "Naming is the system.",
        body: "Tokens with semantic names outlasted every visual decision we made in v1.",
      },
      {
        title: "Adoption is a UX problem.",
        body: "Migration docs, automated codemods, and 'one component at a time' policy did more than any internal evangelism.",
      },
    ],
  },
};
