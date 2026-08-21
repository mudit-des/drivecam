export interface RoadFeature {
  id: string;
  imageSrc: string;
  imageAlt: string;
  headline: string;
  description: string;
}

export const ROAD_FEATURES: readonly RoadFeature[] = [
  {
    id: "footage-on-phone",
    imageSrc: "/illustrations/built-for-the-road/footage-on-phone.png",
    imageAlt:
      "Smartphone showing dashcam video playback next to an SD card, with Wi-Fi arcs indicating footage transferring to the phone",
    headline: "All your footage on your phone",
    description:
      "All footage stays on your SD card and transfers to your phone over Wi-Fi via the ACKO app.",
  },
  {
    id: "never-lose-moment",
    imageSrc: "/illustrations/built-for-the-road/preserved.png",
    imageAlt:
      "Purple shield with a film strip inside and a memory card behind it, illustrating preserved footage",
    headline: "Never lose a moment",
    description:
      "Important events like sudden braking, jolts, or impacts are automatically saved and protected on the SD card. Even if power is lost unexpectedly.",
  },
  {
    id: "indian-summers",
    imageSrc: "/illustrations/built-for-the-road/summer.png",
    imageAlt:
      "Bright purple sun radiating over a car silhouette with heat shimmer lines and a thermometer accent",
    headline: "Built for Indian summers",
    description:
      "Rated to operate at 70°C in-cabin temperatures. It's built for Indian summers.",
  },
] as const;
