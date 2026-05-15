import type { CaseStudy } from "../../components/case-study/types";
import { standardProjectCaseStudy } from "./standardProjectCaseStudy";

export const developForGood: Partial<CaseStudy> = {
  ...standardProjectCaseStudy("develop-for-good", "Develop for Good"),
};
