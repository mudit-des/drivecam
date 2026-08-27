import Link from "next/link";
import { AckoWordmark } from "./AckoWordmark";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="ACKO DriveCam home"
      className={`group inline-flex h-10 items-center leading-none ${className}`}
    >
      {/* Shift viewBox up so leftover space below the glyph is balanced in the 24px box */}
      <AckoWordmark
        width={98}
        height={24}
        viewBox="0 -0.42 120 29"
        className="block h-6 w-[98px] shrink-0"
      />
    </Link>
  );
}
