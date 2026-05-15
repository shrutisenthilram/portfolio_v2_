import { NavLink, Outlet, useLocation, Link } from "react-router";
import {
  Home, Map, CheckSquare, Users, Package,
  ArrowRightLeft, User, Tablet, Inbox, Bell, PlayCircle, Layers, ArrowLeft
} from "lucide-react";

const BASE = "/kin";

const NAV = [
  { label: "Design System", path: `${BASE}`, icon: Layers, tag: "00" },
  { label: "Navigation Map", path: `${BASE}/nav-map`, icon: Map, tag: "01" },
  { label: "Home Dashboard", path: `${BASE}/home`, icon: Home, tag: "02" },
  { label: "Med Confirmation", path: `${BASE}/med-confirmation`, icon: CheckSquare, tag: "03" },
  { label: "Family Feed", path: `${BASE}/family-feed`, icon: Users, tag: "04" },
  { label: "Refill Management", path: `${BASE}/refills`, icon: Package, tag: "05" },
  { label: "Task Handoff", path: `${BASE}/task-handoff`, icon: ArrowRightLeft, tag: "06" },
  { label: "Patient Profile", path: `${BASE}/patient-profile`, icon: User, tag: "07" },
  { label: "Companion App", path: `${BASE}/companion-app`, icon: Tablet, tag: "08" },
  { label: "Empty States", path: `${BASE}/empty-states`, icon: Inbox, tag: "09" },
  { label: "Notification Prefs", path: `${BASE}/notification-prefs`, icon: Bell, tag: "10" },
  { label: "Onboarding", path: `${BASE}/onboarding`, icon: PlayCircle, tag: "11" },
];

export function KinLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: "#0E0E0F", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" }}>
      {/* Sidebar */}
      <aside className="flex flex-col w-56 shrink-0 h-full overflow-y-auto" style={{ background: "#141416", borderRight: "1px solid #2A2A2E" }}>
        {/* Back link */}
        <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid #1E1E22" }}>
          <Link to="/projects/kin" style={{ display: "flex", alignItems: "center", gap: 6, color: "#555560", textDecoration: "none" }}>
            <ArrowLeft size={12} />
            <span style={{ fontSize: 11, letterSpacing: "0.02em" }}>Back to case study</span>
          </Link>
        </div>

        {/* Logo */}
        <div className="px-5 pt-4 pb-4" style={{ borderBottom: "1px solid #2A2A2E" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4D9E8C 0%, #3A7D6E 100%)" }}>
              <span style={{ color: "white", fontSize: 12, fontWeight: 600 }}>K</span>
            </div>
            <div>
              <div style={{ color: "#F5F5F7", fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}>Kin</div>
              <div style={{ color: "#6B6B7A", fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase" }}>Design System</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2">
          <div style={{ color: "#555560", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 12px 4px" }}>Frames</div>
          {NAV.map(({ label, path, icon: Icon, tag }) => {
            const isActive = location.pathname === path;
            return (
              <NavLink key={path} to={path}>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 transition-all"
                  style={{
                    background: isActive ? "rgba(77,158,140,0.15)" : "transparent",
                    color: isActive ? "#4D9E8C" : "#8E8E99",
                  }}>
                  <Icon size={13} strokeWidth={isActive ? 2 : 1.5} />
                  <span style={{ fontSize: 12, fontWeight: isActive ? 500 : 400 }}>{label}</span>
                  <span className="ml-auto" style={{ fontSize: 9, color: isActive ? "#4D9E8C" : "#444450", letterSpacing: "0.05em" }}>{tag}</span>
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid #2A2A2E" }}>
          <div style={{ color: "#444450", fontSize: 10 }}>v1.0 · iOS-first · May 2026</div>
        </div>
      </aside>

      {/* Main canvas */}
      <main className="flex-1 overflow-auto" style={{ background: "#F2EDE6" }}>
        <Outlet />
      </main>
    </div>
  );
}
