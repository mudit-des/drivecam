import {
  FileVideo,
  ShieldCheck,
  ParkingCircle,
  Route,
  type LucideIcon,
} from "lucide-react";
import { Typography } from "@acko/typography";

interface Benefit {
  id: string;
  icon: LucideIcon;
  title: string;
  copy: string;
}

const BENEFITS: readonly Benefit[] = [
  {
    id: "evidence",
    icon: FileVideo,
    title: "Evidence when you need it",
    copy: "Review exactly what happened during an incident.",
  },
  {
    id: "claims",
    icon: ShieldCheck,
    title: "Supports insurance claims",
    copy: "Share footage when additional context is needed.",
  },
  {
    id: "parked",
    icon: ParkingCircle,
    title: "Protection while parked",
    copy: "Keep a record of unexpected incidents.",
  },
  {
    id: "captured",
    icon: Route,
    title: "Every journey captured",
    copy: "Drive without worrying about manually recording trips.",
  },
] as const;

export function WhyDriveCamHelps() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <div className="mb-10 max-w-2xl sm:mb-12 lg:mb-14">
          <Typography
            as="h2"
            id="why-heading"
            variant="display-md"
            color="primary"
            className="text-balance"
          >
            Why DriveCam matters
          </Typography>
          <div className="mt-4">
            <Typography as="p" variant="body-lg" color="secondary">
              The road can be unpredictable. Having a record of what happened
              can make all the difference.
            </Typography>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {BENEFITS.map(({ id, icon: Icon, title, copy }) => (
            <li
              key={id}
              className="acko-card acko-card-default acko-card-pad-md flex flex-col gap-4"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft">
                <Icon
                  className="h-6 w-6 text-accent"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Typography as="h3" variant="heading-sm" color="primary">
                  {title}
                </Typography>
                <Typography as="p" variant="body-md" color="secondary">
                  {copy}
                </Typography>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
