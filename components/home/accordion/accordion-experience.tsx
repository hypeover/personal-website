import { Briefcase, Dot } from "lucide-react";

const jobs = [
  {
    name: "QA Tester",
    company: "Lionbridge",
    location: "Warsaw, Poland",
    date: "Sep 2022 - Present",
    details: [
      "Manual Testing: executing functional, regression, exploratory and usability tests.",
      "Test Documentation: creating and maintaining test plans, test cases, checklists and bug reports.",
      "API Testing: performing CRUD operations, validating JSON structures and checking HTTP responses.",
      "Mobile Testing: testing applications on iOS and Android devices.",
      "Console Game Testing: conducting certification testing for console games.",
      "Collaboration & Issue Management: coordinating with teams and managing defect triage.",
    ],
    skills: ["Jira", "Xray", "JQL", "MS Excel"],
  },
];

const ExperienceTimeline = () => {
  return (
    <div className="w-full flex flex-col justify-center place-items-center" >
      <div className="max-w-210 w-full px-5 text-3xl font-medium " >Experience:</div>
      <div className="max-w-210 h-auto flex flex-col px-6 mt-5">
        {jobs.map((job, index) => {
          return (
            <div key={index} className="flex flex-row gap-4 mb-5">
              <div className="flex flex-col h-auto justify-center gap-2 items-center">
                <div className="bg-primary-foreground p-3 rounded-xl shadow-md">
                  <Briefcase size={18} />
                </div>
                <span className="h-full w-0.5 bg-muted rounded-md "></span>
              </div>
              <div className="flex flex-col gap-1 pb-5">
                <p className="text-2xl font-semibold">{job.name}</p>
                <div className="flex flex-row gap-1 items-center text-sm">
                  <p className="font-medium text-base">{job.company}</p>
                  <Dot className="text-muted-foreground" />
                  <p className=" text-muted-foreground text-base">{job.location}</p>
                </div>
                <p className="font-mono text-sm text-muted-foreground/70">
                  {job.date}
                </p>
                <ul className="flex flex-wrap gap-2 mt-2 text-md text-muted-foreground">
                  {job.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex flex-row items-center justify-start"
                    >
                      •<span className="ml-2">{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm font-medium items-center justify-center py-1 px-4 shadow-xs bg-primary-foreground rounded-lg text-center"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
