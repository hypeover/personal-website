"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Placeholder data — will be replaced by the generated photo dataset (EXIF + geocoding).
const photos = [
  { title: "Moldova, 2024", url: "/DSCF3848.jpg" },
  { title: "Georgia, 2026", url: "/DSCF5091.jpg" },
  { title: "Estonia, 2026", url: "/DSCF4809.jpg" },
  { title: "Romania, 2025", url: "/DSCF4299.jpg" },
  { title: "Italy, 2025", url: "/DSCF3063.jpg" },
  { title: "Romania, 2025", url: "/DSCF4236.jpg" },
  { title: "Romania, 2025", url: "/DSCF4840.jpg" },
  { title: "Romania, 2025", url: "/DSCF4966.jpg" },
];

const PhotoCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="relative flex h-screen w-full flex-col justify-center overflow-hidden bg-background">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {photos.map((photo, i) => (
            <CarouselItem
              key={i}
              className="basis-[78%] pl-6 sm:basis-[55%] lg:basis-[38%]"
            >
              <div
                className={cn(
                  "relative aspect-[3/4] w-full overflow-hidden rounded-2xl transition-all duration-500 ease-out",
                  i === selectedIndex
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-40"
                )}
              >
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 55vw, 78vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 lg:left-10" />
        <CarouselNext className="right-4 lg:right-10" />
      </Carousel>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm font-medium tracking-wide">
          {photos[selectedIndex].title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {selectedIndex + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
};

export default PhotoCarousel;
