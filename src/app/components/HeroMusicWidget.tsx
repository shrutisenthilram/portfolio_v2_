import { useState, useRef } from "react";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

// Edit this. cover and audio are both optional —
// the widget works fine with either or both empty.
const FEATURED = {
  title: "Hurry Up Tomorrow",
  artist: "The Weeknd",
  cover: "", // e.g. "/images/covers/hurry-up-tomorrow.jpg"
  audio: "", // e.g. "/audio/preview.mp3"
};

export function HeroMusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    const a = audioRef.current;
    if (!a || !FEATURED.audio) {
      setIsPlaying((p) => !p);
      return;
    }
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      a.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  // Vinyl always spins. We just change the duration when playing.
  // This sidesteps animationPlayState quirks across browsers.
  const spinDuration = isPlaying ? "3s" : "14s";

  return (
    <div
      className="flex flex-col items-center md:items-end gap-5"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Keyframes — bulletproof injection via dangerouslySetInnerHTML */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes hmw-spin { to { transform: rotate(360deg); } }
            @keyframes hmw-bounce { from { height: 25%; } to { height: 100%; } }
          `,
        }}
      />

      {/* Vinyl */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="relative group cursor-pointer border-0 bg-transparent p-0"
        style={{ width: "min(220px, 55vw)", aspectRatio: "1 / 1" }}
      >
        {/* Spinning disc */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, #2c2c2c 0%, #0a0a0a 60%, #000 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.25)",
            animation: `hmw-spin ${spinDuration} linear infinite`,
          }}
        >
          {/* Concentric grooves */}
          {[0.78, 0.62, 0.5].map((scale, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: `${(1 - scale) * 50}%`,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            />
          ))}

          {/* Center label / album art */}
          <div
            className="absolute rounded-full overflow-hidden"
            style={{
              inset: "30%",
              backgroundColor: ACCENT,
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.6)",
            }}
          >
            {FEATURED.cover && (
              <img
                src={FEATURED.cover}
                alt=""
                className="w-full h-full object-cover"
                draggable={false}
              />
            )}
            {/* Spindle hole */}
            <div
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                width: "8px",
                height: "8px",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#000",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.15)",
              }}
            />
          </div>
        </div>

        {/* Hover overlay with play/pause icon */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
        >
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: "44px",
              height: "44px",
              backgroundColor: ACCENT,
              color: "white",
              boxShadow: `0 4px 16px ${ACCENT}50`,
            }}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                <rect x="2" y="1" width="3.5" height="12" />
                <rect x="8.5" y="1" width="3.5" height="12" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                <path d="M3 1 L12 7 L3 13 Z" />
              </svg>
            )}
          </div>
        </div>
      </button>

      {/* Track info */}
      <div className="text-center md:text-right">
        <div className="flex items-center gap-1.5 justify-center md:justify-end mb-2">
          {/* Equalizer bars */}
          <div className="flex items-end gap-[2px]" style={{ height: "9px" }}>
            {[0.6, 1, 0.4].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "2px",
                  backgroundColor: CORAL,
                  height: isPlaying ? "100%" : `${h * 100}%`,
                  animation: isPlaying
                    ? `hmw-bounce ${0.5 + i * 0.18}s ease-in-out ${i * 0.1}s infinite alternate`
                    : "none",
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: CORAL,
              textTransform: "uppercase",
            }}
          >
            {isPlaying ? "Now Playing" : "Currently Spinning"}
          </span>
        </div>

        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "var(--p-fg)",
            marginBottom: "2px",
            lineHeight: 1.3,
          }}
        >
          {FEATURED.title}
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            fontWeight: 400,
            color: "var(--p-fg-45)",
            marginBottom: "12px",
          }}
        >
          {FEATURED.artist}
        </div>

        <a
          href="#music"
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "var(--p-fg-35)",
            borderBottom: "1px solid var(--p-fg-18)",
            paddingBottom: "2px",
            textTransform: "uppercase",
          }}
        >
          See all →
        </a>
      </div>

      {FEATURED.audio && (
        <audio
          ref={audioRef}
          src={FEATURED.audio}
          preload="none"
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}