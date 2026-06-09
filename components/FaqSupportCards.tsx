import { Mail, MessageCircle, Phone } from "lucide-react";
import { Typography } from "@acko/typography";

const SUPPORT_EMAIL = "drivecamhelp@acko.com";
const SUPPORT_PHONE_DISPLAY = "1800 266 2256";
const SUPPORT_PHONE_HREF = "tel:+918002662256";

interface FaqSupportCardsProps {
  /** Show the built-in "Still need help?" heading. Defaults to true. */
  showHeading?: boolean;
}

export function FaqSupportCards({ showHeading = true }: FaqSupportCardsProps = {}) {
  return (
    <div>
      {showHeading && (
        <Typography as="h3" variant="heading-md" color="primary">
          Still need help?
        </Typography>
      )}
      <div className={`${showHeading ? "mt-6 " : ""}grid grid-cols-1 gap-4 sm:grid-cols-3`}>
        <div className="acko-card border border-line bg-surface-tint p-6 sm:p-8 flex flex-col items-start gap-3">
          <MessageCircle
            className="h-6 w-6 text-ink-muted"
            strokeWidth={2}
            aria-hidden
          />
          <Typography variant="body-md" color="primary">
            Chat in app for help
          </Typography>
        </div>

        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="acko-card border border-line bg-surface-tint p-6 sm:p-8 flex flex-col items-start gap-3"
        >
          <Mail
            className="h-6 w-6 text-ink-muted"
            strokeWidth={2}
            aria-hidden
          />
          <Typography variant="body-md" color="primary">
            {SUPPORT_EMAIL}
          </Typography>
        </a>

        <a
          href={SUPPORT_PHONE_HREF}
          className="acko-card border border-line bg-surface-tint p-6 sm:p-8 flex flex-col items-start gap-3"
        >
          <Phone
            className="h-6 w-6 text-ink-muted"
            strokeWidth={2}
            aria-hidden
          />
          <Typography variant="body-md" color="primary">
            {SUPPORT_PHONE_DISPLAY}
          </Typography>
        </a>
      </div>
    </div>
  );
}
