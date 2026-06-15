import { StrictMode, useEffect, useState, type ComponentType, type MouseEvent, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Terminal,
  Trophy,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa";
import { SiBun, SiExpo, SiGithub, SiPnpm, SiPython, SiPytorch, SiSelenium, SiTypescript, SiX } from "react-icons/si";
import "./style.css";

type Icon = IconType | ComponentType<{ className?: string }>;
type Tool = { name: string; accent: string; icon?: Icon; logo?: string };

const socials = [
  { label: "X", href: "https://x.com/evverin", icon: SiX },
  { label: "GitHub", href: "https://github.com/Sevi-py", icon: SiGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/severin-hilbert/",
    icon: FaLinkedin,
  },
];

const tools: Array<Tool> = [
  { name: "Python", icon: SiPython, accent: "#4b8bbe" },
  { name: "PyTorch", icon: SiPytorch, accent: "#ee4c2c" },
  { name: "Selenium", icon: SiSelenium, accent: "#43b02a" },
  { name: "Bun", icon: SiBun, accent: "#fbf0df" },
  { name: "pnpm", icon: SiPnpm, accent: "#f69220" },
  { name: "TypeScript", icon: SiTypescript, accent: "#3178c6" },
  { name: "TanStack", logo: "/brand/tanstack.svg", accent: "#32d1b8" },
  { name: "Coolify", logo: "/brand/coolify.svg", accent: "#8df6b3" },
  { name: "Expo / React Native", icon: SiExpo, accent: "#ffffff" },
  { name: "OpenAI Codex", logo: "/brand/codex.svg", accent: "#d7fff2" },
];

const timeline = [
  {
    kind: "work",
    icon: BriefcaseBusiness,
    logo: "/brand/stayvera-mark.png",
    date: "Mar 2026 - now",
    role: "Technical Co-Founder",
    org: "Stayvera Inc.",
    text: "Building the product side of an AI-native booking platform for modern group travel: host onboarding, guest flows, property intelligence, and the small details that make trips feel effortless.",
    command: "cat current-role.log",
  },
  {
    kind: "work",
    icon: BriefcaseBusiness,
    logo: "/brand/cloudflight.png",
    date: "Jul 2025",
    role: "Software Engineering Intern",
    org: "Cloudflight",
    text: "Independently led a research project around machine learning for geographic and time-based event clustering, with a React visualization, local LLM hosting, and LLM-powered event classification.",
    command: "grep cloudflight --ml",
  },
  {
    kind: "work",
    icon: BriefcaseBusiness,
    logo: "/brand/cloudflight.png",
    date: "Aug 2024",
    role: "Software Engineering Intern",
    org: "Cloudflight",
    text: "Worked on a customer-facing logistics service portal with Angular and Java/Spring, and wrote end-to-end Cypress tests in TypeScript. Youngest intern at Cloudflight, and the only intern not coming from university or a specialized technical school.",
    command: "grep cloudflight --portal",
  },
  {
    kind: "win",
    icon: Trophy,
    logo: "/brand/cloudflight.png",
    date: "Nov 2025",
    role: "1st place, Cloudflight Coding Contest Vienna",
    org: "41st Classic CCC",
    text: "Won the Vienna site, placed 5th globally among more than 2400 participants, and built custom LLM agents to support contest solutions.",
    command: "cat achievements/ccc.txt",
  },
  {
    kind: "school",
    icon: GraduationCap,
    logo: "/brand/keimgasse.png",
    date: "2018 - 2026",
    role: "Matura completed",
    org: "BG/BRG Keimgasse Modling",
    text: "Completed the Austrian Matura with an average grade of 1.4 after a school path shaped by informatics, self-directed building, and competition work.",
    command: "tail education.log",
  },
];

const stats = [
  ["150+", "GitHub stars on tnyr.me"],
  ["5th", "Global CCC placement"],
  ["1.4", "Matura average grade"],
  ["17", "Started serious product work early"],
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Root() {
  return (
    <ClickSpark>
      <div className="min-h-screen bg-[#050707] text-zinc-100">
        <Outlet />
      </div>
    </ClickSpark>
  );
}

function ClickSpark({ children }: { children: ReactNode }) {
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const id = Date.now();
    setSparks((current) => [...current.slice(-8), { id, x: event.clientX, y: event.clientY }]);
    window.setTimeout(() => {
      setSparks((current) => current.filter((spark) => spark.id !== id));
    }, 650);
  }

  return (
    <div onClick={handleClick} className="relative min-h-screen">
      {children}
      <div className="pointer-events-none fixed inset-0 z-[80]">
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="click-spark"
            style={{ left: spark.x, top: spark.y }}
          />
        ))}
      </div>
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

