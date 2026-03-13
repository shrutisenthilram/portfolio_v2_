import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { getTagColor, INDIGO, CORAL, EMERALD, SKY, VIOLET, AMBER } from "../data/tagColors";

const ACCENT = INDIGO;

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Add your blog posts here ↓

const BLOG_POSTS = [
  {
    id: 1,
    title: "Why I think most design systems are solving the wrong problem",
    date: "Mar 10, 2026",
    readTime: "6 min read",
    tags: ["Design", "Systems"],
    excerpt:
      "Design systems are often built around consistency — but consistency isn't the goal. Clarity is. Here's how I think about building systems that actually help teams move faster.",
    link: "#",
  },
  {
    id: 2,
    title: "On building in public as a student",
    date: "Feb 24, 2026",
    readTime: "4 min read",
    tags: ["Reflection", "Career"],
    excerpt:
      "I started sharing my work before it was ready. It was uncomfortable and it was the best decision I made. A few thoughts on why building in public is underrated for students.",
    link: "#",
  },
  {
    id: 3,
    title: "The attention economy and interaction design",
    date: "Feb 8, 2026",
    readTime: "8 min read",
    tags: ["Design", "Ethics", "AI"],
    excerpt:
      "Every design decision is an argument about what deserves a user's attention. As AI increasingly mediates those decisions, the ethical stakes feel higher than ever.",
    link: "#",
  },
  {
    id: 4,
    title: "Notes from ETH Zürich: computational design methods",
    date: "Jan 20, 2026",
    readTime: "5 min read",
    tags: ["Learning", "Design"],
    excerpt:
      "A semester abroad changed how I think about making things. Some rough notes on algorithmic design, digital fabrication, and why constraints are generative.",
    link: "#",
  },
  {
    id: 5,
    title: "Latent space: what generative AI changed for me as a designer",
    date: "Dec 14, 2025",
    readTime: "7 min read",
    tags: ["AI", "Design", "Tools"],
    excerpt:
      "I resisted AI tools for a long time. Then I stopped resisting. Here's what changed, what I learned, and what I'm still uneasy about.",
    link: "#",
  },
];

// Add your artwork / photography here ↓

const ARTWORK = [
  {
    id: 1,
    title: "Generative #04",
    category: "Digital Art",
    year: "2026",
    image: "https://images.unsplash.com/photo-1768522488433-8d849b34bf2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBhcnQlMjBnZW5lcmF0aXZlfGVufDF8fHx8MTc3MzM4ODI0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "landscape",
  },
  {
    id: 2,
    title: "Zürich, 6am",
    category: "Photography",
    year: "2026",
    image: "https://images.unsplash.com/photo-1696506891297-14ed03941eb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGhvdG9ncmFwaHklMjB1cmJhbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzMzODgyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "square",
  },
  {
    id: 3,
    title: "Berkeley, dusk",
    category: "Photography",
    year: "2025",
    image: "https://images.unsplash.com/photo-1755448648139-f998940178c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcGhvdG9ncmFwaHklMjBzdHJlZXQlMjBhbmFsb2d8ZW58MXx8fHwxNzczMzg4MjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "portrait",
  },
  {
    id: 4,
    title: "Untitled, macro",
    category: "Photography",
    year: "2025",
    image: "https://images.unsplash.com/photo-1730626476382-5f18297a30b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBtYWNybyUyMHRleHR1cmUlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3MzM4ODI0NXww&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "square",
  },
  {
    id: 5,
    title: "Form & Shadow",
    category: "Digital Art",
    year: "2025",
    image: "https://images.unsplash.com/photo-1601743240194-f45724587958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMHNoYWRvdyUyMG1pbmltYWwlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzMzODgyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "landscape",
  },
  {
    id: 6,
    title: "Night Study",
    category: "Photography",
    year: "2025",
    image: "https://images.unsplash.com/photo-1611083360739-bdad6e0eb1fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbmlnaHQlMjBsb25nJTIwZXhwb3N1cmV8ZW58MXx8fHwxNzczMzg4MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "landscape",
  },
];

// Add your quick notes / thoughts here ↓

const NOTES = [
  {
    id: 1,
    date: "Mar 12, 2026",
    tag: "Observation",
    body: "Noticed that the most memorable interfaces I've used share one thing: they never made me feel stupid. Worth thinking about what that takes technically.",
  },
  {
    id: 2,
    date: "Mar 9, 2026",
    tag: "Reading",
    body: "\"The goal of a design is to establish appropriate expectations.\" — Don Norman. Obvious in retrospect. I keep forgetting this.",
  },
  {
    id: 3,
    date: "Mar 6, 2026",
    tag: "Idea",
    body: "What if portfolio sites didn't list skills at all — just work, and let the viewer infer? Might be worth trying. Strip everything back to artefacts.",
  },
  {
    id: 4,
    date: "Feb 28, 2026",
    tag: "Observation",
    body: "Spent the morning at a coffee shop watching how people interact with their phones. Most touch interactions happen with the thumb. Most UI is designed for index fingers. Still puzzling.",
  },
  {
    id: 5,
    date: "Feb 22, 2026",
    tag: "Quote",
    body: "\"Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.\" — Don Norman again. He keeps showing up.",
  },
  {
    id: 6,
    date: "Feb 15, 2026",
    tag: "Idea",
    body: "A version of spaced repetition but for design decisions — you mark something as uncertain, and it resurfaces later after you've had more context. Would I use this? Probably.",
  },
];

