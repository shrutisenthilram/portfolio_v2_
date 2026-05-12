import type { CaseStudy } from "../components/case-study/types";
import type { Project } from "./projects";

// ─────────────────────────────────────────────────────────────────────────────
// Curated case study content
// ─────────────────────────────────────────────────────────────────────────────
// Add a project's slug as a key to give it a full, hand-written case study.
// Projects without an entry here fall back to a derived case study built from
// the basic Project fields in src/app/data/projects.ts.

export const caseStudies: Record<string, Partial<CaseStudy>> = {
  clarity: {
    client: "Stanford HAI Demo Track",
    tagline:
      "A research workflow that treats sources, citations, and synthesis as one connected surface — not three.",
    meta: {
      role: "Product Designer & Engineer",
      timeline: "12 weeks · 2026",
      team: "Solo design + eng, with 2 ML advisors",
      stack: [
        "React",
        "TypeScript",
        "OpenAI",
        "Pinecone",
        "FastAPI",
        "Python",
        "Tailwind",
      ],
      platform: "Web",
      impact: "−60% time-to-synthesis in PhD user study",
    },
    overview: {
      title: "Treating literature review as a connected workflow, not a search box.",
      body: "Clarity reframes a familiar surface — a chat with an AI — into a workspace anchored in real papers, real citations, and real provenance. Every answer is traceable. Every claim is grounded. The interface optimizes for trust as the unit of progress, not just speed.",
      highlights: [
        { value: "12", label: "Week sprint" },
        { value: "320+", label: "Waitlist sign-ups" },
        { value: "4.8/5", label: "User study satisfaction" },
        { value: "60%", label: "Reduction in synthesis time" },
      ],
    },
    problem: {
      title: "Researchers spend 40% of their time managing sources, not thinking.",
      body: "I shadowed PhD candidates across three institutions and watched the same pattern: a 30-tab browser, a Notion canvas, a spinning Mendeley, and the slow cognitive cost of remembering which paper said what. The tools solved storage but never synthesis — the moment ideas connect across documents.",
      painPoints: [
        {
          title: "Lost provenance",
          body: "Highlights, notes, and references drift away from their sources. By the time a draft begins, half of the cited claims are guesses.",
        },
        {
          title: "Cognitive context-switching",
          body: "Each new question requires opening five PDFs again, even when they've already been read. Reading is paid for, but understanding isn't preserved.",
        },
        {
          title: "Tool fragmentation",
          body: "Zotero, Notion, Google Scholar, and ChatGPT each hold a fragment of the same research. None of them know about each other.",
        },
      ],
      quote: {
        text: "I don't want a smarter search engine. I want a system that remembers what I've already read.",
        attribution: "PhD candidate, computational biology",
      },
    },
    context: {
      title: "Working within real research culture and real model behavior.",
      body: "Speed matters less than trust here — a hallucination kills adoption. The constraints shaped every design and architecture decision downstream.",
      constraints: [
        {
          label: "Trust ceiling",
          body: "If a single citation is wrong, researchers stop trusting the entire surface. Accuracy is a binary, not a gradient.",
        },
        {
          label: "Latency budget",
          body: "Retrieval + generation needed to feel responsive. We had ~4s before users perceived the system as slow.",
        },
        {
          label: "Cold-start library",
          body: "Most users started with zero papers loaded. Onboarding had to make the value obvious in under 60 seconds.",
        },
        {
          label: "Two-person engineering",
          body: "Just me and one ML advisor in the build phase — every feature had to justify its surface area twice.",
        },
      ],
      tradeoffs: [
        {
          gave: "Free-form chat with no source restrictions.",
          got: "Every answer cites the user's own library — slower, but trustworthy.",
        },
        {
          gave: "Native mobile support at v1.",
          got: "A research-grade desktop experience that actually fits how PhDs work.",
        },
      ],
    },
    research: {
      title: "Listening to how research actually happens.",
      body: "Six weeks of formative research before a wireframe existed. I treated each interview like a debugging session for the research process itself.",
      methods: [
        {
          label: "12 semi-structured interviews",
          detail: "PhDs and senior masters students across CS, computational bio, and HCI.",
        },
        {
          label: "5 think-alouds",
          detail: "Watching live literature reviews with screen recordings.",
        },
        {
          label: "Diary study",
          detail: "Two weeks of journaling for 6 participants during active reviews.",
        },
        {
          label: "Competitive teardowns",
          detail: "Elicit, ResearchRabbit, Consensus, Connected Papers, SciSpace.",
        },
      ],
      insights: [
        {
          title: "Citations are the currency of trust.",
          body: "If a user can't verify a claim in a single click, they re-do the work manually. Citations are the product.",
        },
        {
          title: "Synthesis is collaborative, even when solo.",
          body: "People narrate their thinking aloud during reviews. The interface should feel like a thinking partner, not a search tool.",
        },
        {
          title: "Saved highlights die alone.",
          body: "Most tools let you highlight, but few let those highlights become queries later. Memory should compound.",
        },
      ],
      quote: {
        text: "I trust a citation more than I trust the answer.",
        attribution: "Synthesis from 12 interviews",
      },
    },
    strategy: {
      title: "Make synthesis cheaper without making trust cheaper.",
      body: "We narrowed the bet to one core loop — ask, ground, verify — and protected it from feature creep.",
      targetUsers: [
        {
          label: "Primary: PhD researchers (yrs 2–4)",
          detail: "Mid-thesis researchers managing 50–200+ papers and writing actively.",
        },
        {
          label: "Secondary: Senior masters students",
          detail: "Doing literature reviews for thesis or graduate research projects.",
        },
      ],
      goals: [
        "Cut average literature-review time per question by 50%+.",
        "Maintain >95% citation correctness across user-tested queries.",
        "Reach 4+ avg satisfaction on perceived trust.",
      ],
      mvp: {
        included: [
          "PDF + DOI ingestion",
          "Library-scoped chat with inline citations",
          "Highlight → query memory",
          "Single-paper deep dive",
        ],
        excluded: [
          "Team collaboration",
          "Mobile clients",
          "Custom prompt management",
          "Public sharing of answers",
        ],
      },
      metrics: [
        { value: "<4s", label: "p95 query latency" },
        { value: "≥95%", label: "Citation correctness" },
        { value: "4.5+/5", label: "Perceived trust" },
        { value: "50%↓", label: "Time to synthesis" },
      ],
      risks: [
        {
          label: "Hallucinated citations",
          body: "Mitigated with retrieval-grounded answers and strict citation rendering pinned to source IDs.",
        },
        {
          label: "Empty-state drop-off",
          body: "First-time users with no library churn fast. Mitigated with curated starter packs and onboarding paper picker.",
        },
      ],
    },
    architecture: {
      title: "A retrieval-first system with trust as a first-class concern.",
      body: "The architecture is deliberately boring at the edges — chat in, sources out — so the interesting work happens in the middle: chunking strategy, citation linking, and provenance preservation.",
      layers: [
        {
          label: "Client",
          items: ["React", "TypeScript", "Tailwind", "Streaming UI"],
          note: "Optimistic streaming with token-level citation injection and source preview hover cards.",
        },
        {
          label: "API",
          items: ["FastAPI", "WebSockets", "Auth (Clerk)", "Rate limiting"],
          note: "WebSocket layer streams chunks for sub-perceptual response delay; REST for library ops.",
        },
        {
          label: "RAG pipeline",
          items: [
            "Document chunker",
            "Embedding worker",
            "Pinecone vector store",
            "GPT-4 (retrieval-augmented)",
          ],
          note: "Hybrid retrieval: dense embeddings + sparse BM25 reranker over user-scoped namespace.",
        },
        {
          label: "Storage",
          items: ["Postgres", "S3 (PDFs)", "Redis (queue)"],
          note: "Papers and highlights stored as first-class entities so memory compounds across sessions.",
        },
      ],
      notes: [
        "Citations are computed server-side and injected into the stream as structured tokens — not parsed from model output. This is the foundation of trust.",
        "Embedding namespaces are user-scoped so we can scale horizontally without cross-contamination.",
        "Streaming UI dropped p95 perceived latency from 6.8s to 1.4s.",
      ],
    },
    ideation: {
      title: "Branches we walked down — and what we learned.",
      explorations: [
        {
          title: "Spatial canvas of papers",
          body: "A graph view where related papers cluster automatically. Beautiful but added cognitive load — users wanted answers, not maps.",
          outcome: "cut",
        },
        {
          title: "Chat-first surface",
          body: "Anchored in conversation but every answer renders citations inline. Felt familiar and immediately usable.",
          outcome: "kept",
        },
        {
          title: "Highlight → question loop",
          body: "Selecting text inside a paper creates a question rooted to that passage. Tested as the highest-leverage interaction.",
          outcome: "evolved",
        },
        {
          title: "AI-narrated literature review",
          body: "Auto-generated draft sections. Demos beautifully but lacks user agency — researchers want a partner, not an output.",
          outcome: "cut",
        },
      ],
    },
    flows: {
      title: "Three core loops everything else supports.",
      flows: [
        {
          title: "First-question flow",
          steps: [
            { label: "Drop a paper", body: "PDF or DOI; embeddings begin in the background." },
            { label: "Ask a question", body: "Library-scoped chat opens with paper as context." },
            { label: "See cited answer", body: "Each claim links to the source passage." },
            { label: "Verify and continue", body: "Hover preview before clicking through." },
          ],
        },
        {
          title: "Memory loop",
          steps: [
            { label: "Highlight a passage", body: "Right-click → 'Remember' or use keyboard shortcut." },
            { label: "Auto-tagged", body: "Highlights inherit paper, section, and topic tags." },
            { label: "Surfaced later", body: "Future questions reference these as priority context." },
            { label: "Cross-paper synthesis", body: "Highlights from different papers become cited claims." },
          ],
        },
      ],
      edgeCases: [
        "Empty library: onboarding suggests a starter pack based on the user's field.",
        "Unreadable PDFs (scans, equations): system surfaces a fallback summary and explains the limitation.",
        "Off-topic questions: model declines and suggests the closest in-library question.",
      ],
      accessibility: [
        "All citation interactions reachable via keyboard with focus rings.",
        "Streaming text respects prefers-reduced-motion.",
        "Color is never the only signal for confidence or source quality.",
      ],
    },
    designSystem: {
      title: "Quiet primitives that get out of the way of dense text.",
      body: "Research interfaces are text-heavy. The system is intentionally restrained — generous spacing, restrained color, and a single accent reserved for actionable signals.",
      principles: [
        {
          title: "Citations are first-class.",
          body: "They have their own component, motion, and focus behavior — not an afterthought of body text.",
        },
        {
          title: "Color earns its place.",
          body: "Indigo only signals actionable intent or current focus. Neutrals carry the bulk of information.",
        },
        {
          title: "Density without noise.",
          body: "Tight type scale and quiet borders let long-form synthesis breathe without feeling sparse.",
        },
      ],
      tokens: [
        { label: "Foreground", value: "#0F0F11", sample: "#0F0F11" },
        { label: "Accent", value: "#4338CA", sample: "#4338CA" },
        { label: "Surface", value: "#F3F3F4", sample: "#F3F3F4" },
        { label: "Divide", value: "rgba(0,0,0,0.08)" },
        { label: "Type", value: "Inter 300–500" },
        { label: "Body line-height", value: "1.78" },
      ],
      components: [
        "CitationToken",
        "SourceHoverCard",
        "QuestionInput",
        "PaperRow",
        "HighlightCallout",
        "StreamingAnswer",
        "LibraryShelf",
        "InlineErrorBoundary",
      ],
      accessibilityNotes: [
        "WCAG AA contrast across all body and citation states.",
        "Reduced-motion respected for streaming and hover affordances.",
        "Live regions announce streamed answer completion.",
      ],
    },
    iteration: {
      title: "What testing told us to change.",
      rounds: [
        {
          round: "Round 1 · 6 PhDs",
          change: "Inline citations rendered as full URLs at end of answer.",
          result: "Users distrusted the answer entirely. Citations had to live inside the sentence to be believable.",
        },
        {
          round: "Round 2 · 4 grad students",
          change: "Switched to inline numbered citation tokens with hover preview.",
          result: "Trust scores jumped from 2.8 to 4.4. Hover preview emerged as the highest-leverage feature.",
        },
        {
          round: "Round 3 · 6 PhDs",
          change: "Added 'verify mode' that highlights every grounded passage in the source PDF.",
          result: "Verification time dropped 70%. Became the keystone interaction for re-use.",
        },
      ],
      experiments: [
        {
          hypothesis: "Streaming responses will feel faster than full-shot responses, even when end-to-end latency is similar.",
          result: "Confirmed. Perceived latency dropped from 6.8s to 1.4s with no infra change.",
        },
        {
          hypothesis: "Users will prefer a separate 'sources' tab over inline citations.",
          result: "Rejected. Inline citations won 5/6 in head-to-head tests for trust.",
        },
      ],
    },
    finalSolution: {
      title: "A research workspace that respects how scientists actually think.",
      body: "The shipped product is calmer than most AI surfaces — and that's the point. Trust is built through restraint.",
      highlights: [
        {
          title: "Grounded streaming",
          body: "Every token of the answer is paired with its source. The model never speaks unverified.",
        },
        {
          title: "Memory that compounds",
          body: "Highlights, notes, and questions persist across sessions and inform future queries.",
        },
        {
          title: "Quiet visuals",
          body: "An editorial type scale and restrained accent let dense scientific content breathe.",
        },
      ],
    },
    outcomes: {
      title: "Measurable impact, and what I'd do next.",
      metrics: [
        { value: "−60%", label: "Synthesis time" },
        { value: "4.8/5", label: "Satisfaction" },
        { value: "320+", label: "Waitlist" },
        { value: "1.4s", label: "p95 perceived" },
      ],
      results: [
        "Reduced average literature review time by 60% in user testing with 12 PhD students.",
        "Accepted to Stanford HAI workshop as a demo project.",
        "320+ waitlist sign-ups in the first two weeks of soft launch.",
        "Citation correctness held at 98% across 240+ tested queries.",
      ],
      reflections: [
        {
          title: "Trust is a UI problem first.",
          body: "We over-invested in model quality early. The bigger lever turned out to be how the answer was rendered, not what it said.",
        },
        {
          title: "Saying 'no' shipped this.",
          body: "Cutting the spatial canvas and team features felt like loss at the time. They were what allowed the core loop to feel mature.",
        },
        {
          title: "Designing for verification, not just generation.",
          body: "AI tools are usually optimized for the first answer. Researchers re-read everything; the second loop matters more.",
        },
      ],
      nextSteps: [
        "Shared annotation layer for research groups.",
        "Auto-detection of citation drift across paper versions.",
        "Offline-first highlighting for fieldwork users.",
      ],
    },
  },

  pulseboard: {
    client: "YC-backed seed-stage startup",
    tagline: "A growth telemetry surface fast enough to live next to Slack.",
    meta: {
      role: "Founding Full-Stack Engineer",
      timeline: "8 weeks · 2025",
      team: "Me + 2 founders",
      stack: ["React", "TypeScript", "D3.js", "WebSockets", "Node.js", "PostgreSQL", "Redis"],
      platform: "Web",
      impact: "Time-to-insight: 24h → <30s",
    },
    overview: {
      title: "Real-time growth telemetry, opinionated for early-stage founders.",
      body: "Most analytics tools assume you know what to measure. PulseBoard assumes you don't — and ships with opinionated startup metrics, alert thresholds, and tile templates so founders can answer 'what just changed?' before their coffee gets cold.",
      highlights: [
        { value: "<200ms", label: "p99 latency" },
        { value: "8", label: "Daily active operators" },
        { value: "30s", label: "Time-to-insight" },
        { value: "3", label: "Data sources at launch" },
      ],
    },
    problem: {
      title: "Founders fly blind between Mixpanel exports and Slack panic.",
      body: "Mixpanel and Amplitude are powerful but generic. Customizing them takes engineering time founders don't have. The result: every team I shadowed had a half-built dashboard, a Slack bot, and a slow data person they were trying not to over-rely on.",
      painPoints: [
        {
          title: "Lagging data culture",
          body: "Metrics that should drive same-day decisions arrive in next-week reports.",
        },
        {
          title: "Generic tooling",
          body: "Most dashboards are built for product analysts, not founders making weekly bet decisions.",
        },
        {
          title: "No alerting layer",
          body: "Growth signals get noticed when someone happens to refresh a tab.",
        },
      ],
    },
    context: {
      title: "Real-time data is easy. Real-time decisions are not.",
      constraints: [
        {
          label: "p99 budget < 200ms",
          body: "Founders refresh a metric multiple times per day. Anything slower than this and the tool feels broken.",
        },
        {
          label: "Two engineers (me + one founder)",
          body: "We had to ship a real-time pipeline without a dedicated data team. Composability and infra simplicity were non-negotiable.",
        },
        {
          label: "Sources of truth varied",
          body: "Stripe, PostHog, and Linear each had their own freshness, schema, and reliability characteristics.",
        },
      ],
      tradeoffs: [
        {
          gave: "Cosmetic chart polish at v1.",
          got: "A streaming foundation that became the platform feature within six weeks.",
        },
        {
          gave: "Generic dashboard flexibility.",
          got: "Opinionated tile templates that solved the cold-start problem.",
        },
      ],
    },
    strategy: {
      title: "Make 'what changed today?' a 5-second question.",
      targetUsers: [
        {
          label: "Founder / operator (primary)",
          detail: "Decides weekly bets. Doesn't write SQL but understands their funnel.",
        },
        {
          label: "Early growth engineer (secondary)",
          detail: "Wires data sources and tunes alerts.",
        },
      ],
      goals: [
        "Make growth metrics feel like Slack — always on, always fresh.",
        "Reduce time-to-insight from 24h to <30s.",
        "Replace half-built internal dashboards within 6 weeks of install.",
      ],
      mvp: {
        included: [
          "Streaming tile system with WebSocket fan-out",
          "Stripe + PostHog + Linear integrations",
          "Threshold-based alerts",
          "Composable layout grid",
        ],
        excluded: [
          "Custom SQL editor",
          "BI-style multi-step reports",
          "Multi-tenant teams",
          "Mobile app",
        ],
      },
      metrics: [
        { value: "<200ms", label: "p99 stream latency" },
        { value: "30s", label: "Time-to-insight" },
        { value: "≥80%", label: "Founder DAU" },
      ],
    },
    architecture: {
      title: "A small, ruthless real-time pipeline.",
      body: "Every architectural choice was sized against 'will this still hold at 10× load with one engineer?'",
      layers: [
        {
          label: "Client",
          items: ["React", "D3.js", "WebSocket client", "Tile renderer"],
          note: "Each tile owns its own subscription and reconciles updates in 16ms paint budgets.",
        },
        {
          label: "Stream layer",
          items: ["Node.js gateway", "Pub/Sub fan-out", "JWT auth"],
          note: "Lightweight broker fans Redis events out to thousands of tile subscriptions.",
        },
        {
          label: "Ingest workers",
          items: ["Stripe webhook", "PostHog webhook", "Linear sync"],
          note: "Idempotent ingesters normalize external schemas into internal canonical events.",
        },
        {
          label: "Storage",
          items: ["PostgreSQL", "Redis (queue + cache)"],
          note: "Hot path lives in Redis; cold storage is normalized Postgres for replay.",
        },
      ],
      notes: [
        "We deliberately avoided Kafka — too much operational overhead for our team size.",
        "Each tile is independently subscribable; the dashboard composes from a registry, not a monolith.",
        "p99 budget enforced via CI perf tests against synthetic streams.",
      ],
    },
    iteration: {
      title: "Each release was a metric, not a feature.",
      rounds: [
        {
          round: "Week 2",
          change: "Switched from polling to WebSocket subscriptions.",
          result: "p99 dropped from 1.8s to 220ms.",
        },
        {
          round: "Week 4",
          change: "Introduced tile alert thresholds with Slack escalation.",
          result: "Founders started catching dropoffs same-day instead of next-week.",
        },
        {
          round: "Week 6",
          change: "Added opinionated tile templates (MRR, churn, activation).",
          result: "Onboarding time dropped from 45min to 7min for new users.",
        },
      ],
    },
    outcomes: {
      title: "What shipped, and what's next.",
      metrics: [
        { value: "<200ms", label: "p99 latency" },
        { value: "30s", label: "Time-to-insight" },
        { value: "8", label: "Daily active users" },
        { value: "3", label: "Integrations live" },
      ],
      results: [
        "Reduced time-to-insight from 24 hours to under 30 seconds.",
        "Used daily by a team of 8 across engineering and growth.",
        "Sub-200ms p99 latency for all real-time metric updates.",
        "Replaced 2 internal dashboards and a Slack bot inside week 1.",
      ],
      reflections: [
        {
          title: "Opinionated > flexible — early.",
          body: "Tile templates did more for adoption than any 'customizable everything' feature would have.",
        },
        {
          title: "Latency budgets are product decisions.",
          body: "Setting a 200ms p99 budget shaped half the architecture choices and protected the product feel.",
        },
      ],
    },
  },

  forma: {
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
  },

  waypoint: {
    client: "UC Berkeley pilot",
    tagline: "Indoor wayfinding that respects how people actually move under stress.",
    meta: {
      role: "UX Researcher & Designer",
      timeline: "6 weeks · 2025",
      team: "5 cross-functional",
      stack: ["React Native", "ARKit", "CoreLocation", "BLE Beacons", "MapKit", "Swift"],
      platform: "iOS",
      impact: "−71% navigation time in field study",
    },
    overview: {
      title: "AR wayfinding designed for first-week stress, not best-case demos.",
      body: "Waypoint solves indoor navigation in cognitive overload conditions — finals week, a new building, a new student. We optimized for confidence per glance, not raw accuracy.",
      highlights: [
        { value: "3000+", label: "Active monthly users" },
        { value: "−71%", label: "Navigation time" },
        { value: "4.7", label: "App Store rating" },
        { value: "8", label: "Buildings live" },
      ],
    },
    problem: {
      title: "GPS dies indoors. PDFs don't help.",
      body: "Students lose hours every semester to indoor wayfinding inside academic buildings whose room numbering doesn't match floor logic. The cost shows up in stress, not in productivity.",
      painPoints: [
        {
          title: "Static maps fail under stress",
          body: "PDFs require orientation and translation; students under exam stress can't do either reliably.",
        },
        {
          title: "Decision points are unsigned",
          body: "Buildings sign destinations but not transitions. The hard moment is the stairwell, not the door.",
        },
        {
          title: "Visitors don't know what to ask",
          body: "Asking for directions requires already knowing the building's vocabulary.",
        },
      ],
    },
    research: {
      title: "Six weeks listening before we drew anything.",
      methods: [
        { label: "9 first-week shadowing sessions", detail: "New students attempting unfamiliar buildings." },
        { label: "Diary study", detail: "Tracking confusion events across 2 weeks for 12 participants." },
        { label: "12 interviews", detail: "First-year students, transfer students, visiting researchers." },
        { label: "Spatial audit", detail: "Cataloguing signage gaps across 4 buildings on UCB campus." },
      ],
      insights: [
        {
          title: "Confidence > accuracy.",
          body: "Users rated 'I know I'm on the right path' higher than 'I know exactly where I am.'",
        },
        {
          title: "Decision points are the product.",
          body: "Most navigation effort happens at 3-4 critical turning moments — not over the whole route.",
        },
        {
          title: "Stress collapses bandwidth.",
          body: "Under cognitive load, students could process at most one cue per second.",
        },
      ],
    },
    strategy: {
      title: "Optimize for 'confidence per glance.'",
      mvp: {
        included: [
          "AR arrow overlays at decision points",
          "Landmark-based confirmation moments",
          "Voice cue for hands-occupied use",
          "Recover-from-wrong-turn flow",
        ],
        excluded: [
          "Full 3D building reconstruction",
          "Outdoor handoff to Apple Maps",
          "Multi-floor elevator pathing v1",
        ],
      },
      metrics: [
        { value: "−50%", label: "Navigation time" },
        { value: "≥4.5/5", label: "User confidence" },
        { value: "≥85%", label: "First-try success" },
      ],
    },
    flows: {
      title: "Where the cognitive load actually lives.",
      flows: [
        {
          title: "Decision-point guidance",
          steps: [
            { label: "Approach turning point", body: "BLE beacons detect the user is close to a decision moment." },
            { label: "Arrow appears", body: "Single directional cue overlays camera feed, no extra UI." },
            { label: "Landmark confirms", body: "'Pass the green doors' — a verifiable real-world anchor." },
            { label: "Glance success", body: "Users continue without re-engaging the screen." },
          ],
        },
        {
          title: "Wrong-turn recovery",
          steps: [
            { label: "Beacon drift detected", body: "User has deviated from path." },
            { label: "Calm correction", body: "Soft haptic + 'turn around' message — no panic UI." },
            { label: "Re-anchor", body: "Closest known landmark is named to rebuild orientation." },
          ],
        },
      ],
      edgeCases: [
        "Lost AR tracking → fall back to 2D mini-map with last-known orientation.",
        "Multi-floor routes pause for elevator/stairs choice with accessibility-aware default.",
        "Crowded hallways slow path animation to reduce occlusion stress.",
      ],
      accessibility: [
        "Voice cues optional, never sole signal.",
        "High-contrast arrow with redundant motion path for color-blind users.",
        "All decision-point alerts have haptic equivalents.",
      ],
    },
    outcomes: {
      title: "Impact across a real population.",
      metrics: [
        { value: "3,000+", label: "Monthly users" },
        { value: "−71%", label: "Navigation time" },
        { value: "4.7", label: "App Store" },
        { value: "340+", label: "Reviews" },
      ],
      results: [
        "3,000+ active monthly users across 8 buildings.",
        "Average navigation time reduced by 71% vs. asking for directions.",
        "4.7 App Store rating from 340+ reviews.",
        "Featured in UC Berkeley's student paper.",
      ],
      reflections: [
        {
          title: "Stress-state design has its own rules.",
          body: "Best-case usability tested fine; high-cognitive-load testing surfaced a different set of priorities.",
        },
        {
          title: "Landmarks are infrastructure.",
          body: "The product depends on real-world anchors. The work was cataloguing them before designing around them.",
        },
      ],
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Fallback derivation — any project without a curated entry still renders
// a credible case study by deriving sensible blocks from its base Project.
// ─────────────────────────────────────────────────────────────────────────────

export function buildFallbackCaseStudy(project: Project): CaseStudy {
  return {
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    year: project.year,
    status: project.status,
    heroImage: project.image,
    meta: {
      role: project.role,
      timeline: project.year,
      team: "Cross-functional collaboration",
      stack: project.tech,
      impact: project.outcomes[0] ?? "Shipped end-to-end.",
    },
    overview: {
      title: project.subtitle,
      body: project.overview,
      highlights: [
        { value: project.year, label: "Shipped" },
        { value: project.tech.length.toString(), label: "Tech areas" },
        { value: project.outcomes.length.toString(), label: "Outcomes" },
        { value: project.role.split(" ").slice(-1)[0], label: "Role" },
      ],
    },
    problem: {
      title: "The problem.",
      body: project.problem,
    },
    architecture: {
      title: "Stack and architecture decisions.",
      body: "Selected technologies and roles within the system.",
      layers: [
        {
          label: "Client",
          items: project.tech.filter((t) =>
            /react|next|swift|native|tailwind|typescript|d3|figma/i.test(t),
          ),
        },
        {
          label: "Service",
          items: project.tech.filter((t) =>
            /node|fastapi|api|python|stripe|supabase|prisma/i.test(t),
          ),
        },
        {
          label: "Data / AI",
          items: project.tech.filter((t) =>
            /pinecone|openai|postgres|redis|sql|ml|controlnet|diffusion/i.test(t),
          ),
        },
      ].filter((l) => l.items.length > 0),
    },
    finalSolution: {
      title: "Solution.",
      body: project.solution,
      media:
        project.secondaryImages.length > 0
          ? project.secondaryImages.map((src, i) => ({
              src,
              caption: `${project.title} — visual ${i + 1}`,
            }))
          : undefined,
    },
    outcomes: {
      title: "Outcomes.",
      results: project.outcomes,
    },
  };
}

export function getCaseStudy(project: Project): CaseStudy {
  const curated = caseStudies[project.slug];
  const fallback = buildFallbackCaseStudy(project);
  if (!curated) return fallback;
  // Curated overrides fallback. `meta` is always required so the
  // curated meta wins when present, otherwise the fallback meta carries.
  return {
    ...fallback,
    ...curated,
    meta: curated.meta ?? fallback.meta,
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    year: project.year,
    status: project.status,
    heroImage: project.image,
  };
}
