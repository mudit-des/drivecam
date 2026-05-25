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
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <AckoWordmark width={90} height={22} />
    </Link>
  );
}
