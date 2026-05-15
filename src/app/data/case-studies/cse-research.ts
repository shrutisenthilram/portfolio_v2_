import type { CaseStudy } from "../../components/case-study/types";
import { standardProjectCaseStudy } from "./standardProjectCaseStudy";

export const cseResearch: Partial<CaseStudy> = {
  ...standardProjectCaseStudy("cse-research", "CSE Research"),
};
