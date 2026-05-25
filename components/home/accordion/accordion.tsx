"use client";
import ExperienceTimeline from "./accordion-experience";
import ProjectsTimeline from "./accordion-projects";
import EducationTimeline from "./accordion-education";
import AccordionPhotos from "./accordion-photos";
import { motion } from "motion/react";

const sections = [
  {
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
    <main className="w-full" >
      <section className="w-full">
        {sections.map((section, i) => {
          const isLast = i === sections.length - 1;
          const topOffset = i * 0;

          return (
            <figure
              className={`bg-background sticky h-auto`}
              key={i}
              style={{
                top: `${topOffset}px`,
                zIndex: i,
              }}
            >
              <div className="relative w-full h-full">
                <div>
                 

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


