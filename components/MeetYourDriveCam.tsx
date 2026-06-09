"use client";

import { useEffect, useId, useRef } from "react";
import { Typography } from "@acko/typography";
import { withBasePath } from "@/lib/assets";

interface FeatureCard {
  id: string;
  number: string;
  category: string;
  headline: string;
  description: string;
  videoSrc: string;
}

const CARDS: readonly FeatureCard[] = [
  {
    id: "night-vision",
    number: "01",
    category: "Night Vision",
    headline: "See what happened. Even after sunset.",
    description:
      "Night drives shouldn't mean missing details. DriveCam captures clear footage in low-light conditions so important moments stay visible.",
    videoSrc: "/videos/night-vision.mp4",
  },
  {
    id: "in-cabin",
    number: "02",
    category: "In-Cabin Recording",
    headline: "Record inside the cabin when needed.",
    description:
      "The camera rotates to capture both the road ahead and the cabin. Useful for ride-share drivers, family trips, and added peace of mind.",
    videoSrc: "/videos/flip-camera.mp4",
  },
  {
    id: "wide-angle",
    number: "03",
    category: "Wide-Angle View",
    headline: "More road. More context.",
    description:
      "A wide-angle view helps capture more of what's happening around your vehicle. Because sometimes the detail that matters isn't directly in front of you.",
    videoSrc: "/videos/quad-hd.mp4",
  },
] as const;

export function MeetYourDriveCam() {
  const headingId = useId();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    videoRefs.current.forEach((v) => {
      if (!v) return;
      const tryPlay = () => {
        void v.play().catch(() => {
          /* iOS Low Power Mode / autoplay policy — IO retry will pick it up */
        });
      };
      tryPlay();
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) tryPlay();
        },
        { threshold: 0.1 },
      );
      io.observe(v);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  return (
    <section
      id="features"
      aria-labelledby={headingId}
      className="relative bg-surface-tint pb-16 sm:pb-20 lg:pb-24"
    >
      {/* Intro slab */}
      <div className="container-page pt-16 pb-4 text-center md:pt-20 md:pb-6 lg:pt-24 lg:pb-8">
        <Typography
          as="h2"
          id={headingId}
          variant="display-md"
          className="!text-ink text-balance"
        >
          Why drivers love ACKO DriveCam
        </Typography>
        <div className="mx-auto mt-4 max-w-2xl">
          <Typography variant="body-lg" color="secondary">
            Because when the unexpected happens, details matter.
          </Typography>
        </div>
      </div>

      {/* Sticky-stack container — height is the scroll budget; each card
          owns ~100vh of takeover. Cards share top:6rem sticky and ascending
          z-index, so later cards rise into view and progressively cover
          earlier ones. Reduced-motion users get a plain vertical stack. */}
      <div
        className="relative px-4 sm:px-6 md:px-0"
        style={{ height: `${CARDS.length * 100}vh` }}
      >
        {CARDS.map((card, i) => (
          <article
            key={card.id}
            className="sticky mx-auto flex h-[min(640px,calc(100vh-8rem))] max-w-[1180px] flex-col gap-6 overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-accent-soft from-0% to-white to-25% p-8 shadow-floating sm:p-10 md:h-[640px] lg:h-[680px] lg:flex-row lg:items-stretch lg:gap-12 lg:p-14"
            style={{
              zIndex: i + 1,
              top: `${6 + i * 0.5}rem`,
            }}
          >
            {/* Left 45% on desktop */}
            <div className="flex flex-col justify-center text-center lg:w-[45%] lg:text-left">
              <div>
                <Typography
                  as="span"
                  variant="label-md"
                  className="!text-ink/40"
                >
                  {card.number}
                </Typography>
                <div className="mt-1">
                  <Typography
                    as="span"
                    variant="overline"
                    className="!text-ink/55"
                  >
                    {card.category}
                  </Typography>
                </div>
              </div>
              <div className="mt-6">
                <Typography
                  as="h3"
                  variant="display-sm"
                  className="!text-ink text-balance"
                >
                  {card.headline}
                </Typography>
                <div className="mt-4">
                  <Typography variant="body-lg" color="secondary">
                    {card.description}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Right 55% on desktop */}
            <div className="mx-auto w-full max-w-[480px] lg:mx-0 lg:max-w-none lg:w-[55%]">
              <div className="aspect-video w-full overflow-hidden rounded-3xl bg-ink/5 lg:aspect-auto lg:h-full">
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={withBasePath(card.videoSrc)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
