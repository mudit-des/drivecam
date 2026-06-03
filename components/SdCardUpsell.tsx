import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Typography } from "@acko/typography";
import { withBasePath } from "@/lib/assets";

const RECOMMENDED_CARDS = [
  {
    name: "Samsung PRO Endurance microSD",
    href: "https://www.amazon.in/s?k=Samsung+PRO+Endurance+microSD",
  },
  {
    name: "SanDisk High Endurance microSD",
    href: "https://www.amazon.in/s?k=SanDisk+High+Endurance+microSD",
  },
  {
    name: "Lexar Professional 1066x microSD",
    href: "https://www.amazon.in/s?k=Lexar+Professional+1066x+microSD",
  },
] as const;

const CARD_LINK_CLASS =
  "inline-flex items-center gap-1 font-medium text-ink hover:text-accent hover:underline underline-offset-2";

export function SdCardUpsell() {
  return (
    <div
      className="acko-card border border-line bg-surface-tint p-6 sm:p-8"
      role="complementary"
      aria-label="SD card recommendation"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">

        {/* SD card cluster — fanned upward from a common left-edge pivot */}
        <div className="relative mx-auto h-[120px] w-[100px] flex-shrink-0 sm:mx-0 sm:h-[150px] sm:w-[125px]">
          <Image
            src={withBasePath("/lexar-silver-plus.png")}
            alt="Lexar Silver Plus microSDXC memory card"
            width={100}
            height={100}
            className="absolute left-0 top-1/2 z-10 h-auto w-[80px] object-contain drop-shadow-md sm:w-[100px]"
            style={{
              transformOrigin: "0% 50%",
              transform: "translateY(-50%) rotate(-30deg)",
            }}
          />
          <Image
            src={withBasePath("/sandisk-extreme-pro.png")}
            alt="SanDisk Extreme PRO microSDXC memory card"
            width={100}
            height={100}
            className="absolute left-0 top-1/2 z-10 h-auto w-[80px] object-contain drop-shadow-md sm:w-[100px]"
            style={{
              transformOrigin: "0% 50%",
              transform: "translateY(-50%) rotate(-15deg)",
            }}
          />
          <Image
            src={withBasePath("/samsung-pro-endurance.png")}
            alt="Samsung PRO Endurance microSDXC memory card"
            width={100}
            height={100}
            priority
            className="absolute left-0 top-1/2 z-20 h-auto w-[80px] object-contain drop-shadow-lg sm:w-[100px]"
            style={{
              transformOrigin: "0% 50%",
              transform: "translateY(-50%) rotate(0deg)",
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 flex-1">
          {/* Headline */}
          <Typography as="h3" variant="heading-md" color="primary">
            Get the right microSD card first.
          </Typography>

          {/* Supporting copy */}
          <Typography variant="body-md" color="secondary">
            DriveCam records non-stop, so it needs an endurance card.{" "}
            <strong>Class 10, U3, V30.</strong> Up to <strong>512GB</strong>.
          </Typography>

          {/* Inline recommendations */}
          <div className="mt-1">
            <Typography variant="overline" color="secondary">
              Recommended
            </Typography>
            <Typography
              variant="body-md"
              color="secondary"
              className="mt-1.5 block"
            >
              <Link
                href={RECOMMENDED_CARDS[0].href}
                target="_blank"
                rel="noreferrer noopener"
                className={CARD_LINK_CLASS}
              >
                {RECOMMENDED_CARDS[0].name}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </Link>
              ,{" "}
              <Link
                href={RECOMMENDED_CARDS[1].href}
                target="_blank"
                rel="noreferrer noopener"
                className={CARD_LINK_CLASS}
              >
                {RECOMMENDED_CARDS[1].name}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </Link>
              , or{" "}
              <Link
                href={RECOMMENDED_CARDS[2].href}
                target="_blank"
                rel="noreferrer noopener"
                className={CARD_LINK_CLASS}
              >
                {RECOMMENDED_CARDS[2].name}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </Link>
              .
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
