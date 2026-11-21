// ─────────────────────────────────────────────────────────────────────────────
// /admin: the local-only portfolio editor.
//
// This route is registered ONLY when running `npm run dev` (see routes.tsx) and
// its API only exists in the dev server (admin/api-plugin.ts). It is not part of
// the production build, so nothing about it is exposed on the live site.
//
// Workflow: npm run dev → open /admin → edit → Save → check the preview →
// commit and push → the live site updates.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { contentProjects } from "../../content/projects";
import {
  PROJECT_KINDS,
  type ContentProject,
  type ProjectDecision,
  type ProjectLink,
  type ProjectMedia,
  type ProjectMetric,
} from "../../content/types";

const ACCENT = "#B65670";
const CORAL = "#557A63";

// ── tiny helpers ────────────────────────────────────────────────────────────

async function adminPost(path: string, body: BodyInit, contentType = "application/json") {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": contentType, "x-admin-request": "1" },
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) throw new Error(data.error ?? `Request failed (${res.status})`);
  return data;
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function blankProject(title: string): ContentProject {
  return {
    slug: slugify(title),
    status: "draft",
    featured: false,
    order: 100,
    kind: "product",
    title,
    subtitle: "",
    summary: "",
    tags: [],
    year: String(new Date().getFullYear()),
    role: "",
    image: "",
    timeline: "",
    team: "",
    stack: [],
    headlineResult: "",
    links: [],
    problem: "",
    users: "",
    goals: [],
    metrics: [],
    decisions: [],
    solution: "",
    build: "",
    media: [],
    results: [],
    reflection: "",
    nextSteps: [],
  };
}

// Make sure every field exists so the form never crashes on an older file.
function normalize(p: ContentProject): ContentProject {
  return { ...blankProject(p.title ?? ""), ...p };
}

// ── form building blocks ────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.55rem 0.7rem",
  fontSize: "0.85rem",
  fontFamily: "'Inter', sans-serif",
  color: "var(--p-fg)",
  backgroundColor: "var(--p-bg)",
  border: "1px solid var(--p-fg-18)",
  borderRadius: 4,
  outline: "none",
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="block mb-1"
        style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--p-fg-65)" }}
      >
        {label}
      </span>
      {children}
      {hint && (
        <span className="block mt-1" style={{ fontSize: "0.68rem", color: "var(--p-fg-45)" }}>
          {hint}
        </span>
      )}
    </label>
  );
}

function Text({
  label,
  value,
  onChange,
  hint,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
      )}
    </Field>
  );
}

// One item per line (used for goals, results, next steps).
function Lines({
  label,
  value,
  onChange,
  hint,
  rows = 4,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  hint?: string;
  rows?: number;
}) {
  const [raw, setRaw] = useState(value.join("\n"));
  useEffect(() => setRaw(value.join("\n")), [value.join("\n")]);
  return (
    <Field label={label} hint={hint ?? "One per line"}>
      <textarea
        rows={rows}
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value);
          onChange(e.target.value.split("\n").map((l) => l.trim()).filter(Boolean));
        }}
        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
      />
    </Field>
  );
}

// Comma-separated list (tags, stack).
function Chips({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  hint?: string;
}) {
  const [raw, setRaw] = useState(value.join(", "));
  useEffect(() => setRaw(value.join(", ")), [value.join(",")]);
  return (
    <Field label={label} hint={hint ?? "Separate with commas"}>
      <input
        type="text"
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value);
          onChange(e.target.value.split(",").map((t) => t.trim()).filter(Boolean));
        }}
        style={inputStyle}
      />
    </Field>
  );
}