const ART_CATEGORIES = ["All", "Photography", "Digital Art"];

const NOTE_TAGS = ["All", "Observation", "Reading", "Idea", "Quote"];

const TAG_COLORS: Record<string, string> = {
  Observation: EMERALD,
  Reading:     CORAL,
  Idea:        VIOLET,
  Quote:       AMBER,
};

// ─── Tabs ───────────────────────────────��─────────────────────────────────────

const TABS = [
  { id: "writing", label: "Writing", glyph: "✦", color: INDIGO  },
  { id: "artwork", label: "Artwork", glyph: "◎", color: VIOLET  },
  { id: "notes",   label: "Notes",   glyph: "◈", color: CORAL   },
];

// ─── Writing tab ──────────────────────────────────────────────────────────────

function WritingTab() {
  return (
    <div className="divide-y" style={{ borderTop: "1px solid var(--p-divide)" }}>
      {BLOG_POSTS.map((post) => (
        <article
          key={post.id}
          className="py-6 group cursor-pointer transition-colors duration-200 -mx-8 px-8"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--p-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          onClick={() => window.open(post.link, "_blank")}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Meta */}
            <div className="shrink-0 sm:w-36">
              <p style={{ fontSize: "0.7rem", color: "var(--p-fg-35)" }}>{post.date}</p>
              <p style={{ fontSize: "0.7rem", color: "var(--p-fg-25)", marginTop: 2 }}>{post.readTime}</p>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3
                className="mb-1.5 group-hover:opacity-60 transition-opacity duration-200"
                style={{ fontSize: "0.95rem", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--p-fg)" }}
              >
                {post.title}
              </h3>
              <p
                className="mb-3 line-clamp-2"
                style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--p-fg-45)" }}
              >
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {post.tags.map((tag) => {
                  const color = getTagColor(tag);
                  return (
                    <span
                      key={tag}
                      className="px-2 py-0.5"
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.04em",
                        border: `1px solid ${color}40`,
                        color: color,
                        backgroundColor: color + "0D",
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
                <span
                  className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ fontSize: "0.72rem", color: ACCENT }}
                >
                  Read <ExternalLink size={10} />
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}

      {/* Add prompt */}
      <div className="py-8 text-center" style={{ borderTop: "1px solid var(--p-divide)" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--p-fg-25)" }}>
          Add posts to <code style={{ fontSize: "0.7rem", backgroundColor: "var(--p-surface)", padding: "1px 5px" }}>BLOG_POSTS</code> in <code style={{ fontSize: "0.7rem", backgroundColor: "var(--p-surface)", padding: "1px 5px" }}>PreviewPlayground.tsx</code>
        </p>
      </div>
    </div>
  );
}

// ─── Artwork tab ──────────────────────────────────────────────────────────────

function ArtworkTab() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<typeof ARTWORK[0] | null>(null);

  const visible = ARTWORK.filter(
    (a) => activeCategory === "All" || a.category === activeCategory
  );

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {ART_CATEGORIES.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 border transition-all duration-200"
              style={{
                fontSize: "0.72rem",
                fontWeight: active ? 500 : 400,
                backgroundColor: active ? ACCENT : "transparent",
                borderColor: active ? ACCENT : "var(--p-fg-12)",
                color: active ? "#fff" : "var(--p-fg-45)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Masonry-style grid */}
      <div className="columns-2 sm:columns-3 gap-3 space-y-3">
        {visible.map((piece) => (
          <div
            key={piece.id}
            className="break-inside-avoid group relative overflow-hidden cursor-pointer"
            onClick={() => setLightbox(piece)}
          >
            <img
              src={piece.image}
              alt={piece.title}
              className="w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              style={{
                aspectRatio:
                  piece.aspect === "portrait"
                    ? "3/4"
                    : piece.aspect === "square"
                    ? "1/1"
                    : "4/3",
              }}
            />
            <div
              className="absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 60%)" }}
            >
              <p className="text-white" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
                {piece.title}
              </p>
              <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.55)" }}>
                {piece.category} · {piece.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add prompt */}
      <div className="mt-8 py-6 text-center" style={{ borderTop: "1px solid var(--p-divide)" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--p-fg-25)" }}>
          Add images to <code style={{ fontSize: "0.7rem", backgroundColor: "var(--p-surface)", padding: "1px 5px" }}>ARTWORK</code> in <code style={{ fontSize: "0.7rem", backgroundColor: "var(--p-surface)", padding: "1px 5px" }}>PreviewPlayground.tsx</code>
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full object-cover"
              style={{ maxHeight: "80vh" }}
            />
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-white" style={{ fontSize: "0.88rem", fontWeight: 500 }}>
                  {lightbox.title}
                </p>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)" }}>
                  {lightbox.category} · {lightbox.year}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="text-white/50 hover:text-white transition-colors"
                style={{ fontSize: "1.2rem" }}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Notes tab ────────────────────────────────────────────────────────────────

function NotesTab() {
  const [activeTag, setActiveTag] = useState("All");

  const visible = NOTES.filter(
    (n) => activeTag === "All" || n.tag === activeTag
  );

  return (
    <div>
      {/* Tag filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {NOTE_TAGS.map((tag) => {
          const active = tag === activeTag;
          const color = TAG_COLORS[tag] ?? ACCENT;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="px-3 py-1.5 border transition-all duration-200"
              style={{
                fontSize: "0.72rem",
                fontWeight: active ? 500 : 400,
                backgroundColor: active ? color : "transparent",
                borderColor: active ? color : "var(--p-fg-12)",
                color: active ? "#fff" : "var(--p-fg-45)",
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Notes stream */}
      <div className="space-y-4">
        {visible.map((note) => {
          const tagColor = TAG_COLORS[note.tag] ?? ACCENT;
          return (
            <div
              key={note.id}
              className="p-5 transition-colors duration-200"
              style={{ border: "1px solid var(--p-divide)", backgroundColor: "var(--p-surface)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="px-2 py-0.5"
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#fff",
                    backgroundColor: tagColor,
                  }}
                >
                  {note.tag}
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--p-fg-35)" }}>{note.date}</span>
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.75,
                  color: "var(--p-fg-65)",
                  fontStyle: note.tag === "Quote" ? "italic" : "normal",
                }}
              >
                {note.body}
              </p>
            </div>
          );
        })}
      </div>

      {/* Add prompt */}
      <div className="mt-8 py-6 text-center" style={{ borderTop: "1px solid var(--p-divide)" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--p-fg-25)" }}>
          Add notes to <code style={{ fontSize: "0.7rem", backgroundColor: "var(--p-surface)", padding: "1px 5px" }}>NOTES</code> in <code style={{ fontSize: "0.7rem", backgroundColor: "var(--p-surface)", padding: "1px 5px" }}>PreviewPlayground.tsx</code>
        </p>
      </div>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

export function PreviewPlayground({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("writing");
  const activeTabData = TABS.find((t) => t.id === activeTab)!;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", fontFamily: "'Inter', sans-serif" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full sm:max-w-3xl flex flex-col overflow-hidden"
        style={{
          backgroundColor: "var(--p-bg)",
          maxHeight: "92vh",
          boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
          border: "1px solid var(--p-divide)",
        }}
      >
        {/* Header — dark with neon glow */}
        <div
          className="flex items-center justify-between px-8 py-5 shrink-0"
          style={{
            background: "linear-gradient(135deg, #0d0d10 0%, #12101a 100%)",
            borderBottom: `1px solid ${activeTabData.color}30`,
          }}
        >
          <div>
            <style>{`
              @keyframes pg-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.75; } }
              .pg-glyph { animation: pg-pulse 3s ease infinite; }
            `}</style>
            <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "#fff" }}>
              <span
                className="pg-glyph"
                style={{
                  color: activeTabData.color,
                  textShadow: `0 0 10px ${activeTabData.color}90, 0 0 28px ${activeTabData.color}40`,
                  marginRight: 8,
                }}
              >
                {activeTabData.glyph}
              </span>
              <span
                style={{
                  textShadow: `0 0 20px ${activeTabData.color}30`,
                }}
              >
                Playground
              </span>
            </p>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
              Writing, artwork & half-formed thoughts
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.3)", padding: 6 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            <X size={16} strokeWidth={1.6} />
          </button>
        </div>

        {/* Tab bar */}
        <div
          className="flex gap-0 px-8 shrink-0"
          style={{ borderBottom: "1px solid var(--p-divide)" }}
        >
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-1 py-4 mr-8 relative transition-colors duration-150"
                style={{ color: active ? tab.color : "var(--p-fg-35)" }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "var(--p-fg-65)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "var(--p-fg-35)"; }}
              >
                <span style={{ fontSize: "0.75rem" }}>{tab.glyph}</span>
                <span style={{ fontSize: "0.82rem", fontWeight: active ? 500 : 400 }}>{tab.label}</span>
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ backgroundColor: tab.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {activeTab === "writing" && <WritingTab />}
          {activeTab === "artwork" && <ArtworkTab />}
          {activeTab === "notes" && <NotesTab />}
        </div>
      </div>
    </div>
  );
}