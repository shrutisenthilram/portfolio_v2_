import { SectionHeader, RationaleCard } from "./PhoneFrame";

const COLORS = [
  { name: "Teal Primary", hex: "#4D9E8C", role: "CTA, key actions, active states" },
  { name: "Teal Dark", hex: "#3A7D6E", role: "Hover, pressed states" },
  { name: "Teal Light", hex: "#E6F4F1", role: "Backgrounds, tinted areas" },
  { name: "Warm White", hex: "#FAFAF8", role: "Screen backgrounds" },
  { name: "Surface", hex: "#FFFFFF", role: "Cards, elevated content" },
  { name: "Text Primary", hex: "#1C1C1E", role: "Headlines, body copy" },
  { name: "Text Secondary", hex: "#6B6B7A", role: "Subtitles, metadata" },
  { name: "Text Tertiary", hex: "#AEAEB2", role: "Placeholder, disabled" },
  { name: "Border", hex: "#E5E5EA", role: "Dividers, card edges" },
  { name: "Success", hex: "#68C47F", role: "Confirmed, completed" },
  { name: "Warning Amber", hex: "#F0B45A", role: "Refill low, attention" },
  { name: "Calm Red", hex: "#E5716A", role: "Overdue (not alarming)" },
  { name: "Purple", hex: "#8B7EC8", role: "Family, social actions" },
  { name: "Slate", hex: "#EEEAE3", role: "Neutral backgrounds" },
];

const TYPOGRAPHY = [
  { name: "Display", size: "28px", weight: "500", use: "Screen titles, hero headings" },
  { name: "Title 1", size: "22px", weight: "500", use: "Section headers, patient names" },
  { name: "Title 2", size: "18px", weight: "500", use: "Card titles, medication names" },
  { name: "Headline", size: "15px", weight: "500", use: "List items, buttons" },
  { name: "Body", size: "15px", weight: "400", use: "Body copy, descriptions" },
  { name: "Callout", size: "13px", weight: "400", use: "Timestamps, secondary info" },
  { name: "Caption", size: "11px", weight: "500", use: "Labels, tags, badges" },
  { name: "Footnote", size: "10px", weight: "400", use: "Legal, accessibility notes" },
];

const SPACING = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];

