import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  label?: string;
  subtitle?: string;
  scale?: number;
  variant?: "default" | "companion";
}

export function PhoneFrame({ children, label, subtitle, scale = 1, variant = "default" }: PhoneFrameProps) {
  const W = 300;
  const H = 650;

  return (
    <div className="flex flex-col items-center gap-3" style={{ width: W * scale }}>
      {label && (
        <div className="text-center">
          <div style={{ fontSize: 11, fontWeight: 500, color: "#1C1C1E", letterSpacing: "0.01em" }}>{label}</div>
          {subtitle && <div style={{ fontSize: 10, color: "#8E8E93", marginTop: 2 }}>{subtitle}</div>}
        </div>
      )}
      <div
        data-kin-phone
        style={{
        width: W * scale,
        height: H * scale,
        background: "#1C1C1E",
        borderRadius: 44 * scale,
        padding: 3 * scale,
        boxShadow: "0 25px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
        position: "relative",
        flexShrink: 0,
      }}>
        {/* Screen */}
        <div style={{
          width: "100%",
          height: "100%",
          background: variant === "companion" ? "#F0F8F6" : "#FAFAF8",
          borderRadius: 41 * scale,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Status Bar */}
          <div style={{
            height: 44 * scale,
            paddingTop: 14 * scale,
            paddingLeft: 22 * scale,
            paddingRight: 22 * scale,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            position: "relative",
          }}>
            <span style={{ fontSize: 12 * scale, fontWeight: 600, color: "#1C1C1E" }}>9:41</span>
            {/* Dynamic Island */}
            <div style={{
              position: "absolute",
              top: 10 * scale,
              left: "50%",
              transform: "translateX(-50%)",
              width: 110 * scale,
              height: 26 * scale,
              background: "#1C1C1E",
              borderRadius: 20 * scale,
            }} />
            <div style={{ display: "flex", alignItems: "center", gap: 4 * scale }}>
              <svg width={14 * scale} height={10 * scale} viewBox="0 0 14 10" fill="none">
                <rect x="0" y="3" width="2" height="7" rx="0.5" fill="#1C1C1E" />
                <rect x="3" y="2" width="2" height="8" rx="0.5" fill="#1C1C1E" />
                <rect x="6" y="1" width="2" height="9" rx="0.5" fill="#1C1C1E" />
                <rect x="9" y="0" width="2" height="10" rx="0.5" fill="#1C1C1E" />
                <rect x="12" y="0" width="2" height="10" rx="0.5" fill="#1C1C1E" opacity="0.3" />
              </svg>
              <svg width={15 * scale} height={12 * scale} viewBox="0 0 15 12" fill="none">
                <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5.1L14.5 3.8C12.7 1.8 10.2 0.5 7.5 0.5C4.8 0.5 2.3 1.8 0.5 3.8L1.8 5.1C3.2 3.5 5.2 2.5 7.5 2.5Z" fill="#1C1C1E" />
                <path d="M7.5 5.5C8.9 5.5 10.2 6.1 11.1 7.1L12.4 5.8C11.1 4.5 9.4 3.7 7.5 3.7C5.6 3.7 3.9 4.5 2.6 5.8L3.9 7.1C4.8 6.1 6.1 5.5 7.5 5.5Z" fill="#1C1C1E" />
                <circle cx="7.5" cy="10" r="1.5" fill="#1C1C1E" />
              </svg>
              <div style={{ fontSize: 12 * scale, fontWeight: 600, color: "#1C1C1E" }}>
                <BatteryIcon scale={scale} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function BatteryIcon({ scale }: { scale: number }) {
  return (
    <svg width={22 * scale} height={11 * scale} viewBox="0 0 22 11" fill="none">
      <rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="#1C1C1E" strokeWidth="1" opacity="0.35" />
      <rect x="2" y="2" width="13" height="7" rx="1.5" fill="#1C1C1E" />
      <path d="M19.5 3.5v4c.8-.4 1.5-1.1 1.5-2s-.7-1.6-1.5-2z" fill="#1C1C1E" opacity="0.4" />
    </svg>
  );
}

// Tab bar component for phone screens
export function TabBar({ active, scale = 1 }: { active: string; scale?: number }) {
  const tabs = [
    { id: "home", label: "Home", icon: "home" },
    { id: "patients", label: "Patients", icon: "user" },
    { id: "family", label: "Family", icon: "users" },
    { id: "refills", label: "Refills", icon: "package" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  return (
    <div style={{
      height: 72 * scale,
      background: "rgba(250,250,248,0.92)",
      backdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(0,0,0,0.08)",
      display: "flex",
      alignItems: "flex-start",
      paddingTop: 8 * scale,
      paddingBottom: 0,
      flexShrink: 0,
    }}>
      {tabs.map(tab => {
        const isActive = tab.id === active;
        return (
          <div key={tab.id} style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3 * scale,
          }}>
            <TabIcon id={tab.icon} isActive={isActive} scale={scale} />
            <span style={{
              fontSize: 9 * scale,
              color: isActive ? "#4D9E8C" : "#AEAEB2",
              fontWeight: isActive ? 500 : 400,
            }}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function TabIcon({ id, isActive, scale }: { id: string; isActive: boolean; scale: number }) {
  const color = isActive ? "#4D9E8C" : "#AEAEB2";
  const s = 20 * scale;

  if (id === "home") return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={isActive ? 2 : 1.5}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>;
  if (id === "user") return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={isActive ? 2 : 1.5}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>;
  if (id === "users") return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={isActive ? 2 : 1.5}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>;
  if (id === "package") return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={isActive ? 2 : 1.5}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>;
  if (id === "settings") return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={isActive ? 2 : 1.5}>
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>;
  return null;
}

// Annotation callout component
interface AnnotationProps {
  number: number;
  title: string;
  body: string;
  color?: string;
}

export function Annotation({ number, title, body, color = "#4D9E8C" }: AnnotationProps) {
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: 10,
      padding: "12px 14px",
      borderLeft: `3px solid ${color}`,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      maxWidth: 220,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <div style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "white" }}>{number}</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#1C1C1E" }}>{title}</span>
      </div>
      <p style={{ fontSize: 10.5, color: "#6B6B7A", lineHeight: 1.5, margin: 0 }}>{body}</p>
    </div>
  );
}

// Section header component
interface SectionHeaderProps {
  tag: string;
  title: string;
  description: string;
  principle?: string;
}

export function SectionHeader({ tag, title, description, principle }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#4D9E8C",
          background: "rgba(77,158,140,0.1)",
          padding: "3px 8px",
          borderRadius: 4,
        }}>{tag}</span>
        <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 600, color: "#1C1C1E", letterSpacing: "-0.02em", margin: "0 0 8px" }}>{title}</h1>
      <p style={{ fontSize: 13, color: "#6B6B7A", lineHeight: 1.6, margin: "0 0 12px", maxWidth: 560 }}>{description}</p>
      {principle && (
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "#F0F8F6",
          border: "1px solid #C8E8E3",
          borderRadius: 8,
          padding: "5px 10px",
        }}>
          <span style={{ fontSize: 10, color: "#4D9E8C" }}>✦</span>
          <span style={{ fontSize: 11, color: "#3A7D6E", fontWeight: 500 }}>{principle}</span>
        </div>
      )}
    </div>
  );
}

