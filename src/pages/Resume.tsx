const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">RALPH KING JR</h1>
        <p className="text-gray-600">
          ralph@kingralph.dev | Remote or Washington DC-Baltimore Area
        </p>
        <hr className="border-gray-300 mx-auto" />
      </header>

      {/* Summary Section */}
      <section className="mb-8">
        <h2 className="section-h2">SUMMARY</h2>
        <p className="p-header">
        Results-driven Cloud Engineer with extensive experience as a Software Engineer. Proficient in designing and deploying cloud-native applications on AWS, Azure, and OpenShift, leveraging Azure DevOps and infrastructure-as-code principles. Expertise in Python, JavaScript, and automation drives streamlined development workflows and CI/CD pipeline implementation. Proven ability to architect robust, scalable cloud solutions and lead teams to deliver impactful results.
        </p>
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <h2 className="section-h2">TECHNICAL SKILLS</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left">
          <li>
            <strong>Cloud Platforms:</strong> AWS, Microsoft Azure, RedHat
            OpenShift
          </li>
          <li>
            <strong>Programming Languages:</strong> Python, JavaScript,
            TypeScript
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

      {/* Experience Section */}
      <section className="mb-8">
        <h2 className="section-h2">PROFESSIONAL EXPERIENCE</h2>

        {/* USDA Senior Role */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-left">
            Senior Software Engineer / IT Specialist (APPSW)
          </h3>
          <p className="p-header">
            Department of Agriculture (USDA) - Food Safety and Inspection
            Service (FSIS)
          </p>
          <p className="p-header mb-4">
            Washington, DC | January 2025 - Present
          </p>
          <p className="p-job-summary">
            Engineer business solutions for FSIS mission areas to automate
            processes which increased mission areas' productivity, saved
            millions of dollars, and improved accuracy.
          </p>
          <ul className="ul-job-points">
            <li>
              Engineered and deployed automated solutions across FSIS mission
              areas, significantly enhancing productivity, accuracy, and
              resource optimization.
            </li>
            <li>
              Developed and implemented internal automated systems for critical
              regulatory compliance, replacing external vendor software and
              achieving substantial operational efficiencies.
            </li>
            <li>
              Currently automating the FSIS fleet management process with the
              General Services Administration (GSA), improving efficiency and
              accuracy.
            </li>
            <li>
              Conducted code reviews for contractor-submitted Python projects,
              ensuring adherence to quality standards and best practices.
            </li>
            <li>
              Proficient in developing and deploying solutions using Python,
              Django, JavaScript, RedHat OpenShift 4, Elasticsearch, Redis,
              Azure Gov Cloud, Azure DB, Azure VMs, and Azure DevOps.
            </li>
          </ul>
        </div>

        {/* USDA SDET Role */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-left">
            Software Developer Engineer in Test / IT Specialist (APPSW)
          </h3>
          <p className="p-header">
            Department of Agriculture (USDA) - Food Safety and Inspection
            Service (FSIS)
          </p>
          <p className="p-header mb-4">
            Washington, DC | September 2020 - January 2025
          </p>
          <p className="p-job-summary">
            Engineered automated testing solutions for FSIS applications,
            enhancing software quality, accelerating release cycles, and
            significantly reducing defect rates.
          </p>
          <ul className="ul-job-points">
            <li>
              Engineered and implemented automated testing solutions for FSIS
              applications, significantly improving software quality and
              accelerating release cycles.
            </li>
            <li>
              Developed and deployed automated tests for nine FSIS applications
              utilizing Java, Ruby, Selenium, TestNG, TypeScript, JavaScript,
              Playwright, and JUnit.
            </li>
            <li>
              Integrated automated tests into CI/CD pipelines using Azure
              DevOps, ensuring continuous integration and delivery.
            </li>
            <li>
              Led the development of a business process automation application
              using Django (Python), Elasticsearch, OpenShift, and PostgreSQL.
            </li>
            <li>
              Implemented load testing for FSIS applications using LoadRunner,
              ensuring application performance and stability.
            </li>
            <li>
              Enhanced 508 compliance testing efforts, improving accessibility
              for users.
            </li>
            <li>Managed IT acquisition packages, ensuring FAR compliance.</li>
            <li>
              Led the successful migration from Microsoft Team Foundation Server
              to Microsoft Azure DevOps 2020.
            </li>
          </ul>
        </div>

        {/* Skyline SDE Role */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-left">
            Software Development Engineer
          </h3>
          <p className="p-header">Skyline Technology Solutions</p>
          <p className="p-header mb-2">
            Glen Burnie, MD | August 2019 - September 2020
          </p>
          <p className="p-job-summary">
            Engineered and maintained diverse full-stack web applications,
            delivering enhanced federal benefits access, redesigned
            public-facing websites, and improved real-time video platform
            dashboards.
          </p>
          <ul className="ul-job-points">
            <li>
              Led development efforts for a variety of projects, demonstrating
              expertise in full-stack web development
            </li>
            <li>
              Maintained and enhanced a federal benefits application for a
              non-profit organization using Java, JBoss Application Server,
              PostgreSQL, Linux, Docker, and Docker Compose
            </li>
            <li>
              Led the development of the redesigned Skyline Technology Solutions
              website using PHP, Yii2 framework, CraftCMS, MySQL, Docker, Docker
              Compose, and AWS RDS
            </li>
            <li>
              Maintained and added features to a public services application
              providing snow plow and traffic accident information using
              JavaScript, Angular Framework, PHP, Yii2 framework, and the
              Elastic Stack
            </li>
            <li>
              Enhanced the dashboard for a real-time distributed video platform
              using JavaScript, NodeJS, React, and MySQL
            </li>
            <li>
              Maintained the GUI for the backend system utilizing Python and
              Flask framework
            </li>
          </ul>
        </div>

        {/* Skyline SDET Role */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-left">
            Software Development Engineer in Test
          </h3>
          <p className="p-header">Skyline Technology Solutions</p>
          <p className="p-header mb-2">
            Glen Burnie, MD | August 2017 - August 2019
          </p>
          <p className="p-job-summary">
            Engineered and maintained comprehensive automated testing solutions
            across diverse video platforms, ensuring optimal performance and
            reliability through API, UI, and system-level testing.
          </p>
          <ul className="ul-job-points">
            <li>
              Led the development and maintenance of automated testing solutions
              for various software applications
            </li>
            <li>
              Developed system requirements, code, and documentation for
              automated tests of real-time video streams using SikuliX and
              Python
            </li>
            <li>
              Led the development and maintenance of automated tests for a video
              platform dashboard using WebdriverIO and JavaScript
            </li>
            <li>
              Led the development and maintenance of API automated tests for a
              real-time distributed video platform using Postman and JavaScript
            </li>
          </ul>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="section-h2">EDUCATION AND CERTIFICATIONS</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left">
          <li>
            Coding Dojo Coding Bootcamp Certificate (Completed March 2019)
          </li>
          <li>
            <a
              href="https://learn.microsoft.com/api/credentials/share/en-us/KingJrRalphFSIS-8974/B9FC9F5037636B30?sharingId=12CE0D4A3AFD6695"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Microsoft Certified Azure Fundamentals (Completed Jan 2024)
            </a>
          </li>
          <li>
            <a>
              AWS Certified Solutions Architect - Associate (
              <strong>In Progress</strong> / Expected Completion: April 2025)
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Resume;
