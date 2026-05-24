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
                    <p className="text-3xl pt-4 mb-4 font-medium">{section.title}</p>
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


