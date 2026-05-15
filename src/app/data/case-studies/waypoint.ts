import type { CaseStudy } from "../../components/case-study/types";

export const waypoint: Partial<CaseStudy> = {
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
};
