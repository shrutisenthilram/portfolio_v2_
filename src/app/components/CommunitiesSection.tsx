import { Instagram } from "lucide-react";

const ACCENT = "#4338CA";
const CORAL = "#F97316";

const communities = [
  {
    name: "ACM @ UCSD",
    role: "Public Relations Director",
    handle: "@acm_ucsd",
    description:
      "ACM",
    color: ACCENT,
    photos: [
      {
        src: "src/images/1K5A9054.JPG",
        caption: "ACM retreat 2026",
        rotate: "-6deg",
      },
      {
        src: "src/images/IMG_1079.JPG",
        caption: "External Team",
        rotate: "6deg",
      },
      
    ],
  },
  {
    name: "Design Co @ UCSD",
    role: "Industry Relations Coordinator and Web Developer",
    handle: "@",
    description:
      "",
    color: ACCENT,
    photos: [
      {
        src: "src/images/523C05F6-FF58-42BD-A82D-536FD77BA086_1_105_c.jpeg",
        caption:"Industry Relations Team",
        rotate: "6deg",
      },
      {
        src: "src/images/E1DB5654-1B17-4F5A-8B2C-0362CE25B66F.jpeg",
        caption: "Design Co Creative Team",
        rotate: "-6deg",
      },
    ],
  },
  // {
  //   name: "CodePath",
  //   role: "Tech Fellow",
  //   handle: "@code",
  //   description:
  //     "",
  //   color: ACCENT,
  //   photos: [
  //     {
  //       src: "https://images.unsplash.com/photo-1770364292936-1800aa621b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMGNsdWIlMjBncm91cCUyMHBob3RvJTIwZXZlbnR8ZW58MXx8fHwxNzczNDIwOTA3fDA&ixlib=rb-4.1.0&q=80&w=600",
  //       caption: "Community kickoff event",
  //       rotate: "-4deg",
  //     },
  //     {
  //       src: "https://images.unsplash.com/photo-1728071733668-dafce955272a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwb3V0ZG9vciUyMGdyb3VwJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3MzQyMDkwOHww&ixlib=rb-4.1.0&q=80&w=600",
  //       caption: "Mentorship circle",
  //       rotate: "3deg",
  //     },
  //   ],
  // },
];

function Polaroid({
  src,
  caption,
  rotate,
}: {
  src: string;
  caption: string;
  rotate: string;
}) {
  return (
    <div
      style={{
        transform: `rotate(${rotate})`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
        flexShrink: 0,
      }}
      className="group/pol"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "rotate(0deg) scale(1.04)";
        (e.currentTarget as HTMLElement).style.zIndex = "10";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = `rotate(${rotate}) scale(1)`;
        (e.currentTarget as HTMLElement).style.zIndex = "auto";
      }}
    >
      <div
        style={{
          backgroundColor: "var(--p-bg)",
          padding: "10px 10px 36px 10px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        <img
          src={src}
          alt={caption}
          style={{
            width: 240,
            height: 190,
            objectFit: "cover",
            display: "block",
            filter: "grayscale(15%)",
            transition: "filter 0.4s ease",
          }}
          className="group-hover/pol:grayscale-0"
        />
        <p
          style={{
            position: "absolute",
            bottom: 6,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: "0.58rem",
            fontStyle: "italic",
            color: "var(--p-fg-35)",
            fontFamily: "'Georgia', serif",
            letterSpacing: "0.01em",
          }}
        >
          {caption}
        </p>
      </div>
    </div>
  );
}

export function CommunitiesSection() {
  return (
    <section
      style={{
        fontFamily: "'Inter', sans-serif",
        borderTop: "1px solid var(--p-divide)",
        paddingTop: "5rem",
      }}
      className="px-6 md:px-12 max-w-6xl mx-auto pb-14"
    >
      {/* Header */}
      <div className="mb-14">
        <span
          className="tracking-widest uppercase block mb-12 pb-6"
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.15em",
            color: "var(--p-fg-35)",
            borderBottom: "1px solid var(--p-divide)",
          }}
        >
          Communities
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end gap-2">
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "var(--p-fg)",
            }}
          >
            My Communities
          </h2>
          <span
            style={{
              fontSize: "0.85rem",
              color: "var(--p-fg-35)",
              fontStyle: "italic",
              marginBottom: 4,
              marginLeft: 4,
            }}
          >
            — the people who make it all worth it ♥
          </span>
        </div>
      </div>

      {/* Community rows */}
      <div className="space-y-16 md:space-y-20">
        {communities.map((community, idx) => (
          <div key={community.name}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Left — club info */}
              <div className="md:col-span-4">
                {/* Club badge */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: community.color + "15",
                      border: `1px solid ${community.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: community.color,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {community.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p
                      style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--p-fg)" }}
                    >
                      {community.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: community.color,
                        fontWeight: 500,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {community.role}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="ml-auto transition-opacity duration-200 hover:opacity-60"
                    style={{ color: "var(--p-fg-35)" }}
                    aria-label="Instagram"
                  >
                    <Instagram size={14} />
                  </a>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: `${community.color}20`,
                    marginBottom: 12,
                  }}
                />

                <p
                  style={{
                    fontSize: "0.82rem",
                    lineHeight: 1.75,
                    color: "var(--p-fg-45)",
                  }}
                >
                  {community.description}
                </p>
              </div>

              {/* Right — scattered polaroids */}
              <div className="md:col-span-8 flex items-start gap-6 overflow-x-auto pb-4">
                {community.photos.map((photo) => (
                  <Polaroid
                    key={photo.caption}
                    src={photo.src}
                    caption={photo.caption}
                    rotate={photo.rotate}
                  />
                ))}
              </div>
            </div>

            {idx < communities.length - 1 && (
              <div
                className="mt-16 md:mt-20"
                style={{
                  height: 1,
                  backgroundImage: `repeating-linear-gradient(90deg, var(--p-divide) 0px, var(--p-divide) 4px, transparent 4px, transparent 10px)`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}