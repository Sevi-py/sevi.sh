import { Pause, Play } from "lucide-react";
import type { MusicTrack } from "../../content/music";
import { externalMusicUrl } from "../../content/music";
import { formatTime, useWaveformPlayer } from "../../hooks/useWaveformPlayer";
import { ScrollResponsiveArticle } from "../ScrollResponsiveArticle";

export function MusicTrackRow({
  track,
  index,
  activeTrackId,
  setActiveTrackId,
}: {
  track: MusicTrack;
  index: number;
  activeTrackId: string | null;
  setActiveTrackId: (id: string | null) => void;
}) {
  const {
    waveformRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    isActive,
    togglePlayback,
  } = useWaveformPlayer({ track, activeTrackId, setActiveTrackId });

  return (
    <ScrollResponsiveArticle className={`music-track${isActive ? " is-active" : ""}`}>
      <div className="music-row-command">
        <span className="music-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="terminal-arrow">&gt;</span>
      </div>
      <div className="music-cover-wrap">
        <img
          src={track.cover}
          alt={`${track.title} cover`}
          className="music-cover"
          loading="lazy"
          decoding="async"
        />
        <button
          type="button"
          className="music-play"
          onClick={togglePlayback}
          disabled={!isReady}
          aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
        >
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
      </div>
      <div className="music-main">
        <div className="music-heading">
          <div>
            <h3>
              <span className="music-command-name">play</span> {track.title}
            </h3>
            <p>--artist="{track.artist}"</p>
          </div>
          <span className="music-status">{isPlaying ? "streaming" : "ready"}</span>
        </div>
        <div
          className="music-waveform"
          ref={waveformRef}
          aria-label={`${track.title} preview waveform`}
        />
        <div className="music-footer">
          <span className="music-time">
            time {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div className="music-services">
            <a
              href={track.appleMusicUrl ?? externalMusicUrl("apple", track.query)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Listen to ${track.title} on Apple Music`}
              className="music-service apple"
            >
              <img
                src="/brand/apple-music-icon.png"
                alt="Apple Music"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href={track.spotifyUrl ?? externalMusicUrl("spotify", track.query)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Listen to ${track.title} on Spotify`}
              className="music-service spotify"
            >
              <img
                src="/brand/spotify-icon.png"
                alt="Spotify"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>
      </div>
    </ScrollResponsiveArticle>
  );
}

