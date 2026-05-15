import type { CaseStudy } from "../../components/case-study/types";
import { standardProjectCaseStudy } from "./standardProjectCaseStudy";

export const designFrontiersWebsite: Partial<CaseStudy> = {
  ...standardProjectCaseStudy("design-frontiers-website", "Design Frontiers Website"),
};
