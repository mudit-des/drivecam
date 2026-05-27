export function WideAngleShowcase() {
  const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <section
      aria-label="156 degree wide angle viewing"
      className="relative w-full overflow-hidden bg-black"
    >
      <video
        src={`${BASE}/videos/wide-angle.mp4`}
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