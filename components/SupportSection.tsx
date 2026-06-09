import { Typography } from "@acko/typography";
import { FaqSupportCards } from "./FaqSupportCards";

export function SupportSection() {
  return (
    <section
      id="support"
      aria-labelledby="support-heading"
      className="scroll-mt-32 bg-surface-tint py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <Typography
            as="h2"
            id="support-heading"
            variant="display-md"
            color="primary"
            className="text-balance"
          >
            Still stuck?
          </Typography>
          <div className="mt-4">
            <Typography as="p" variant="body-lg" color="secondary">
              We&apos;re here to help. Chat with us in the ACKO app, call us,
              or send us an email. We&apos;ll help you get back on the road.
            </Typography>
          </div>
        </div>

        <FaqSupportCards showHeading={false} />
      </div>
    </section>
  );
}
