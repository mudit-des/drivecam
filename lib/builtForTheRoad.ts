export interface RoadFeature {
  id: string;
  imageSrc: string;
  imageAlt: string;
  headline: string;
  description: string;
}

export const ROAD_FEATURES: readonly RoadFeature[] = [
  {
    id: "wide-angle-qhd",
    imageSrc: "/illustrations/built-for-the-road/wide-angle.png",
    imageAlt:
      "Top-down view of a car on a three-lane road with a wide 156° camera arc covering the vehicles in adjacent lanes",
    headline: "Wide-angle Quad HD",
    description:
      "1440p QHD. 156° field of view. Wide enough to capture the vehicles around you, not just the one directly ahead.",
  },
  {
    id: "night-clear",
    imageSrc: "/illustrations/built-for-the-road/night-clear.png",
    imageAlt:
      "Car driving on a winding road at night with a crescent moon overhead and a soft cone of light from the dashcam",
    headline: "Clear at night, on your phone",
    description:
      "Records clearly at night. Footage stays on your SD card and transfers to your phone over Wi-Fi via the ACKO app.",
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
