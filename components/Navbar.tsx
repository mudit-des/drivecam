"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "DriveCam", href: "#drivecam" },
  { label: "Installation Guide", href: "#installation" },
  { label: "FAQs", href: "#faqs" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "pt-3 sm:pt-4" : "pt-5 sm:pt-6",
      ].join(" ")}
    >
      <div className="container-page">
        <nav
          aria-label="Primary"
          className={[
            "relative mx-auto flex w-full max-w-[1080px] items-center justify-between rounded-full border border-line bg-white/80 pl-5 pr-2 py-2 glass-surface transition-all duration-300",
            isScrolled ? "shadow-floating border-line-strong" : "shadow-card",
          ].join(" ")}
        >
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors duration-200 hover:bg-surface-alt hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 md:hidden"
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" strokeWidth={2.2} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2.2} />
            )}
          </button>
        </nav>

        {/* Mobile panel */}
        <div
          id="mobile-nav"
          className={[
            "md:hidden",
            "mx-auto mt-3 w-full max-w-[1080px] origin-top transform-gpu overflow-hidden rounded-3xl border border-line bg-white shadow-floating transition-all duration-300",
            isMobileOpen
              ? "pointer-events-auto max-h-[420px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0",
          ].join(" ")}
        >
          <ul className="flex flex-col p-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-alt"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
