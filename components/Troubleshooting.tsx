"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Typography } from "@acko/typography";
import { Separator } from "@acko/separator";
import { Button } from "@acko/button";
import {
  FAQS,
  HOME_CATEGORIES,
  groupByHomeCategory,
  type Faq,
  type HomeCategoryId,
} from "@/lib/faqs";
import { FaqAccordionItem } from "./FaqAccordionItem";

type FilterId = "all" | HomeCategoryId;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  ...HOME_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

const RELATED_LIMIT = 2;

function getRelatedFaqs(current: Faq): Faq[] {
  return FAQS.filter(
    (f) => f.homeCategoryId === current.homeCategoryId && f.id !== current.id,
  ).slice(0, RELATED_LIMIT);
}

export function Troubleshooting() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");

  const visibleGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = FAQS.filter((faq) => {
      const matchesCategory =
        activeFilter === "all" || faq.homeCategoryId === activeFilter;
      const matchesQuery =
        q.length === 0 || faq.searchBody.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
    return groupByHomeCategory(filtered);
  }, [activeFilter, query]);

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="scroll-mt-32 bg-surface-tint py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Typography
              as="h2"
              id="faqs-heading"
              variant="display-md"
              color="primary"
              className="text-balance"
            >
              Something not working?
            </Typography>
            <Link
              href="/faqs"
              aria-label="View all troubleshooting articles and FAQs"
              className="acko-btn acko-btn-secondary acko-btn-sm"
            >
              <span className="acko-btn-content">
                <span className="acko-btn-label">View all</span>
                <span className="acko-btn-icon">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </span>
            </Link>
          </div>
          <div className="mt-4 max-w-2xl">
            <Typography variant="body-lg" color="secondary">
              Browse common questions below or watch the troubleshooting
              videos for guided help.
            </Typography>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label htmlFor="faqs-search" className="sr-only">
            Search common questions
          </label>
          <div className="relative max-w-xl">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <input
              id="faqs-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search common questions"
              className="w-full rounded-full border border-line bg-white py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        {/* Category chips */}
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

        {/* FAQ cards */}
        <div className="flex flex-col gap-4" aria-live="polite">
          {visibleGroups.length === 0 ? (
            <Typography variant="body-md" color="secondary">
              No FAQs match. Try a different keyword or browse by category.
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

                {items.map((faq, idx) => {
                  const related = getRelatedFaqs(faq);
                  return (
                    <div key={faq.id}>
                      <FaqAccordionItem
                        id={`faq-${faq.id}`}
                        question={faq.question}
                        answer={
                          <>
                            {faq.answer}
                            {related.length > 0 && (
                              <div className="mt-2 border-t border-line pt-3">
                                <Typography
                                  variant="caption"
                                  color="secondary"
                                  className="mb-1.5 block"
                                >
                                  Related
                                </Typography>
                                <ul className="flex flex-col gap-1.5">
                                  {related.map((r) => (
                                    <li key={r.id}>
                                      <a
                                        href={`#faq-${r.id}`}
                                        className="inline-flex items-start gap-1.5 text-sm text-accent hover:underline underline-offset-2"
                                      >
                                        <ArrowRight
                                          className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                                          aria-hidden
                                        />
                                        <span>{r.question}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        }
                      />
                      {idx < items.length - 1 && <Separator decorative />}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
