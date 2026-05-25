import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Typography } from "@acko/typography";

export function SdCardUpsell() {
  return (
    <div
      className="acko-card border border-line bg-surface-tint p-6 sm:p-8"
      role="complementary"
      aria-label="SD card recommendation"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">

        {/* SD card illustration */}
        <div className="mx-auto flex-shrink-0 sm:mx-0">
          <Image
            src="/microsd-charcoal-purple.png"
            alt="3D rendering of a microSD memory card"
            width={160}
            height={160}
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 flex-1">
          {/* Headline */}
          <Typography as="h3" variant="heading-md" color="primary">
            Make sure you have the right MicroSD card before setup.
          </Typography>

          {/* Supporting copy */}
          <Typography variant="body-md" color="secondary">
            Your DriveCam requires a <strong>Class 10 / UHS-I microSD card</strong> (up
            to 128 GB) for reliable loop recording and emergency clip storage.
            Without a compatible high-speed card, footage won&apos;t save
            correctly and recording reliability may be affected.
          </Typography>

          {/* CTA */}
          <div className="mt-1">
            <Link
              href="#"
              className="acko-btn acko-btn-primary acko-btn-md"
              aria-label="Order a compatible SD card for your DriveCam"
            >
              <span className="acko-btn-content">
                <span className="acko-btn-icon">
                  <ShoppingCart className="h-4 w-4" />
                </span>
                <span className="acko-btn-label">Order Now</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
