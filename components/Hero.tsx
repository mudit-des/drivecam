import Link from "next/link";
import { PlayCircle, Video, Smartphone, EyeOff, BookOpen } from "lucide-react";
import { Typography } from "@acko/typography";
import { HeroVideo } from "./HeroVideo";

const TRUST_POINTS = [
  { icon: Video,      label: "Records every drive, automatically" },
  { icon: Smartphone, label: "Footage stays on your device. Not our servers." },
  { icon: EyeOff,     label: "Your footage is never used in claim processing." },
];

export function Hero() {
  return (
    <section
      id="drivecam"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white pt-24 sm:pt-28 lg:pt-32"
    >
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-grid-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[1300px] -translate-x-1/2 rounded-full bg-white/60 blur-3xl"
      />

      <div className="container-page">
        <div className="flex flex-col items-center gap-6 text-center">

          <div className="w-full">
            <HeroVideo />
          </div>

          <div className="mx-auto w-full">
            <h1 id="hero-heading">
              <Typography
                as="span"
                variant="display-md"
                color="primary"
                className="block"
              >
                Insurance helps after an accident.
              </Typography>
              <Typography
                as="span"
                variant="display-md"
                color="secondary"
                className="block lg:whitespace-nowrap"
              >
                We built DriveCam for everything before it.
              </Typography>
            </h1>

            <div className="mx-auto mt-5 max-w-3xl">
              <Typography as="p" variant="body-lg" color="secondary">
                Wrong challan. Road rage. An accident where the other driver
                has a different story. DriveCam records from the moment your
                car starts &mdash; so when it happens, you have proof, not
                arguments. Your footage is yours. ACKO cannot access it.
                Ever.
              </Typography>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#specs-table"
                className="acko-btn acko-btn-primary acko-btn-lg min-w-[15rem]"
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
                className="acko-btn acko-btn-secondary acko-btn-lg min-w-[15rem]"
              >
                <span className="acko-btn-content">
                  <span className="acko-btn-icon">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <span className="acko-btn-label">Set it up</span>
                </span>
              </Link>
            </div>
          </div>

            <ul className="mt-4 flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-4">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center justify-center gap-2"
                >
                  <Icon className="h-4 w-4 shrink-0 text-ink-muted" strokeWidth={2} />
                  <Typography
                    variant="label-md"
                    color="secondary"
                    className="whitespace-nowrap"
                  >
                    {label}
                  </Typography>
                </li>
              ))}
            </ul>
        </div>
      </div>

      <div className="h-24 sm:h-32 lg:h-40" />
    </section>
  );
}

