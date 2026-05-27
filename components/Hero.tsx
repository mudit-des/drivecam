import Link from "next/link";
import { PlayCircle, Aperture, Wifi, Video, BookOpen } from "lucide-react";
import { Typography } from "@acko/typography";
import { HeroVideo } from "./HeroVideo";

const TRUST_POINTS = [
  { icon: Wifi,     label: "Plug & play setup"        },
  { icon: Video,    label: "1080p HD recording"       },
  { icon: Aperture, label: "156° wide angle viewing"  },
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
                Protection starts
              </Typography>
              <Typography
                as="span"
                variant="display-md"
                color="secondary"
                className="block"
              >
                the moment you hit the road.
              </Typography>
            </h1>

            <div className="mt-5 max-w-xl mx-auto lg:mx-0">
              <Typography variant="body-lg" color="secondary">
                The ACKO DriveCam records what matters most—helping bring
                clarity during disputes, whether you&apos;re driving
                alone or with family.
              </Typography>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="#features"
                className="acko-btn acko-btn-primary acko-btn-lg"
              >
                <span className="acko-btn-content">
                  <span className="acko-btn-icon">
                    <PlayCircle className="h-5 w-5" />
                  </span>
                  <span className="acko-btn-label">Explore Features</span>
                </span>
              </Link>
              <Link
                href="#installation"
                className="acko-btn acko-btn-secondary acko-btn-lg"
              >
                <span className="acko-btn-content">
                  <span className="acko-btn-icon">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <span className="acko-btn-label">Setup DriveCam</span>
                </span>
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 lg:flex-nowrap lg:justify-start lg:gap-x-5">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 whitespace-nowrap">
                  <Icon className="h-4 w-4 text-ink-muted" strokeWidth={2} />
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

