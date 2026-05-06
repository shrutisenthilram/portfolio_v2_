import { useState, useEffect } from "react";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

const albums = [
  {
    title: "Hurry Up Tomorrow",
    artist: "The Weeknd",
    year: 2025,
    art: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
    genre: "Alt R&B",
  },
  {
    title: "After Hours",
    artist: "The Weeknd",
    year: 2020,
    art: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80",
    genre: "Synthpop",
  },
  {
    title: "Dawn FM",
    artist: "The Weeknd",
    year: 2022,
    art: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=400&q=80",
    genre: "Pop",
  },
  {
    title: "Starboy",
    artist: "The Weeknd",
    year: 2016,
    art: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=400&q=80",
    genre: "R&B",
  },
  {
    title: "Malcolm Todd",
    artist: "Malcolm Todd",
    year: 2025,
    art: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80",
    genre: "Alternative R&B",
  },
  {
    title: "Malcolm Todd (still)",
    artist: "Malcolm Todd",
    year: 2025,
    art: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=400&q=80",
    genre: "Indie Pop",
  },
  {
    title: "Sweet Boy",
    artist: "Malcolm Todd",
    year: 2024,
    art: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=400&q=80",
    genre: "Alt Pop",
  },
  {
    title: "Shower Shoes",
    artist: "Malcolm Todd",
    year: 2023,
    art: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=400&q=80",
    genre: "Bedroom Pop",
  },
];

const YEARS = ["All", "2025", "2024", "2023", "2022", "2020", "2016"];

const BARS = [3, 5, 8, 6, 4, 7, 5, 3, 6, 8, 4, 5];

