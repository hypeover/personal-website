"use client";

import { motion } from "motion/react";
import { CustomCarousel } from "../custom-carousel";

interface PhotoCarouselViewProps {
  photos: any[];
  onPhotoClick: (index: number) => void;
}

export function PhotoCarouselView({ photos, onPhotoClick }: PhotoCarouselViewProps) {
  return (
    <motion.div
      key="carousel"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-screen w-full flex-col justify-center"
    >
      <CustomCarousel photos={photos} onPhotoClick={onPhotoClick} />
    </motion.div>
  );
}