import { PhoneFrame, TabBar, Annotation, SectionHeader, RationaleCard, Canvas, FlowArrow } from "./PhoneFrame";

function Step1Screen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Today</span>
        <span style={{ fontSize: 12, color: "#AEAEB2" }}>1 of 2</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
        {/* Medication header */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: 18,
          padding: "20px",
          marginBottom: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "#E6F4F1",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 24 }}>💊</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em" }}>Lipitor 20mg</div>
          <div style={{ fontSize: 13, color: "#8E8E93", marginTop: 3 }}>Rosuvastatin · Oral · with food</div>
          <div style={{
            marginTop: 14, padding: "10px 12px",
            background: "#F8F8F8", borderRadius: 10,
            display: "flex", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: 10, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em" }}>Scheduled</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E", marginTop: 2 }}>12:00 PM</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em" }}>Supply</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E", marginTop: 2 }}>22 days</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em" }}>Patient</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E", marginTop: 2 }}>Margaret</div>
            </div>
          </div>
        </div>

        {/* Who gave it */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#AEAEB2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Given by</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { init: "SL", name: "Sarah (You)", color: "#4D9E8C", selected: true },
              { init: "MJ", name: "Michael", color: "#8B7EC8", selected: false },
              { init: "EK", name: "Elena", color: "#F0B45A", selected: false },
            ].map(p => (
              <div key={p.init} style={{
                height: 52, borderRadius: 14, border: `1.5px solid ${p.selected ? "#4D9E8C" : "#E5E5EA"}`,
                background: p.selected ? "#E6F4F1" : "#FFFFFF",
                display: "flex", alignItems: "center", padding: "0 14px", gap: 12,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: p.color + "22",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: p.color }}>{p.init}</span>
                </div>
                <span style={{ fontSize: 14, color: p.selected ? "#1C1C1E" : "#6B6B7A", fontWeight: p.selected ? 500 : 400 }}>{p.name}</span>
                {p.selected && <div style={{ marginLeft: "auto" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#4D9E8C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 10, color: "white" }}>✓</span>
                  </div>
                </div>}
              </div>
            ))}
          </div>
        </div>

        {/* Time */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#AEAEB2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Time given</div>
          <div style={{
            height: 52, borderRadius: 12, background: "#FFFFFF",
            border: "1.5px solid #4D9E8C",
            display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 15, color: "#1C1C1E", fontWeight: 500 }}>12:08 PM</span>
            <span style={{ fontSize: 11, color: "#4D9E8C" }}>Change</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          height: 56, borderRadius: 16, background: "#4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 18px rgba(77,158,140,0.35)",
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Confirm Given →</span>
        </div>
        <div style={{ height: 60 }} />
      </div>
    </div>
  );
}

