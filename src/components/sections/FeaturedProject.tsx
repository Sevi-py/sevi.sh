import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { DecryptedText } from "../text/DecryptedText";
import { ShellLine } from "../text/ShellLine";
import { TerminalOutput } from "../text/TerminalOutput";
import { TypingText } from "../text/TypingText";

const projects = [
  {
    label: "SaaS product",
    name: "Flarely",
    href: "https://flarely.at",
    logo: "/brand/flarely.png",
    logoAlt: "Flarely logo",
    logoClassName: "project-logo-flarely",
    summary:
      "A SaaS for fire departments that brings schedules, reports, vehicles, documents and team updates into one clear workspace.",
    detail:
      "Built for the everyday coordination work around drills, duties and equipment: role-based groups, vehicle availability, document access and fast updates across web and mobile.",
    tags: ["fire departments", "operations", "web and mobile", "role-based access"],
    links: [{ label: "visit", href: "https://flarely.at", icon: "external" }],
    animation: "typing",
  },
  {
    label: "Open-source project",
    name: "tnyr.me",
    href: "https://tnyr.me",
    logo: "/brand/tnyr.webp",
    logoAlt: "tnyr.me logo",
    summary:
      "Privacy-focused, open-source URL shortener with passwordless zero-trust encryption for links and metadata.",
    detail:
      "The browser does the sensitive work. The server stores only a storage key and encrypted destination data, so the original link stays private by design.",
    tags: ["AES-256", "no tracking", "self-hostable", "150+ GitHub stars"],
    links: [
      { label: "visit", href: "https://tnyr.me", icon: "external" },
      { label: "source", href: "https://github.com/Sevi-py/tnyr.me", icon: "github" },
    ],
    animation: "decrypt",
  },
];

function ProjectText({
  animation,
  text,
  as,
  className,
  delay,
  interval,
  revealStep,
  speed,
}: {
  animation: string;
  text: string;
  as?: "p";
  className?: string;
  delay?: number;
  interval?: number;
  revealStep?: number;
  speed?: number;
}) {
  if (animation === "decrypt") {
    return (
      <DecryptedText
        as={as}
        className={className}
        text={text}
        delay={delay}
        interval={interval}
        revealStep={revealStep}
      />
    );
  }

  return (
    <TypingText as={as} className={className} text={text} delay={delay} speed={speed} />
  );
}

export function FeaturedProject() {
  return (
    <section id="projects" className="section">
      <div className="page section-stack">
        <ShellLine command="open selected-work" />
        <div className="project-list">
          {projects.map((project, projectIndex) => {
            const baseDelay = projectIndex * 220;

            return (
              <article className="project-item" key={project.name}>
                <div>
                  <p className="project-kicker">
                    <ProjectText
                      animation={project.animation}
                      text={project.label}
                      delay={baseDelay + 80}
                      interval={38}
                      speed={34}
                    />
                  </p>
                  <div className="project-title-row">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.name}`}
                    >
                      <img
                        className={project.logoClassName}
                        src={project.logo}
                        alt={project.logoAlt}
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                    <h2>
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        <ProjectText
                          animation={project.animation}
                          text={project.name}
                          delay={baseDelay + 180}
                          interval={82}
                          speed={34}
                        />
                      </a>
                    </h2>
                  </div>
                </div>
                <TerminalOutput className="prose-block" delay={projectIndex * 0.08}>
                  <ProjectText
                    animation={project.animation}
                    as="p"
                    className="project-summary"
                    text={project.summary}
                    delay={baseDelay + 140}
                    interval={30}
                    revealStep={2}
                    speed={13}
                  />
                  <ProjectText
                    animation={project.animation}
                    as="p"
                    text={project.detail}
                    delay={baseDelay + 360}
                    interval={28}
                    revealStep={2}
                    speed={13}
                  />
                  <div className="inline-list">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tag}>
                        <ProjectText
                          animation={project.animation}
                          text={tag}
                          delay={baseDelay + 760 + tagIndex * 80}
                          interval={38}
                          revealStep={1}
                          speed={24}
                        />
                      </span>
                    ))}
                  </div>
                  <div className="link-row">
                    {project.links.map((link) => (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={link.href}
                      >
                        {link.label}
                        {link.icon === "github" ? (
                          <SiGithub className="size-4" />
                        ) : (
                          <ArrowUpRight className="size-4" />
                        )}
                      </a>
                    ))}
                  </div>
                </TerminalOutput>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
