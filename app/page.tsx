import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MeetYourDriveCam } from "@/components/MeetYourDriveCam";
import { Navbar } from "@/components/Navbar";
import { SdCardUpsell } from "@/components/SdCardUpsell";
import { SupportSection } from "@/components/SupportSection";
import { TechSpecsTable } from "@/components/TechSpecsTable";
import { Troubleshooting } from "@/components/Troubleshooting";
import { TroubleshootingVideos } from "@/components/TroubleshootingVideos";
import { UseCases } from "@/components/UseCases";
import { VideoPlaylist } from "@/components/VideoPlaylist";
import { WhyDriveCamHelps } from "@/components/WhyDriveCamHelps";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-surface-tint">
      <Navbar />
      <Hero />
      <WhyDriveCamHelps />
      <MeetYourDriveCam />
      <TechSpecsTable />
      <UseCases />
      <VideoPlaylist />
      <TroubleshootingVideos />
      <Troubleshooting />
      <SdCardUpsell />
      <SupportSection />
      <Footer />
    </main>
  );
}
