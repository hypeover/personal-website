import CvButton from "@/components/home/home-items/cv-button";
import IconsDock from "@/components/home/dock-items/icons-dock";
import GitHubContributionsDemo from "@/components/home/home-items/github-repo";
import ThemeToggle from "@/components/home/home-items/mode-toggle";
import Tech from "@/components/home/tech/tech";
import Footer from "@/components/home/home-items/footer";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="fixed bottom-5 left-5 z-50">
        <ThemeToggle />
      </div>
      <div className="flex flex-col h-200 w-200 mt-30">
        <h1 className="text-4xl font-mono tracking-wider font-medium">
          Krystian Rdzonkowski
        </h1>
        <div className="flex flex-row my-5">
          <CvButton />
          <IconsDock />
        </div>
        <GitHubContributionsDemo />
        <Tech />
      </div>
    </div>
  );
};

export default Page;
