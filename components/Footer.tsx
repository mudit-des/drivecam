import Link from "next/link";
import { Typography } from "@acko/typography";
import { AckoWordmark } from "./AckoWordmark";

type FooterItem = string | { label: string; href: string };

interface FooterColumn {
  title: string;
  items: FooterItem[];
}

const PRIMARY_COLUMNS: FooterColumn[] = [
  {
    title: "Products",
    items: [
      { label: "Car insurance", href: "https://www.acko.com/car-insurance/" },
      { label: "Bike insurance", href: "https://www.acko.com/two-wheeler-insurance/" },
      { label: "Health insurance", href: "https://www.acko.com/health-insurance/" },
      { label: "Life insurance", href: "https://www.acko.com/life-insurance/" },
      {
        label: "Travel insurance",
        href: "https://www.acko.com/international-travel-insurance/",
      },
      { label: "Enterprise solutions", href: "https://www.acko.com/enterprise/" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About us", href: "https://www.acko.com/about-us/" },
      { label: "Careers", href: "https://www.acko.com/careers/" },
      { label: "Contact us", href: "https://www.acko.com/contact-us/" },
      {
        label: "Board of directors",
        href: "https://www.acko.com/board-of-directors/",
      },
    ],
  },
  {
    title: "Brand Hub",
    items: [
      { label: "All resources", href: "https://www.acko.com/brand-hub/" },
      { label: "Customer stories", href: "https://www.acko.com/customer-stories/" },
      { label: "Media Kit", href: "https://www.acko.com/gi/media-kit/" },
      { label: "Articles", href: "https://www.acko.com/articles/" },
      { label: "E-books", href: "https://www.acko.com/e-books/" },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        label: "Financials & disclosures",
        href: "https://www.acko.com/financials/",
      },
      { label: "Privacy policy", href: "https://www.acko.com/privacy-policy/" },
      {
        label: "Terms & conditions",
        href: "https://www.acko.com/terms-and-conditions/",
      },
    ],
  },
];

function resolveItem(item: FooterItem): { label: string; href: string } {
  return typeof item === "string" ? { label: item, href: "#" } : item;
}

function FooterDivider() {
  return <div aria-hidden className="h-px w-full bg-white/10" />;
}

function FooterLink({ item }: { item: FooterItem }) {
  const { label, href } = resolveItem(item);
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      className="inline-block text-white/70 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:underline"
    >
      <Typography as="span" variant="body-sm" className="!text-inherit">
        {label}
      </Typography>
    </Link>
  );
}

function ColumnList({ column }: { column: FooterColumn }) {
  return (
    <div>
      <Typography
        variant="overline"
        color="invert"
        className="opacity-60"
      >
        {column.title}
      </Typography>
      <ul className="mt-3 flex flex-col gap-2">
        {column.items.map((item) => {
          const { label } = resolveItem(item);
          return (
            <li key={label}>
              <FooterLink item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="text-white"
      style={{
        background:
          "linear-gradient(180deg, #262626 0%, #000 900px, #000 100%)",
      }}
    >
      <div className="container-page py-16 sm:py-20">
        {/* Brand row — recolor the navy 'ACKO' letters to white via attribute selector */}
        <div className="[&_path[fill='#2C2067']]:fill-white">
          <AckoWordmark width={120} height={29} />
        </div>

        {/* Primary 4 columns */}
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {PRIMARY_COLUMNS.map((column) => (
            <ColumnList key={column.title} column={column} />
          ))}
        </div>

        <div className="my-12">
          <FooterDivider />
        </div>

        {/* Bottom legal block */}
        <div className="space-y-3">
          <Typography as="p" variant="label-md" color="invert">
            ACKO Technology &amp; Services Private Limited
          </Typography>
          <Typography
            as="p"
            variant="body-sm"
            color="invert"
            className="opacity-70"
          >
            #36/5, Hustlehub One East, Somasandrapalya 27th Main Rd, Sector 2,
            HSR Layout, Bengaluru, Karnataka 560102
          </Typography>
          <Typography
            as="p"
            variant="body-sm"
            color="invert"
            className="opacity-70"
          >
            CIN: U74110KA2016PTC120161
          </Typography>
          <Typography
            as="p"
            variant="caption"
            color="invert"
            className="opacity-50"
          >
            The use of images and brands are only for the purpose of indication
            and illustration.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
