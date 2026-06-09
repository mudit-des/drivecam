import {
  Sunrise,
  Milestone,
  Users,
  Car,
  ParkingCircle,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { Typography } from "@acko/typography";

interface UseCase {
  id: string;
  icon: LucideIcon;
  title: string;
  copy: string;
}

const USE_CASES: readonly UseCase[] = [
  {
    id: "daily-commute",
    icon: Sunrise,
    title: "Daily commute",
    copy: "Capture every commute. So if a small bump happens, you have proof.",
  },
  {
    id: "highway-travel",
    icon: Milestone,
    title: "Highway travel",
    copy: "Long drives, clear footage. Even at higher speeds.",
  },
  {
    id: "family-trips",
    icon: Users,
    title: "Family road trips",
    copy: "Memories on one side, an extra layer of safety on the other.",
  },
  {
    id: "ride-share",
    icon: Car,
    title: "Ride-share driving",
    copy: "An added layer of accountability for every passenger you carry.",
  },
  {
    id: "parking",
    icon: ParkingCircle,
    title: "Parking protection",
    copy: "Catch anyone who bumps into your car in the parking lot.",
  },
  {
    id: "incidents",
    icon: AlertTriangle,
    title: "Unexpected incidents",
    copy: "When something goes wrong, the footage tells the story.",
  },
] as const;

export function UseCases() {
  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <div className="mb-10 max-w-2xl sm:mb-12 lg:mb-14">
          <Typography
            as="h2"
            id="use-cases-heading"
            variant="display-md"
            color="primary"
            className="text-balance"
          >
            Built for everyday driving.
          </Typography>
          <div className="mt-4">
            <Typography as="p" variant="body-lg" color="secondary">
              From the school run to a weekend on the highway. DriveCam
              quietly works in the background.
            </Typography>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {USE_CASES.map(({ id, icon: Icon, title, copy }) => (
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
