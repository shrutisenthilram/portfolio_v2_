import { PhoneFrame, Annotation, SectionHeader, RationaleCard, Canvas } from "./PhoneFrame";

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{
      width: 44, height: 26, borderRadius: 13,
      background: on ? "#4D9E8C" : "#E5E5EA",
      position: "relative", flexShrink: 0, transition: "background 0.2s",
    }}>
      <div style={{
        position: "absolute",
        top: 3, left: on ? 21 : 3,
        width: 20, height: 20, borderRadius: "50%",
        background: "white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        transition: "left 0.2s",
      }} />
    </div>
  );
}

function NotificationPrefsScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Settings</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: 4 }}>Notifications</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 20 }}>Customize what you hear from Kin</div>

        {/* Quiet hours */}
        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "14px 16px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Quiet Hours</div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>Enable quiet hours</div>
              <div style={{ fontSize: 11, color: "#8E8E93" }}>Pause non-critical alerts</div>
            </div>
            <Toggle on={true} />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: "#F8F8F8", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>From</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#1C1C1E" }}>10:00 PM</div>
            </div>
            <div style={{ flex: 1, background: "#F8F8F8", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Until</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#1C1C1E" }}>7:00 AM</div>
            </div>
          </div>

          <div style={{
            marginTop: 12, background: "#FEF4E2",
            borderRadius: 10, padding: "8px 12px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 12 }}>⚠️</span>
            <span style={{ fontSize: 11, color: "#8A5E00" }}>Critical alerts (missed doses 2+ hours late) always come through</span>
          </div>
        </div>

        {/* Notification types */}
        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "14px 16px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Notification Types</div>

          {[
            { label: "Medication reminders", sub: "15 min before scheduled time", on: true },
            { label: "Dose confirmed by family", sub: "When Michael or Elena confirms", on: true },
            { label: "Refill reminders", sub: "At 14 days and 7 days remaining", on: true },
            { label: "Task handoffs", sub: "When someone hands off to you", on: true },
            { label: "Family notes", sub: "When someone adds a note", on: false },
            { label: "Weekly summary", sub: "Sunday evening care recap", on: false },
          ].map((n, i, arr) => (
            <div key={n.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingBottom: i < arr.length - 1 ? 14 : 0,
              borderBottom: i < arr.length - 1 ? "1px solid #F2F2F7" : "none",
              marginBottom: i < arr.length - 1 ? 14 : 0,
            }}>
              <div style={{ flex: 1, paddingRight: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{n.label}</div>
                <div style={{ fontSize: 11, color: "#8E8E93", marginTop: 2 }}>{n.sub}</div>
              </div>
              <Toggle on={n.on} />
            </div>
          ))}
        </div>

        {/* Per-person */}
        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "14px 16px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Per-Person Alerts</div>

          {[
            { init: "MJ", color: "#8B7EC8", name: "Michael Johnson", status: "All alerts", on: true },
            { init: "EK", color: "#F0B45A", name: "Elena Kim", status: "Confirmations only", on: true },
          ].map(p => (
            <div key={p.init} style={{
              display: "flex", alignItems: "center", gap: 12,
              paddingBottom: 12, borderBottom: "1px solid #F2F2F7", marginBottom: 12,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: p.color + "22",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: p.color }}>{p.init}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "#8E8E93" }}>{p.status}</div>
              </div>
              <Toggle on={p.on} />
            </div>
          ))}
        </div>

        {/* Critical note */}
        <div style={{
          background: "#F0F8F6",
          borderRadius: 12, padding: "12px 14px",
          border: "1px solid #C8E8E3",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#3A7D6E", marginBottom: 4 }}>Critical alerts are always on</div>
          <div style={{ fontSize: 11, color: "#4D9E8C", lineHeight: 1.5 }}>
            Medications overdue by 2+ hours, emergency contacts, and medication interactions are always delivered regardless of quiet hours or toggle settings.
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationPreviewScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Settings</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E", marginBottom: 4, letterSpacing: "-0.01em" }}>Notification Style</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 20 }}>Preview how alerts appear</div>

        {/* Notification previews */}
        <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Preview</div>

        {[
          {
            title: "Medication reminder",
            desc: "Lipitor 20mg for Margaret in 15 minutes",
            time: "11:45 AM",
            type: "reminder",
            color: "#4D9E8C",
          },
          {
            title: "Dose confirmed ✓",
            desc: "Michael confirmed Aspirin for Margaret at 6:12 PM",
            time: "6:12 PM",
            type: "confirm",
            color: "#68C47F",
          },
          {
            title: "Refill needed soon",
            desc: "Metformin has 8 days remaining. Request now?",
            time: "9:00 AM",
            type: "refill",
            color: "#F0B45A",
          },
          {
            title: "Task handed off",
            desc: "Sarah handed off evening doses to you",
            time: "4:45 PM",
            type: "handoff",
            color: "#8B7EC8",
          },
        ].map(n => (
          <div key={n.title} style={{
            background: "rgba(30,30,30,0.88)",
            borderRadius: 14, padding: "12px 14px",
            marginBottom: 10,
            backdropFilter: "blur(20px)",
            display: "flex", gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: n.color + "33",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: n.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>{n.title}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{n.time}</span>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{n.desc}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 14, background: "#FFFFFF", borderRadius: 14, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E", marginBottom: 10 }}>Notification sound</div>
          {["Calm (default)", "Subtle", "None"].map((s, i) => (
            <div key={s} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingBottom: i < 2 ? 10 : 0, borderBottom: i < 2 ? "1px solid #F2F2F7" : "none", marginBottom: i < 2 ? 10 : 0,
            }}>
              <span style={{ fontSize: 13, color: "#1C1C1E" }}>{s}</span>
              <div style={{
                width: 18, height: 18, borderRadius: "50%",
                border: `2px solid ${i === 0 ? "#4D9E8C" : "#E5E5EA"}`,
                background: i === 0 ? "#4D9E8C" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {i === 0 && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "white" }} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotificationPrefsPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1100 }}>
<SectionHeader
        tag="10 — Settings"
        title="Notification Preferences"
        description="Kin takes a 'quiet by default, critical always' approach to notifications. Caregivers can set quiet hours, choose what types of alerts they want, and customize per-family-member notifications. Critical dose alerts are always-on and explained clearly — not hidden in legal text."
        principle="Quiet by default — critical alerts always break through"
      />

      <Canvas>
        <PhoneFrame label="Notification Settings" subtitle="Quiet hours + type controls" scale={0.88}>
          <NotificationPrefsScreen />
        </PhoneFrame>

        <PhoneFrame label="Notification Style" subtitle="Preview + sound settings" scale={0.88}>
          <NotificationPreviewScreen />
        </PhoneFrame>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-start", paddingTop: 30 }}>
          <Annotation number={1} title="Quiet hours UX" body="Time pickers shown as readable text, not clock UI. Tapping each opens native iOS time picker. Hours shown in 12-hour format matching device preference." />
          <Annotation number={2} title="Critical alert callout" body="Amber warning card inside quiet hours — not a tooltip. Explains that critical alerts bypass this setting. Removes anxiety about 'will I miss something dangerous?'" />
          <Annotation number={3} title="Per-person controls" body="Toggle alerts per family member. 'All alerts' vs 'Confirmations only' avoids overwhelming users with per-action controls. Sensible groupings." color="#8B7EC8" />
          <Annotation number={4} title="Notification previews" body="Shows actual notification appearance on device lock screen style. Dark background simulates iOS lock screen. Helps users understand tone before enabling." color="#F0B45A" />
          <Annotation number={5} title="Sound options" body="3 options, not a sound picker. 'Calm' is the default — specifically chosen to avoid alarm-like sounds common in healthcare apps." color="#68C47F" />
        </div>
      </Canvas>

      <div style={{ marginTop: 24 }}>
        <RationaleCard items={[
          { label: "Default state", value: "All notifications ON except family notes + weekly summary" },
          { label: "Quiet hours default", value: "OFF — opt-in, not opt-out" },
          { label: "Critical alerts", value: "Always delivered, overrides all settings" },
          { label: "Critical threshold", value: "Medication overdue by 2+ hours" },
          { label: "Sound default", value: "'Calm' — no alarm-type audio" },
          { label: "Badge behavior", value: "Home screen badge shows count of unconfirmed doses" },
        ]} />
      </div>
    </div>
  );
}
