"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import "lenis/dist/lenis.css";

import { PhotoCarouselView } from "./views/photo-carousel-view";
import { PhotoGridView } from "./views/photo-grid-view";

const PhotoMapView = dynamic(() => import("./views/photo-map-view"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center text-sm text-muted-foreground">
      Loading map...
    </div>
  ),
});

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

function formatCoordinate(value: number, positiveSuffix: string, negativeSuffix: string) {
  return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? positiveSuffix : negativeSuffix}`;
}

function displaySize(width: number, height: number, maxHeight = 1200) {
  if (height <= maxHeight) return { width, height };
  const scale = maxHeight / height;
  return { width: Math.round(width * scale), height: maxHeight };
}

export default function PhotoCarousel() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [expandedLoaded, setExpandedLoaded] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"carousel" | "grid" | "map">("carousel");

  React.useEffect(() => {
    if (viewMode === "grid") {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    } else {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
  }, [viewMode]);

  const switchViewMode = (mode: "carousel" | "grid" | "map") => {
    setOpenIndex(null);
    if (mode !== "grid") window.scrollTo(0, 0);
    setViewMode(mode);
  };

  React.useEffect(() => {
    setExpandedLoaded(false);
  }, [openIndex]);

  return (
    <div className="relative w-full min-h-screen bg-background overflow-x-hidden">
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

      {/* Switcher trybów (Carousel / Grid / Map) */}
      <div className="fixed top-6 left-1/2 z-30 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border bg-background/80 backdrop-blur-md p-1 text-sm shadow-sm">
          {(["carousel", "grid", "map"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => switchViewMode(mode)}
              aria-label={`Switch to ${mode} view`}
              className={`relative rounded-full px-3.5 py-1 capitalize transition-colors ${
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

      {/* Przełącznik widoków */}
      <AnimatePresence mode="wait">
        {viewMode === "carousel" && (
          <PhotoCarouselView
            photos={photos}
            onPhotoClick={(i) => setOpenIndex(i)}
          />
        )}
        {viewMode === "grid" && (
          <PhotoGridView
            photos={photos}
            onPhotoClick={(i) => setOpenIndex(i)}
          />
        )}
        {viewMode === "map" && (
          <PhotoMapView
            photos={photos}
            onPhotoClick={(i) => setOpenIndex(i)}
          />
        )}
      </AnimatePresence>

      {/* Modal ze szczegółami */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex cursor-zoom-out items-start justify-center overflow-y-auto bg-background/95 p-8 backdrop-blur-md lg:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenIndex(null)}
          >
            {(() => {
              const photo = photos[openIndex];
              const placeholderSize = displaySize(photo.width, photo.height);
              const fullSize = displaySize(photo.width, photo.height, 2000);
              const details = [
                { label: "Location", value: `${photo.location.city}, ${photo.location.country}` },
                { label: "Date", value: photo.date },
                { label: "Coordinates", value: `${formatCoordinate(photo.location.lat, "N", "S")}, ${formatCoordinate(photo.location.lon, "E", "W")}` },
                { label: "Camera", value: photo.camera },
                { label: "Lens", value: photo.lens },
              ];

              return (
                <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-64 shrink-0 cursor-auto space-y-5 lg:w-56"
                  >
                    {details.map((detail) => (
                      <div key={detail.label}>
                        <p className="text-xs tracking-wide text-muted-foreground uppercase">
                          {detail.label}
                        </p>
                        <p className="mt-0.5 text-sm font-medium">{detail.value}</p>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    layoutId={`photo-${photo.url}-${openIndex}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative h-[70vh] lg:h-[85vh] overflow-hidden rounded-sm"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      width={placeholderSize.width}
                      height={placeholderSize.height}
                      className="h-full w-auto rounded-sm object-cover"
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
}