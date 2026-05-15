import { PhoneFrame, Annotation, SectionHeader, RationaleCard, Canvas } from "./PhoneFrame";

function CompanionHomeScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F0F8F6" }}>
      {/* Large header */}
      <div style={{ padding: "16px 20px 12px", background: "#FFFFFF" }}>
        <div style={{ fontSize: 13, color: "#8E8E93", marginBottom: 4 }}>Tuesday, May 12</div>
        <div style={{ fontSize: 26, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          Good morning,<br />Margaret
        </div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#68C47F" }} />
          <span style={{ fontSize: 13, color: "#68C47F" }}>Sarah is on duty today</span>
        </div>
      </div>

      {/* Meds section */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#6B6B7A", marginBottom: 12, letterSpacing: "-0.01em" }}>
          Your medications today
        </div>

        {[
          { name: "Lisinopril", dose: "10mg", time: "8:00 AM", given: true, note: "For your blood pressure" },
          { name: "Metformin", dose: "500mg", time: "8:00 AM", given: true, note: "With breakfast" },
          { name: "Lipitor", dose: "20mg", time: "12:00 PM", given: false, note: "With lunch" },
          { name: "Aspirin", dose: "81mg", time: "6:00 PM", given: false, note: "With dinner" },
          { name: "Melatonin", dose: "5mg", time: "9:00 PM", given: false, note: "For sleep" },
        ].map(m => (
          <div key={m.name} style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: "16px 18px",
            marginBottom: 10,
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", gap: 14,
            opacity: m.given ? 0.6 : 1,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: m.given ? "#E8F8ED" : "#E6F4F1",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {m.given ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#68C47F" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span style={{ fontSize: 20 }}>💊</span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.01em", textDecoration: m.given ? "line-through" : "none" }}>
                {m.name} {m.dose}
              </div>
              <div style={{ fontSize: 13, color: "#8E8E93", marginTop: 2 }}>{m.time} · {m.note}</div>
            </div>
          </div>
        ))}

        {/* Call Sarah button */}
        <div style={{ marginTop: 12 }}>
          <div style={{
            height: 60, borderRadius: 20,
            background: "linear-gradient(135deg, #4D9E8C 0%, #3A7D6E 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            boxShadow: "0 6px 20px rgba(77,158,140,0.35)",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.61 19.79 19.79 0 01.0001 1.98 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 500, color: "white" }}>Call Sarah</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanionReminderScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F0F8F6", padding: "0 24px" }}>
      {/* Large pill icon */}
      <div style={{
        width: 100, height: 100, borderRadius: 30,
        background: "#FFFFFF",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 24,
        boxShadow: "0 8px 30px rgba(77,158,140,0.15)",
      }}>
        <span style={{ fontSize: 48 }}>💊</span>
      </div>

      <div style={{ fontSize: 26, fontWeight: 500, color: "#1C1C1E", textAlign: "center", letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.2 }}>
        Time for<br />Lipitor 20mg
      </div>
      <div style={{ fontSize: 15, color: "#8E8E93", textAlign: "center", marginBottom: 8 }}>12:00 PM · With lunch</div>
      <div style={{ fontSize: 13, color: "#4D9E8C", textAlign: "center", marginBottom: 40 }}>Sarah is checking on you later ♡</div>

      {/* Large CTA */}
      <div style={{
        width: "100%", height: 68, borderRadius: 22,
        background: "linear-gradient(135deg, #4D9E8C 0%, #3A7D6E 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 28px rgba(77,158,140,0.4)",
        marginBottom: 14,
      }}>
        <span style={{ fontSize: 18, fontWeight: 500, color: "white" }}>I took it ✓</span>
      </div>

      <div style={{
        width: "100%", height: 56, borderRadius: 18,
        border: "2px solid #E5E5EA",
        background: "#FFFFFF",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 16, color: "#8E8E93" }}>Remind me in 15 min</span>
      </div>
    </div>
  );
}

function CompanionWhosDutyScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F0F8F6" }}>
      <div style={{ padding: "12px 20px", background: "#FFFFFF" }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em" }}>Your care team</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginTop: 2 }}>People looking after you</div>
      </div>

      <div style={{ flex: 1, padding: "16px" }}>
        {/* On duty today */}
        <div style={{
          background: "#FFFFFF", borderRadius: 20, padding: "16px 18px",
          boxShadow: "0 4px 16px rgba(77,158,140,0.12)",
          marginBottom: 12,
          border: "2px solid #4D9E8C33",
        }}>
          <div style={{ fontSize: 10, color: "#4D9E8C", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 10 }}>On duty today</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "#4D9E8C22", border: "2px solid #4D9E8C44",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 20, fontWeight: 600, color: "#4D9E8C" }}>SL</span>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E" }}>Sarah Lee</div>
              <div style={{ fontSize: 13, color: "#8E8E93" }}>Daughter</div>
              <div style={{ fontSize: 11, color: "#68C47F", marginTop: 3 }}>● Available now</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "#E6F4F1",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4D9E8C" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.61 19.79 19.79 0 01.0001 1.98 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Others */}
        {[
          { init: "MJ", color: "#8B7EC8", name: "Michael Johnson", rel: "Son", status: "Available evenings" },
          { init: "EK", color: "#F0B45A", name: "Elena Kim", rel: "Niece", status: "Weekends" },
        ].map(m => (
          <div key={m.init} style={{
            background: "#FFFFFF", borderRadius: 18, padding: "14px 18px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: 10,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: m.color + "22", border: `2px solid ${m.color}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: m.color }}>{m.init}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#1C1C1E" }}>{m.name}</div>
              <div style={{ fontSize: 12, color: "#8E8E93" }}>{m.rel} · {m.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CompanionAppPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1100 }}>
<SectionHeader
        tag="08 — Patient View"
        title="Patient Companion App Experience"
        description="The companion app is a fundamentally different product within Kin. Designed for the care recipient (senior patient), not the caregiver. Large text, large touch targets, minimal navigation, warm language. No clinical jargon, no management UI. Just 'here's what you need today.'"
        principle="Designed for 78-year-old Margaret, not 42-year-old Sarah"
      />

      <Canvas>
        <PhoneFrame label="Today View" subtitle="Patient's medication list" scale={0.88} variant="companion">
          <CompanionHomeScreen />
        </PhoneFrame>

        <PhoneFrame label="Medication Reminder" subtitle="Full-screen reminder modal" scale={0.88} variant="companion">
          <CompanionReminderScreen />
        </PhoneFrame>

        <PhoneFrame label="Care Team" subtitle="Who's looking after me" scale={0.88} variant="companion">
          <CompanionWhosDutyScreen />
        </PhoneFrame>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-start", paddingTop: 30 }}>
          <Annotation number={1} title="17px+ base type" body="All body text at minimum 17px. Headers at 26px. No text below 13px on companion screens. Maximizes readability for aging eyes." />
          <Annotation number={2} title="One-tap call" body="Prominent 'Call Sarah' button always visible. Tapping directly initiates a phone call — no confirmation dialog. Reduces steps to human contact." />
          <Annotation number={3} title="Strikethrough given meds" body="Completed medications are visually crossed off + faded. Mimics the satisfying act of crossing off a paper list. Low cognitive effort to understand." color="#8B7EC8" />
          <Annotation number={4} title="Full-screen reminder" body="Medication reminders take over the full screen. 68pt CTA button — impossible to miss. 'Remind me in 15 min' is the alternative, not dismiss." color="#F0B45A" />
          <Annotation number={5} title="Care team awareness" body="'Who's on duty' gives patient security without complexity. One call button per person. No management actions visible to patients." color="#4D9E8C" />
        </div>
      </Canvas>

      <div style={{ marginTop: 24 }}>
        <RationaleCard items={[
          { label: "Text size minimum", value: "13px footnote, 17px body, 26px display" },
          { label: "Touch targets", value: "Minimum 52pt — larger than caregiver app" },
          { label: "Navigation depth", value: "Maximum 1 level deep — Home + 2 tabs" },
          { label: "Confirmation dialogs", value: "Removed where possible — fewer decisions" },
          { label: "Emergency access", value: "Family call button always in bottom bar" },
          { label: "Self-confirm support", value: "Patient can self-confirm — logged with note 'Self-reported'" },
        ]} />
      </div>
    </div>
  );
}
