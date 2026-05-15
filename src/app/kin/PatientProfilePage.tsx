import { PhoneFrame, Annotation, SectionHeader, RationaleCard, Canvas } from "./PhoneFrame";

function PatientProfileScreen() {
  const tabs = ["Overview", "Meds", "Team", "Notes"];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Patients</span>
      </div>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #F0F8F6 0%, #FAFAF8 100%)",
        padding: "16px 16px 0",
        marginBottom: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 20,
            background: "#4D9E8C22",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #4D9E8C33",
          }}>
            <span style={{ fontSize: 24, fontWeight: 500, color: "#4D9E8C" }}>MR</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.01em" }}>Margaret Reyes</div>
            <div style={{ fontSize: 12, color: "#8E8E93" }}>DOB: March 14, 1948 · Age 78</div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <div style={{ background: "#E6F4F1", borderRadius: 20, padding: "2px 8px" }}>
                <span style={{ fontSize: 10, color: "#4D9E8C", fontWeight: 500 }}>5 meds</span>
              </div>
              <div style={{ background: "#EEF0F8", borderRadius: 20, padding: "2px 8px" }}>
                <span style={{ fontSize: 10, color: "#6B7AB8", fontWeight: 500 }}>3 caregivers</span>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#4D9E8C" }}>Edit</div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "2px solid #E5E5EA" }}>
          {tabs.map((t, i) => (
            <div key={t} style={{
              flex: 1, textAlign: "center", paddingBottom: 10,
              borderBottom: i === 0 ? "2px solid #4D9E8C" : "none",
              marginBottom: -2,
            }}>
              <span style={{ fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "#4D9E8C" : "#8E8E93" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overview content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {/* Vitals strip */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[
            { label: "Weight", value: "142 lbs" },
            { label: "Allergies", value: "Penicillin" },
            { label: "Blood type", value: "A+" },
          ].map(v => (
            <div key={v.label} style={{
              flex: 1, background: "#FFFFFF", borderRadius: 12, padding: "10px 8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)", textAlign: "center",
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>{v.value}</div>
              <div style={{ fontSize: 9, color: "#AEAEB2", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{v.label}</div>
            </div>
          ))}
        </div>

        {/* Conditions */}
        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "14px 16px", marginBottom: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Conditions</div>
          {["Type 2 Diabetes", "Hypertension", "High Cholesterol"].map((c) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4D9E8C" }} />
              <span style={{ fontSize: 13, color: "#1C1C1E" }}>{c}</span>
            </div>
          ))}
        </div>

        {/* Today's status */}
        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "14px 16px", marginBottom: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Today's Care</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, color: "#1C1C1E" }}>2 <span style={{ fontSize: 14, fontWeight: 400, color: "#8E8E93" }}>of 5 given</span></div>
              <div style={{ fontSize: 11, color: "#8E8E93" }}>Next: Lipitor at 12:00 PM</div>
            </div>
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="19" fill="none" stroke="#E5E5EA" strokeWidth="4" />
              <circle cx="24" cy="24" r="19" fill="none" stroke="#4D9E8C" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 19 * 0.4} ${2 * Math.PI * 19 * 0.6}`}
                strokeLinecap="round" transform="rotate(-90 24 24)" />
            </svg>
          </div>
        </div>

        {/* Emergency */}
        <div style={{ background: "#FDEEED", borderRadius: 14, padding: "12px 16px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#D64040", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Emergency Contact</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>Carlos Reyes (Son)</div>
          <div style={{ fontSize: 11, color: "#8E8E93", marginTop: 2 }}>+1 (555) 234-5678</div>
        </div>
      </div>
    </div>
  );
}

function MedListScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Margaret</span>
      </div>
      <div style={{ padding: "12px 16px 8px" }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E", marginBottom: 4 }}>Medications</div>
        <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 14 }}>5 active · Last updated by Dr. Kim</div>
        <div style={{
          height: 44, borderRadius: 12, background: "#F3F3F5",
          display: "flex", alignItems: "center", paddingLeft: 14, gap: 8, marginBottom: 12,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#AEAEB2" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <span style={{ fontSize: 13, color: "#AEAEB2" }}>Search medications</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
        {[
          { name: "Lisinopril", dose: "10mg", freq: "Once daily · 8:00 AM", rx: "Dr. Patel · Cardiology", supply: 25, color: "#68C47F" },
          { name: "Metformin", dose: "500mg", freq: "Twice daily · 8AM + 8PM", rx: "Dr. Kim · Endocrinology", supply: 5, color: "#E5716A" },
          { name: "Lipitor", dose: "20mg", freq: "Once daily · 12:00 PM", rx: "Dr. Kim · Cardiology", supply: 22, color: "#68C47F" },
          { name: "Aspirin", dose: "81mg", freq: "Once daily · 6:00 PM", rx: "Dr. Patel · Cardiology", supply: 45, color: "#68C47F" },
          { name: "Melatonin", dose: "5mg", freq: "Once daily · 9:00 PM", rx: "OTC · Sleep support", supply: 60, color: "#68C47F" },
        ].map(m => (
          <div key={m.name} style={{
            background: "#FFFFFF", borderRadius: 14, padding: "13px 14px",
            marginBottom: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>{m.name} {m.dose}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: m.color }} />
                <span style={{ fontSize: 10, color: "#8E8E93" }}>{m.supply}d</span>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#8E8E93" }}>{m.freq}</div>
            <div style={{ fontSize: 10, color: "#AEAEB2", marginTop: 2 }}>{m.rx}</div>
          </div>
        ))}

        <div style={{
          height: 48, borderRadius: 14, border: "1.5px dashed #4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 20,
        }}>
          <span style={{ fontSize: 18, color: "#4D9E8C" }}>+</span>
          <span style={{ fontSize: 13, color: "#4D9E8C", fontWeight: 500 }}>Add medication</span>
        </div>
      </div>
    </div>
  );
}

export function PatientProfilePage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1100 }}>
<SectionHeader
        tag="07 — Records"
        title="Patient Profile"
        description="The patient profile is the source of truth for care. Organized into 4 tabs: Overview (summary + emergency), Meds (active medications + supply), Team (caregivers), and Notes (clinical + personal). Designed to feel like a care card, not an electronic health record."
        principle="Care card, not EHR — human-first information hierarchy"
      />

      <Canvas>
        <PhoneFrame label="Overview Tab" subtitle="Summary + emergency info" scale={0.88}>
          <PatientProfileScreen />
        </PhoneFrame>

        <PhoneFrame label="Medications Tab" subtitle="Active meds + supply level" scale={0.88}>
          <MedListScreen />
        </PhoneFrame>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-start", paddingTop: 30 }}>
          <Annotation number={1} title="Patient header" body="Large avatar with initials. Age calculated from DOB — caregivers think in age, not birthdate. Two quick-glance badges: med count, caregiver count." />
          <Annotation number={2} title="Conditions list" body="Plain language, not ICD codes. 'Type 2 Diabetes' not 'E11.9'. Listed as bullets, not tags — readable in one pass." />
          <Annotation number={3} title="Today's care ring" body="Mini progress ring directly on profile. Clicking navigates to full Today view filtered to this patient. Keeps context clear." color="#8B7EC8" />
          <Annotation number={4} title="Emergency card" body="Shown in calm red background at bottom of overview. Not prominent but immediately locatable in an emergency. One-tap to call." color="#E5716A" />
          <Annotation number={5} title="Med supply dots" body="Colored dot next to each med shows supply at a glance. Clicking a med opens full detail + refill request. Add med button always visible." color="#F0B45A" />
        </div>
      </Canvas>

      <div style={{ marginTop: 24 }}>
        <RationaleCard items={[
          { label: "Tab structure", value: "Overview / Meds / Team / Notes" },
          { label: "Photo privacy", value: "No patient photos — initials avatar only" },
          { label: "Edit permissions", value: "Only primary caregiver can edit patient info" },
          { label: "Med add flow", value: "Scan pill bottle → auto-fill (coming soon)" },
          { label: "Emergency access", value: "Emergency card accessible from lock screen via widget" },
          { label: "Multi-patient", value: "Up to 3 patients per family account" },
        ]} />
      </div>
    </div>
  );
}
