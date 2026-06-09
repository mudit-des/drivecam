import { SETUP_VIDEOS } from "@/lib/videos";
import { VideoSection } from "./VideoSection";

export function VideoPlaylist() {
  return (
    <VideoSection
      sectionId="installation"
      heading="Installing DriveCam? You're in the right place."
      intro="Most customers finish setup in just a few minutes. Follow the videos below for installation, pairing, software updates, and basic configuration."
      playlistLabel="Getting Started"
      videos={SETUP_VIDEOS}
      searchPlaceholder="Search setup videos"
      background="tint"
    />
  );
}
