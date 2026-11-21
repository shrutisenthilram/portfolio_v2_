// ─────────────────────────────────────────────────────────────────────────────
// ProjectPage
// The standard case-study page for any project defined in
// src/content/projects/<slug>.json (edit them in /admin while running locally).
//
// A section renders only when it has content, and the numbering adjusts
// automatically, so a half-finished project never shows blanks or placeholders.
// Same template for every project keeps the whole portfolio consistent.
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ContentProject } from "../../../content/types";
import { PROJECT_KINDS } from "../../../content/types";
import { CaseSection } from "../case-study/Section";
import {
  BodyText,
  BulletList,
  NumberedList,
  StatGrid,
  TagList,
} from "../case-study/primitives";
import { FooterNav } from "../case-study/CaseStudyShell";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getTagColor } from "../../data/tagColors";

const ACCENT = "#B65670";
const CORAL = "#557A63";

type NavProject = { slug: string; title: string; subtitle: string } | null;

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <BodyText key={i}>{p}</BodyText>
        ))}
    </div>
  );
}

const nonEmpty = (s?: string) => Boolean(s && s.trim());
const nonEmptyList = (l?: unknown[]) => Boolean(l && l.length > 0);

type SectionSpec = { id: string; label: string; show: boolean; body: ReactNode };

