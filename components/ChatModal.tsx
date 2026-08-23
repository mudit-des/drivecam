"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Typography } from "@acko/typography";
import { withBasePath } from "@/lib/assets";

interface ChatMessage {
  id: string;
  sender: "support" | "user";
  text: string;
}

interface ChatGroup {
  id: string;
  date: string;
  timestamp: string;
  messages: readonly ChatMessage[];
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_GROUPS: readonly ChatGroup[] = [
  {
    id: "21-aug",
    date: "21 Aug",
    timestamp: "15:56",
    messages: [
      {
        id: "afternoon",
        sender: "support",
        text: "Good afternoon! We're always available to help you with all your insurance needs.",
      },
      {
        id: "name",
        sender: "support",
        text: "Since we haven't met before, could we know your name?",
      },
    ],
  },
  {
    id: "yesterday",
    date: "Yesterday",
    timestamp: "16:21",
    messages: [
      {
        id: "hello-mudit",
        sender: "support",
        text: "Hello Mudit, good to see you again.",
      },
      {
        id: "assist",
        sender: "support",
        text: "How can I assist you with your insurance today?",
      },
    ],
  },
];

function formatClock(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function ChatAsset({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={className ?? "block size-full max-w-none"}
      src={withBasePath(src)}
    />
  );
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [message, setMessage] = useState("");
  const [followUp, setFollowUp] = useState<readonly ChatMessage[]>([]);
  const [followUpTime, setFollowUpTime] = useState("");
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(
    null,
  );

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  const sendMessage = (text: string) => {
    if (!text) return;
    const messageId = String(Date.now());
    setFollowUp((currentMessages) => [
      ...currentMessages,
      { id: messageId, sender: "user", text },
      {
        id: `${messageId}-reply`,
        sender: "support",
        text: "Thanks for your message. This demo chat is not connected to a live agent yet. You can reach DriveCam support at drivecamhelp@acko.com.",
      },
    ]);
    setFollowUpTime(formatClock(new Date()));
    setMessage("");
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(message.trim());
  };

  if (!isOpen) return null;

  return (
    <div
      className="chat-modal-layer"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="chat-modal-panel"
      >
        <header className="flex items-center justify-between bg-white px-4 pb-4 pt-5 shadow-[0_4px_6px_-2px_rgba(54,53,76,0.08)]">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              aria-label="More chat options"
              className="chat-modal-icon-button"
            >
              <span className="relative size-6 overflow-clip">
                <span className="absolute inset-[20.82%_44.79%_18.75%_44.79%]">
                  <ChatAsset src="/chat/menu.svg" className="absolute inset-0 block size-full max-w-none" />
                </span>
              </span>
            </button>

            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-[46px] w-[45px] shrink-0" aria-hidden="true">
                <span className="absolute left-0 top-0 size-[42px] overflow-clip rounded-full">
                  <ChatAsset src="/chat/avatar-bg.svg" className="absolute inset-0 block size-full max-w-none" />
                  <span className="absolute left-[calc(50%-1.93px)] top-[calc(50%-0.64px)] h-[27px] w-[33px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                    <ChatAsset
                      src="/chat/acko-expert.png"
                      className="absolute left-[-3%] top-0 h-full w-[316%] max-w-none"
                    />
                  </span>
                </span>
                <ChatAsset
                  src="/chat/online-status.svg"
                  className="absolute left-[30px] top-[31px] block size-[15px] max-w-none"
                />
              </div>

              <div className="min-w-0">
                <Typography
                  as="h2"
                  id={titleId}
                  variant="body-lg"
                  color="primary"
                  weight="bold"
                >
                  ACKO
                </Typography>
                <Typography variant="caption" className="text-[#434343]">
                  Available on chat 24x7
                </Typography>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="chat-modal-icon-button"
          >
            <span className="relative size-6 overflow-clip">
              <ChatAsset src="/chat/close.svg" />
            </span>
          </button>
        </header>

        <div className="chat-thread">
          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pr-6">
            {INITIAL_GROUPS.map((group) => (
              <div key={group.id} className="flex flex-col gap-2">
                <div className="chat-date-pill">
                  <Typography
                    variant="caption"
                    className="text-[10px] leading-[14px] text-[#757575]"
                  >
                    {group.date}
                  </Typography>
                </div>
                {group.messages.map((chatMessage) => (
                  <div
                    key={chatMessage.id}
                    className="chat-message chat-message-support"
                  >
                    <Typography variant="body-sm" color="primary">
                      {chatMessage.text}
                    </Typography>
                  </div>
                ))}
                <Typography
                  variant="caption"
                  className="text-[10px] leading-[14px] text-[#757575]"
                >
                  {group.timestamp}
                </Typography>
              </div>
            ))}

            <div className="flex items-center gap-2">
              <Typography variant="body-sm" color="secondary">
                Was this helpful?
              </Typography>
              <button
                type="button"
                aria-label="Mark chat as helpful"
                aria-pressed={feedback === "helpful"}
                onClick={() => setFeedback("helpful")}
                className="chat-feedback-button"
              >
                <ThumbsUp aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Mark chat as not helpful"
                aria-pressed={feedback === "not-helpful"}
                onClick={() => setFeedback("not-helpful")}
                className="chat-feedback-button"
              >
                <ThumbsDown aria-hidden="true" className="size-5" />
              </button>
            </div>

            {followUp.length > 0 ? (
              <div className="flex flex-col gap-2">
                {followUp.map((chatMessage) => (
                  <div
                    key={chatMessage.id}
                    className={
                      chatMessage.sender === "user"
                        ? "chat-message chat-message-user"
                        : "chat-message chat-message-support"
                    }
                  >
                    <Typography variant="body-sm" color="primary">
                      {chatMessage.text}
                    </Typography>
                  </div>
                ))}
                {followUpTime ? (
                  <Typography
                    variant="caption"
                    className="text-[10px] leading-[14px] text-[#757575]"
                  >
                    {followUpTime}
                  </Typography>
                ) : null}
              </div>
            ) : null}
          </div>

          <form className="mt-3 shrink-0" onSubmit={submitMessage}>
            <label htmlFor="chat-message" className="sr-only">
              Type your message
            </label>
            <div className="flex items-center gap-2">
              <div className="chat-composer">
                <input
                  ref={inputRef}
                  id="chat-message"
                  type="text"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="How can we help?"
                  className="h-6 min-w-0 flex-1 bg-transparent text-sm text-[#121212] placeholder:text-[#a6a6a6] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!message.trim()}
                  className="chat-send-button"
                >
                  <span className="relative size-5 overflow-clip">
                    <ChatAsset src="/chat/send.svg" />
                  </span>
                </button>
              </div>
              <button
                type="button"
                aria-label="Call DriveCam support"
                className="chat-call-button"
              >
                <span className="relative size-6 overflow-clip">
                  <span className="absolute inset-[8.33%]">
                    <span className="absolute inset-[-1.88%]">
                      <ChatAsset src="/chat/call.svg" className="block size-full max-w-none" />
                    </span>
                  </span>
                </span>
              </button>
            </div>
            <Typography
              id={descriptionId}
              variant="caption"
              color="secondary"
              className="sr-only"
            >
              This is a local demo chat and is not connected to a live support
              agent.
            </Typography>
          </form>
        </div>
      </section>
    </div>
  );
}
