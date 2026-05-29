"use client";

import {
  Fragment,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Fuse, {
  type FuseResult,
  type FuseResultMatch,
  type IFuseOptions,
  type RangeTuple,
} from "fuse.js";
import { ChevronDown, Search, X } from "lucide-react";
import { Typography } from "@acko/typography";
import { Separator } from "@acko/separator";
import {
  FAQS,
  TOPICS,
  getPopularFaqs,
  type Faq,
  type TopicId,
} from "@/lib/faqs";
import { FaqAccordionItem } from "./FaqAccordionItem";

const TOPIC_LABEL_BY_ID = new Map<TopicId, string>(
  TOPICS.map((t) => [t.id, t.label]),
);

const FUSE_OPTIONS: IFuseOptions<Faq> = {
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  threshold: 0.4,
  minMatchCharLength: 2,
  keys: [
    { name: "question", weight: 0.55 },
    { name: "keywords", weight: 0.3 },
    { name: "snippet", weight: 0.1 },
    { name: "searchBody", weight: 0.05 },
  ],
};

const MAX_RESULTS = 20;

/**
 * Wrap matched character ranges in <mark>. Indices are inclusive on both ends
 * per Fuse.js semantics. Ranges are coming from a single matched key only.
 */
function highlightRanges(
  text: string,
  ranges: readonly RangeTuple[],
): ReactNode {
  if (!ranges.length) return text;
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const out: ReactNode[] = [];
  let cursor = 0;
  sorted.forEach(([start, end], i) => {
    if (start > cursor) out.push(text.slice(cursor, start));
    out.push(
      <mark
        key={`m-${i}-${start}`}
        className="bg-accent-soft text-ink rounded-sm px-0.5"
      >
        {text.slice(start, end + 1)}
      </mark>,
    );
    cursor = end + 1;
  });
  if (cursor < text.length) out.push(text.slice(cursor));
  return (
    <>
      {out.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}

function findMatchForKey(
  matches: readonly FuseResultMatch[] | undefined,
  key: string,
): FuseResultMatch | undefined {
  return matches?.find((m) => m.key === key);
}

interface ResultPreview {
  questionNode: ReactNode;
  snippetText: string;
  snippetRanges: readonly RangeTuple[];
}

function buildPreview(result: FuseResult<Faq>): ResultPreview {
  const faq = result.item;
  const questionMatch = findMatchForKey(result.matches, "question");
  const snippetMatch = findMatchForKey(result.matches, "snippet");
  const bodyMatch = findMatchForKey(result.matches, "searchBody");

  const questionNode =
    questionMatch && questionMatch.value
      ? highlightRanges(questionMatch.value, questionMatch.indices)
      : faq.question;

  let snippetText = faq.snippet;
  let snippetRanges: readonly RangeTuple[] = [];

  if (snippetMatch && snippetMatch.value) {
    snippetText = snippetMatch.value;
    snippetRanges = snippetMatch.indices;
  } else if (bodyMatch && bodyMatch.value && bodyMatch.indices.length > 0) {
    const [firstStart, firstEnd] = bodyMatch.indices[0];
    const center = Math.floor((firstStart + firstEnd) / 2);
    const half = 80;
    const start = Math.max(0, center - half);
    const end = Math.min(bodyMatch.value.length, center + half);
    const sliced = bodyMatch.value.slice(start, end);
    const prefix = start > 0 ? "…" : "";
    const suffix = end < bodyMatch.value.length ? "…" : "";
    snippetText = `${prefix}${sliced}${suffix}`;
    const offset = prefix.length - start;
    snippetRanges = bodyMatch.indices
      .map(([s, e]) => {
        const ns = Math.max(0, s + offset);
        const ne = Math.min(snippetText.length - 1, e + offset);
        return [ns, ne] as RangeTuple;
      })
      .filter(([s, e]) => e >= s && s < snippetText.length);
  }

  return { questionNode, snippetText, snippetRanges };
}

interface ResultItemProps {
  result: FuseResult<Faq>;
}

function ResultItem({ result }: ResultItemProps) {
  const faq = result.item;
  const [open, setOpen] = useState(false);
  const uid = useId();
  const buttonId = `search-result-btn-${uid}`;
  const panelId = `search-result-panel-${uid}`;

  const { questionNode, snippetText, snippetRanges } = useMemo(
    () => buildPreview(result),
    [result],
  );

  const topicLabel = TOPIC_LABEL_BY_ID.get(faq.topicId) ?? "FAQ";

  return (
    <article
      id={`search-faq-${faq.id}`}
      className="acko-card acko-card-default overflow-hidden"
      data-faq-id={faq.id}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left p-5 sm:p-6 flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 rounded-[inherit]"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <div className="min-w-0 flex-1 flex flex-col gap-2">
          <Typography variant="overline" color="brand">
            {topicLabel}
          </Typography>
          <Typography variant="label-lg" color="primary" as="span">
            {questionNode}
          </Typography>
          {!open && (
            <Typography
              variant="body-sm"
              color="secondary"
              as="p"
              className="line-clamp-2"
            >
              {highlightRanges(snippetText, snippetRanges)}
            </Typography>
          )}
        </div>
        <ChevronDown
          className="mt-1 flex-shrink-0 h-5 w-5 transition-transform duration-200"
          style={{
            color: "var(--colorPrimary, #6841e6)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 flex flex-col gap-3"
        >
          <Separator decorative />
          <div className="pt-1 flex flex-col gap-3">{faq.answer}</div>
        </div>
      )}
    </article>
  );
}

interface FaqSearchProps {
  initialQuery?: string;
  /** Called whenever the (debounced) active query changes. The empty string
   *  means there is no active query and the parent can show its browse view. */
  onActiveQueryChange?: (query: string) => void;
}

export function FaqSearch({
  initialQuery = "",
  onActiveQueryChange,
}: FaqSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const trimmed = deferredQuery.trim();

  useEffect(() => {
    onActiveQueryChange?.(trimmed);
  }, [trimmed, onActiveQueryChange]);

  const fuse = useMemo(() => new Fuse<Faq>(FAQS as Faq[], FUSE_OPTIONS), []);

  const results = useMemo<FuseResult<Faq>[]>(() => {
    if (!trimmed) return [];
    return fuse.search(trimmed, { limit: MAX_RESULTS });
  }, [fuse, trimmed]);

  const popularFaqs = useMemo(() => getPopularFaqs(6), []);

  const showEmptyState = trimmed.length > 0 && results.length === 0;
  const hasQuery = trimmed.length > 0;

  return (
    <div>
      {/* Search input */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search FAQs — try 'sd card', 'not connecting', 'audio'…"
          aria-label="Search FAQs"
          autoComplete="off"
          spellCheck={false}
          className="w-full h-14 sm:h-16 pl-14 pr-14 rounded-full border border-line bg-white text-base sm:text-lg text-ink placeholder:text-ink-muted shadow-card focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-alt hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Result count (a11y + visible micro-copy) */}
      <div className="mt-3 min-h-[1.25rem]" aria-live="polite">
        {hasQuery && !showEmptyState && (
          <Typography variant="body-sm" color="secondary">
            {results.length} {results.length === 1 ? "result" : "results"} for{" "}
            <strong className="text-ink">&ldquo;{trimmed}&rdquo;</strong>
          </Typography>
        )}
      </div>

      {/* Results / empty state */}
      {hasQuery && (
        <div className="mt-4">
          {showEmptyState ? (
            <div className="acko-card acko-card-default acko-card-pad-md">
              <Typography as="h3" variant="heading-sm" color="primary">
                We couldn&rsquo;t find an exact match for &ldquo;{trimmed}&rdquo;.
              </Typography>
              <div className="mt-2">
                <Typography variant="body-md" color="secondary">
                  Try a different keyword, or browse some of our most asked
                  questions below.
                </Typography>
              </div>

              {popularFaqs.length > 0 && (
                <div className="mt-6">
                  <Typography variant="overline" color="brand">
                    Most asked
                  </Typography>
                  <div className="mt-2">
                    <Separator decorative />
                    {popularFaqs.map((faq, idx) => (
                      <div key={faq.id}>
                        <FaqAccordionItem
                          id={`empty-faq-${faq.id}`}
                          question={faq.question}
                          answer={faq.answer}
                        />
                        {idx < popularFaqs.length - 1 && (
                          <Separator decorative />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {results.map((result) => (
                <li key={result.item.id}>
                  <ResultItem result={result} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
