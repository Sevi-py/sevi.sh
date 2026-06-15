import { StrictMode, useEffect, useState, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  GraduationCap,
  Mail,
  MapPin,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa";
import {
  SiExpo,
  SiGithub,
  SiPnpm,
  SiPytorch,
  SiSelenium,
  SiTypescript,
  SiX,
} from "react-icons/si";
import { DitherBackground } from "./DitherBackground";
import "./style.css";

type Icon = IconType | ComponentType<{ className?: string }>;
type Tool = { name: string; icon?: Icon; logo?: string; color?: string };

const socials = [
  { label: "X", href: "https://x.com/evverin", icon: SiX, color: "#ffffff" },
  { label: "GitHub", href: "https://github.com/Sevi-py", icon: SiGithub, color: "#ffffff" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/severin-hilbert/",
    icon: FaLinkedinIn,
    color: "#0a66c2",
  },
];

const tools: Array<Tool> = [
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

const timeline = [
  {
    icon: BriefcaseBusiness,
    logo: "/brand/stayvera-symbol.webp",
    date: "Mar 2026 - now",
    role: "Technical Co-Founder",
    org: "Stayvera Inc.",
    text: "Building the product side of an AI-native booking platform for modern group travel: host onboarding, guest flows, property intelligence, and the small details that make trips feel effortless.",
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
    icon: Trophy,
    logo: "/brand/cloudflight-coding-contest.webp",
    date: "Nov 2025",
    role: "1st place, Cloudflight Coding Contest Vienna",
    org: "41st Classic CCC",
    text: "Won the Vienna site, placed 5th globally among more than 2400 participants, and built custom LLM agents to support contest solutions.",
  },
  {
    icon: GraduationCap,
    logo: "/brand/keimgasse.webp",
    date: "2018 - 2026",
    role: "High school",
    org: "BG/BRG Keimgasse Mödling",
    text: "Completed the Austrian Matura with an average grade of 1.4",
  },
];

function Root() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DitherBackground />
      <Outlet />
    </div>
  );
}

function useLiveAge() {
  const [age, setAge] = useState("18.000000000");

  useEffect(() => {
    const birth = new Date("2008-01-11T09:00:00+01:00").getTime();
    const tropicalYearMs = 365.2425 * 24 * 60 * 60 * 1000;

    const tick = () => {
      setAge(((Date.now() - birth) / tropicalYearMs).toFixed(9));
    };

    tick();
    const interval = window.setInterval(tick, 75);
    return () => window.clearInterval(interval);
  }, []);

  return age;
}

function ShellLine({ command }: { command: string }) {
  return (
    <div className="shell-line">
      <span>sevi@sevi.sh</span>
      <span className="muted">~</span>
      <span className="muted">$</span>
      <span>{command}</span>
    </div>
  );
}

