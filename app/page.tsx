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
    <>
      <ReactLenis root />
      <main className="flex flex-col items-center min-h-screen w-full bg-background">
        <div className="fixed bottom-5 left-5">
          <ThemeToggle />
        </div>
        <div className="flex flex-col w-full max-w-3xl h-screen px-4 justify-end pb-8">
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
    </>
  );
};

export default Page;
