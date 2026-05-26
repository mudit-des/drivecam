// Full-bleed 156° wide-angle cinematic showcase. No headings, no body copy,
// no overlays — the video alone communicates the wide-angle coverage.

import { withBasePath } from "@/lib/assets";

export function WideAngleShowcase() {
  return (
    <section
      aria-label="156 degree wide angle viewing"
      className="relative w-full overflow-hidden bg-black"
    >
      <video
        src={withBasePath("/videos/wide-angle.mp4")}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="block h-auto w-full"
        aria-hidden="true"
      />
    </section>
  );
}
