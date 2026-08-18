"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, easeOut, motion } from "motion/react";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";

import { CustomCarousel } from "./custom-carousel";

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

const PROJECTS = [
  "All",
  ...Array.from(new Set(photos.map((photo) => photo.location.country))),
];

function formatCoordinate(value: number, positiveSuffix: string, negativeSuffix: string) {
  return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? positiveSuffix : negativeSuffix}`;
}

const MAX_SOURCE_HEIGHT = 1200;
const MAX_EXPANDED_SOURCE_HEIGHT = 2000;

function displaySize(width: number, height: number, maxHeight = MAX_SOURCE_HEIGHT) {
  if (height <= maxHeight) return { width, height };
  const scale = maxHeight / height;
  return { width: Math.round(width * scale), height: maxHeight };
}

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
    <div
      onClick={onOpen}
      style={{ gridRowEnd: `span ${rowSpan}` }}
      className="cursor-pointer overflow-hidden rounded-sm"
    >
      <div ref={ref}>
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
      </div>
    </div>
  );
}

type Flip = { x: number; y: number; scaleX: number; scaleY: number };

function ZoomedPhoto({
  photo,
  originRect,
  placeholderSize,
  fullSize,
  expandedLoaded,
  onExpandedLoad,
}: {
  photo: Photo;
  originRect: DOMRect | null;
  placeholderSize: { width: number; height: number };
  fullSize: { width: number; height: number };
  expandedLoaded: boolean;
  onExpandedLoad: () => void;
}) {
  const [flip, setFlip] = React.useState<Flip | null>(null);
  const [measured, setMeasured] = React.useState(!originRect);

  // First mount is invisible and only used to measure the fully-rendered box
  // (which depends on the lg: breakpoint and the image's own aspect ratio).
  // Once measured, we remount with the correct starting transform so the
  // image visibly grows from the clicked thumbnail instead of popping in.
  const measureRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !originRect || measured) return;
      const rect = node.getBoundingClientRect();
      setFlip({
        x: originRect.left + originRect.width / 2 - (rect.left + rect.width / 2),
        y: originRect.top + originRect.height / 2 - (rect.top + rect.height / 2),
        scaleX: originRect.width / rect.width,
        scaleY: originRect.height / rect.height,
      });
      setMeasured(true);
    },
    [originRect, measured]
  );

  return (
    <motion.div
      key={measured ? "ready" : "measuring"}
      ref={measureRef}
      initial={
        !measured
          ? { opacity: 0 }
          : flip
            ? { x: flip.x, y: flip.y, scaleX: flip.scaleX, scaleY: flip.scaleY, opacity: 1 }
            : { opacity: 0, scale: 0.95 }
      }
      animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
        onLoad={onExpandedLoad}
        priority
      />
    </motion.div>
  );
}

export default function PhotoCarousel() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [originRect, setOriginRect] = React.useState<DOMRect | null>(null);
  const [activeCarouselKey, setActiveCarouselKey] = React.useState<string | undefined>(undefined);
  const [expandedLoaded, setExpandedLoaded] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState("All");
  const [projectMenuOpen, setProjectMenuOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"carousel" | "grid">("carousel");

  // Zarządzanie stanem przewijania i blokada widocznego scrollbara
  React.useEffect(() => {
    if (viewMode === "carousel") {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [viewMode]);

  const switchViewMode = (mode: "carousel" | "grid") => {
    setOpenIndex(null);
    if (mode === "carousel") {
      window.scrollTo(0, 0);
    }
    setViewMode(mode);
  };

  const displayedPhotos =
    activeProject === "All"
      ? photos
      : photos.filter((photo) => photo.location.country === activeProject);

  const selectProject = (project: string) => {
    setActiveProject(project);
    setProjectMenuOpen(false);
    setOpenIndex(null);
  };

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
    <div className="relative w-full min-h-screen bg-background overflow-x-hidden">
      {/* Globalne ukrycie wizualnych pasków przewijania (scroll działa bez przeszkód) */}
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        ::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
      `}} />

      {/* Switcher trybów */}
      <div className="fixed top-6 left-1/2 z-30 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border bg-background/80 backdrop-blur-md p-1 text-sm shadow-sm">
          {(["carousel", "grid"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => switchViewMode(mode)}
              aria-label={`Switch to ${mode} view`}
              className={`relative rounded-full px-3 py-1 capitalize transition-colors ${
                viewMode === mode
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
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

      {/* Menu filtrów */}
      <div className="fixed top-6 right-6 z-30">
        <button
          onClick={() => setProjectMenuOpen((open) => !open)}
          className="flex items-center gap-1.5 text-sm font-medium bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border shadow-sm"
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

      {/* Treść z wykluczoną szarpnięciami animacją */}
      <AnimatePresence mode="wait">
        {viewMode === "carousel" ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -30,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-screen w-full flex-col justify-center"
          >
            <CustomCarousel
              photos={displayedPhotos}
              onPhotoClick={(index, rect, key) => {
                setOriginRect(rect);
                setActiveCarouselKey(key);
                setOpenIndex(index);
              }}
              activeKey={openIndex !== null ? activeCarouselKey : undefined}
            />
          </motion.div>
        ) : (
          <ReactLenis root key="grid-lenis">
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 20,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-flow-dense grid-cols-2 gap-3 px-4 pt-24 pb-16 sm:grid-cols-3 sm:px-8 lg:grid-cols-4 xl:grid-cols-5"
              style={{ gridAutoRows: MASONRY_ROW_UNIT }}
            >
              {displayedPhotos.map((photo, i) => (
                <MasonryTile
                  key={photo.url}
                  photo={photo}
                  onOpen={() => {
                    setOriginRect(null);
                    setOpenIndex(i);
                  }}
                  priority={i < 4}
                />
              ))}
            </motion.div>
          </ReactLenis>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex cursor-zoom-out items-start justify-center overflow-y-auto bg-background/95 p-8 backdrop-blur-md lg:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpenIndex(null)}
          >
            {(() => {
              const photo = displayedPhotos[openIndex];
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

                  <ZoomedPhoto
                    photo={photo}
                    originRect={viewMode === "carousel" ? originRect : null}
                    placeholderSize={placeholderSize}
                    fullSize={fullSize}
                    expandedLoaded={expandedLoaded}
                    onExpandedLoad={() => setExpandedLoaded(true)}
                  />
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
