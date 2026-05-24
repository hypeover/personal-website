"use client";

import { motion, useScroll, useMotionValueEvent, easeOut, easeIn } from "framer-motion";
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
      initial={{ opacity: 0, y: 30}} 
      animate={isVisible ? { opacity: 1, y: -20} : { opacity: 0, y: 30}}
      transition={{ duration: 0.6, ease: easeOut }} 
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 p-4 backdrop-blur-md bg-muted rounded-2xl flex flex-col"
    >
      <div className="flex flex-row" >Built by<p className="underline ml-1">Krystian Rdzonkowski</p>. The source code is available on <a className="underline ml-1" href="https://github.com/hypeover/personal-website">Github</a>.</div>
      <p className="w-full text-center" >Thanks for visiting my portfolio.</p>
    </motion.div>
  );
}