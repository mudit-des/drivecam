"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { ExternalLink, Search } from "lucide-react";
import { Typography } from "@acko/typography";
import {
  CHANNEL_NAME,
  PLAYLIST_ID,
  PLAYLIST_TITLE,
  PLAYLIST_URL,
  type PlaylistVideo,
  type VideoCategory,
} from "@/lib/videos";

interface VideoSectionProps {
  /** Section id used for anchor links (e.g. "installation"). */
  sectionId: string;
  /** Main section heading. */
  heading: string;
  /** Supporting copy below the heading. */
  intro: string;
  /** Heading for the playlist sidebar (e.g. "Getting Started"). */
  playlistLabel: string;
  /** Videos rendered in the playlist. */
  videos: PlaylistVideo[];
  /** Optional category chips above the playlist (e.g. troubleshooting). */
  categories?: VideoCategory[];
  /** Placeholder text for the search input. */
  searchPlaceholder: string;
  /** Background color for the section. */
  background?: "white" | "tint";
}

function getThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
}

interface PlaylistItemProps {
  video: PlaylistVideo;
  index: number;
  isActive: boolean;
  onSelect: (videoId: string) => void;
  refForActive?: (el: HTMLLIElement | null) => void;
}

function PlaylistItem({
  video,
  index,
  isActive,
  onSelect,
  refForActive,
}: PlaylistItemProps) {
  return (
    <li ref={isActive ? refForActive : undefined}>
      <button
        type="button"
        onClick={() => onSelect(video.videoId)}
        aria-current={isActive ? "true" : undefined}
        aria-label={`Play video ${index + 1}: ${video.title}`}
        className={[
          "group relative w-full text-left rounded-lg p-2 flex gap-3 items-start",
          "transition-colors duration-150 motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
          isActive ? "" : "hover:bg-surface-alt",
        ].join(" ")}
      >
        <div className="relative aspect-video w-24 flex-shrink-0 overflow-hidden rounded-md bg-surface-alt sm:w-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getThumbnailUrl(video.videoId)}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <Typography
            as="span"
            variant="label-md"
            color={isActive ? "brand" : "primary"}
            className="block leading-snug line-clamp-2"
          >
            {video.title}
          </Typography>
          {isActive && (
            <Typography
              variant="caption"
              color="brand"
              className="mt-1 block"
            >
              Now playing
            </Typography>
          )}
        </div>
      </button>
    </li>
  );
}

