import { PhoneFrame, Annotation, SectionHeader, RationaleCard, Canvas, FlowArrow } from "./PhoneFrame";

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 14 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 6,
          width: i === current ? 20 : 6,
          borderRadius: 3,
          background: i === current ? "#4D9E8C" : "#E5E5EA",
          transition: "width 0.3s, background 0.3s",
        }} />
      ))}
    </div>
  );
}

function OnboardScreen1() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px" }}>
      {/* Logo */}
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div style={{
          width: 80, height: 80, borderRadius: 24,
          background: "linear-gradient(135deg, #4D9E8C 0%, #3A7D6E 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
          boxShadow: "0 12px 36px rgba(77,158,140,0.35)",
        }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: "white" }}>K</span>
        </div>
        <div style={{ fontSize: 28, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.03em", marginBottom: 8 }}>Welcome to Kin</div>
        <div style={{ fontSize: 14, color: "#8E8E93", lineHeight: 1.6, textAlign: "center" }}>
          Caring for someone you love,<br />together. Calmly.
        </div>
      </div>

      {/* Feature pills */}
      <div style={{ width: "100%", marginBottom: 36 }}>
        {[
          { icon: "💊", title: "Track every dose", sub: "Never lose track of what's been given" },
          { icon: "👨‍👩‍👧", title: "Share with family", sub: "Coordinate care across your whole team" },
          { icon: "📦", title: "Manage refills", sub: "Never run out unexpectedly" },
        ].map(f => (
          <div key={f.title} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "12px 0", borderBottom: "1px solid #F2F2F7",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "#E6F4F1",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 18 }}>{f.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>{f.title}</div>
              <div style={{ fontSize: 11, color: "#8E8E93" }}>{f.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: "100%" }}>
        <div style={{
          height: 56, borderRadius: 16, background: "#4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 18px rgba(77,158,140,0.35)", marginBottom: 10,
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Get started</span>
        </div>
        <div style={{ height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 13, color: "#8E8E93" }}>Already have an account? Sign in</span>
        </div>
      </div>
    </div>
  );
}

function OnboardScreen2() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Back</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: 4 }}>
          Who are you caring for?
        </div>
        <div style={{ fontSize: 13, color: "#8E8E93", marginBottom: 24, lineHeight: 1.5 }}>
          Add your loved one's basic info. You can always update this later.
        </div>

        {/* Form fields */}
        {[
          { label: "Full name", placeholder: "e.g., Margaret Reyes" },
          { label: "Date of birth", placeholder: "MM / DD / YYYY" },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#6B6B7A", marginBottom: 6 }}>{f.label}</div>
            <div style={{
              height: 52, borderRadius: 12, background: "#F3F3F5",
              border: "1.5px solid #E5E5EA",
              display: "flex", alignItems: "center", padding: "0 14px",
            }}>
              <span style={{ fontSize: 14, color: "#AEAEB2" }}>{f.placeholder}</span>
            </div>
          </div>
        ))}

        {/* Relationship */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#6B6B7A", marginBottom: 8 }}>Your relationship</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Parent", "Spouse", "Child", "Sibling", "Other"].map((r, i) => (
              <div key={r} style={{
                padding: "8px 14px", borderRadius: 20,
                background: i === 0 ? "#E6F4F1" : "#F2F2F7",
                border: `1.5px solid ${i === 0 ? "#4D9E8C" : "#E5E5EA"}`,
              }}>
                <span style={{ fontSize: 13, color: i === 0 ? "#4D9E8C" : "#6B6B7A", fontWeight: i === 0 ? 500 : 400 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Photo optional */}
        <div style={{
          height: 48, borderRadius: 12, border: "1.5px dashed #4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24,
        }}>
          <span style={{ fontSize: 14, color: "#4D9E8C" }}>+</span>
          <span style={{ fontSize: 13, color: "#4D9E8C" }}>Add photo (optional)</span>
        </div>

        <div style={{
          height: 56, borderRadius: 16, background: "#4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 18px rgba(77,158,140,0.35)",
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Continue →</span>
        </div>

        <ProgressDots current={1} total={5} />
      </div>
    </div>
  );
}

function OnboardScreen3() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Back</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: 4 }}>
          Add their medications
        </div>
        <div style={{ fontSize: 13, color: "#8E8E93", marginBottom: 20 }}>
          Start with the most important ones. You can add more anytime.
        </div>

        {/* Added meds */}
        {[
          { name: "Lisinopril 10mg", freq: "8:00 AM daily" },
          { name: "Metformin 500mg", freq: "8:00 AM + 8:00 PM" },
        ].map(m => (
          <div key={m.name} style={{
            height: 56, borderRadius: 14, background: "#FFFFFF",
            border: "1.5px solid #E5E5EA",
            display: "flex", alignItems: "center", padding: "0 14px", gap: 10, marginBottom: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#68C47F", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{m.name}</div>
              <div style={{ fontSize: 11, color: "#8E8E93" }}>{m.freq}</div>
            </div>
            <span style={{ fontSize: 18, color: "#AEAEB2" }}>×</span>
          </div>
        ))}

        <div style={{
          height: 52, borderRadius: 14, border: "1.5px dashed #4D9E8C",
          display: "flex", alignItems: "center", padding: "0 14px", gap: 10, marginBottom: 20,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "#E6F4F1",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 14, color: "#4D9E8C" }}>+</span>
          </div>
          <span style={{ fontSize: 13, color: "#4D9E8C" }}>Add another medication</span>
        </div>

        {/* Scan option */}
        <div style={{
          background: "#F0F8F6", borderRadius: 14, padding: "12px 14px",
          display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
          border: "1px solid #C8E8E3",
        }}>
          <span style={{ fontSize: 22 }}>📷</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#3A7D6E" }}>Scan pill bottle</div>
            <div style={{ fontSize: 11, color: "#4D9E8C" }}>Auto-fill name, dose, and instructions</div>
          </div>
        </div>

        <div style={{
          height: 56, borderRadius: 16, background: "#4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 18px rgba(77,158,140,0.35)",
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Continue →</span>
        </div>

        <ProgressDots current={2} total={5} />
      </div>
    </div>
  );
}

function OnboardScreen4() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 0" }}>
        <span style={{ fontSize: 13, color: "#4D9E8C" }}>‹ Back</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#1C1C1E", letterSpacing: "-0.02em", marginBottom: 4 }}>
          Invite your care team
        </div>
        <div style={{ fontSize: 13, color: "#8E8E93", marginBottom: 20, lineHeight: 1.5 }}>
          Share care responsibilities with family. Everyone stays in the loop.
        </div>

        {/* Invite input */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#6B6B7A", marginBottom: 6 }}>Invite by phone or email</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{
              flex: 1, height: 48, borderRadius: 12, background: "#F3F3F5",
              border: "1.5px solid #4D9E8C",
              display: "flex", alignItems: "center", padding: "0 14px",
            }}>
              <span style={{ fontSize: 13, color: "#AEAEB2" }}>Email or phone number</span>
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: "#4D9E8C",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 16, color: "white" }}>→</span>
            </div>
          </div>
        </div>

        {/* Suggested from contacts */}
        <div style={{ fontSize: 11, fontWeight: 600, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Suggested</div>
        {[
          { name: "Michael Johnson", sub: "Son · michael@email.com", invited: false },
          { name: "Elena Kim", sub: "Niece · elena@email.com", invited: true },
        ].map(c => (
          <div key={c.name} style={{
            height: 56, borderRadius: 12, background: "#FFFFFF",
            border: "1.5px solid #E5E5EA",
            display: "flex", alignItems: "center", padding: "0 14px", gap: 12, marginBottom: 8,
          }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F2F2F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, color: "#8E8E93" }}>{c.name[0]}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#8E8E93" }}>{c.sub}</div>
            </div>
            {c.invited ? (
              <div style={{ background: "#E8F8ED", borderRadius: 20, padding: "3px 10px" }}>
                <span style={{ fontSize: 11, color: "#68C47F", fontWeight: 500 }}>Invited</span>
              </div>
            ) : (
              <div style={{ background: "#8B7EC8", borderRadius: 20, padding: "4px 10px" }}>
                <span style={{ fontSize: 11, color: "white", fontWeight: 500 }}>Invite</span>
              </div>
            )}
          </div>
        ))}

        <div style={{
          height: 44, borderRadius: 12, border: "none",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
        }}>
          <span style={{ fontSize: 13, color: "#8E8E93" }}>Skip for now</span>
        </div>

        <div style={{
          height: 56, borderRadius: 16, background: "#4D9E8C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 18px rgba(77,158,140,0.35)",
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Continue →</span>
        </div>

        <ProgressDots current={3} total={5} />
      </div>
    </div>
  );
}

function OnboardScreen5() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px" }}>
      <div style={{
        width: 96, height: 96, borderRadius: 30,
        background: "linear-gradient(135deg, #E6F4F1 0%, #C8E8E3 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 24,
        boxShadow: "0 8px 30px rgba(77,158,140,0.15)",
      }}>
        <span style={{ fontSize: 44 }}>🌿</span>
      </div>

      <div style={{ fontSize: 26, fontWeight: 500, color: "#1C1C1E", textAlign: "center", marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        You're all set,<br />Sarah
      </div>
      <div style={{ fontSize: 13, color: "#8E8E93", textAlign: "center", lineHeight: 1.6, marginBottom: 36, maxWidth: 220 }}>
        Margaret's care is now organized and shared with your team. Kin will keep everyone in sync.
      </div>

      {/* Summary */}
      <div style={{ width: "100%", background: "#FFFFFF", borderRadius: 16, padding: "14px 16px", marginBottom: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
        {[
          { emoji: "👤", label: "Patient added", value: "Margaret Reyes" },
          { emoji: "💊", label: "Medications", value: "2 added · add more anytime" },
          { emoji: "👨‍👩‍👧", label: "Family invited", value: "1 invitation sent" },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 10, borderBottom: "1px solid #F2F2F7", marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>{s.emoji}</span>
            <div>
              <div style={{ fontSize: 11, color: "#AEAEB2" }}>{s.label}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{s.value}</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#68C47F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 9, color: "white" }}>✓</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        height: 56, width: "100%", borderRadius: 16, background: "#4D9E8C",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 6px 18px rgba(77,158,140,0.35)",
      }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>Open Kin →</span>
      </div>
    </div>
  );
}

export function OnboardingPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1400 }}>
<SectionHeader
        tag="11 — First Run"
        title="Onboarding Flow"
        description="Kin's onboarding is 5 steps: welcome, add patient, add medications, invite family, celebrate completion. Each step has a single clear goal. 'Skip for now' is available on every optional step. The final screen is a moment of genuine warmth — the beginning of a new, better way to care."
        principle="5 steps, one decision each — never backtrack, never overwhelm"
      />

      <div style={{ overflowX: "auto", paddingBottom: 16 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", minWidth: "fit-content" }}>
          <PhoneFrame label="1 — Welcome" subtitle="Brand + value prop" scale={0.82}>
            <OnboardScreen1 />
          </PhoneFrame>

          <FlowArrow label="Get started" />

          <PhoneFrame label="2 — Add Patient" subtitle="Name, DOB, relationship" scale={0.82}>
            <OnboardScreen2 />
          </PhoneFrame>

          <FlowArrow label="Continue" />

          <PhoneFrame label="3 — Add Medications" subtitle="Scan or type manually" scale={0.82}>
            <OnboardScreen3 />
          </PhoneFrame>

          <FlowArrow label="Continue" />

          <PhoneFrame label="4 — Invite Family" subtitle="Phone or email" scale={0.82}>
            <OnboardScreen4 />
          </PhoneFrame>

          <FlowArrow label="Continue" />

          <PhoneFrame label="5 — You're set!" subtitle="Summary + celebration" scale={0.82}>
            <OnboardScreen5 />
          </PhoneFrame>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-start", paddingTop: 30, minWidth: 220, flexShrink: 0 }}>
            <Annotation number={1} title="Value-first welcome" body="Three benefit pills below the logo. Short, human copy. No lengthy legal disclaimers on first screen. Privacy link available but not prominent." />
            <Annotation number={2} title="Relationship chips" body="Quick-tap relationship selector vs a dropdown. 5 options cover 95% of cases. Pre-selects 'Parent' based on most common use case." />
            <Annotation number={3} title="Bottle scan CTA" body="Pill bottle scanning shows Kin's power without being required. Secondary option positioned after manual adds — shows the feature after user is engaged." color="#8B7EC8" />
            <Annotation number={4} title="Skip for now" body="Available on medications (2+) and family invite. Never on patient name or DOB — those are required. De-emphasized, always present." color="#F0B45A" />
            <Annotation number={5} title="Celebration end screen" body="Not confetti — a plant emoji + warm name. 'You're all set, Sarah' is personal. Summary confirms what was done. One CTA: open the app." color="#68C47F" />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <RationaleCard items={[
          { label: "Total steps", value: "5 — Welcome, Patient, Meds, Family, Done" },
          { label: "Required steps", value: "Steps 1 + 2 (patient name + DOB)" },
          { label: "Optional steps", value: "Photo, additional meds, family invite" },
          { label: "Completion rate target", value: "> 80% completion through step 4" },
          { label: "Scan feature", value: "Available on iOS 16+ via VisionKit OCR" },
          { label: "Post-onboarding", value: "Tutorial tooltip series runs for first 3 sessions" },
        ]} />
      </div>
    </div>
  );
}