const COMPONENTS = [
  {
    name: "Primary Button",
    desc: "56px height · Full width · Teal fill · 14px corner radius",
    preview: (
      <div style={{
        height: 56, borderRadius: 14, background: "#4D9E8C",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(77,158,140,0.3)",
      }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Confirm Given</span>
      </div>
    ),
  },
  {
    name: "Secondary Button",
    desc: "52px height · Full width · Teal border · ghost style",
    preview: (
      <div style={{
        height: 52, borderRadius: 14, border: "1.5px solid #4D9E8C",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: "#4D9E8C" }}>View History</span>
      </div>
    ),
  },
  {
    name: "Medication Card",
    desc: "White card · 16px radius · Soft shadow · Status dot",
    preview: (
      <div style={{
        background: "#FFFFFF", borderRadius: 16, padding: "14px 16px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#68C47F", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>Lisinopril 10mg</div>
          <div style={{ fontSize: 12, color: "#8E8E93", marginTop: 1 }}>8:00 AM · Oral</div>
        </div>
        <div style={{ background: "#E8F8ED", borderRadius: 8, padding: "3px 8px" }}>
          <span style={{ fontSize: 11, color: "#4CAF70", fontWeight: 500 }}>Given</span>
        </div>
      </div>
    ),
  },
  {
    name: "Status Badge",
    desc: "Pill shape · 8px vertical · Semantic color fill",
    preview: (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[
          { label: "Given", bg: "#E8F8ED", color: "#4CAF70" },
          { label: "Upcoming", bg: "#EEF0F8", color: "#6B7AB8" },
          { label: "Low Supply", bg: "#FEF4E2", color: "#C88A20" },
          { label: "Overdue", bg: "#FDEEED", color: "#D64040" },
        ].map(b => (
          <div key={b.label} style={{ background: b.bg, borderRadius: 20, padding: "4px 10px" }}>
            <span style={{ fontSize: 11, color: b.color, fontWeight: 500 }}>{b.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "Progress Ring",
    desc: "SVG ring · Teal stroke · Animated fill on load",
    preview: (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="none" stroke="#E5E5EA" strokeWidth="5" />
          <circle cx="32" cy="32" r="26" fill="none" stroke="#4D9E8C" strokeWidth="5"
            strokeDasharray={`${2 * Math.PI * 26 * 0.6} ${2 * Math.PI * 26 * 0.4}`}
            strokeLinecap="round" transform="rotate(-90 32 32)" />
          <text x="32" y="36" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1C1C1E">3/5</text>
        </svg>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>Today's Progress</div>
          <div style={{ fontSize: 12, color: "#8E8E93" }}>3 of 5 medications given</div>
        </div>
      </div>
    ),
  },
  {
    name: "Family Avatar",
    desc: "40px circle · Initials fallback · Online dot · Soft border",
    preview: (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {[
          { init: "SL", color: "#4D9E8C", online: true },
          { init: "MJ", color: "#8B7EC8", online: false },
          { init: "EK", color: "#F0B45A", online: true },
        ].map((a) => (
          <div key={a.init} style={{ position: "relative" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", background: a.color + "22",
              border: `2px solid ${a.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: a.color }}>{a.init}</span>
            </div>
            {a.online && <div style={{
              position: "absolute", bottom: 1, right: 1,
              width: 9, height: 9, borderRadius: "50%", background: "#68C47F",
              border: "2px solid white",
            }} />}
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "Input Field",
    desc: "52px height · Rounded 12px · Focus teal border ring",
    preview: (
      <div style={{
        height: 52, borderRadius: 12, background: "#F3F3F5", border: "1.5px solid #E5E5EA",
        display: "flex", alignItems: "center", paddingLeft: 16, gap: 10,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AEAEB2" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <span style={{ fontSize: 15, color: "#AEAEB2" }}>Search medications...</span>
      </div>
    ),
  },
  {
    name: "Toast Notification",
    desc: "Bottom-anchored · Calm copy · 3s auto-dismiss · No alarm color",
    preview: (
      <div style={{
        background: "#1C1C1E", borderRadius: 14, padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#68C47F", flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: "#FFFFFF" }}>Lisinopril confirmed at 8:14 AM</span>
      </div>
    ),
  },
];

const PRINCIPLES = [
  {
    title: "Calm over complete",
    icon: "◐",
    body: "Show only what the caregiver needs right now. Suppress historical clutter. Surface completeness in status, not lists.",
    color: "#4D9E8C",
  },
  {
    title: "Emotional reassurance",
    icon: "♡",
    body: "Use warm language, not clinical. 'Given' not 'Administered'. 'Remind' not 'Alert'. 'Together' not 'Assign'.",
    color: "#8B7EC8",
  },
  {
    title: "Large touch targets",
    icon: "⊕",
    body: "Minimum 44×44pt per Apple HIG. Primary actions are 56pt tall. Destructive actions require confirmation dialogs.",
    color: "#F0B45A",
  },
  {
    title: "Low cognitive load",
    icon: "≡",
    body: "Max 3 actions per screen. Contextual defaults pre-fill decisions. Progressive disclosure hides complexity.",
    color: "#68C47F",
  },
  {
    title: "Ambient family awareness",
    icon: "∿",
    body: "Show who did what without surveillance feeling. Activity feed reads like a group chat, not an audit log.",
    color: "#E5716A",
  },
  {
    title: "Trust through consistency",
    icon: "◇",
    body: "Same card shape, same color semantics, same spacing rhythm across all surfaces. Reliability is a UX feature.",
    color: "#3A7D6E",
  },
];

export function DesignSystemPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1100 }}>
<SectionHeader
        tag="00 — Foundation"
        title="Kin Design System"
        description="A calm-first design system for iOS caregiving. Built on warmth, clarity, and emotional safety. Every decision serves the principle: reduce cognitive load for people in high-stress care situations."
        principle="Calm over complete — show less, mean more"
      />

      {/* Interaction Principles */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E", marginBottom: 16, letterSpacing: "-0.01em" }}>Interaction Principles</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {PRINCIPLES.map(p => (
            <div key={p.title} style={{
              background: "#FFFFFF",
              borderRadius: 12,
              padding: "16px 18px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              borderTop: `3px solid ${p.color}`,
            }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", marginBottom: 5 }}>{p.title}</div>
              <div style={{ fontSize: 11.5, color: "#6B6B7A", lineHeight: 1.6 }}>{p.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E", marginBottom: 16, letterSpacing: "-0.01em" }}>Color Palette</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
          {COLORS.map(c => (
            <div key={c.name} style={{ background: "#FFFFFF", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ height: 52, background: c.hex, position: "relative" }}>
                {c.hex === "#FAFAF8" || c.hex === "#FFFFFF" ? (
                  <div style={{ position: "absolute", inset: 0, border: "1px solid #E5E5EA", borderRadius: "0" }} />
                ) : null}
              </div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#1C1C1E", marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontSize: 9, color: "#AEAEB2", fontFamily: "monospace", marginBottom: 3 }}>{c.hex}</div>
                <div style={{ fontSize: 9, color: "#8E8E93", lineHeight: 1.4 }}>{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E", marginBottom: 16, letterSpacing: "-0.01em" }}>Typography Scale</h2>
        <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "4px 0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          {TYPOGRAPHY.map((t, i) => (
            <div key={t.name} style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom: i < TYPOGRAPHY.length - 1 ? "1px solid #F2F2F7" : "none",
              gap: 20,
            }}>
              <div style={{ width: 90, flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#1C1C1E" }}>{t.name}</div>
                <div style={{ fontSize: 10, color: "#AEAEB2", fontFamily: "monospace" }}>{t.size} / {t.weight}</div>
              </div>
              <div style={{ flex: 1, fontSize: t.size, fontWeight: t.weight as any, color: "#1C1C1E", letterSpacing: "-0.01em" }}>
                Medication confirmed
              </div>
              <div style={{ fontSize: 11, color: "#8E8E93", maxWidth: 200, textAlign: "right" }}>{t.use}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E", marginBottom: 16, letterSpacing: "-0.01em" }}>Spacing System</h2>
        <div style={{ background: "#FFFFFF", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          {SPACING.map(s => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: s, height: s, background: "#E6F4F1", borderRadius: 3, border: "1px solid #4D9E8C33" }} />
              <div style={{ fontSize: 9, color: "#8E8E93", fontFamily: "monospace" }}>{s}px</div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Library */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E", marginBottom: 16, letterSpacing: "-0.01em" }}>Component Inventory</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {COMPONENTS.map(c => (
            <div key={c.name} style={{
              background: "#FFFFFF",
              borderRadius: 12,
              padding: "16px 18px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E", marginBottom: 3 }}>{c.name}</div>
              <div style={{ fontSize: 10.5, color: "#AEAEB2", marginBottom: 14 }}>{c.desc}</div>
              {c.preview}
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E", marginBottom: 16, letterSpacing: "-0.01em" }}>Accessibility Considerations</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { icon: "👁", title: "WCAG AA Contrast", body: "All text/background combos meet 4.5:1 for body, 3:1 for large text. Verified across all semantic states." },
            { icon: "👆", title: "Touch Targets", body: "44pt minimum per Apple HIG. Primary actions are 56pt. Tap zones extend beyond visible element boundaries." },
            { icon: "📢", title: "VoiceOver Support", body: "All interactive elements have accessibilityLabel. Medication names read with dose and time. Status read on focus." },
            { icon: "🔠", title: "Dynamic Type", body: "All text scales with iOS Dynamic Type. Cards reflow to accommodate up to xxxLarge size. No truncation on critical info." },
            { icon: "🎨", title: "Reduce Motion", body: "All animations honor Reduce Motion preference. Transitions fall back to cross-dissolve. No parallax or spring effects." },
            { icon: "🌙", title: "Dark Mode Ready", body: "Color tokens defined for both light and dark modes. Warm white inverts to warm dark (#1C1A18). No pure black backgrounds." },
          ].map(a => (
            <div key={a.title} style={{ background: "#FFFFFF", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{a.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E", marginBottom: 5 }}>{a.title}</div>
              <div style={{ fontSize: 11, color: "#6B6B7A", lineHeight: 1.6 }}>{a.body}</div>
            </div>
          ))}
        </div>
      </div>

      <RationaleCard items={[
        { label: "Platform", value: "iOS-first, Swift UIKit + SwiftUI hybrid" },
        { label: "Primary User", value: "Adult family caregiver, 30–60 years" },
        { label: "Secondary User", value: "Senior patient, 65+ years" },
        { label: "Design Principle", value: "Calm over complete" },
        { label: "Touch Minimum", value: "44×44pt (Apple HIG)" },
        { label: "Type System", value: "SF Pro Display / SF Pro Text" },
        { label: "Radius System", value: "8 / 12 / 16 / 24px" },
        { label: "Color Mode", value: "Light primary, Dark mode supported" },
      ]} />
    </div>
  );
}
