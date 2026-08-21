"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ReactLenis } from "lenis/react";
import Masonry from "@/components/Masonry"; // Dostosuj ścieżkę do swojego komponentu Masonry

export interface Photo {
  title: string;
  url: string;
  width: number;
  height: number;
  date?: string;
  location?: { city: string; country: string; lat: number; lon: number };
  camera?: string;
  lens?: string;
}

interface PhotoGridViewProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

export function PhotoGridView({ photos, onPhotoClick }: PhotoGridViewProps) {
  // Mapowanie Twoich obiektów Photo na strukturę wymaganą przez React Bits Masonry
  const masonryItems = React.useMemo(() => {
    return photos.map((photo, index) => {
      // Skalujemy wysokość pod stałą szerokość kolumny, aby zachować poprawne proporcje
      const computedHeight = Math.round((photo.height / photo.width) * 400);

      return {
        id: `${photo.url}-${index}`,
        img: photo.url,
        title: photo.title,
        height: computedHeight,
        // Zachowujemy oryginalny indeks, aby przekazać go do onPhotoClick
        originalIndex: index,
      };
    });
  }, [photos]);

  return (
    <ReactLenis root key="grid-lenis">
      <motion.div
        key="grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 pt-24 pb-16 sm:px-8 w-full max-w-[1920px] mx-auto min-h-screen"
      >
        <Masonry
          items={masonryItems}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover={false}
          onItemClick={(item: any) => onPhotoClick(item.originalIndex)}
        />
      </motion.div>
    </ReactLenis>
  );
}