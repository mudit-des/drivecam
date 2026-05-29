"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";
import { Typography } from "@acko/typography";

interface FaqAccordionItemProps {
  id?: string;
  question: ReactNode;
  answer: ReactNode;
  defaultOpen?: boolean;
  scrollIntoViewOnOpen?: boolean;
}

export function FaqAccordionItem({
  id,
  question,
  answer,
  defaultOpen = false,
  scrollIntoViewOnOpen = false,
}: FaqAccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const generatedId = useId();
  const buttonId = `faq-btn-${id ?? generatedId}`;
  const panelId = `faq-panel-${id ?? generatedId}`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setOpen(defaultOpen);
  }, [defaultOpen]);

  useEffect(() => {
    if (!scrollIntoViewOnOpen || !open) return;
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const isOutOfView = rect.top < 96 || rect.bottom > window.innerHeight;
    if (isOutOfView) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [open, scrollIntoViewOnOpen]);

  return (
    <div ref={wrapperRef} id={id}>
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 rounded-md"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <Typography variant="label-lg" color="primary" as="span">
          {question}
        </Typography>
        <ChevronDown
          className="flex-shrink-0 h-5 w-5 transition-transform duration-200"
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
          className="pb-4 flex flex-col gap-3"
        >
          {answer}
        </div>
      )}
    </div>
  );
}
