import { PhoneFrame, TabBar, Annotation, SectionHeader, RationaleCard, Canvas, FlowArrow } from "./PhoneFrame";

function MedItem({ name, dose, time, status, giver }: {
  name: string; dose: string; time: string; status: "given" | "upcoming" | "overdue"; giver?: string;
}) {
  const STATUS_MAP = {
    given: { color: "#68C47F", bg: "#E8F8ED", label: "Given", dotColor: "#68C47F" },
    upcoming: { color: "#6B7AB8", bg: "#EEF0F8", label: "Upcoming", dotColor: "#AEAEB2" },
    overdue: { color: "#D64040", bg: "#FDEEED", label: "Overdue", dotColor: "#E5716A" },
  };
  const s = STATUS_MAP[status];
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: 14,
      padding: "12px 14px",
      marginBottom: 8,
      boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.dotColor, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name} {dose}</div>
        <div style={{ fontSize: 11, color: "#8E8E93", marginTop: 1 }}>{time}{giver ? ` · ${giver}` : ""}</div>
      </div>
      <div style={{ background: s.bg, borderRadius: 20, padding: "3px 8px", flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: s.color, fontWeight: 500 }}>{s.label}</span>
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: "#8E8E93", marginBottom: 2 }}>Tuesday, May 12</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em" }}>Good morning, Sarah</div>
        </div>

        {/* Progress Card */}
        <div style={{
          background: "linear-gradient(135deg, #4D9E8C 0%, #3A7D6E 100%)",
          borderRadius: 18,
          padding: "18px 20px",
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="5" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="white" strokeWidth="5"
              strokeDasharray={`${2 * Math.PI * 26 * 0.4} ${2 * Math.PI * 26 * 0.6}`}
              strokeLinecap="round" transform="rotate(-90 32 32)" />
            <text x="32" y="36" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">2/5</text>
          </svg>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "white", letterSpacing: "-0.01em" }}>2 of 5 given today</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 3 }}>Margaret Reyes · Next at 12:00 PM</div>
            <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
              {["✓", "✓", "○", "○", "○"].map((s, i) => (
                <div key={i} style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: s === "✓" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 9, color: s === "✓" ? "#3A7D6E" : "white" }}>{s === "✓" ? "✓" : ""}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Family Strip */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Family on duty</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { init: "SL", name: "You", color: "#4D9E8C", active: true },
              { init: "MJ", name: "Michael", color: "#8B7EC8", active: false },
              { init: "EK", name: "Elena", color: "#F0B45A", active: false },
            ].map(m => (
              <div key={m.init} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: m.color + "22",
                  border: `2px solid ${m.active ? m.color : m.color + "44"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: m.color }}>{m.init}</span>
                  {m.active && <div style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: 10, height: 10, borderRadius: "50%", background: "#68C47F",
                    border: "2px solid #FAFAF8",
                  }} />}
                </div>
                <span style={{ fontSize: 9, color: "#8E8E93" }}>{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Meds */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", letterSpacing: "0.06em", textTransform: "uppercase" }}>Today's Schedule</div>
            <span style={{ fontSize: 11, color: "#4D9E8C" }}>See all</span>
          </div>
          <MedItem name="Lisinopril" dose="10mg" time="8:00 AM" status="given" giver="You" />
          <MedItem name="Metformin" dose="500mg" time="8:00 AM" status="given" giver="You" />
          <MedItem name="Lipitor" dose="20mg" time="12:00 PM" status="upcoming" />
          <MedItem name="Aspirin" dose="81mg" time="6:00 PM" status="upcoming" />
          <MedItem name="Melatonin" dose="5mg" time="9:00 PM" status="upcoming" />
        </div>

        {/* Refill Alert */}
        <div style={{
          background: "#FEF4E2",
          borderRadius: 12,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F0B45A", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#8A5E00" }}>Metformin running low</div>
            <div style={{ fontSize: 10, color: "#C88A20" }}>8 days remaining · Refill available</div>
          </div>
          <span style={{ fontSize: 11, color: "#C88A20", fontWeight: 500 }}>Request</span>
        </div>
      </div>

      <TabBar active="home" />
    </div>
  );
}

function HomeDrillScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Today</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#1C1C1E", marginBottom: 4, letterSpacing: "-0.02em" }}>Lipitor 20mg</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 20 }}>Rosuvastatin · Once daily</div>

        {/* Detail Card */}
        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "16px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          {[
            { l: "Schedule", v: "12:00 PM daily" },
            { l: "Route", v: "Oral — with food" },
            { l: "Prescriber", v: "Dr. Kim, Cardiology" },
            { l: "Supply", v: "22 days remaining" },
          ].map(r => (
            <div key={r.l} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, borderBottom: "1px solid #F2F2F7", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "#8E8E93" }}>{r.l}</span>
              <span style={{ fontSize: 12, color: "#1C1C1E", fontWeight: 500 }}>{r.v}</span>
            </div>
          ))}
        </div>

        {/* History */}
        <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Recent History</div>
        {[
          { day: "Today", status: "Upcoming", color: "#AEAEB2" },
          { day: "Yesterday", status: "Given at 12:05 PM by Michael", color: "#68C47F" },
          { day: "Sun May 11", status: "Given at 11:58 AM by You", color: "#68C47F" },
          { day: "Sat May 10", status: "Given at 12:10 PM by Elena", color: "#68C47F" },
        ].map(h => (
          <div key={h.day} style={{
            display: "flex", justifyContent: "space-between",
            padding: "10px 0", borderBottom: "1px solid #F2F2F7",
          }}>
            <span style={{ fontSize: 12, color: "#8E8E93" }}>{h.day}</span>
            <span style={{ fontSize: 12, color: h.color, fontWeight: 500 }}>{h.status}</span>
          </div>
        ))}

        <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            height: 52, borderRadius: 14, background: "#4D9E8C",
            display: "flex", alignItems: "center", justifyContent: "center",
            flex: 1, boxShadow: "0 4px 12px rgba(77,158,140,0.3)",
          }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "white" }}>Confirm Given Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeDashboardPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1100 }}>
<SectionHeader
        tag="02 — Core View"
        title="Today-First Dashboard"
        description="The Home screen is the primary caregiver hub. It answers 'what needs to happen right now' without requiring navigation. Organized by time-of-day, not by patient or medication name. Family presence is ambient, not intrusive."
        principle="Today is the context — everything else is detail"
      />

      <Canvas>
        {/* Main home */}
        <PhoneFrame label="Home — Today View" subtitle="Primary dashboard" scale={0.88}>
          <HomeScreen />
        </PhoneFrame>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, justifyContent: "center", alignSelf: "center", marginTop: -20 }}>
          <FlowArrow label="Tap medication" />
        </div>

        {/* Med drill-down */}
        <PhoneFrame label="Medication Detail" subtitle="History + confirm CTA" scale={0.88}>
          <HomeDrillScreen />
        </PhoneFrame>

        {/* Annotations */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-start", paddingTop: 30 }}>
          <Annotation number={1} title="Progress ring" body="Teal arc shows today's completion. 64pt diameter ensures readability. Center shows X/Y count — never percentage (less anxiety)." />
          <Annotation number={2} title="Family strip" body="Avatars show who's available. Green dot = online/active. Tapping opens their recent activity. Never shows 'last seen' time to avoid surveillance feeling." />
          <Annotation number={3} title="Medication rows" body="48pt touch target. Status dot + badge gives dual status signal. Upcoming meds are never alarming — they're neutral blue." color="#8B7EC8" />
          <Annotation number={4} title="Refill banner" body="Amber background, not red. Language is 'running low' not 'WARNING'. Shown at bottom — important but not urgent." color="#F0B45A" />
          <Annotation number={5} title="Greeting" body="Personalized greeting sets warm tone. Date shown in readable format, not ISO. Avoids clinical headers like 'Dashboard' or 'Overview'." color="#68C47F" />
        </div>
      </Canvas>

      <div style={{ marginTop: 24 }}>
        <RationaleCard items={[
          { label: "Mental model", value: "Today-organized, not patient-organized" },
          { label: "Primary action", value: "Confirm medication (one tap from list)" },
          { label: "Scroll depth", value: "All today's meds visible within 2 scrolls" },
          { label: "Family awareness", value: "Ambient — who's active, not surveillance" },
          { label: "Alert style", value: "Amber banners, never red bells" },
          { label: "Touch targets", value: "52pt rows, 56pt primary CTA" },
        ]} />
      </div>
    </div>
  );
}
