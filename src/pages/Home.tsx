import { PageMeta } from "../components/PageMeta";
import { BottomLegalLinks } from "../components/sections/BottomLegalLinks";
import { ContactSection } from "../components/sections/ContactSection";
import { FeaturedProject } from "../components/sections/FeaturedProject";
import { IntroSection } from "../components/sections/IntroSection";
import { MusicSection } from "../components/sections/MusicSection";
import { StackSection } from "../components/sections/StackSection";
import { StayveraSection } from "../components/sections/StayveraSection";
import { TimelineSection } from "../components/sections/TimelineSection";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "../content/site";

export function Home() {
  return (
    <main>
      <PageMeta title={DEFAULT_TITLE} description={DEFAULT_DESCRIPTION} path="/" />
      <IntroSection />
      <StayveraSection />
      <StackSection />
      <TimelineSection />
      <FeaturedProject />
      <MusicSection />
      <ContactSection />
      <BottomLegalLinks />
    </main>
  );
}

