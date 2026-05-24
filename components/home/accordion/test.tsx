"use client";
import ExperienceTimeline from "./accordion-experience";
import ProjectsTimeline from "./accordion-projects";
import EducationTimeline from "./accordion-education";
import AccordionPhotos from "./accordion-photos";
import { motion } from "motion/react";

const sections = [
  {
    title: "Experience:",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ExperienceTimeline />
      </motion.div>
    ),
  },
  {
    title: "Projects:",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ProjectsTimeline />
      </motion.div>
    ),
  },
  {
    title: "Education:",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <EducationTimeline />
      </motion.div>
    ),
  },
  {
    content: (
      <AccordionPhotos />
    ),
  },
];

const Accordion = () => {
  return (
    <main>
      <section className="w-full">
        {sections.map((section, i) => {
          const isLast = i === sections.length - 1;
          const topOffset = i * 0;

          return (
            <figure
              className={`bg-background sticky h-auto px-4 ${
                isLast ? "w-full" : "max-w-3xl mx-auto"
              }`}
              key={i}
              style={{
                top: `${topOffset}px`,
                zIndex: i,
              }}
            >
              <div className="relative w-full h-full">
                <div>
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
};

export default Accordion;

//https://github.com/AndrewPrifer/progressive-blur

//<button className="px-5 py-3 backdrop-blur-md cursor-pointer rounded-2xl bg-black/50 font-semibold text-lg text-white" >Check my photography</button>

//<div className="w-full h-100 bg-[url(/home.jpg)] bg-cover rounded-3xl shadow-2xl flex flex-col justify-center"></div>

// jako sekcja ze zdjeciami wstawic kilka zdjec przesuwanych w bok jak w tym projekcie z dribbla z kawowym tlem