function AgeFloat() {
  const age = useLiveAge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="age-float"
      aria-label={`Live age ${age} years`}
    >
      <span className="text-zinc-500">age</span>
      <strong>{age}</strong>
      <span className="text-lime-300">years</span>
    </motion.div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-lime-300/10 bg-[#050707]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label="sevi.sh home">
          <span className="grid size-9 place-items-center border border-lime-300/35 bg-lime-300/10 text-lime-200 shadow-[0_0_35px_rgba(190,255,70,.15)]">
            <Terminal className="size-5" />
          </span>
          <span className="font-mono text-sm tracking-[0.24em] text-lime-100">
            sevi.sh
          </span>
        </Link>
        <nav className="hidden items-center gap-6 font-mono text-xs text-zinc-400 md:flex">
          <a href="/#projects">projects</a>
          <a href="/#stack">stack</a>
          <a href="/#timeline">cv</a>
          <Link to="/imprint">imprint</Link>
        </nav>
        <a
          href="mailto:severin.hilbert@gmail.com"
          className="hidden items-center gap-2 border border-lime-300/25 px-3 py-2 font-mono text-xs text-lime-100 transition hover:bg-lime-300/10 sm:flex"
        >
          <Mail className="size-4" />
          contact
        </a>
        <button className="grid size-9 place-items-center border border-lime-300/20 text-lime-100 md:hidden" aria-label="Menu">
          <Menu className="size-5" />
        </button>
      </div>
    </header>
  );
}

