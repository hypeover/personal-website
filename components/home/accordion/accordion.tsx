"use client";
import ExperienceTimeline from "./accordion-experience";
import ProjectsTimeline from "./accordion-projects";
import EducationTimeline from "./accordion-education";
import Link from "next/link";


const sections = [
  {
    title: "Experience:",
    content: <ExperienceTimeline />,
  },
  {
    title: "Projects:",
    content: <ProjectsTimeline />,
  },
  {
    title: "Education:",
    content: <EducationTimeline />,
  },
  {
    content: (
      <div className="h-screen bg-[url(/home.jpg)] bg-cover w-screen flex items-center justify-center z-51">
        <Link href='/photos' ><button className="px-5 py-3 backdrop-blur-md cursor-pointer rounded-gxl bg-black/10 font-semibold text-lg text-white hover:bg-black/70 duration-200" >Check my photography</button></Link>
      </div>
    ),
  },
];

const Accordion = () => {
  return (
    
      <main>
        <section className="mt-5 w-full">
          {sections.map((section, i) => {
            const isLast = i === sections.length - 1;
            const topOffset = i * 50;

            return (
              <figure
                className={`bg-background sticky h-auto px-4 ${
                  isLast
                    ? "w-full" 
                    : "max-w-3xl mx-auto" 
                }`}
                key={i}
                style={{
                  top: `${topOffset}px`,
                  zIndex: i,
                }}
              >
                
                <div className="relative w-full h-full">
                  
                  <div >
                    {section.title && (
                      <p className="text-2xl pt-4 mb-4">{section.title}</p>
                    )}

                    <div
                      className={
                        isLast
                          ? "h-full w-full flex items-center justify-center"
                          : ""
                      }
                    >
                      {section.content}
                    </div>
                  </div>
                </div>
              </figure>
            );
          })}
        </section>
      </main>
    
  );
}

export default Accordion

//https://github.com/AndrewPrifer/progressive-blur


//<button className="px-5 py-3 backdrop-blur-md cursor-pointer rounded-2xl bg-black/50 font-semibold text-lg text-white" >Check my photography</button>