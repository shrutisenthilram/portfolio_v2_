export type Project = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  year: string;
  status: string;
  role: string;
  github: string;
  live?: string;
  // Case study fields
  overview: string;
  problem: string;
  solution: string;
  outcomes: string[];
  tech: string[];
  secondaryImages: string[];
};

export const allProjects: Project[] = [
  {
    id: 1,
    slug: "clarity",
    title: "Clarity",
    subtitle: "AI Research Assistant",
    description:
      "A conversational tool that helps researchers synthesize academic papers using LLMs. Supports citation tracking, summary generation, and multi-paper comparison.",
    tags: ["AI", "Product Design", "React"],
    image:
      "https://images.unsplash.com/photo-1772217360642-0f7a7b1b77d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG1hY2hpbmUlMjBsZWFybmluZyUyMGFic3RyYWN0JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzMzNzY2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2026",
    status: "Featured",
    role: "Product Designer & Engineer",
    github: "https://github.com/alexchen/clarity",
    live: "https://clarity-ai.vercel.app",
    overview:
      "Clarity emerged from a personal frustration with academic research. Spending hours cross-referencing dozens of papers, losing threads, re-reading the same abstracts — I wanted a tool that could hold the entire context of a literature review and surface connections a human might miss.",
    problem:
      "Researchers spend up to 40% of their time just managing sources — tracking what they've read, what's relevant, and how ideas connect across papers. Existing tools like Zotero and Mendeley solve storage, but not synthesis.",
    solution:
      "I designed a chat-first interface where users drop in papers (PDF or DOI) and ask natural questions across their entire library. Under the hood, each paper is chunked, embedded, and stored in a vector DB. GPT-4 retrieves semantically relevant chunks to answer questions with inline citations.",
    outcomes: [
      "Reduced average literature review time by 60% in user testing with 12 PhD students",
      "4.8/5 satisfaction score across 3 rounds of usability testing",
      "Accepted to Stanford HAI workshop as a demo project",
      "320+ waitlist sign-ups in the first two weeks",
    ],
    tech: ["React", "TypeScript", "OpenAI API", "Pinecone", "FastAPI", "Python", "Tailwind CSS"],
    secondaryImages: [
      "https://images.unsplash.com/photo-1625655164399-6e7b172727d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHBhcGVyJTIwbm90ZXMlMjBkZXNrJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMzNzg5NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1653548410459-5dffc2cef115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwaW50ZXJmYWNlJTIwd2lyZWZyYW1lJTIwcHJvdG90eXBlJTIwZGVzaWdufGVufDF8fHx8MTc3MzM3ODk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 2,
    slug: "pulseboard",
    title: "PulseBoard",
    subtitle: "Analytics Dashboard",
    description:
      "Real-time data visualization platform for startup growth metrics. Built with D3.js and WebSockets for live data streaming.",
    tags: ["Data", "Web", "TypeScript"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZCUyMGRhcmt8ZW58MXx8fHwxNzczMzc2NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2025",
    status: "Featured",
    role: "Full-Stack Engineer",
    github: "https://github.com/alexchen/pulseboard",
    live: "https://pulseboard.io",
    overview:
      "PulseBoard was built for a YC-backed startup that needed a single place to watch all their growth levers in real time — MRR, churn, activation rates, and funnel conversion — without waiting for a data analyst to pull a report.",
    problem:
      "Early-stage startups drown in dashboards that are either too generic (Mixpanel, Amplitude) or require engineering effort to customize. Founders need opinionated, startup-specific metrics they can act on immediately.",
    solution:
      "I built a composable dashboard engine where metric tiles connect to a WebSocket stream. Each tile is independently configurable — time range, aggregation, alert thresholds. D3.js handles the rendering so charts animate smoothly as data arrives.",
    outcomes: [
      "Reduced time-to-insight from 24 hours to under 30 seconds for the founding team",
      "Integrated with Stripe, PostHog, and Linear in the first sprint",
      "Used daily by a team of 8 across engineering and growth",
      "Sub-200ms p99 latency for all real-time metric updates",
    ],
    tech: ["React", "TypeScript", "D3.js", "WebSockets", "Node.js", "PostgreSQL", "Redis"],
    secondaryImages: [
      "https://images.unsplash.com/photo-1632055186471-64814edeaab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwYW5hbHl0aWNzJTIwbWV0cmljcyUyMGdyb3d0aCUyMGNoYXJ0fGVufDF8fHx8MTc3MzM3ODk1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1653548410459-5dffc2cef115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwaW50ZXJmYWNlJTIwd2lyZWZyYW1lJTIwcHJvdG90eXBlJTIwZGVzaWdufGVufDF8fHx8MTc3MzM3ODk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 3,
    slug: "forma",
    title: "Forma",
    subtitle: "Design System",
    description:
      "A modular, accessible component library built for scale. 40+ components with full Figma integration and Storybook documentation.",
    tags: ["Product Design", "Figma", "Open Source"],
    image:
      "https://images.unsplash.com/photo-1766503206606-27de0861e8a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwcHJvZHVjdCUyMGRlc2lnbiUyMGFwcCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzMzNzY2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2025",
    status: "Featured",
    role: "Design Systems Lead",
    github: "https://github.com/alexchen/forma-ds",
    overview:
      "Forma was born from watching three product teams at the same company build the same button component three different ways. The inconsistency showed up in the product, and the fix needed to happen at the system level.",
    problem:
      "Fast-moving product teams don't have time to maintain design consistency manually. Without a shared system, every new feature introduces new visual debt — slightly different spacing, conflicting color usage, duplicated logic.",
    solution:
      "I led the design and engineering of Forma: a token-based system where every decision (color, spacing, radius, typography) is a named variable that flows from Figma into code automatically via Style Dictionary. Components are built in React, documented in Storybook, and tested for WCAG AA compliance.",
    outcomes: [
      "Reduced new feature UI build time by 45% across three product teams",
      "40+ components shipped, all with Figma + code parity",
      "Zero accessibility violations on all components (automated + manual audit)",
      "Adopted by 2 external partner teams within 3 months of open-sourcing",
    ],
    tech: ["React", "TypeScript", "Storybook", "Style Dictionary", "Figma Tokens", "Jest", "Radix UI"],
    secondaryImages: [
      "https://images.unsplash.com/photo-1653548410459-5dffc2cef115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwaW50ZXJmYWNlJTIwd2lyZWZyYW1lJTIwcHJvdG90eXBlJTIwZGVzaWdufGVufDF8fHx8MTc3MzM3ODk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1625655164399-6e7b172727d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHBhcGVyJTIwbm90ZXMlMjBkZXNrJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMzNzg5NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 4,
    slug: "waypoint",
    title: "Waypoint",
    subtitle: "Campus Navigation App",
    description:
      "Indoor navigation app with AR overlays for university buildings. Used by 3,000+ students at UC Berkeley.",
    tags: ["Mobile", "AR", "Product Design"],
    image:
      "https://images.unsplash.com/photo-1684922778746-baa1151af66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWdtZW50ZWQlMjByZWFsaXR5JTIwQVIlMjBzcGF0aWFsJTIwY29tcHV0aW5nfGVufDF8fHx8MTc3MzM3ODQyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2025",
    status: "Featured",
    role: "UX Researcher & Designer",
    github: "https://github.com/alexchen/waypoint",
    overview:
      "Every semester, thousands of new students at UC Berkeley spend the first week lost — not just directionally, but spatially. Room 213 in Soda Hall might be on the third floor or the basement depending on the wing. Waypoint solves indoor navigation with AR.",
    problem:
      "GPS doesn't work indoors. Existing campus maps are static PDFs. New students and visitors waste significant time navigating large, poorly-signed academic buildings — especially during finals when stress is already high.",
    solution:
      "I led a 6-week research sprint (interviews, shadowing, diary studies) before a single wireframe was drawn. The resulting app uses ARKit to overlay directional arrows on the live camera feed, keyed to BLE beacons placed at decision points throughout the building.",
    outcomes: [
      "3,000+ active monthly users across 8 buildings",
      "Average navigation time reduced by 71% vs. asking for directions",
      "4.7 App Store rating from 340+ reviews",
      "Featured in UC Berkeley's student newspaper and the Daily Cal",
    ],
    tech: ["React Native", "ARKit", "CoreLocation", "BLE Beacons", "MapKit", "Swift"],
    secondaryImages: [
      "https://images.unsplash.com/photo-1675295740364-320b831fd16e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMzc4OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBVWCUyMGludGVyZmFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzMzNzg0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 5,
    slug: "thread",
    title: "Thread",
    subtitle: "Social Reading App",
    description:
      "A mobile-first reading app where users annotate books and share highlights with friends. Built in React Native.",
    tags: ["Mobile", "Product Design", "AI"],
    image:
      "https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBVWCUyMGludGVyZmFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzMzNzg0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2024",
    status: "Case Study",
    role: "Product Designer",
    github: "https://github.com/alexchen/thread-app",
    overview:
      "Reading is deeply personal but often lonely. Thread is a reading companion that makes the margins of your books social — highlights, notes, and reactions shared with a curated group of friends, not the public internet.",
    problem:
      "Goodreads is stale. Book clubs are logistically hard. Most people have no way to discuss what they're reading with friends who are reading the same thing at the same time.",
    solution:
      "Thread lets you import any book via ISBN, highlight passages, and see friends' annotations alongside your own — like iMessage but for the margins of a book. An AI layer surfaces connections between your notes across different books.",
    outcomes: [
      "Completed as a 10-week design sprint with 5 rounds of usability testing",
      "Prototype validated with 24 avid readers across 3 cities",
      "Core interaction (inline social annotations) tested at 94% task completion",
      "Presented at Local Product Meetup, San Francisco — 200+ attendees",
    ],
    tech: ["React Native", "Expo", "Supabase", "OpenAI", "Figma"],
    secondaryImages: [
      "https://images.unsplash.com/photo-1563267292-b787b0ae72bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwYm9va3MlMjBvcGVuJTIwcGFnZXMlMjBsaWdodCUyMG1pbmltYWx8ZW58MXx8fHwxNzczMzc4OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1653548410459-5dffc2cef115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwaW50ZXJmYWNlJTIwd2lyZWZyYW1lJTIwcHJvdG90eXBlJTIwZGVzaWdufGVufDF8fHx8MTc3MzM3ODk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 6,
    slug: "mosaic",
    title: "Mosaic",
    subtitle: "E-Commerce Platform",
    description:
      "A curated marketplace for independent artists. Handles payments, inventory, and storefront customization for 500+ sellers.",
    tags: ["Web", "Product Design", "Data"],
    image:
      "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWIlMjBkZXNpZ24lMjBtb2Rlcm4lMjBtaW5pbWFsfGVufDF8fHx8MTc3MzM3ODQxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2024",
    status: "Live",
    role: "Full-Stack Engineer",
    github: "https://github.com/alexchen/mosaic",
    live: "https://mosaicmarket.co",
    overview:
      "Etsy takes a large cut and buries small sellers in an algorithm. Mosaic is a tighter, curated alternative — you apply to sell, your storefront is your own, and the platform takes a flat 5% with no listing fees.",
    problem:
      "Independent artists and makers struggle to build sustainable income online. Platforms like Etsy, while large, commoditize sellers and obscure individual brand identity beneath search results and ads.",
    solution:
      "Each seller on Mosaic gets a fully customizable storefront with their own subdomain. I built a drag-and-drop layout editor, Stripe Connect integration for payouts, and an inventory system that syncs with physical POS.",
    outcomes: [
      "500+ active sellers onboarded in the first 6 months",
      "$120K+ in total GMV processed in year one",
      "Average seller rating of 4.9/5 stars",
      "Featured in Product Hunt's top products of the week",
    ],
    tech: ["Next.js", "TypeScript", "Stripe Connect", "Prisma", "PostgreSQL", "Vercel", "Cloudinary"],
    secondaryImages: [
      "https://images.unsplash.com/photo-1632055186471-64814edeaab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwYW5hbHl0aWNzJTIwbWV0cmljcyUyMGdyb3d0aCUyMGNoYXJ0fGVufDF8fHx8MTc3MzM3ODk1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1625655164399-6e7b172727d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHBhcGVyJTIwbm90ZXMlMjBkZXNrJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMzNzg5NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 7,
    slug: "lumen",
    title: "Lumen",
    subtitle: "Accessibility Linter",
    description:
      "A VS Code extension that flags WCAG 2.1 violations in real-time as you write JSX. 1,200+ installs on the marketplace.",
    tags: ["Open Source", "Web", "Product Design"],
    image:
      "https://images.unsplash.com/photo-1761759858288-35e89100d7fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NpYmlsaXR5JTIwaW5jbHVzaXZlJTIwZGVzaWduJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzMzNzg0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2024",
    status: "Open Source",
    role: "Solo Engineer",
    github: "https://github.com/alexchen/lumen-a11y",
    overview:
      "Most accessibility issues are caught in QA, long after the code is written. Lumen moves the feedback loop earlier — directly into your editor, as you type, before a PR is ever opened.",
    problem:
      "Accessibility is often treated as an afterthought. Engineers mean well but don't always know the rules (ARIA labels, contrast ratios, focus management). Existing linters (eslint-plugin-jsx-a11y) only run in the terminal, not inline.",
    solution:
      "Lumen is a VS Code Language Server that parses JSX in real time using an AST and checks against WCAG 2.1 rules. Violations show as inline squiggles with plain-English explanations and one-click fixes where possible.",
    outcomes: [
      "1,200+ installs on the VS Code Marketplace in 3 months",
      "Covers 38 distinct WCAG 2.1 success criteria",
      "14 open-source contributors from 8 countries",
      "Featured in the weekly JavaScript newsletter (42K subscribers)",
    ],
    tech: ["TypeScript", "VS Code Extension API", "Language Server Protocol", "AST parsing", "Jest"],
    secondaryImages: [
      "https://images.unsplash.com/photo-1770734360042-676ef707d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZWRpdG9yJTIwdmlzdWFsJTIwc3R1ZGlvJTIwZGFyayUyMHNjcmVlbnxlbnwxfHx8fDE3NzMzNzg5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1625655164399-6e7b172727d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHBhcGVyJTIwbm90ZXMlMjBkZXNrJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMzNzg5NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 8,
    slug: "neural-sketchbook",
    title: "Neural Sketchbook",
    subtitle: "Generative Art Tool",
    description:
      "An experimental generative art tool that uses diffusion models to transform rough sketches into finished illustrations.",
    tags: ["AI", "Web", "Product Design"],
    image:
      "https://images.unsplash.com/photo-1761223976145-a85ffe11fc57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBBSSUyMGFic3RyYWN0JTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NzMzNzg0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2024",
    status: "Experiment",
    role: "Research Engineer",
    github: "https://github.com/alexchen/neural-sketchbook",
    overview:
      "Neural Sketchbook explores a simple question: what if a sketchbook could see your intent? You draw a loose shape, pick a style (ink illustration, watercolor, ukiyo-e) and the model fills in what you meant — not what you drew.",
    problem:
      "Generative AI tools optimize for prompt engineers, not visual thinkers. Non-artists can't communicate intent through text prompts alone. Spatial and gestural input is fundamentally different from language.",
    solution:
      "A canvas where strokes are captured as ControlNet conditioning inputs, not just images. The model uses your sketch's spatial structure (edges, composition) combined with a style prompt to generate outputs that feel grounded in your original intent.",
    outcomes: [
      "Demoed to 80+ attendees at SF AI x Design meetup",
      "3 follow-up collaborations with independent illustrators",
      "Forked 140+ times on GitHub",
      "Ongoing experiment — actively exploring video sketch-to-animation",
    ],
    tech: ["Python", "Stable Diffusion", "ControlNet", "React", "FastAPI", "Canvas API"],
    secondaryImages: [
      "https://images.unsplash.com/photo-1772217360642-0f7a7b1b77d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG1hY2hpbmUlMjBsZWFybmluZyUyMGFic3RyYWN0JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzMzNzY2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1653548410459-5dffc2cef115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwaW50ZXJmYWNlJTIwd2lyZWZyYW1lJTIwcHJvdG90eXBlJTIwZGVzaWdufGVufDF8fHx8MTc3MzM3ODk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];
