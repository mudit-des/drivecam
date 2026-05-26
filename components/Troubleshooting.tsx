"use client";

import { useState } from "react";
import { ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";
import { Typography } from "@acko/typography";
import { Separator } from "@acko/separator";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqGroup {
  id: string;
  category: string;
  items: FaqItem[];
}

const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "getting-started",
    category: "Getting Started",
    items: [
      {
        question: "My DriveCam won't power on. What should I do?",
        answer:
          "Ensure the USB-C power cable is firmly connected to both the DriveCam and your car's USB port or cigarette lighter adapter. The DriveCam powers on automatically when the ignition is turned on. If the device still doesn't power on, try a different USB port or adapter rated at least 5V/2A.",
      },
      {
        question: "How do I mount the DriveCam on my windshield?",
        answer:
          "Clean the mounting area on your windshield with the included alcohol wipe and let it dry completely. Peel the protective film off the 3M adhesive mount, press it firmly against the glass for 30 seconds, then attach the DriveCam to the mount. Position it behind your rear-view mirror to avoid obstructing your view.",
      },
      {
        question: "Which side of the windshield should I install the DriveCam?",
        answer:
          "Mount the DriveCam in the centre of the windshield, directly behind the rear-view mirror. This provides the widest unobstructed field of view and keeps the camera out of your line of sight while driving.",
      },
    ],
  },
  {
    id: "recording-storage",
    category: "Recording & Storage",
    items: [
      {
        question: "The DriveCam is on, but it's not recording any footage.",
        answer:
          "Check that a microSD card is properly inserted into the card slot on the side of the device. The DriveCam requires a Class 10 / UHS-I card to record. If the card is inserted but recording still doesn't start, try reformatting the card using the ACKO DriveCam app (Settings → Format SD Card).",
      },
      {
        question: "My SD card is not recognised by the DriveCam.",
        answer:
          "Make sure you are using a microSD card rated Class 10 or UHS-I with a capacity between 8 GB and 128 GB. Cards outside this range or rated lower than Class 10 are not compatible. Remove the card, inspect the gold contacts for debris, reinsert it firmly, and restart the device.",
      },
      {
        question: "Old footage is being deleted automatically.",
        answer:
          "This is expected behaviour. The DriveCam uses loop recording — once the card is full, the oldest non-locked clips are overwritten. Emergency clips triggered by the G-sensor are locked and will not be deleted automatically. To preserve footage permanently, save clips to the app or cloud backup.",
      },
      {
        question: "How do I know if an emergency clip has been saved?",
        answer:
          "The DriveCam's status LED will flash amber briefly when the G-sensor triggers an emergency clip lock. You can also view all locked clips in the ACKO DriveCam app under Recordings → Locked Clips.",
      },
    ],
  },
  {
    id: "connectivity-app",
    category: "Connectivity & App",
    items: [
      {
        question: "The ACKO DriveCam app can't find my device.",
        answer:
          "Ensure Bluetooth and Location permissions are enabled for the ACKO app on your phone. The DriveCam creates a Wi-Fi hotspot for media transfer — make sure your phone is within 5 metres of the device. Force-close and reopen the app, then tap Scan for Devices again.",
      },
      {
        question: "Live view is laggy or keeps disconnecting.",
        answer:
          "Live view streams over the DriveCam's 2.4 GHz Wi-Fi hotspot. Interference from other 2.4 GHz networks can cause drops. Try moving your phone closer to the device, or toggle your phone's Wi-Fi off and back on to reconnect. The live view feature is intended for stationary review, not active driving.",
      },
      {
        question: "Cloud backup isn't syncing.",
        answer:
          "Cloud backup runs automatically when the app is connected to the DriveCam over Wi-Fi and your phone has an active internet connection. Check that Background App Refresh is enabled for the ACKO app in your phone's settings, and ensure you are logged in to your ACKO account.",
      },
    ],
  },
  {
    id: "video-quality",
    category: "Video Quality",
    items: [
      {
        question: "Footage looks blurry or foggy.",
        answer:
          "The most common cause is a dirty or smudged lens. Clean the lens gently with a microfibre cloth. Ensure the windshield area in front of the camera is also clean from the inside. Condensation on the windshield can also affect image quality temporarily.",
      },
      {
        question: "Night footage is very dark or grainy.",
        answer:
          "The DriveCam uses a Sony Starvis IMX307 sensor optimised for low-light recording. In very dark environments some grain is normal. Ensure the camera lens is clean and the camera is not pointed directly into oncoming headlights. Check the app settings to confirm HDR mode is enabled.",
      },
      {
        question: "I see a black bar or partial black screen in some clips.",
        answer:
          "This can happen if the SD card write speed is insufficient for the selected resolution. Format the card using the app and re-test. If the issue persists, replace the card with a UHS-I rated card of at least 32 GB.",
      },
    ],
  },
];

