"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useCursor } from "./CursorContext";

interface IosPointerProps {
  isVisible: boolean;
  initialCoords: { x: number; y: number } | null;
}

export function IosPointer({ isVisible, initialCoords }: IosPointerProps) {
  const { isHovered, elementRect } = useCursor();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 22, stiffness: 350 });
  const smoothY = useSpring(mouseY, { damping: 22, stiffness: 350 });

  useEffect(() => {
    if (initialCoords) {
      smoothX.jump(initialCoords.x);
      smoothY.jump(initialCoords.y);
      mouseX.set(initialCoords.x);
      mouseY.set(initialCoords.y);
    }
  }, [initialCoords, mouseX, mouseY, smoothX, smoothY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered && elementRect) {
        mouseX.set(elementRect.left + elementRect.width / 2);
        mouseY.set(elementRect.top + elementRect.height / 2);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    if (isVisible) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered, elementRect, mouseX, mouseY, isVisible]);

  const pointerVariants = {
    default: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      backgroundColor: "rgb(59, 130, 246)",
      opacity: 0.5,
    },
    hovered: {
      width: (elementRect?.width || 0) + 8,
      height: (elementRect?.height || 0) + 8,
      borderRadius: "12px",
      backgroundColor: "var(--foreground)",
      opacity: 0.1,
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      variants={pointerVariants}
      animate={isHovered ? "hovered" : "default"}
      transition={{ type: "spring", damping: 25, stiffness: 250 }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ left: smoothX, top: smoothY }}
    />
  );
}

export function MagneticItem({ children }: { children: React.ReactNode }) {
  const { registerHover, unregisterHover } = useCursor();
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (elementRef.current) {
      registerHover(elementRef.current.getBoundingClientRect());
    }
  };

  return (
    <div
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={unregisterHover}
      className="transition-transform duration-200 active:scale-95"
    >
      {children}
    </div>
  );
}