import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AllProjects } from "./pages/AllProjects";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectCaseStudyPage } from "./pages/ProjectCaseStudyPage";
import { AboutPage } from "./pages/AboutPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { PaletteDemo } from "./pages/PaletteDemo";
import { KinLayout } from "./kin/KinLayout";
import { DesignSystemPage } from "./kin/DesignSystemPage";
import { NavigationMapPage } from "./kin/NavigationMapPage";
import { HomeDashboardPage } from "./kin/HomeDashboardPage";
import { MedConfirmationPage } from "./kin/MedConfirmationPage";
import { FamilyFeedPage } from "./kin/FamilyFeedPage";
import { RefillsPage } from "./kin/RefillsPage";
import { TaskHandoffPage } from "./kin/TaskHandoffPage";
import { PatientProfilePage } from "./kin/PatientProfilePage";
import { CompanionAppPage } from "./kin/CompanionAppPage";
import { EmptyStatesPage } from "./kin/EmptyStatesPage";
import { NotificationPrefsPage } from "./kin/NotificationPrefsPage";
import { OnboardingPage } from "./kin/OnboardingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: AboutPage },
      { path: "projects", Component: AllProjects },
      { path: "projects/:slug", Component: ProjectDetailPage },
      { path: "projects/:slug/case-study", Component: ProjectCaseStudyPage },
      { path: "playground", Component: PlaygroundPage },
      { path: "palette-demo", Component: PaletteDemo },
    ],
  },
  {
    path: "/kin",
    Component: KinLayout,
    children: [
      { index: true, Component: DesignSystemPage },
      { path: "nav-map", Component: NavigationMapPage },
      { path: "home", Component: HomeDashboardPage },
      { path: "med-confirmation", Component: MedConfirmationPage },
      { path: "family-feed", Component: FamilyFeedPage },
      { path: "refills", Component: RefillsPage },
      { path: "task-handoff", Component: TaskHandoffPage },
      { path: "patient-profile", Component: PatientProfilePage },
      { path: "companion-app", Component: CompanionAppPage },
      { path: "empty-states", Component: EmptyStatesPage },
      { path: "notification-prefs", Component: NotificationPrefsPage },
      { path: "onboarding", Component: OnboardingPage },
    ],
  },
]);