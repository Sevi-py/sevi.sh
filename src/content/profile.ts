import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import {
  SiExpo,
  SiGithub,
  SiPnpm,
  SiPytorch,
  SiSelenium,
  SiTypescript,
} from "react-icons/si";
import type { Icon } from "../types";

export type SocialLink = {
  label: string;
  href: string;
  icon: Icon;
  color: string;
};

export type Tool = {
  name: string;
  icon?: Icon;
  logo?: string;
  color?: string;
};

export const socials: Array<SocialLink> = [
  { label: "GitHub", href: "https://github.com/Sevi-py", icon: SiGithub, color: "#ffffff" },
  { label: "Twitter", href: "https://x.com/evverin", icon: FaTwitter, color: "#1da1f2" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/severin-hilbert/",
    icon: FaLinkedinIn,
    color: "#0a66c2",
  },
];

export const tools: Array<Tool> = [
  { name: "Python", logo: "/brand/python.svg" },
  { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
  { name: "Selenium", icon: SiSelenium, color: "#43b02a" },
  { name: "Convex", logo: "/brand/convex.svg" },
  { name: "pnpm", icon: SiPnpm, color: "#f69220" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "TanStack", logo: "/brand/tanstack.svg" },
  { name: "Coolify", logo: "/brand/coolify.svg" },
  { name: "Expo", icon: SiExpo, color: "#ffffff" },
  { name: "Codex", logo: "/brand/codex.svg" },
];

