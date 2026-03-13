import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AllProjects } from "./pages/AllProjects";
import { CaseStudy } from "./pages/CaseStudy";
import { AboutPage } from "./pages/AboutPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { PaletteDemo } from "./pages/PaletteDemo";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: AboutPage },
      { path: "projects", Component: AllProjects },
      { path: "projects/:slug", Component: CaseStudy },
      { path: "playground", Component: PlaygroundPage },
      { path: "palette-demo", Component: PaletteDemo },
    ],
  },
]);