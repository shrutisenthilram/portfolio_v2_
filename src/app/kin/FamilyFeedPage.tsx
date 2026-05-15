import { PhoneFrame, TabBar, Annotation, SectionHeader, RationaleCard, Canvas } from "./PhoneFrame";

function ActivityItem({ avatar, color, name, action, detail, time, type }: {
  avatar: string; color: string; name: string; action: string;
  detail?: string; time: string; type: "med" | "note" | "refill" | "handoff";
}) {
  const ICONS: Record<string, string> = { med: "💊", note: "📝", refill: "📦", handoff: "🤝" };
  return (
    <div style={{ display: "flex", gap: 10, paddingBottom: 14, borderBottom: "1px solid #F2F2F7", marginBottom: 14 }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: color + "22", border: `2px solid ${color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, color }}>{avatar}</span>
        </div>
        <div style={{
          position: "absolute", bottom: -2, right: -2,
          width: 16, height: 16, borderRadius: "50%",
          background: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          {ICONS[type]}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, color: "#1C1C1E", lineHeight: 1.4 }}>
          <strong style={{ fontWeight: 600 }}>{name}</strong> {action}
        </div>
        {detail && <div style={{ fontSize: 11, color: "#8E8E93", marginTop: 3, lineHeight: 1.4 }}>{detail}</div>}
        <div style={{ fontSize: 10, color: "#AEAEB2", marginTop: 4 }}>{time}</div>
      </div>
    </div>
  );
}

function FamilyFeedScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: 4 }}>Family</div>

        {/* Family members online */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          {[
            { init: "SL", color: "#4D9E8C", name: "You", active: true },
            { init: "MJ", color: "#8B7EC8", name: "Michael", active: true },
            { init: "EK", color: "#F0B45A", name: "Elena", active: false },
          ].map(m => (
            <div key={m.init} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: m.color + (m.active ? "22" : "11"),
                border: `2px solid ${m.color + (m.active ? "55" : "22")}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: m.active ? m.color : m.color + "66" }}>{m.init}</span>
                {m.active && <div style={{
                  position: "absolute", bottom: 1, right: 1,
                  width: 10, height: 10, borderRadius: "50%", background: "#68C47F",
                  border: "2px solid #FAFAF8",
                }} />}
              </div>
              <span style={{ fontSize: 9, color: m.active ? "#8E8E93" : "#AEAEB2" }}>{m.name}</span>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              border: "2px dashed #E5E5EA",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 20, color: "#E5E5EA" }}>+</span>
            </div>
            <span style={{ fontSize: 9, color: "#AEAEB2" }}>Invite</span>
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {["All", "Today", "Medications", "Notes"].map((f, i) => (
            <div key={f} style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: i === 0 ? "#1C1C1E" : "#F2F2F7",
              fontSize: 11,
              color: i === 0 ? "white" : "#6B6B7A",
              fontWeight: i === 0 ? 500 : 400,
            }}>{f}</div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
        {/* Today */}
        <div style={{ fontSize: 10, fontWeight: 600, color: "#AEAEB2", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Today</div>
        <ActivityItem avatar="SL" color="#4D9E8C" name="You" action="confirmed Lisinopril 10mg for Margaret" time="8:14 AM" type="med" />
        <ActivityItem avatar="SL" color="#4D9E8C" name="You" action="confirmed Metformin 500mg for Margaret" detail="'No issues this morning'" time="8:16 AM" type="med" />
        <ActivityItem avatar="MJ" color="#8B7EC8" name="Michael" action="confirmed Lipitor 20mg for Margaret" time="12:05 PM" type="med" />
        <ActivityItem avatar="MJ" color="#8B7EC8" name="Michael" action="added a note" detail="'Mom seemed a bit tired today. Mentioned her knee was hurting.'" time="12:10 PM" type="note" />

        {/* Yesterday */}
        <div style={{ fontSize: 10, fontWeight: 600, color: "#AEAEB2", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, marginTop: 4 }}>Yesterday</div>
        <ActivityItem avatar="EK" color="#F0B45A" name="Elena" action="requested refill for Metformin 500mg" detail="Sent to CVS Pharmacy on Oak St." time="9:30 AM" type="refill" />
        <ActivityItem avatar="SL" color="#4D9E8C" name="You" action="handed off evening doses to Michael" detail="Aspirin + Melatonin · 6PM–9PM window" time="4:45 PM" type="handoff" />
      </div>

      <TabBar active="family" />
    </div>
  );
}

function MemberDetailScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Family</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {/* Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "#8B7EC822", border: "2px solid #8B7EC844",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 22, fontWeight: 600, color: "#8B7EC8" }}>MJ</span>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.01em" }}>Michael Johnson</div>
            <div style={{ fontSize: 12, color: "#8E8E93" }}>Son · Caregiver</div>
            <div style={{ fontSize: 11, color: "#68C47F", marginTop: 3 }}>● Active now</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {[
            { label: "This week", value: "14 meds" },
            { label: "Last active", value: "12:10 PM" },
            { label: "Since", value: "Jan 2025" },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, background: "#FFFFFF", borderRadius: 12, padding: "12px 10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)", textAlign: "center",
            }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#1C1C1E" }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "#AEAEB2", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Role */}
        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Permissions</div>
          {[
            { label: "Confirm medications", on: true },
            { label: "Request refills", on: true },
            { label: "Edit patient info", on: false },
            { label: "Invite family", on: false },
          ].map(p => (
            <div key={p.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid #F2F2F7", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "#1C1C1E" }}>{p.label}</span>
              <div style={{ width: 36, height: 22, borderRadius: 11, background: p.on ? "#4D9E8C" : "#E5E5EA", position: "relative" }}>
                <div style={{ position: "absolute", top: 2, [p.on ? "right" : "left"]: 2, width: 18, height: 18, borderRadius: "50%", background: "white" }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 44, borderRadius: 12, background: "#FDEEED", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 13, color: "#D64040", fontWeight: 500 }}>Remove from family</span>
        </div>
      </div>
    </div>
  );
}

export function FamilyFeedPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1100 }}>
<SectionHeader
        tag="04 — Coordination"
        title="Family Coordination Activity Feed"
        description="The family feed reads like a group chat, not an audit log. It answers 'what happened today' in a warm, human way. Family members are shown by name, not role. Activity types are distinguished by icon, not color-coded alarm severity."
        principle="Group chat feeling — not surveillance, not an audit log"
      />

      <Canvas>
        <PhoneFrame label="Family Feed" subtitle="Activity timeline" scale={0.88}>
          <FamilyFeedScreen />
        </PhoneFrame>

        <PhoneFrame label="Member Detail" subtitle="Role + activity history" scale={0.88}>
          <MemberDetailScreen />
        </PhoneFrame>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-start", paddingTop: 30 }}>
          <Annotation number={1} title="Online indicators" body="Green dot shows who's actively in the app. Tapping an avatar shows their recent actions. Avoids 'last seen 3 hours ago' language that implies tardiness." />
          <Annotation number={2} title="Activity types" body="4 types: Medication, Note, Refill, Handoff. Each has an emoji icon overlay on avatar — skimmable at a glance without reading text." />
          <Annotation number={3} title="Filter pills" body="'All / Today / Medications / Notes' — shows the most common filter needs. Does not show 'Mine' filter to avoid siloed thinking." color="#8B7EC8" />
          <Annotation number={4} title="Invitation slot" body="Empty avatar with dashed border invites adding more family. Always visible — encourages network growth without nagging." color="#F0B45A" />
          <Annotation number={5} title="Member permissions" body="Simple toggles. 4 permissions max shown at once. Destructive action (remove) at bottom in calm red — visible but not prominent." color="#E5716A" />
        </div>
      </Canvas>

      <div style={{ marginTop: 24 }}>
        <RationaleCard items={[
          { label: "Feed read time", value: "Today's key events visible in 3 seconds" },
          { label: "Activity framing", value: "First-person name, not role: 'Michael' not 'Caregiver B'" },
          { label: "Notification model", value: "Opt-out per event, not opt-in" },
          { label: "Privacy", value: "Patient notes shown to all family by default" },
          { label: "Member limit", value: "Up to 8 family members per patient" },
          { label: "Offline behavior", value: "Feed loads cached content, timestamps flagged" },
        ]} />
      </div>
    </div>
  );
}
