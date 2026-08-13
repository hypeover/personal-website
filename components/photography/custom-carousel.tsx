"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";

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

interface CustomCarouselProps {
  photos: Photo[];
  onPhotoClick?: (index: number) => void;
  activePhotoUrl?: string;
}

export function CustomCarousel({ photos, onPhotoClick, activePhotoUrl }: CustomCarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);

  const doublePhotos = React.useMemo(() => [...photos, ...photos], [photos]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let targetX = 0;
    let currentX = 0;
    let animId: number;

    let isDragging = false;
    let startX = 0;
    let dragDistance = 0;

    const ease = 0.07;
    const sensitivity = 0.8;
    const dragSpeed = 1.2;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetX -= e.deltaY * sensitivity;
    };

    const handleStart = (clientX: number, target: EventTarget | null) => {
      // Jeśli kliknięto w przycisk interfejsu (np. Grid, Projects), ignorujemy drag
      if (target && (target as HTMLElement).closest("button, a, [role='button']")) {
        return;
      }

      isDragging = true;
      startX = clientX;
      dragDistance = 0;
      document.body.style.cursor = "grabbing";
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      handleStart(e.clientX, e.target);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleStart(e.touches[0].clientX, e.target);
      }
    };

    const handleMove = (clientX: number) => {
      if (!isDragging) return;
      const deltaX = clientX - startX;
      startX = clientX;
      dragDistance += Math.abs(deltaX);

      targetX += deltaX * dragSpeed;
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      document.body.style.cursor = "";
    };

    // Przechwytujemy kliknięcie tylko wtedy, gdy cel NIE JEST przyciskiem/linkiem UI
    const handleClickCapture = (e: MouseEvent) => {
      const isUIButton = (e.target as HTMLElement)?.closest("button, a, [role='button']");
      if (!isUIButton && dragDistance > 5) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    window.addEventListener("click", handleClickCapture, true);

    const render = () => {
      const singleSetWidth = track.scrollWidth / 2;

      currentX += (targetX - currentX) * ease;

      if (singleSetWidth > 0) {
        while (currentX <= -singleSetWidth) {
          currentX += singleSetWidth;
          targetX += singleSetWidth;
        }
        while (currentX > 0) {
          currentX -= singleSetWidth;
          targetX -= singleSetWidth;
        }
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);

      window.removeEventListener("click", handleClickCapture, true);

      document.body.style.cursor = "";
      cancelAnimationFrame(animId);
    };
  }, [photos]);

  return (
    <div className="relative w-full overflow-hidden py-8 select-none">
      <div
        ref={trackRef}
        className="flex gap-4 w-max my-auto"
        style={{ willChange: "transform" }}
      >
        {doublePhotos.map((photo, idx) => {
          const originalIndex = idx % photos.length;
          const aspectRatio = photo.width / photo.height;

          const isFirstSet = idx < photos.length;
          const isActive = photo.url === activePhotoUrl;

          return (
            <motion.div
              key={`${photo.url}-${idx}`}
              layoutId={isFirstSet ? `photo-${photo.url}` : undefined}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: isActive ? 0 : 1, y: 0 }}
              transition={{
                duration: activePhotoUrl ? 0.3 : 0.65,
                delay: activePhotoUrl ? 0 : idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onPhotoClick?.(originalIndex)}
              className="relative h-[52vh] sm:h-[60vh] lg:h-[66vh] shrink-0 cursor-pointer overflow-hidden rounded-sm"
              style={{ width: `calc(66vh * ${aspectRatio})` }}
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover pointer-events-none"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}