function Rows<T>({
  label,
  rows,
  onChange,
  make,
  addLabel,
  render,
}: {
  label: string;
  rows: T[];
  onChange: (rows: T[]) => void;
  make: () => T;
  addLabel: string;
  render: (row: T, set: (patch: Partial<T>) => void) => ReactNode;
}) {
  return (
    <div>
      <span
        className="block mb-2"
        style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--p-fg-65)" }}
      >
        {label}
      </span>
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div
            key={i}
            className="p-3 flex gap-3 items-start"
            style={{ border: "1px solid var(--p-divide)", borderRadius: 4 }}
          >
            <div className="flex-1 space-y-2">
              {render(row, (patch) =>
                onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r))),
              )}
            </div>
            <button
              type="button"
              onClick={() => onChange(rows.filter((_, j) => j !== i))}
              aria-label="Remove"
              style={{ fontSize: "0.75rem", color: "var(--p-fg-45)" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...rows, make()])}
        className="mt-3"
        style={{ fontSize: "0.78rem", color: "var(--p-accent)" }}
      >
        + {addLabel}
      </button>
    </div>
  );
}

function Uploader({
  slug,
  onUploaded,
  label = "Upload image or PDF",
}: {
  slug: string;
  onUploaded: (path: string) => void;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <div>
      <label
        className="inline-block cursor-pointer px-3 py-1.5"
        style={{
          fontSize: "0.72rem",
          color: "var(--p-fg)",
          border: "1px solid var(--p-fg-18)",
          borderRadius: 4,
        }}
      >
        {busy ? "Uploading…" : label}
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.webp,.gif,.pdf"
          className="hidden"
          disabled={busy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            setBusy(true);
            setError("");
            try {
              const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+/, "");
              const data = await adminPost(
                `/__admin/upload?slug=${encodeURIComponent(slug)}&name=${encodeURIComponent(safe)}`,
                file,
                "application/octet-stream",
              );
              onUploaded(data.path);
            } catch (err) {
              setError((err as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        />
      </label>
      {error && <span style={{ fontSize: "0.7rem", color: "#dc2626", marginLeft: 8 }}>{error}</span>}
    </div>
  );
}

function Group({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section
      className="py-6"
      style={{ borderTop: "1px solid var(--p-divide)" }}
    >
      <h2 style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--p-fg)" }}>{title}</h2>
      {note && (
        <p className="mt-1 mb-4" style={{ fontSize: "0.75rem", color: "var(--p-fg-45)" }}>
          {note}
        </p>
      )}
      <div className="space-y-4 mt-4">{children}</div>
    </section>
  );
}

// ── the page ────────────────────────────────────────────────────────────────

function AdminInner() {
  const [projects, setProjects] = useState<ContentProject[]>(() =>
    contentProjects.map(normalize),
  );
  const [slug, setSlug] = useState<string>(
    () => window.location.hash.replace("#", "") || contentProjects[0]?.slug || "",
  );
  const [edit, setEdit] = useState<ContentProject | null>(null);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error" | "busy"; text: string } | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const saved = useMemo(() => projects.find((p) => p.slug === slug) ?? null, [projects, slug]);

  // Load the selected project into the editor.
  useEffect(() => {
    setEdit(saved ? structuredClone(saved) : null);
    setDirty(false);
    setStatus(null);
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (slug) window.location.hash = slug;
  }, [slug]);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = (patch: Partial<ContentProject>) => {
    setEdit((e) => (e ? { ...e, ...patch } : e));
    setDirty(true);
  };

  const save = async () => {
    if (!edit) return;
    setStatus({ kind: "busy", text: "Saving…" });
    try {
      await adminPost("/__admin/save-project", JSON.stringify(edit));
      setProjects((list) =>
        list.some((p) => p.slug === edit.slug)
          ? list.map((p) => (p.slug === edit.slug ? edit : p))
          : [...list, edit],
      );
      setDirty(false);
      setStatus({ kind: "ok", text: "Saved to src/content/projects. Commit and push to publish." });
    } catch (err) {
      setStatus({ kind: "error", text: (err as Error).message });
    }
  };

  const remove = async () => {
    if (!edit) return;
    if (!window.confirm(`Delete "${edit.title}"? Its file will be removed (git can restore it if committed).`)) return;
    try {
      await adminPost("/__admin/delete-project", JSON.stringify({ slug: edit.slug }));
      const rest = projects.filter((p) => p.slug !== edit.slug);
      setProjects(rest);
      setSlug(rest[0]?.slug ?? "");
    } catch (err) {
      setStatus({ kind: "error", text: (err as Error).message });
    }
  };

  const create = () => {
    const title = newTitle.trim();
    const s = slugify(title);
    if (!s) return;
    if (projects.some((p) => p.slug === s)) {
      setStatus({ kind: "error", text: "A project with that name already exists." });
      return;
    }
    const fresh = blankProject(title);
    setProjects((list) => [...list, fresh]);
    setNewTitle("");
    setSlug(s);
    setEdit(fresh);
    setDirty(true);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "var(--p-bg)",
        color: "var(--p-fg)",
        minHeight: "100vh",
      }}
    >
      <header
        className="flex flex-wrap items-center justify-between gap-3 px-6 py-3"
        style={{ borderBottom: "1px solid var(--p-divide)" }}
      >
        <div>
          <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>Portfolio admin</span>
          <span style={{ fontSize: "0.72rem", color: CORAL, marginLeft: 10 }}>
            local only · not on the live site
          </span>
        </div>
        <div className="flex gap-5">
          <a href="/admin/playground" style={{ fontSize: "0.78rem", color: "var(--p-accent)" }}>
            Playground admin
          </a>
          <a href="/" style={{ fontSize: "0.78rem", color: "var(--p-accent)" }}>
            ← View site
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-[calc(100vh-49px)]">
        {/* Project list */}
        <aside
          className="p-4 md:p-5"
          style={{ borderRight: "1px solid var(--p-divide)", backgroundColor: "var(--p-surface)" }}
        >
          <div className="space-y-1">
            {projects
              .slice()
              .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
              .map((p) => (
                <button
                  key={p.slug}
                  onClick={() => setSlug(p.slug)}
                  className="w-full text-left px-3 py-2"
                  style={{
                    fontSize: "0.82rem",
                    borderRadius: 4,
                    color: "var(--p-fg)",
                    backgroundColor: p.slug === slug ? "var(--p-hover)" : "transparent",
                    border: `1px solid ${p.slug === slug ? ACCENT + "60" : "transparent"}`,
                  }}
                >
                  <span className="block truncate">{p.title}</span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: p.status === "published" ? "#059669" : CORAL,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {p.status}
                  </span>
                </button>
              ))}
          </div>

          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--p-divide)" }}>
            <Text label="New project" value={newTitle} onChange={setNewTitle} placeholder="Project title" />
            <button
              onClick={create}
              disabled={!slugify(newTitle)}
              className="mt-2 px-3 py-1.5 text-white"
              style={{
                fontSize: "0.75rem",
                borderRadius: 4,
                backgroundColor: slugify(newTitle) ? ACCENT : "var(--p-fg-35)",
              }}
            >
              + Create
            </button>
          </div>

          <p className="mt-6" style={{ fontSize: "0.68rem", lineHeight: 1.6, color: "var(--p-fg-45)" }}>
            Kin, Vote Smart and Design Frontiers use hand-built case studies and are edited in
            code, not here.
          </p>
        </aside>

        {/* Editor */}
        <main className="p-5 md:p-8 max-w-3xl w-full">
          {!edit ? (
            <p style={{ color: "var(--p-fg-45)", fontSize: "0.9rem" }}>
              Pick a project on the left, or create a new one.
            </p>
          ) : (
            <>
              <div
                className="sticky top-0 z-10 flex flex-wrap items-center gap-3 py-3 mb-2"
                style={{ backgroundColor: "var(--p-bg)", borderBottom: "1px solid var(--p-divide)" }}
              >
                <button
                  onClick={save}
                  disabled={!dirty}
                  className="px-4 py-2 text-white"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    borderRadius: 4,
                    backgroundColor: dirty ? ACCENT : "var(--p-fg-35)",
                  }}
                >
                  {dirty ? "Save changes" : "Saved"}
                </button>
                <a
                  href={`/projects/${edit.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.78rem", color: "var(--p-accent)" }}
                >
                  Preview page ↗
                </a>
                <button
                  onClick={remove}
                  className="ml-auto"
                  style={{ fontSize: "0.75rem", color: "#dc2626" }}
                >
                  Delete project
                </button>
                {status && (
                  <p
                    className="w-full"
                    style={{
                      fontSize: "0.75rem",
                      color:
                        status.kind === "error"
                          ? "#dc2626"
                          : status.kind === "ok"
                            ? "#059669"
                            : "var(--p-fg-45)",
                    }}
                  >
                    {status.text}
                  </p>
                )}
              </div>

              <Group
                title="Basics"
                note="Shown on the project card. Drafts are hidden on the live site until you publish."
              >
                <Text label="Title" value={edit.title} onChange={(v) => set({ title: v })} />
                <Text label="Subtitle" value={edit.subtitle} onChange={(v) => set({ subtitle: v })} />
                <Text
                  label="Summary (card text)"
                  value={edit.summary}
                  onChange={(v) => set({ summary: v })}
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Status">
                    <select
                      value={edit.status}
                      onChange={(e) => set({ status: e.target.value as ContentProject["status"] })}
                      style={inputStyle}
                    >
                      <option value="draft">Draft (hidden on live site)</option>
                      <option value="published">Published (public)</option>
                    </select>
                  </Field>
                  <Field label="Type">
                    <select
                      value={edit.kind}
                      onChange={(e) => set({ kind: e.target.value as ContentProject["kind"] })}
                      style={inputStyle}
                    >
                      {PROJECT_KINDS.map((k) => (
                        <option key={k.value} value={k.value}>
                          {k.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Text label="Year" value={edit.year} onChange={(v) => set({ year: v })} />
                  <Field label="Order" hint="Lower = earlier">
                    <input
                      type="number"
                      value={edit.order ?? 100}
                      onChange={(e) => set({ order: Number(e.target.value) })}
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Homepage">
                    <label className="flex items-center gap-2 mt-2" style={{ fontSize: "0.82rem" }}>
                      <input
                        type="checkbox"
                        checked={Boolean(edit.featured)}
                        onChange={(e) => set({ featured: e.target.checked })}
                      />
                      Feature on homepage
                    </label>
                  </Field>
                </div>
                <Text label="Your role" value={edit.role} onChange={(v) => set({ role: v })} />
                <Chips
                  label="Tags"
                  value={edit.tags}
                  onChange={(v) => set({ tags: v })}
                  hint="e.g. Fintech, ML, Product, SWE, Teardown"
                />
                <div className="space-y-2">
                  <Text
                    label="Card image path"
                    value={edit.image ?? ""}
                    onChange={(v) => set({ image: v })}
                    hint="Upload below, or paste a path like /uploads/my-project/card.png"
                  />
                  <Uploader
                    slug={edit.slug}
                    label="Upload card image"
                    onUploaded={(p) => set({ image: p })}
                  />
                </div>
              </Group>

              <Group
                title="Buttons & links"
                note="GitHub, live demo, the CSE poster, a proposal PDF… Links with an empty URL are hidden."
              >
                <Rows<ProjectLink>
                  label="Links"
                  rows={edit.links ?? []}
                  onChange={(links) => set({ links })}
                  make={() => ({ label: "", href: "" })}
                  addLabel="Add link"
                  render={(row, setRow) => (
                    <>
                      <Text label="Label" value={row.label} onChange={(v) => setRow({ label: v })} />
                      <Text label="URL or path" value={row.href} onChange={(v) => setRow({ href: v })} />
                      <Uploader
                        slug={edit.slug}
                        label="Upload a file for this link"
                        onUploaded={(p) => setRow({ href: p })}
                      />
                    </>
                  )}
                />
              </Group>

              <Group title="At a glance" note="The strip under the title. Empty fields are hidden.">
                <div className="grid grid-cols-2 gap-4">
                  <Text label="Timeline" value={edit.timeline ?? ""} onChange={(v) => set({ timeline: v })} />
                  <Text label="Team" value={edit.team ?? ""} onChange={(v) => set({ team: v })} />
                </div>
                <Chips label="Stack / tools" value={edit.stack ?? []} onChange={(v) => set({ stack: v })} />
                <Text
                  label="Headline result"
                  value={edit.headlineResult ?? ""}
                  onChange={(v) => set({ headlineResult: v })}
                  hint="Your single best result, with a real number. Leave blank until you have one."
                />
              </Group>

              <Group
                title="Page content"
                note="Each section appears on the page only when it has content. Leave a field empty to hide it."
              >
                <Text label="Problem" value={edit.problem ?? ""} onChange={(v) => set({ problem: v })} rows={5} hint="Blank line = new paragraph" />
                <Text label="Who it's for" value={edit.users ?? ""} onChange={(v) => set({ users: v })} rows={3} />
                <Lines label="Goals" value={edit.goals ?? []} onChange={(v) => set({ goals: v })} />
                <Rows<ProjectMetric>
                  label="Success metrics (real numbers only)"
                  rows={edit.metrics ?? []}
                  onChange={(metrics) => set({ metrics })}
                  make={() => ({ value: "", label: "" })}
                  addLabel="Add metric"
                  render={(row, setRow) => (
                    <div className="grid grid-cols-2 gap-3">
                      <Text label="Number" value={row.value} onChange={(v) => setRow({ value: v })} placeholder="e.g. 62%" />
                      <Text label="What it measures" value={row.label} onChange={(v) => setRow({ label: v })} />
                    </div>
                  )}
                />
                <Rows<ProjectDecision>
                  label="Decisions & trade-offs"
                  rows={edit.decisions ?? []}
                  onChange={(decisions) => set({ decisions })}
                  make={() => ({ title: "", body: "", outcome: "" })}
                  addLabel="Add decision"
                  render={(row, setRow) => (
                    <>
                      <div className="grid grid-cols-[1fr_140px] gap-3">
                        <Text label="Decision" value={row.title} onChange={(v) => setRow({ title: v })} />
                        <Text label="Outcome" value={row.outcome ?? ""} onChange={(v) => setRow({ outcome: v })} placeholder="Kept / Cut" />
                      </div>
                      <Text label="Why" value={row.body} onChange={(v) => setRow({ body: v })} rows={3} />
                    </>
                  )}
                />
                <Text label="Solution" value={edit.solution ?? ""} onChange={(v) => set({ solution: v })} rows={5} />
                <Text label="How it was built" value={edit.build ?? ""} onChange={(v) => set({ build: v })} rows={5} hint="Architecture, the hard technical problem, trade-offs" />
                <Rows<ProjectMedia>
                  label="Screens & visuals"
                  rows={edit.media ?? []}
                  onChange={(media) => set({ media })}
                  make={() => ({ src: "", caption: "", alt: "" })}
                  addLabel="Add image"
                  render={(row, setRow) => (
                    <>
                      <Text label="Image path" value={row.src} onChange={(v) => setRow({ src: v })} />
                      <Uploader slug={edit.slug} label="Upload image" onUploaded={(p) => setRow({ src: p })} />
                      <Text label="Caption" value={row.caption ?? ""} onChange={(v) => setRow({ caption: v })} />
                      <Text label="Alt text (describe the image)" value={row.alt ?? ""} onChange={(v) => setRow({ alt: v })} />
                    </>
                  )}
                />
                <Lines label="Results" value={edit.results ?? []} onChange={(v) => set({ results: v })} hint="One per line. Real outcomes only." />
                <Text label="Reflection" value={edit.reflection ?? ""} onChange={(v) => set({ reflection: v })} rows={4} />
                <Lines label="What's next" value={edit.nextSteps ?? []} onChange={(v) => set({ nextSteps: v })} />
              </Group>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export function AdminPage() {
  return (
    <ThemeProvider>
      <AdminInner />
    </ThemeProvider>
  );
}
