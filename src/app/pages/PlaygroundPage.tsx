import { useState } from "react";
import { ExternalLink } from "lucide-react";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

// ─── DATA ─────────────────────────────────────────────────────────────────────
// ↓ Add your blog posts here

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

// ↓ Add your artwork / photography here

const ARTWORK = [
  {
    id: 1,
    title: "Generative #04",
    category: "Digital Art",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1768522488433-8d849b34bf2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBhcnQlMjBnZW5lcmF0aXZlfGVufDF8fHx8MTc3MzM4ODI0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "landscape",
  },
  {
    id: 2,
    title: "Zürich, 6am",
    category: "Photography",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1696506891297-14ed03941eb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGhvdG9ncmFwaHklMjB1cmJhbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzMzODgyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "square",
  },
  {
    id: 3,
    title: "Berkeley, dusk",
    category: "Photography",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1755448648139-f998940178c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcGhvdG9ncmFwaHklMjBzdHJlZXQlMjBhbmFsb2d8ZW58MXx8fHwxNzczMzg4MjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "portrait",
  },
  {
    id: 4,
    title: "Untitled, macro",
    category: "Photography",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1730626476382-5f18297a30b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBtYWNybyUyMHRleHR1cmUlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3MzM4ODI0NXww&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "square",
  },
  {
    id: 5,
    title: "Form & Shadow",
    category: "Digital Art",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1601743240194-f45724587958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMHNoYWRvdyUyMG1pbmltYWwlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzMzODgyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "landscape",
  },
  {
    id: 6,
    title: "Night Study",
    category: "Photography",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1611083360739-bdad6e0eb1fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbmlnaHQlMjBsb25nJTIwZXhwb3N1cmV8ZW58MXx8fHwxNzczMzg4MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "landscape",
  },
];

// ─── Config ───────────────────────────────────────────────────────────────────

const ART_CATEGORIES = ["All", "Photography", "Digital Art"];

const TABS = [
  { id: "writing", label: "Writing", glyph: "✦" },
  { id: "artwork", label: "Artwork", glyph: "◎" },
];

// ─── Writing ──────────────────────────────────────────────────────────────────

function WritingTab() {
  return (
    <div>
      <div className="divide-y" style={{ borderColor: "var(--p-divide)" }}>
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="py-7 group cursor-pointer transition-colors duration-200 rounded-sm -mx-4 px-4"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--p-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            onClick={() => window.open(post.link, "_blank")}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:gap-8">
              {/* Meta */}
              <div className="shrink-0 sm:w-40">
                <p style={{ fontSize: "0.72rem", color: "var(--p-fg-35)" }}>
                  {post.date}
                </p>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--p-fg-25)",
                    marginTop: 3,
                  }}
                >
                  {post.readTime}
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className="mb-2 transition-opacity duration-200 group-hover:opacity-50"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    letterSpacing: "-0.015em",
                    color: "var(--p-fg)",
                    lineHeight: 1.4,
                  }}
                >
                  {post.title}
                </h3>
                <p
                  className="mb-4"
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.75,
                    color: "var(--p-fg-45)",
                  }}
                >
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5"
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.04em",
                        border: `1px solid ${ACCENT}30`,
                        color: ACCENT,
                        backgroundColor: ACCENT + "0A",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
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
      </div>
    </div>
  );
}

// ─── Artwork ──────────────────────────────────────────────────────────────────

function ArtworkTab() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<(typeof ARTWORK)[0] | null>(null);

  const visible = ARTWORK.filter(
    (a) => activeCategory === "All" || a.category === activeCategory
  );

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {ART_CATEGORIES.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 border transition-all duration-200"
              style={{
                fontSize: "0.75rem",
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

      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
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
              className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
              }}
            >
              <p
                className="text-white"
                style={{ fontSize: "0.82rem", fontWeight: 500 }}
              >
                {piece.title}
              </p>
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {piece.category} · {piece.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
          style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full object-cover"
              style={{ maxHeight: "80vh" }}
            />
            <div className="flex items-center justify-between mt-4">
              <div>
                <p
                  className="text-white"
                  style={{ fontSize: "0.92rem", fontWeight: 500 }}
                >
                  {lightbox.title}
                </p>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: 3,
                  }}
                >
                  {lightbox.category} · {lightbox.year}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="text-white/40 hover:text-white transition-colors"
                style={{ fontSize: "1.5rem", lineHeight: 1, padding: "0 6px" }}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("writing");

  return (
    <main
      className="min-h-screen"
      style={{ fontFamily: "'Inter', sans-serif", paddingTop: "4rem" }}
    >
      {/* Hero strip */}
      <div
        className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto"
        style={{ borderBottom: "1px solid var(--p-divide)" }}
      >
        <span
          className="tracking-widest uppercase block mb-6"
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.15em",
            color: "var(--p-fg-35)",
          }}
        >
          Playground
        </span>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--p-fg)",
            maxWidth: "680px",
          }}
        >
          Writing, artwork &{" "}
          <span style={{ color: CORAL }}>half-formed thoughts.</span>
        </h1>
        <p
          className="mt-5 max-w-xl"
          style={{
            fontSize: "0.92rem",
            lineHeight: 1.8,
            color: "var(--p-fg-45)",
          }}
        >
          A space for things that don't fit neatly into a portfolio — essays,
          photos, ideas, quotes, and observations collected over time.
        </p>
      </div>

      {/* Tab nav + content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Tab bar */}
        <div
          className="flex gap-0 sticky top-16 z-10"
          style={{
            borderBottom: "1px solid var(--p-divide)",
            backgroundColor: "var(--p-bg)",
          }}
        >
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-2 px-1 py-5 mr-10 transition-colors duration-150"
                style={{
                  color: active ? "var(--p-fg)" : "var(--p-fg-35)",
                  background: "none",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    e.currentTarget.style.color = "var(--p-fg-65)";
                }}
                onMouseLeave={(e) => {
                  if (!active)
                    e.currentTarget.style.color = "var(--p-fg-35)";
                }}
              >
                <span style={{ fontSize: "0.78rem" }}>{tab.glyph}</span>
                <span
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {tab.label}
                </span>
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ backgroundColor: ACCENT }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="py-12 pb-28">
          {activeTab === "writing" && <WritingTab />}
          {activeTab === "artwork" && <ArtworkTab />}
        </div>
      </div>
    </main>
  );
}