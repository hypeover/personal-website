"use client";
import React, { useState } from "react";
import { TechList } from "./tech-list";
import { IosPointer, MagneticItem } from "@/components/cursor/CursorComponents";
import { CursorProvider } from "@/components/cursor/CursorContext";

const Tech = () => {
  const [isInZone, setIsInZone] = useState(false);
  const [initialCoords, setInitialCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setInitialCoords({ x: e.clientX, y: e.clientY });
    setIsInZone(true);
  };

  const handleMouseLeave = () => {
    setIsInZone(false);
    setInitialCoords(null);
  };

  return (
    <div className="mt-4" >
      <p className="font-medium text-2xl" >Tech stack:</p>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-4xl mt-2 p-2 bg-background rounded-xl  transition-all [@media(pointer:fine)]:hover:cursor-none"
      >
        <CursorProvider>
          <IosPointer isVisible={isInZone} initialCoords={initialCoords} />

          <div className="flex flex-wrap gap-2">
            {TechList.map((item, key) => {
              const IconComponent = item.icon;

              return (
                <MagneticItem key={key}>
                  <a target="_blank" href={item.link}>
                    <div className="cursor-none flex flex-row items-center gap-2 justify-center py-2 px-4 bg-primary-foreground rounded-lg text-center">
                      <IconComponent size={16} />

                      <div className="font-medium text-popover-foreground text-sm">
                        {item.name}
                      </div>
                    </div>
                  </a>
                </MagneticItem>
              );
            })}
          </div>
        </CursorProvider>
      </div>
    </div>
  );
};

export default Tech;
