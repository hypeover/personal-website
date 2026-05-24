import { easeOut, motion } from "motion/react";

const Header = () => {
  return (
    <div>
      <motion.h1
        className="text-4xl mb-8 font-mono tracking-wide font-medium"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 1, ease: easeOut }}
      >
        Krystian Rdzonkowski
      </motion.h1>
      <motion.p
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 1, ease: easeOut, delay: 0.2 }}
        className="text-md mt-3 text-muted-foreground"
      >
        Currently working as a QA Tester, I am actively expanding my skills
        toward Frontend Development and Data Engineering. My main passion lies
        in web scraping and data processing. I love extracting valuable web
        data, structuring it, and transforming it into clean, user-friendly
        frontend interfaces that help others. This end-to-end workflow drives my
        continuous learning. Outside of code, I stay active through road
        cycling, tennis, and hiking. I am also deeply into photography – you can
        check out some of my favorite shots in the section below. Explore my
        development projects to see how I connect data with code!
      </motion.p>
    </div>
  );
};

export default Header;
