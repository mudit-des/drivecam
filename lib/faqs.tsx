import { isValidElement, type ReactNode } from "react";
import { Typography } from "@acko/typography";

export type HomeCategoryId =
  | "connecting"
  | "videos-audio"
  | "sd-card"
  | "app-settings"
  | "device-hardware"
  | "damage-warranty";

export type TopicId =
  | "setup-installation"
  | "sd-card-storage"
  | "recording-issues"
  | "mobile-app-connectivity"
  | "video-playback-downloads"
  | "general";

export interface HomeCategory {
  id: HomeCategoryId;
  label: string;
}

export interface Topic {
  id: TopicId;
  label: string;
  description?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: ReactNode;
  homeCategoryId: HomeCategoryId;
  topicId: TopicId;
  keywords: string[];
  popular?: boolean;
  searchBody: string;
  snippet: string;
}

interface FaqInput {
  id: string;
  question: string;
  answer: ReactNode;
  homeCategoryId: HomeCategoryId;
  topicId: TopicId;
  keywords: string[];
  popular?: boolean;
}

export const HOME_CATEGORIES: readonly HomeCategory[] = [
  { id: "connecting", label: "Connecting Your DriveCam" },
  { id: "videos-audio", label: "Videos & Audio" },
  { id: "sd-card", label: "SD Card" },
  { id: "app-settings", label: "App & Settings" },
  { id: "device-hardware", label: "Device & Hardware" },
  { id: "damage-warranty", label: "Damage & Warranty" },
] as const;

export const TOPICS: readonly Topic[] = [
  {
    id: "setup-installation",
    label: "Setup & Installation",
    description: "Mounting, power, and getting started.",
  },
  {
    id: "sd-card-storage",
    label: "SD Card & Storage",
    description: "Compatible cards, errors, and formatting.",
  },
  {
    id: "recording-issues",
    label: "Recording Issues",
    description: "Camera not recording, blurry footage, no audio.",
  },
  {
    id: "mobile-app-connectivity",
    label: "Mobile App & Connectivity",
    description: "Pairing, Wi-Fi, and app permissions.",
  },
  {
    id: "video-playback-downloads",
    label: "Video Playback & Downloads",
    description: "Watching, trimming, and saving clips.",
  },
  {
    id: "general",
    label: "General FAQs",
    description: "Warranty, damage, time/date, and other questions.",
  },
] as const;

const SUPPORT_EMAIL = "drivecamhelp@acko.com";

function P({ children }: { children: ReactNode }) {
  return (
    <Typography variant="body-md" color="secondary">
      {children}
    </Typography>
  );
}

function Bullets({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-ink-muted">
      {children}
    </ul>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li>
      <Typography variant="body-md" color="secondary" as="div">
        {children}
      </Typography>
    </li>
  );
}

function MailLink() {
  return (
    <a
      href={`mailto:${SUPPORT_EMAIL}`}
      style={{ color: "var(--colorPrimary, #6841e6)" }}
    >
      {SUPPORT_EMAIL}
    </a>
  );
}

/**
 * Recursively unwrap a ReactNode into plain text. Runs once at module init for
 * each FAQ — used to build a searchable corpus and a snippet preview without
 * re-walking the tree on every keystroke.
 */
export function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join(" ");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return nodeToText(props.children);
  }
  return "";
}

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function buildSnippet(text: string, maxChars = 160): string {
  if (text.length <= maxChars) return text;
  const sliced = text.slice(0, maxChars);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut = lastSpace > 80 ? sliced.slice(0, lastSpace) : sliced;
  return `${cut.trimEnd()}…`;
}

