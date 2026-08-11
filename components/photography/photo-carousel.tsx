"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
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
const MAX_EXPANDED_SOURCE_HEIGHT = 2000;

function displaySize(width: number, height: number, maxHeight = MAX_SOURCE_HEIGHT) {
  if (height <= maxHeight) return { width, height };
  const scale = maxHeight / height;
  return { width: Math.round(width * scale), height: maxHeight };
}

const PhotoCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [expandedLoaded, setExpandedLoaded] = React.useState(false);

  React.useEffect(() => {
    setExpandedLoaded(false);
  }, [openIndex]);

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

  React.useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex]);

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
                <motion.div
                  layoutId={`photo-${i}`}
                  onClick={() => setOpenIndex(i)}
                  className="h-[52vh] cursor-zoom-in sm:h-[60vh] lg:h-[66vh]"
                >
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    width={size.width}
                    height={size.height}
                    className="h-full w-auto rounded-sm"
                    priority={i === 0}
                  />
                </motion.div>
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

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-background/95 p-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
          >
            {(() => {
              const photo = photos[openIndex];
              // The thumbnail-resolution image is already cached from the carousel,
              // so it paints instantly; the full-resolution one fades in on top of
              // it once loaded instead of leaving a blank gap while it fetches.
              const placeholderSize = displaySize(photo.width, photo.height);
              const fullSize = displaySize(
                photo.width,
                photo.height,
                MAX_EXPANDED_SOURCE_HEIGHT
              );
              return (
                <motion.div
                  layoutId={`photo-${openIndex}`}
                  className="relative h-[85vh]"
                >
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    width={placeholderSize.width}
                    height={placeholderSize.height}
                    className="h-full w-auto rounded-sm"
                    priority
                  />
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    width={fullSize.width}
                    height={fullSize.height}
                    className={`absolute inset-0 h-full w-full rounded-sm object-cover transition-opacity duration-300 ${
                      expandedLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setExpandedLoaded(true)}
                    priority
                  />
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoCarousel;
