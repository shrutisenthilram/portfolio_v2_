import type { CaseStudy } from "../../components/case-study/types";
import { standardProjectCaseStudy } from "./standardProjectCaseStudy";

export const portfolioDesign: Partial<CaseStudy> = {
  ...standardProjectCaseStudy("portfolio-design", "Portfolio Design"),
};
