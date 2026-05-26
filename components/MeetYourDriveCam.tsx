"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typography } from "@acko/typography";
import { withBasePath } from "@/lib/assets";

interface FeatureCard {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
}

const FEATURE_CARDS: readonly FeatureCard[] = [
  {
    id: "smart-recording",
    eyebrow: "Smart Recording",
    headline: "See clearly after dark.",
    description:
      "Enhanced night vision captures sharper details in low-light conditions, helping you keep a reliable record of every drive.",
  },
  {
    id: "dual-perspective",
    eyebrow: "Dual Perspective",
    headline: "Flip. Rotate. Capture everything.",
    description:
      "The 360° rotating camera lets you record inside the cabin, outside the vehicle, or anywhere in between.",
  },
  {
    id: "quad-hd-quality",
    eyebrow: "Quad HD Quality",
    headline: "Every detail. Preserved.",
    description:
      "Superior Quad HD recording delivers crisp footage and greater clarity when the details matter most.",
  },
] as const;

export function MeetYourDriveCam() {
  const headingId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !viewportRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(
        (el): el is HTMLElement => el !== null,
      );
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();

      // Full cinematic experience for users who allow motion.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cards, {
          rotateX: 85,
          opacity: 0,
          z: -40,
          force3D: true,
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=250%",
            pin: viewportRef.current,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // Each card occupies a 1/3 slice of the timeline:
        //   enter (~30%) -> hold (~40%) -> exit (~30%)
        // The final card holds longer instead of exiting before release.
        const SLOT = 1 / cards.length;
        const ENTER = 0.30;
        const EXIT = 0.30;

        cards.forEach((card, idx) => {
          const slotStart = idx * SLOT;
          const enterEnd = slotStart + SLOT * ENTER;
          const exitStart = slotStart + SLOT * (1 - EXIT);
          const exitEnd = slotStart + SLOT;
          const isLast = idx === cards.length - 1;

          tl.fromTo(
            card,
            { rotateX: 85, opacity: 0, z: -40 },
            {
              rotateX: 0,
              opacity: 1,
              z: 0,
              ease: "power2.out",
              duration: enterEnd - slotStart,
            },
            slotStart,
          );

          if (!isLast) {
            tl.to(
              card,
              {
                rotateX: -75,
                opacity: 0,
                z: -40,
                ease: "power2.in",
                duration: exitEnd - exitStart,
              },
              exitStart,
            );
          }
        });
      });

      // Reduced-motion fallback: short pin, simple cross-fades, no 3D.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, {
          rotateX: 0,
          z: 0,
          opacity: 0,
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            pin: viewportRef.current,
            pinSpacing: true,
            scrub: true,
          },
        });

        const SLOT = 1 / cards.length;
        cards.forEach((card, idx) => {
          const slotStart = idx * SLOT;
          const isLast = idx === cards.length - 1;

          tl.fromTo(
            card,
            { opacity: 0 },
            { opacity: 1, duration: SLOT * 0.35 },
            slotStart,
          );

          if (!isLast) {
            tl.to(
              card,
              { opacity: 0, duration: SLOT * 0.25 },
              slotStart + SLOT * 0.75,
            );
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      aria-labelledby={headingId}
      className="relative bg-[#0b0b0f] text-white"
    >
      {/* Sticky cinematic viewport pinned for the duration of the section */}
      <div
        ref={viewportRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Ambient backdrop gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(104,65,230,0.18),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="container-page relative flex h-full flex-col">
          {/* Section header — minimal, kept top of viewport */}
          <header className="pt-[max(env(safe-area-inset-top),5rem)] sm:pt-24 lg:pt-28">
            <div className="mx-auto max-w-3xl text-center">
              <Typography
                as="span"
                variant="overline"
                className="!text-white/55"
              >
                Meet Your DriveCam
              </Typography>
              <div className="mt-3">
                <Typography
                  as="h2"
                  id={headingId}
                  variant="display-md"
                  className="!text-white text-balance"
                >
                  Built to capture every drive.
                </Typography>
              </div>
            </div>
          </header>

          {/* Stage: product visual + hinged cards */}
          <div className="relative flex-1">
            {/* Mobile/tablet: stacked column. Desktop: split with cards layered to the right. */}
            <div className="grid h-full grid-rows-[3fr_4fr] items-center gap-6 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10">
              {/* Persistent DriveCam product visual */}
              <div className="relative flex items-center justify-center lg:col-span-7">
                <div className="relative w-full max-w-[640px]">
                  <div
                    aria-hidden
                    className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(104,65,230,0.22),transparent_60%)] blur-2xl"
                  />
                  <video
                    src={withBasePath("/hero.mp4")}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="block h-auto w-full rounded-3xl"
                  />
                </div>
              </div>

              {/* Hinged card stack */}
              <div className="relative flex items-center justify-center pb-10 lg:col-span-5 lg:pb-0">
                <div
                  className="scene-3d relative w-full max-w-[440px]"
                  aria-live="polite"
                >
                  {/* Reserve consistent height so cards can stack absolutely without collapsing layout */}
                  <div className="relative aspect-[5/4] sm:aspect-[6/5]">
                    {FEATURE_CARDS.map((card, idx) => (
                      <article
                        key={card.id}
                        ref={(el) => {
                          cardRefs.current[idx] = el;
                        }}
                        className="hinge-card glass-surface-dark absolute inset-0 flex flex-col justify-between rounded-3xl p-7 sm:p-9"
                      >
                        <Typography
                          as="span"
                          variant="overline"
                          className="!text-white/55"
                        >
                          {card.eyebrow}
                        </Typography>
                        <div className="mt-auto">
                          <Typography
                            as="h3"
                            variant="display-sm"
                            className="!text-white text-balance"
                          >
                            {card.headline}
                          </Typography>
                          <div className="mt-4 max-w-md">
                            <Typography
                              variant="body-md"
                              className="!text-white/70"
                            >
                              {card.description}
                            </Typography>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
