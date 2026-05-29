"use client";

import { useEffect, useMemo, useState } from "react";
import { Typography } from "@acko/typography";
import { Separator } from "@acko/separator";
import { Button } from "@acko/button";
import { groupByTopic, TOPICS, type TopicId } from "@/lib/faqs";
import { FaqAccordionItem } from "./FaqAccordionItem";

type FilterId = "all" | TopicId;

const TOPIC_ANCHOR_PREFIX = "topic-";

interface FaqBrowseProps {
  /**
   * Optional FAQ id (without the `faq-` prefix) to auto-expand on mount.
   * Resolves from a `?open=` query param or a `#faq-<id>` URL hash.
   */
  initialOpenFaqId?: string;
}

export function FaqBrowse({ initialOpenFaqId }: FaqBrowseProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [autoOpenId, setAutoOpenId] = useState<string | undefined>(
    initialOpenFaqId,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;
    const match = hash.match(/^#faq-(.+)$/);
    if (match?.[1]) {
      setAutoOpenId(match[1]);
      setActiveFilter("all");
    }
  }, []);

  const groups = useMemo(() => {
    const all = groupByTopic();
    if (activeFilter === "all") return all;
    return all.filter((g) => g.topic.id === activeFilter);
  }, [activeFilter]);

  const filters = useMemo<{ id: FilterId; label: string }[]>(
    () => [
      { id: "all", label: "All topics" },
      ...TOPICS.map((t) => ({ id: t.id, label: t.label })),
    ],
    [],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter FAQs by topic"
        className="mb-8 flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          const isTopic = filter.id !== "all";
          return (
            <Button
              key={filter.id}
              variant={isActive ? "primary" : "secondary"}
              size="sm"
              onClick={() => {
                setActiveFilter(filter.id);
                if (isTopic && typeof document !== "undefined") {
                  const el = document.getElementById(
                    `${TOPIC_ANCHOR_PREFIX}${filter.id}`,
                  );
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }
              }}
              aria-pressed={isActive}
            >
              {filter.label}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        {groups.map(({ topic, items }) => (
          <section
            key={topic.id}
            id={`${TOPIC_ANCHOR_PREFIX}${topic.id}`}
            aria-labelledby={`topic-heading-${topic.id}`}
            className="acko-card acko-card-default acko-card-pad-md scroll-mt-32"
          >
            <div className="pb-3">
              <Typography
                as="h2"
                id={`topic-heading-${topic.id}`}
                variant="overline"
                color="brand"
              >
                {topic.label}
              </Typography>
              {topic.description && (
                <div className="mt-1">
                  <Typography variant="body-sm" color="secondary">
                    {topic.description}
                  </Typography>
                </div>
              )}
            </div>

            <Separator decorative />

            {items.map((faq, idx) => (
              <div key={faq.id}>
                <FaqAccordionItem
                  id={`faq-${faq.id}`}
                  question={faq.question}
                  answer={faq.answer}
                  defaultOpen={autoOpenId === faq.id}
                  scrollIntoViewOnOpen={autoOpenId === faq.id}
                />
                {idx < items.length - 1 && <Separator decorative />}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