function ShellLine({ command }: { command: string }) {
  return (
    <div className="shell-line">
      <span className="text-lime-300">sevi@sevi.sh</span>
      <span className="text-zinc-500">:</span>
      <span className="text-cyan-200">~</span>
      <span className="text-zinc-500">$</span>
      <span>{command}</span>
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="hero-shell relative isolate min-h-[100svh] overflow-hidden px-5 pt-28 sm:px-8">
      <div className="grid-pattern" />
      <div className="beam-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <AgeFloat />
      <motion.div className="orbital-terminal" style={{ y, opacity }} aria-hidden="true">
        <div className="terminal-window terminal-window-a">
          <span>deploy --target sevi.sh</span>
          <span>status: playful</span>
            <span>theme: dark</span>
        </div>
        <div className="terminal-window terminal-window-b">
          <span>routes: / /imprint</span>
          <span>privacy: serious</span>
          <span>vibe: bash</span>
        </div>
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          <ShellLine command="whoami" />
          <h1 className="mt-5 max-w-4xl font-mono text-[clamp(3.1rem,9vw,8.6rem)] font-black leading-[0.86] tracking-normal text-white">
            Severin
            <span className="block text-lime-300">Hilbert</span>
          </h1>
          <p className="mt-7 max-w-2xl text-balance text-lg leading-8 text-zinc-300 sm:text-xl">
            Developer from Vienna building privacy-minded tools, AI-native products,
            and interfaces with a little terminal electricity in them.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="shimmer-button" href="mailto:severin.hilbert@gmail.com">
              <Mail className="size-4" />
              severin.hilbert@gmail.com
            </a>
            <span className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950/70 px-4 py-3 font-mono text-sm text-zinc-300">
              <MapPin className="size-4 text-lime-300" />
              Vienna, Austria
            </span>
          </div>
          <div className="mt-7 flex items-center gap-3">
            {socials.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="social-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconComponent className="size-5" />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="command-card">
            <div className="flex items-center justify-between border-b border-lime-300/10 px-4 py-3">
              <div className="flex gap-2">
                <span className="size-3 bg-red-400" />
                <span className="size-3 bg-yellow-300" />
                <span className="size-3 bg-lime-300" />
              </div>
              <span className="font-mono text-xs text-zinc-500">/home/severin</span>
            </div>
            <div className="space-y-5 p-5 font-mono text-sm">
              <p><span className="text-lime-300">$</span> ./portfolio --mode dark</p>
              <p className="type-line">shipping playful software with sharp edges</p>
              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="stat-tile">
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="terminal-output">
                <span>[ok] privacy-first project shipped</span>
                <span>[ok] Cloudflight internships completed</span>
                <span>[ok] Stayvera building in progress</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProject() {
  return (
    <section id="projects" className="section-wrap">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <ShellLine command="open featured-project" />
          <h2 className="section-title mt-4">tnyr.me</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
            A privacy-focused, open-source URL shortener with passwordless
            zero-trust encryption for links and metadata. The browser does the
            sensitive work, the server stores only what it needs.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 font-mono text-xs text-lime-100">
            <span className="tag">AES-256</span>
            <span className="tag">no tracking</span>
            <span className="tag">self-hostable</span>
            <span className="tag">150+ stars</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="text-link" href="https://tnyr.me" target="_blank" rel="noreferrer">
              visit tnyr.me <ArrowUpRight className="size-4" />
            </a>
            <a className="text-link muted" href="https://github.com/Sevi-py/tnyr.me" target="_blank" rel="noreferrer">
              source <SiGithub className="size-4" />
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65 }}
          className="project-panel"
        >
          <div className="border-beam" />
          <img src="/brand/tnyr.png" alt="tnyr.me logo" className="mx-auto size-24" />
          <div className="mt-8 rounded-none border border-lime-300/15 bg-black/40 p-5 font-mono text-sm text-zinc-300">
            <p><span className="text-lime-300">$</span> shorten --private https://example.com</p>
            <p className="mt-3 text-cyan-200">tnyr.me/#iA4y6jMjFk</p>
            <p className="mt-5 text-zinc-500">
              The link secret stays in the fragment. The database never sees the
              original destination.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" className="section-wrap border-y border-lime-300/10 bg-zinc-950/45">
      <div className="mx-auto max-w-7xl">
        <ShellLine command="ls things-i-like" />
        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="section-title">Tools I like using</h2>
          <p className="max-w-md text-sm leading-7 text-zinc-400">
            A practical stack for AI products, browser automation, native apps,
            and shipping web things without making them boring.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-lime-300/10 bg-lime-300/10 sm:grid-cols-3 lg:grid-cols-5">
          {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
                className="tool-cell group"
              >
                {tool.logo ? (
                  <img src={tool.logo} alt={`${tool.name} logo`} className="size-9 object-contain transition group-hover:scale-110" />
                ) : IconComponent ? (
                  <IconComponent className="size-8 transition group-hover:scale-110" style={{ color: tool.accent }} />
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
    <section id="timeline" className="section-wrap">
      <div className="mx-auto max-w-7xl">
        <ShellLine command="cat cv.timeline" />
        <div className="mt-5 grid gap-6 lg:grid-cols-[.42fr_.58fr]">
          <div>
            <h2 className="section-title">Work, school, wins</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-zinc-300">
              The CV section gives Cloudflight enough visual weight because it is
              real engineering experience, not a tiny footnote.
            </p>
          </div>
          <div className="timeline">
            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.article
                  key={`${item.role}-${item.date}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className={cn("timeline-item", item.kind === "work" && "timeline-item-work")}
                >
                  <div className="timeline-logo">
                    <img src={item.logo} alt={`${item.org} logo`} />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 font-mono text-xs text-lime-300">
                        <IconComponent className="size-4" />
                        {item.command}
                      </span>
                      <span className="font-mono text-xs text-zinc-500">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                    <p className="mt-1 font-mono text-sm text-cyan-200">{item.org}</p>
                    <p className="mt-4 leading-7 text-zinc-300">{item.text}</p>
                  </div>
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
    <section className="section-wrap bg-[#07100c]">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <ShellLine command="curl stayvera.com/about" />
          <h2 className="section-title mt-4">Building Stayvera now</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Stayvera is a premium rental and group-travel platform focused on
            fair fees, trust, host support, instant listing import, and an AI
            copilot for guest communication and operations.
          </p>
        </div>
        <div className="stayvera-panel">
          <img src="/brand/stayvera.svg" alt="Stayvera logo" className="h-10 w-auto" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["fair host economics", "group travel planning", "AI guest operations", "transparent booking"].map((item) => (
              <div key={item} className="mini-check">
                <ShieldCheck className="size-4 text-lime-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section-wrap">
      <div className="mx-auto max-w-7xl">
        <div className="contact-strip">
          <ShellLine command="ssh severin@sevi.sh" />
          <h2 className="mt-5 max-w-3xl font-mono text-4xl font-black leading-tight text-white sm:text-6xl">
            Want to build something sharp?
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="shimmer-button" href="mailto:severin.hilbert@gmail.com">
              <Mail className="size-4" />
              send mail
            </a>
            <a className="text-link muted" href="https://github.com/Sevi-py" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-lime-300/10 px-5 py-8 font-mono text-xs text-zinc-500 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>sevi.sh</p>
        <div className="flex gap-4">
          <a href="mailto:severin.hilbert@gmail.com">email</a>
          <Link to="/imprint">imprint</Link>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedProject />
        <StackSection />
        <TimelineSection />
        <StayveraSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function Imprint() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-5 pt-32 sm:px-8">
        <section className="mx-auto max-w-4xl border border-lime-300/15 bg-zinc-950/70 p-6 sm:p-10">
          <ShellLine command="cat imprint.txt" />
          <h1 className="mt-6 font-mono text-4xl font-black text-white sm:text-6xl">Imprint</h1>
          <div className="mt-10 grid gap-6 text-zinc-300 sm:grid-cols-2">
            <div className="imprint-block">
              <h2>Site operator</h2>
              <p>Severin Hilbert</p>
              <p>[Street address]</p>
              <p>[Postal code] Vienna</p>
              <p>Austria</p>
            </div>
            <div className="imprint-block">
              <h2>Contact</h2>
              <p>severin.hilbert@gmail.com</p>
              <p>[Phone number]</p>
            </div>
            <div className="imprint-block sm:col-span-2">
              <h2>Responsible for content</h2>
              <p>Severin Hilbert</p>
              <p>[Address placeholder]</p>
            </div>
          </div>
          <Link to="/" className="text-link mt-10 inline-flex">
            <ChevronRight className="size-4 rotate-180" />
            back home
          </Link>
        </section>
      </main>
    </>
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
const routeTree = rootRoute.addChildren([indexRoute, imprintRoute]);
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
