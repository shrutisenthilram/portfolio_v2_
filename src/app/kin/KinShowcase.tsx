import { DesignSystemPage } from "./DesignSystemPage";
import { NavigationMapPage } from "./NavigationMapPage";
import { HomeDashboardPage } from "./HomeDashboardPage";
import { MedConfirmationPage } from "./MedConfirmationPage";
import { FamilyFeedPage } from "./FamilyFeedPage";
import { RefillsPage } from "./RefillsPage";
import { TaskHandoffPage } from "./TaskHandoffPage";
import { PatientProfilePage } from "./PatientProfilePage";
import { CompanionAppPage } from "./CompanionAppPage";
import { EmptyStatesPage } from "./EmptyStatesPage";
import { NotificationPrefsPage } from "./NotificationPrefsPage";
import { OnboardingPage } from "./OnboardingPage";

const SECTIONS = [
  DesignSystemPage,
  NavigationMapPage,
  HomeDashboardPage,
  MedConfirmationPage,
  FamilyFeedPage,
  RefillsPage,
  TaskHandoffPage,
  PatientProfilePage,
  CompanionAppPage,
  EmptyStatesPage,
  NotificationPrefsPage,
  OnboardingPage,
];

export function KinShowcase() {
  return (
    <div
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif",
        background: "#F2EDE6",
      }}
    >
      {SECTIONS.map((Page, i) => (
        <div
          key={i}
          style={{
            borderTop: i > 0 ? "1px solid rgba(0,0,0,0.08)" : undefined,
          }}
        >
          <Page />
        </div>
      ))}
    </div>
  );
}
