import Image from "next/image";
import { Typography } from "@acko/typography";
import { withBasePath } from "@/lib/assets";
import { ROAD_FEATURES } from "@/lib/builtForTheRoad";

export function BuiltForTheRoad() {
  return (
    <section
      id="built-for-the-road"
      aria-labelledby="built-for-the-road-heading"
      className="py-20 sm:py-28 bg-surface-tint"
    >
      <div className="container-page">
        <div className="mb-12">
          <Typography
            as="h2"
            id="built-for-the-road-heading"
            variant="display-sm"
            color="primary"
          >
            Built for the road
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROAD_FEATURES.map(({ id, imageSrc, imageAlt, headline, description }) => (
            <article
              key={id}
              className="acko-card overflow-hidden border border-line bg-white flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-accent-soft">
                <Image
                  src={withBasePath(imageSrc)}
                  alt={imageAlt}
                  width={640}
                  height={480}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 p-6 sm:p-8">
                <Typography as="h3" variant="heading-sm" color="primary">
                  {headline}
                </Typography>
                <Typography variant="body-md" color="secondary">
                  {description}
                </Typography>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