export function VideoSection({
  sectionId,
  heading,
  intro,
  playlistLabel,
  videos,
  categories,
  searchPlaceholder,
  background = "tint",
}: VideoSectionProps) {
  const [activeId, setActiveId] = useState(videos[0]?.videoId ?? "");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(
    categories && categories.length > 0 ? categories[0].id : "all",
  );
  const headingId = useId();
  const playlistId = useId();
  const searchId = useId();
  const activeItemRef = useRef<HTMLLIElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const filteredVideos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter((v) => {
      const matchesCategory =
        !categories ||
        activeCategory === "all" ||
        v.categoryId === activeCategory;
      const matchesQuery = q.length === 0 || v.title.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [videos, query, activeCategory, categories]);

  const activeVideo =
    videos.find((v) => v.videoId === activeId) ?? videos[0];
  const activeIndex = videos.findIndex((v) => v.videoId === activeId);

  const handleSelect = useCallback((videoId: string) => {
    setActiveId(videoId);
    setHasInteracted(true);
  }, []);

  useEffect(() => {
    const el = activeItemRef.current;
    const container = scrollContainerRef.current;
    if (!el || !container) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const isOutOfView =
      elRect.top < containerRect.top || elRect.bottom > containerRect.bottom;
    if (isOutOfView) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeId]);

  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${activeId}` +
    `?list=${PLAYLIST_ID}&rel=0&modestbranding=1` +
    (hasInteracted ? "&autoplay=1" : "");

  const bgClass = background === "white" ? "bg-white" : "bg-surface-tint";

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className={`${bgClass} py-20 sm:py-24 lg:py-28 scroll-mt-32`}
    >
      <div className="container-page">
        {/* Section header */}
        <div className="mb-8 max-w-3xl sm:mb-10 lg:mb-12">
          <Typography
            as="h2"
            id={headingId}
            variant="display-md"
            color="primary"
            className="text-balance"
          >
            {heading}
          </Typography>
          <div className="mt-4">
            <Typography as="p" variant="body-lg" color="secondary">
              {intro}
            </Typography>
          </div>
        </div>

        {/* Category chips (troubleshooting only) */}
        {categories && categories.length > 0 && (
          <div
            role="group"
            aria-label="Filter videos by topic"
            className="mb-6 flex flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  className={[
                    "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                    isActive
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-white text-ink hover:bg-surface-alt",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Main grid: player + playlist */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
          {/* Featured player card */}
          <div className="acko-card overflow-hidden border border-line bg-white">
            <div className="relative aspect-video w-full bg-black">
              {activeVideo ? (
                <iframe
                  key={activeId}
                  src={embedSrc}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : null}
            </div>
            <div className="p-4 sm:p-5" aria-live="polite">
              <Typography
                as="h3"
                variant="heading-sm"
                color="primary"
                className="line-clamp-2"
              >
                {activeVideo?.title ?? "Pick a video to start"}
              </Typography>
              <div className="mt-1.5 flex items-center gap-2">
                <Typography variant="body-sm" color="secondary">
                  {CHANNEL_NAME}
                </Typography>
                {activeVideo && (
                  <>
                    <span
                      aria-hidden
                      className="inline-block h-1 w-1 rounded-full bg-line-strong"
                    />
                    <Typography variant="body-sm" color="secondary">
                      {activeIndex + 1} of {videos.length}
                    </Typography>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Playlist card */}
          <aside
            id={playlistId}
            aria-label={`${playlistLabel} videos by ${CHANNEL_NAME}`}
            className="acko-card flex flex-col overflow-hidden border border-line bg-white"
          >
            {/* Playlist header */}
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div className="min-w-0">
                <Typography
                  as="span"
                  variant="label-md"
                  color="primary"
                  className="block truncate"
                >
                  {playlistLabel}
                </Typography>
                <Typography
                  variant="caption"
                  color="secondary"
                  className="mt-0.5 block truncate"
                >
                  {CHANNEL_NAME} &middot; {videos.length} videos
                </Typography>
              </div>
              <Link
                href={PLAYLIST_URL}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${PLAYLIST_TITLE} playlist on YouTube`}
                className="acko-btn acko-btn-secondary acko-btn-xs flex-shrink-0"
              >
                <span className="acko-btn-content">
                  <span className="acko-btn-icon">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                  <span className="acko-btn-label">Open on YouTube</span>
                </span>
              </Link>
            </div>

            {/* Search input */}
            <div className="border-b border-line px-4 py-3">
              <label htmlFor={searchId} className="sr-only">
                {searchPlaceholder}
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                  aria-hidden
                />
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-lg border border-line bg-white py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
            </div>

            {/* Scrollable list */}
            <div
              ref={scrollContainerRef}
              className="playlist-scroll max-h-[26rem] flex-1 overflow-y-auto lg:max-h-[22rem]"
            >
              {filteredVideos.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Typography variant="body-sm" color="secondary">
                    No videos match. Try a different keyword.
                  </Typography>
                </div>
              ) : (
                <ul className="flex flex-col gap-0.5 p-3">
                  {filteredVideos.map((video, idx) => (
                    <PlaylistItem
                      key={video.videoId}
                      video={video}
                      index={idx}
                      isActive={activeId === video.videoId}
                      onSelect={handleSelect}
                      refForActive={(el) => {
                        if (activeId === video.videoId) {
                          activeItemRef.current = el;
                        }
                      }}
                    />
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