function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left focus-visible:outline-none"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <Typography variant="label-lg" color="primary" as="span">
          {item.question}
        </Typography>
        <ChevronDown
          className="flex-shrink-0 h-5 w-5 transition-transform duration-200"
          style={{
            color: "var(--colorPrimary, #6841e6)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="pb-4">
          <Typography variant="body-md" color="secondary">
            {item.answer}
          </Typography>
        </div>
      )}
    </div>
  );
}

function FaqGroupSection({ group }: { group: FaqGroup }) {
  return (
    <div className="acko-card acko-card-default acko-card-pad-md">
      {/* Group category heading */}
      <div className="pb-3">
        <Typography variant="overline" color="brand">
          {group.category}
        </Typography>
      </div>

      <Separator decorative />

      {/* FAQ items */}
      {group.items.map((item, idx) => (
        <div key={item.question}>
          <FaqAccordionItem item={item} />
          {idx < group.items.length - 1 && <Separator decorative />}
        </div>
      ))}
    </div>
  );
}

export function Troubleshooting() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="py-20 sm:py-28"
    >
      <div className="container-page">
        {/* Section header */}
        <div className="mb-12">
          <Typography
            as="h2"
            id="faqs-heading"
            variant="display-sm"
            color="primary"
          >
            Troubleshooting &amp; FAQs
          </Typography>
          <div className="mt-3 max-w-2xl">
            <Typography variant="body-lg" color="secondary">
              Running into an issue? Find answers to the most common DriveCam
              questions below.
            </Typography>
          </div>
        </div>

        {/* FAQ groups */}
        <div className="flex flex-col gap-4">
          {FAQ_GROUPS.map((group) => (
            <FaqGroupSection key={group.id} group={group} />
          ))}
        </div>

        {/* Still need help? */}
        <div className="mt-8 acko-card acko-card-default acko-card-pad-md">
          <Typography as="h3" variant="heading-md" color="primary">
            Still need help?
          </Typography>
          <ul className="mt-4 flex flex-col gap-3">
            <li className="flex items-start gap-3">
              <MessageCircle
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-ink-muted"
                strokeWidth={2}
                aria-hidden
              />
              <Typography variant="body-md" color="secondary">
                <span className="font-medium text-ink">In the app</span> —
                tap Help, start a chat.
              </Typography>
            </li>
            <li className="flex items-start gap-3">
              <Mail
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-ink-muted"
                strokeWidth={2}
                aria-hidden
              />
              <Typography variant="body-md" color="secondary">
                <span className="font-medium text-ink">By email</span> —{" "}
                <a
                  href="mailto:help@acko.com"
                  className="text-accent hover:underline underline-offset-2"
                >
                  help@acko.com
                </a>
              </Typography>
            </li>
            <li className="flex items-start gap-3">
              <Phone
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-ink-muted"
                strokeWidth={2}
                aria-hidden
              />
              <Typography variant="body-md" color="secondary">
                <span className="font-medium text-ink">By phone</span> —{" "}
                <a
                  href="tel:+918002662256"
                  className="text-accent hover:underline underline-offset-2"
                >
                  1800 266 2256
                </a>
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