const FAQ_INPUTS: readonly FaqInput[] = [
  {
    id: "phone-cant-find-dashcam",
    question: "My phone can't find or connect to the DriveCam. What should I do?",
    homeCategoryId: "connecting",
    topicId: "mobile-app-connectivity",
    popular: true,
    keywords: [
      "wifi",
      "wi-fi",
      "pair",
      "pairing",
      "bluetooth",
      "connect",
      "connection",
      "not connecting",
      "won't connect",
      "no connection",
      "app",
      "phone",
      "carplay",
      "android auto",
      "vpn",
      "hotspot",
    ],
    answer: (
      <>
        <P>{"Don't worry — this is usually a quick fix. Try these steps one by one:"}</P>
        <Bullets>
          <Bullet>
            {"Make sure the ACKO app is updated to the latest version, and that you've allowed all the permissions it asked for when you first installed it."}
          </Bullet>
          <Bullet>
            {"Look at the small light on the left side of the dashcam (the blue light):"}
            <div className="mt-2">
              <Bullets>
                <Bullet>
                  <strong>Light is OFF</strong>
                  {" — The dashcam may not be getting power. Please use only the original charging cable and adapter that came in the box."}
                </Bullet>
                <Bullet>
                  <strong>Light is BLINKING</strong>
                  {" — Turn your phone and dashcam off, wait 10 seconds, then turn them both back on and try connecting again."}
                </Bullet>
                <Bullet>
                  <strong>Light is SOLID BLUE</strong>
                  {" — Great, the dashcam has power! Move on to Step 3."}
                </Bullet>
              </Bullets>
            </div>
          </Bullet>
          <Bullet>
            {"If the blue light is solid, try the following on your phone: turn off Apple CarPlay or Android Auto, switch off any VPN or mobile hotspot, and temporarily disable any security or antivirus apps. Then restart both your phone and dashcam and try connecting again."}
          </Bullet>
          <Bullet>
            {"Using an older Android phone (Android 9 or below)? You may need to connect manually. Go to your phone's Wi-Fi settings and connect to the network named "}
            <strong>{"'DriveCam'"}</strong>
            {" using the password: "}
            <strong>12345678</strong>
            {"."}
          </Bullet>
        </Bullets>
        <P>
          <strong>How do you know it worked?</strong>
          {" Once connected successfully, the light on the right side of the dashcam will turn solid green."}
        </P>
      </>
    ),
  },
  {
    id: "live-view-black-screen",
    question: "The live camera view isn't loading — it's just a black or loading screen.",
    homeCategoryId: "connecting",
    topicId: "mobile-app-connectivity",
    keywords: [
      "live view",
      "camera view",
      "black screen",
      "loading screen",
      "not loading",
      "blank",
      "preview",
      "stream",
    ],
    answer: (
      <>
        <P>{"Here's what to try:"}</P>
        <Bullets>
          <Bullet>
            {"In the ACKO app, tap "}
            <strong>{"Dashcam > Connect to Dashcam > Switch to Camera View"}</strong>
            {"."}
          </Bullet>
          <Bullet>
            {"Give it up to 40 seconds to load — if your Wi-Fi signal is a bit slow, it may just need a moment."}
          </Bullet>
          <Bullet>
            {"If it's still not loading, switch off both your phone and the dashcam, wait a few seconds, then turn them back on and try again."}
          </Bullet>
          <Bullet>
            {"Check that the dashcam's right light is solid green and the app says 'Connected'. If it doesn't say connected, try these: turn off Apple CarPlay/Android Auto, switch off VPN and mobile hotspot, disable antivirus apps, then restart and reconnect."}
          </Bullet>
          <Bullet>
            {"Double-check that you're using the original power adapter that came with the dashcam — third-party adapters can sometimes cause this issue."}
          </Bullet>
          <Bullet>
            {"If nothing works, try connecting a different phone to the dashcam to see if it loads. If it works on another phone, the issue may be specific to your device."}
          </Bullet>
        </Bullets>
        <P>{"Still no luck after all of the above? Please get in touch with our support team and we'll take it from there."}</P>
      </>
    ),
  },
  {
    id: "trips-not-showing",
    question: "My recorded trips aren't showing up in the app.",
    homeCategoryId: "videos-audio",
    topicId: "video-playback-downloads",
    popular: true,
    keywords: [
      "trips",
      "trip list",
      "recordings",
      "recorded",
      "missing videos",
      "videos missing",
      "no trips",
      "all trips",
      "history",
    ],
    answer: (
      <>
        <P>
          {"Let's figure out what's going on. First, open the ACKO app and go to "}
          <strong>{"Dashcam > Connect to Dashcam > All Trips"}</strong>
          {". Then check the lights on your dashcam:"}
        </P>
        <Bullets>
          <Bullet>
            <strong>{"Both lights are off, or the blue light is blinking"}</strong>
            {" — Restart the dashcam and check again."}
          </Bullet>
          <Bullet>
            <strong>{"Blue light is solid but the green light isn't on"}</strong>
            {" — This usually means the connection dropped. Turn off CarPlay/Android Auto, VPN, and mobile hotspot on your phone, then restart and reconnect."}
          </Bullet>
          <Bullet>
            <strong>{"Both lights are solid (blue and green)"}</strong>
            {" — Restart both your phone and dashcam, and make sure the app and dashcam firmware are both up to date."}
          </Bullet>
        </Bullets>
        <P>{"Also check that your SD card is the right type. For higher quality recordings, a U3 or V30 card is required. If your card doesn't meet these specs, that could be causing the issue."}</P>
        <P>
          {"Using an older Android phone (Android 9 or below)? Connect manually via Wi-Fi — network name: "}
          <strong>{"'DriveCam'"}</strong>
          {", password: "}
          <strong>12345678</strong>
          {"."}
        </P>
      </>
    ),
  },
  {
    id: "videos-buffering",
    question: "My videos keep buffering or won't play in the app.",
    homeCategoryId: "videos-audio",
    topicId: "video-playback-downloads",
    popular: true,
    keywords: [
      "buffer",
      "buffering",
      "lag",
      "slow video",
      "playback",
      "won't play",
      "video stuck",
      "loading",
      "thumbnails",
    ],
    answer: (
      <>
        <P>{"Try the following:"}</P>
        <Bullets>
          <Bullet>
            <strong>{"Videos not loading at all (no thumbnails)"}</strong>
            {" — Restart your dashcam and check again."}
          </Bullet>
          <Bullet>
            <strong>{"Thumbnails are showing but the video won't play"}</strong>
            {" — Please wait 1 to 2 minutes. The dashcam sometimes runs background tasks that can slow things down temporarily."}
          </Bullet>
          <Bullet>
            {"Check your SD card. For higher quality, a U3 or V30 card is required. An incompatible SD card is one of the most common causes of playback issues — if yours doesn't match, try replacing it."}
          </Bullet>
          <Bullet>
            {"If your SD card is fine and the problem continues after restarting, please contact our support team."}
          </Bullet>
        </Bullets>
      </>
    ),
  },
  {
    id: "cant-download-videos",
    question: "I can't download videos to my phone.",
    homeCategoryId: "videos-audio",
    topicId: "video-playback-downloads",
    keywords: [
      "download",
      "downloads",
      "save video",
      "transfer",
      "export",
      "storage",
      "permissions",
      "gallery",
    ],
    answer: (
      <>
        <P>{"First, make sure the ACKO app has all the permissions it needs. On Android, this includes Storage access. On iPhone, it's Photo Gallery access. Without these, downloads won't work."}</P>
        <P>{"Check how much free space is left on your phone. If you have less than 500–600 MB available, your phone may not have enough room to save the video. Free up some space and try again."}</P>
        <P>{"If storage isn't the issue, try downloading the video again from scratch."}</P>
        <P>{"Also make sure your SD card is the right type — U3/V30 for higher quality recordings."}</P>
        <P>{"Need the video urgently (for example, at a police station)? Remove the SD card from the dashcam, insert it into a laptop using a card reader, and copy the files directly to your computer."}</P>
      </>
    ),
  },
  {
    id: "cant-trim-video",
    question: "I can't trim or cut a video in the app.",
    homeCategoryId: "videos-audio",
    topicId: "video-playback-downloads",
    keywords: [
      "trim",
      "cut",
      "edit",
      "clip",
      "crop video",
      "shorten",
    ],
    answer: (
      <>
        <P>
          {"Here's how to get to the trim screen: "}
          <strong>{"All Trips > tap a video > Download > Trim"}</strong>
          {"."}
        </P>
        <P>{"If the video is taking a while to load on the trim screen, please wait up to 2 minutes. Once it loads, you'll see the trim handles appear so you can edit the clip."}</P>
        <P>{"If it's still not loading after waiting, close the ACKO app, restart your dashcam, then go back into the app and try again."}</P>
        <P>{"If the video still won't load, the trim handles aren't showing, or the video isn't playing after a restart, please contact our support team."}</P>
      </>
    ),
  },
  {
    id: "downloaded-video-wont-play",
    question: "I downloaded a video but it won't play on my phone.",
    homeCategoryId: "videos-audio",
    topicId: "video-playback-downloads",
    keywords: [
      "downloaded",
      "playback",
      "won't play",
      "video error",
      "corrupt download",
      "storage full",
    ],
    answer: (
      <>
        <P>
          {"Go to your phone's "}
          <strong>{"Settings > Storage"}</strong>
          {" and check how much space is available."}
        </P>
        <Bullets>
          <Bullet>
            <strong>{"Almost full"}</strong>
            {" — Clear some space on your phone and try downloading the video again."}
          </Bullet>
          <Bullet>
            <strong>{"Plenty of space"}</strong>
            {" — Delete the downloaded video and re-download it from the ACKO app."}
          </Bullet>
        </Bullets>
        <P>{"If you urgently need the footage, remove the SD card, plug it into a laptop using a card reader, and copy the files directly."}</P>
      </>
    ),
  },
  {
    id: "videos-blurry",
    question: "My videos look blurry or pixelated.",
    homeCategoryId: "videos-audio",
    topicId: "recording-issues",
    keywords: [
      "blurry",
      "blur",
      "pixelated",
      "poor quality",
      "low quality",
      "fuzzy",
      "unclear",
      "resolution",
      "lens",
      "smudge",
      "dirty lens",
    ],
    answer: (
      <>
        <P>{"Start with the basics — give the dashcam lens a gentle wipe with a dry microfiber cloth. Smudges or dust are a very common cause of blurry footage. Avoid using wet wipes or tissues as they can leave streaks."}</P>
        <P>{"Check that the dashcam is mounted securely. If it's loose or vibrating, the footage will look shaky or unclear. Re-fix the mount firmly."}</P>
        <P>
          {"Open "}
          <strong>{"Dashcam Settings"}</strong>
          {" in the ACKO app and make sure the resolution is set to the highest available option."}
        </P>
        <P>{"If you're recording in 2K or 4K, your SD card needs to be rated U3 or V30. A slower card won't keep up and will result in poor quality footage."}</P>
        <P>{"Make sure you're using the original power cable and accessories. Unofficial cables can sometimes affect recording quality."}</P>
        <P>
          {"If the footage is still poor after all of the above, please send us a short sample video at "}
          <MailLink />
          {" and we'll look into it."}
        </P>
      </>
    ),
  },
  {
    id: "no-audio",
    question: "My recordings have no sound.",
    homeCategoryId: "videos-audio",
    topicId: "recording-issues",
    popular: true,
    keywords: [
      "audio",
      "sound",
      "no audio",
      "silent",
      "mic",
      "microphone",
      "muted",
      "no sound",
      "record audio",
    ],
    answer: (
      <>
        <P>
          {"Open the ACKO app, connect to your dashcam, and go to "}
          <strong>Settings</strong>
          {". Look for the "}
          <strong>{"'Record Audio'"}</strong>
          {" toggle — if it's switched off, simply turn it on. That's all it takes!"}
        </P>
        <P>{"If audio recording is already switched on, check your SD card. For higher quality recordings, you need a U3 or V30 card."}</P>
        <P>{"Also make sure you're using the original cable and accessories that came with the dashcam."}</P>
        <P>
          {"Still no audio? Send us a short sample video at "}
          <MailLink />
          {" and our team will investigate."}
        </P>
      </>
    ),
  },
  {
    id: "sd-card-stuck",
    question: "The SD card is stuck or won't go in/come out properly.",
    homeCategoryId: "sd-card",
    topicId: "sd-card-storage",
    keywords: [
      "sd card",
      "memory card",
      "micro sd",
      "microsd",
      "tf card",
      "storage",
      "stuck",
      "won't eject",
      "won't insert",
      "remove sd card",
    ],
    answer: (
      <>
        <P>{"If the card is stuck, don't try to force it out — gently ease it out to avoid damage."}</P>
        <P>{"When reinserting, make sure the card is facing the right way and push it in until you feel or hear a small 'click'. That click means it's locked in properly."}</P>
        <P>{"If you're unsure about the correct orientation or which slot to use, check the user manual that came with your dashcam — it has a clear diagram."}</P>
      </>
    ),
  },
  {
    id: "sd-card-errors",
    question: "My SD card keeps showing errors, asking me to format it, or stops recording.",
    homeCategoryId: "sd-card",
    topicId: "sd-card-storage",
    popular: true,
    keywords: [
      "sd card",
      "memory card",
      "micro sd",
      "microsd",
      "tf card",
      "storage",
      "format",
      "error",
      "errors",
      "stops recording",
      "stopped recording",
      "card not detected",
      "unreadable",
      "compatible",
      "u3",
      "v30",
    ],
    answer: (
      <>
        <P>
          {"Check that your SD card is on the approved list at "}
          <a
            href="https://acko.com/drivecam"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--colorPrimary, #6841e6)" }}
          >
            acko.com/drivecam
          </a>
          {". Not all SD cards are compatible — using one that isn't supported can cause problems."}
        </P>
        <P>{"Remove the SD card and try plugging it into a laptop or phone using a card reader:"}</P>
        <Bullets>
          <Bullet>
            <strong>{"If the laptop can't read it at all"}</strong>
            {" — The SD card has likely failed and needs to be replaced."}
          </Bullet>
          <Bullet>
            <strong>{"If the laptop reads it fine but problems continue in the dashcam"}</strong>
            {" — Please get in touch with our support team so we can arrange a check-up."}
          </Bullet>
        </Bullets>
      </>
    ),
  },
  {
    id: "firmware-update-fails",
    question: "The dashcam software update won't complete or keeps failing.",
    homeCategoryId: "app-settings",
    topicId: "mobile-app-connectivity",
    keywords: [
      "firmware",
      "update",
      "software update",
      "ota",
      "upgrade",
      "won't update",
      "update failed",
      "mobile data",
    ],
    answer: (
      <>
        <Bullets>
          <Bullet>{"Make sure your dashcam is connected to the ACKO app before starting the update."}</Bullet>
          <Bullet>{"Updates need to go through mobile data — not Wi-Fi. Please turn on mobile data on your phone (make sure your SIM is active) before trying again."}</Bullet>
          <Bullet>{"Check that your phone has enough storage space, and that the SD card in the dashcam isn't full."}</Bullet>
          <Bullet>{"Restart the dashcam and try the update again."}</Bullet>
          <Bullet>
            {"On your phone, go to "}
            <strong>{"Settings > Apps > DriveCam > Permissions"}</strong>
            {", and make sure Storage access is turned on."}
          </Bullet>
        </Bullets>
        <P>{"If the update still won't go through after trying all of this, please reach out to our support team."}</P>
      </>
    ),
  },
  {
    id: "wrong-time-date",
    question: "The time and date on my recordings are wrong.",
    homeCategoryId: "app-settings",
    topicId: "general",
    keywords: [
      "time",
      "date",
      "timestamp",
      "wrong time",
      "clock",
      "sync time",
      "date wrong",
    ],
    answer: (
      <>
        <Bullets>
          <Bullet>{"Open the ACKO app and make sure your dashcam is connected."}</Bullet>
          <Bullet>
            {"Go to "}
            <strong>{"Dashcam Settings"}</strong>
            {" and tap "}
            <strong>{"'Sync Time'"}</strong>
            {". This updates the dashcam's clock to match your phone automatically."}
          </Bullet>
          <Bullet>{"Record a short test video to confirm the timestamp is now showing correctly."}</Bullet>
        </Bullets>
        <P>{"If your car has been parked and switched off for a long time, the dashcam's clock can reset. Syncing it again in the app will fix this straight away."}</P>
      </>
    ),
  },
  {
    id: "too-many-incident-clips",
    question: "The dashcam keeps recording too many incident clips for minor bumps or vibrations.",
    homeCategoryId: "app-settings",
    topicId: "recording-issues",
    keywords: [
      "incident",
      "g-sensor",
      "sensitivity",
      "false trigger",
      "too many clips",
      "bumps",
      "vibrations",
      "minor",
    ],
    answer: (
      <>
        <P>{"The dashcam's sensitivity might be set too high for your driving conditions. Here's how to adjust it:"}</P>
        <Bullets>
          <Bullet>
            {"Open the ACKO app and go to "}
            <strong>{"Dashcam Home > Settings > Incident Video Sensitivity"}</strong>
            {"."}
          </Bullet>
          <Bullet>
            {"Change the setting to "}
            <strong>{"'Low'"}</strong>
            {" and see if the number of incident recordings reduces."}
          </Bullet>
          <Bullet>{"If it's still triggering too often after lowering the sensitivity, please get in touch and we'll help you sort it out."}</Bullet>
        </Bullets>
      </>
    ),
  },
  {
    id: "incidents-not-tagged",
    question: "The dashcam isn't tagging or flagging my incident videos automatically.",
    homeCategoryId: "app-settings",
    topicId: "recording-issues",
    keywords: [
      "incident",
      "tag",
      "tagging",
      "flag",
      "flagging",
      "auto detect",
      "g-sensor",
      "sensitivity",
      "not tagged",
    ],
    answer: (
      <>
        <P>
          {"Open the ACKO app and go to "}
          <strong>{"Dashcam Home > Settings > Incident Video Sensitivity"}</strong>
          {". Set it to "}
          <strong>{"'High'"}</strong>
          {" so the dashcam is more likely to detect and tag events."}
        </P>
        <P>{"If a recent incident wasn't tagged, try restarting the dashcam. Sometimes the dashcam saves and tags incident videos when it shuts down — check your trips list after the restart."}</P>
        <P>{"If incidents still aren't being tagged, please contact support with the date and time of the incident, which sensitivity setting you used, and your device ID."}</P>
      </>
    ),
  },
  {
    id: "dashcam-falling-off",
    question: "My dashcam keeps falling off the windshield.",
    homeCategoryId: "device-hardware",
    topicId: "setup-installation",
    keywords: [
      "fall off",
      "falling",
      "mount",
      "windshield",
      "adhesive",
      "sticker",
      "installation",
      "stuck",
      "loose",
    ],
    answer: (
      <P>{"We're sorry this is happening — let's get it fixed for you. Please raise a support request and our team will come to your location to take a look. They'll check that the mount is positioned correctly, that the adhesive is holding properly, and that the windshield surface is clean and suitable for mounting. If needed, they'll re-install everything on the spot so it stays secure."}</P>
    ),
  },
  {
    id: "dashcam-power-issues",
    question: "My dashcam won't switch on, keeps restarting, or loses power while I'm driving.",
    homeCategoryId: "device-hardware",
    topicId: "setup-installation",
    popular: true,
    keywords: [
      "won't turn on",
      "no power",
      "power",
      "cable",
      "adapter",
      "restart",
      "restarting",
      "reboot",
      "off",
      "shutting down",
      "loses power",
    ],
    answer: (
      <>
        <P>{"Take a look at the power cable and adapter:"}</P>
        <Bullets>
          <Bullet>
            <strong>{"If you're not using the original ones"}</strong>
            {" — Please switch to the cable and adapter that came in the box and try again."}
          </Bullet>
          <Bullet>
            <strong>{"If it looks damaged (frayed, bent, or broken)"}</strong>
            {" — Please stop using the dashcam immediately. Using a damaged cable or adapter can be unsafe and may cause further damage. Get in touch with us so we can help you get a replacement."}
          </Bullet>
          <Bullet>
            <strong>{"If it's original and looks fine"}</strong>
            {" — Please raise a support request and we'll arrange a visit to check things out."}
          </Bullet>
        </Bullets>
        <P>{"If your cable or adapter is damaged, please do not continue using the dashcam until it has been replaced. Safety first."}</P>
      </>
    ),
  },
  {
    id: "dashcam-overheating",
    question: "My dashcam is getting very hot and switching itself off.",
    homeCategoryId: "device-hardware",
    topicId: "recording-issues",
    keywords: [
      "hot",
      "overheating",
      "overheat",
      "heat",
      "sunlight",
      "shuts off",
      "temperature",
      "switches off",
    ],
    answer: (
      <>
        <P>{"Does your car spend a lot of time parked in direct sunlight? Extreme heat is the most common reason dashcams overheat. Try parking in the shade or using a windshield sunshade when you can."}</P>
        <P>{"Check where the dashcam is mounted. If it's positioned near the edge of the windshield or very close to the dashboard, it may be picking up more heat. A slight repositioning can help."}</P>
        <P>{"As a temporary test, try lowering the recording resolution — for example, from 1440p down to 1080p — and see if the overheating stops."}</P>
        <P>{"Make sure your dashcam is running the latest firmware. Updates sometimes include improvements that help manage heat better."}</P>
        <P>{"If the dashcam is still overheating after trying these steps, please raise a support request and we'll arrange a visit."}</P>
      </>
    ),
  },
  {
    id: "wifi-led-red",
    question: "The WiFi LED of my dashcam is red and won't turn green.",
    homeCategoryId: "device-hardware",
    topicId: "mobile-app-connectivity",
    keywords: [
      "wifi led",
      "red light",
      "led red",
      "green light",
      "indicator",
      "status light",
    ],
    answer: (
      <>
        <P>{"This light shows the connection status. Here's a quick fix to try:"}</P>
        <P>{"Unplug the dashcam from power and take out the SD card. Then plug the dashcam back in without the SD card."}</P>
        <P>{"Check the light again:"}</P>
        <Bullets>
          <Bullet>
            <strong>{"Now green"}</strong>
            {" — The SD card was causing the issue. Try a new SD card."}
          </Bullet>
          <Bullet>
            <strong>{"Still red"}</strong>
            {" — Please get in touch with us and we'll arrange a replacement or repair."}
          </Bullet>
        </Bullets>
      </>
    ),
  },
  {
    id: "trips-missing-corrupted",
    question: "Some of my trips are missing or the videos are incomplete/corrupted.",
    homeCategoryId: "device-hardware",
    topicId: "video-playback-downloads",
    keywords: [
      "missing trips",
      "corrupted",
      "incomplete",
      "lost footage",
      "video missing",
      "trip not saved",
      "format sd card",
    ],
    answer: (
      <>
        <P>
          {"Open the app, connect to your dashcam, go to "}
          <strong>Settings</strong>
          {" and tap "}
          <strong>{"'Sync Time'"}</strong>
          {". Then check your trips list again."}
        </P>
        <P>
          {"Before doing anything else, save any important clips you still have access to. Then go to "}
          <strong>{"Dashcam Settings"}</strong>
          {" and select "}
          <strong>{"'Format SD Card'"}</strong>
          {". After formatting, record a short test trip and check if it saves and plays back correctly."}
        </P>
        <P>{"If you have a spare SD card that meets the required specs, try inserting it and recording a test trip. If it works with the new card, your original SD card is likely faulty and needs to be replaced."}</P>
        <P>{"If the problem continues even with a new SD card, please contact us. We'll look into the device logs and take the next steps to get this resolved for you."}</P>
      </>
    ),
  },
  {
    id: "visible-damage",
    question: "My dashcam or one of its accessories has visible damage (cracks, broken parts, or a bent cable).",
    homeCategoryId: "damage-warranty",
    topicId: "general",
    keywords: [
      "damage",
      "damaged",
      "broken",
      "crack",
      "cracked",
      "bent",
      "warranty",
      "replacement",
      "defective",
    ],
    answer: (
      <>
        <P>
          {"Please take some clear photos or a short video of the damage and send them to us at "}
          <MailLink />
          {", or attach them when raising a ticket in the ACKO app."}
        </P>
        <P>{"Once we receive the images, our team will review your purchase details and warranty status, and let you know the next steps."}</P>
        <P>{"If the damage was noticed within 7 days of delivery or installation and wasn't caused by misuse, you're likely eligible for a free replacement under warranty."}</P>
      </>
    ),
  },
  {
    id: "swollen-burning",
    question: "My dashcam is swollen, extremely hot to the touch, or smells like it's burning.",
    homeCategoryId: "damage-warranty",
    topicId: "general",
    keywords: [
      "swollen",
      "burning",
      "smoke",
      "smell",
      "battery",
      "safety",
      "fire",
      "hazard",
      "hot",
    ],
    answer: (
      <>
        <P>{"Please stop using the dashcam right away. This is a safety concern and we want to make sure you're safe."}</P>
        <P>{"Unplug it and keep it away from flammable materials."}</P>
        <P>
          {"Take a photo or video showing the issue and send it to us at "}
          <MailLink />
          {" or raise a ticket through the ACKO app."}
        </P>
        <P>{"Once we receive and verify your report, we'll arrange an immediate replacement for you. You don't need to do anything else."}</P>
      </>
    ),
  },
  {
    id: "water-fire-heat-damage",
    question: "My dashcam was damaged by water, fire, or extreme heat.",
    homeCategoryId: "damage-warranty",
    topicId: "general",
    keywords: [
      "water damage",
      "fire damage",
      "heat damage",
      "flood",
      "rain",
      "wet",
      "warranty",
      "claim",
    ],
    answer: (
      <>
        <P>
          {"Please describe what happened and share clear photos or a video of the damage at "}
          <MailLink />
          {" or through the ACKO app."}
        </P>
        <P>{"Our team will review your case, check your warranty details, and let you know whether the damage is covered."}</P>
        <Bullets>
          <Bullet>
            <strong>{"If it's covered"}</strong>
            {" — We'll arrange a replacement for you."}
          </Bullet>
          <Bullet>
            <strong>{"If it's not covered"}</strong>
            {" — We'll explain why and discuss other options where possible."}
          </Bullet>
        </Bullets>
      </>
    ),
  },
];

export const FAQS: readonly Faq[] = FAQ_INPUTS.map((input) => {
  const searchBody = normalizeWhitespace(nodeToText(input.answer));
  const snippet = buildSnippet(searchBody);
  return {
    ...input,
    searchBody,
    snippet,
  };
});

const FAQS_BY_ID = new Map(FAQS.map((faq) => [faq.id, faq]));

export function getFaqById(id: string): Faq | undefined {
  return FAQS_BY_ID.get(id);
}

export function groupByHomeCategory(
  faqs: readonly Faq[] = FAQS,
): { category: HomeCategory; items: Faq[] }[] {
  return HOME_CATEGORIES.map((category) => ({
    category,
    items: faqs.filter((faq) => faq.homeCategoryId === category.id),
  })).filter((group) => group.items.length > 0);
}

export function groupByTopic(
  faqs: readonly Faq[] = FAQS,
): { topic: Topic; items: Faq[] }[] {
  return TOPICS.map((topic) => ({
    topic,
    items: faqs.filter((faq) => faq.topicId === topic.id),
  })).filter((group) => group.items.length > 0);
}

export function getPopularFaqs(limit = 6): Faq[] {
  return FAQS.filter((faq) => faq.popular).slice(0, limit);
}
