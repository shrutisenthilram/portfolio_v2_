import type { CaseStudy } from "../../components/case-study/types";
import { standardProjectCaseStudy } from "./standardProjectCaseStudy";

export const csesTritonspend: Partial<CaseStudy> = {
  ...standardProjectCaseStudy("cses-tritonspend", "CSES TritonSpend"),
};
