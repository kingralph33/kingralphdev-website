import React from "react";

const ResumeTechnicalSkills: React.FC = () => {
  return (
    <section className="mb-8" role="complementary">
      <h2 className="section-h2">TECHNICAL SKILLS</h2>
      <ul className="list-adaptive">
        <li>
          <strong className="text-adaptive-bold">Cloud Platforms:</strong> AWS,
          Microsoft Azure, RedHat OpenShift
        </li>
        <li>
          <strong className="text-adaptive-bold">Programming Languages:</strong>{" "}
          Python, JavaScript, TypeScript
        </li>
        <li>
          <strong className="text-adaptive-bold">
            Frameworks & Libraries:
          </strong>{" "}
          Node.js, Django, React, Angular, Flask
        </li>
        <li>
          <strong className="text-adaptive-bold">Databases:</strong> PostgreSQL,
          MySQL, Sqlite, MongoDB
        </li>
        <li>
          <strong className="text-adaptive-bold">Tools:</strong> Docker, Docker
          Compose, AWS RDS, Terraform, Azure DevOps, JIRA, Selenium, TestNG,
          Playwright, JUnit, Postman, WebdriverIO, LoadRunner Professional,
          Elastic Search, Redis
        </li>
      </ul>
    </section>
  );
};

export default ResumeTechnicalSkills;
