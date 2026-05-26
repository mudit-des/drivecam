"use client";

import { useId, useState } from "react";
import { Typography } from "@acko/typography";
import { withBasePath } from "@/lib/assets";

interface Feature {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
}

const FEATURES: readonly Feature[] = [
  {
    id: "night-vision",
    title: "Night Vision",
    description:
      "Enhanced night vision captures sharper details in low-light conditions, helping you keep a reliable record of every drive.",
    videoSrc: "/videos/night-vision.mp4",
  },
  {
    id: "flip-camera",
    title: "360° Flip Camera",
    description:
      "The rotating camera lets you record the road ahead, inside the cabin, or anywhere in between.",
    videoSrc: "/videos/flip-camera.mp4",
  },
  {
    id: "quad-hd",
    title: "Superior Quad HD Recording",
    description:
      "Capture sharper footage with greater detail and clarity when every moment matters.",
    videoSrc: "/videos/quad-hd.mp4",
  },
] as const;

export function MeetYourDriveCam() {
  const headingId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = FEATURES[activeIndex];

  return (
    <section
      id="features"
      aria-labelledby={headingId}
      className="relative bg-surface-tint text-ink"
    >
      <div className="container-page py-24 md:py-32 lg:py-40">
        {/* 1. Section introduction */}
        <header className="mx-auto max-w-2xl text-center">
          <Typography
            as="h2"
            id={headingId}
            variant="display-md"
            className="!text-ink text-balance"
          >
            Meet your DriveCam
          </Typography>
        </header>

        {/* 2. Product showcase — feature-matched video crossfades on activeIndex */}
        <div className="mt-12 lg:mt-20">
          <div className="relative mx-auto aspect-video w-full max-w-[1080px] overflow-hidden rounded-4xl bg-white shadow-card">
            {FEATURES.map((feat, idx) => (
              <video
                key={feat.id}
                src={withBasePath(feat.videoSrc)}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${
                  idx === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3. Feature discovery */}
        <div className="mt-12 lg:mt-16">
          <div
            role="tablist"
            aria-label="DriveCam features"
            className="mx-auto flex justify-center gap-3 sm:gap-4"
          >
            {FEATURES.map((feat, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={feat.id}
                  type="button"
                  role="tab"
                  id={`${feat.id}-tab`}
                  aria-selected={isActive}
                  aria-controls={`${feat.id}-panel`}
                  aria-label={feat.title}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-tint ${
                    isActive
                      ? "border-accent bg-accent text-white scale-105"
                      : "border-line bg-white text-ink/60 hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  <Typography
                    as="span"
                    variant="label-md"
                    className="!text-current"
                  >
                    {idx + 1}
                  </Typography>
                </button>
              );
            })}
          </div>

          <div className="relative mx-auto mt-10 min-h-[160px] max-w-2xl text-center">
            {FEATURES.map((feat, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={feat.id}
                  role="tabpanel"
                  id={`${feat.id}-panel`}
                  aria-labelledby={`${feat.id}-tab`}
                  aria-hidden={!isActive}
                  className={`absolute inset-x-0 top-0 transition-all duration-300 ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "pointer-events-none opacity-0 translate-y-2"
                  }`}
                >
                  <Typography
                    as="h3"
                    variant="display-sm"
                    className="!text-ink text-balance"
                  >
                    {feat.title}
                  </Typography>
                  <div className="mt-4">
                    <Typography variant="body-md" className="!text-ink/70">
                      {feat.description}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sr-only" aria-live="polite">
            {`Active feature: ${active.title}`}
          </div>
        </div>
      </div>
    </section>
  );
}
