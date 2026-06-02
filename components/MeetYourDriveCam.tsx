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
    id: "night-vision",
    number: "01",
    category: "Night Vision",
    headline: "See clearly even when the road doesn't.",
    description:
      "Enhanced low-light recording for nighttime incidents.",
    videoSrc: "/videos/night-vision.mp4",
  },
  {
    id: "in-cabin",
    number: "02",
    category: "In-Cabin Recording",
    headline: "Record inside the cabin, too",
    description:
      "The 360 degree flip camera rotates to face inside the vehicle, capturing cabin moments alongside the road ahead.",
    videoSrc: "/videos/flip-camera.mp4",
  },
  {
    id: "quad-hd",
    number: "03",
    category: "Superior Quad HD Recording",
    headline: "The full picture, not just a slice.",
    description:
      "QHD clarity. 150°+ field of view. The full picture of what happened — not just a slice of it.",
    videoSrc: "/videos/quad-hd.mp4",
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
      gsap.set(cards, {
        rotateX: 0,
        scale: 1,
        y: 0,
        opacity: 1,
        force3D: true,
      });

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

          // Desktop / tablet peel-up stack mechanic.
          // Cards 2 and 3 sit slightly above the active card with smaller
          // scale, so their tops visibly peek above card 1 from first paint.
          // During each transition only the peeling card and the incoming
          // card animate; the third holds in place. Active cards keep scale
          // 1 throughout their peel so the video never visibly resizes.
          gsap.set(cards[0], { y: 0, scale: 1, rotateX: 0, opacity: 1 });
          gsap.set(cards[1], { y: -32, scale: 0.97, rotateX: 0, opacity: 1 });
          gsap.set(cards[2], { y: -64, scale: 0.94, rotateX: 0, opacity: 1 });

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut", force3D: true },
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

          // Timeline structure. Scroll range is 470vh (see stackRef class);
          // each existing phase keeps the same absolute 100vh of scroll it
          // had at 400vh, and the trailing 70vh hosts the card 3 hinge.
          //
          //   0.000 -> 0.213  card 1 rest (reader consumes copy)
          //   0.213 -> 0.426  phase 1: card 1 peels, card 2 grows to active
          //   0.426 -> 0.638  card 2 rest
          //   0.638 -> 0.851  phase 2: card 2 peels, card 3 grows to active
          //   0.851 -> 1.000  hinge: card 3 pivots 0 -> -6deg -> 0 around top
          const STACK_VH = 470;
          const PHASE_VH = 100;
          const HINGE_VH = 70;
          const PHASE_DUR = PHASE_VH / STACK_VH;
          const PHASE1_START = PHASE_VH / STACK_VH;       // 100vh from top
          const PHASE2_START = (3 * PHASE_VH) / STACK_VH; // 300vh from top
          const HINGE_START = (4 * PHASE_VH) / STACK_VH;  // 400vh from top
          const HINGE_DUR = HINGE_VH / STACK_VH;
          const LIFT_PX = -240;
          const TILT_DEG = -14;
          const HINGE_TILT_DEG = -6;
          const FADE_RATIO = 0.75; // hold visibility through 75% of phase, then commit

          // Phase 1: card 1 peels up; card 2 lands at active position.
          tl.to(
            cards[0],
            {
              y: LIFT_PX,
              rotateX: TILT_DEG,
              duration: PHASE_DUR,
              ease: "power3.in",
            },
            PHASE1_START,
          );
          tl.to(
            cards[0],
            {
              opacity: 0,
              duration: PHASE_DUR * (1 - FADE_RATIO),
              ease: "power2.in",
            },
            PHASE1_START + PHASE_DUR * FADE_RATIO,
          );
          tl.to(
            cards[1],
            {
              y: 0,
              scale: 1,
              duration: PHASE_DUR,
              ease: "power2.out",
            },
            PHASE1_START,
          );

          // Phase 2: card 2 peels up; card 3 lands at active position.
          tl.to(
            cards[1],
            {
              y: LIFT_PX,
              rotateX: TILT_DEG,
              duration: PHASE_DUR,
              ease: "power3.in",
            },
            PHASE2_START,
          );
          tl.to(
            cards[1],
            {
              opacity: 0,
              duration: PHASE_DUR * (1 - FADE_RATIO),
              ease: "power2.in",
            },
            PHASE2_START + PHASE_DUR * FADE_RATIO,
          );
          tl.to(
            cards[2],
            {
              y: 0,
              scale: 1,
              duration: PHASE_DUR,
              ease: "power2.out",
            },
            PHASE2_START,
          );

          // Hinge: once card 3 has landed, the stack feels physically attached
          // to a hinge along card 3's top edge. The pivot eases in to -6deg
          // and resolves back to flat so the section unpins in its original
          // visual state. Origin is switched only for this segment; cards 1
          // and 2 keep their default center origin used by the peel motion.
          tl.set(
            cards[2],
            { transformOrigin: "50% 0%" },
            HINGE_START,
          );
          tl.to(
            cards[2],
            {
              rotateX: HINGE_TILT_DEG,
              duration: HINGE_DUR / 2,
              ease: "sine.inOut",
            },
            HINGE_START,
          );
          tl.to(
            cards[2],
            {
              rotateX: 0,
              duration: HINGE_DUR / 2,
              ease: "sine.inOut",
            },
            HINGE_START + HINGE_DUR / 2,
          );
          tl.set(
            cards[2],
            { transformOrigin: "50% 50%" },
            ">",
          );

          // Active-video swap. Fires at the midpoint of each transition so
          // the video flips when the visual handoff is most balanced. Card 3
          // stays the active video through the hinge segment.
          const PHASE1_MID = PHASE1_START + PHASE_DUR / 2;
          const PHASE2_MID = PHASE2_START + PHASE_DUR / 2;
          let lastActive = -1;
          ScrollTrigger.create({
            trigger: stackRef.current,
            start: "top top",
            end: "bottom bottom",
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const idx = p < PHASE1_MID ? 0 : p < PHASE2_MID ? 1 : 2;
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

      {/* Stack scroll range — 470vh on md+, normal flow on mobile.
          400vh hosts the existing card 1/2 peel timeline at identical scroll
          distances; the trailing 70vh is dedicated to card 3's hinge. */}
      <div
        ref={stackRef}
        className="relative md:h-[470vh]"
      >
        <div
          ref={pinRef}
          className="space-y-12 pb-24 md:flex md:h-screen md:items-center md:justify-center md:space-y-0 md:overflow-hidden md:pb-0"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 30%" }}
        >
          {CARDS.map((card, i) => (
            <article
              key={card.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="relative mx-4 flex w-[calc(100%-2rem)] max-w-[1180px] flex-col gap-6 overflow-hidden rounded-[32px] border border-line bg-white p-8 shadow-floating will-change-transform sm:mx-6 sm:w-[calc(100%-3rem)] sm:p-10 md:absolute md:inset-x-0 md:top-1/2 md:mx-auto md:h-[640px] md:-translate-y-1/2 lg:flex-row lg:items-stretch lg:gap-12 lg:p-14 lg:h-[680px]"
              style={{ zIndex: CARDS.length - i }}
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