function IntroSection() {
  const age = useLiveAge();

  return (
    <section className="hero">
      <div className="page">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <ShellLine command="whoami" />
          <h1>
            Severin
            <span>Hilbert</span>
          </h1>
          <p className="intro">
            Developer in Vienna, Austria. Currently <span className="age">{age}</span>{" "}
            years old. I build privacy-minded tools, AI-native products, and
            calm software.
          </p>
          <div className="hero-links">
            <a href="mailto:severin.hilbert@gmail.com">
              <Mail className="size-4" />
              severin.hilbert@gmail.com
            </a>
            <span>
              <MapPin className="size-4" />
              Vienna, Austria
            </span>
          </div>
          <div className="social-row">
            {socials.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconComponent className="size-5" style={{ color: social.color }} />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BottomLegalLinks() {
  return (
    <div className="bottom-legal">
      <Link to="/imprint">imprint</Link>
      <Link to="/privacy">privacy</Link>
    </div>
  );
}

function FeaturedProject() {
  return (
    <section id="projects" className="section">
      <div className="page section-stack">
        <div>
          <ShellLine command="open featured-project" />
          <div className="project-title-row">
            <a href="https://tnyr.me" target="_blank" rel="noreferrer" aria-label="Visit tnyr.me">
              <img src="/brand/tnyr.webp" alt="tnyr.me logo" />
            </a>
            <h2>
              <a href="https://tnyr.me" target="_blank" rel="noreferrer">
                tnyr.me
              </a>
            </h2>
          </div>
        </div>
        <div className="prose-block">
          <p className="project-summary">
            Privacy-focused, open-source URL shortener with passwordless
            zero-trust encryption for links and metadata.
          </p>
          <p>
            The browser does the sensitive work. The server stores only a
            storage key and encrypted destination data, so the original link
            stays private by design.
          </p>
          <div className="inline-list">
            <span>AES-256</span>
            <span>no tracking</span>
            <span>self-hostable</span>
            <span>150+ GitHub stars</span>
          </div>
          <div className="link-row">
            <a href="https://tnyr.me" target="_blank" rel="noreferrer">
              visit <ArrowUpRight className="size-4" />
            </a>
            <a href="https://github.com/Sevi-py/tnyr.me" target="_blank" rel="noreferrer">
              source <SiGithub className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" className="section">
      <div className="page section-stack">
        <ShellLine command="ls things-i-like" />
        <h2>Things I like</h2>
        <div className="tool-list">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.025 }}
                className="tool-item"
              >
                {tool.logo ? (
                  <img src={tool.logo} alt={`${tool.name} logo`} />
                ) : IconComponent ? (
                  <IconComponent className="size-6" style={{ color: tool.color }} />
                ) : null}
                <span>{tool.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section id="timeline" className="section">
      <div className="page">
        <ShellLine command="cat cv.timeline" />
        <div className="section-stack">
          <div>
            <h2>Work, school, wins</h2>
          </div>
          <div className="timeline">
            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.article
                  key={`${item.role}-${item.date}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="timeline-item"
                >
                  <div className="timeline-meta">
                    <span className="timeline-date">
                      <IconComponent className="size-4" />
                      {item.date}
                    </span>
                    <span className="timeline-logo">
                      <img src={item.logo} alt={`${item.org} logo`} />
                    </span>
                  </div>
                  <h3>{item.role}</h3>
                  <p className="org">{item.org}</p>
                  <p>{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StayveraSection() {
  return (
    <section className="section">
      <div className="page section-stack">
        <div>
          <ShellLine command="curl stayvera.com/about" />
          <h2 className="stayvera-heading">
            Currently building{" "}
            <a
              href="https://stayvera.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Stayvera"
              className="stayvera-brand"
            >
              <img src="/brand/stayvera-symbol.webp" alt="" />
              <span>Stayvera</span>
            </a>
          </h2>
        </div>
        <div className="prose-block">
          <p>
            Stayvera is a premium rental and group-travel platform focused on
            fair fees, trust, host support, instant listing import, and an AI
            copilot for guest communication and operations.
          </p>
          <div className="inline-list">
            <span>fair host economics</span>
            <span>group travel</span>
            <span>AI guest ops</span>
            <span>transparent fees</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section final-section">
      <div className="page">
        <ShellLine command="ssh severin@sevi.sh" />
        <h2>Want to build something sharp?</h2>
        <div className="link-row">
          <a href="mailto:severin.hilbert@gmail.com">
            send mail <Mail className="size-4" />
          </a>
          <a href="https://github.com/Sevi-py" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <IntroSection />
      <StayveraSection />
      <StackSection />
      <TimelineSection />
      <FeaturedProject />
      <ContactSection />
      <BottomLegalLinks />
    </main>
  );
}

function Imprint() {
  return (
    <main className="imprint-page">
      <section className="page">
        <ShellLine command="cat imprint.txt" />
        <h1>Imprint</h1>
        <div className="imprint-grid">
          <div>
            <h2>Site operator</h2>
            <p>Severin Hilbert</p>
            <p>Herbert Rauch-Gasse 16</p>
            <p>2361 Laxenburg</p>
            <p>Austria</p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>severin.hilbert@gmail.com</p>
          </div>
        </div>
        <Link to="/" className="back-link">
          <ChevronRight className="size-4 rotate-180" />
          back home
        </Link>
      </section>
    </main>
  );
}

function Privacy() {
  return (
    <main className="imprint-page">
      <section className="page">
        <ShellLine command="cat privacy.txt" />
        <h1>Privacy</h1>
        <div className="imprint-grid privacy-grid">
          <div>
            <h2>Controller</h2>
            <p>Severin Hilbert</p>
            <p>Herbert Rauch-Gasse 16</p>
            <p>2361 Laxenburg</p>
            <p>Austria</p>
            <p>severin.hilbert@gmail.com</p>
          </div>
          <div>
            <h2>Hosting and delivery</h2>
            <p>
              This website is delivered through Cloudflare. When you visit it,
              technical request data such as your IP address, requested pages,
              browser information, timestamps, and security events may be
              processed to serve, protect, cache, and route the site.
            </p>
          </div>
          <div>
            <h2>Analytics</h2>
            <p>
              I use Cloudflare's built-in, privacy-minded analytics to understand
              basic traffic patterns. The analytics setup is intended for
              aggregate page-view and performance insight, not for identifying
              individual visitors or tracking them across websites.
            </p>
          </div>
          <div>
            <h2>Cookies</h2>
            <p>
              This site does not use advertising or marketing cookies. Cloudflare
              Web Analytics does not rely on client-side state such as cookies or
              local storage for usage metrics.
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              If you contact me by email, I use the information you send only to
              read and reply to your message. I do not sell personal data.
            </p>
          </div>
          <div>
            <h2>Your rights</h2>
            <p>
              You can ask for access, correction, deletion, restriction, or
              portability of personal data, or object to processing where the law
              gives you that right. You may also contact the Austrian data
              protection authority.
            </p>
          </div>
        </div>
        <p className="legal-updated">Last updated: June 2026</p>
        <Link to="/" className="back-link">
          <ChevronRight className="size-4 rotate-180" />
          back home
        </Link>
      </section>
    </main>
  );
}

const rootRoute = createRootRoute({ component: Root });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const imprintRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/imprint",
  component: Imprint,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: Privacy,
});
const routeTree = rootRoute.addChildren([indexRoute, imprintRoute, privacyRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
