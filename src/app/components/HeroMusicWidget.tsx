const ACCENT = "#4338CA";
const CORAL = "#F97316";

// Static "current favorite" — not live playback data, just a hardcoded pick.
// TODO(personalize): add the album cover image (drop it in /public/images and
// point `cover` at it, e.g. "/images/hurry-up-tomorrow.jpg"). Title/artist can
// be changed too if this isn't the right pick.
const FEATURED = {
  title: "Hurry Up Tomorrow",
  artist: "The Weeknd",
  cover: "", // e.g. "/images/hurry-up-tomorrow.jpg"
};

export function HeroMusicWidget() {
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
          `,
        }}
      />

      {/* Vinyl — purely decorative, slow constant spin, not tied to any playback state */}
      <div
        aria-hidden
        className="relative"
        style={{ width: "min(220px, 55vw)", aspectRatio: "1 / 1" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, #2c2c2c 0%, #0a0a0a 60%, #000 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.25)",
            animation: "hmw-spin 14s linear infinite",
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
                alt={`${FEATURED.title} album cover`}
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
      </div>

      {/* Track info */}
      <div className="text-center md:text-right">
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: CORAL,
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          On Repeat
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
    </div>
  );
}