// UX Rationale Card
interface RationaleProps {
  items: { label: string; value: string }[];
}

export function RationaleCard({ items }: RationaleProps) {
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: 12,
      padding: "16px 20px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      display: "flex",
      flexWrap: "wrap",
      gap: "16px 32px",
    }}>
      {items.map(({ label, value }) => (
        <div key={label} style={{ minWidth: 160 }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#AEAEB2", marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 12, color: "#1C1C1E", lineHeight: 1.5 }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

// Canvas container
export function Canvas({ children, cols = 3 }: { children: ReactNode; cols?: number }) {
  return (
    <div style={{
      background: "#E8E2DA",
      borderRadius: 16,
      padding: "36px 32px",
      display: "flex",
      flexWrap: "wrap",
      gap: 32,
      alignItems: "flex-start",
      justifyContent: cols === 1 ? "center" : "flex-start",
    }}>
      {children}
    </div>
  );
}

// Flow arrow
export function FlowArrow({ label }: { label?: string }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      alignSelf: "center",
      flexShrink: 0,
      marginTop: -20,
    }}>
      {label && <span style={{ fontSize: 9, color: "#8E8E93", letterSpacing: "0.04em", textAlign: "center", maxWidth: 60 }}>{label}</span>}
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
        <path d="M0 8H24M24 8L18 3M24 8L18 13" stroke="#AEAEB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
