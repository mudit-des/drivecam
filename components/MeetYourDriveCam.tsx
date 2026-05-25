"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
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

export function MeetYourDriveCam() {
  const [activeId, setActiveId] = useState<string>(FEATURES[0].id);
  const headingId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIdx = FEATURES.findIndex((f) => f.id === activeId);
  const active = FEATURES[activeIdx >= 0 ? activeIdx : 0];

  const focusTab = (idx: number) => {
    const next = (idx + FEATURES.length) % FEATURES.length;
    setActiveId(FEATURES[next].id);
    tabRefs.current[next]?.focus();
  };

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab(idx + 1);
        break;
      case "ArrowLeft":
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

  return (
    <section
      id="features"
      aria-labelledby={headingId}
      className="bg-white py-20 sm:py-28"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
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

        {/* Pills */}
        <div
          role="tablist"
          aria-label="DriveCam features"
          className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
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
                aria-selected={isActive}
                aria-controls={`panel-${f.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(f.id)}
                onKeyDown={(e) => handleKey(e, idx)}
                className={[
                  "acko-btn acko-btn-md transition-transform duration-200 motion-reduce:transition-none",
                  isActive
                    ? "acko-btn-primary motion-safe:scale-[1.02]"
                    : "acko-btn-secondary",
                ].join(" ")}
              >
                <span className="acko-btn-content">
                  <span className="acko-btn-label">{f.pill}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Content area: keyed video + animated copy */}
        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`pill-${active.id}`}
          className="mt-12"
        >
          {/* Video — keyed so React unmounts the previous video; only one in DOM. */}
          <div className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-3xl bg-black">
            <video
              key={active.id}
              src={active.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover motion-safe:animate-fade-in"
              aria-hidden="true"
            />
          </div>

          {/* Title + description — keyed for fade transition */}
          <div
            key={`copy-${active.id}`}
            className="mx-auto mt-8 max-w-2xl text-center motion-safe:animate-fade-in"
            aria-live="polite"
          >
            <Typography as="h3" variant="heading-lg" color="primary">
              {active.title}
            </Typography>
            <div className="mt-3">
              <Typography variant="body-md" color="secondary">
                {active.description}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
