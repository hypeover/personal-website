import CvButton from "@/components/home/cv-button";
import IconsDock from "@/components/home/dock-items/icons-dock";
import ThemeToggle from "@/components/home/mode-toggle";

const Page = () => {
  return (
    <div className="flex justify-center items-center">
      <ThemeToggle />
      <div className="flex flex-col h-200 w-200 mt-30">
        <h1 className="text-4xl font-mono tracking-wider font-medium">
          Krystian Rdzonkowski
        </h1>
        <div className="flex flex-row mt-5">
          <CvButton />
          <IconsDock />
        </div>
      </div>
    </div>
  );
};

export default Page;
