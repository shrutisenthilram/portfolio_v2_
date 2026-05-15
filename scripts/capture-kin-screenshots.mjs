/**
 * Captures Kin prototype screenshots into public/images/kin/.
 * Run: npm run dev (in another terminal) then node scripts/capture-kin-screenshots.mjs
 */
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/images/kin");
const BASE = process.env.KIN_CAPTURE_URL ?? "http://127.0.0.1:5173";

/** @type {{ file: string; url: string; selector?: string; fullPage?: boolean }[]} */
const SHOTS = [
  { file: "overview-hero.png", url: "/kin/home", selector: "[data-kin-phone]" },
  { file: "final-home.png", url: "/kin/home", selector: "[data-kin-phone]" },
  { file: "final-refill.png", url: "/kin/refills", selector: "[data-kin-phone]" },
  { file: "final-patient.png", url: "/kin/companion-app", selector: "[data-kin-phone]" },
  { file: "final-family.png", url: "/kin/family-feed", selector: "[data-kin-phone]" },
  { file: "system-tokens.png", url: "/kin", fullPage: true },
  { file: "system-components.png", url: "/kin", fullPage: true },
  { file: "ia-sitemap.png", url: "/kin/nav-map", fullPage: true },
  { file: "flows-setup.png", url: "/kin/onboarding", selector: "[data-kin-phone]" },
  { file: "flows-refill.png", url: "/kin/task-handoff", selector: "[data-kin-phone]" },
  { file: "ideation-sketches.png", url: "/kin/home", fullPage: true },
  { file: "research-affinity.png", url: "/kin/nav-map", fullPage: true },
  { file: "research-journey.png", url: "/kin/nav-map", fullPage: true },
  { file: "research-personas.png", url: "/kin/patient-profile", selector: "[data-kin-phone]" },
  { file: "iteration-switcher-before.png", url: "/kin/home", selector: "[data-kin-phone]" },
  { file: "iteration-switcher-after.png", url: "/kin/home", selector: "[data-kin-phone]" },
  { file: "iteration-urgency-before.png", url: "/kin/refills", selector: "[data-kin-phone]" },
  { file: "iteration-urgency-after.png", url: "/kin/refills", selector: "[data-kin-phone]" },
  { file: "iteration-handoff-before.png", url: "/kin/task-handoff", selector: "[data-kin-phone]" },
  { file: "iteration-handoff-after.png", url: "/kin/task-handoff", selector: "[data-kin-phone]" },
];

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function isServerUp() {
  try {
    const res = await fetch(BASE);
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  const { chromium } = await import("playwright");
  await mkdir(OUT, { recursive: true });

  let needsServer = !(await isServerUp());
  let devProc = null;
  if (needsServer) {
    devProc = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", "5173"], {
      cwd: ROOT,
      stdio: "pipe",
    });
    for (let i = 0; i < 40; i++) {
      if (await isServerUp()) break;
      await wait(500);
    }
    if (!(await isServerUp())) {
      devProc?.kill();
      throw new Error("Dev server did not start on " + BASE);
    }
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  for (const shot of SHOTS) {
    const dest = path.join(OUT, shot.file);
    await page.goto(BASE + shot.url, { waitUntil: "networkidle" });
    await wait(400);
    if (shot.selector) {
      const el = page.locator(shot.selector).first();
      await el.waitFor({ state: "visible", timeout: 15000 });
      await el.screenshot({ path: dest });
    } else {
      await page.screenshot({ path: dest, fullPage: Boolean(shot.fullPage) });
    }
    console.log("wrote", shot.file);
  }

  await browser.close();
  devProc?.kill();
  console.log("Done — images in public/images/kin/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
