import { Separator } from "@acko/separator";
import { Typography } from "@acko/typography";

interface SpecRow {
  label: string;
  value: string;
}

interface SpecGroup {
  category: string;
  rows: SpecRow[];
}

const SPEC_GROUPS: SpecGroup[] = [
  {
    category: "Video",
    rows: [
      { label: "Resolution",   value: "1080p Full HD"  },
      { label: "Night Vision", value: "Sony Starvis IMX307 sensor" },
    ],
  },
  {
    category: "Optics",
    rows: [
      { label: "Field of View", value: "156° Wide Angle" },
      { label: "Aperture",      value: "f/1.8"           },
    ],
  },
  {
    category: "Storage",
    rows: [
      { label: "Storage Type",   value: "microSD (Class 10 / UHS-I)" },
      { label: "Max Capacity",   value: "Up to 128GB"                },
      { label: "Loop Recording", value: "1 / 3 / 5 minute segments"  },
    ],
  },
  {
    category: "Connectivity",
    rows: [
      { label: "Wi-Fi", value: "2.4GHz 802.11 b/g/n" },
      { label: "App",   value: "iOS & Android"        },
    ],
  },
  {
    category: "Power",
    rows: [
      { label: "Input",        value: "5V DC / USB-C"            },
      { label: "Parking Mode", value: "Supported (hardwire kit)" },
    ],
  },
  {
    category: "Build",
    rows: [
      { label: "IP Rating", value: "IP52"     },
      { label: "GPS",       value: "Built-in" },
      { label: "G-Sensor",  value: "3-axis"   },
    ],
  },
];

export function TechSpecsTable() {
  return (
    <section
      id="specs-table"
      aria-labelledby="specs-table-heading"
      className="py-20 sm:py-28 bg-surface-alt"
    >
      <div className="container-page">
        {/* Section header */}
        <div className="mb-12">
          <Typography
            as="h2"
            id="specs-table-heading"
            variant="display-sm"
            color="primary"
          >
            Tech Specs
          </Typography>
          <div className="mt-3">
            <Typography variant="body-lg" color="secondary">
              Everything under the hood — built for clarity, built to last.
            </Typography>
          </div>
        </div>

        {/* Two-column layout on large screens */}
        <div className="grid grid-cols-1 gap-x-16 gap-y-0 lg:grid-cols-2">
          {SPEC_GROUPS.map((group, groupIdx) => (
            <div key={group.category}>
              {/* Category heading */}
              <div className="pt-8 pb-3 first:pt-0">
                <Typography
                  variant="overline"
                  color="brand"
                >
                  {group.category}
                </Typography>
              </div>

              <Separator decorative />

              {/* Rows */}
              <dl>
                {group.rows.map((row, rowIdx) => (
                  <div key={row.label}>
                    <div className="flex items-baseline justify-between gap-8 py-3.5">
                      <dt className="min-w-0 shrink-0">
                        <Typography variant="body-sm" color="secondary">
                          {row.label}
                        </Typography>
                      </dt>
                      <dd className="text-right">
                        <Typography variant="body-sm" color="primary" weight="medium">
                          {row.value}
                        </Typography>
                      </dd>
                    </div>
                    {rowIdx < group.rows.length - 1 && (
                      <Separator decorative />
                    )}
                  </div>
                ))}
              </dl>

              {/* Bottom divider between groups on mobile (single col) */}
              {groupIdx < SPEC_GROUPS.length - 1 && (
                <div className="lg:hidden">
                  <Separator decorative />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
