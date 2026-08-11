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

// Placeholder data — will be replaced by the generated photo dataset (EXIF + geocoding).
// width/height are the real source dimensions, used to keep every slide at the
// same rendered height with the width following each photo's natural aspect ratio.
const photos = [
  { title: "Moldova, 2024", url: "/DSCF3848.jpg", width: 4160, height: 6240 },
  { title: "Georgia, 2026", url: "/DSCF5091.jpg", width: 4160, height: 6240 },
  {
    title: "Pisa, Italy, 2025",
    url: "/a592d3ed-49e8-4a1b-95b4-e6242e4b0a0a.jpg",
    width: 2048,
    height: 1365,
  },
  { title: "Estonia, 2026", url: "/DSCF4809.jpg", width: 4160, height: 6240 },
  { title: "Romania, 2025", url: "/DSCF4299.jpg", width: 2944, height: 4416 },
  { title: "Italy, 2025", url: "/DSCF3063.jpg", width: 2944, height: 4416 },
  { title: "Romania, 2025", url: "/DSCF4236.jpg", width: 2944, height: 4416 },
  { title: "Romania, 2025", url: "/DSCF4840.jpg", width: 4160, height: 6240 },
  {
    title: "Siena, Italy, 2025",
    url: "/e2d69626-b5e3-42cb-9b6b-d2e1231c5401.jpg",
    width: 2048,
    height: 1365,
  },
  { title: "Romania, 2025", url: "/DSCF4966.jpg", width: 4160, height: 6240 },
];

// The source files are full-resolution camera exports (20+ MP). Requesting them
// at that intrinsic size made Next.js serve/decode huge images for what renders
// at a fraction of that size, which is what caused the scroll/drag jank — cap
// the size we ask Next.js to generate while keeping each photo's aspect ratio.
const MAX_SOURCE_HEIGHT = 1200;

function displaySize(width: number, height: number) {
  if (height <= MAX_SOURCE_HEIGHT) return { width, height };
  const scale = MAX_SOURCE_HEIGHT / height;
  return { width: Math.round(width * scale), height: MAX_SOURCE_HEIGHT };
}

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
        <CarouselContent className="-ml-3 items-center">
          {photos.map((photo, i) => {
            const size = displaySize(photo.width, photo.height);
            return (
              <CarouselItem key={i} className="basis-auto pl-3">
                <div className="h-[52vh] sm:h-[60vh] lg:h-[66vh]">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    width={size.width}
                    height={size.height}
                    className="h-full w-auto rounded-sm"
                    priority={i === 0}
                  />
                </div>
              </CarouselItem>
            );
          })}
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
