import CvButton from "@/components/home/home-items/cv-button";
import IconsDock from "@/components/home/dock-items/icons-dock";
import GitHubContributionsDemo from "@/components/home/home-items/github-repo";
import ThemeToggle from "@/components/home/home-items/mode-toggle";
import Tech from "@/components/home/tech/tech";
import Accordion from "@/components/home/accordion/accordion";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";

const Page = () => {
  return (
    <>
      <ReactLenis root />
      <main className="flex flex-col items-center min-h-screen w-full bg-background">
        <div className="fixed bottom-5 left-5">
          <ThemeToggle />
        </div>
        <div className="flex flex-col w-full max-w-3xl mt-16 px-4">
          <h1 className="text-4xl font-mono tracking-wider font-medium">
            Krystian Rdzonkowski
          </h1>
          <div className="flex flex-row my-5 gap-4 items-center">
            <CvButton />
            <IconsDock />
          </div>
          <GitHubContributionsDemo />
          <Tech />
        </div>
        <Accordion />
      </main>
    </>
  );
};

export default Page;
