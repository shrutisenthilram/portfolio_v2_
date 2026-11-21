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
