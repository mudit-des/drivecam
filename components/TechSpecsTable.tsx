import { Separator } from "@acko/separator";
import { Typography } from "@acko/typography";

interface SpecRow {
  label: string;
  value: string;
}

const SPECS: readonly SpecRow[] = [
  { label: "Front resolution", value: "1440p QHD" },
  { label: "Field of view",    value: "150°+" },
  { label: "Night vision",     value: "Yes" },
  { label: "G-sensor",         value: "Yes — footage locked on impact" },
  { label: "Power",            value: "Supercapacitor" },
  { label: "Storage",          value: "SD card required — up to 512GB" },
  { label: "Connectivity",     value: "Wi-Fi" },
  { label: "Heat tolerance",   value: "~70°C+ cabin" },
] as const;

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
        </div>

        {/* Flat spec list */}
        <dl className="mx-auto w-full">
          <Separator decorative />
          {SPECS.map((row) => (
            <div key={row.label}>
              <div className="flex items-baseline justify-between gap-8 py-4">
                <dt className="min-w-0 shrink-0">
                  <Typography variant="body-md" color="secondary">
                    {row.label}
                  </Typography>
                </dt>
                <dd className="text-right">
                  <Typography
                    variant="body-md"
                    color="primary"
                    weight="medium"
                  >
                    {row.value}
                  </Typography>
                </dd>
              </div>
              <Separator decorative />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
