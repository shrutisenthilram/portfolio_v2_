import { PhoneFrame, Annotation, SectionHeader, RationaleCard, Canvas, FlowArrow } from "./PhoneFrame";

function HandoffInitScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Today</span>
        <span style={{ fontSize: 13, color: "#1C1C1E", fontWeight: 500 }}>Hand Off</span>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>Send</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.01em", marginBottom: 4 }}>
          Hand off to someone
        </div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 20 }}>
          Delegate tasks so nothing falls through the cracks
        </div>

        {/* Who */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Hand off to</div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {[
              { init: "MJ", name: "Michael", color: "#8B7EC8", selected: true },
              { init: "EK", name: "Elena", color: "#F0B45A", selected: false },
              { init: "+", name: "Invite", color: "#AEAEB2", selected: false },
            ].map(p => (
              <div key={p.init} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: p.selected ? p.color + "22" : "#F2F2F7",
                  border: `2.5px solid ${p.selected ? p.color : "transparent"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: p.selected ? p.color : "#AEAEB2" }}>{p.init}</span>
                </div>
                <span style={{ fontSize: 10, color: p.selected ? "#1C1C1E" : "#8E8E93" }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time window */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Time window</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["This evening", "Tomorrow", "Weekend", "Custom"].map((t, i) => (
              <div key={t} style={{
                flex: 1, padding: "8px 4px", borderRadius: 10, textAlign: "center",
                background: i === 0 ? "#1C1C1E" : "#F2F2F7",
                border: `1.5px solid ${i === 0 ? "#1C1C1E" : "#E5E5EA"}`,
              }}>
                <span style={{ fontSize: 10, color: i === 0 ? "white" : "#6B6B7A", fontWeight: i === 0 ? 500 : 400 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Include tasks</div>
          {[
            { name: "Aspirin 81mg", time: "6:00 PM", checked: true },
            { name: "Melatonin 5mg", time: "9:00 PM", checked: true },
            { name: "Dinner check-in", time: "6:30 PM", checked: false },
          ].map(t => (
            <div key={t.name} style={{
              height: 52, borderRadius: 12, background: t.checked ? "#E6F4F1" : "#FFFFFF",
              border: `1.5px solid ${t.checked ? "#4D9E8C33" : "#E5E5EA"}`,
              display: "flex", alignItems: "center", padding: "0 14px", gap: 12, marginBottom: 8,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                background: t.checked ? "#4D9E8C" : "transparent",
                border: `2px solid ${t.checked ? "#4D9E8C" : "#AEAEB2"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {t.checked && <span style={{ fontSize: 11, color: "white" }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{t.name}</div>
                <div style={{ fontSize: 10, color: "#8E8E93" }}>{t.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Leave a note</div>
          <div style={{
            background: "#FFFFFF", borderRadius: 12,
            border: "1.5px solid #E5E5EA", padding: "12px 14px",
            minHeight: 70,
          }}>
            <div style={{ fontSize: 13, color: "#AEAEB2" }}>Anything Michael should know...</div>
          </div>
        </div>

        <div style={{
          height: 56, borderRadius: 16, background: "#4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 18px rgba(77,158,140,0.35)",
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Send Handoff to Michael</span>
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function HandoffReceiveScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Notification-style top */}
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Notifications</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "#4D9E8C22", border: "2px solid #4D9E8C44",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#4D9E8C" }}>SL</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>Sarah handed off to you</div>
            <div style={{ fontSize: 11, color: "#8E8E93" }}>This evening · 2 tasks</div>
          </div>
        </div>

        {/* Tasks to accept */}
        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "14px 16px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Tasks for you</div>
          {[
            { name: "Aspirin 81mg", time: "6:00 PM", patient: "Margaret" },
            { name: "Melatonin 5mg", time: "9:00 PM", patient: "Margaret" },
          ].map(t => (
            <div key={t.name} style={{
              display: "flex", alignItems: "center", gap: 12,
              paddingBottom: 12, borderBottom: "1px solid #F2F2F7", marginBottom: 12,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4D9E8C", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "#8E8E93" }}>{t.time} · {t.patient}</div>
              </div>
              <div style={{ fontSize: 11, color: "#4D9E8C" }}>+Remind me</div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{
          background: "#F8F8F8", borderRadius: 12, padding: "12px 14px",
          border: "1px solid #EBEBEB", marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Note from Sarah</div>
          <div style={{ fontSize: 13, color: "#1C1C1E", fontStyle: "italic" }}>"Mom had a good afternoon. The Aspirin should be given with dinner, not on an empty stomach."</div>
        </div>

        {/* CTA */}
        <div style={{
          height: 56, borderRadius: 16, background: "#4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 18px rgba(77,158,140,0.35)", marginBottom: 10,
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Accept Handoff</span>
        </div>
        <div style={{ height: 44, borderRadius: 12, border: "1.5px solid #E5E5EA", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 13, color: "#8E8E93" }}>Decline (let Sarah know)</span>
        </div>
      </div>
    </div>
  );
}

function HandoffConfirmedScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "#8B7EC822", border: "2px solid #8B7EC844",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 36 }}>🤝</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", marginBottom: 8, textAlign: "center" }}>Handoff accepted</div>
      <div style={{ fontSize: 13, color: "#8E8E93", textAlign: "center", lineHeight: 1.6, marginBottom: 32 }}>
        Michael will handle this evening.<br />You'll get a notification when done.
      </div>

      {/* Summary */}
      <div style={{ width: "100%", background: "#FFFFFF", borderRadius: 14, padding: "14px 16px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Handed off</div>
        <div style={{ fontSize: 13, color: "#1C1C1E", marginBottom: 3 }}>Aspirin + Melatonin → Michael Johnson</div>
        <div style={{ fontSize: 11, color: "#8E8E93" }}>This evening · 6:00 PM – 9:00 PM</div>
      </div>

      <div style={{ height: 44, width: "100%", borderRadius: 12, border: "1.5px solid #E5E5EA", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 13, color: "#1C1C1E", fontWeight: 500 }}>Back to Today</span>
      </div>
    </div>
  );
}

export function TaskHandoffPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1100 }}>
<SectionHeader
        tag="06 — Coordination"
        title="Task Handoff Flow"
        description="Task handoff allows primary caregivers to delegate specific medication responsibilities to family members. The flow is conversational — feels like a text message, not a work ticket. The receiver gets a clear, friendly notification with full context. Declining is never shameful."
        principle="Delegation without guilt — make it easy to ask for help"
      />

      <Canvas>
        <PhoneFrame label="Create Handoff" subtitle="Primary caregiver view" scale={0.88}>
          <HandoffInitScreen />
        </PhoneFrame>

        <FlowArrow label="Send handoff" />

        <PhoneFrame label="Receive Handoff" subtitle="Family member view" scale={0.88}>
          <HandoffReceiveScreen />
        </PhoneFrame>

        <FlowArrow label="Accept" />

        <PhoneFrame label="Confirmed" subtitle="Both parties notified" scale={0.88}>
          <HandoffConfirmedScreen />
        </PhoneFrame>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-start", paddingTop: 30 }}>
          <Annotation number={1} title="Person-first selector" body="Avatar circles, not a dropdown. Shows online status. Selecting someone feels like choosing a contact, not assigning a work item." />
          <Annotation number={2} title="Time window chips" body="Pre-set options cover 90% of use cases. 'Custom' escape hatch always present. No time pickers unless custom is selected." />
          <Annotation number={3} title="Task checklist" body="Tasks auto-populated from today's schedule. Checked by default. Unchecking removes from handoff. Simple, no drag-to-reorder complexity." color="#8B7EC8" />
          <Annotation number={4} title="Note from caregiver" body="Shows as quoted text, formatted differently. Feels personal, like a WhatsApp message. Italicized to signal it's human-written context." color="#F0B45A" />
          <Annotation number={5} title="Decline option" body="De-emphasized but always present. Label says 'let Sarah know' — frames declination as communication, not failure." color="#E5716A" />
        </div>
      </Canvas>

      <div style={{ marginTop: 24 }}>
        <RationaleCard items={[
          { label: "Handoff trigger", value: "From Today view or directly from medication" },
          { label: "Notification type", value: "Push + in-app — never email only" },
          { label: "Acceptance timeout", value: "30 min → auto-notify original caregiver" },
          { label: "Decline handling", value: "Original caregiver notified, tasks return to them" },
          { label: "Partial handoff", value: "Can hand off subset of tasks, keep others" },
          { label: "Audit trail", value: "All handoffs logged in Family Feed" },
        ]} />
      </div>
    </div>
  );
}
