import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { musicTracks } from "../../content/music";
import { MusicTrackRow } from "../music/MusicTrackRow";
import { ShellLine } from "../text/ShellLine";
import { TerminalOutput } from "../text/TerminalOutput";
import { TypingText } from "../text/TypingText";

export function MusicSection() {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTracks = isExpanded ? musicTracks : musicTracks.slice(0, 4);

  useEffect(() => {
    if (!isExpanded && activeTrackId) {
      const activeTrackIndex = musicTracks.findIndex((track) => track.id === activeTrackId);

      if (activeTrackIndex >= 4) {
        setActiveTrackId(null);
      }
    }
  }, [activeTrackId, isExpanded]);

  return (
    <section id="music" className="section music-section">
      <div className="page section-stack">
        <div>
          <ShellLine command="cat music/currently.looping" />
          <TypingText as="h2" text="Music I like" className="music-title" adaptive />
          <TerminalOutput>
            <TypingText
              as="p"
              className="section-note"
              text="Current rotation from the playlist."
              adaptive
              speed={14}
            />
          </TerminalOutput>
        </div>
        <motion.div className="music-grid" layout>
          <AnimatePresence initial={false}>
            {visibleTracks.map((track, index) => (
              <MusicTrackRow
                key={track.id}
                track={track}
                index={index}
                activeTrackId={activeTrackId}
                setActiveTrackId={setActiveTrackId}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        <motion.button
          type="button"
          className="music-expand"
          onClick={() => setIsExpanded((current) => !current)}
          aria-expanded={isExpanded}
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
          transition={{ duration: 0.16 }}
        >
          <motion.span
            className="terminal-arrow"
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            &gt;
          </motion.span>
          {isExpanded ? "show less" : `show all ${musicTracks.length}`}
        </motion.button>
      </div>
    </section>
  );
}
