import { BriefcaseBusiness, GraduationCap, Trophy } from "lucide-react";
import type { Icon } from "../types";

export type TimelineItem = {
  icon: Icon;
  logo: string;
  date: string;
  role: string;
  org: string;
  text: string;
};

export const timeline: Array<TimelineItem> = [
  {
    icon: BriefcaseBusiness,
    logo: "/brand/stayvera-symbol.webp",
    date: "Mar 2026 - now",
    role: "Technical Co-Founder",
    org: "Stayvera Inc.",
    text: "Building the product side of an AI-native booking platform for modern group travel: host onboarding, guest flows, property intelligence, and the small details that make trips feel effortless.",
  },
  {
    icon: Trophy,
    logo: "/brand/cloudflight-coding-contest.webp",
    date: "Nov 2025",
    role: "1st place, Cloudflight Coding Contest Vienna",
    org: "41st Classic CCC",
    text: "Won the Vienna site, placed 5th globally among more than 2400 participants, and built custom LLM agents to support contest solutions.",
  },
  {
    icon: BriefcaseBusiness,
    logo: "/brand/cloudflight.webp",
    date: "Jul 2025",
    role: "Software Engineering Intern",
    org: "Cloudflight",
    text: "Independently led a research project around machine learning for geographic and time-based event clustering, with a React visualization, local LLM hosting, and LLM-powered event classification.",
  },
  {
    icon: BriefcaseBusiness,
    logo: "/brand/cloudflight.webp",
    date: "Aug 2024",
    role: "Software Engineering Intern",
    org: "Cloudflight",
    text: "Worked on a customer-facing logistics service portal with Angular and Java/Spring, and wrote end-to-end Cypress tests in TypeScript. Youngest intern at Cloudflight, and the only intern not coming from university or a specialized technical school.",
  },
  {
    icon: GraduationCap,
    logo: "/brand/keimgasse.webp",
    date: "2018 - 2026",
    role: "High school",
    org: "BG/BRG Keimgasse Mödling",
    text: "Completed the Austrian Matura with an average grade of 1.4 (1 is the best in Austria)",
  },
];
