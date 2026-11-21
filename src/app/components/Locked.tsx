import type { ComponentType } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { LOCKS, SITE } from "../data/site";
import { TinyBloom } from "./FloralArt";

const SAGE = "#557A63";

type Area = keyof typeof LOCKS;

// Locked on the live site. Locally you see everything, unless you add ?locked to the URL.
export function useLocked(area: Area) {
  const { search } = useLocation();
  if (!LOCKS[area]) return false;
  if (import.meta.env.PROD) return true;
  return new URLSearchParams(search).has("locked");
}

const COPY: Record<Area, { label: string; text: string }> = {
  projects: {
    label: "Under construction",
    text: "This section is getting a full rebuild. Case studies, process breakdowns and the details behind each project are on their way. In the meantime, I'd love to walk you through my current work directly.",
  },
  playground: {
    label: "Coming soon",
    text: "The playground is getting a clean-up before it opens. Check back soon, or say hello in the meantime.",
  },
};

// The notice itself: a dashed box with a striped top band, in the site's colours.
export function LockedNotice({ area }: { area: Area }) {
  const { label, text } = COPY[area];
  return (
    <div className="relative" style={{ border: "1px dashed var(--p-fg-18)" }}>
      <div
        aria-hidden="true"
        style={{
          height: 8,
          backgroundImage: `repeating-linear-gradient(135deg, #B65670 0 8px, transparent 8px 16px)`,
          opacity: 0.55,
        }}
      />
      <div className="px-6 md:px-10 py-8 md:py-10">
        <span
          className="inline-flex items-center gap-2 px-2.5 py-1 mb-5 uppercase"
          style={{ border: `1px solid ${SAGE}55`, backgroundColor: `${SAGE}12`, fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.1em", color: "var(--p-sage)" }}
        >
          <TinyBloom size={12} />
          {label}
        </span>
        <p className="max-w-xl mb-6" style={{ fontSize: "0.98rem", lineHeight: 1.8, color: "var(--p-fg-65)" }}>
          {text}
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="inline-flex items-center gap-2 pb-0.5"
          style={{ fontSize: "0.88rem", color: "var(--p-accent)", borderBottom: "1px solid var(--p-accent)" }}
        >
          Get in touch →
        </a>
      </div>
    </div>
  );
}

// A whole page showing the notice (used when a locked route is opened directly).
export function LockedPage({ area, title }: { area: Area; title: string }) {
  return (
    <div className="pt-28 pb-40 px-6 md:px-12 max-w-6xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      <h1
        className="mb-8"
        style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.08, color: "var(--p-fg)" }}
      >
        {title}
      </h1>
      <LockedNotice area={area} />
      <p className="mt-6">
        <Link to="/" style={{ fontSize: "0.85rem", color: "var(--p-accent)" }}>
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

// Wrap a route's page so it shows the notice while its area is locked.
export function guarded(area: Area, title: string, Page: ComponentType) {
  return function Guarded() {
    const locked = useLocked(area);
    return locked ? <LockedPage area={area} title={title} /> : <Page />;
  };
}

// For layout routes that render <Outlet/> (e.g. the Kin prototype).
export function guardedLayout(area: Area, title: string, Layout: ComponentType) {
  return function GuardedLayout() {
    const locked = useLocked(area);
    return locked ? <LockedPage area={area} title={title} /> : <Layout />;
  };
}

export { Outlet };