function VinylPlayer({ album }: { album: typeof albums[0] }) {
  const [angle, setAngle] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAngle((a) => (a + 1.2) % 360);
      setTick((t) => t + 1);
    }, 30);
    return () => clearInterval(id);
  }, []);

  // Waveform bars oscillate
  const barHeight = (i: number) => {
    const base = BARS[i % BARS.length];
    return base + Math.sin(tick * 0.12 + i * 0.7) * 3;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 md:gap-12">
      {/* Vinyl record */}
      <div
        style={{
          position: "relative",
          width: 160,
          height: 160,
          flexShrink: 0,
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT}18 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        {/* Spinning disc */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: `
              radial-gradient(circle at 50% 50%,
                #1a1a1a 0%,
                #111 28%,
                #222 30%,
                #111 32%,
                #1d1d1d 50%,
                #111 52%,
                #1a1a1a 100%
              )
            `,
            transform: `rotate(${angle}deg)`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)`,
            position: "relative",
          }}
        >
          {/* Grooves (decorative rings) */}
          {[38, 46, 54, 62, 70].map((r) => (
            <div
              key={r}
              style={{
                position: "absolute",
                top: `${50 - r / 2}%`,
                left: `${50 - r / 2}%`,
                width: `${r}%`,
                height: `${r}%`,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.04)",
                pointerEvents: "none",
              }}
            />
          ))}
        </div>

        {/* Album art center label */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 62,
            height: 62,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.12)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
          }}
        >
          <img
            src={album.art}
            alt={album.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Center hole dot */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#111",
            border: "1px solid rgba(255,255,255,0.2)",
            zIndex: 2,
          }}
        />
      </div>

      {/* Track info + waveform */}
      <div style={{ minWidth: 0 }}>
        {/* Now playing label */}
        <div className="flex items-center gap-2 mb-3">
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14 }}>
            {BARS.slice(0, 5).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 2,
                  height: `${barHeight(i)}px`,
                  backgroundColor: CORAL,
                  borderRadius: 1,
                  transition: "height 0.05s ease",
                  opacity: 0.9,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: CORAL,
              fontWeight: 500,
            }}
          >
            Now Playing
          </span>
        </div>

        <p
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "var(--p-fg)",
            lineHeight: 1.2,
            marginBottom: 4,
          }}
        >
          {album.title}
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--p-fg-45)", marginBottom: 16 }}>
          {album.artist}
        </p>

        <span
          style={{
            display: "inline-block",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: ACCENT,
            backgroundColor: ACCENT + "12",
            border: `1px solid ${ACCENT}25`,
            padding: "2px 8px",
          }}
        >
          {album.genre}
        </span>

        {/* Waveform visualizer */}
        <div
          className="mt-6 flex items-end gap-0.5"
          style={{ height: 28 }}
        >
          {BARS.map((_, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: `${barHeight(i)}px`,
                backgroundColor: i < 7 ? ACCENT : "var(--p-fg-12)",
                borderRadius: 1.5,
                transition: "height 0.05s ease",
              }}
            />
          ))}
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              backgroundColor: ACCENT,
              alignSelf: "flex-end",
              marginLeft: 2,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 4,
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "calc(12 * 3px + 11 * 2px + 10px)",
          }}
        >
          <span style={{ fontSize: "0.6rem", color: "var(--p-fg-25)" }}>1:47</span>
          <span style={{ fontSize: "0.6rem", color: "var(--p-fg-25)" }}>4:12</span>
        </div>
      </div>
    </div>
  );
}

export function MusicSection() {
  const [activeYear, setActiveYear] = useState("All");
  const [nowPlaying, setNowPlaying] = useState(albums[0]);

  const filtered =
    activeYear === "All"
      ? albums
      : albums.filter((a) => String(a.year) === activeYear);

  return (
    <section
      style={{
        fontFamily: "'Inter', sans-serif",
        borderTop: "1px solid var(--p-divide)",
        paddingTop: "3.5rem",
      }}
      className="px-6 md:px-12 max-w-6xl mx-auto pb-10"
    >
      {/* Section label */}
      <span
        className="tracking-widest uppercase block mb-9 pb-5"
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.15em",
          color: "var(--p-fg-35)",
          borderBottom: "1px solid var(--p-divide)",
        }}
      >
        Music
      </span>

      {/* Currently listening + album list side by side */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Left: vinyl player — takes up most of the space */}
        <div className="flex-1 min-w-0 w-full">
          <h2
            className="mb-6 md:mb-8"
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "var(--p-fg)",
            }}
          >
            Currently Listening To
          </h2>
          <VinylPlayer album={nowPlaying} />
        </div>

        {/* Right: vertical album list */}
        <div className="w-full md:w-[220px] md:flex-shrink-0">
          {/* Year filter */}
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--p-fg-35)",
                marginRight: 2,
              }}
            >
              ★ Favourites
            </span>
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: activeYear === y ? 500 : 400,
                  color: activeYear === y ? ACCENT : "var(--p-fg-35)",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: activeYear === y ? `1px solid ${ACCENT}` : "1px solid transparent",
                  background: "none",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  padding: "2px 4px",
                }}
              >
                {y}
                {y !== "All" && (
                  <span style={{ marginLeft: 3, color: "var(--p-fg-25)", fontSize: "0.65rem" }}>
                    ({albums.filter((a) => String(a.year) === y).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Vertical album rows */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              maxHeight: 340,
              overflowY: "auto",
            }}
          >
            {filtered.map((album) => {
              const active = nowPlaying.title === album.title;
              return (
                <button
                  key={album.title}
                  onClick={() => setNowPlaying(album)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 8px",
                    background: active ? ACCENT + "0E" : "none",
                    border: active ? `1px solid ${ACCENT}30` : "1px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "var(--p-surface)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "none";
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ width: 40, height: 40, flexShrink: 0, position: "relative" }}>
                    <img
                      src={album.art}
                      alt={album.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: active ? "none" : "grayscale(30%)",
                        transition: "filter 0.3s",
                      }}
                    />
                    {active && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(0,0,0,0.35)",
                        }}
                      >
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderStyle: "solid",
                            borderWidth: "4px 0 4px 7px",
                            borderColor: `transparent transparent transparent ${CORAL}`,
                            marginLeft: 2,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: active ? ACCENT : "var(--p-fg-65)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        transition: "color 0.2s",
                        lineHeight: 1.3,
                      }}
                    >
                      {album.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.65rem",
                        color: "var(--p-fg-35)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {album.artist}
                    </p>
                    <p style={{ fontSize: "0.6rem", color: "var(--p-fg-25)", marginTop: 1 }}>
                      {album.year} · {album.genre}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}