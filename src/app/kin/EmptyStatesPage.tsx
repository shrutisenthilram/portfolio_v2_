import { PhoneFrame, Annotation, SectionHeader, RationaleCard, Canvas } from "./PhoneFrame";

function EmptyHomeScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: 4 }}>Good morning, Sarah</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 20 }}>Tuesday, May 12</div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", paddingBottom: 80 }}>
        {/* Illustration */}
        <div style={{
          width: 96, height: 96, borderRadius: 28,
          background: "linear-gradient(135deg, #E6F4F1 0%, #F0F8F6 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
          boxShadow: "0 4px 20px rgba(77,158,140,0.1)",
        }}>
          <span style={{ fontSize: 42 }}>🌱</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E", textAlign: "center", marginBottom: 8, letterSpacing: "-0.01em" }}>
          Set up your first patient
        </div>
        <div style={{ fontSize: 13, color: "#8E8E93", textAlign: "center", lineHeight: 1.6, marginBottom: 28, maxWidth: 220 }}>
          Add a loved one and their medications to start tracking care together.
        </div>
        <div style={{
          height: 52, width: "100%", borderRadius: 16,
          background: "#4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 14px rgba(77,158,140,0.3)",
          marginBottom: 10,
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Add first patient</span>
        </div>
        <div style={{ height: 44, width: "100%", borderRadius: 12, border: "1.5px solid #E5E5EA", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 13, color: "#8E8E93" }}>How does Kin work?</span>
        </div>
      </div>
    </div>
  );
}

function EmptyFamilyScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: 4 }}>Family</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 20 }}>Your care team</div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", paddingBottom: 80 }}>
        <div style={{
          width: 88, height: 88, borderRadius: 24,
          background: "#EEF0F8",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
        }}>
          <span style={{ fontSize: 38 }}>🤗</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E", textAlign: "center", marginBottom: 8 }}>
          You're the only one here
        </div>
        <div style={{ fontSize: 13, color: "#8E8E93", textAlign: "center", lineHeight: 1.6, marginBottom: 28 }}>
          Invite family to share care responsibilities. You don't have to do this alone.
        </div>
        <div style={{
          height: 52, width: "100%", borderRadius: 16,
          background: "#8B7EC8",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 14px rgba(139,126,200,0.3)",
          marginBottom: 10,
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Invite family member</span>
        </div>

        {/* Family invite previews */}
        <div style={{ marginTop: 20, width: "100%" }}>
          <div style={{ fontSize: 11, color: "#AEAEB2", textAlign: "center", marginBottom: 12 }}>Suggested from your contacts</div>
          {["Michael J.", "Elena K.", "Carlos R."].map((n) => (
            <div key={n} style={{
              height: 52, borderRadius: 12, background: "#FFFFFF",
              border: "1.5px solid #E5E5EA",
              display: "flex", alignItems: "center", padding: "0 14px", gap: 12, marginBottom: 8,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F2F2F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 12, color: "#AEAEB2" }}>{n[0]}</span>
              </div>
              <span style={{ fontSize: 13, color: "#1C1C1E", flex: 1 }}>{n}</span>
              <span style={{ fontSize: 12, color: "#8B7EC8", fontWeight: 500 }}>Invite</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyRefillsScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: 4 }}>Refills</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 20 }}>All stocked up</div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", paddingBottom: 80 }}>
        <div style={{
          width: 88, height: 88, borderRadius: 24,
          background: "#E8F8ED",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
        }}>
          <span style={{ fontSize: 38 }}>✅</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E", textAlign: "center", marginBottom: 8 }}>
          All medications are stocked
        </div>
        <div style={{ fontSize: 13, color: "#8E8E93", textAlign: "center", lineHeight: 1.6, marginBottom: 10, maxWidth: 220 }}>
          Great job. We'll let you know when any medication needs a refill.
        </div>
        <div style={{ fontSize: 11, color: "#4D9E8C", textAlign: "center" }}>
          Kin checks supply levels daily
        </div>
      </div>
    </div>
  );
}

function EmptyActivityScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: 4 }}>Family</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 12 }}>Today's activity</div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {["All", "Today", "Medications", "Notes"].map((f, i) => (
            <div key={f} style={{
              padding: "5px 12px", borderRadius: 20,
              background: i === 0 ? "#1C1C1E" : "#F2F2F7",
              fontSize: 11, color: i === 0 ? "white" : "#6B6B7A",
            }}>{f}</div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", paddingBottom: 60 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 22,
          background: "#F2F2F7",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 34 }}>🌤</span>
        </div>
        <div style={{ fontSize: 17, fontWeight: 500, color: "#1C1C1E", textAlign: "center", marginBottom: 8 }}>
          Nothing yet today
        </div>
        <div style={{ fontSize: 12, color: "#8E8E93", textAlign: "center", lineHeight: 1.6 }}>
          Family activity will appear here as medications are confirmed throughout the day.
        </div>
      </div>
    </div>
  );
}

export function EmptyStatesPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1200 }}>
<SectionHeader
        tag="09 — States"
        title="Empty States"
        description="Empty states are moments of opportunity, not failure. Each empty state in Kin has a specific tone: first-time setup is inviting and hopeful, no activity is calm reassurance, all-stocked is genuine celebration. Language is always warm and human, never robotic placeholder text."
        principle="Empty is never broken — it's a beginning or a celebration"
      />

      <Canvas>
        <PhoneFrame label="No Patients Yet" subtitle="First-run home screen" scale={0.85}>
          <EmptyHomeScreen />
        </PhoneFrame>

        <PhoneFrame label="No Family Yet" subtitle="Invite family members" scale={0.85}>
          <EmptyFamilyScreen />
        </PhoneFrame>

        <PhoneFrame label="All Stocked Up" subtitle="No refills needed" scale={0.85}>
          <EmptyRefillsScreen />
        </PhoneFrame>

        <PhoneFrame label="No Activity Today" subtitle="Early in the day" scale={0.85}>
          <EmptyActivityScreen />
        </PhoneFrame>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-start", paddingTop: 30, maxWidth: 220 }}>
          <Annotation number={1} title="Hopeful empty states" body="No empty state uses grey boxes or dashed borders as stand-ins. Each has an emoji illustration, a human headline, and a single clear next action." />
          <Annotation number={2} title="Tone matching" body="'You're the only one here' for family is warm, not clinical. 'All stocked up' for refills is celebratory. Tone shifts based on whether empty is good or neutral." />
          <Annotation number={3} title="Suggested actions" body="Family empty state shows contact suggestions from device. Reduces friction to 'invite'. Primary action uses section accent color (purple for family)." color="#8B7EC8" />
          <Annotation number={4} title="No activity = calm" body="Daily activity feed empty state uses soft language. 'Nothing yet today' not 'No records found'. A sun emoji — the day is still ahead." color="#68C47F" />
        </div>
      </Canvas>

      <div style={{ marginTop: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { state: "No patients", tone: "Inviting + hopeful", cta: "Add first patient", emoji: "🌱" },
            { state: "No family", tone: "Warm + encouraging", cta: "Invite family member", emoji: "🤗" },
            { state: "All stocked", tone: "Celebratory + calm", cta: "None needed", emoji: "✅" },
            { state: "No activity", tone: "Neutral + reassuring", cta: "Confirm medications", emoji: "🌤" },
          ].map(s => (
            <div key={s.state} style={{ background: "#FFFFFF", borderRadius: 12, padding: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E", marginBottom: 4 }}>{s.state}</div>
              <div style={{ fontSize: 10, color: "#8E8E93", marginBottom: 8 }}>Tone: {s.tone}</div>
              <div style={{ fontSize: 10, color: "#4D9E8C" }}>CTA: {s.cta}</div>
            </div>
          ))}
        </div>
        <RationaleCard items={[
          { label: "Empty state types", value: "First-run, No data, All-good, Error" },
          { label: "Illustration style", value: "Single emoji — warm, scalable, accessible" },
          { label: "Copy principle", value: "Human sentence, not 'No items found'" },
          { label: "CTA presence", value: "Always one CTA — never two on empty states" },
          { label: "Loading states", value: "Skeleton cards match content shape, not spinners" },
          { label: "Error states", value: "Calm red, offer retry, explain in plain language" },
        ]} />
      </div>
    </div>
  );
}
