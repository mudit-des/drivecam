"use client";

import type { MouseEvent, ReactNode } from "react";

interface InPageAnchorProps {
  href: `#${string}`;
  className?: string;
  children: ReactNode;
}

const SCROLL_DURATION_MS = 1100;

let scrollAnimationFrame = 0;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function targetScrollY(element: HTMLElement): number {
  const marginTop = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  return element.getBoundingClientRect().top + window.scrollY - marginTop;
}

function animateScrollTo(destinationY: number): void {
  cancelAnimationFrame(scrollAnimationFrame);

  const startY = window.scrollY;
  const distance = destinationY - startY;
  if (Math.abs(distance) < 1) return;

  const startTime = performance.now();

  const tick = (now: number) => {
    const t = Math.min(1, (now - startTime) / SCROLL_DURATION_MS);
    window.scrollTo(0, startY + distance * easeOutCubic(t));
    if (t < 1) {
      scrollAnimationFrame = requestAnimationFrame(tick);
    }
  };

  scrollAnimationFrame = requestAnimationFrame(tick);
}

export function InPageAnchor({ href, className, children }: InPageAnchorProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const destinationY = targetScrollY(target);
    if (prefersReducedMotion()) {
      window.scrollTo(0, destinationY);
    } else {
      animateScrollTo(destinationY);
    }
    window.history.pushState(null, "", href);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
