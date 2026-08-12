"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, easeOut, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

// Placeholder data — will be replaced by the generated photo dataset (real EXIF +
// reverse-geocoded location, per the planned Nominatim/exifr build step). location,
// date, camera and lens below are invented for now to lay out the info panel.
const photos = [
  {
    title: "Moldova, 2024",
    url: "/DSCF3848.jpg",
    width: 4160,
    height: 6240,
    date: "August 14, 2024",
    location: { city: "Chisinau", country: "Moldova", lat: 47.0105, lon: 28.8638 },
    camera: "Fujifilm X-T4",
    lens: "XF 16-55mm f/2.8 R LM WR",
  },
  {
    title: "Georgia, 2026",
    url: "/DSCF5091.jpg",
    width: 4160,
    height: 6240,
    date: "February 2, 2026",
    location: { city: "Mestia", country: "Georgia", lat: 43.0454, lon: 42.725 },
    camera: "Fujifilm X-T4",
    lens: "XF 55-200mm f/3.5-4.8 R LM OIS",
  },
  {
    title: "Pisa, Italy, 2025",
    url: "/a592d3ed-49e8-4a1b-95b4-e6242e4b0a0a.jpg",
    width: 2048,
    height: 1365,
    date: "May 30, 2025",
    location: { city: "Pisa", country: "Italy", lat: 43.7228, lon: 10.4017 },
    camera: "Apple iPhone 15 Pro",
    lens: "24mm f/1.78",
  },
  {
    title: "Estonia, 2026",
    url: "/DSCF4809.jpg",
    width: 4160,
    height: 6240,
    date: "January 18, 2026",
    location: { city: "Tallinn", country: "Estonia", lat: 59.437, lon: 24.7536 },
    camera: "Fujifilm X-T4",
    lens: "XF 23mm f/2 R WR",
  },
  {
    title: "Romania, 2025",
    url: "/DSCF4299.jpg",
    width: 2944,
    height: 4416,
    date: "June 21, 2025",
    location: { city: "Bucharest", country: "Romania", lat: 44.4268, lon: 26.1025 },
    camera: "Fujifilm X-T4",
    lens: "XF 16-55mm f/2.8 R LM WR",
  },
  {
    title: "Italy, 2025",
    url: "/DSCF3063.jpg",
    width: 2944,
    height: 4416,
    date: "May 28, 2025",
    location: { city: "Florence", country: "Italy", lat: 43.7696, lon: 11.2558 },
    camera: "Fujifilm X-T4",
    lens: "XF 90mm f/2 R LM WR",
  },
  {
    title: "Romania, 2025",
    url: "/DSCF4236.jpg",
    width: 2944,
    height: 4416,
    date: "June 23, 2025",
    location: { city: "Brasov", country: "Romania", lat: 45.6427, lon: 25.5887 },
    camera: "Fujifilm X-T4",
    lens: "XF 23mm f/2 R WR",
  },
  {
    title: "Romania, 2025",
    url: "/DSCF4840.jpg",
    width: 4160,
    height: 6240,
    date: "June 25, 2025",
    location: { city: "Sibiu", country: "Romania", lat: 45.7983, lon: 24.1256 },
    camera: "Fujifilm X-T4",
    lens: "XF 16-55mm f/2.8 R LM WR",
  },
  {
    title: "Siena, Italy, 2025",
    url: "/e2d69626-b5e3-42cb-9b6b-d2e1231c5401.jpg",
    width: 2048,
    height: 1365,
    date: "May 31, 2025",
    location: { city: "Siena", country: "Italy", lat: 43.3188, lon: 11.3308 },
    camera: "Apple iPhone 15 Pro",
    lens: "24mm f/1.78",
  },
  {
    title: "Romania, 2025",
    url: "/DSCF4966.jpg",
    width: 4160,
    height: 6240,
    date: "June 26, 2025",
    location: { city: "Cluj-Napoca", country: "Romania", lat: 46.7712, lon: 23.6236 },
    camera: "Fujifilm X-T4",
    lens: "XF 55-200mm f/3.5-4.8 R LM OIS",
  },
];

