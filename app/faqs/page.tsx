import type { Metadata } from "next";
import { Typography } from "@acko/typography";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FaqsPageContent } from "@/components/FaqsPageContent";
import { FaqSupportCards } from "@/components/FaqSupportCards";

export const metadata: Metadata = {
  title: "Troubleshooting & FAQs — ACKO DriveCam",
  description:
    "Setup guides and answers to common DriveCam questions. Search SD card, connectivity, recording, playback, and warranty topics.",
};

export default function FaqsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-tint">
      <Navbar />

      {/* Hero */}
      <section
        aria-labelledby="faqs-page-heading"
        className="relative isolate bg-white pt-32 sm:pt-36 lg:pt-40"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-grid-fade"
        />
        <div className="container-page pb-12 sm:pb-16">
          <Typography
            as="h1"
            id="faqs-page-heading"
            variant="display-md"
            color="primary"
            className="text-balance"
          >
            Troubleshooting &amp; FAQs
          </Typography>
          <div className="mt-4 max-w-2xl">
            <Typography variant="body-lg" color="secondary">
              Setup guides, troubleshooting tips, and answers. All in one
              place.
            </Typography>
          </div>
        </div>
      </section>

      {/* Search + browse */}
      <section
        aria-label="Search and browse FAQs"
        className="py-12 sm:py-16"
      >
        <div className="container-page">
          <FaqsPageContent />
        </div>
      </section>

      {/* Still need help */}
      <section
        aria-label="Contact support"
        className="pb-20 sm:pb-28"
      >
        <div className="container-page">
          <FaqSupportCards />
        </div>
      </section>

      <Footer />
    </main>
  );
}
