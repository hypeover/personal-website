import CvButton from "@/components/home/home-items/cv-button";
import IconsDock from "@/components/home/dock-items/icons-dock";
import GitHubContributionsDemo from "@/components/home/home-items/github-repo";
import ThemeToggle from "@/components/home/home-items/mode-toggle";
import Tech from "@/components/home/tech/tech";
import ExperienceTimeline from "@/components/home/accordion/accordion-experience";
import ProjectsTimeline from "@/components/home/accordion/accordion-projects";
import EducationTimeline from "@/components/home/accordion/accordion-education";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="fixed bottom-5 left-5 z-50">
        <ThemeToggle />
      </div>
      <div className="flex flex-col h-400 w-200 mt-30">
        <h1 className="text-4xl font-mono tracking-wider font-medium">
          Krystian Rdzonkowski
        </h1>
        <div className="flex flex-row my-5">
          <CvButton />
          <IconsDock />
        </div>
        <GitHubContributionsDemo />
        <Tech />
        <ExperienceTimeline />
        <ProjectsTimeline />
        <EducationTimeline />
      </div>
    </div>
  );
};

export default Page;
