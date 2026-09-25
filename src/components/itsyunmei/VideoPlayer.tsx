"use client";

import { Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  flushWatchDepth,
  trackFunnelEvent,
  trackWatchProgress,
} from "@/lib/itsyunmei/analytics";
import {
  MEANINGFUL_PROGRESS_SECONDS,
  TIMING,
  hasAsset,
  itsYunmeiConfig,
} from "@/lib/itsyunmei/config";
import {
  getPlayerWrapStyle,
  linearToTimeline,
} from "@/lib/itsyunmei/media";
import { attachAdaptiveStream } from "@/lib/itsyunmei/hls";
import {
  clampProgress,
  clearVideoProgress,
  isMeaningfulUnfinishedProgress,
  readVideoProgress,
  writeVideoProgress,
} from "@/lib/itsyunmei/storage";

const copy = itsYunmeiConfig.copy.video;

export type VideoPlayerHandle = {
  tryPlay: () => void;
  pause: () => void;
};

export const VideoPlayer = forwardRef<
  VideoPlayerHandle,
  {
    active: boolean;
    onPlayback: (currentTime: number, duration: number, ended: boolean) => void;
    onEnded: () => void;
  }
>(function VideoPlayer({ active, onPlayback, onEnded }, ref) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSaveRef = useRef(0);
  const startedRef = useRef(false);
  const failedRef = useRef(false);
  const playArmedRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [showResume, setShowResume] = useState(false);
  const showResumeRef = useRef(false);
  const [resumeTo, setResumeTo] = useState(0);
  const [posterBroken, setPosterBroken] = useState(false);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const src = hasAsset(itsYunmeiConfig.videoSrc)
    ? itsYunmeiConfig.videoSrc.trim()
    : null;
  const poster =
    hasAsset(itsYunmeiConfig.videoPoster) && !posterBroken
      ? itsYunmeiConfig.videoPoster.trim()
      : undefined;
  const captions = hasAsset(itsYunmeiConfig.captionsSrc)
    ? itsYunmeiConfig.captionsSrc.trim()
    : null;
  const version = itsYunmeiConfig.videoVersion;

  showResumeRef.current = showResume;

  const saveProgress = useCallback(
    (seconds: number) => {
      if (seconds < MEANINGFUL_PROGRESS_SECONDS) return;
      writeVideoProgress(version, seconds);
    },
    [version],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const persist = () => {
      saveProgress(video.currentTime);
      trackWatchProgress(video.currentTime, video.duration);
      flushWatchDepth("hidden");
    };
    const onPause = () => saveProgress(video.currentTime);
    const onPageHide = () => persist();
    const onVis = () => {
      if (document.visibilityState === "hidden") persist();
    };

    video.addEventListener("pause", onPause);
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      persist();
      video.removeEventListener("pause", onPause);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [saveProgress, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    return attachAdaptiveStream(video, src);
  }, [src]);

  const considerResume = useCallback(
    (videoDuration: number) => {
      const video = videoRef.current;
      if (video && !video.paused) return false;
      const saved = readVideoProgress(version);
      const clamped = clampProgress(saved, videoDuration);
      if (
        isMeaningfulUnfinishedProgress(
          clamped,
          videoDuration,
          MEANINGFUL_PROGRESS_SECONDS,
        )
      ) {
        video?.pause();
        setResumeTo(clamped);
        setShowResume(true);
        return true;
      }
      setShowResume(false);
      return false;
    },
    [version],
  );

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || showResumeRef.current) return;
    if (considerResume(video.duration)) return;
    video.play().catch(() => {});
  }, [considerResume]);

  useImperativeHandle(
    ref,
    () => ({
      tryPlay,
      pause: () => {
        videoRef.current?.pause();
      },
    }),
    [tryPlay],
  );

  useEffect(() => {
    if (!active) {
      playArmedRef.current = false;
      videoRef.current?.pause();
      return;
    }
    const delay = TIMING.vslPlayDelayMs;
    const id = window.setTimeout(() => {
      playArmedRef.current = true;
      tryPlay();
    }, delay);
    return () => window.clearTimeout(id);
  }, [active, tryPlay]);

  const seekTo = (seconds: number, play: boolean) => {
    const video = videoRef.current;
    if (!video) return;
    const apply = () => {
      video.currentTime = seconds;
      setProgress(seconds);
      if (play) video.play().catch(() => {});
    };
    if (video.readyState >= 1) apply();
    else video.addEventListener("loadedmetadata", apply, { once: true });
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || showResume) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className="iy-player w-full" style={getPlayerWrapStyle(itsYunmeiConfig.videoAspectRatio)}>
      {!src || error ? (
        <div className={error ? "iy-player-error" : "iy-player-placeholder"}>
          <Sparkles className="h-7 w-7 text-[#9428ff]" aria-hidden />
          <p className="max-w-[18ch] text-[16px] font-semibold leading-snug text-[#191126]">
            {error ?? copy.placeholder}
          </p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            poster={poster}
            controls={false}
            playsInline
            preload="auto"
            className="h-full w-full"
            onClick={togglePlay}
            onLoadedMetadata={(event) => {
              const nextDuration = event.currentTarget.duration;
              setDuration(nextDuration);
              onPlayback(event.currentTarget.currentTime, nextDuration, false);
              if (!active || !playArmedRef.current) return;
              const resuming = considerResume(nextDuration);
              if (!resuming) {
                event.currentTarget.play().catch(() => {});
              }
            }}
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              setProgress(video.currentTime);
              onPlayback(video.currentTime, video.duration, false);
              trackWatchProgress(video.currentTime, video.duration);
              const now = Date.now();
              if (now - lastSaveRef.current >= TIMING.progressSaveMs) {
                lastSaveRef.current = now;
                saveProgress(video.currentTime);
              }
            }}
            onSeeked={(event) => {
              setProgress(event.currentTarget.currentTime);
              onPlayback(
                event.currentTarget.currentTime,
                event.currentTarget.duration,
                false,
              );
              trackWatchProgress(
                event.currentTarget.currentTime,
                event.currentTarget.duration,
              );
            }}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onPlaying={() => {
              setPaused(false);
              if (!startedRef.current) {
                startedRef.current = true;
                trackFunnelEvent("vsl_started");
              }
            }}
            onEnded={(event) => {
              saveProgress(event.currentTarget.currentTime);
              trackWatchProgress(
                event.currentTarget.currentTime,
                event.currentTarget.duration,
              );
              flushWatchDepth("ended");
              setPaused(true);
              onPlayback(
                event.currentTarget.currentTime,
                event.currentTarget.duration,
                true,
              );
              onEnded();
            }}
            onError={() => {
              setError(copy.error);
              setShowResume(false);
              if (!failedRef.current) {
                failedRef.current = true;
                trackFunnelEvent("vsl_failed");
              }
            }}
          >
            {captions ? (
              <track
                kind="captions"
                src={captions}
                srcLang="en"
                label="Captions"
                default
              />
            ) : null}
          </video>

          {poster ? (
            // Detect a missing poster without showing the browser broken-image icon.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              className="hidden"
              onError={() => setPosterBroken(true)}
            />
          ) : null}

          {!showResume ? (
            <div className="iy-player-chrome">
              <button
                type="button"
                className={`iy-play-btn${paused ? " is-paused" : ""}`}
                aria-label={paused ? "Play" : "Pause"}
                onClick={(event) => {
                  event.stopPropagation();
                  togglePlay();
                }}
              >
                {paused ? (
                  <Play className="ml-0.5 h-4 w-4 fill-white" aria-hidden />
                ) : (
                  <Pause className="h-4 w-4 fill-white" aria-hidden />
                )}
              </button>
              <div
                className="iy-timeline"
                role="progressbar"
                aria-label="Video progress"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  className="iy-timeline-fill"
                  style={{
                    width: duration
                      ? `${linearToTimeline(progress, duration) * 100}%`
                      : "0%",
                  }}
                />
              </div>
            </div>
          ) : null}

          {showResume ? (
            <div className="iy-resume">
              <p className="iy-resume-title">{copy.resumeTitle}</p>
              <div className="iy-resume-actions">
                <button
                  type="button"
                  className="iy-resume-choice"
                  onClick={() => {
                    setShowResume(false);
                    seekTo(resumeTo, true);
                  }}
                >
                  <span className="iy-resume-icon" aria-hidden>
                    <Play className="h-5 w-5 fill-white" />
                  </span>
                  {copy.continueWatching}
                </button>
                <button
                  type="button"
                  className="iy-resume-choice"
                  onClick={() => {
                    setShowResume(false);
                    clearVideoProgress(version);
                    startedRef.current = false;
                    seekTo(0, true);
                  }}
                >
                  <span className="iy-resume-icon" aria-hidden>
                    <RotateCcw className="h-5 w-5" />
                  </span>
                  {copy.startOver}
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
});
