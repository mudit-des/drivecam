"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Typography } from "@acko/typography";
import { Separator } from "@acko/separator";
import { Button } from "@acko/button";
import {
  FAQS,
  HOME_CATEGORIES,
  groupByHomeCategory,
  type HomeCategoryId,
} from "@/lib/faqs";
import { FaqAccordionItem } from "./FaqAccordionItem";
import { FaqSupportCards } from "./FaqSupportCards";

type FilterId = "all" | HomeCategoryId;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  ...HOME_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

export function Troubleshooting() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const visibleGroups = useMemo(() => {
    const faqs =
      activeFilter === "all"
        ? FAQS
        : FAQS.filter((faq) => faq.homeCategoryId === activeFilter);
    return groupByHomeCategory(faqs);
  }, [activeFilter]);

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <Typography
              as="h2"
              id="faqs-heading"
              variant="display-sm"
              color="primary"
            >
              Troubleshooting &amp; FAQs
            </Typography>
            <Link
              href="/faqs"
              aria-label="View all troubleshooting articles and FAQs"
              className="acko-btn acko-btn-secondary acko-btn-sm flex-shrink-0"
            >
              <span className="acko-btn-content">
                <span className="acko-btn-label">View all</span>
                <span className="acko-btn-icon">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </span>
            </Link>
          </div>
          <div className="mt-3 max-w-2xl">
            <Typography variant="body-lg" color="secondary">
              Running into an issue? Find answers to the most common DriveCam
              questions below.
            </Typography>
          </div>
        </div>

        <div className="mb-8">
          <div
            role="group"
            aria-label="Filter FAQs by category"
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <Button
                  key={filter.id}
                  variant={isActive ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={isActive}
                >
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4" aria-live="polite">
          {visibleGroups.length === 0 ? (
            <Typography variant="body-md" color="secondary">
              No FAQs found for this category.
            </Typography>
          ) : (
            visibleGroups.map(({ category, items }) => (
              <div
                key={category.id}
                className="acko-card acko-card-default acko-card-pad-md"
              >
                <div className="pb-3">
                  <Typography variant="overline" color="brand">
                    {category.label}
                  </Typography>
                </div>

                <Separator decorative />

                {items.map((faq, idx) => (
                  <div key={faq.id}>
                    <FaqAccordionItem
                      id={`faq-${faq.id}`}
                      question={faq.question}
                      answer={faq.answer}
                    />
                    {idx < items.length - 1 && <Separator decorative />}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        <div className="mt-12">
          <FaqSupportCards />
        </div>
      </div>
    </section>
  );
}