export function ProjectPage({
  project,
  prev,
  next,
}: {
  project: ContentProject;
  prev?: NavProject;
  next?: NavProject;
}) {
  const kindLabel = PROJECT_KINDS.find((k) => k.value === project.kind)?.label ?? "";
  const links = (project.links ?? []).filter((l) => nonEmpty(l.href));
  const media = (project.media ?? []).filter((m) => nonEmpty(m.src));
  const isDraft = project.status === "draft";

  const meta: { k: string; v: string }[] = [
    { k: "Role", v: project.role },
    { k: "Timeline", v: project.timeline ?? "" },
    { k: "Team", v: project.team ?? "" },
    { k: "Stack", v: (project.stack ?? []).join(", ") },
    { k: "Result", v: project.headlineResult ?? "" },
  ].filter((m) => nonEmpty(m.v));

  const sections: SectionSpec[] = [
    {
      id: "problem",
      label: "Problem",
      show: nonEmpty(project.problem),
      body: <Paragraphs text={project.problem ?? ""} />,
    },
    {
      id: "users",
      label: "Who it's for",
      show: nonEmpty(project.users),
      body: <Paragraphs text={project.users ?? ""} />,
    },
    {
      id: "goals",
      label: "Goals",
      show: nonEmptyList(project.goals),
      body: <BulletList items={project.goals ?? []} />,
    },
    {
      id: "metrics",
      label: "Success metrics",
      show: nonEmptyList(project.metrics),
      body: <StatGrid items={project.metrics ?? []} />,
    },
    {
      id: "decisions",
      label: "Decisions & trade-offs",
      show: nonEmptyList(project.decisions),
      body: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(project.decisions ?? []).map((d) => (
            <div
              key={d.title}
              className="p-5"
              style={{ border: "1px solid var(--p-divide)" }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--p-fg)" }}>
                  {d.title}
                </h3>
                {d.outcome && (
                  <span
                    className="shrink-0 px-2 py-0.5 uppercase"
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.1em",
                      color: ACCENT,
                      border: `1px solid ${ACCENT}40`,
                    }}
                  >
                    {d.outcome}
                  </span>
                )}
              </div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--p-fg-65)" }}>
                {d.body}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "solution",
      label: "Solution",
      show: nonEmpty(project.solution),
      body: <Paragraphs text={project.solution ?? ""} />,
    },
    {
      id: "build",
      label: "How it was built",
      show: nonEmpty(project.build),
      body: (
        <div className="space-y-5">
          <Paragraphs text={project.build ?? ""} />
          {nonEmptyList(project.stack) && <TagList items={project.stack ?? []} />}
        </div>
      ),
    },
    {
      id: "screens",
      label: "Screens & visuals",
      show: media.length > 0,
      body: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {media.map((m) => (
            <figure key={m.src}>
              <ImageWithFallback
                src={m.src}
                alt={m.alt ?? m.caption ?? ""}
                className="w-full h-auto"
                style={{ border: "1px solid var(--p-divide)", display: "block" }}
              />
              {m.caption && (
                <figcaption
                  className="mt-2"
                  style={{ fontSize: "0.78rem", color: "var(--p-fg-45)" }}
                >
                  {m.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ),
    },
    {
      id: "results",
      label: "Results",
      show: nonEmptyList(project.results),
      body: <NumberedList items={project.results ?? []} />,
    },
    {
      id: "reflection",
      label: "Reflection",
      show: nonEmpty(project.reflection),
      body: <Paragraphs text={project.reflection ?? ""} />,
    },
    {
      id: "next",
      label: "What's next",
      show: nonEmptyList(project.nextSteps),
      body: <BulletList items={project.nextSteps ?? []} />,
    },
  ];

  const visible = sections.filter((s) => s.show);

  return (
    <article style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-[860px] mx-auto px-6 md:px-10 lg:px-14 pt-28 md:pt-32">
        {isDraft && (
          <div
            className="mb-8 px-4 py-3"
            style={{
              border: `1px dashed ${CORAL}`,
              color: CORAL,
              fontSize: "0.8rem",
              lineHeight: 1.6,
            }}
          >
            <strong>Draft preview.</strong> This page is only visible while you run the
            site locally. Set its status to Published in /admin to make it public.
          </div>
        )}

        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 mb-10 transition-colors duration-200"
          style={{ fontSize: "0.78rem", color: "var(--p-fg-45)" }}
        >
          <ArrowLeft size={13} /> All projects
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span
            className="uppercase"
            style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--p-fg-45)" }}
          >
            {kindLabel} · {project.year}
          </span>
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5"
              style={{
                fontSize: "0.65rem",
                color: getTagColor(t),
                border: `1px solid ${getTagColor(t)}40`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <h1
          className="mb-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            color: "var(--p-fg)",
          }}
        >
          {project.title}
        </h1>
        <p
          className="max-w-xl mb-8"
          style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--p-fg-65)" }}
        >
          {project.summary}
        </p>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-10">
            {links.map((l) => (
              <a
                key={l.label + l.href}
                href={l.href}
                {...(/^https?:/.test(l.href)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-1.5 px-4 py-2 transition-colors duration-200"
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "var(--p-fg)",
                  border: "1px solid var(--p-fg-18)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = CORAL)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--p-fg-18)")
                }
              >
                {l.label} <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        )}

        {project.image && nonEmpty(project.image) && (
          <ImageWithFallback
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-auto mb-10"
            style={{ border: "1px solid var(--p-divide)", display: "block" }}
          />
        )}

        {meta.length > 0 && (
          <dl
            className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 py-6 mb-4"
            style={{
              borderTop: "1px solid var(--p-divide)",
              borderBottom: "1px solid var(--p-divide)",
            }}
          >
            {meta.map((m) => (
              <div key={m.k} className={m.k === "Result" ? "col-span-2" : ""}>
                <dt
                  className="uppercase mb-1"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--p-fg-45)" }}
                >
                  {m.k}
                </dt>
                <dd style={{ fontSize: "0.88rem", lineHeight: 1.5, color: "var(--p-fg)" }}>
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {visible.map((s, i) => (
          <CaseSection
            key={s.id}
            id={s.id}
            number={String(i + 1).padStart(2, "0")}
            label={s.label}
          >
            {s.body}
          </CaseSection>
        ))}

        {visible.length === 0 && (
          <p
            className="py-16"
            style={{ fontSize: "0.9rem", color: "var(--p-fg-45)", lineHeight: 1.7 }}
          >
            The write-up for this project is still being written. Check back soon.
          </p>
        )}
      </div>

      <FooterNav prev={prev} next={next} />
    </article>
  );
}
