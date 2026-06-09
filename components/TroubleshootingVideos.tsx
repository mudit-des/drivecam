import {
  TROUBLESHOOTING_CATEGORIES,
  TROUBLESHOOTING_VIDEOS,
} from "@/lib/videos";
import { VideoSection } from "./VideoSection";

export function TroubleshootingVideos() {
  return (
    <VideoSection
      sectionId="troubleshoot-videos"
      heading="Need help?"
      intro="Most issues can be fixed in a few minutes. Find the problem below and follow the step-by-step guide."
      playlistLabel="Troubleshooting"
      videos={TROUBLESHOOTING_VIDEOS}
      categories={TROUBLESHOOTING_CATEGORIES}
      searchPlaceholder="Search troubleshooting videos"
      background="white"
    />
  );
}
