// Single source of truth for links and wording that appear on several pages.
// Change them here and every page stays consistent.

export const SITE = {
  name: "Shruti Senthilram",
  email: "senthilramshruti@gmail.com",
  github: "https://github.com/shrutisenthilram",
  githubLabel: "github.com/shrutisenthilram",
  linkedin: "https://linkedin.com/in/shrutisenthilram/",
  linkedinLabel: "linkedin.com/in/shrutisenthilram",
  // Google Drive link. Make sure sharing is set to "Anyone with the link".
  // Later this becomes two files: a PM resume and an SWE resume.
  resume:
    "https://drive.google.com/file/d/1lkLAkAtCbMyIuyhAY7I_820Z4pDXwhKw/view?usp=sharing",
  headshot: "/images/5.jpg",
  // One availability line, used in the hero, About, and Contact.
  availability: "Open to APM & PM roles · 2027",
  headline: "I turn messy problems into",
  headlineAccent: "shipped products.",
  proof: "Currently @ Cloudflare",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Locks: while an area is `true`, visitors to the LIVE site see an "under construction"
// notice instead of its content. When you run the site locally (`npm run dev`) you
// always see the real content. To preview what visitors see, add ?locked to any URL
// (for example http://localhost:5173/?locked). Flip a value to false and push to unlock.
// ─────────────────────────────────────────────────────────────────────────────
export const LOCKS = {
  projects: true, // Featured Projects, All Projects, project pages, case studies, Kin prototype
  playground: true, // the Playground tab
} as const;
