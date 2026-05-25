"use client";

import { motion, useScroll, useMotionValueEvent, easeOut } from "framer-motion";
import { useState } from "react";

export default function ScrollToHide() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    const isAtBottom = latest + windowHeight >= documentHeight - 50;

    const previous = scrollY.getPrevious() ?? 0;
    const isScrollingUp = latest < previous;

    if (isAtBottom) {
      setIsVisible(true);
    } else if (isScrollingUp || latest < 100) {
      setIsVisible(false);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: -20 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="fixed bottom-1 left-1/2 -translate-x-1/2 z-50 flex flex-col w-11/12 max-w-lg text-center text-sm md:text-base select-none"
    >
      <p className="mb-1">
        Built by{" "}
        <span className="underline font-medium">Krystian Rdzonkowski</span>. The
        source code is available on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium hover:text-gray-400 transition-colors"
          href="https://github.com/hypeover/personal-website"
        >
          Github
        </a>
        .
      </p>

      <p className="w-full opacity-80">Thanks for visiting my portfolio.</p>
    </motion.div>
  );
}
