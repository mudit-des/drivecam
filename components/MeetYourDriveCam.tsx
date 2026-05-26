"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Typography } from "@acko/typography";

interface Feature {
  id: string;
  pill: string;
  title: string;
  description: string;
  videoSrc: string;
}

const FEATURES: readonly Feature[] = [
  {
    id: "night-vision",
    pill: "Night Time Vision",
    title: "See Clearly After Dark",
    description:
      "Capture sharp footage even in low-light conditions, helping you record important details during night drives.",
    videoSrc: "/videos/night-vision.mp4",
  },
  {
    id: "quad-hd",
    pill: "Superior QUAD HD Recording",
    title: "Exceptional QUAD HD Clarity",
    description:
      "Record every journey with enhanced detail and sharpness so you never miss what matters on the road.",
    videoSrc: "/videos/quad-hd.mp4",
  },
  {
    id: "flip-camera",
    pill: "360° Flip Camera",
    title: "Flexible 360° Recording",
    description:
      "Rotate the camera freely to capture exactly what you need, whether it's the road ahead or moments inside the cabin.",
    videoSrc: "/videos/flip-camera.mp4",
  },
] as const;

const PANEL_ID = "panel-features";

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return prefers;
}

export function MeetYourDriveCam() {
  const [activeId, setActiveId] = useState<string>(FEATURES[0].id);
  const [duration, setDuration] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const headingId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const activeIdx = FEATURES.findIndex((f) => f.id === activeId);
  const active = FEATURES[activeIdx >= 0 ? activeIdx : 0];

  // Reset progress duration whenever the active feature changes; the new
  // <video> element will fire loadedmetadata and we'll pick up its duration.
  useEffect(() => {
    setDuration(null);
  }, [activeId]);

  // Pause / resume the active video when hover-pause toggles, and ensure the
  // newly mounted video starts playing once it's keyed in.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPaused) {
      v.pause();
    } else {
      v.play().catch(() => {
        /* autoplay may be blocked; the muted attribute should allow it */
      });
    }
  }, [isPaused, activeId]);

  const advance = () => {
    if (reducedMotion) return;
    const idx = FEATURES.findIndex((f) => f.id === activeId);
    const nextIdx = (idx + 1) % FEATURES.length;
    setActiveId(FEATURES[nextIdx].id);
  };

  const focusTab = (idx: number) => {
    const next = (idx + FEATURES.length) % FEATURES.length;
    setActiveId(FEATURES[next].id);
    tabRefs.current[next]?.focus();
  };

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusTab(idx + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusTab(idx - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(FEATURES.length - 1);
        break;
      default:
        break;
    }
  };

  const onLoadedMetadata = () => {
    if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  return (
    <section
      id="features"
      aria-labelledby={headingId}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      className="bg-surface-tint py-24 sm:py-32 lg:py-40"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <Typography
            as="h2"
            id={headingId}
            variant="display-md"
            color="primary"
          >
            Meet Your DriveCam
          </Typography>
          <div className="mt-3">
            <Typography variant="body-lg" color="secondary">
              Built to capture every drive with clarity, flexibility, and
              confidence.
            </Typography>
          </div>
        </div>

        {/* Showcase card */}
        <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10 lg:p-14">
          <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:gap-14">
            {/* Pill list (left at lg, below video on smaller screens) */}
            <div
              role="tablist"
              aria-label="DriveCam features"
              aria-orientation="vertical"
              className="flex flex-col gap-3 sm:gap-4 lg:min-w-0 lg:basis-[42%]"
            >
              {FEATURES.map((f, idx) => {
                const isActive = activeId === f.id;
                return (
                  <button
                    key={f.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    id={`pill-${f.id}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={PANEL_ID}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveId(f.id)}
                    onKeyDown={(e) => handleKey(e, idx)}
                    className={
                      isActive
                        ? "w-full rounded-3xl bg-accent-soft px-6 py-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-7 sm:py-6"
                        : "w-full rounded-full border border-line/60 bg-surface-tint px-5 py-3 text-left transition-colors duration-200 hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    }
                  >
                    {/* Inactive label: fades and collapses height when expanding */}
                    <div
                      className={
                        isActive
                          ? "h-0 overflow-hidden opacity-0"
                          : "opacity-100"
                      }
                      aria-hidden={isActive}
                    >
                      <Typography
                        as="span"
                        variant="body-md"
                        color="secondary"
                      >
                        {f.pill}
                      </Typography>
                    </div>

                    {/* Expanded content: grid-template-rows 0fr -> 1fr animates height */}
                    <div
                      className="grid transition-[grid-template-rows] duration-500 ease-out"
                      style={{
                        gridTemplateRows: isActive ? "1fr" : "0fr",
                      }}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={
                            isActive
                              ? "motion-safe:animate-fade-in"
                              : "invisible"
                          }
                          aria-live={isActive ? "polite" : undefined}
                        >
                          <Typography
                            as="span"
                            variant="label-lg"
                            className="!text-accent block"
                          >
                            {f.title}
                          </Typography>
                          <div className="mt-2">
                            <Typography
                              variant="body-md"
                              className="!text-ink-soft"
                            >
                              {f.description}
                            </Typography>
                          </div>

                          {/* Progress bar — tied to video duration */}
                          <div
                            className="mt-5 h-1 w-full overflow-hidden rounded-full bg-accent/20 sm:mt-6"
                            role="progressbar"
                            aria-label="Feature playback progress"
                          >
                            {isActive && duration && !reducedMotion ? (
                              <span
                                key={`${f.id}-${duration}`}
                                className="block h-full origin-left rounded-full bg-accent"
                                style={{
                                  animationName: "progress",
                                  animationDuration: `${duration}s`,
                                  animationTimingFunction: "linear",
                                  animationFillMode: "forwards",
                                  animationPlayState: isPaused
                                    ? "paused"
                                    : "running",
                                  transform: "scaleX(0)",
                                }}
                                onAnimationEnd={advance}
                              />
                            ) : (
                              <span
                                className="block h-full origin-left rounded-full bg-accent"
                                style={{ transform: "scaleX(0)" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Video panel (right at lg, top on smaller screens via flex-col-reverse) */}
            <div
              role="tabpanel"
              id={PANEL_ID}
              aria-labelledby={`pill-${active.id}`}
              className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black lg:basis-[58%]"
            >
              <video
                ref={videoRef}
                key={active.id}
                src={active.videoSrc}
                autoPlay
                muted
                loop={reducedMotion}
                playsInline
                preload="metadata"
                onLoadedMetadata={onLoadedMetadata}
                className="absolute inset-0 h-full w-full object-cover motion-safe:animate-fade-in"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
