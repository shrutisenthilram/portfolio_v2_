import type { CaseStudy } from "../../components/case-study/types";
import { projectCaseStudyFull } from "../projectImages";

export const votingLiteracy: Partial<CaseStudy> = {
  client: "Academic · Civic Tech",
  tagline: "The most accessible way to learn about candidates and cast your vote.",
  meta: {
    role: "UX/UI Designer",
    timeline: "8 weeks · 2025",
    team: "3 designers",
    stack: ["Figma", "Miro", "Notion"],
    platform: "Mobile · Web",
  },
  fullCaseStudyBoard: {
    src: projectCaseStudyFull("voting-literacy"),
    alt: "Vote Smart — full case study",
  },
};
