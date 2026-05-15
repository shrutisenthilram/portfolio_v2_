import type { CaseStudy } from "../../components/case-study/types";
import { standardProjectCaseStudy } from "./standardProjectCaseStudy";

export const econResearch: Partial<CaseStudy> = {
  ...standardProjectCaseStudy("econ-research", "Econ Research"),
};
