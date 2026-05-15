import { PhoneFrame, TabBar, Annotation, SectionHeader, RationaleCard, Canvas, FlowArrow } from "./PhoneFrame";

function SupplyBar({ days, total = 30 }: { days: number; total?: number }) {
  const pct = Math.min(days / total, 1);
  const color = days <= 7 ? "#E5716A" : days <= 14 ? "#F0B45A" : "#68C47F";
  return (
    <div style={{ height: 6, borderRadius: 3, background: "#F2F2F7", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct * 100}%`, background: color, borderRadius: 3, transition: "width 0.3s" }} />
    </div>
  );
}

function RefillCard({ name, dose, days, pharmacy, canRequest }: {
  name: string; dose: string; days: number; pharmacy: string; canRequest: boolean;
}) {
  const color = days <= 7 ? "#E5716A" : days <= 14 ? "#F0B45A" : "#68C47F";
  const bg = days <= 7 ? "#FDEEED" : days <= 14 ? "#FEF4E2" : "#E8F8ED";
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: 16,
      padding: "14px 16px",
      marginBottom: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>{name}</div>
          <div style={{ fontSize: 11, color: "#8E8E93", marginTop: 1 }}>{dose} · {pharmacy}</div>
        </div>
        <div style={{ background: bg, borderRadius: 20, padding: "4px 10px" }}>
          <span style={{ fontSize: 11, color, fontWeight: 600 }}>{days}d left</span>
        </div>
      </div>
      <SupplyBar days={days} />
      {canRequest && (
        <div style={{
          marginTop: 10,
          height: 36,
          borderRadius: 10,
          border: "1.5px solid #4D9E8C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{ fontSize: 12, color: "#4D9E8C", fontWeight: 500 }}>Request Refill</span>
        </div>
      )}
    </div>
  );
}

function RefillsScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: 4 }}>Refills</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 14 }}>Margaret Reyes · 5 medications</div>

        {/* Summary banner */}
        <div style={{
          background: "#FEF4E2",
          borderRadius: 12, padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 16, border: "1px solid #F0B45A33",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F0B45A" }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#8A5E00" }}>2 medications need attention</div>
            <div style={{ fontSize: 10, color: "#C88A20" }}>Request now to avoid gaps in care</div>
          </div>
        </div>

        {/* Sort */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {["Needs refill", "All", "Ordered"].map((f, i) => (
            <div key={f} style={{
              padding: "5px 12px", borderRadius: 20,
              background: i === 0 ? "#1C1C1E" : "#F2F2F7",
              fontSize: 11, color: i === 0 ? "white" : "#6B6B7A", fontWeight: i === 0 ? 500 : 400,
            }}>{f}</div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
        <RefillCard name="Metformin" dose="500mg" days={5} pharmacy="CVS Oak St." canRequest={true} />
        <RefillCard name="Lisinopril" dose="10mg" days={8} pharmacy="CVS Oak St." canRequest={true} />
        <RefillCard name="Lipitor" dose="20mg" days={22} pharmacy="Walgreens Main" canRequest={false} />
        <RefillCard name="Aspirin" dose="81mg" days={45} pharmacy="CVS Oak St." canRequest={false} />
        <RefillCard name="Melatonin" dose="5mg" days={60} pharmacy="Amazon Pharmacy" canRequest={false} />
      </div>

      <TabBar active="refills" />
    </div>
  );
}

function RefillRequestScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Refills</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#1C1C1E", marginBottom: 4, letterSpacing: "-0.02em" }}>Request Refill</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 20 }}>Metformin 500mg · 5 days remaining</div>

        {/* Pharmacy selector */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Pharmacy</div>
          {[
            { name: "CVS Pharmacy — Oak St.", addr: "0.3 mi · Ready in 2 hours", selected: true },
            { name: "Walgreens — Main St.", addr: "0.8 mi · Ready in 4 hours", selected: false },
          ].map(p => (
            <div key={p.name} style={{
              height: 60, borderRadius: 14,
              border: `1.5px solid ${p.selected ? "#4D9E8C" : "#E5E5EA"}`,
              background: p.selected ? "#E6F4F1" : "#FFFFFF",
              display: "flex", alignItems: "center", padding: "0 14px", gap: 10, marginBottom: 8,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{p.name}</div>
                <div style={{ fontSize: 10, color: "#8E8E93" }}>{p.addr}</div>
              </div>
              {p.selected && <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#4D9E8C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 9, color: "white" }}>✓</span>
              </div>}
            </div>
          ))}
        </div>

        {/* Delivery vs pickup */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Fulfillment</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Pick up", "Delivery"].map((o, i) => (
              <div key={o} style={{
                flex: 1, height: 44, borderRadius: 12,
                border: `1.5px solid ${i === 0 ? "#4D9E8C" : "#E5E5EA"}`,
                background: i === 0 ? "#E6F4F1" : "#FFFFFF",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 13, color: i === 0 ? "#4D9E8C" : "#8E8E93", fontWeight: i === 0 ? 500 : 400 }}>{o}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notify */}
        <div style={{
          background: "#FFFFFF", borderRadius: 14, padding: "12px 14px",
          border: "1.5px solid #E5E5EA", marginBottom: 20,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>Notify family</div>
            <div style={{ fontSize: 10, color: "#8E8E93" }}>Michael & Elena will be notified</div>
          </div>
          <div style={{ width: 40, height: 24, borderRadius: 12, background: "#4D9E8C", position: "relative" }}>
            <div style={{ position: "absolute", right: 3, top: 3, width: 18, height: 18, borderRadius: "50%", background: "white" }} />
          </div>
        </div>

        <div style={{
          height: 56, borderRadius: 16, background: "#4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 18px rgba(77,158,140,0.35)",
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Send Request</span>
        </div>
      </div>
    </div>
  );
}

function RefillStatusScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Refills</span>
      </div>
      <div style={{ flex: 1, padding: "12px 16px" }}>
        {/* Status */}
        <div style={{ textAlign: "center", paddingTop: 20, marginBottom: 24 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "#E6F4F1",
            margin: "0 auto 16px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 32 }}>📦</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E", marginBottom: 4 }}>Request Sent</div>
          <div style={{ fontSize: 12, color: "#8E8E93" }}>CVS Oak St. received your request</div>
        </div>

        {/* Timeline */}
        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          {[
            { label: "Refill requested", time: "12:32 PM", done: true },
            { label: "Pharmacy processing", time: "Est. 1:00 PM", done: false, active: true },
            { label: "Ready for pickup", time: "Est. 2:30 PM", done: false },
            { label: "Picked up", time: "—", done: false },
          ].map((step, i) => (
            <div key={step.label} style={{ display: "flex", gap: 12, marginBottom: i < 3 ? 16 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: step.done ? "#68C47F" : step.active ? "#4D9E8C" : "#E5E5EA",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {step.done && <span style={{ fontSize: 9, color: "white" }}>✓</span>}
                  {step.active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
                </div>
                {i < 3 && <div style={{ width: 2, flex: 1, background: step.done ? "#68C47F33" : "#E5E5EA", marginTop: 4, marginBottom: -10 }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: step.active ? 500 : 400, color: step.done || step.active ? "#1C1C1E" : "#AEAEB2" }}>{step.label}</div>
                <div style={{ fontSize: 11, color: "#AEAEB2", marginTop: 1 }}>{step.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RefillsPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1200 }}>
<SectionHeader
        tag="05 — Supply"
        title="Refill Management Workflow"
        description="Refill management uses a traffic-light system for supply levels — green, amber, red — but calibrated to be informative rather than alarming. The request flow is streamlined to 2 steps with smart defaults. Status tracking shows where the order is without requiring calls to the pharmacy."
        principle="Proactive, not reactive — surface low supply before it becomes a crisis"
      />

      <Canvas>
        <PhoneFrame label="Refill Board" subtitle="All medications + supply" scale={0.85}>
          <RefillsScreen />
        </PhoneFrame>

        <FlowArrow label="Tap request" />

        <PhoneFrame label="Refill Request" subtitle="Pharmacy + preferences" scale={0.85}>
          <RefillRequestScreen />
        </PhoneFrame>

        <FlowArrow label="Send request" />

        <PhoneFrame label="Order Status" subtitle="Real-time tracking" scale={0.85}>
          <RefillStatusScreen />
        </PhoneFrame>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-start", paddingTop: 30 }}>
          <Annotation number={1} title="Supply bars" body="Color-coded horizontal bars. Red = ≤7 days, Amber = 8–14 days, Green = 15+ days. Never shows percentage to avoid false precision anxiety." />
          <Annotation number={2} title="Needs attention banner" body="Amber summary card at top. 'Need attention' language vs. 'CRITICAL'. Shows count of meds needing refill. Appears only when count > 0." />
          <Annotation number={3} title="Pharmacy smart default" body="Most recently used pharmacy pre-selected. Distance shown to help caregivers plan trips. Ready-time estimate sets expectations." color="#8B7EC8" />
          <Annotation number={4} title="Status timeline" body="4-step order tracking. Active step highlighted in teal. Completed steps in green. Future steps in neutral gray — never alarming." color="#68C47F" />
        </div>
      </Canvas>

      <div style={{ marginTop: 24 }}>
        <RationaleCard items={[
          { label: "Refill trigger", value: "Automated alert at 14-day supply" },
          { label: "Color thresholds", value: "Red ≤7d, Amber 8–14d, Green 15d+" },
          { label: "Request steps", value: "2 — pharmacy select, fulfillment type" },
          { label: "Pharmacy memory", value: "Last used pharmacy auto-selected" },
          { label: "Family visibility", value: "All family can see refill status" },
          { label: "Insurance notes", value: "Insurance day limits surfaced in request flow" },
        ]} />
      </div>
    </div>
  );
}
