import { GraduationCap, Dot } from "lucide-react";

const certifications = [
    "EE.08 – Assembly and Maintenance of Computer Systems", "EE.09 – Programming and Web Application Development"
]

const languages = [
    "Polish - Native", "English - B1 (comfortable reading technical documentation)"
]

const EducationTimeline = () => {
  return (
    <div className="w-full h-auto flex flex-col mt-5">
      <div className="flex flex-row gap-4 mb-5">
        <div className="flex flex-col h-auto justify-center gap-2 items-center">
          <div className="bg-primary-foreground p-3 rounded-xl shadow-md">
            <GraduationCap size={18} />
          </div>
          <span className="h-full w-0.5 bg-muted rounded-md "></span>
        </div>
        <div className="flex flex-col gap-1 pb-5">
          <p className="text-2xl font-semibold">IT Technician</p>
          <div className="flex flex-row gap-1 items-center text-sm">
            <p className="font-medium"> Technikum nr 8 im. Jana Karskiego</p>
            <Dot className="text-muted-foreground" />
            <p className=" text-muted-foreground">Warsaw</p>
          </div>
          <p className="font-mono text-xs text-muted-foreground/70">
            2018 - 2022
          </p>
          <p className="mt-2 text-sm font-semibold" >Certifications:</p>
          <ul className="flex flex-wrap gap-1 text-sm text-muted-foreground">
            
            {certifications.map((certification, key) => (
              <li
                key={key}
                className="flex flex-row items-center justify-start"
              >
                •<span className="ml-2">{certification}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm font-semibold" >Languages:</p>
          <ul className="flex flex-wrap flex-col gap-1 text-sm text-muted-foreground">
            
            {languages.map((language, key) => (
              <li
                key={key}
                className="flex flex-row items-center justify-start"
              >
                •<span className="ml-2">{language}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EducationTimeline;
