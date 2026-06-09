import Link from "next/link";
import { PlayCircle, CheckCircle2, BookOpen } from "lucide-react";
import { Typography } from "@acko/typography";
import { HeroVideo } from "./HeroVideo";

const TRUST_POINTS = [
  "Records every drive automatically",
  "Clear footage, day and night",
  "Setup in minutes",
];

export function Hero() {
  return (
    <section
      id="drivecam"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white pt-32 sm:pt-36 lg:pt-44"
    >
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-grid-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-white/60 blur-3xl"
      />

      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left: copy */}
          <div className="order-2 text-center lg:order-none lg:col-span-6 lg:text-left">
            <h1
              id="hero-heading"
              className="mt-6 text-balance"
            >
              <Typography
                as="span"
                variant="display-md"
                color="primary"
                className="block"
              >
                Drive with proof.
              </Typography>
              <Typography
                as="span"
                variant="display-md"
                color="secondary"
                className="block"
              >
                Not guesswork.
              </Typography>
            </h1>

            <div className="mt-5 max-w-xl mx-auto space-y-3 lg:mx-0">
              <Typography as="p" variant="body-lg" color="secondary">
                Every drive is recorded. Every important moment is saved.
              </Typography>
              <Typography as="p" variant="body-lg" color="secondary">
                So if something unexpected happens on the road, you&apos;ve got
                the footage to back you up.
              </Typography>
              <Typography as="p" variant="body-lg" color="secondary">
                Setup takes just a few minutes.
              </Typography>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="#why"
                className="acko-btn acko-btn-primary acko-btn-lg min-w-[15rem]"
              >
                <span className="acko-btn-content">
                  <span className="acko-btn-icon">
                    <PlayCircle className="h-5 w-5" />
                  </span>
                  <span className="acko-btn-label">Get Started</span>
                </span>
              </Link>
              <Link
                href="#installation"
                className="acko-btn acko-btn-secondary acko-btn-lg min-w-[15rem]"
              >
                <span className="acko-btn-content">
                  <span className="acko-btn-icon">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <span className="acko-btn-label">Installation Guide</span>
                </span>
              </Link>
            </div>

            <ul className="mt-10 flex flex-col items-center gap-3 lg:items-start">
              {TRUST_POINTS.map((label) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent" strokeWidth={2} />
                  <Typography variant="label-md" color="secondary">
                    {label}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: hero video */}
          <div className="relative order-1 lg:order-none lg:col-span-6">
            <HeroVideo />
          </div>
        </div>
      </div>

      <div className="h-24 sm:h-32 lg:h-40" />
    </section>
  );
}
