"use client";
import CvButton from "@/components/home/home-items/cv-button";
import IconsDock from "@/components/home/dock-items/icons-dock";
import GitHubContributionsDemo from "@/components/home/home-items/github-repo";
import ThemeToggle from "@/components/home/home-items/mode-toggle";
import Tech from "@/components/home/tech/tech";
import Accordion from "@/components/home/accordion/accordion";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import Header from "@/components/home/header";
import ScrollToHide from "@/components/home/footer";
import { easeOut, motion } from "motion/react";

const Page = () => {
  return (
    <main className="flex flex-col items-center w-full bg-background scrollbar-none">
      <ReactLenis root />
      <div className="fixed bottom-5 left-5 z-100">
        <ThemeToggle />
      </div>
      <div className="flex flex-col md:h-screen w-full lg:h-screen sm:w-full md:max-w-210 lg:max-w-210 h-auto sm:h-screen px-4 justify-end pb-8">
        <Header />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
          className="flex flex-row my-5 gap-2 items-center"
        >
          <CvButton />
          <IconsDock />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.6 }}
        >
          <GitHubContributionsDemo />
        </motion.div>
        <Tech />
      </div>
      <Accordion />
      <ScrollToHide />
    </main>
  );
};

export default Page;
