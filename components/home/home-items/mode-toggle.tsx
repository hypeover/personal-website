"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { easeOut, motion } from "motion/react";
import { flushSync } from "react-dom";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const { setTheme } = useTheme();

  const toggleTheme = async () => {
    if (!document.startViewTransition) {
      const newState = !isDark;
      setIsDark(newState);
      setTheme(newState ? "dark" : "light");
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        const newState = !isDark;
        setIsDark(newState);
        setTheme(newState ? "dark" : "light");
      });
    });

    await transition.ready;

    document.documentElement.animate(
      { opacity: [0, 1] },
      {
        duration: 400,
        easing: "cubic-bezier(0.71, 0, 0.3, 1)",
        pseudoElement: "::view-transition-new(root)",
        fill: "both",
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: easeOut, delay: 1 }}
      className="relative h-8 overflow-hidden cursor-pointer w-auto z-9999"
      onClick={toggleTheme}
    >
      <motion.div
        animate={{ y: isDark ? -32 : 0 }}
        transition={{
          duration: 0.8,
          ease: [0.71, 0, 0.3, 1],
        }}
        className="flex flex-col p-0"
      >
        <div className="h-8 flex items-center antialiased justify-start text-2xl select-none font-mono tracking-widest">
          Light
        </div>
        <div className="h-8 flex items-center antialiased justify-start text-2xl select-none font-mono tracking-widest">
          Dark
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeToggle;
