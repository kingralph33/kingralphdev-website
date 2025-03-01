import React from "react";

const ResumeTechnicalSkills: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="section-h2">TECHNICAL SKILLS</h2>
      <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left">
        <li>
          <strong>Cloud Platforms:</strong> AWS, Microsoft Azure, RedHat
          OpenShift
        </li>
        <li>
          <strong>Programming Languages:</strong> Python, JavaScript, TypeScript
        </li>
        <li>
          <strong>Frameworks & Libraries:</strong> Node.js, Django, React,
          Angular, Flask
        </li>
        <li>
          <strong>Databases:</strong> PostgreSQL, MySQL, Sqlite, MongoDB
        </li>
        <li>
          <strong>Tools:</strong> Docker, Docker Compose, AWS RDS, Terraform,
          Azure DevOps, JIRA, Selenium, TestNG, Playwright, JUnit, Postman,
          WebdriverIO, LoadRunner Professional, Elastic Search, Redis
        </li>
      </ul>
    </section>
  );
};

export default ResumeTechnicalSkills;
