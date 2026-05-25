import { Code, Globe } from "lucide-react";
import { GitHubIcon } from "@/components/home/dock-items/icons/github-icon";

const projects = [
  {
    name: "scrappGyms",
    description:
      "Website that displays scraped data from Poland's largest gym chains on an interactive map.",
    tech: [
      "next.js",
      "Tailwind CSS",
      "Lucide React",
      "Shadcn/UI",
      "TypeScript",
      "Python",
      "Playwright",
      "BeautifulSoup4",
      "Supabase",
      "Geopy",
      "Github Actions",
      "Requests",
    ],
    repository: "https://github.com/hypeover/scrappGyms",
    website: "https://scrappgyms.vercel.app/",
  },
  {
    name: "Georgia.to scrapper",
    description: "Data scrapper from Georgia.to website.",
    tech: ["Python", "Requests"],
    repository: "https://github.com/hypeover/Georgia.to-data",
  },
];

const ProjectsTimeline = () => {
  return (
    <div className="w-full flex flex-col justify-center place-items-center" >
      <div className="max-w-210 w-full px-5 text-3xl font-medium " >Projects:</div>
      <div className="max-w-210 h-auto flex flex-col mt-5 px-6">
        {projects.map((project, index) => {
          return (
            <div key={index} className="flex flex-row gap-4 mb-5">
              <div className="flex flex-col h-auto justify-center gap-2 items-center">
                <div className="bg-primary-foreground p-3 rounded-xl shadow-md">
                  <Code size={18} />
                </div>
                <span className="h-full w-0.5 bg-muted rounded-md "></span>
              </div>
              <div className="flex flex-col pb-5">
                <div className="flex flex-col gap-1 pb-4 ">
                  <p className="text-2xl font-semibold">{project.name}</p>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm font-medium items-center justify-center py-1 px-4 shadow-xs bg-primary-foreground rounded-lg text-center"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex mt-4 gap-4 text-sm">
                  <a target="_blank" href={project.repository}>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground/70 hover:text-foreground duration-200 font-mono">
                      <GitHubIcon className="h-5 w-5" />
                      Repository
                    </div>
                  </a>
                  {project.website ? (
                    <a target="_blank" href={project.website}>
                      <div className="flex gap-2 text-muted-foreground/70 font-mono duration-200 hover:text-foreground ">
                        <Globe className="h-5 w-5" />
                        Website
                      </div>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsTimeline;
