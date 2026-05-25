import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MeetYourDriveCam } from "@/components/MeetYourDriveCam";
import { Navbar } from "@/components/Navbar";
import { TechSpecsTable } from "@/components/TechSpecsTable";
import { Troubleshooting } from "@/components/Troubleshooting";
import { VideoPlaylist } from "@/components/VideoPlaylist";
import { WideAngleShowcase } from "@/components/WideAngleShowcase";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-tint">
      <Navbar />
      <Hero />
      <MeetYourDriveCam />
      <WideAngleShowcase />
      <VideoPlaylist />
      <TechSpecsTable />
      <Troubleshooting />
      <Footer />
    </main>
  );
}
