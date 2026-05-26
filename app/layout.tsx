import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACKO DriveCam — Smarter, safer journeys",
  description:
    "ACKO DriveCam captures every drive with crystal-clear video, smart insights, and effortless setup. Get installation help, explore features, and find answers to common questions.",
  applicationName: "ACKO DriveCam",
  authors: [{ name: "ACKO" }],
  keywords: [
    "ACKO",
    "DriveCam",
    "Dashcam",
    "Car Camera",
    "Driving Insights",
    "Vehicle Safety",
  ],
};

export const viewport: Viewport = {
  themeColor: "#582CDB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
