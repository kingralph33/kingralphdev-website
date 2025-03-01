import React from "react";
import ResumeJobEntry from "./ResumeJobEntry";

const ResumeExperience: React.FC = () => {
  const jobs = [
    {
      title: "Senior Software Engineer / IT Specialist (APPSW)",
      company:
        "Department of Agriculture (USDA) - Food Safety and Inspection Service (FSIS)",
      location: "Washington, DC",
      period: "January 2025 - Present",
      summary:
        "Engineer business solutions for FSIS mission areas to automate processes which increased mission areas' productivity, saved millions of dollars, and improved accuracy.",
      responsibilities: [
        "Engineered and deployed automated solutions across FSIS mission areas, significantly enhancing productivity, accuracy, and resource optimization.",
        "Developed and implemented internal automated systems for critical regulatory compliance, replacing external vendor software and achieving substantial operational efficiencies.",
        "Currently automating the FSIS fleet management process with the General Services Administration (GSA), improving efficiency and accuracy.",
        "Conducted code reviews for contractor-submitted Python projects, ensuring adherence to quality standards and best practices.",
        "Proficient in developing and deploying solutions using Python, Django, JavaScript, RedHat OpenShift 4, Elasticsearch, Redis, Azure Gov Cloud, Azure DB, Azure VMs, and Azure DevOps.",
      ],
    },
    {
      title: "Software Developer Engineer in Test / IT Specialist (APPSW)",
      company:
        "Department of Agriculture (USDA) - Food Safety and Inspection Service (FSIS)",
      location: "Washington, DC",
      period: "September 2020 - January 2025",
      summary:
        "Engineered automated testing solutions for FSIS applications, enhancing software quality, accelerating release cycles, and significantly reducing defect rates.",
      responsibilities: [
        "Engineered and implemented automated testing solutions for FSIS applications, significantly improving software quality and accelerating release cycles.",
        "Developed and deployed automated tests for nine FSIS applications utilizing Java, Ruby, Selenium, TestNG, TypeScript, JavaScript, Playwright, and JUnit.",
        "Integrated automated tests into CI/CD pipelines using Azure DevOps, ensuring continuous integration and delivery.",
        "Led the development of a business process automation application using Django (Python), Elasticsearch, OpenShift, and PostgreSQL.",
        "Implemented load testing for FSIS applications using LoadRunner, ensuring application performance and stability.",
        "Enhanced 508 compliance testing efforts, improving accessibility for users.",
        "Managed IT acquisition packages, ensuring FAR compliance.",
        "Led the successful migration from Microsoft Team Foundation Server to Microsoft Azure DevOps 2020.",
      ],
    },
    {
      title: "Software Development Engineer",
      company: "Skyline Technology Solutions",
      location: "Glen Burnie, MD",
      period: "August 2019 - September 2020",
      summary:
        "Engineered and maintained diverse full-stack web applications, delivering enhanced federal benefits access, redesigned public-facing websites, and improved real-time video platform dashboards.",
      responsibilities: [
        "Led development efforts for a variety of projects, demonstrating expertise in full-stack web development",
        "Maintained and enhanced a federal benefits application for a non-profit organization using Java, JBoss Application Server, PostgreSQL, Linux, Docker, and Docker Compose",
        "Led the development of the redesigned Skyline Technology Solutions website using PHP, Yii2 framework, CraftCMS, MySQL, Docker, Docker Compose, and AWS RDS",
        "Maintained and added features to a public services application providing snow plow and traffic accident information using JavaScript, Angular Framework, PHP, Yii2 framework, and the Elastic Stack",
        "Enhanced the dashboard for a real-time distributed video platform using JavaScript, NodeJS, React, and MySQL",
        "Maintained the GUI for the backend system utilizing Python and Flask framework",
      ],
    },
    {
      title: "Software Development Engineer in Test",
      company: "Skyline Technology Solutions",
      location: "Glen Burnie, MD",
      period: "August 2017 - August 2019",
      summary:
        "Engineered and maintained comprehensive automated testing solutions across diverse video platforms, ensuring optimal performance and reliability through API, UI, and system-level testing.",
      responsibilities: [
        "Led the development and maintenance of automated testing solutions for various software applications",
        "Developed system requirements, code, and documentation for automated tests of real-time video streams using SikuliX and Python",
        "Led the development and maintenance of automated tests for a video platform dashboard using WebdriverIO and JavaScript",
        "Led the development and maintenance of API automated tests for a real-time distributed video platform using Postman and JavaScript",
      ],
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="section-h2">PROFESSIONAL EXPERIENCE</h2>
      {jobs.map((job, index) => (
        <ResumeJobEntry key={index} {...job} />
      ))}
    </section>
  );
};

export default ResumeExperience;
