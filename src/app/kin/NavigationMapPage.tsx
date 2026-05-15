import { SectionHeader, RationaleCard } from "./PhoneFrame";

const TEAL = "#4D9E8C";
const PURPLE = "#8B7EC8";
const AMBER = "#F0B45A";

function Node({
  x, y, label, sub, color = TEAL, w = 120, h = 56,
}: {
  x: number; y: number; label: string; sub?: string;
  color?: string; w?: number; h?: number;
}) {
  return (
    <g transform={`translate(${x - w / 2}, ${y - h / 2})`}>
      <rect width={w} height={h} rx={12} fill={color + "18"} stroke={color} strokeWidth={1.5} />
      <text x={w / 2} y={sub ? h / 2 - 4 : h / 2 + 5} textAnchor="middle"
        fontSize={12} fontWeight={600} fill={color} fontFamily="system-ui">
        {label}
      </text>
      {sub && (
        <text x={w / 2} y={h / 2 + 13} textAnchor="middle"
          fontSize={9} fill={color + "99"} fontFamily="system-ui">
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, label, color = "#AEAEB2" }: {
  x1: number; y1: number; x2: number; y2: number; label?: string; color?: string;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <defs>
        <marker id={`arrow-${x1}-${x2}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={color} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth={1.5}
        markerEnd={`url(#arrow-${x1}-${x2})`}
        strokeDasharray={label ? "none" : "none"}
      />
      {label && (
        <text x={mx} y={my - 5} textAnchor="middle" fontSize={9} fill={color + "CC"} fontFamily="system-ui">
          {label}
        </text>
      )}
    </g>
  );
}

function Dot({ x, y, color = TEAL }: { x: number; y: number; color?: string }) {
  return <circle cx={x} cy={y} r={4} fill={color} />;
}

export function NavigationMapPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1100 }}>
<SectionHeader
        tag="01 — Architecture"
        title="Navigation Map"
        description="The Kin information architecture is organized around 'Today' as the primary mental model. Caregivers think in days, not in patient records. The tab bar keeps core contexts always accessible with minimal navigation depth."
        principle="Shallow depth — no screen more than 3 taps from Home"
      />

      {/* Navigation Flow Diagram */}
      <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 24 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", marginBottom: 20, letterSpacing: "-0.01em" }}>App Information Architecture</h2>
        <div style={{ overflowX: "auto" }}>
          <svg width="980" height="600" style={{ minWidth: 980 }}>
            {/* Launch */}
            <Node x={490} y={40} label="Launch" sub="Splash + Auth" color="#8E8E93" w={100} h={44} />

            {/* Onboarding */}
            <Node x={200} y={40} label="Onboarding" sub="First-run only" color={AMBER} w={120} h={44} />
            <Arrow x1={260} y1={40} x2={430} y2={40} label="complete" color={AMBER} />

            {/* Tab Bar */}
            <rect x={90} y={110} width={800} height={60} rx={14} fill="#F2F2F7" stroke="#E5E5EA" strokeWidth={1} />
            <text x={490} y={128} textAnchor="middle" fontSize={9} fill="#8E8E93" fontFamily="system-ui" fontWeight={600} letterSpacing={2}>TAB BAR NAVIGATION</text>

            {/* Tab Nodes */}
            <Node x={160} y={140} label="Home" sub="Today" color={TEAL} w={110} h={44} />
            <Node x={310} y={140} label="Patients" sub="Records" color={TEAL} w={110} h={44} />
            <Node x={490} y={140} label="Family" sub="Team" color={PURPLE} w={110} h={44} />
            <Node x={670} y={140} label="Refills" sub="Supply" color={AMBER} w={110} h={44} />
            <Node x={820} y={140} label="Settings" sub="Prefs" color="#8E8E93" w={110} h={44} />

            {/* Home Children */}
            <text x={100} y={230} fontSize={9} fill="#8E8E93" fontFamily="system-ui" fontWeight={600} letterSpacing={2}>HOME FLOWS</text>
            <Arrow x1={160} y1={162} x2={100} y2={250} color={TEAL} />
            <Arrow x1={160} y1={162} x2={220} y2={250} color={TEAL} />
            <Arrow x1={160} y1={162} x2={340} y2={250} color={TEAL} />

            <Node x={100} y={270} label="Med Detail" sub="Dose history" color={TEAL} w={115} h={44} />
            <Node x={220} y={270} label="Confirm Med" sub="Who/When" color={TEAL} w={115} h={44} />
            <Node x={340} y={270} label="Task Handoff" sub="Delegate" color={TEAL} w={115} h={44} />

            {/* Med Confirm Children */}
            <Arrow x1={220} y1={292} x2={220} y2={355} color={TEAL} />
            <Node x={220} y={375} label="Confirm Modal" sub="Review + Send" color={TEAL} w={120} h={44} />
            <Arrow x1={220} y1={397} x2={220} y2={440} color={TEAL} />
            <Node x={220} y={460} label="Success State" sub="Next med" color="#68C47F" w={120} h={44} />

            {/* Task Handoff Children */}
            <Arrow x1={340} y1={292} x2={340} y2={355} color={TEAL} />
            <Node x={340} y={375} label="Select Person" sub="Family member" color={PURPLE} w={120} h={44} />
            <Arrow x1={340} y1={397} x2={340} y2={440} color={PURPLE} />
            <Node x={340} y={460} label="Add Note" sub="Optional context" color={PURPLE} w={120} h={44} />

            {/* Patients Children */}
            <text x={460} y={230} fontSize={9} fill="#8E8E93" fontFamily="system-ui" fontWeight={600} letterSpacing={2}>PATIENT FLOWS</text>
            <Arrow x1={310} y1={162} x2={490} y2={250} color={TEAL} />
            <Arrow x1={310} y1={162} x2={580} y2={250} color={TEAL} />

            <Node x={490} y={270} label="Patient List" sub="All patients" color={TEAL} w={115} h={44} />
            <Node x={580} y={375} label="Patient Profile" sub="Overview" color={TEAL} w={115} h={44} />
            <Arrow x1={490} y1={292} x2={580} y2={355} color={TEAL} />
            <Arrow x1={580} y1={397} x2={580} y2={440} color={TEAL} />
            <Node x={580} y={460} label="Edit Patient" sub="Meds/Info" color={TEAL} w={115} h={44} />

            {/* Family Children */}
            <text x={640} y={230} fontSize={9} fill="#8E8E93" fontFamily="system-ui" fontWeight={600} letterSpacing={2}>FAMILY FLOWS</text>
            <Arrow x1={490} y1={162} x2={720} y2={250} color={PURPLE} />
            <Arrow x1={490} y1={162} x2={820} y2={250} color={PURPLE} />

            <Node x={720} y={270} label="Activity Feed" sub="Timeline" color={PURPLE} w={115} h={44} />
            <Node x={820} y={270} label="Members" sub="Invite/Manage" color={PURPLE} w={115} h={44} />
            <Arrow x1={820} y1={292} x2={820} y2={355} color={PURPLE} />
            <Node x={820} y={375} label="Member Detail" sub="Role/Access" color={PURPLE} w={115} h={44} />

            {/* Refills Children */}
            <Arrow x1={670} y1={162} x2={670} y2={250} color={AMBER} />
            <Node x={670} y={270} label="Supply Board" sub="All meds" color={AMBER} w={115} h={44} />
            <Arrow x1={670} y1={292} x2={670} y2={355} color={AMBER} />
            <Node x={670} y={375} label="Refill Request" sub="Pharmacy" color={AMBER} w={115} h={44} />
            <Arrow x1={670} y1={397} x2={670} y2={440} color={AMBER} />
            <Node x={670} y={460} label="Order Status" sub="Track" color={AMBER} w={115} h={44} />

            {/* Settings */}
            <Arrow x1={820} y1={162} x2={920} y2={250} color="#8E8E93" />
            <Node x={920} y={270} label="Notif. Prefs" sub="Quiet hours" color="#8E8E93" w={115} h={44} />
            <Arrow x1={920} y1={292} x2={920} y2={355} color="#8E8E93" />
            <Node x={920} y={375} label="Accessibility" sub="Type/Motion" color="#8E8E93" w={115} h={44} />

            {/* Legend */}
            <rect x={20} y={520} width={940} height={60} rx={10} fill="#F8F7F5" stroke="#E5E5EA" strokeWidth={1} />
            <Dot x={50} y={550} color={TEAL} />
            <text x={62} y={554} fontSize={10} fill="#6B6B7A" fontFamily="system-ui">Core Care Flows</text>
            <Dot x={170} y={550} color={PURPLE} />
            <text x={182} y={554} fontSize={10} fill="#6B6B7A" fontFamily="system-ui">Family & Social</text>
            <Dot x={290} y={550} color={AMBER} />
            <text x={302} y={554} fontSize={10} fill="#6B6B7A" fontFamily="system-ui">Refill & Supply</text>
            <Dot x={410} y={550} color="#8E8E93" />
            <text x={422} y={554} fontSize={10} fill="#6B6B7A" fontFamily="system-ui">System & Settings</text>
            <Dot x={530} y={550} color="#68C47F" />
            <text x={542} y={554} fontSize={10} fill="#6B6B7A" fontFamily="system-ui">Success / Resolution States</text>
          </svg>
        </div>
      </div>

      {/* User Flow Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          {
            title: "Primary Caregiver Flow",
            color: TEAL,
            steps: [
              "1. Open app → Today view",
              "2. See medication schedule at a glance",
              "3. Tap med → Confirm given",
              "4. Check family activity",
              "5. Review refill status",
            ],
          },
          {
            title: "Family Member Flow",
            color: PURPLE,
            steps: [
              "1. Receive task handoff notification",
              "2. Open Kin → Accept task",
              "3. Give medication → Confirm",
              "4. Log note for primary caregiver",
              "5. View full activity feed",
            ],
          },
          {
            title: "Patient Companion Flow",
            color: AMBER,
            steps: [
              "1. Open companion app (simplified)",
              "2. See today's medications large",
              "3. Optionally self-confirm",
              "4. Call caregiver with one tap",
              "5. See who is on duty today",
            ],
          },
        ].map(f => (
          <div key={f.title} style={{
            background: "#FFFFFF",
            borderRadius: 12,
            padding: "16px 18px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            borderTop: `3px solid ${f.color}`,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E", marginBottom: 12 }}>{f.title}</div>
            {f.steps.map(s => (
              <div key={s} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: f.color, marginTop: 5, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#6B6B7A", lineHeight: 1.4 }}>{s}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <RationaleCard items={[
        { label: "Max nav depth", value: "3 levels from any tab" },
        { label: "Primary entry", value: "Home (Today) — always first" },
        { label: "Global actions", value: "Confirm med accessible from any screen" },
        { label: "Back navigation", value: "iOS native back gestures preserved" },
        { label: "Deep links", value: "Notifications open directly to relevant screen" },
        { label: "State persistence", value: "Scroll position + draft preserved on tab switch" },
      ]} />
    </div>
  );
}