// Ad-hoc "projects" grouping until real project tags exist — grouped by
// country from the (currently invented) location data.
const PROJECTS = [
  "All",
  ...Array.from(new Set(photos.map((photo) => photo.location.country))),
];

function formatCoordinate(value: number, positiveSuffix: string, negativeSuffix: string) {
  return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? positiveSuffix : negativeSuffix}`;
}

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

// CSS `columns-N` masonry balances column heights automatically, but with tall
// photo tiles that balancing is unreliable (it can leave whole columns empty).
// Instead we use a CSS Grid with a tiny row unit and measure each tile's real
// rendered height in JS to set `grid-row-end: span N` — a standard trick for a
// true, non-cropped masonry grid.
const MASONRY_ROW_UNIT = 4;
const MASONRY_GAP = 12;

type Photo = (typeof photos)[number];

function MasonryTile({
  photo,
  onOpen,
  priority,
}: {
  photo: Photo;
  onOpen: () => void;
  priority: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rowSpan, setRowSpan] = React.useState(1);
  const size = displaySize(photo.width, photo.height);

  const recalc = React.useCallback(() => {
    if (!ref.current) return;
    const height = ref.current.getBoundingClientRect().height;
    setRowSpan(
      Math.ceil((height + MASONRY_GAP) / (MASONRY_ROW_UNIT + MASONRY_GAP))
    );
  }, []);

  React.useEffect(() => {
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [recalc]);

  return (
    // Three levels, deliberately: the OUTER div is the actual grid item —
    // grid stretches it to fill `gridRowEnd`, so it can't be the measurement
    // target (that would be circular: its height always reports back
    // whatever span we last set). The MIDDLE div is a plain, unstretched
    // block that sizes to its own content, so `ref` here reports the image's
    // true natural height regardless of the outer span. The INNER motion.div
    // carries `layoutId` for the shared morph into the expanded view — kept
    // off both other elements because Framer Motion's automatic layout
    // animation applies a transform when its element's box changes, and
    // getBoundingClientRect() picks up in-flight transforms, which is what
    // caused the measurement feedback loop.
    <div
      onClick={onOpen}
      style={{ gridRowEnd: `span ${rowSpan}` }}
      className="cursor-pointer overflow-hidden rounded-sm"
    >
      <div ref={ref}>
        <motion.div layoutId={`photo-${photo.url}`}>
          <Image
            src={photo.url}
            alt={photo.title}
            width={size.width}
            height={size.height}
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="h-auto w-full rounded-sm"
            priority={priority}
            onLoad={recalc}
          />
        </motion.div>
      </div>
    </div>
  );
}

const PhotoCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [expandedLoaded, setExpandedLoaded] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState("All");
  const [projectMenuOpen, setProjectMenuOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"carousel" | "grid">(
    "carousel"
  );

  const displayedPhotos =
    activeProject === "All"
      ? photos
      : photos.filter((photo) => photo.location.country === activeProject);

  const selectProject = (project: string) => {
    setActiveProject(project);
    setProjectMenuOpen(false);
    setOpenIndex(null);
  };

  // Embla's "loop" mode clones slides internally to fill the viewport; changing
  // how many slides exist (switching project) leaves those clones stale unless
  // the instance is explicitly reinitialized.
  React.useEffect(() => {
    api?.reInit();
    api?.scrollTo(0);
  }, [api, activeProject]);

  React.useEffect(() => {
    setExpandedLoaded(false);
  }, [openIndex]);

  React.useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex]);

  return (
    <div
      className={cn(
        "relative w-full bg-background",
        viewMode === "carousel"
          ? "flex h-screen flex-col justify-center overflow-hidden"
          : "min-h-screen overflow-y-auto pt-24 pb-16"
      )}
    >
      <div className="absolute top-6 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border p-1 text-sm">
          {(["carousel", "grid"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setViewMode(mode);
                setOpenIndex(null);
              }}
              className={cn(
                "relative rounded-full px-3 py-1 capitalize transition-colors",
                viewMode === mode
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {viewMode === mode && (
                <motion.span
                  layoutId="view-mode-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 -z-10 rounded-full bg-foreground"
                />
              )}
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setProjectMenuOpen((open) => !open)}
          className="flex items-center gap-1.5 text-sm font-medium"
        >
          {activeProject === "All" ? "Projects" : activeProject}
          <motion.span
            animate={{ rotate: projectMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="text-xs"
          >
            ▾
          </motion.span>
        </button>

        <AnimatePresence>
          {projectMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: easeOut }}
              className="absolute top-full right-0 mt-2 min-w-32 rounded-sm border bg-background/95 py-1.5 shadow-md backdrop-blur-md"
            >
              {PROJECTS.map((project) => (
                <button
                  key={project}
                  onClick={() => selectProject(project)}
                  className={`block w-full px-4 py-1.5 text-left text-sm hover:bg-accent ${
                    project === activeProject ? "font-medium" : "text-muted-foreground"
                  }`}
                >
                  {project}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {projectMenuOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setProjectMenuOpen(false)}
        />
      )}

      {viewMode === "carousel" ? (
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 items-center">
            {displayedPhotos.map((photo, i) => {
              const size = displaySize(photo.width, photo.height);
              return (
                <CarouselItem key={photo.url} className="basis-auto pl-3">
                  <motion.div
                    layoutId={`photo-${photo.url}`}
                    onClick={() => setOpenIndex(i)}
                    className="h-[52vh] cursor-pointer sm:h-[60vh] lg:h-[66vh]"
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
      ) : (
        <div
          className="grid grid-flow-dense grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:px-8 lg:grid-cols-4 xl:grid-cols-5"
          style={{ gridAutoRows: MASONRY_ROW_UNIT }}
        >
          {displayedPhotos.map((photo, i) => (
            <MasonryTile
              key={photo.url}
              photo={photo}
              onOpen={() => setOpenIndex(i)}
              priority={i < 4}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex cursor-zoom-out items-start justify-center overflow-y-auto bg-background/95 p-8 backdrop-blur-md lg:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
          >
            {(() => {
              const photo = displayedPhotos[openIndex];
              // The thumbnail-resolution image is already cached from the carousel,
              // so it paints instantly; the full-resolution one fades in on top of
              // it once loaded instead of leaving a blank gap while it fetches.
              const placeholderSize = displaySize(photo.width, photo.height);
              const fullSize = displaySize(
                photo.width,
                photo.height,
                MAX_EXPANDED_SOURCE_HEIGHT
              );
              const details = [
                {
                  label: "Location",
                  value: `${photo.location.city}, ${photo.location.country}`,
                },
                { label: "Date", value: photo.date },
                {
                  label: "Coordinates",
                  value: `${formatCoordinate(photo.location.lat, "N", "S")}, ${formatCoordinate(photo.location.lon, "E", "W")}`,
                },
                { label: "Camera", value: photo.camera },
                { label: "Lens", value: photo.lens },
              ];

              return (
                <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      visible: {
                        transition: { delayChildren: 0.2, staggerChildren: 0.09 },
                      },
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-64 shrink-0 cursor-auto space-y-5 lg:w-56"
                  >
                    {details.map((detail) => (
                      <motion.div
                        key={detail.label}
                        variants={{
                          hidden: { opacity: 0, x: 28 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.45, ease: easeOut },
                          },
                        }}
                      >
                        <p className="text-xs tracking-wide text-muted-foreground uppercase">
                          {detail.label}
                        </p>
                        <p className="mt-0.5 text-sm font-medium">
                          {detail.value}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    layoutId={`photo-${photo.url}`}
                    className="relative h-[70vh] lg:h-[85vh]"
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
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoCarousel;
