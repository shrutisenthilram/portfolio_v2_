// ─────────────────────────────────────────────────────────────────────────────
// Local-only admin API for the portfolio editor at /admin.
//
// It is a Vite DEV-SERVER plugin (`apply: "serve"`), so it does not exist in
// `npm run build` or on Vercel: there is no live admin to attack. It only
// reads and writes files inside this repo:
//   • src/content/projects/<slug>.json   (project content)
//   • public/uploads/<slug>/<file>        (images and PDFs)
// Edits then go live the normal way: commit and push.
// ─────────────────────────────────────────────────────────────────────────────

import type { Plugin } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PROJECTS_DIR = path.resolve(ROOT, "src/content/projects");
const UPLOAD_DIR = path.resolve(ROOT, "public/uploads");

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FILE_RE = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,100}$/;
const ALLOWED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf"]);
const STATUSES = new Set(["draft", "published"]);
const KINDS = new Set(["product", "teardown", "research", "engineering", "leadership"]);

const MAX_JSON_BYTES = 1_000_000; // 1 MB
const MAX_UPLOAD_BYTES = 15_000_000; // 15 MB

// Canonical key order, so files stay tidy and diffs stay readable.
const KEYS = [
  "slug", "status", "featured", "order", "kind", "title", "subtitle", "summary",
  "tags", "year", "role", "image", "timeline", "team", "stack", "headlineResult",
  "links", "problem", "users", "goals", "metrics", "decisions", "solution",
  "build", "media", "results", "reflection", "nextSteps",
] as const;

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function readBody(req: IncomingMessage, limit: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (c: Buffer) => {
      size += c.length;
      if (size > limit) {
        reject(new HttpError(413, "Request too large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

// Reject anything that is not a same-machine, same-origin request from our own UI.
function guard(req: IncomingMessage) {
  if (req.method !== "POST") throw new HttpError(405, "POST only");
  const host = String(req.headers.host ?? "");
  const hostname = host.replace(/:\d+$/, "").replace(/^\[|\]$/g, "");
  if (!["localhost", "127.0.0.1", "::1"].includes(hostname)) {
    throw new HttpError(403, "Admin is only available on localhost");
  }
  if (req.headers["x-admin-request"] !== "1") {
    throw new HttpError(403, "Missing admin header");
  }
  const origin = req.headers.origin;
  if (origin && new URL(String(origin)).host !== host) {
    throw new HttpError(403, "Cross-origin request blocked");
  }
}

const str = (v: unknown) => (typeof v === "string" ? v : "");
const strList = (v: unknown) =>
  Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];

function sanitize(raw: any) {
  if (!raw || typeof raw !== "object") throw new HttpError(400, "Invalid body");
  const slug = str(raw.slug);
  if (!SLUG_RE.test(slug)) throw new HttpError(400, "Slug must be lowercase letters, numbers and hyphens");
  if (!STATUSES.has(raw.status)) throw new HttpError(400, "Invalid status");
  if (!KINDS.has(raw.kind)) throw new HttpError(400, "Invalid kind");
  if (!str(raw.title).trim()) throw new HttpError(400, "Title is required");

  const out: Record<string, unknown> = {
    slug,
    status: raw.status,
    featured: Boolean(raw.featured),
    order: Number.isFinite(Number(raw.order)) ? Number(raw.order) : 999,
    kind: raw.kind,
    title: str(raw.title),
    subtitle: str(raw.subtitle),
    summary: str(raw.summary),
    tags: strList(raw.tags),
    year: str(raw.year),
    role: str(raw.role),
    image: str(raw.image),
    timeline: str(raw.timeline),
    team: str(raw.team),
    stack: strList(raw.stack),
    headlineResult: str(raw.headlineResult),
    links: (Array.isArray(raw.links) ? raw.links : []).map((l: any) => ({
      label: str(l?.label),
      href: str(l?.href),
    })),
    problem: str(raw.problem),
    users: str(raw.users),
    goals: strList(raw.goals),
    metrics: (Array.isArray(raw.metrics) ? raw.metrics : []).map((m: any) => ({
      value: str(m?.value),
      label: str(m?.label),
    })),
    decisions: (Array.isArray(raw.decisions) ? raw.decisions : []).map((d: any) => ({
      title: str(d?.title),
      body: str(d?.body),
      outcome: str(d?.outcome),
    })),
    solution: str(raw.solution),
    build: str(raw.build),
    media: (Array.isArray(raw.media) ? raw.media : []).map((m: any) => ({
      src: str(m?.src),
      caption: str(m?.caption),
      alt: str(m?.alt),
    })),
    results: strList(raw.results),
    reflection: str(raw.reflection),
    nextSteps: strList(raw.nextSteps),
  };

  const ordered: Record<string, unknown> = {};
  for (const k of KEYS) ordered[k] = out[k];
  return ordered;
}

function insideDir(dir: string, target: string) {
  return target.startsWith(dir + path.sep);
}

async function handle(req: IncomingMessage, res: ServerResponse) {
  guard(req);
  const url = new URL(req.url ?? "", "http://localhost");

  if (url.pathname === "/__admin/save-project") {
    const body = JSON.parse((await readBody(req, MAX_JSON_BYTES)).toString("utf8"));
    const data = sanitize(body);
    const file = path.resolve(PROJECTS_DIR, `${data.slug}.json`);
    if (!insideDir(PROJECTS_DIR, file)) throw new HttpError(400, "Bad path");
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + "\n");
    fs.renameSync(tmp, file);
    return json(res, 200, { ok: true, slug: data.slug });
  }

  if (url.pathname === "/__admin/delete-project") {
    const body = JSON.parse((await readBody(req, 10_000)).toString("utf8"));
    const slug = str(body.slug);
    if (!SLUG_RE.test(slug)) throw new HttpError(400, "Bad slug");
    const file = path.resolve(PROJECTS_DIR, `${slug}.json`);
    if (!insideDir(PROJECTS_DIR, file) || !fs.existsSync(file)) {
      throw new HttpError(404, "Project not found");
    }
    fs.unlinkSync(file);
    return json(res, 200, { ok: true });
  }

  if (url.pathname === "/__admin/upload") {
    const slug = url.searchParams.get("slug") ?? "";
    const name = url.searchParams.get("name") ?? "";
    if (!SLUG_RE.test(slug)) throw new HttpError(400, "Bad slug");
    if (!FILE_RE.test(name) || !ALLOWED_EXT.has(path.extname(name).toLowerCase())) {
      throw new HttpError(400, "Use a png, jpg, webp, gif or pdf file with a simple name");
    }
    const bytes = await readBody(req, MAX_UPLOAD_BYTES);
    if (bytes.length === 0) throw new HttpError(400, "Empty file");
    const dir = path.resolve(UPLOAD_DIR, slug);
    const file = path.resolve(dir, name);
    if (!insideDir(UPLOAD_DIR, file)) throw new HttpError(400, "Bad path");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, bytes);
    return json(res, 200, { ok: true, path: `/uploads/${slug}/${name}` });
  }

  throw new HttpError(404, "Unknown admin route");
}

export function adminApi(): Plugin {
  return {
    name: "portfolio-admin-api",
    apply: "serve", // dev server only. Never part of the production build.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith("/__admin/")) return next();
        handle(req, res).catch((err) => {
          const status = err instanceof HttpError ? err.status : 500;
          const message = err instanceof HttpError ? err.message : "Server error";
          if (!(err instanceof HttpError)) console.error("[admin]", err);
          json(res, status, { ok: false, error: message });
        });
      });
    },
  };
}

// Production builds: replace every draft project file with an empty stub so
// unfinished work is never bundled into the public JavaScript. (The site also
// filters drafts at runtime; this makes sure the content is not even shipped.)
export function stripDraftsFromBuild(): Plugin {
  return {
    name: "portfolio-strip-drafts",
    apply: "build",
    enforce: "pre",
    transform(code, id) {
      const clean = id.split("?")[0].replace(/\\/g, "/");
      if (!/\/src\/content\/projects\/[^/]+\.json$/.test(clean)) return null;
      try {
        const data = JSON.parse(code);
        if (data.status === "published") return null;
        return { code: JSON.stringify({ slug: data.slug, status: "draft" }), map: null };
      } catch {
        return null;
      }
    },
  };
}
