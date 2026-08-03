"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Typography } from "@acko/typography";
import { SdCardUpsell } from "./SdCardUpsell";

interface PlaylistVideo {
  videoId: string;
  title: string;
  url: string;
}

interface PlaylistGroup {
  id: string;
  label: string;
  videos: PlaylistVideo[];
}

const PLAYLIST_ID = "PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v";
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;
const CHANNEL_NAME = "ACKO India";
const PLAYLIST_TITLE = "DriveCam";
const TOTAL_VIDEOS = 20;
const DEFAULT_VIDEO_ID = "tbpyJ2p2Za4";

const PLAYLIST_GROUPS: PlaylistGroup[] = [
  {
    id: "setup-essentials",
    label: "Setup essentials",
    videos: [
      {
        videoId: "tbpyJ2p2Za4",
        title: "How to Set Up Your ACKO DriveCam",
        url: "https://www.youtube.com/watch?v=tbpyJ2p2Za4&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=20",
      },
      {
        videoId: "sazSnnQwqdU",
        title: "How to pair or connect ACKO DriveCam",
        url: "https://www.youtube.com/watch?v=sazSnnQwqdU&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=15",
      },
      {
        videoId: "DT-IwblEBb0",
        title: "How to update DriveCam firmware",
        url: "https://www.youtube.com/watch?v=DT-IwblEBb0&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=16",
      },
      {
        videoId: "9P1XmpHbrWA",
        title: "How to fix date and time on DriveCam",
        url: "https://www.youtube.com/watch?v=9P1XmpHbrWA&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=14",
      },
      {
        videoId: "wFaCc4hY9A0",
        title: "How to take the SD card out of DriveCam",
        url: "https://www.youtube.com/watch?v=wFaCc4hY9A0&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=17",
      },
      {
        videoId: "Cf2f_BPdlSI",
        title: "How to fix DriveCam mount",
        url: "https://www.youtube.com/watch?v=Cf2f_BPdlSI&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=13",
      },
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    videos: [
      {
        videoId: "r7sTmhRJu5I",
        title:
          "Audio Not Recording on the DriveCam? Here's how to fix it.",
        url: "https://www.youtube.com/watch?v=r7sTmhRJu5I&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=1",
      },
      {
        videoId: "alZgdvOgjNg",
        title: "WiFi LED stays red? Here's how to fix it",
        url: "https://www.youtube.com/watch?v=alZgdvOgjNg&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=2",
      },
      {
        videoId: "yOgsQnP_SR8",
        title: "DriveCam Video Keeps Buffering? Here's how to fix it.",
        url: "https://www.youtube.com/watch?v=yOgsQnP_SR8&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=3",
      },
      {
        videoId: "aYNNnolazzM",
        title: "DriveCam not turning on? Here's how to fix it.",
        url: "https://www.youtube.com/watch?v=aYNNnolazzM&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=6",
      },
      {
        videoId: "2jyhQfQr0jo",
        title: "DriveCam Overheating? Here's how to fix it.",
        url: "https://www.youtube.com/watch?v=2jyhQfQr0jo&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=7",
      },
      {
        videoId: "iKDY17o5nfI",
        title: "DriveCam Trips Not Loading? Here's how to fix it.",
        url: "https://www.youtube.com/watch?v=iKDY17o5nfI&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=11",
      },
    ],
  },
];

const ALL_VIDEOS: PlaylistVideo[] = PLAYLIST_GROUPS.flatMap((g) => g.videos);

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
        <div className="relative flex-shrink-0 aspect-video w-24 sm:w-28 overflow-hidden rounded-md bg-surface-alt">
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

export function VideoPlaylist() {
  const [activeId, setActiveId] = useState(DEFAULT_VIDEO_ID);
  const [hasInteracted, setHasInteracted] = useState(false);
  const headingId = useId();
  const playlistId = useId();
  const activeItemRef = useRef<HTMLLIElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const activeVideo =
    ALL_VIDEOS.find((v) => v.videoId === activeId) ?? ALL_VIDEOS[0];
  const activeIndex = ALL_VIDEOS.findIndex((v) => v.videoId === activeId);

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

  return (
    <section
      id="installation"
      aria-labelledby={headingId}
      className="py-20 sm:py-28 scroll-mt-32"
    >
      <div className="container-page">
        {/* Section header */}
        <div className="mb-10 max-w-3xl">
          <Typography
            as="h2"
            id={headingId}
            variant="display-sm"
            color="primary"
          >
            Set it up in minutes
          </Typography>
          <div className="mt-3">
            <Typography variant="body-md" color="secondary">
              20 quick videos to walk you through setup and troubleshooting.
            </Typography>
          </div>
        </div>

        {/* Main grid: player + playlist */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-8 lg:items-start">
          {/* Featured player card */}
          <div className="acko-card overflow-hidden border border-line bg-white">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={embedSrc}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="p-4 sm:p-5" aria-live="polite">
              <Typography
                as="h3"
                variant="heading-sm"
                color="primary"
                className="line-clamp-2"
              >
                {activeVideo.title}
              </Typography>
              <div className="mt-1.5 flex items-center gap-2">
                <Typography variant="body-sm" color="secondary">
                  {CHANNEL_NAME}
                </Typography>
                <span
                  aria-hidden
                  className="inline-block h-1 w-1 rounded-full bg-line-strong"
                />
                <Typography variant="body-sm" color="secondary">
                  {activeIndex + 1} of {ALL_VIDEOS.length}
                </Typography>
              </div>
            </div>
          </div>

          {/* Playlist card */}
          <aside
            id={playlistId}
            aria-label={`${PLAYLIST_TITLE} playlist by ${CHANNEL_NAME}`}
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
                  {PLAYLIST_TITLE}
                </Typography>
                <Typography
                  variant="caption"
                  color="secondary"
                  className="mt-0.5 block truncate"
                >
                  {CHANNEL_NAME} · {TOTAL_VIDEOS} videos
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

            {/* Scrollable list */}
            <div
              ref={scrollContainerRef}
              className="playlist-scroll flex-1 overflow-y-auto max-h-[26rem] lg:max-h-[22rem]"
            >
              {PLAYLIST_GROUPS.map((group, groupIdx) => {
                let runningIndex = 0;
                for (const g of PLAYLIST_GROUPS) {
                  if (g.id === group.id) break;
                  runningIndex += g.videos.length;
                }
                return (
                  <div
                    key={group.id}
                    className={[
                      "px-3 pt-3 pb-2",
                      groupIdx > 0 ? "border-t border-line mt-2" : "",
                    ].join(" ")}
                  >
                    <div className="px-1.5 pb-2 pt-1">
                      <Typography variant="overline" color="secondary">
                        {group.label}
                      </Typography>
                    </div>
                    <ul className="flex flex-col gap-0.5">
                      {group.videos.map((video, idx) => (
                        <PlaylistItem
                          key={video.videoId}
                          video={video}
                          index={runningIndex + idx}
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
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        {/* SD card reminder — shown after the videos */}
        <div className="mt-10">
          <SdCardUpsell />
        </div>
      </div>
    </section>
  );
}
