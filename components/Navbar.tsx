"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ChatModal } from "./ChatModal";
import { Logo } from "./Logo";

type NavItem =
  | { label: string; href: string }
  | { label: string; action: "chat" };

const NAV_ITEMS: NavItem[] = [
  { label: "DriveCam", href: "/#drivecam" },
  { label: "Installation Guide", href: "/#installation" },
  { label: "Chat with us", action: "chat" },
];

const navLinkClass =
  "inline-flex h-10 items-center rounded px-4 text-sm font-normal text-ink-soft transition-colors duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30";

const chatBtnClass =
  "inline-flex h-10 items-center justify-center rounded-[12px] border border-[#0a0a0b] bg-transparent px-4 text-sm font-normal text-[#0a0a0b] transition-colors duration-150 hover:bg-[#0a0a0b] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30";

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const closeChat = useCallback(() => setIsChatOpen(false), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen || isChatOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isChatOpen, isMobileOpen]);

  return (
    <header className="fixed inset-x-0 top-6 z-50">
      <div className="container-page">
        <nav
          aria-label="Primary"
          className="acko-web-header relative mx-auto flex h-16 w-full items-center justify-between p-3"
        >
          <div className="flex h-10 items-center pl-2">
            <Logo />
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ul className="flex items-center">
              {NAV_ITEMS.filter((item) => "href" in item).map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={navLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isChatOpen}
              onClick={() => setIsChatOpen(true)}
              className={chatBtnClass}
            >
              <span className="acko-btn-content">
                <span className="acko-btn-label">Chat with us</span>
              </span>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-colors duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 md:hidden"
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
            "mx-auto mt-3 w-full origin-top transform-gpu overflow-hidden acko-web-header transition-all duration-300",
            isMobileOpen
              ? "pointer-events-auto max-h-[420px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0",
          ].join(" ")}
        >
          <ul className="flex flex-col p-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {"href" in item ? (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex h-10 items-center rounded px-4 text-sm font-normal text-ink-soft transition-colors duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={isChatOpen}
                    onClick={() => {
                      setIsMobileOpen(false);
                      setIsChatOpen(true);
                    }}
                    className={`${chatBtnClass} w-full`}
                  >
                    <span className="acko-btn-content">
                      <span className="acko-btn-label">{item.label}</span>
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ChatModal isOpen={isChatOpen} onClose={closeChat} />
    </header>
  );
}
