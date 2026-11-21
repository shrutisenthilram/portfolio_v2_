// ─────────────────────────────────────────────────────────────────────────────
// /admin/playground: the local-only editor for Playground items (experiments, notes,
// "currently into"). Like /admin, it is registered only in `npm run dev` and its API
// only exists in the dev server (admin/api-plugin.ts). Not part of the live site.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { playgroundItems } from "../../content/playground";
import { PLAYGROUND_KINDS, type PlaygroundItem } from "../../content/types";

const CORAL = "#557A63";

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

function blank(title: string): PlaygroundItem {
  return {
    slug: slugify(title),
    status: "draft",
    kind: "experiment",
    order: 100,
    title,
    summary: "",
    body: "",
    date: "",
    link: "",
    linkLabel: "",
    tags: [],
    image: "",
  };
}

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

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-1" style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--p-fg-65)" }}>
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

function Inner() {
  const [items, setItems] = useState<PlaygroundItem[]>(() => playgroundItems.map((i) => ({ ...blank(i.title), ...i })));
  const [slug, setSlug] = useState<string>(() => playgroundItems[0]?.slug ?? "");
  const [edit, setEdit] = useState<PlaygroundItem | null>(null);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error" | "busy"; text: string } | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [tagsRaw, setTagsRaw] = useState("");

  const saved = useMemo(() => items.find((i) => i.slug === slug) ?? null, [items, slug]);

  useEffect(() => {
    setEdit(saved ? structuredClone(saved) : null);
    setTagsRaw((saved?.tags ?? []).join(", "));
    setDirty(false);
    setStatus(null);
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = (patch: Partial<PlaygroundItem>) => {
    setEdit((e) => (e ? { ...e, ...patch } : e));
    setDirty(true);
  };

  const save = async () => {
    if (!edit) return;
    setStatus({ kind: "busy", text: "Saving…" });
    try {
      await adminPost("/__admin/save-playground", JSON.stringify(edit));
      setItems((list) =>
        list.some((i) => i.slug === edit.slug) ? list.map((i) => (i.slug === edit.slug ? edit : i)) : [...list, edit],
      );
      setDirty(false);
      setStatus({ kind: "ok", text: "Saved to src/content/playground. Commit and push to publish." });
    } catch (err) {
      setStatus({ kind: "error", text: (err as Error).message });
    }
  };

  const remove = async () => {
    if (!edit) return;
    if (!window.confirm(`Delete "${edit.title}"? Its file will be removed (git can restore it if committed).`)) return;
    try {
      await adminPost("/__admin/delete-playground", JSON.stringify({ slug: edit.slug }));
      const rest = items.filter((i) => i.slug !== edit.slug);
      setItems(rest);
      setSlug(rest[0]?.slug ?? "");
    } catch (err) {
      setStatus({ kind: "error", text: (err as Error).message });
    }
  };

  const create = () => {
    const title = newTitle.trim();
    const s = slugify(title);
    if (!s) return;
    if (items.some((i) => i.slug === s)) {
      setStatus({ kind: "error", text: "An item with that name already exists." });
      return;
    }
    const fresh = blank(title);
    setItems((list) => [...list, fresh]);
    setNewTitle("");
    setSlug(s);
    setEdit(fresh);
    setTagsRaw("");
    setDirty(true);
  };

  const upload = async (file: File) => {
    if (!edit) return;
    try {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+/, "");
      const data = await adminPost(
        `/__admin/upload?slug=${encodeURIComponent("playground-" + edit.slug)}&name=${encodeURIComponent(safe)}`,
        file,
        "application/octet-stream",
      );
      set({ image: data.path });
    } catch (err) {
      setStatus({ kind: "error", text: (err as Error).message });
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "var(--p-bg)", color: "var(--p-fg)", minHeight: "100vh" }}>
      <header
        className="flex flex-wrap items-center justify-between gap-3 px-6 py-3"
        style={{ borderBottom: "1px solid var(--p-divide)" }}
      >
        <div>
          <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>Playground admin</span>
          <span style={{ fontSize: "0.72rem", color: CORAL, marginLeft: 10 }}>local only · not on the live site</span>
        </div>
        <div className="flex gap-5" style={{ fontSize: "0.78rem" }}>
          <a href="/admin" style={{ color: "var(--p-accent)" }}>
            Projects admin
          </a>
          <a href="/playground" style={{ color: "var(--p-accent)" }}>
            View playground →
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-[calc(100vh-49px)]">
        <aside className="p-4 md:p-5" style={{ borderRight: "1px solid var(--p-divide)", backgroundColor: "var(--p-surface)" }}>
          <div className="space-y-1">
            {items
              .slice()
              .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
              .map((i) => (
                <button
                  key={i.slug}
                  onClick={() => setSlug(i.slug)}
                  className="w-full text-left px-3 py-2"
                  style={{
                    fontSize: "0.82rem",
                    borderRadius: 4,
                    backgroundColor: i.slug === slug ? "var(--p-fg-08)" : "transparent",
                    color: "var(--p-fg)",
                  }}
                >
                  <span className="block">{i.title}</span>
                  <span style={{ fontSize: "0.68rem", color: i.status === "published" ? CORAL : "#8F5B2E" }}>
                    {i.kind} · {i.status}
                  </span>
                </button>
              ))}
          </div>
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--p-divide)" }}>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && create()}
              placeholder="New item title"
              style={inputStyle}
            />
            <button
              onClick={create}
              className="mt-2 px-3 py-1.5 text-white"
              style={{ fontSize: "0.78rem", backgroundColor: "var(--p-accent)", borderRadius: 4 }}
            >
              + Add item
            </button>
          </div>
        </aside>

        <main className="p-5 md:p-8 max-w-3xl">
          {!edit ? (
            <p style={{ fontSize: "0.9rem", color: "var(--p-fg-65)" }}>Pick an item on the left, or add a new one.</p>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Type">
                  <select value={edit.kind} onChange={(e) => set({ kind: e.target.value as PlaygroundItem["kind"] })} style={inputStyle}>
                    {PLAYGROUND_KINDS.map((k) => (
                      <option key={k.value} value={k.value}>
                        {k.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Status" hint="Draft items show only on your computer.">
                  <select value={edit.status} onChange={(e) => set({ status: e.target.value as PlaygroundItem["status"] })} style={inputStyle}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </Field>
                <Field label="Order" hint="Lower numbers come first.">
                  <input
                    type="number"
                    value={edit.order ?? 100}
                    onChange={(e) => set({ order: Number(e.target.value) })}
                    style={inputStyle}
                  />
                </Field>
              </div>

              <Field label="Title">
                <input value={edit.title} onChange={(e) => set({ title: e.target.value })} style={inputStyle} />
              </Field>
              <Field label="Short description" hint="One or two sentences. Leave empty for a simple chip (good for Currently into).">
                <textarea
                  rows={3}
                  value={edit.summary}
                  onChange={(e) => set({ summary: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                />
              </Field>
              {edit.kind === "note" && (
                <Field label="Full text" hint="Blank lines make new paragraphs. Shown under “Read more”.">
                  <textarea
                    rows={10}
                    value={edit.body ?? ""}
                    onChange={(e) => set({ body: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                  />
                </Field>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Date" hint="Optional, e.g. Nov 2026">
                  <input value={edit.date ?? ""} onChange={(e) => set({ date: e.target.value })} style={inputStyle} />
                </Field>
                <Field label="Tags" hint="Comma separated">
                  <input
                    value={tagsRaw}
                    onChange={(e) => {
                      setTagsRaw(e.target.value);
                      set({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) });
                    }}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Link" hint="A demo, repo or post (optional)">
                  <input value={edit.link ?? ""} onChange={(e) => set({ link: e.target.value })} style={inputStyle} />
                </Field>
                <Field label="Link text" hint="e.g. Try it, View code">
                  <input value={edit.linkLabel ?? ""} onChange={(e) => set({ linkLabel: e.target.value })} style={inputStyle} />
                </Field>
              </div>
              <Field label="Image" hint="Optional picture for experiments.">
                <div className="flex items-center gap-3">
                  <input value={edit.image ?? ""} onChange={(e) => set({ image: e.target.value })} style={inputStyle} />
                  <label
                    className="shrink-0 cursor-pointer px-3 py-1.5"
                    style={{ fontSize: "0.72rem", border: "1px solid var(--p-fg-18)", borderRadius: 4 }}
                  >
                    Upload
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp,.gif"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        e.target.value = "";
                        if (f) upload(f);
                      }}
                    />
                  </label>
                </div>
              </Field>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={save}
                  disabled={!dirty}
                  className="px-4 py-2 text-white"
                  style={{ fontSize: "0.82rem", backgroundColor: "var(--p-accent)", borderRadius: 4, opacity: dirty ? 1 : 0.5 }}
                >
                  Save changes
                </button>
                <button
                  onClick={remove}
                  className="px-4 py-2"
                  style={{ fontSize: "0.82rem", color: "#dc2626", border: "1px solid var(--p-fg-18)", borderRadius: 4 }}
                >
                  Delete
                </button>
                {status && (
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: status.kind === "error" ? "#dc2626" : status.kind === "ok" ? CORAL : "var(--p-fg-65)",
                    }}
                  >
                    {status.text}
                  </span>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export function PlaygroundAdmin() {
  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  );
}
