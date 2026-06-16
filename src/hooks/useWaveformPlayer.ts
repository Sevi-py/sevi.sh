import { useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import type { MusicTrack } from "../content/music";
import { musicPeaks } from "../musicPeaks";

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

export function useWaveformPlayer({
  track,
  activeTrackId,
  setActiveTrackId,
}: {
  track: MusicTrack;
  activeTrackId: string | null;
  setActiveTrackId: (id: string | null) => void;
}) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<WaveSurfer | null>(null);
  const sourceLoadRef = useRef<Promise<void> | null>(null);
  const hasLoadedSourceRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const peakData = musicPeaks[track.id];
  const [duration, setDuration] = useState(peakData?.duration ?? 0);
  const isActive = activeTrackId === track.id;

  const handlePlaybackError = useCallback(
    (error: unknown) => {
      console.error(`Could not play preview for ${track.title}`, error);
      setIsPlaying(false);
      setActiveTrackId(null);
    },
    [setActiveTrackId, track.title],
  );

  const ensureSource = useCallback(async () => {
    const player = playerRef.current;
    if (!player) {
      throw new Error("Track player is not ready yet");
    }

    if (hasLoadedSourceRef.current) {
      return;
    }

    if (!sourceLoadRef.current) {
      sourceLoadRef.current = player
        .load(track.preview, peakData?.peaks, peakData?.duration)
        .then(() => {
          hasLoadedSourceRef.current = true;
        })
        .finally(() => {
          sourceLoadRef.current = null;
        });
    }

    await sourceLoadRef.current;
  }, [peakData?.duration, peakData?.peaks, track.preview]);

  const playTrack = useCallback(async () => {
    await ensureSource();
    await playerRef.current?.play();
  }, [ensureSource]);

  useEffect(() => {
    if (!waveformRef.current) {
      return undefined;
    }

    const media = new Audio();
    media.preload = "none";

    const player = WaveSurfer.create({
      container: waveformRef.current,
      duration: peakData?.duration,
      height: 42,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      barMinHeight: 2,
      cursorColor: "#d9f99d",
      cursorWidth: 1,
      dragToSeek: true,
      hideScrollbar: true,
      interact: true,
      media,
      normalize: true,
      peaks: peakData?.peaks,
      progressColor: "#d9f99d",
      sampleRate: 8000,
      waveColor: "#3f3f46",
    });

    playerRef.current = player;
    setIsReady(true);

    player.on("ready", (loadedDuration) => {
      setDuration(loadedDuration);
      setIsReady(true);
    });
    player.on("play", () => {
      setIsPlaying(true);
      setActiveTrackId(track.id);
    });
    player.on("pause", () => setIsPlaying(false));
    player.on("finish", () => {
      setIsPlaying(false);
      setCurrentTime(0);
      player.setTime(0);
      setActiveTrackId(null);
    });
    player.on("timeupdate", (time) => setCurrentTime(time));
    player.on("interaction", () => {
      setActiveTrackId(track.id);
      if (!player.isPlaying()) {
        void playTrack().catch(handlePlaybackError);
      }
    });
    player.on("error", (error) => {
      console.error(`Could not load preview for ${track.title}`, error);
      setIsReady(false);
    });

    return () => {
      player.destroy();
      playerRef.current = null;
      sourceLoadRef.current = null;
      hasLoadedSourceRef.current = false;
    };
  }, [
    handlePlaybackError,
    peakData?.duration,
    peakData?.peaks,
    playTrack,
    setActiveTrackId,
    track.id,
    track.title,
  ]);

  useEffect(() => {
    if (!isActive && playerRef.current?.isPlaying()) {
      playerRef.current.pause();
    }
  }, [isActive]);

  const togglePlayback = () => {
    const player = playerRef.current;
    if (!player || !isReady) {
      return;
    }

    if (player.isPlaying()) {
      player.pause();
      setActiveTrackId(null);
    } else {
      setActiveTrackId(track.id);
      void playTrack().catch(handlePlaybackError);
    }
  };

  return {
    waveformRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    isActive,
    togglePlayback,
  };
}

