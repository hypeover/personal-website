"use client";

import { createContext, useContext, useState } from "react";

type CursorState = {
  isHovered: boolean;
  elementRect: DOMRect | null;
  registerHover: (rect: DOMRect) => void;
  unregisterHover: () => void;
};

const CursorContext = createContext<CursorState | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);

  const registerHover = (rect: DOMRect) => {
    setElementRect(rect);
    setIsHovered(true);
  };

  const unregisterHover = () => {
    setIsHovered(false);
    setElementRect(null);
  };

  return (
    <CursorContext.Provider value={{ isHovered, elementRect, registerHover, unregisterHover }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursor must be used within a CursorProvider");
  return context;
};