function Step2Screen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Back</span>
        <span style={{ fontSize: 12, color: "#AEAEB2" }}>2 of 2</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#AEAEB2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Add a note</div>
        <div style={{
          background: "#FFFFFF", borderRadius: 14,
          padding: 16, marginBottom: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>Lipitor 20mg</span>
            <span style={{ fontSize: 12, color: "#8E8E93" }}>12:08 PM</span>
          </div>
          <div style={{ fontSize: 12, color: "#8E8E93" }}>Given by Sarah · Oral · with food</div>
        </div>

        <div style={{
          background: "#FFFFFF", borderRadius: 14, padding: 14,
          border: "1.5px solid #E5E5EA", marginBottom: 16, minHeight: 80,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}>
          <div style={{ fontSize: 13, color: "#AEAEB2" }}>Any notes? (optional)</div>
          <div style={{ fontSize: 12, color: "#1C1C1E", marginTop: 4 }}>Margaret took it without issues, slight appetite loss noted.</div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#AEAEB2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Notify family?</div>
          <div style={{
            height: 52, borderRadius: 14,
            background: "#FFFFFF",
            border: "1.5px solid #4D9E8C",
            display: "flex", alignItems: "center", padding: "0 14px",
            justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 14, color: "#1C1C1E" }}>Let Michael & Elena know</span>
            <div style={{ width: 40, height: 24, borderRadius: 12, background: "#4D9E8C", position: "relative" }}>
              <div style={{ position: "absolute", right: 3, top: 3, width: 18, height: 18, borderRadius: "50%", background: "white" }} />
            </div>
          </div>
        </div>

        <div style={{
          height: 56, borderRadius: 16, background: "#4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 18px rgba(77,158,140,0.35)",
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Log & Notify</span>
        </div>
      </div>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      {/* Success animation placeholder */}
      <div style={{
        width: 88, height: 88, borderRadius: "50%",
        background: "linear-gradient(135deg, #68C47F 0%, #4CAF70 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 24,
        boxShadow: "0 8px 28px rgba(104,196,127,0.4)",
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M8 20L16 28L32 12" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ fontSize: 24, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", textAlign: "center", marginBottom: 8 }}>
        Confirmed
      </div>
      <div style={{ fontSize: 13, color: "#8E8E93", textAlign: "center", lineHeight: 1.6, marginBottom: 32 }}>
        Lipitor 20mg logged at 12:08 PM<br />Michael & Elena have been notified
      </div>

      {/* Confetti dots */}
      <div style={{ position: "absolute", top: 80, left: 40, width: 8, height: 8, borderRadius: "50%", background: "#4D9E8C", opacity: 0.5 }} />
      <div style={{ position: "absolute", top: 100, right: 50, width: 6, height: 6, borderRadius: "50%", background: "#F0B45A", opacity: 0.5 }} />
      <div style={{ position: "absolute", top: 120, left: 60, width: 5, height: 5, borderRadius: "50%", background: "#8B7EC8", opacity: 0.5 }} />

      {/* Next medication */}
      <div style={{ width: "100%", background: "#FFFFFF", borderRadius: 16, padding: "14px 16px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 10, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Next Medication</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#AEAEB2", flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>Aspirin 81mg</div>
            <div style={{ fontSize: 11, color: "#8E8E93" }}>Today at 6:00 PM</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 11, color: "#AEAEB2" }}>5h 52m</div>
        </div>
      </div>

      <div style={{ height: 44, width: "100%", borderRadius: 12, border: "1.5px solid #E5E5EA", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 14, color: "#1C1C1E", fontWeight: 500 }}>Return to Today</span>
      </div>
    </div>
  );
}

export function MedConfirmationPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1100 }}>
<SectionHeader
        tag="03 — Core Flow"
        title="Medication Confirmation Flow"
        description="The most frequent caregiver action. Designed to take under 6 seconds in the default case. Progressive disclosure: step 1 is one tap confirm, step 2 is optional notes + notify. Success state is calm and reassuring, never celebratory in a way that feels hollow."
        principle="Under 6 seconds in the default case — reduce every step"
      />

      <Canvas>
        <PhoneFrame label="Step 1 — Confirm" subtitle="Who gave it, when" scale={0.88}>
          <Step1Screen />
        </PhoneFrame>

        <FlowArrow label="Tap confirm" />

        <PhoneFrame label="Step 2 — Notes" subtitle="Optional context + notify" scale={0.88}>
          <Step2Screen />
        </PhoneFrame>

        <FlowArrow label="Log & Notify" />

        <PhoneFrame label="Success State" subtitle="Calm resolution" scale={0.88}>
          <SuccessScreen />
        </PhoneFrame>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-start", paddingTop: 30 }}>
          <Annotation number={1} title="Pre-filled defaults" body="'You' is selected by default. Time defaults to now. Most confirmations need zero changes — just tap the teal button." />
          <Annotation number={2} title="Person selector" body="52pt rows for large touch targets. Name + avatar builds familiarity. Selected state uses teal — same as primary action." />
          <Annotation number={3} title="Notes as optional" body="Step 2 makes notes feel lightweight. 'Any notes?' framing vs 'Required field'. Toggle for notifications defaults to ON for family awareness." color="#8B7EC8" />
          <Annotation number={4} title="Success — calm check" body="Green circle, not confetti explosion. Copy confirms who was notified. Next medication shown immediately — removes 'what now?' uncertainty." color="#68C47F" />
          <Annotation number={5} title="Haptic feedback" body="Medium impact haptic on confirm. Success haptic on log. No sound — respects care environments where noise is unwanted." color="#F0B45A" />
        </div>
      </Canvas>

      <div style={{ marginTop: 24 }}>
        <RationaleCard items={[
          { label: "Default flow time", value: "< 6 seconds (tap med → tap confirm)" },
          { label: "Steps (default)", value: "2 — confirm who, then optional notes" },
          { label: "Pre-filled fields", value: "Caregiver name, current time, patient" },
          { label: "Notify behavior", value: "ON by default, one toggle to disable" },
          { label: "Success language", value: "'Confirmed' not 'Completed' or 'Done'" },
          { label: "Error recovery", value: "Undo available for 30s via toast action" },
        ]} />
      </div>
    </div>
  );
}
