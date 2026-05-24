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
      className="fixed bottom-1 left-1/2 -translate-x-1/2 z-50 flex flex-col"
    >
      <div className="flex flex-row select-none" >Built by<p className="select-none underline ml-1">Krystian Rdzonkowski</p>. The source code is available on <a target="_blank" className="select-none underline ml-1" href="https://github.com/hypeover/personal-website">Github</a>.</div>
      <p className="w-full text-center select-none" >Thanks for visiting my portfolio.</p>
    </motion.div>
  );
}