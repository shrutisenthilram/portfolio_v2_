import type { CaseStudy } from "../../components/case-study/types";

export const pulseboard: Partial<CaseStudy> = {
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
};
