"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    id: "front-rear",
    number: "01",
    category: "Front & Rear Camera Coverage",
    headline: "Protection from every angle",
    description:
      "Dual cameras continuously capture what happens ahead and behind your vehicle, helping provide evidence when you need it most.",
    videoSrc: "/videos/flip-camera.mp4",
  },
  {
    id: "parking",
    number: "02",
    category: "Parking Surveillance",
    headline: "Watching even when you're away",
    description:
      "Keeps an eye on your vehicle while parked and records suspicious activity or impacts, even when you're not around.",
    videoSrc: "/videos/night-vision.mp4",
  },
  {
    id: "instant-access",
    number: "03",
    category: "Instant Access to Footage",
    headline: "Your recordings, always within reach",
    description:
      "Review, download, and manage important recordings directly from the DriveCam app whenever you need them.",
    videoSrc: "/hero.mp4",
  },
] as const;

function playVideo(v: HTMLVideoElement | null | undefined) {
  if (!v) return;
  try {
    v.currentTime = 0;
  } catch {
    /* iOS may throw before metadata loads; ignore */
  }
  void v.play().catch(() => {
    /* swallow autoplay rejection */
  });
}

export function MeetYourDriveCam() {
  const headingId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current || !stackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(
        (el): el is HTMLElement => el !== null,
      );
      const videos = videoRefs.current;
      if (cards.length === 0) return;

      // Reset everything to a calm visible state.
      gsap.set(cards, { y: 0, scale: 1, force3D: true });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isStack:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isFlat:
            "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (ctxQ) => {
          const conds = ctxQ.conditions as Record<string, boolean>;

          if (conds.isFlat || conds.isReduced) {
            cards.forEach((card, i) => {
              ScrollTrigger.create({
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                onEnter: () => playVideo(videos[i]),
                onEnterBack: () => playVideo(videos[i]),
                onLeave: () => videos[i]?.pause(),
                onLeaveBack: () => videos[i]?.pause(),
              });
            });
            return;
          }

          // Desktop / tablet stack mechanic.
          gsap.set(cards[0], { y: 0, yPercent: 0, scale: 1 });
          gsap.set(cards[1], { y: 0, yPercent: 120, scale: 0.985 });
          gsap.set(cards[2], { y: 0, yPercent: 120, scale: 0.97 });

          const tl = gsap.timeline({
            defaults: { ease: "power2.out", force3D: true },
            scrollTrigger: {
              trigger: stackRef.current,
              start: "top top",
              end: "bottom bottom",
              pin: pinRef.current,
              pinSpacing: false,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          const HALF = 0.5;
          const SHIFT_PX = 24;

          // Phase 1 (0 -> HALF): card 2 lands; card 1 shifts down + scales.
          tl.to(
            cards[1],
            { yPercent: 0, scale: 1, duration: HALF },
            0,
          );
          tl.to(
            cards[0],
            { y: SHIFT_PX, scale: 0.985, duration: HALF },
            0,
          );

          // Phase 2 (HALF -> 1): card 3 lands; card 2 shifts down + scales; card 1 shifts further.
          tl.to(
            cards[2],
            { yPercent: 0, scale: 1, duration: HALF },
            HALF,
          );
          tl.to(
            cards[1],
            { y: SHIFT_PX, scale: 0.985, duration: HALF },
            HALF,
          );
          tl.to(
            cards[0],
            { y: SHIFT_PX * 2, scale: 0.97, duration: HALF },
            HALF,
          );

          // Active-video swap based on scroll progress.
          let lastActive = -1;
          ScrollTrigger.create({
            trigger: stackRef.current,
            start: "top top",
            end: "bottom bottom",
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                2,
                Math.max(0, Math.floor(self.progress * 3)),
              );
              if (idx !== lastActive) {
                if (lastActive >= 0) videos[lastActive]?.pause();
                playVideo(videos[idx]);
                lastActive = idx;
              }
            },
          });

          // Prime the first video so the section opens with motion.
          playVideo(videos[0]);
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      aria-labelledby={headingId}
      className="relative bg-surface-tint"
    >
      {/* Intro slab */}
      <div className="container-page py-24 text-center md:py-28 lg:py-32">
        <Typography
          as="h2"
          id={headingId}
          variant="display-md"
          className="!text-ink text-balance"
        >
          Meet Your DriveCam
        </Typography>
        <div className="mx-auto mt-4 max-w-2xl">
          <Typography variant="body-lg" color="secondary">
            Three capabilities working in concert to keep a reliable record of
            every drive.
          </Typography>
        </div>
      </div>

      {/* Stack scroll range — 300vh on md+, normal flow on mobile */}
      <div
        ref={stackRef}
        className="relative md:h-[300vh]"
      >
        <div
          ref={pinRef}
          className="space-y-12 pb-24 md:flex md:h-screen md:items-center md:justify-center md:space-y-0 md:overflow-hidden md:pb-0"
        >
          {CARDS.map((card, i) => (
            <article
              key={card.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="relative mx-4 flex w-[calc(100%-2rem)] max-w-[1180px] flex-col gap-6 overflow-hidden rounded-[32px] bg-white p-8 shadow-floating will-change-transform sm:mx-6 sm:w-[calc(100%-3rem)] sm:p-10 md:absolute md:inset-x-0 md:top-1/2 md:mx-auto md:h-[640px] md:-translate-y-1/2 lg:flex-row lg:items-stretch lg:gap-12 lg:p-14 lg:h-[680px]"
              style={{ zIndex: i + 1 }}
            >
              {/* Left 45% on desktop */}
              <div className="flex flex-col justify-between lg:w-[45%]">
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
                <div className="mt-8 lg:mt-0">
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
              <div className="lg:w-[55%]">
                <div className="aspect-video w-full overflow-hidden rounded-3xl bg-ink/5 lg:aspect-auto lg:h-full">
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={withBasePath(card.videoSrc)}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="block h-full w-full object-cover"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
