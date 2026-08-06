import { Briefcase, Dot } from "lucide-react";

const jobs = [
  {
    name: "QA Game Tester",
    company: "Lionbridge",
    location: "Warsaw, Poland",
    date: "Sep 2022 - Jul 2026",
    details: [
      "Manual & Exploratory Testing: running functional, regression, and exploratory tests to check core game mechanics and ensure software logic matches design goals.",
      "Cross-Platform Testing: testing UI, stability, and performance of a major AAA multiplayer title across PC, consoles, and mobile devices.",
      "Multiplayer & Network Testing: verifying game logic, network connectivity, and real-time synchronization in a heavy-traffic multiplayer environment.",
      "Bug Reporting & Isolation: tracking down complex issues and edge cases, then writing clear defect reports with step-by-step reproduction instructions.",
      "Developer Collaboration: working hand-in-hand with developers to report bugs, clear up requirements, and retest fixed issues."
    ],
    skills: ["Jira", "Xray", "JQL", "MS Excel", "Xbox/Playstation dev kits"],
  },
  {
    name: "Manual Tester",
    company: "Softwebo",
    location: "Warsaw, Poland",
    date: "Jul 2026 - Present",
    details: [
      "Web & Mobile Testing: performing manual, functional, and regression testing for web and mobile applications related to Healthcare, Pharma, and HoReCa.",
      "SaaS & RPM Systems: assessing web-based, cloud-enabled SaaS and Remote Patient Monitoring (RPM) systems for reliable and consistent data connectivity from patient devices to clinical dashboards.",
      "End-to-End & UAT Testing: validating all user flows for medical questionnaires and clinical case scenarios, including User Acceptance Testing (UAT) and data validation.",
      "API, Integration & DB Testing: executing integration testing, performing REST API verification (JSON), and running SQL queries to validate data integrity between front and back-end layers.",
      "Test Design, Smoke & Performance: applying black-box testing techniques, executing quick smoke tests for daily builds, and checking system performance and responsiveness.",
      "Defect Tracking & Log Analysis: analyzing system logs to provide technical context, and tracking defects in Jira from identification to closure.",
      "Cross-Team Collaboration: collaborating with both frontend and backend developers to quickly resolve complex issues and clarify business requirements."
    ],
    skills: ["Jira", "Confluence", "MS Excel", "Postman", "SQL", "DevTools", "Figma"],
  },
];

const ExperienceTimeline = () => {
  return (
    <div className="w-full flex flex-col justify-center place-items-center" >
      <div className="max-w-210 w-full px-5 text-3xl font-medium " >Experience:</div>
      <div className="max-w-210 h-auto flex flex-col px-6 mt-5">
        {jobs.map((job, index) => {
          return (
            <div key={index} className="relative min-h-screen">
              <div
                className="sticky top-0 bg-background pb-5"
                style={{ zIndex: index }}
              >
                <div className="flex flex-row gap-4">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
