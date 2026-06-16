import { timeline } from "../../content/timeline";
import { ScrollResponsiveArticle } from "../ScrollResponsiveArticle";
import { ShellLine } from "../text/ShellLine";
import { TypingText } from "../text/TypingText";

export function TimelineSection() {
  return (
    <section id="timeline" className="section">
      <div className="page">
        <ShellLine command="cat cv.timeline" />
        <div className="section-stack">
          <div>
            <TypingText as="h2" text="Work, school, wins" adaptive />
          </div>
          <div className="timeline">
            {timeline.map((item) => {
              const IconComponent = item.icon;
              return (
                <ScrollResponsiveArticle key={`${item.role}-${item.date}`} className="timeline-item">
                  {(isVisible) => (
                    <>
                      <div className="timeline-meta">
                        <span className="timeline-date">
                          <IconComponent className="size-4" />
                          {item.date}
                        </span>
                        <span className="timeline-logo">
                          <img
                            src={item.logo}
                            alt={`${item.org} logo`}
                            loading="lazy"
                            decoding="async"
                          />
                        </span>
                      </div>
                      <TypingText as="h3" text={item.role} adaptive speed={24} start={isVisible} />
                      <TypingText
                        as="p"
                        className="org"
                        text={item.org}
                        adaptive
                        speed={24}
                        start={isVisible}
                      />
                      <TypingText as="p" text={item.text} adaptive speed={15} start={isVisible} />
                    </>
                  )}
                </ScrollResponsiveArticle>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

